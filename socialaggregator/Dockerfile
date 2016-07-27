FROM alpine:latest
RUN apk add --update python py-pip bash
RUN apk add --no-cache -X http://dl-cdn.alpinelinux.org/alpine/edge/main py-psycopg2

ADD ./requirements /usr/requirements/

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN bash install.sh

CMD bash run.sh
