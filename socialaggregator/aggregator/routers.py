from rest_framework.routers import Route, SimpleRouter


class UserRouter(SimpleRouter):
    routes = [
        Route(
            url=r'^{prefix}{trailing_slash}$',
            mapping={
                'put': 'update',
                'get': 'retrieve'
            },
            name='{basename}-list',
            initkwargs={'suffix': 'List'}
        ),
    ]
