# Stage 1 — React Build
FROM node:20 AS build
WORKDIR /app

# Accept environment variables as build arguments
ARG REACT_APP_API_URL
ARG REACT_APP_ENV

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_ENV=$REACT_APP_ENV

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2 — Nginx Runtime
FROM nginx:alpine
RUN mkdir -p /etc/nginx/templates
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
