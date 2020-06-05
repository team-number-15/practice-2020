from django.db import models
from django.contrib.auth.models import User


# General speed test information
class SpeedTest(models.Model):
    test_id = models.fields.AutoField(primary_key=True, help_text='Unique identifier for test', verbose_name='Test ID')
    tester = models.ForeignKey(User, on_delete=models.DO_NOTHING, verbose_name='Tester`s username')
    # file = models.fields.TextField(help_text="Data for speed testing", verbose_name="File data", blank=True)
    file_size_mb = models.fields.IntegerField(help_text="Size of data for speed testing in megabytes",
                                              verbose_name="File size")

    def __str__(self):
        return f'Speed Test {self.test_id}'


# Test unit
# class SpeedTestUnit(models.Model):
#     mode_choice_tuple = (
#         ("download", "download"),
#         ("upload", "upload")
#     )
#
#     unit_id = models.fields.AutoField(primary_key=True, editable=False, verbose_name='Unit ID')
#     test_id = models.ForeignKey(SpeedTest, on_delete=models.DO_NOTHING, verbose_name='Test ID')
#     file = models.fields.TextField(help_text="Data for speed testing", verbose_name="File data", blank=True)
#     begin_timestamp = models.fields.DateTimeField(help_text="Timestamp of test beginning",
#                                                   verbose_name='Begin', blank=True, null=True)
#     mode = models.fields.CharField(max_length=15, choices=mode_choice_tuple, verbose_name="Method choice",
#                                    default="download", blank=True)
#
#     def __str__(self):
#         return f'Test Unit {self.unit_id}'


# Test result
class SpeedTestResult(models.Model):
    mode_choice_tuple = (
        ("download", "download"),
        ("upload", "upload")
    )

    result_id = models.fields.AutoField(primary_key=True, editable=False, verbose_name='Result ID')
    test_id = models.ForeignKey(SpeedTest, on_delete=models.DO_NOTHING, verbose_name='Test ID')
    file = models.fields.TextField(help_text="Data for speed testing", verbose_name="File data", blank=True)
    begin_timestamp = models.fields.DateTimeField(help_text="Timestamp of test beginning",
                                                  verbose_name='Begin', blank=True, null=True)
    mode = models.fields.CharField(max_length=15, choices=mode_choice_tuple, verbose_name="Method choice",
                                   default="download", blank=True)
    duration = models.fields.FloatField(help_text="Time between current timestamp and timestamp of test beginning",
                                        verbose_name='Duration', blank=True, null=True)
    speed = models.fields.FloatField(help_text="Speed of connection for current test unit in mbit/sec",
                                     verbose_name='Speed', blank=True, null=True)

    def __str__(self):
        return f'Test Result {self.result_id}'


# Total test result
class SpeedTestTotalResult(models.Model):
    total_result_id = models.fields.AutoField(primary_key=True, editable=False, verbose_name='Result ID')
    test_id = models.ForeignKey(SpeedTest, on_delete=models.DO_NOTHING, verbose_name='Test ID')
    tester_id = models.ForeignKey(User, on_delete=models.DO_NOTHING, verbose_name='User ID')
    download_speed = models.fields.FloatField(help_text="Download average speed in mbit/sec",
                                              verbose_name='Download average speed')
    upload_speed = models.fields.FloatField(help_text="Upload average speed in mbit/sec",
                                            verbose_name='Upload average speed')
    server_name = models.fields.CharField(max_length=50, verbose_name='Server location', blank=False)
    date = models.fields.DateTimeField(verbose_name='Speed test date')
    expiration_date = models.fields.DateTimeField(verbose_name='Expiration access date')

    def __str__(self):
        return f'Test Result {self.total_result_id}'
