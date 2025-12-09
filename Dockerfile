# Stage 1: Build React app
FROM node:20 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build React app with UAT environment variables
ARG REACT_APP_API_URL
ARG REACT_APP_ENV
RUN REACT_APP_API_URL=$REACT_APP_API_URL \
    REACT_APP_ENV=$REACT_APP_ENV \
    npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React build from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
