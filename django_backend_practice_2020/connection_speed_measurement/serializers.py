from .models import SpeedTest, SpeedTestUnit, SpeedTestResult

from rest_framework.serializers import ModelSerializer


class SpeedTestSerializer(ModelSerializer):

    class Meta:
        model = SpeedTest
        fields = ['test_id', 'tester', 'file', 'file_size_mb']


class SpeedTestUnitSerializer(ModelSerializer):

    class Meta:
        model = SpeedTestUnit
        fields = ['unit_id', 'test_id', 'begin_timestamp', 'packet_count', 'packet_number']


class SpeedTestResultSerializer(ModelSerializer):

    class Meta:
        model = SpeedTestResult
        fields = ['result_id', 'unit_id', 'duration', 'speed']
