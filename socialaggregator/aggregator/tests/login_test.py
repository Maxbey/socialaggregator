from rest_framework import status
from rest_framework.test import APITestCase

from aggregator.factories import UserFactory


class RestLoginTest(APITestCase):

    def setUp(self):
        self.user = UserFactory()
        self.url = '/api/auth/login/'

        self.user.set_password('pass')

    def test_perform_login(self):
        response = self.client.post(self.url, {
            'email': self.user.email,
            'password': 'pass'
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
