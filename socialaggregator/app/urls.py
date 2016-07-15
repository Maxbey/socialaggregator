from app.views import ConfirmEmailView

from django.conf.urls import url, include
from django.contrib import admin
from aggregator.views import FacebookLogin

urlpatterns = [
    url(r'^api/admin/', admin.site.urls),
    url(r'^api/accounts/', include('allauth.urls')),

    url(r'^api/auth/', include('rest_auth.urls')),
    url(r'^api/auth/registration/', include('rest_auth.registration.urls')),

    url(r'^api/auth/email-confirmation/(?P<key>\w{64})/$', ConfirmEmailView.as_view(), name='account_confirm_email'),

    url(r'^api/auth/facebook/$', FacebookLogin.as_view(), name='fb_login')
]
