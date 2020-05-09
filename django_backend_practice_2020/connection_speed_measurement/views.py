from rest_framework import status
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser

from .models import SpeedTest, SpeedTestUnit, SpeedTestResult
from .serializers import SpeedTestSerializer, SpeedTestUnitSerializer, SpeedTestResultSerializer

from .utilities import GenerateFile, EvaluateSpeed

from copy import deepcopy
import logging

logger = logging.getLogger(__name__ )


class SpeedTestViewSet(ModelViewSet):
    queryset = SpeedTest.objects.all()
    serializer_class = SpeedTestSerializer

    # @action(methods=['get'], detail=True)
    # def get(self, request, *args, **kwargs):
    #     logger.debug('TEST LOGGER')
    #     queryset = self.get_queryset()
    #     serializer = SpeedTestSerializer(queryset, many=True)
    #     return Response(serializer.data)
    #
    # @action(methods=['post'], detail=True)
    # def post(self, request, *args, **kwargs):
    #     request_data = deepcopy(request.data)
    #     serializer = self.serializer_class(data=request_data)  # , context={'request': request}
    #     logger.debug('POST REQUEST DATA: %s', str(serializer.data), exc_info=True)
    #     serializer.is_valid(raise_exception=True)
    #     speed_test = SpeedTest.create(file=GenerateFile.generate_big_random_letters(request_data['file_size_mb']),
    #                                           **serializer.validated_data)
    #
    #     return Response(speed_test, serializer=self.serializer_class)


class SpeedTestUnitViewSet(ModelViewSet):
    queryset = SpeedTestUnit.objects.all()
    serializer_class = SpeedTestUnitSerializer

    @action(methods=['get'], detail=True)
    def speed_tests_units(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = SpeedTestUnitSerializer(queryset, many=True)
        return Response(serializer.data)


class SpeedTestResultViewSet(ModelViewSet):
    queryset = SpeedTestResult.objects.all()
    serializer_class = SpeedTestResultSerializer

    @action(methods=['get'], detail=True)
    def speed_test_results(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = SpeedTestResultSerializer(queryset, many=True)
        return Response(serializer.data)





