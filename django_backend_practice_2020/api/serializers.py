from connection_speed_measurement.models import SpeedTest
from rest_framework import serializers


class SpeedTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpeedTest
        fields = ['test_id', 'tester', 'file_size_mb']

