from abc import ABCMeta, abstractproperty, abstractmethod


class BaseFetchStrategy(object):
    __metaclass__ = ABCMeta

    def __init__(self, user_social_auth):
        self.uid = int(user_social_auth.uid)

        self.access_token = user_social_auth.extra_data['access_token']

    @abstractproperty
    def relations(self):
        """
        Must be implemented in child classes.
        """

    @abstractmethod
    def get_avatar_url(self):
        """
        Must be implemented in child classes.
        """

    @abstractmethod
    def get_user_info(self):
        """
        Must be implemented in child classes.
        """

    def get_friends(self):
        assert False, 'Method get_friends not implemented'

    def get_followers(self):
        assert False, 'Method get_followers not implemented'
