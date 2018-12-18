#!/bin/sh

until $(curl --output /dev/null --silent --head --fail http://localhost:3000/_health_check); do
    printf '.'
    sleep 5
done
