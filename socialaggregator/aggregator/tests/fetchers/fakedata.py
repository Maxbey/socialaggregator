USER_INFO = {
    'name': 'Firstname Lastname',
    'location': 'City, Country'
}

SOCIAL_DATA = {
    'avatar_url': 'someurl',
    'followers_count': 2,
    'friends_count': 2,
    'user_info': USER_INFO
}

SOCIAL_DATA_RESPONSE = {
    'avatar_url': SOCIAL_DATA['avatar_url'],
    'counts': {
        'followers': SOCIAL_DATA['followers_count'],
        'friends': SOCIAL_DATA['friends_count']
    },
    'social_relations': ['friends', 'followers'],
    'user_info': USER_INFO
}

FACEBOOK_FRIENDS = {
    'friends': {
        'data': [{
            'id': 1,
            'name': 'first friend',
            'picture': {
                'data': {
                    'url': 'avaurl1'
                }
            }
        }, {
            'id': 2,
            'name': 'second friend',
            'picture': {
                'data': {
                    'url': 'avaurl2'
                }
            }
        }],
        'summary': {
            'total_count': 2
        }
    }
}

FACEBOOK_USER_INFO = {
    'name': USER_INFO['name'],
    'location': {
        'id': '123',
        'name': USER_INFO['location']
    },
    'id': '123'
}

GITHUB_FOLLOWERS = [{
    'id': 1,
    'avatar_url': 'avaurl1',
    'url': 'url1'
}, {
    'id': 2,
    'avatar_url': 'avaurl2',
    'url': 'url2'
}]

GITHUB_USER_INFO = {
    'login': 'octocat',
    'name': USER_INFO['name'],
    'location': USER_INFO['location'],
    'followers': 2
}

TWITTER_USER_INFO = {
    'name': 'Firstname Lastname',
    'location': 'Country, City',
    'followers_count': 12,
    'friends_count': 20
}

TWITTER_PERSONS = {
    'users': [
        {'id': 1, 'name': 'name1', 'profile_image_url': 'avatarurl1'},
        {'id': 2, 'name': 'name2', 'profile_image_url': 'avatarurl2'},
    ]
}
