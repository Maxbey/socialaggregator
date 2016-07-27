from configurations import values

from .envs import EnvWithRealAuth
from .base import BaseSettings
from .mixins import LoggingMixin


class Production(EnvWithRealAuth):
    DEBUG = True
    SECRET_KEY = values.SecretValue(environ_prefix='')

    DATABASE_URL = values.DatabaseURLValue(
        environ_required=True, environ_prefix='')

    DATABASES = DATABASE_URL

    INSTALLED_APPS = BaseSettings.INSTALLED_APPS + ['corsheaders']

    MIDDLEWARE_CLASSES = BaseSettings.MIDDLEWARE_CLASSES + ['corsheaders.middleware.CorsMiddleware']

    CORS_ORIGIN_WHITELIST = ('socialaggregator.dev', )

    CORS_ALLOW_CREDENTIALS = True


class Development(LoggingMixin, EnvWithRealAuth):
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
