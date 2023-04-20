FROM node:16

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 80

CMD ["NODE_ENV=development", "node", "index.js"]