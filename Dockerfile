# Stage 1 — React Build
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Build React app
RUN npm run build

# Stage 2 — Nginx
FROM nginx:alpine

# Enable dynamic env substitution
RUN mkdir -p /etc/nginx/templates

# Copy Nginx template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy built React app
COPY --from=build /app/build /usr/share/nginx/html

ENV BACKEND_URL=""

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
