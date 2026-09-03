# FROM pierrezemb/gostatic
# COPY . /srv/http/
# CMD ["-port","8080","-https-promote", "-enable-logging"]


# https://mail.google.com/mail/u/0/#inbox

# # Step 1: Build the Vite production bundle
# FROM node:20-alpine AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Step 2: Serve using Nginx with SPA routing support
# FROM nginx:alpine

# # Copy the build artifacts to Nginx's public folder
# COPY --from=build /app/dist /usr/share/nginx/html

# # Crucial line: Configures Nginx to redirect all sub-routes back to index.html
# # This prevents 404/MIME type errors when refreshing pages handled by BrowserRouter
# RUN sed -i 's/try_files $uri $uri\/;/try_files $uri $uri\/ \/index.html;/g' /etc/nginx/conf.d/default.conf

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# Step 1: Build the Vite production bundle
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve using Nginx with SPA routing support
FROM nginx:alpine

# Copy the build artifacts to Nginx's public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Overwrite the default Nginx configuration with our custom SPA config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
