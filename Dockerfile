# syntax=docker/dockerfile:1

# =========================================
# Stage 1: Build Stage - Compile React App
# =========================================
FROM node:18-alpine AS builder

# Set environment variables for optimization
ENV NODE_ENV=production
ENV CI=true
ENV GENERATE_SOURCEMAP=false

# Set working directory
WORKDIR /app

# Install dependencies first for better caching
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --include=dev --no-audit --no-fund

# Copy source code
COPY . .

# Build the React application
RUN npm run build

# =========================================
# Stage 2: Production Stage - Full Stack
# =========================================
FROM node:18-alpine AS production

# Install nginx and curl
RUN apk add --no-cache nginx curl

# Create nginx user and directories (if not exists)
RUN if ! id nginx >/dev/null 2>&1; then adduser -D -s /bin/sh nginx; fi && \
    mkdir -p /var/log/nginx /var/lib/nginx /tmp/nginx && \
    chown -R nginx:nginx /var/log/nginx /var/lib/nginx /tmp/nginx

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --only=production --no-audit --no-fund

# Copy server code
COPY server.js ./

# Copy built React app from builder stage
COPY --from=builder /app/dist ./public

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy additional static files
COPY public/sitemap.xml ./public/
COPY public/robots.txt ./public/

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Switch to root for health check setup
USER root

# Create health check endpoint and ensure nginx can access it
RUN echo '<!DOCTYPE html><html><head><title>Health Check</title></head><body><h1>OK</h1></body></html>' > /app/public/health && \
    chown nginx:nginx /app/public/health

# Switch to nginx user
USER nginx

# Expose port 8080 for Coolify
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Start both services
CMD ["/start.sh"]