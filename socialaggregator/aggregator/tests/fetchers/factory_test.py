from nose.tools import raises
from rest_framework.test import APITestCase

from aggregator.factories import UserSocialAuthFactory
from aggregator.fetchers.factory import SocialFetchStrategyFactory
from aggregator.fetchers.github import GithubFetchStrategy
from aggregator.fetchers.facebook import FacebookFetchStrategy


class SocialFetchStrategyFactoryTest(APITestCase):
    def setUp(self):
        self.user_social_auth = UserSocialAuthFactory()

    def test_facebook_strategy_creation(self):
        fetcher = SocialFetchStrategyFactory.fabricate('facebook', self.user_social_auth)

        self.assertIsInstance(fetcher, FacebookFetchStrategy)

    def test_github_strategy_creation(self):
        fetcher = SocialFetchStrategyFactory.fabricate('github', self.user_social_auth)

        self.assertIsInstance(fetcher, GithubFetchStrategy)

    @raises(Exception)
    def test_wrong_provider(self):
        SocialFetchStrategyFactory.fabricate('wrong', self.user_social_auth)
