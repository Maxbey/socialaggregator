FROM alpine:latest
RUN apk add --update python py-pip bash
RUN apk add --no-cache -X http://dl-cdn.alpinelinux.org/alpine/edge/main py-psycopg2

COPY ./socialaggregator/requirements /usr/requirements/
COPY ./socialaggregator /usr/src/app/

WORKDIR /usr/requirements/

RUN pip install -r production.txt

RUN adduser -D myuser
WORKDIR /usr/src/app

RUN chown -R myuser.myuser .

USER myuser

CMD celery -A app worker -l info
