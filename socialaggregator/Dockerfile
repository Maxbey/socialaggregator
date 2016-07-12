FROM python:2.7-onbuild
COPY . /usr/src/app
ENV DJANGO_CONFIGURATION Docker

CMD ["gunicorn", "-c", "gunicorn_conf.py", "--chdir", "socialaggregator", "app.wsgi:application", "--reload"]
