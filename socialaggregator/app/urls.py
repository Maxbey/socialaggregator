from django.conf.urls import url, include
from django.contrib import admin
from aggregator.views import UserViewSet
from aggregator.views import SocialAuthView
from aggregator.routers import UserRouter
from rest_framework.routers import SimpleRouter
from aggregator.views import UserSocialAuthViewSet
import rest_auth.views
from rest_auth.registration.views import RegisterView, VerifyEmailView

from aggregator.views import SocialPersonViewSet

user_router = UserRouter()
router = SimpleRouter()

user_router.register(r'user', UserViewSet)
router.register(r'social_account', UserSocialAuthViewSet)
router.register(r'social_person', SocialPersonViewSet)

urlpatterns = [
    url(r'^', include('django.contrib.auth.urls')),
    url(r'^admin/', admin.site.urls),

    url(r'^api/auth/registration/', RegisterView.as_view(), name='register_view'),
    url(r'^api/auth/login/$', rest_auth.views.LoginView.as_view(), name='rest_login'),
    url(r'^api/auth/logout/$', rest_auth.views.LogoutView.as_view(), name='rest_logout'),
    url(r'^api/auth/confirm_email/$', VerifyEmailView.as_view()),

    url(
        r'^api/auth/password/confirm/$',
        rest_auth.views.PasswordResetConfirmView.as_view(),
        name='password_reset_confirm'
    ),
    url(r'^api/auth/password/reset/$', rest_auth.views.PasswordResetView.as_view()),
    url(r'^api/auth/password/change/$', rest_auth.views.PasswordChangeView.as_view()),

    url(r'^api/social_auth/login/social/token/(?:(?P<provider>[a-zA-Z0-9_-]+)/?)?$',
        SocialAuthView.as_view(),
        name='login_social_token'),

    url(r'^api/', include(user_router.urls)),
    url(r'^api/', include(router.urls))

]
