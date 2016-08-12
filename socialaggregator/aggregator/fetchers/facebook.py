import json

import requests

from .base import BaseFetchStrategy


class FacebookFetchStrategy(BaseFetchStrategy):
    api_url = 'https://graph.facebook.com/v2.7'

    @property
    def relations(self):
        return ['friends']

    def __init__(self, user_social_auth):
        super(FacebookFetchStrategy, self).__init__(user_social_auth)

    def get_avatar_url(self):
        request_url = '%s/me/picture' % self.api_url

        params = {
            'access_token': self.access_token,
            'width': 500,
            'height': 500
        }
        response = requests.get(request_url, params=params)

        return response.url

    def get_friends(self):
        request_url = '%s/me/friends' % self.api_url

        params = {
            'access_token': self.access_token,
            'fields': 'name,picture'
        }
        response = requests.get(request_url, params=params)

        result = []
        friends = json.loads(response.content)['data']

        for friend in friends:
            result.append({
                'uid': friend['id'],
                'avatar_url': friend['picture']['data']['url'],
                'name': friend['name']
            })

        return result

    def get_friends_count(self):
        request_url = '%s/me' % self.api_url
        params = {
            'access_token': self.access_token,
            'fields': 'friends'
        }

        response = requests.get(request_url, params=params)

        return json.loads(response.content)['friends']['summary']['total_count']

    def get_user_info(self):
        request_url = '%s/me' % self.api_url

        params = {
            'access_token': self.access_token,
            'fields': 'location,name'
        }

        response = requests.get(request_url, params=params)
        data = json.loads(response.content)

        location = data['location']['name'] if 'location' in data else ''

        return {
            'location': location,
            'name': data['name']
        }
