from django.db import models
from django.contrib.auth.models import User

from django_backend_practice_2020 import settings


# General speed test information
class SpeedTest(models.Model):
    test_id = models.fields.AutoField(primary_key=True, help_text='Unique identifier for test', verbose_name='Test ID')
    tester = models.ForeignKey(User, on_delete=models.DO_NOTHING, verbose_name='Tester`s username')
    file = models.fields.TextField(help_text="Data for speed testing", verbose_name="File data", blank=True)
    file_size_mb = models.fields.IntegerField(help_text="Size of data for speed testing in megabytes",
                                            verbose_name="File size")

    def __str__(self):
        return f'Speed Test {self.test_id}'


# Test unit
class SpeedTestUnit(models.Model):
    unit_id = models.fields.AutoField(primary_key=True, editable=False, verbose_name='Unit ID')
    test_id = models.ForeignKey(SpeedTest, on_delete=models.DO_NOTHING, verbose_name='Test ID')
    begin_timestamp = models.fields.DateTimeField(help_text="Timestamp of test beginning", verbose_name='Begin')
    packet_count = models.fields.IntegerField(help_text="Number of packets in test", verbose_name='Packet count')
    packet_number = models.fields.IntegerField(help_text="Order number of packet in test", verbose_name="Packet number")

    def __str__(self):
        return f'Test Unit {self.unit_id}'


# Test result
class SpeedTestResult(models.Model):
    result_id = models.fields.AutoField(primary_key=True, editable=False, verbose_name='Result ID')
    unit_id = models.ForeignKey(SpeedTestUnit, on_delete=models.DO_NOTHING, verbose_name='Unit ID')
    duration = models.fields.DurationField(help_text="Time between current timestamp and timestamp of test beginning",
                                           verbose_name='Duration')
    speed = models.fields.FloatField(help_text="Speed of connection for current test unit in mbit/sec",
                                     verbose_name='Speed')

    def __str__(self):
        return f'Test Result {self.result_id}'
