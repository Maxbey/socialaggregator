#!/bin/bash

coverage run ./manage.py test
coverage report

if  [ -n "$CODECOV_TOKEN" ]
  then
    echo $CODECOV_TOKEN
    codecov --token=$CODECOV_TOKEN
  else
    codecov
fi

