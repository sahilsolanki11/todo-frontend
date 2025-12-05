# Stage 1 — React Build
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Stage 2 — Nginx Runtime
FROM nginx:alpine

# Enable envsubst templating
RUN mkdir -p /etc/nginx/templates

# Copy nginx template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy built React files
COPY --from=build /app/build /usr/share/nginx/html

# Expose default port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
