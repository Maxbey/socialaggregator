// Karma configuration
// Generated on 2016-07-13

module.exports = function(config) {
  'use strict';

  config.set({
    basePath: '../',

    frameworks: ['jasmine'],
    reporters: ['coverage', 'mocha'],
    coverageReporter: {
      reporters: [
        {
          type: 'lcovonly',
          subdir: '.'
        },
        {
          type: 'json',
          subdir: '.'
        },
      ]
    },

    // list of files / patterns to load in the browser
    files: [
      './bower_components/angular/angular.js',
      './bower_components/angular-mocks/angular-mocks.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-aria/angular-aria.js',
      './bower_components/angular-cookies/angular-cookies.js',
      './bower_components/angular-messages/angular-messages.js',
      './bower_components/angular-resource/angular-resource.js',
      './bower_components/angular-sanitize/angular-sanitize.js',
      './bower_components/angular-touch/angular-touch.js',
      './bower_components/angular-material/angular-material.js',
      './bower_components/satellizer/satellizer.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/raven-js/dist/raven.js',
      './bower_components/angular-raven/angular-raven.js',
      './bower_components/angular-validation-match/dist/angular-validation-match.min.js',
      './bower_components/angular-backoff/dist/angular-backoff.min.js',

      './app/scripts/ngConstants.js',
      './app/scripts/app.js',

      './app/scripts/services/*.js',
      './app/scripts/controllers/*.js',

      './test/mock/**/*.js',
      './test/spec/**/*.js'
    ],

    preprocessors: {
      './app/scripts/**/*.js': 'coverage'
    },

    browsers: ['PhantomJS'],
    singleRun: true,

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-mocha-reporter'
    ],


    colors: true
  });
};
