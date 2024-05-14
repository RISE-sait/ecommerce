ARG PROD_ENV=true

FROM node:21.5-alpine as base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install prisma && npx prisma generate

RUN npm run build

CMD ["sh", "-c", "if [ \"$PROD_ENV\" = \"true\" ]; then node dist/index.js; fi"]