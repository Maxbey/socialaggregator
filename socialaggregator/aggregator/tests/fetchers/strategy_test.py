import json
import httpretty
from aggregator.factories import UserSocialAuthFactory
from aggregator.fetchers.github import GithubFetchStrategy
from aggregator.fetchers.facebook import FacebookFetchStrategy
from rest_framework.test import APITestCase

import fakedata


class BaseFetchStrategyTestCase(APITestCase):
    def mock_avatar_request(self, url, target):
        httpretty.register_uri(
            httpretty.HTTPretty.GET,
            url,
            status=301,
            location=target
        )

        httpretty.register_uri(
            httpretty.HTTPretty.GET,
            target
        )

    def mock_collection_request(self, url, response_struct):
        httpretty.register_uri(
            httpretty.HTTPretty.GET,
            url,
            body=json.dumps(response_struct)
        )


class GithubFetchStrategyTest(BaseFetchStrategyTestCase):
    def setUp(self):
        self.fetcher = GithubFetchStrategy(UserSocialAuthFactory())
        self.api = 'https://api.github.com'

    @httpretty.activate
    def test_get_avatar_url_method(self):
        url = 'https://github.com/%s.png?size=200' % self.fetcher.login
        target = 'https://imgurl.com'

        self.mock_avatar_request(url, target)
        self.assertEqual(self.fetcher.get_avatar_url(), target)

    @httpretty.activate
    def test_get_followers_method(self):
        self.mock_collection_request(
            '%s/user/followers' % self.api,
            fakedata.GITHUB_FOLLOWERS
        )

        self.assertEqual(self.fetcher.get_followers(), [{}, {}])

    @httpretty.activate
    def test_get_followers_count_method(self):
        self.mock_collection_request(
            '%s/user/followers' % self.api,
            fakedata.GITHUB_FOLLOWERS
        )

        self.assertEqual(self.fetcher.get_followers_count(), 2)

    @httpretty.activate
    def test_get_user_info_method(self):
        url = self.api + '/user'
        self.mock_collection_request(url, fakedata.GITHUB_USER_INFO)

        data = self.fetcher.get_user_info()
        self.assertEqual(data, fakedata.USER_INFO)


class FacebookFetchStrategyTest(BaseFetchStrategyTestCase):
    def setUp(self):
        self.user_social_auth = UserSocialAuthFactory()
        self.fetcher = FacebookFetchStrategy(self.user_social_auth)
        self.api_url = 'https://graph.facebook.com/v2.7/%d/%s'

    @httpretty.activate
    def test_get_avatar_url_method(self):
        url = self.api_url % (int(self.user_social_auth.uid), 'picture')
        target = 'https://imgurl.com'

        self.mock_avatar_request(url, target)
        self.assertEqual(self.fetcher.get_avatar_url(), target)

    @httpretty.activate
    def test_get_friends_method(self):
        url = self.api_url % (int(self.user_social_auth.uid), 'friends')

        self.mock_collection_request(url, fakedata.FACEBOOK_FRIENDS)
        self.assertEqual(self.fetcher.get_friends(), [{}, {}])

    @httpretty.activate
    def test_get_friends_count_method(self):
        url = self.api_url % (int(self.user_social_auth.uid), 'friends')

        self.mock_collection_request(url, fakedata.FACEBOOK_FRIENDS)
        self.assertEqual(self.fetcher.get_friends_count(), 2)

    @httpretty.activate
    def test_get_user_info_method(self):
        url = 'https://graph.facebook.com/v2.7/me'
        self.mock_collection_request(url, fakedata.FACEBOOK_USER_INFO)

        data = self.fetcher.get_user_info()
        self.assertEqual(data, fakedata.USER_INFO)
