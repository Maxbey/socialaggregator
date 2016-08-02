import httpretty
from nose.tools import raises
from rest_framework.test import APITestCase

from aggregator.factories import UserSocialAuthFactory
from aggregator.fetchers.fetcher import SocialDataFetcherFactory
from aggregator.fetchers.fetcher import SocialDataFetcher
from aggregator.fetchers.github import GithubFetchStrategy

from aggregator.fetchers.facebook import FacebookFetchStrategy


class SocialDataFetcherFabricTest(APITestCase):
    def setUp(self):
        self.user_social_auth = UserSocialAuthFactory()

    def test_instance_creation(self):
        fetcher = SocialDataFetcherFactory.fabricate('facebook', self.user_social_auth)

        self.assertIsInstance(fetcher, SocialDataFetcher)

    @raises(Exception)
    def test_wrong_provider(self):
        SocialDataFetcherFactory.fabricate('wrong', self.user_social_auth)


class SocialDataFetcherTest(APITestCase):
    def setUp(self):
        self.user_social_auth = UserSocialAuthFactory()

    def test_expected_facebook_interface(self):
        fetcher = SocialDataFetcherFactory.fabricate('facebook', self.user_social_auth)

        self.assertTrue('get_friends' in dir(fetcher))
        self.assertFalse('get_followers' in dir(fetcher))

    def test_expected_github_interface(self):
        fetcher = SocialDataFetcherFactory.fabricate('github', self.user_social_auth)

        self.assertFalse('get_friends' in dir(fetcher))
        self.assertTrue('get_followers' in dir(fetcher))


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

    def mock_collection_request(self, url):
        httpretty.register_uri(
            httpretty.HTTPretty.GET,
            url,
            body='[{}, {}]'
        )


class GithubFetchStrategyTest(BaseFetchStrategyTestCase):
    def setUp(self):
        self.fetcher = GithubFetchStrategy(UserSocialAuthFactory())

    @httpretty.activate
    def test_get_avatar_url_method(self):
        url = 'https://github.com/%s.png?size=200' % self.fetcher.login
        target = 'https://imgurl.com'

        self.mock_avatar_request(url, target)
        self.assertEqual(self.fetcher.get_avatar_url(), target)

    @httpretty.activate
    def test_get_followers_method(self):
        api = 'https://api.github.com'
        self.mock_collection_request('%s/user/followers' % api)

        self.assertEqual(self.fetcher.get_followers(), [{}, {}])


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
        self.mock_collection_request(url)

        self.assertEqual(self.fetcher.get_friends(), [{}, {}])
