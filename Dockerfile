FROM node:18.13.0-alpine

WORKDIR /urs/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn","start"]