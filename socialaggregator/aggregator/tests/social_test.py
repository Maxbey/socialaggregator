import json
import httpretty
from urllib import urlencode

from mock import patch
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from social.apps.django_app.default.models import UserSocialAuth
from collections import namedtuple
from .helpers import dict_from_model, get_authorized_client_by_token, is_models_equal

MockedRequest = namedtuple('RequestConfig', 'url method response_body')

FACEBOOK_USER_DATA = {
    'id': '12345678',
    'first_name': 'Chris',
    'last_name': 'Colm',
    'name': 'Chris Colm',
    'email': 'email@email.com'
}

GITHUB_USER_DATA = {
    'login': 'octocat',
    'id': 123,
    'type': 'User',
    'name': 'monalisa octocat',
    'email': 'somemail@email.com'
}

TWITTER_USER_DATA = {
    'id': 2244994945,
    'name': 'twitter user',
    'screen_name': 'TwitterDev',
    'email': 'email@email.com',
}


def load_social_data(**kwargs):
    return


class SocialMock(object):

    @classmethod
    def mock_facebook(cls, user_data):
        access_token_request = MockedRequest(
            url='https://graph.facebook.com/v2.3/oauth/access_token',
            method=httpretty.GET,
            response_body='{"access_token": "foobar"}'
        )

        user_data_request = MockedRequest(
            url='https://graph.facebook.com/v2.3/me',
            method=httpretty.GET,
            response_body=json.dumps(user_data)
        )

        cls.mock_oauth2(access_token_request, user_data_request)

    @classmethod
    def mock_github(cls, user_data):
        access_token_request = MockedRequest(
            url='https://github.com/login/oauth/access_token',
            method=httpretty.POST,
            response_body='{"access_token": "foobar"}'
        )

        user_data_request = MockedRequest(
            url='https://api.github.com/user',
            method=httpretty.GET,
            response_body=json.dumps(user_data)
        )

        cls.mock_oauth2(access_token_request, user_data_request)

    @classmethod
    def mock_twitter(cls, user_data):
        response_body = {
            'oauth_token_secret': 'foobar-secret',
            'oauth_token': 'foobar',
            'oauth_callback_confirmed': 'true'
        }

        request_token_request = MockedRequest(
            url='https://api.twitter.com/oauth/request_token',
            method=httpretty.POST,
            response_body=urlencode(response_body))

        access_token_request = MockedRequest(
            url='https://api.twitter.com/oauth/access_token',
            method=httpretty.POST,
            response_body=json.dumps({
                'access_token': 'foobar',
                'token_type': 'bearer'
            }))

        user_data_request = MockedRequest(
            url='https://api.twitter.com/1.1/account/verify_credentials.json',
            method=httpretty.GET,
            response_body=json.dumps(user_data)
        )

        cls.mock_oauth(
            request_token_request,
            access_token_request,
            user_data_request
        )

    @classmethod
    def register_mock(cls, request):
        httpretty.register_uri(
            request.method,
            request.url,
            body=request.response_body,
            content_type='application/json'
        )

    @classmethod
    def mock_oauth2(cls, access_token_request, user_data_request):
        cls.register_mock(access_token_request)
        cls.register_mock(user_data_request)

    @classmethod
    def mock_oauth(cls, request_token_request, access_token_request, user_data_request):
        cls.register_mock(request_token_request)
        cls.mock_oauth2(access_token_request, user_data_request)


class SocialTestHelpers(object):

    def get_account_by_uid(self, uid):
        return UserSocialAuth.objects.get(uid=uid)

    def assert_user_correctly_created(self, expected_data, created_instance):
        self.assertEqual(expected_data, dict_from_model(
            created_instance, expected_data.keys(), []))

    def assert_social_account_correctly_created(self, user, uid):
        account = self.get_account_by_uid(uid)
        self.assertEqual(account.user.id, user.id)

    def get_user_by_token(self, token):
        return Token.objects.get(key=token).user

    def login_via_facebook(self, client):
        return client.post('/api/social_auth/login/social/token/facebook/', {'code': 'foobar'})

    def login_via_github(self, client):
        return client.post('/api/social_auth/login/social/token/github/', {'code': 'foobar'})

    def login_via_twitter(self, client):
        response = client.post(
            '/api/social_auth/login/social/token/twitter/', {})
        response.data['oauth_verifier'] = 'foobar'

        return client.post('/api/social_auth/login/social/token/twitter/', response.data)


