import os

from configurations import Configuration, values


class BaseSettings(Configuration):
    BASE_DIR = os.path.dirname(os.path.dirname(__file__))

    FRONTEND_URI = values.Value(environ_prefix='', environ_required=True)
    FRONTEND_CONFIRMATION_URI = values.Value(
        environ_prefix='', environ_required=True)

    ALLOWED_HOSTS = []

    SENTRY_PRIVATE_DSN = values.Value(environ_prefix='')

    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'django.contrib.sites',
        'rest_framework',
        'rest_framework.authtoken',
        'social.apps.django_app.default',
        'rest_social_auth',
        'allauth',
        'allauth.account',
        'rest_auth',
        'aggregator'
    ]

    ACCOUNT_ADAPTER = 'aggregator.allauth_account_adapter.AccountAdapter'
    REST_SESSION_LOGIN = False

    MIDDLEWARE_CLASSES = [
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ]

    ROOT_URLCONF = 'app.urls'

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]

    AUTHENTICATION_BACKENDS = (
        'social.backends.facebook.FacebookOAuth2',
        'social.backends.github.GithubOAuth2',
        'social.backends.vk.VKOAuth2',
        'social.backends.twitter.TwitterOAuth',
        'allauth.account.auth_backends.AuthenticationBackend',
        'django.contrib.auth.backends.ModelBackend',
    )

    SOCIAL_AUTH_PIPELINE = (
        'social.pipeline.social_auth.social_details',
        'social.pipeline.social_auth.social_uid',
        'social.pipeline.social_auth.auth_allowed',
        'social.pipeline.social_auth.social_user',
        'social.pipeline.user.get_username',
        'social.pipeline.user.create_user',
        'social.pipeline.social_auth.associate_user',
        'social.pipeline.social_auth.load_extra_data',
        'social.pipeline.user.user_details',
        'aggregator.pipeline.load_social_data'
    )

    WSGI_APPLICATION = 'app.wsgi.application'

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }

    AUTH_PASSWORD_VALIDATORS = [
        {
            'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        },
    ]

    LANGUAGE_CODE = 'en-us'

    TIME_ZONE = 'UTC'

    USE_I18N = True

    USE_L10N = True

    USE_TZ = True

    SITE_ID = 1

    STATIC_URL = '/static/'
    STATIC_ROOT = 'staticfiles'

    ACCOUNT_EMAIL_REQUIRED = True
    ACCOUNT_UNIQUE_EMAIL = True
    ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
    ACCOUNT_USERNAME_REQUIRED = False
    ACCOUNT_AUTHENTICATION_METHOD = 'email'

    EMAIL_USE_TLS = True
    EMAIL_PORT = 587

    SOCIAL_AUTH_PROTECTED_USER_FIELDS = ['email', 'first_name', 'last_name']

    SOCIAL_AUTH_FACEBOOK_SCOPE = [
        'email', 'user_friends', 'public_profile', 'user_location']
    SOCIAL_AUTH_VK_OAUTH2_SCOPE = ['friends', 'photos', 'email', 'photo_big']
