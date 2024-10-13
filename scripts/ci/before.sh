#!/bin/bash

pwd

function prepare() {
  curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
  chmod +x ./cc-test-reporter
  ./cc-test-reporter before-build
  #
  cp .env.example .env
}

prepare()