#!/bin/bash

python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate
gunicorn -c gunicorn_conf.py app.wsgi:application --reload
