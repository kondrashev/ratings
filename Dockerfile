FROM node:16

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 80

CMD ["cross-env NODE_ENV=development", "nodemon", "index.js"]