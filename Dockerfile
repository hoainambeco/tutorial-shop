FROM node:17.9.0

WORKDIR /usr/src/app

RUN npm install pm2@latest -g

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "pm2-runtime", "dist/main.js" ]