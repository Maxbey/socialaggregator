USER_INFO = {
    'name': 'Firstname Lastname',
    'location': 'City, Country'
}

SOCIAL_DATA = {
    'avatar_url': 'someurl',
    'counts': {
        'followers_count': 2,
        'friends_count': 2
    },
    'social_relations': ['friends', 'followers'],
    'user_info': USER_INFO
}

FACEBOOK_FRIENDS = {
    "data": [{}, {}],
    "summary": {
        "total_count": 2
    }
}

FACEBOOK_USER_INFO = {
    "name": USER_INFO['name'],
    "location": {
        "id": "123",
        "name": USER_INFO['location']
    },
    "id": "123"
}

GITHUB_FOLLOWERS = [{}, {}]

GITHUB_USER_INFO = {
    "login": "octocat",
    "name": USER_INFO['name'],
    "location": USER_INFO['location']
}
