from celery import chord
from social.apps.django_app.default.models import UserSocialAuth

import tasks
from .fetchers.factory import SocialFetchStrategyFactory


def load_social_data(social, *args, **kwargs):
    task_list = [
        tasks.fetch_avatar_url.s(social.id),
        tasks.fetch_user_info.s(social.id)
    ]

    account = UserSocialAuth.objects.get(pk=social.id)

    strategy = SocialFetchStrategyFactory.fabricate(
        account.provider,
        account
    )

    if 'friends' in strategy.relations:
        task_list.append(tasks.fetch_user_friends.s(social.id))

    if 'followers' in strategy.relations:
        task_list.append(tasks.fetch_user_followers.s(social.id))

    chord(task_list)(tasks.save_social_data.s(pk=social.id))
