# SocialAggregator training project

[![Build Status](https://travis-ci.org/Maxbey/socialaggregator.svg?branch=master)](https://travis-ci.org/Maxbey/socialaggregator)
[![codecov.io](https://codecov.io/gh/Maxbey/socialaggregator/branch/master/graphs/badge.svg)](https://codecov.io/gh/Maxbey/socialaggregator/branch/master/)

SocialAggregator is a small project, created to improve skills of working with Django and AngularJS
## Demo
http://d1yufmp7734ayp.cloudfront.net/

## API documentation
http://docs.socialaggregator-api.surge.sh/

## Deployment on Amazon Web Services
### Backend
In order to deploy the backend in multicontainer Docker environment of [Elastic Beanstalk] (https://aws.amazon.com/elasticbeanstalk/details/) service, you must install and configure [ebs-deploy](https://github.com/briandilley/ebs-deploy).

#### Docker
For backend deployment used [maxbey/socialaggregator_django](https://hub.docker.com/r/maxbey/socialaggregator_django/) image.

#### Environment variables
To deploy the backend application you must define a set of env variables:
##### Django configuration
 - **DJANGO_CONFIGURATION=Production**
 - **DJANGO_SETTINGS_MODULE=app.settings.settings**
 - **SECRET_KEY**

For deeper understanding, please read about the [django secret](https://docs.djangoproject.com/en/1.10/ref/settings/#std:setting-SECRET_KEY) and [django-configurations](https://django-configurations.readthedocs.io/en/stable/).

##### Storages
 - **DATABASE_URL**
 - **REDIS_URL**

Read about [URL-based configurations](https://django-configurations.readthedocs.io/en/stable/values/#url-based-values)

##### Linking with front-end
 - **FRONTEND_URI** (link to the front-end app)
 - **FRONTEND_CONFIRMATION_URI** (link to the front-end view for user`s email confirmation)
 - **FRONTEND_RESET_PASSWORD_URI** (link to the front-end view for user`s password resetting)

Next, you must perform: `ebs-deploy deploy -e yourenvname`

### Frontend
To deploy the frontend application it is recommended to use [S3](https://aws.amazon.com/s3/details/) and [CloudFront](https://aws.amazon.com/cloudfront/) services.
#### Environment variables
To build and deploy the front-end application you must define a set of env variables:
 - **BACKEND_HOST**
 - **AWS_REGION**
 - **AWS_CLOUDFRONT_BUCKET**
 - **AWS_CLOUDFRONT_DISTRIBUTION**

#### Building
To build the front-end app you must perform:
 - `npm install`
 - `npm run-script compile`
 - `gulp config && gulp`

#### Deploy
For frontend deployment written special gulp task that uses [gulp-awspublish](https://www.npmjs.com/package/gulp-awspublish) and [gulp-cloudfront-invalidate-aws-publish](https://www.npmjs.com/package/gulp-cloudfront-invalidate-aws-publish) npm packages.

Next, all that remains to do is to invoke a gulp task: `gulp s3deploy`

