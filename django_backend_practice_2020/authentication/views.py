from django.contrib.auth.models import User

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter

from rest_auth.registration.views import SocialLoginView
from rest_framework.generics import ListCreateAPIView

from .serializers import UserSerializer


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter


class UserList(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
