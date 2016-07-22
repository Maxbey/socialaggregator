from allauth.account.views import confirm_email
from django.conf.urls import url, include
from django.contrib import admin
from aggregator.views import UserViewSet
from aggregator.views import SocialAuthView
from aggregator.routers import UserRouter
from rest_framework.routers import SimpleRouter
from aggregator.views import UserSocialAuthViewSet
from rest_auth.views import LoginView, LogoutView
from rest_auth.registration.views import RegisterView

user_router = UserRouter()
router = SimpleRouter()

user_router.register(r'user', UserViewSet)
router.register(r'social_account', UserSocialAuthViewSet)

urlpatterns = [
    url(r'^api/admin/', admin.site.urls),

    url(r'^api/auth/registration/', RegisterView.as_view(), name='register_view'),
    url(r'^api/auth/login/$', LoginView.as_view(), name='rest_login'),
    url(r'^api/auth/logout/$', LogoutView.as_view(), name='rest_logout'),

    url(r'^api/auth/email-confirmation/(?P<key>\w+)/$',
        confirm_email, name='account_confirm_email'),

    url(r'^api/social_auth/login/social/token/(?:(?P<provider>[a-zA-Z0-9_-]+)/?)?$',
        SocialAuthView.as_view(),
        name='login_social_token'),

    url(r'^api/', include(user_router.urls)),
    url(r'^api/', include(router.urls)),
    url(r'^api/docs/', include('rest_framework_swagger.urls'))

]
