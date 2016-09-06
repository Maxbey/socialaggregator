#!/bin/bash

python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate

let port=8000

if  [ -n "$PORT" ]
  then
    port=$PORT
fi

gunicorn -w 1 --bind 0.0.0.0:$port app.wsgi