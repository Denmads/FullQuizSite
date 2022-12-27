FROM node

RUN mkdir /app
WORKDIR /app

COPY . .
RUN npm install
RUN npm run postinstall

CMD node ./dist/index.js