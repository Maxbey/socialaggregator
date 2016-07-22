from allauth.account.views import confirm_email
from django.conf.urls import url, include
from django.contrib import admin
from aggregator.views import UserViewSet
from aggregator.views import SocialAuthView
from aggregator.routers import UserRouter
from rest_framework.routers import SimpleRouter

from aggregator.views import UserSocialAuthViewSet

user_router = UserRouter()
router = SimpleRouter()

user_router.register(r'user', UserViewSet)
router.register(r'social_account', UserSocialAuthViewSet)

urlpatterns = [
    url(r'^api/admin/', admin.site.urls),
    url(r'^api/auth/', include('rest_auth.urls')),
    url(r'^api/auth/registration/', include('rest_auth.registration.urls')),
    url(r'^api/auth/email-confirmation/(?P<key>\w+)/$',
        confirm_email, name='account_confirm_email'),

    url(r'^api/social_auth/login/social/token/(?:(?P<provider>[a-zA-Z0-9_-]+)/?)?$',
        SocialAuthView.as_view(),
        name='login_social_token'),

    url(r'^api/', include(user_router.urls)),
    url(r'^api/', include(router.urls))

]
