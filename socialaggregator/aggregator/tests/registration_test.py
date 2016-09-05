from rest_framework.test import APITestCase


class RegistrationTest(APITestCase):

    def test_registration(self):
        url = '/api/auth/registration/'
        data = {
            'email': 'email@email.com',
            'username': 'pass',
            'password1': 'passpass',
            'password2': 'passpass'
        }

        response = self.client.post(url, data=data)

        self.assertEqual(201, response.status_code)
