#!/bin/bash
docker build -f docker/local/Dockerfile -t service_container .
docker run -it -p 10000:10000 --name service_container_integration --detach service_container
sleep 1 # find a better solution, check for a waiting script and ping healtcheck until its ready
npm run test:integration
docker kill service_container_integration
docker rm service_container_integration