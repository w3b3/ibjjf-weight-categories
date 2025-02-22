FROM node:20-slim

WORKDIR /app

COPY package*.json ./

# Install all dependencies including pg
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]