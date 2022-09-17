FROM node:16 as base

WORKDIR /home/node/api

COPY package.json ./

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
