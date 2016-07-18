from aggregator.views import CurrentUser
from allauth.account.views import confirm_email
from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^api/admin/', admin.site.urls),
    url(r'^api/auth/user/$', CurrentUser.as_view()),
    url(r'^api/auth/', include('rest_auth.urls')),
    url(r'^api/auth/registration/', include('rest_auth.registration.urls')),
    url(r'^api/auth/email-confirmation/(?P<key>\w+)/$', confirm_email, name="account_confirm_email"),

    url(r'^api/social_auth/login/', include('rest_social_auth.urls_token'))

]
