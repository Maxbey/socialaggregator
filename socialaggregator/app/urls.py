from aggregator.views import CurrentUser
from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^api/admin/', admin.site.urls),
    url(r'^api/auth/user/$', CurrentUser.as_view()),
    url(r'^api/auth/login/', include('rest_social_auth.urls_token'))

]
