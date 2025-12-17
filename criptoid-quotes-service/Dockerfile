
## `Dockerfile`
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY src ./src
EXPOSE 9000
CMD ["node", "src/index.js"]
