from django.contrib.auth import get_user_model

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_social_auth.serializers import UserSerializer
from rest_framework import mixins

from .models import UserSocialAuthSerializer
from social.apps.django_app.default.models import UserSocialAuth


class AuthByTokenViewSet(GenericViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_object(self):
        return self.request.user


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  AuthByTokenViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class UserSocialAuthViewSet(mixins.ListModelMixin, AuthByTokenViewSet):
    queryset = UserSocialAuth.objects.all()
    serializer_class = UserSocialAuthSerializer
