#!/usr/bin/env bash

yarn build
cp dist/puppeteer.js index.js
gcloud functions deploy scrap --runtime nodejs8 --trigger-http --memory 1024
