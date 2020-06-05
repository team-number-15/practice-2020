from rest_framework import status
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser
from django.shortcuts import render

from .models import SpeedTest, SpeedTestResult, SpeedTestTotalResult
from .serializers import SpeedTestSerializer, \
    SpeedTestResultSerializer, SpeedTestTotalResultSerializer


def index(request, path=''):
    return render(request, 'index.html')
class SpeedTestViewSet(ModelViewSet):
    queryset = SpeedTest.objects.all()
    serializer_class = SpeedTestSerializer


# class SpeedTestUnitViewSet(ModelViewSet):
#     queryset = SpeedTestUnit.objects.all()
#     serializer_class = SpeedTestUnitSerializer


class SpeedTestResultViewSet(ModelViewSet):
    queryset = SpeedTestResult.objects.all()
    serializer_class = SpeedTestResultSerializer


class SpeedTestTotalResultViewSet(ModelViewSet):
    queryset = SpeedTestTotalResult.objects.all()
    serializer_class = SpeedTestTotalResultSerializer
