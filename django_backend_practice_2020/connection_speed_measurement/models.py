from django.db import models
# from django.contrib.auth.models import User
# from accounts.models import CustomUser
from django_backend_practice_2020 import settings


# General speed test information
class SpeedTest(models.Model):
    test_id = models.fields.AutoField(primary_key=True, help_text='Unique identifier for test')
    tester = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    file = models.fields.BinaryField(help_text="Binary data for speed testing")
    file_size_mb = models.fields.FloatField(help_text="Size of data for speed testing in megabytes")


# Test unit
class SpeedTestUnit(models.Model):
    unit_id = models.fields.UUIDField(primary_key=True, editable=False)
    test_id = models.ForeignKey(SpeedTest, on_delete=models.DO_NOTHING)
    begin_timestamp = models.fields.DateTimeField(help_text="Timestamp of test beginning")
    packet_count = models.fields.IntegerField(help_text="Number of packets in test")
    packet_number = models.fields.IntegerField(help_text="Order number of packet in test")


# Test result
class SpeedTestResult(models.Model):
    result_id = models.fields.UUIDField(primary_key=True, editable=False)
    unit_id = models.ForeignKey(SpeedTestUnit, on_delete=models.DO_NOTHING)
    duration = models.fields.DurationField(help_text="Time between current timestamp and timestamp of test beginning")
    speed = models.fields.FloatField(help_text="Speed of connection for current test unit in mbit/sec")
