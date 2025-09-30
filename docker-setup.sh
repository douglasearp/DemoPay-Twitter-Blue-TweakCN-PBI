#!/bin/bash

# DemoPay Twitter Blue - Docker Setup Script
echo "🐳 Setting up Docker for DemoPay Twitter Blue..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    echo -e "${YELLOW}📋 Installation instructions:${NC}"
    echo "   macOS: https://docs.docker.com/desktop/mac/install/"
    echo "   Windows: https://docs.docker.com/desktop/windows/install/"
    echo "   Linux: https://docs.docker.com/engine/install/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker and Docker Compose are installed${NC}"

# Function to build and run development container
dev_setup() {
    echo -e "${BLUE}🔧 Setting up development environment...${NC}"
    docker-compose build app-dev
    echo -e "${GREEN}✅ Development container built successfully${NC}"
    echo -e "${YELLOW}🚀 Starting development server...${NC}"
    docker-compose up app-dev
}

# Function to build and run production container
prod_setup() {
    echo -e "${BLUE}🏭 Setting up production environment...${NC}"
    docker-compose build app-prod
    echo -e "${GREEN}✅ Production container built successfully${NC}"
    echo -e "${YELLOW}🚀 Starting production server...${NC}"
    docker-compose up app-prod
}

# Function to show help
show_help() {
    echo -e "${BLUE}DemoPay Twitter Blue - Docker Commands${NC}"
    echo ""
    echo "Usage: ./docker-setup.sh [command]"
    echo ""
    echo "Commands:"
    echo "  dev     - Build and run development environment"
    echo "  prod    - Build and run production environment"
    echo "  build   - Build all containers"
    echo "  clean   - Clean up containers and images"
    echo "  help    - Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./docker-setup.sh dev     # Start development server"
    echo "  ./docker-setup.sh prod    # Start production server"
}

# Function to clean up
cleanup() {
    echo -e "${YELLOW}🧹 Cleaning up Docker containers and images...${NC}"
    docker-compose down
    docker system prune -f
    echo -e "${GREEN}✅ Cleanup completed${NC}"
}

# Parse command line arguments
case "$1" in
    "dev")
        dev_setup
        ;;
    "prod")
        prod_setup
        ;;
    "build")
        echo -e "${BLUE}🔨 Building all containers...${NC}"
        docker-compose build
        echo -e "${GREEN}✅ All containers built successfully${NC}"
        ;;
    "clean")
        cleanup
        ;;
    "help"|"-h"|"--help"|"")
        show_help
        ;;
    *)
        echo -e "${RED}❌ Unknown command: $1${NC}"
        show_help
        exit 1
        ;;
esac
