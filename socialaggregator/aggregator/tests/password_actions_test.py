from rest_framework.test import APITestCase

from .factories import UserFactory


class RegistrationTest(APITestCase):
    def setUp(self):
        self.user = UserFactory()

    def test_reset_password(self):
        url = '/api/auth/password/reset/'

        response = self.client.post(url, data={'email': self.user.email})

        self.assertEqual(200, response.status_code)