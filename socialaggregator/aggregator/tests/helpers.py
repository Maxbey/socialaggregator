import operator
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient


def get_authorized_client(user):
    token = Token.objects.create(user=user)

    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    return client


def get_authorized_client_by_token(token):
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION='Token ' + token)

    return client


def fill_instance(instance, data):
    for (key, value) in data.items():
        setattr(instance, key, value)


def dict_from_model(instance, attributes, relations):
    def value(attribute_name):
        attribute = getattr(instance, attribute_name)
        print attribute
        print attribute not in relations

        return attribute if attribute_name not in relations else attribute.id

    return {attribute_name: value(attribute_name) for attribute_name in attributes}


def is_models_equal(first_instance, second_instance, attributes):
    get = operator.attrgetter(*attributes)

    return get(first_instance) == get(second_instance)
