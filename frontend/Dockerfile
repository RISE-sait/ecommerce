FROM node:21.5-alpine as base

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"dev\" ]; then npm run dev; else npm run build && npm run start; fi"]
