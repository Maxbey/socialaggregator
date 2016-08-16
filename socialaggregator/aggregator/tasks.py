from celery import shared_task, group
from django.db.models import Q
from social.apps.django_app.default.models import UserSocialAuth
import logging

from .models import SocialPerson
from .fetchers.factory import SocialFetchStrategyFactory


def get_strategy(pk):
    account = UserSocialAuth.objects.get(pk=pk)

    return SocialFetchStrategyFactory.fabricate(
        account.provider,
        account
    )


@shared_task
def create_social_persons(persons, account_pk, person_type):
    account = UserSocialAuth.objects.get(pk=account_pk)
    db_persons = []

    for person in persons:
        db_person, created = SocialPerson.objects.update_or_create(
            uid=person['uid'],
            provider=account.provider,
            social_person_type=person_type,
            defaults=person
        )

        db_persons.append(db_person)

    all_persons = account.socialperson_set.filter(
        ~Q(social_person_type=person_type)
    )

    account.socialperson_set.set(list(all_persons) + db_persons)

    return persons


@shared_task
def fetch_avatar_url(pk):
    return {'avatar_url': get_strategy(pk).get_avatar_url()}


@shared_task
def fetch_user_info(pk):
    return {'user_info': get_strategy(pk).get_user_info()}


@shared_task
def fetch_user_friends(pk):
    return get_strategy(pk).get_friends()


@shared_task
def fetch_user_followers(pk):
    return get_strategy(pk).get_followers()


@shared_task
def fetch_user_friends_count(pk):
    return {
        'friends_count': get_strategy(pk).get_friends_count()
    }


@shared_task
def fetch_user_followers_count(pk):
    return {
        'followers_count': get_strategy(pk).get_followers_count()
    }


@shared_task
def save_social_data(result, pk):
    account = UserSocialAuth.objects.get(pk=pk)
    social_data = {}

    for d in result:
        social_data.update(d)

    account.extra_data['social_data'] = social_data
    account.save()

    return result
