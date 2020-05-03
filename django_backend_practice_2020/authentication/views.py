from django.contrib.auth.models import User

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter

from rest_auth.registration.views import SocialLoginView
from rest_framework.generics import ListCreateAPIView

from rest_framework.response import Response

from .serializers import UserSerializer


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter


class UserList(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)
