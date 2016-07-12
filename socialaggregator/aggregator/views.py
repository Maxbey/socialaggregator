from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from django.shortcuts import render
from rest_auth.social_serializers import TwitterLoginSerializer
from rest_auth.views import LoginView


class TwitterLogin(LoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter


