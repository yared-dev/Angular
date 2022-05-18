FROM node:16-alpine as build-step

RUN mkdir -p /usr/src/app

WORKDIR  /usr/src/app

COPY package.json package-lock*.json ./

RUN npm install @angular/cli@12.2.3
RUN npm install 

COPY . .

RUN npm run build

FROM nginx:1.17.1-alpine

COPY --from=build-step /usr/src/app/dist/adminpro /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf