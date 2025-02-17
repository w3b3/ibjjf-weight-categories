FROM node:20-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Install build dependencies
RUN apt-get update && \
    apt-get install -y python3 make g++

# Copy package files
COPY package*.json ./

# Install ALL dependencies (not just production)
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable for production
ENV NODE_ENV=production

# Command to run the application
CMD ["npm", "start"]