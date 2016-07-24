#!/bin/bash

coverage run socialaggregator/./manage.py test
coverage report
codeclimate-test-reporter
