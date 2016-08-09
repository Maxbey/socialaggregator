from celery import shared_task, group
from social.apps.django_app.default.models import UserSocialAuth

from .fetchers.factory import SocialFetchStrategyFactory


def get_strategy(pk):
    account = UserSocialAuth.objects.get(pk=pk)

    return SocialFetchStrategyFactory.fabricate(
        account.provider,
        account
    )


@shared_task
def fetch_avatar_url(pk):
    return {'avatar_url': get_strategy(pk).get_avatar_url()}


@shared_task
def fetch_user_info(pk):
    return {'user_info': get_strategy(pk).get_user_info()}


@shared_task
def fetch_user_friends(pk):
    return {'friends': get_strategy(pk).get_friends()}


@shared_task
def fetch_user_followers(pk):
    return {'followers': get_strategy(pk).get_followers()}


@shared_task
def save_social_data(result, pk):
    account = UserSocialAuth.objects.get(pk=pk)
    social_data = {}

    for d in result:
        social_data.update(d)

    account.extra_data['social_data'] = social_data

    account.save()

    return result
