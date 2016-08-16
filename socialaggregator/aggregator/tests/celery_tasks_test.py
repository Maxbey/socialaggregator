from mock import patch
from rest_framework.test import APITestCase

from factories import UserSocialAuthFactory, build_social_persons

from aggregator import tasks
from social.apps.django_app.default.models import UserSocialAuth

from aggregator.models import SocialPerson


class StrategyMock(object):
    def get_avatar_url(self):
        return 'someurl'

    def get_followers_count(self):
        return 25

    def get_friends_count(self):
        return 48

    def get_friends(self):
        return []

    def get_followers(self):
        return []

    def get_user_info(self):
        return 'user info'


class CreateSocialPersonsTest(APITestCase):
    def assert_creation(self, account):
        refreshed_account = UserSocialAuth.objects.get(pk=account.id)

        for person in refreshed_account.socialperson_set.all():
            self.assertEqual(len(person.user_social_auth.all()), 1)
            self.assertEqual(person.user_social_auth.all()[0].id, account.id)

    def test_social_persons_creation(self):
        account_one = UserSocialAuthFactory()
        account_two = UserSocialAuthFactory()

        persons_set_one = build_social_persons(2)
        persons_set_two = build_social_persons(3)

        tasks.create_social_persons(persons_set_one, account_one.id, 'friend')
        tasks.create_social_persons(persons_set_two, account_two.id, 'follower')

        self.assertEqual(2, len(account_one.socialperson_set.all()))
        self.assertEqual(3, len(account_two.socialperson_set.all()))

        self.assert_creation(account_one)
        self.assert_creation(account_two)

    def test_social_person_relation_sync(self):
        account = UserSocialAuthFactory()

        friends = build_social_persons(2)
        followers = build_social_persons(2)

        tasks.create_social_persons(friends, account.id, 'friend')
        tasks.create_social_persons(followers, account.id, 'follower')

        self.assertEqual(4, len(account.socialperson_set.all()))


class SaveSocialDataTest(APITestCase):
    def setUp(self):
        self.account = UserSocialAuthFactory()

    def save_social_data_test(self):
        result_of_chord = [
            {'key1': 'val1'},
            {'key2': 'val2'}
        ]

        tasks.save_social_data(result_of_chord, self.account.id)
        account = UserSocialAuth.objects.get(pk=self.account.id)

        expected_social_data = {
            'key1': 'val1',
            'key2': 'val2'
        }

        self.assertEqual(expected_social_data,
                         account.extra_data['social_data'])


class FetchTasksTest(APITestCase):
    @patch('aggregator.tasks.get_strategy', lambda a: StrategyMock())
    def test_fetch_avatar_url_task(self):
        expected = {'avatar_url': 'someurl'}

        self.assertEqual(expected, tasks.fetch_avatar_url(1))

    @patch('aggregator.tasks.get_strategy', lambda a: StrategyMock())
    def test_fetch_avatar_url_task(self):
        expected = {'avatar_url': 'someurl'}

        self.assertEqual(expected, tasks.fetch_avatar_url(1))

    @patch('aggregator.tasks.get_strategy', lambda a: StrategyMock())
    def test_fetch_user_info(self):
        expected = {'user_info': 'user info'}

        self.assertEqual(expected, tasks.fetch_user_info(1))

    @patch('aggregator.tasks.get_strategy', lambda a: StrategyMock())
    def test_fetch_user_friends(self):
        self.assertEqual([], tasks.fetch_user_friends(1))

    @patch('aggregator.tasks.get_strategy', lambda a: StrategyMock())
    def test_fetch_user_followers(self):
        self.assertEqual([], tasks.fetch_user_followers(1))

    @patch('aggregator.tasks.get_strategy', lambda a: StrategyMock())
    def test_fetch_user_friends_count(self):
        expected = {'friends_count': 48}

        self.assertEqual(expected, tasks.fetch_user_friends_count(1))

    @patch('aggregator.tasks.get_strategy', lambda a: StrategyMock())
    def test_fetch_user_followers_count(self):
        expected = {'followers_count': 25}

        self.assertEqual(expected, tasks.fetch_user_followers_count(1))
