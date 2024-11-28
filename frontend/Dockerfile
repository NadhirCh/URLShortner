# Use the official Node.js image to build the Vue.js app
FROM node:18 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vue.js app
RUN npm run build

# Serve the application with a lightweight web server
FROM nginx:stable-alpine

# Copy the built files from the build stage to NGINX's default public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]
