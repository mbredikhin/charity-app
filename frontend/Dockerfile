FROM node:22-alpine AS builder

WORKDIR /app
COPY package* .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27

COPY --from=builder /app/dist /usr/share/nginx/html
