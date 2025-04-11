FROM node:22.14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${APP_PORT}

CMD ["npm", "start"]
