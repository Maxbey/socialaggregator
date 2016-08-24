from rest_framework.pagination import PageNumberPagination


class SocialPersonPagination(PageNumberPagination):
    page_size = 9