# Generated by Django 3.0.5 on 2020-06-03 17:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('connection_speed_measurement', '0013_auto_20200516_2302'),
    ]

    operations = [
        migrations.AddField(
            model_name='speedtesttotalresult',
            name='tester_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL, verbose_name='User ID'),
            preserve_default=False,
        ),
    ]