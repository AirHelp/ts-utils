FROM node:12.13-alpine

WORKDIR /usr/src/app

COPY yarn.lock .
COPY package.json .

RUN yarn install --frozen-lockfile
