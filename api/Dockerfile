FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY src/ ./src/
COPY openapi.json ./

EXPOSE 3333

CMD ["npm", "run", "dev"]
