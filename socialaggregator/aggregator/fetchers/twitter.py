import json

import oauth2
from django.conf import settings

from .base import BaseFetchStrategy


class TwitterFetchStrategy(BaseFetchStrategy):
    api_url = 'https://api.twitter.com/1.1'

    @property
    def relations(self):
        return ['friends', 'followers']

    def __init__(self, user_social_auth):
        super(TwitterFetchStrategy, self).__init__(user_social_auth)

        self.oauth_client = self.init_oauth_client()

    def init_oauth_client(self):
        consumer = oauth2.Consumer(
            key=settings.SOCIAL_AUTH_TWITTER_KEY,
            secret=settings.SOCIAL_AUTH_TWITTER_SECRET
        )

        token = oauth2.Token(
            key=self.access_token['oauth_token'],
            secret=self.access_token['oauth_token_secret']
        )

        return oauth2.Client(consumer, token)

    def oauth_request(self, url):
        response, content = self.oauth_client.request(url)

        return json.loads(content)

    def get_avatar_url(self):
        user = self.get_user_struct()

        return user['profile_image_url'].replace('_normal', '')

    def make_persons(self, raw_persons):
        persons = []

        for person in raw_persons:
            persons.append({
                'uid': person['id'],
                'avatar_url': person['profile_image_url'],
                'name': person['name']
            })

        return persons

    def obtain_users(self, ids, chunk_size):
        users = []
        chunks = [ids[i:i + chunk_size]
                  for i in xrange(0, len(ids), chunk_size)]

        for chunk in chunks:
            ids_str = ','.join(chunk)

            url = '%s/users/lookup.json?user_id=%s' % (self.api_url, ids_str)
            response, content = self.oauth_client.request(url)
            users += json.loads(content)

        return users

    def obtain_ids(self, relation):
        url = '%s/%s/ids.json?user_id=%d&stringify_ids=true' % (
            self.api_url, relation, self.uid)
        response, content = self.oauth_client.request(url)

        return json.loads(content)['ids']

    def get_friends(self):
        ids = self.obtain_ids('friends')
        users = self.obtain_users(ids, 100)

        return self.make_persons(users)

    def get_followers(self):
        ids = self.obtain_ids('followers')
        users = self.obtain_users(ids, 100)

        return self.make_persons(users)

    def get_user_struct(self):
        url = '%s/users/show.json?user_id=%d' % (self.api_url, self.uid)

        return self.oauth_request(url)

    def get_friends_count(self):
        return self.get_user_struct()['friends_count']

    def get_followers_count(self):
        return self.get_user_struct()['followers_count']

    def get_user_info(self):
        user = self.get_user_struct()

        return {
            'location': user['location'],
            'name': user['name']
        }
