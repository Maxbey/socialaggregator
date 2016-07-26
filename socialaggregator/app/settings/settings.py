import os

from configurations import values
from .base import BaseSettings
from .mixins import LoggingMixin


class Test(BaseSettings):
    DEBUG = True
    SECRET_KEY = 'somesecretvalue'

    INSTALLED_APPS = BaseSettings.INSTALLED_APPS + ['django_nose']

    TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'

    SOCIAL_AUTH_FACEBOOK_KEY = ''
    SOCIAL_AUTH_FACEBOOK_SECRET = ''

    SOCIAL_AUTH_GITHUB_KEY = ''
    SOCIAL_AUTH_GITHUB_SECRET = ''

    SOCIAL_AUTH_TWITTER_KEY = ''
    SOCIAL_AUTH_TWITTER_SECRET = ''

    SOCIAL_AUTH_VK_OAUTH2_KEY = ''
    SOCIAL_AUTH_VK_OAUTH2_SECRET = ''


class Development(LoggingMixin, BaseSettings):
    DEBUG = True
    SECRET_KEY = 'somesecretvalue'

    INSTALLED_APPS = BaseSettings.INSTALLED_APPS + [
        'django_extensions',
        'django_nose',
        'rest_framework_swagger',
        'raven.contrib.django.raven_compat'
    ]

    SWAGGER_SETTINGS = BaseSettings.SWAGGER_SETTINGS = {
        'exclude_url_names': [
            'login_social_token'
        ],
    }

    RAVEN_CONFIG = {
        'dsn': BaseSettings.SENTRY_PRIVATE_DSN
    }

    TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'

    SOCIAL_AUTH_FACEBOOK_KEY = values.SecretValue(environ_prefix='')
    SOCIAL_AUTH_FACEBOOK_SECRET = values.SecretValue(environ_prefix='')

    SOCIAL_AUTH_GITHUB_KEY = values.SecretValue(environ_prefix='')
    SOCIAL_AUTH_GITHUB_SECRET = values.SecretValue(environ_prefix='')

    SOCIAL_AUTH_TWITTER_KEY = values.SecretValue(environ_prefix='')
    SOCIAL_AUTH_TWITTER_SECRET = values.SecretValue(environ_prefix='')

    SOCIAL_AUTH_VK_OAUTH2_KEY = values.SecretValue(environ_prefix='')
    SOCIAL_AUTH_VK_OAUTH2_SECRET = values.SecretValue(environ_prefix='')
