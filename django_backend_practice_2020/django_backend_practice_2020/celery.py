from __future__ import absolute_import, unicode_literals

import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_backend_practice_2020.settings')
app = Celery('django_backend_practice_2020')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
