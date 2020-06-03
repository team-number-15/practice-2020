from datetime import datetime

from .models import SpeedTest, SpeedTestUnit, SpeedTestResult, SpeedTestTotalResult

from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404

from .utilities import GenerateFile, EvaluateSpeed
from django_backend_practice_2020.local_configs import KIEV
import time


class SpeedTestSerializer(ModelSerializer):
    class Meta:
        model = SpeedTest
        fields = ['test_id', 'tester', 'file_size_mb']

    def create(self, validated_data):
        speed_test = SpeedTest(
            tester=validated_data['tester'],
            file_size_mb=validated_data['file_size_mb'],
            # file=GenerateFile.generate_big_random_letters(validated_data['file_size_mb'])
        )

        speed_test.save()
        return speed_test

    def update(self, speed_test_instance, validated_data):
        speed_test_instance.tester = validated_data.get('tester', speed_test_instance.tester)
        speed_test_instance.file_size_mb = validated_data.get('file_size_mb', speed_test_instance.file_size_mb)
        # speed_test_instance.file = GenerateFile.generate_big_random_letters(validated_data['file_size_mb'])

        speed_test_instance.save()
        return speed_test_instance


class SpeedTestUnitSerializer(ModelSerializer):
    class Meta:
        model = SpeedTestUnit
        fields = ['unit_id', 'test_id', 'file', 'begin_timestamp', 'packet_count', 'packet_number', 'mode']

    def create(self, validated_data):
        speed_test = get_object_or_404(SpeedTest.objects.all(), pk=validated_data['test_id'].test_id)
        unit = SpeedTestUnit(
            test_id=validated_data['test_id'],
            packet_count=validated_data['packet_count'],
            packet_number=validated_data['packet_number'],
            mode=validated_data['mode'],
        )
        if validated_data['mode'] == 'download':
            unit.begin_timestamp = datetime.now(KIEV)
            print(unit.begin_timestamp)
            unit.file = GenerateFile.generate_big_random_letters(speed_test.file_size_mb)
            unit.save()
            return unit
        elif validated_data['mode'] == 'upload':
            unit.begin_timestamp = validated_data["begin_timestamp"]
            unit.file = validated_data["file"]
            unit.save()
            result = SpeedTestResult(
                unit_id=SpeedTestUnit.objects.get(begin_timestamp=unit.begin_timestamp, unit_id=unit.pk).unit_id,
                duration=EvaluateSpeed.evaluate_speed(unit.begin_timestamp, datetime.now(KIEV),
                                                      speed_test.file_size_mb)[0],
                speed=EvaluateSpeed.evaluate_speed(unit.begin_timestamp, datetime.now(KIEV), speed_test.file_size_mb)[1]
            )
            result.save()
            return result
        else:
            return Response('Wrong input', status=status.HTTP_403_FORBIDDEN)


class SpeedTestResultSerializer(ModelSerializer):
    class Meta:
        model = SpeedTestResult
        fields = ['result_id', 'unit_id', 'duration', 'speed']

    def create(self, validated_data):
        # speed_test = get_object_or_404(SpeedTest.objects.all(), pk=validated_data['unit_id'])
        unit = get_object_or_404(SpeedTestUnit.objects.all(), pk=validated_data['unit_id'].unit_id)
        result = SpeedTestResult(
            unit_id=validated_data["unit_id"],

            duration=EvaluateSpeed.evaluate_speed(unit.begin_timestamp, datetime.now(KIEV),
                                                  1)[0],
            speed=EvaluateSpeed.evaluate_speed(unit.begin_timestamp, datetime.now(KIEV), 1)[1]
        )
        result.save()
        return result


class SpeedTestTotalResultSerializer(ModelSerializer):
    class Meta:
        model = SpeedTestTotalResult
        fields = ['total_result_id', 'tester_id', 'test_id', 'download_speed', 'upload_speed', 'server_name', 'date',
                  'expiration_date']

    def retrieve(self, validated_data):
        total_result = get_object_or_404(SpeedTestTotalResult.objects.all(),
                                         pk=validated_data['total_result_id'].total_result_id)

        if total_result.expiration_date < datetime.now():
            return total_result

        return Response('Test results expired', status=status.HTTP_403_FORBIDDEN)
