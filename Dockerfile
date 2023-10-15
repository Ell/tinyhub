FROM node:latest

RUN mkdir /opt/app
WORKDIR /opt/app

COPY package.json .
RUN npm install
COPY . .

EXPOSE 8787

ENV WRANGLER_SEND_METRICS=false

CMD ["npm", "start"]
