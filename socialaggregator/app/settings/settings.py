from configurations import values
from django.utils.crypto import get_random_string

from .envs import EnvWithRealAuth
from .base import BaseSettings
from .mixins import LoggingMixin


class Production(EnvWithRealAuth):
    DEBUG = False
    SECRET_KEY = values.SecretValue(environ_prefix='')

    DATABASE_URL = values.DatabaseURLValue(
        environ_required=True, environ_prefix='')

    DATABASES = DATABASE_URL

    INSTALLED_APPS = BaseSettings.INSTALLED_APPS + [
        'corsheaders',
        'raven.contrib.django.raven_compat'
    ]

    MIDDLEWARE_CLASSES = BaseSettings.MIDDLEWARE_CLASSES + ['corsheaders.middleware.CorsMiddleware']

    CORS_ALLOW_CREDENTIALS = True

    ALLOWED_HOSTS = ['*']

    CORS_ORIGIN_ALLOW_ALL = True

    RAVEN_CONFIG = {
        'dsn': BaseSettings.SENTRY_PRIVATE_DSN
    }


class Development(LoggingMixin, EnvWithRealAuth):
    DEBUG = True
    SECRET_KEY = get_random_string(length=32)

    INSTALLED_APPS = BaseSettings.INSTALLED_APPS + [
        'django_extensions',
        'django_nose',
        'rest_framework_swagger',
        'raven.contrib.django.raven_compat',
        'corsheaders'
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

    MIDDLEWARE_CLASSES = BaseSettings.MIDDLEWARE_CLASSES + ['corsheaders.middleware.CorsMiddleware']

    CORS_ALLOW_CREDENTIALS = True

    CORS_ORIGIN_ALLOW_ALL = True


class Test(BaseSettings):
    DEBUG = True
    SECRET_KEY = get_random_string(length=32)

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
