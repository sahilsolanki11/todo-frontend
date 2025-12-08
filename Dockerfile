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

# Stage 2 — Nginx Runtime
FROM nginx:alpine

# Enable envsubst templating
RUN mkdir -p /etc/nginx/templates

# Copy nginx template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy built React files
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx with envsubst
CMD envsubst '\$BACKEND_HOST \$BACKEND_PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
