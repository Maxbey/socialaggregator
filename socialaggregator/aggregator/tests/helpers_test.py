from unittest import TestCase

from aggregator.factories import UserSocialAuthFactory
from .helpers import dict_from_model


class HelpersTest(TestCase):

    def setUp(self):
        self.instance = UserSocialAuthFactory()
        self.attributes = ['user', 'provider', 'uid', 'extra_data']
        self.relations = ['user']

    def dict_from_model_test(self):
        result = dict_from_model(
            self.instance, self.attributes, self.relations)

        expected = {
            'user': self.instance.user.id,
            'provider': self.instance.provider,
            'uid': self.instance.uid,
            'extra_data': self.instance.extra_data
        }

        self.assertEqual(result, expected)
