FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN  npm ci --silent

COPY . .

CMD npm run start
