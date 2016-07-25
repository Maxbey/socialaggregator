#!/bin/bash

cd /usr/src/spa/
npm install
npm run-script config
npm run-script compile
