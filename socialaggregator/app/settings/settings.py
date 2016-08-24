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

    BROKER_URL = values.Value(environ_prefix='', environ_name='REDISCLOUD_URL')
    CELERY_RESULT_BACKEND = values.Value(
        environ_required=True, environ_prefix='')

    DATABASES = DATABASE_URL

    INSTALLED_APPS = BaseSettings.INSTALLED_APPS + [
        'corsheaders',
        'raven.contrib.django.raven_compat'
    ]

    MIDDLEWARE_CLASSES = BaseSettings.MIDDLEWARE_CLASSES + \
        ['corsheaders.middleware.CorsMiddleware']

    CORS_ALLOW_CREDENTIALS = True

    ALLOWED_HOSTS = ['*']

    CORS_ORIGIN_ALLOW_ALL = True

    RAVEN_CONFIG = {
        'dsn': BaseSettings.SENTRY_PRIVATE_DSN
    }

    EMAIL_HOST = 'smtp.mailgun.org'
    EMAIL_HOST_USER = values.Value(environ_prefix='', environ_name='MAILGUN_SMTP_LOGIN')
    EMAIL_HOST_PASSWORD = values.Value(environ_prefix='', environ_name='MAILGUN_SMTP_PASSWORD')
    DEFAULT_FROM_EMAIL = values.Value(environ_name='FRONTEND_URI', environ_prefix='')


class Development(LoggingMixin, EnvWithRealAuth):
    DEBUG = True
    SECRET_KEY = get_random_string(length=32)

    DATABASE_URL = values.DatabaseURLValue(
        environ_required=True, environ_prefix='')

    DATABASES = DATABASE_URL

    INSTALLED_APPS = BaseSettings.INSTALLED_APPS + [
        'django_extensions',
        'django_nose',
        'raven.contrib.django.raven_compat',
        'corsheaders'
    ]

    RAVEN_CONFIG = {
        'dsn': BaseSettings.SENTRY_PRIVATE_DSN
    }

    TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'

    MIDDLEWARE_CLASSES = BaseSettings.MIDDLEWARE_CLASSES + \
        ['corsheaders.middleware.CorsMiddleware']

    CORS_ALLOW_CREDENTIALS = True

    CORS_ORIGIN_ALLOW_ALL = True

    BROKER_URL = values.Value(environ_prefix='', environ_name='REDIS_URL')
    CELERY_RESULT_BACKEND = values.Value(
        environ_prefix='', environ_name='REDIS_URL')

    EMAIL_HOST = 'smtp.gmail.com'
    EMAIL_HOST_USER = values.Value(environ_prefix='')
    EMAIL_HOST_PASSWORD = values.Value(environ_prefix='')


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

    EMAIL_HOST = ''
    EMAIL_HOST_USER = ''
    EMAIL_HOST_PASSWORD = ''
