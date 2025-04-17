# Dockerfile for Vite Frontend

# --- Stage 1: Build --- 
FROM node:18 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build files
COPY . .

# Build the application
RUN npm run build

# --- Stage 2: Serve --- 
# Use a lightweight nginx image to serve static files
FROM nginx:stable-alpine 

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config (optional: if you need custom nginx settings)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default nginx port)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 