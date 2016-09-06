#!/bin/bash

if ! [ -n "$DJANGO_CONFIGURATION" ]
  then
    echo 'You must set $DJANGO_CONFIGURATION env variable [Production, Development, Test]'
    exit 1
elif [ "$DJANGO_CONFIGURATION" = "Production" ]
   then
     pip install -r production.txt
elif [ "$DJANGO_CONFIGURATION" = "Development" ]
   then
     pip install -r development.txt
elif [ "$DJANGO_CONFIGURATION" = "Test" ]
   then
     pip install -r test.txt
fi
