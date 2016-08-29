from mock import patch
from rest_framework.test import APITestCase

from aggregator import tasks

from aggregator.pipeline import load_social_data
from .factories import UserSocialAuthFactory


class StrategyWithFriends(object):

    @property
    def relations(self):
        return ['friends']


class StrategyWithFollowers(object):

    @property
    def relations(self):
        return ['followers']


class LoadSocialDataTest(APITestCase):

    def setUp(self):
        self.account = UserSocialAuthFactory()

    @patch('aggregator.pipeline.cache.set')
    @patch('aggregator.pipeline.get_strategy', lambda a: StrategyWithFriends())
    @patch('aggregator.pipeline.tasks.fetch_user_friends.apply_async')
    @patch('aggregator.pipeline.chord')
    def test_case_with_friends_relations(self, chord, fetch_friends, set):
        id = self.account.id
        set.return_value = True

        expected_task_pipeline = [
            tasks.fetch_avatar_url.s(id),
            tasks.fetch_user_info.s(id),
            tasks.fetch_user_friends_count.s(id)
        ]

        load_social_data(self.account)

        chord.assert_called_with(expected_task_pipeline)
        fetch_friends.assert_called()

    @patch('aggregator.pipeline.cache.set')
    @patch('aggregator.pipeline.get_strategy', lambda a: StrategyWithFollowers())
    @patch('aggregator.pipeline.tasks.fetch_user_followers.apply_async')
    @patch('aggregator.pipeline.chord')
    def test_case_with_followers_relations(self, chord, fetch_followers, set):
        id = self.account.id
        set.return_value = True

        expected_task_pipeline = [
            tasks.fetch_avatar_url.s(id),
            tasks.fetch_user_info.s(id),
            tasks.fetch_user_followers_count.s(id)
        ]

        load_social_data(self.account)

        chord.assert_called_with(expected_task_pipeline)
        fetch_followers.assert_called()
