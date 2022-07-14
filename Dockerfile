FROM node:14.10-alpine3.12

RUN apk add --no-cache bash git

RUN touch /home/node/.bashrc | echo "PS1=´\w\$ ´" >> /home/node.bash

RUN npm config set cach /home/node/app/.npm-cache --global

RUN npm install

RUN apk add --no-cache sqlite

RUN npm i -D jest @types/jest ts-node --save-dev

RUN npm i -D @swc/jest @swc/cli @swc/core

#RUN npm i express @types/express dotenv 
#RUN npm i nodemon
#RUN npm i -D @types/supertest

USER node

WORKDIR /home/node/app