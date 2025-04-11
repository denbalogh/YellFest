FROM node

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE ${APP_PORT}

CMD ["npm", "start"]
