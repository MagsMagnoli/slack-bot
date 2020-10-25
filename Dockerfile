FROM node:14-alpine

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm run build

USER node