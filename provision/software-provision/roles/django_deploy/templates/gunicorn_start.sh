#!/bin/bash

### Define script variables

# Name of the app
NAME="{{ app.app_name }}"
# Path to virtualenv
VIRTUALENV="{{ app.venv_dir }}"
# Django Project Directory
DJANGODIR="{{ app.app_dir }}"
# The user to run as
USER="{{ app.deploy_user }}"
# The group to run as
GROUP="{{ app.deploy_group }}"
# Number of worker processes Gunicorn should spawn
NUM_WORKERS=3
# Settings file that Gunicorn should use
DJANGO_SETTINGS_MODULE="{{wsgi.django_settings_module}}"
# WSGI module name
DJANGO_WSGI_MODULE="{{ wsgi.django_wsgi_module }}"


### Activate virtualenv and create environment variables

echo "Starting $NAME as `whoami`"
# Activate the virtual environment
cd $VIRTUALENV
source bin/activate
cd $DJANGODIR
# Defining the Environment Variables
export DJANGO_SECRET_KEY="{{ wsgi.django_secret_key }}"
export DATABASE_URL="{{ db.db_url }}"
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH


### Start Gunicorn

exec gunicorn ${DJANGO_WSGI_MODULE}:application \
        --name $NAME \
        --workers $NUM_WORKERS \
        --user=$USER --group=$GROUP \
        --log-level=debug \
        --bind=127.0.0.1:8000