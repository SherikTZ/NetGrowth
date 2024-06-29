# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.9.0
FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV development

WORKDIR /usr/src/netgrowth/backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
