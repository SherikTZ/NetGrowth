# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.9.0
FROM node:${NODE_VERSION}-alpine
ENV NODE_ENV development
WORKDIR /usr/src/netgrowth/frontend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev"]