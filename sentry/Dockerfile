FROM slafs/sentry

MAINTAINER me

ENV SECRET_KEY somethingsecret
ENV SENTRY_URL_PREFIX http://localhost:9000

ENV SENTRY_INITIAL_TEAM socialaggregatorteam
ENV SENTRY_INITIAL_PROJECT socialaggregator
ENV SENTRY_INITIAL_KEY public:secret

RUN /usr/local/bin/sentry_run prepare