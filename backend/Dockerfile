FROM node:22-alpine

WORKDIR /app
COPY package* .
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 8000

CMD ["node", "dist/app.js"]