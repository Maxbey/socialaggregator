from .twitter import TwitterFetchStrategy
from .facebook import FacebookFetchStrategy
from .github import GithubFetchStrategy


class SocialFetchStrategyFactory(object):
    _classes = {
        'facebook': FacebookFetchStrategy,
        'github': GithubFetchStrategy,
        'twitter': TwitterFetchStrategy
    }

    _err_pattern = 'Cannot create an instance of %s strategy'

    @classmethod
    def fabricate(cls, strategy, user_social_auth):
        if strategy not in cls._classes:
            raise Exception(cls._err_pattern % strategy)

        return cls._classes[strategy](user_social_auth)
