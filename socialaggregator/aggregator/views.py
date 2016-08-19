from urlparse import parse_qs

from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache

from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_social_auth.serializers import UserSerializer
from rest_framework import mixins
from rest_social_auth.views import SocialTokenOnlyAuthView, decorate_request
from social.exceptions import AuthException
from requests.exceptions import HTTPError

from aggregator.models import SocialPerson
from .serializers import UserSocialAuthSerializer, SocialPersonSerializer

from social.apps.django_app.default.models import UserSocialAuth


class AuthByTokenViewSet(GenericViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class UserViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, AuthByTokenViewSet):
    """
    Returns Users details in JSON format.
    """
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserSocialAuthViewSet(mixins.ListModelMixin, mixins.DestroyModelMixin, AuthByTokenViewSet):
    """
    User social accounts viewset.
    """
    queryset = UserSocialAuth.objects.all()
    serializer_class = UserSocialAuthSerializer

    def get_queryset(self):
        user = self.request.user

        return self.queryset.filter(user=user)


class SocialPersonViewSet(mixins.ListModelMixin, AuthByTokenViewSet):
    """
    Endpoint for fetching user`s friends and followers.
    """
    queryset = SocialPerson.objects.all()
    serializer_class = SocialPersonSerializer

    def get_queryset(self):
        user = self.request.user
        accounts = user.social_auth.all()

        return self.queryset.filter(user_social_auth__in=accounts)


class SocialAuthView(SocialTokenOnlyAuthView):
    redirect_uri = settings.FRONTEND_URI

    def respond_error(self, error):
        """
        Redefined method (original in BaseSocialAuthView).
        Motivation: for more intuitive error handling
                    using the django rest framework.
        """
        raise ValidationError(error.message)

    @method_decorator(never_cache)
    def post(self, request, *args, **kwargs):
        """
        Redefined post endpoint (original in BaseSocialAuthView).
        Motivation: fixed redirect on invalid uri that occur when
                    trying to retrieve request token in case of OAuth1.
        """
        input_data = self.get_serializer_in_data()
        provider_name = self.get_provider_name(input_data)
        if not provider_name:
            return self.respond_error('Provider is not specified')
        self.set_input_data(request, input_data)
        decorate_request(request, provider_name)

        # The fix is to override the redirect uri directly after
        # the auth provider instance was created.
        self.request.backend.redirect_uri = self.redirect_uri

        serializer_in = self.get_serializer_in(data=input_data)
        if self.oauth_v1() and request.backend.OAUTH_TOKEN_PARAMETER_NAME not in input_data:
            request_token = parse_qs(request.backend.set_unauthorized_token())
            return Response(request_token)
        serializer_in.is_valid(raise_exception=True)
        try:
            user = self.get_object()
        except (AuthException, HTTPError) as e:
            return self.respond_error(e)
        if isinstance(user, HttpResponse):
            return user
        resp_data = self.get_serializer(instance=user)
        self.do_login(request.backend, user)
        return Response(resp_data.data)
