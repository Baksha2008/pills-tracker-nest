
FROM node:latest

RUN npm install -g nodemon
RUN npm install -g @nestjs/cli

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 8080

CMD npm run start:prod