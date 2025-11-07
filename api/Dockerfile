FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY src/ ./src/
RUN npm run build

RUN npm ci --only=production && npm cache clean --force

EXPOSE 3333

CMD ["npm", "start"]
