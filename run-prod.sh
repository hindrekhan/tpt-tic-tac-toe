#!/usr/bin/env bash

git stash
git pull --rebase

docker run --rm --env-file="$(pwd)/.env" -v "$(pwd):/app" -w "/app" node:10 npm run bootstrap
docker run --rm --env-file="$(pwd)/.env" -v "$(pwd):/app" -w "/app/packages/web" node:10 npm run build


docker-compose -f docker-compose.prod.yml up -d
