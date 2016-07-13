from app.views import ConfirmEmailView

from allauth.account.views import confirm_email
from django.conf.urls import url, include
from django.contrib import admin
from aggregator.views import TwitterLogin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/', include('allauth.urls')),

    url(r'^auth/', include('rest_auth.urls')),
    url(r'^auth/registration/', include('rest_auth.registration.urls')),

    url(r'^auth/email-confirmation/(?P<key>\w{64})/$', ConfirmEmailView.as_view(), name='account_confirm_email'),

    url(r'^auth/twitter/$', TwitterLogin.as_view(), name='twitter_login'),

    url(r'^.*$', 'app.views.home', name='home')
]
