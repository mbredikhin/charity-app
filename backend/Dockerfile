FROM node:22

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get -y install postgresql-client

RUN npm run build

CMD ["node", "dist/app.js"]
