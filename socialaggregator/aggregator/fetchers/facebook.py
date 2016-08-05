import json

import requests

from .base import BaseFetchStrategy


class FacebookFetchStrategy(BaseFetchStrategy):
    api_url = 'https://graph.facebook.com/v2.7/%d/%s'
    avatar_size = {'width': 500, 'height': 500}

    @property
    def relations(self):
        return ['friends']

    def __init__(self, user_social_auth):
        super(FacebookFetchStrategy, self).__init__(user_social_auth)

    def _get_friends_struct(self):
        params = {'access_token': self.access_token}
        request_url = self.api_url % (self.uid, 'friends')
        response = requests.get(request_url, params=params)

        return json.loads(response.content)

    def get_avatar_url(self):
        request_url = self.api_url % (self.uid, 'picture')
        response = requests.get(request_url, params=self.avatar_size)

        return response.url

    def get_friends(self):
        return self._get_friends_struct()['data']

    def get_friends_count(self):
        return self._get_friends_struct()['summary']['total_count']

    def get_user_info(self):
        request_url = 'https://graph.facebook.com/v2.7/me'
        params = {
            'access_token': self.access_token,
            'fields': 'location,name'
        }

        response = requests.get(request_url, params=params)
        data = json.loads(response.content)

        return {
            'location': data['location']['name'],
            'name': data['name']
        }
