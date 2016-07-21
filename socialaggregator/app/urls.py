from allauth.account.views import confirm_email
from django.conf.urls import url, include
from django.contrib import admin
from aggregator.views import UserViewSet

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

    url(r'^api/social_auth/login/', include('rest_social_auth.urls_token')),

    url(r'^api/', include(user_router.urls)),
    url(r'^api/', include(router.urls))

]
