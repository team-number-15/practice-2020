# Generated by Django 3.0.5 on 2020-05-12 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('connection_speed_measurement', '0007_auto_20200512_2023'),
    ]

    operations = [
        migrations.AlterField(
            model_name='speedtestunit',
            name='mode',
            field=models.CharField(blank=True, choices=[('download', 'download'), ('upload', 'upload')], default='download', max_length=15, verbose_name='Method choice'),
        ),
    ]
