#!/bin/bash

echo running run.sh
python manage.py collectstatic
python manage.py makemigrations
python manage.py migrate
npm install
bower install
gulp
gunicorn -c gunicorn_conf.py app.wsgi:application --reload
