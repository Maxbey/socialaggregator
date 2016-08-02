import json

import requests

from .base import BaseFetchStrategy


class FacebookFetchStrategy(BaseFetchStrategy):
    api_url = 'https://graph.facebook.com/v2.7/%d/%s'
    avatar_size = {'width': 200, 'height': 200}

    @property
    def relations(self):
        return ['friends']

    def __init__(self, user_social_auth):
        super(FacebookFetchStrategy, self).__init__(user_social_auth)

    def get_avatar_url(self):
        request_url = self.api_url % (self.uid, 'picture')
        response = requests.get(request_url, params=self.avatar_size)

        return response.url

    def get_friends(self):
        params = {'access_token': self.access_token}
        request_url = self.api_url % (self.uid, 'friends')
        response = requests.get(request_url, params=params)

        return json.loads(response.content)
