FROM node

WORKDIR /motors_shop_api

COPY package.json /motors_shop_api

RUN yarn

COPY . /motors_shop_api