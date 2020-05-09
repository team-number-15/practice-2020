from .models import SpeedTest, SpeedTestUnit, SpeedTestResult

from rest_framework.serializers import ModelSerializer

from .utilities import GenerateFile


class SpeedTestSerializer(ModelSerializer):

    class Meta:
        model = SpeedTest
        fields = ['test_id', 'tester', 'file', 'file_size_mb']

    def create(self, validated_data):
        speed_test = SpeedTest(
            tester=validated_data['tester'],
            file_size_mb=validated_data['file_size_mb'],
            file=GenerateFile.generate_big_random_letters(validated_data['file_size_mb'])
        )
        speed_test.save()
        return speed_test


class SpeedTestUnitSerializer(ModelSerializer):

    class Meta:
        model = SpeedTestUnit
        fields = ['unit_id', 'test_id', 'begin_timestamp', 'packet_count', 'packet_number']


class SpeedTestResultSerializer(ModelSerializer):

    class Meta:
        model = SpeedTestResult
        fields = ['result_id', 'unit_id', 'duration', 'speed']
