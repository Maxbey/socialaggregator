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
        result = []

        params = {'access_token': self.access_token}
        request_url = '%s/user/followers' % self.api_url

        response = requests.get(request_url, params=params)
        followers = json.loads(response.content)

        for follower in followers:
            f = {
                'uid': follower['id'],
                'avatar_url': follower['avatar_url']
            }

            name = self.get_follower_name(follower['url'])

            if name is None:
                name = follower['login']

            f['name'] = name

            result.append(f)

        return result

    def get_follower_name(self, url):
        response = requests.get(url)

        return json.loads(response.content)['name']

    def get_followers_count(self):
        params = {'access_token': self.access_token}
        request_url = '%s/user' % self.api_url

        response = requests.get(request_url, params=params)

        return json.loads(response.content)['followers']

    def get_user_info(self):
        params = {'access_token': self.access_token}
        request_url = '%s/user' % self.api_url

        response = requests.get(request_url, params=params)
        data = json.loads(response.content)

        return {
            'name': data['name'],
            'location': data['location']
        }
