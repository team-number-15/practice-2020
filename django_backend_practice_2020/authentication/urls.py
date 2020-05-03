from django.urls import path
from .views import GoogleLogin, UserList

urlpatterns = [
    path('social/google/', GoogleLogin.as_view(), name='google_login'),
    path('users/', UserList.as_view(), name='users_list')
]
