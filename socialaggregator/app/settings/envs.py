from configurations import values

from .base import BaseSettings


class EnvWithRealAuth(BaseSettings):
    SOCIAL_AUTH_FACEBOOK_KEY = values.SecretValue(environ_prefix='')
    SOCIAL_AUTH_FACEBOOK_SECRET = values.SecretValue(environ_prefix='')

    SOCIAL_AUTH_GITHUB_KEY = values.SecretValue(environ_prefix='')
    SOCIAL_AUTH_GITHUB_SECRET = values.SecretValue(environ_prefix='')

    SOCIAL_AUTH_TWITTER_KEY = values.SecretValue(environ_prefix='')
    SOCIAL_AUTH_TWITTER_SECRET = values.SecretValue(environ_prefix='')

    SOCIAL_AUTH_VK_OAUTH2_KEY = values.SecretValue(environ_prefix='')
    SOCIAL_AUTH_VK_OAUTH2_SECRET = values.SecretValue(environ_prefix='')

    BROKER_TRANSPORT = 'redis'
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'
    CELERY_ACCEPT_CONTENT = ['json']
    CELERY_ENABLE_UTC = True

    EMAIL_HOST = values.Value(environ_prefix='', environ_name='MAILGUN_SMTP_SERVER')
    EMAIL_HOST_USER = values.SecretValue(environ_prefix='', environ_name='MAILGUN_SMTP_LOGIN')
    EMAIL_HOST_PASSWORD = values.SecretValue(environ_prefix='', environ_name='MAILGUN_SMTP_PASSWORD')
