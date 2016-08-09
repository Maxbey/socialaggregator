FROM alpine:latest
RUN apk add --update python py-pip bash
RUN apk add --no-cache -X http://dl-cdn.alpinelinux.org/alpine/edge/main py-psycopg2

COPY ./requirements /usr/requirements/
COPY . /usr/src/app

WORKDIR /usr/requirements/

RUN pip install -r development.txt

RUN adduser -D myuser
WORKDIR /usr/src/app

RUN chown -R myuser.myuser .
USER myuser


CMD bash run.sh
