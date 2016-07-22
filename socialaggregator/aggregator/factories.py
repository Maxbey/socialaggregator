import factory
from django.contrib.auth import get_user_model
from social.apps.django_app.default.models import UserSocialAuth


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
    extra_data = factory.Faker('simple_profile')
