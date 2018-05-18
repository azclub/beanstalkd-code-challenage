FROM node:8
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install
COPY . .
COPY config.js.example config.js
CMD [ "npm", "run", "work" ]