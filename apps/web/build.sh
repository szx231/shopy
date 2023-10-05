#!/bin/bash

npm run build && \
rm -rf ./dist && \
mkdir -p ./dist/_next && \
cp -r ./public/* ./dist  && \
cp -r ./.next/server/pages/* ./dist && \
cp -r ./.next/static ./dist/_next && \
ssh -p 5050 scrp@194.169.160.148 "rm -rf /var/www/shopy/*" &&\
scp -P 5050 -r ./dist/*  scrp@194.169.160.148:/var/www/shopy
