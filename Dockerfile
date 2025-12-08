# Stage 1 — React Build
FROM node:20 AS build
WORKDIR /app

ARG REACT_APP_API_URL
ARG REACT_APP_ENV

COPY package*.json ./
RUN npm install

COPY . .

# Inject build-time env into React
RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env \
    && echo "REACT_APP_ENV=$REACT_APP_ENV" >> .env

RUN npm run build
