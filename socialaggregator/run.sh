#!/bin/bash

#python manage.py collectstatic --noinput
#python manage.py makemigrations
#python manage.py migrate

let port=$PORT

if  [ -n "$PORT" ]
  then
    port=$PORT
fi

gunicorn --bind 0.0.0.0:$port app.wsgi
