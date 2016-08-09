import json

import requests

from .base import BaseFetchStrategy


class GithubFetchStrategy(BaseFetchStrategy):
    api_url = 'https://api.github.com'
    avatar_size = 500

    @property
    def relations(self):
        return ['followers']

    def __init__(self, user_social_auth):
        super(GithubFetchStrategy, self).__init__(user_social_auth)

        self.login = user_social_auth.extra_data['login'].lower()

    def get_avatar_url(self):
        params = {'size': self.avatar_size}
        request_url = 'https://github.com/%s.png' % self.login

        return requests.get(request_url, params=params).url

    def get_followers(self):
        params = {'access_token': self.access_token}
        request_url = '%s/user/followers' % self.api_url

        return json.loads(requests.get(request_url, params=params).content)

    def get_user_info(self):
        params = {'access_token': self.access_token}
        request_url = '%s/user' % self.api_url

        response = requests.get(request_url, params=params)
        data = json.loads(response.content)

        return {
            'name': data['name'],
            'location': data['location']
        }
