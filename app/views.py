from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_auth.registration.serializers import VerifyEmailSerializer
from rest_auth.registration.views import VerifyEmailView
from rest_framework import status
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


def home(request):
    return render(request, 'index.html')


class ConfirmEmailView(VerifyEmailView):
    permission_classes = (AllowAny,)
    allowed_methods = ('GET')

    def post(self, *args, **kwargs):
        raise MethodNotAllowed('POST')

    def get(self, request, key):

        self.kwargs['key'] = key
        confirmation = self.get_object()
        confirmation.confirm(self.request)

        return render(request, 'email_confirmed.html')