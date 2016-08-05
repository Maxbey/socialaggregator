from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from social.apps.django_app.default.models import UserSocialAuth

from aggregator.fetchers.factory import SocialFetchStrategyFactory


class UserSocialAuthSerializer(ModelSerializer):

    social_data = serializers.SerializerMethodField()

    def get_strategy(self, user_social_auth):
        return SocialFetchStrategyFactory.fabricate(
            user_social_auth.provider,
            user_social_auth
        )

    def get_social_data(self, user_social_auth):
        strategy = self.get_strategy(user_social_auth)

        followers_count = strategy.get_followers_count() \
            if 'followers' in strategy.relations else 0

        friends_count = strategy.get_friends_count() \
            if 'friends' in strategy.relations else 0

        return {
            'avatar_url': strategy.get_avatar_url(),
            'counts': {
                'followers_count': followers_count,
                'friends_count': friends_count
            },
            'social_relations': strategy.relations,
            'user_info': strategy.get_user_info()
        }

    class Meta:
        model = UserSocialAuth
        exclude = ('extra_data',)
