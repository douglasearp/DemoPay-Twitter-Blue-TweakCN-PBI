# 🐳 Docker Setup for DemoPay Twitter Blue

This document provides instructions for running the DemoPay Twitter Blue application using Docker.

## 📋 Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)

## 🚀 Quick Start

### Option 1: Using the Setup Script (Recommended)

```bash
# Make the script executable (if not already)
chmod +x docker-setup.sh

# Start development environment
./docker-setup.sh dev

# Start production environment
./docker-setup.sh prod
```

### Option 2: Using Docker Compose Directly

```bash
# Development environment
docker-compose up app-dev

# Production environment
docker-compose up app-prod

# Build all containers
docker-compose build
```

### Option 3: Using Docker Commands Directly

```bash
# Development
docker build -f Dockerfile -t demopay-dev .
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules demopay-dev

# Production
docker build -f Dockerfile.prod -t demopay-prod .
docker run -p 80:80 demopay-prod
```


## 🏗️ Docker Configuration

### Files Overview

- **`Dockerfile`** - Development environment with hot reload
- **`Dockerfile.prod`** - Production environment with Nginx
- **`docker-compose.yml`** - Multi-service orchestration
- **`nginx.conf`** - Nginx configuration for production
- **`.dockerignore`** - Files to exclude from Docker context
- **`docker-setup.sh`** - Convenient setup script

### Development Environment

- **Base Image**: Node.js 18 Alpine
- **Port**: 5173 (Vite dev server)
- **Features**: Hot reload, volume mounting, development dependencies
- **Access**: http://localhost:5173

### Production Environment

- **Base Image**: Multi-stage build (Node.js → Nginx Alpine)
- **Port**: 80
- **Features**: Optimized build, static file serving, gzip compression
- **Access**: http://localhost:80

## 🔧 Available Commands

### Setup Script Commands

```bash
./docker-setup.sh dev      # Start development server
./docker-setup.sh prod     # Start production server
./docker-setup.sh build    # Build all containers
./docker-setup.sh clean    # Clean up containers and images
./docker-setup.sh help     # Show help message
```

### Docker Compose Commands

```bash
docker-compose up app-dev          # Start development
docker-compose up app-prod         # Start production
docker-compose build              # Build all services
docker-compose down               # Stop all services
docker-compose logs app-dev       # View development logs
docker-compose logs app-prod      # View production logs
```

### Docker Commands

```bash
# Build images
docker build -f Dockerfile -t demopay-dev .
docker build -f Dockerfile.prod -t demopay-prod .

# Run containers
docker run -p 5173:5173 demopay-dev
docker run -p 80:80 demopay-prod

# View running containers
docker ps

# View logs
docker logs <container_id>

# Stop containers
docker stop <container_id>
```

## 🌐 Accessing the Application

- **Development**: http://localhost:5173
- **Production**: http://localhost:80

## 🧹 Cleanup

### Using the Setup Script
```bash
./docker-setup.sh clean
```

### Using Docker Commands
```bash
# Stop and remove containers
docker-compose down

# Remove images
docker rmi $(docker images -q)

# Clean up system
docker system prune -f
```

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :5173  # for development
   lsof -i :80    # for production
   
   # Kill the process or use different ports
   docker-compose up app-dev --build
   ```

2. **Permission Issues**
   ```bash
   # Make sure the script is executable
   chmod +x docker-setup.sh
   ```

3. **Docker Not Running**
   ```bash
   # Start Docker Desktop or Docker daemon
   # Check Docker status
   docker info
   ```

4. **Build Failures**
   ```bash
   # Clean build with no cache
   docker-compose build --no-cache
   ```

### Viewing Logs

```bash
# Development logs
docker-compose logs -f app-dev

# Production logs
docker-compose logs -f app-prod

# All logs
docker-compose logs -f
```

## 📦 Production Deployment

For production deployment, consider:

1. **Environment Variables**: Set production environment variables
2. **SSL/TLS**: Configure HTTPS with Let's Encrypt
3. **Load Balancing**: Use multiple container instances
4. **Monitoring**: Add health checks and monitoring
5. **Security**: Review and update security headers

## 🔗 Related Links

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Vite Documentation](https://vitejs.dev/)
