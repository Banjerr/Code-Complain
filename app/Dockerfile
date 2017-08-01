FROM node:7.1-alpine

RUN mkdir -p /home/app && mkdir -p /home/data/db
WORKDIR /home/app

COPY package.json /home/app/
RUN npm install && npm cache clean

COPY . /home/app

RUN npm run build

EXPOSE 9000

CMD [ "npm", "run", "start:server"  ]
