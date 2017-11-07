FROM node:latest AS build

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY *.json .
COPY *.js .
COPY src src
RUN ng build

FROM nginx:latest

COPY --from=build /app/dist/* /usr/share/nginx/html
