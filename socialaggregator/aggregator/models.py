from django.db import models
from social.apps.django_app.default.models import UserSocialAuth


class SocialPerson(models.Model):
    person_type = ['friend', 'follower']

    uid = models.CharField(max_length=255)
    name = models.CharField(max_length=40)
    avatar_url = models.URLField()
    email = models.EmailField(null=True)

    provider = models.CharField(max_length=32)

    social_person_type = models.CharField(
        max_length=9,
        choices=[(p_type, p_type) for p_type in person_type]
    )

    user_social_auth = models.ManyToManyField(UserSocialAuth)

    def __str__(self):
        return self.name
