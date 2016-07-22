from django.contrib.auth import get_user_model

from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_social_auth.serializers import UserSerializer
from rest_framework import mixins
from rest_social_auth.views import SocialTokenOnlyAuthView
from .models import UserSocialAuthSerializer
from social.apps.django_app.default.models import UserSocialAuth


class AuthByTokenViewSet(GenericViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class UserViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, AuthByTokenViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserSocialAuthViewSet(mixins.ListModelMixin, mixins.DestroyModelMixin, AuthByTokenViewSet):
    queryset = UserSocialAuth.objects.all()
    serializer_class = UserSocialAuthSerializer

    def get_queryset(self):
        user = self.request.user

        return self.queryset.filter(user=user)


class SocialAuthView(SocialTokenOnlyAuthView):

    def respond_error(self, error):
        raise ValidationError(error.message)
