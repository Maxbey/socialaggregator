#!/bin/bash

if ! [ -n "$DJANGO_CONFIGURATION" ]
  then
    echo 'You must set $DJANGO_CONFIGURATION env variable [Development, Test]'
    exit 1
  else
   if [ "$DJANGO_CONFIGURATION" = "Development" ] || [ "$DJANGO_CONFIGURATION" = "Test" ]
     then
       pip install -r requirements/test.txt
   fi
fi

pip install -r requirements/base.txt

python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate
gunicorn -c gunicorn_conf.py app.wsgi:application --reload
