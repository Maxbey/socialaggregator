from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from social.apps.django_app.default.models import UserSocialAuth

from aggregator.fetchers.fetcher import SocialDataFetcherFactory


class UserSocialAuthSerializer(ModelSerializer):
    avatar_url = serializers.SerializerMethodField()
    followers_cnt = serializers.SerializerMethodField()
    friends_cnt = serializers.SerializerMethodField()

    def get_fetcher(self, user_social_auth):
        return SocialDataFetcherFactory.fabricate(
            user_social_auth.provider,
            user_social_auth
        )

    def get_avatar_url(self, user_social_auth):
        return self.get_fetcher(user_social_auth).get_avatar_url()

    def get_followers_cnt(self, user_social_auth):
        fetcher = self.get_fetcher(user_social_auth)

        return len(fetcher.get_followers()) \
            if 'get_followers' in dir(fetcher) else 0

    def get_friends_cnt(self, user_social_auth):
        fetcher = self.get_fetcher(user_social_auth)

        return fetcher.get_friends()['summary']['total_count'] \
            if 'get_friends' in dir(fetcher) else 0

    class Meta:
        model = UserSocialAuth
        exclude = ('extra_data',)
