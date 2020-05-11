from django.urls import path, include
from .views import GoogleLogin, UserListView, UserDetailView

urlpatterns = [
    path('social/google/', GoogleLogin.as_view(), name='google_login'),
    path('users/', UserListView.as_view(), name='users_list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='users_list'),
    path('', include('rest_auth.urls')),
]
