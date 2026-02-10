# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Create nginx user and set permissions for OpenShift
RUN chgrp -R 0 /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R g+rwX /var/cache/nginx /var/run /var/log/nginx && \
    rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Set permissions for nginx html directory
RUN chgrp -R 0 /usr/share/nginx/html && \
    chmod -R g+rwX /usr/share/nginx/html

# Expose port 8080 (Rahti default)
EXPOSE 8080

# Run as non-root user (OpenShift requirement)
USER 1001

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
