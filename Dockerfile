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
    npm ci --only=production=false --no-audit --no-fund

# Copy source code
COPY . .

# Build the React application
RUN npm run build

# =========================================
# Stage 2: Production Stage - Nginx Server
# =========================================
FROM nginxinc/nginx-unprivileged:alpine3.21 AS production

# Use non-root user for security
USER nginx

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built React app from builder stage
COPY --chown=nginx:nginx --from=builder /app/dist /usr/share/nginx/html

# Copy additional static files
COPY --chown=nginx:nginx public/.htaccess /usr/share/nginx/html/
COPY --chown=nginx:nginx public/sitemap.xml /usr/share/nginx/html/
COPY --chown=nginx:nginx public/robots.txt /usr/share/nginx/html/

# Create health check endpoint
RUN echo '<!DOCTYPE html><html><head><title>Health Check</title></head><body><h1>OK</h1></body></html>' > /usr/share/nginx/html/health

# Expose port 3000 for Coolify
EXPOSE 3000

# Install curl for health check
USER root
RUN apk add --no-cache curl
USER nginx

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Start Nginx
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]