from django.db import models
from django.contrib.auth.models import User


class SpeedTest(models.Model):
    test_id = models.fields.UUIDField(primary_key=True, default=models.fields.uuid.uuid4, editable=False)
    tester = models.ForeignKey(User, related_name='test_created_by')
    file_size_mb = models.fields.FloatField(help_text="Size of data for speed testing in megabytes")

    class Meta:
        abstract = True

    def __str__(self):
        return self.test_id


# Test unit
class SpeedTestUnit(SpeedTest):
    unit_id = models.fields.UUIDField(primary_key=True, editable=False)
    begin_timestamp = models.fields.DateTimeField(help_text="Timestamp of test beginning")
    file = models.fields.BinaryField(help_text="Binary data for speed testing")
    packet_count = models.fields.IntegerField(help_text="Number of packets in test")
    packet_number = models.fields.IntegerField(help_text="Order number of packet in test")


# Test result
class SpeedTestResult(SpeedTest):
    result_id = models.fields.UUIDField(primary_key=True, editable=False)
    unit_id = models.ForeignKey(SpeedTestUnit)
    duration = models.fields.DurationField(help_text="Time between current timestamp and timestamp of test beginning")
    speed = models.fields.FloatField(help_text="Speed of connection for current test unit in mbit/sec")
