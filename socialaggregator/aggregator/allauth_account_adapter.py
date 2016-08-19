from allauth.account.adapter import DefaultAccountAdapter
from allauth.utils import get_current_site
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status


class AccountAdapter(DefaultAccountAdapter):
    mail_templates = {
        'email_confirmation': 'mails/email_confirmation'
    }

    def get_email_confirmation_url(self, request, emailconfirmation):
        frontend_confirmation_uri = settings.FRONTEND_CONFIRMATION_URI

        if not frontend_confirmation_uri.endswith('/'):
            frontend_confirmation_uri += '/'

        frontend_confirmation_uri += emailconfirmation.key

        return frontend_confirmation_uri

    def format_email_subject(self, subject):
        return subject

    def send_confirmation_mail(self, request, emailconfirmation, signup):
        current_site = get_current_site(request)
        activation_url = self.get_email_confirmation_url(
            request, emailconfirmation)

        context = {
            'user': emailconfirmation.email_address.user,
            'activation_url': activation_url,
            'current_site': current_site
        }

        self.send_mail(
            self.mail_templates['email_confirmation'],
            emailconfirmation.email_address.email,
            context
        )

    def respond_email_verification_sent(self, request, user):
        return Response({
            'You are successfully registered',
            status.HTTP_201_CREATED
        })
