from rest_framework.viewsets import ModelViewSet

from .models import SpeedTest, SpeedTestUnit, SpeedTestResult
from .serializers import SpeedTestSerializer, SpeedTestUnitSerializer, SpeedTestResultSerializer


class SpeedTestViewSet(ModelViewSet):
    queryset = SpeedTest.objects.all()
    serializer_class = SpeedTestSerializer


class SpeedTestUnitViewSet(ModelViewSet):
    queryset = SpeedTestUnit.objects.all()
    serializer_class = SpeedTestUnitSerializer


class SpeedTestResultViewSet(ModelViewSet):
    queryset = SpeedTestResult.objects.all()
    serializer_class = SpeedTestResultSerializer



