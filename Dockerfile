FROM node:19-alpine3.16

WORKDIR /app

COPY package.json .

RUN npm install --include=dev

COPY . .

EXPOSE 4000

CMD npm run start