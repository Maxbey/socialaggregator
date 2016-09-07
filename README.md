# SocialAggregator training project

[![Build Status](https://travis-ci.org/Maxbey/socialaggregator.svg?branch=master)](https://travis-ci.org/Maxbey/socialaggregator)
[![codecov.io](https://codecov.io/gh/Maxbey/socialaggregator/branch/master/graphs/badge.svg)](https://codecov.io/gh/Maxbey/socialaggregator/branch/master/)

SocialAggregator is a small project, created to improve skills of working with Django and AngularJS

## API documentation
http://docs.socialaggregator-api.surge.sh/

## Deployment on Amazon Web Services
In order to deploy the backend in multicontainer Docker environment of [Elastic Beanstalk] (https://aws.amazon.com/elasticbeanstalk/details/) service, you must install and configure [EB CLI](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-configuration.html).

Next, you must perform: `cd aws/ && eb deploy`

To deploy the frontend application it is recommended to use [S3](https://aws.amazon.com/s3/details/) and [CloudFront](https://aws.amazon.com/cloudfront/) services.

For frontend deployment written special gulp task that uses [gulp-awspublish](https://www.npmjs.com/package/gulp-awspublish) and [gulp-cloudfront-invalidate-aws-publish](https://www.npmjs.com/package/gulp-cloudfront-invalidate-aws-publish) npm packages.

Next, all that remains to do is to invoke a gulp task: `cd spa/ && gulp s3deploy`

