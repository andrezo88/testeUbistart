FROM node:16.14.0-alpine

WORKDIR /app

COPY . /app/

RUN npm install