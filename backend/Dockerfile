FROM node:22-alpine AS builder

WORKDIR /app
COPY package* .
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package* .
COPY --from=builder /app/dist .
COPY --from=builder /app/src/configs ./src/configs
COPY --from=builder /app/src/database ./src/database
COPY --from=builder /app/tsconfig.json .

EXPOSE 8000

ENTRYPOINT ["node", "app.js"]
