FROM node:19.5.0-alpine

WORKDIR /usr/

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT [ "npm", "start"]