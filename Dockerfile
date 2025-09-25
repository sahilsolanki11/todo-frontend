# Use official Node image for building
FROM node:18 as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all code and build
COPY . .
RUN npm run build

# Use Nginx to serve the frontend
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
