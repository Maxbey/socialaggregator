#!/bin/bash

coverage run ./manage.py test
coverage report
codeclimate-test-reporter
