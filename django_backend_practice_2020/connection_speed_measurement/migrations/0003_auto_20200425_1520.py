# Generated by Django 3.0.5 on 2020-04-25 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('connection_speed_measurement', '0002_auto_20200425_1509'),
    ]

    operations = [
        migrations.AlterField(
            model_name='speedtest',
            name='test_id',
            field=models.AutoField(help_text='Unique identifier for test', primary_key=True, serialize=False),
        ),
    ]
