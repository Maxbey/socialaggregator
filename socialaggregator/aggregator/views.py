from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView


class FacebookAdapterFixed(FacebookOAuth2Adapter):
    def __init__(self):
        pass


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookAdapterFixed
