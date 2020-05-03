from rest_framework.response import Response

from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from .models import SpeedTest, SpeedTestUnit, SpeedTestResult
from .serializers import SpeedTestSerializer, SpeedTestUnitSerializer, SpeedTestResultSerializer


class SpeedTestListView(ListCreateAPIView):
    queryset = SpeedTest.objects.all()
    serializer_class = SpeedTestSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = SpeedTestSerializer(queryset, many=True)
        return Response(serializer.data)


class SpeedTestDetailView(RetrieveAPIView):
    queryset = SpeedTest.objects.all()
    serializer_class = SpeedTestSerializer

    def detail(self, request):
        queryset = self.get_queryset()
        serializer = SpeedTestSerializer(queryset, many=True)
        return Response(serializer.data)


class SpeedTestUnitListView(ListCreateAPIView):
    queryset = SpeedTestUnit.objects.all()
    serializer_class = SpeedTestUnitSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = SpeedTestUnitSerializer(queryset, many=True)
        return Response(serializer.data)


class SpeedTestUnitDetailView(RetrieveAPIView):
    queryset = SpeedTest.objects.all()
    serializer_class = SpeedTestSerializer

    def detail(self, request):
        queryset = self.get_queryset()
        serializer = SpeedTestUnitSerializer(queryset, many=True)
        return Response(serializer.data)


class SpeedTestResultListView(ListCreateAPIView):
    queryset = SpeedTestResult.objects.all()
    serializer_class = SpeedTestResultSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = SpeedTestResultSerializer(queryset, many=True)
        return Response(serializer.data)


class SpeedTestResultDetailView(RetrieveAPIView):
    queryset = SpeedTest.objects.all()
    serializer_class = SpeedTestSerializer

    def detail(self, request):
        queryset = self.get_queryset()
        serializer = SpeedTestResultSerializer(queryset, many=True)
        return Response(serializer.data)
