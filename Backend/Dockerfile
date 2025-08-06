FROM node:18

# Set working directory
WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Expose backend port
EXPOSE 5000

# Start the app
CMD ["sh", "-c", "npm start"]
