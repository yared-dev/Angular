# FROM node:16

# RUN mkdir -p /usr/src/app

# WORKDIR  /usr/src/app

# COPY package.json package-lock*.json ./

# RUN  npm i npm i -g @angular/cli npm run start 

# COPY . .

# EXPOSE 4200

# CMD /usr/src/app/node_modules/.bin/ng serve --host 0.0.0.0 --disable-host-check

FROM node:16-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

#Segunda Etapa
FROM nginx:1.17.1-alpine
	#Si estas utilizando otra aplicacion cambia Angular por el nombre de tu app
# COPY --from=build-step /app/dist/angular /usr/share/nginx/html
COPY --from=build-step /app/dist/adminpro /usr/share/nginx/html
