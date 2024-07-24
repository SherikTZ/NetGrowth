ARG NODE_VERSION=20.9.0
FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV development
ENV PATH /usr/src/netgrowth/frontend/node_modules/.bin:$PATH

WORKDIR /usr/src/netgrowth/frontend
COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install

COPY . .

EXPOSE 8080

CMD ["sh", "-c", "npm install && npm run dev"]