class FacebookSocialTest(APITestCase, SocialTestHelpers):

    def setUp(self):
        self.facebook_user_data = FACEBOOK_USER_DATA

    @httpretty.activate
    @patch('aggregator.pipeline.load_social_data', load_social_data)
    def test_user_creation(self):
        SocialMock.mock_facebook(self.facebook_user_data)

        response = self.login_via_facebook(self.client)
        created_user = self.get_user_by_token(response.data['token'])

        expected_user_data = {
            'username': self.facebook_user_data['name'].replace(' ', ''),
            'email': self.facebook_user_data['email'],
            'first_name': self.facebook_user_data['first_name'],
            'last_name': self.facebook_user_data['last_name'],
        }

        self.assert_user_correctly_created(expected_user_data, created_user)
        self.assert_social_account_correctly_created(
            created_user, self.facebook_user_data['id'])


class GithubSocialTest(APITestCase, SocialTestHelpers):

    def setUp(self):
        self.github_user_data = GITHUB_USER_DATA

    @httpretty.activate
    @patch('aggregator.pipeline.load_social_data', load_social_data)
    def test_creation(self):
        SocialMock.mock_github(self.github_user_data)

        response = self.login_via_github(self.client)
        created_user = self.get_user_by_token(response.data['token'])

        expected_user_data = {
            'username': self.github_user_data['login'],
            'email': self.github_user_data['email'],
            'first_name': self.github_user_data['name'].split()[0],
            'last_name': self.github_user_data['name'].split()[1],
        }

        self.assert_user_correctly_created(expected_user_data, created_user)
        self.assert_social_account_correctly_created(
            created_user, self.github_user_data['id'])


class TwitterSocialTest(APITestCase, SocialTestHelpers):

    def setUp(self):
        self.twitter_user_data = TWITTER_USER_DATA

    @httpretty.activate
    @patch('aggregator.pipeline.load_social_data', load_social_data)
    def test_creation(self):
        SocialMock.mock_twitter(self.twitter_user_data)

        response = self.login_via_twitter(self.client)
        created_user = self.get_user_by_token(response.data['token'])

        expected_user_data = {
            'username': self.twitter_user_data['screen_name'],
            'email': self.twitter_user_data['email'],
            'first_name': self.twitter_user_data['name'].split()[0],
            'last_name': self.twitter_user_data['name'].split()[1],
        }

        self.assert_user_correctly_created(expected_user_data, created_user)
        self.assert_social_account_correctly_created(
            created_user, self.twitter_user_data['id'])


class AccountsBindingTest(APITestCase, SocialTestHelpers):

    def setUp(self):
        self.user_fields = ['username', 'email', 'first_name', 'last_name']
        self.accounts = []

    def mock_all_providers(self):
        SocialMock.mock_facebook(FACEBOOK_USER_DATA)
        SocialMock.mock_github(GITHUB_USER_DATA)
        SocialMock.mock_twitter(TWITTER_USER_DATA)

    @httpretty.activate
    @patch('aggregator.pipeline.load_social_data', load_social_data)
    def test_user_data_will_not_change(self):
        self.mock_all_providers()

        response = self.login_via_facebook(self.client)
        authorized_client = get_authorized_client_by_token(
            response.data['token'])

        created_user = self.get_user_by_token(response.data['token'])

        self.login_via_github(authorized_client)
        response = self.login_via_twitter(authorized_client)

        user = self.get_user_by_token(response.data['token'])

        self.assertTrue(is_models_equal(created_user, user, self.user_fields))

    @httpretty.activate
    @patch('aggregator.pipeline.load_social_data', load_social_data)
    def test_accounts_binding(self):
        self.mock_all_providers()

        response = self.login_via_facebook(self.client)
        self.accounts.append(self.get_account_by_uid(FACEBOOK_USER_DATA['id']))
        authorized_client = get_authorized_client_by_token(
            response.data['token'])
        user = self.get_user_by_token(response.data['token'])

        self.login_via_github(authorized_client)
        self.accounts.append(self.get_account_by_uid(GITHUB_USER_DATA['id']))

        self.login_via_twitter(authorized_client)
        self.accounts.append(self.get_account_by_uid(TWITTER_USER_DATA['id']))

        for account in self.accounts:
            self.assertEqual(user.id, account.user.id)

    @httpretty.activate
    @patch('aggregator.pipeline.load_social_data', load_social_data)
    def test_account_already_in_use(self):
        SocialMock.mock_facebook(FACEBOOK_USER_DATA)
        SocialMock.mock_github(GITHUB_USER_DATA)

        self.login_via_facebook(self.client)
        response = self.login_via_github(self.client)

        authorized_client = get_authorized_client_by_token(
            response.data['token'])
        response = self.login_via_facebook(authorized_client)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data, ['This facebook account is already in use.'])
