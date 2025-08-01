# Use official Node image to build the app
FROM node:18 AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the frontend app for production
RUN npm run build

# Use Nginx to serve the built files
FROM nginx:alpine

# Copy built app to Nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config if you have one (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port (default Nginx)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
