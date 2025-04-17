# Dockerfile for NestJS Backend

# --- Stage 1: Build --- 
FROM node:18 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# --- Stage 2: Production --- 
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Expose the port the app runs on (defined in main.ts, default 3000 for NestJS)
EXPOSE 3000 

# Command to run the application
CMD [ "node", "dist/main" ] 