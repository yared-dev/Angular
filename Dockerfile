FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR  /usr/src/app

COPY package.json package-lock*.json ./

RUN  npm i -g @angular/cli npm run start 

COPY . .

EXPOSE 4200

CMD ["npm","run", "start"]