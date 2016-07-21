from rest_framework.serializers import ModelSerializer
from social.apps.django_app.default.models import UserSocialAuth


class UserSocialAuthSerializer(ModelSerializer):

    class Meta:
        model = UserSocialAuth
        exclude = ('extra_data',)
