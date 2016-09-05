import random

import factory
from django.contrib.auth import get_user_model
from social.apps.django_app.default.models import UserSocialAuth

from aggregator.models import SocialPerson
from fetchers.fakedata import SOCIAL_DATA


class UserFactory(factory.DjangoModelFactory):

    class Meta:
        model = get_user_model()

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    username = factory.Faker('user_name')
    email = factory.Faker('safe_email')
    password = 'pass'

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        manager = cls._get_manager(model_class)

        return manager.create_user(*args, **kwargs)


class UserSocialAuthFactory(factory.DjangoModelFactory):

    class Meta:
        model = UserSocialAuth

    user = factory.SubFactory(UserFactory)

    provider = factory.Faker('word')
    uid = factory.Faker('ean')
    extra_data = {
        'access_token': 'token',
        'login': 'login',
        'social_data': SOCIAL_DATA
    }


class SocialPersonFactory(factory.DjangoModelFactory):

    class Meta:
        model = SocialPerson

    uid = factory.Faker('ean')
    name = factory.Faker('name')
    avatar_url = factory.Faker('image_url')
    email = factory.Faker('safe_email')
    provider = factory.Faker('domain_word')
    social_person_type = random.choice(['friend', 'follower'])


def build_social_persons(count):
    return factory.build_batch(dict, FACTORY_CLASS=SocialPersonFactory, size=count)
