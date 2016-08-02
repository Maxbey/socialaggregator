from .facebook import FacebookFetchStrategy
from .github import GithubFetchStrategy


class SocialDataFetcherFactory(object):
    _classes = {
        'facebook': FacebookFetchStrategy,
        'github': GithubFetchStrategy
    }

    _err_pattern = 'Cannot create an instance of %s strategy'

    @classmethod
    def fabricate(cls, strategy, user_social_auth):
        if strategy not in cls._classes:
            raise Exception(cls._err_pattern % strategy)

        strategy_instance = cls._classes[strategy](user_social_auth)

        return SocialDataFetcher(strategy_instance)


class SocialDataFetcher(object):
    def __init__(self, fetch_strategy):
        self.get_avatar_url = fetch_strategy.get_avatar_url

        if 'friends' in fetch_strategy.relations:
            self.get_friends = fetch_strategy.get_friends
        if 'followers' in fetch_strategy.relations:
            self.get_followers = fetch_strategy.get_followers
