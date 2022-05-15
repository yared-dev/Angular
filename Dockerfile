FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR  /usr/src/app

COPY package.json package-lock*.json ./

RUN  npm i npm i -g @angular/cli npm run start 

COPY . .

EXPOSE 4200

#CMD ["npm","run", "start"]
CMD /usr/src/app/node_modules/.bin/ng serve --host 0.0.0.0 --disable-host-check
