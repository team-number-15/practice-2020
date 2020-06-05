# Generated by Django 3.0.5 on 2020-05-12 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('connection_speed_measurement', '0005_auto_20200512_2008'),
    ]

    operations = [
        migrations.AlterField(
            model_name='speedtestunit',
            name='begin_timestamp',
            field=models.DateTimeField(auto_now_add=True, help_text='Timestamp of test beginning', verbose_name='Begin'),
        ),
    ]