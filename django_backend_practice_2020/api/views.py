from django.shortcuts import render
from rest_framework.generics import get_object_or_404
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.mixins import ListModelMixin
from connection_speed_measurement.models import SpeedTest
# Create your views here.

from .serializers import SpeedTestSerializer


class SpeedTestListView(ListAPIView):
    queryset = SpeedTest.objects.all()
    serializer_class = SpeedTestSerializer

    def create_test(self, serializer):
        test = get_object_or_404(SpeedTest)

    def post_request(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)