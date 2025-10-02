# Quick Azure Deployment Guide

## Prerequisites
1. Install Azure CLI: `brew install azure-cli` (macOS) or download from Microsoft
2. Login: `az login`

## Option 1: Automated Script
```bash
./azure-deploy-commands.sh
```

## Option 2: Manual Commands

### 1. Create Resources
```bash
# Create resource group
az group create --name pay-rg --location eastus

# Create App Service plan
az appservice plan create --name pay-plan --resource-group pay-rg --sku B1 --is-linux

# Create Container Registry
az acr create --resource-group pay-rg --name payregistry --sku Basic --admin-enabled true
```

### 2. Build and Push Docker Image
```bash
# Login to ACR
az acr login --name payregistry

# Build and push
docker build -f Dockerfile.azure -t payregistry.azurecr.io/pay-app:latest .
docker push payregistry.azurecr.io/pay-app:latest
```

### 3. Create Web App
```bash
# Create Web App
az webapp create --resource-group pay-rg --plan pay-plan --name pay-app --deployment-local-git

# Configure container
az webapp config container set \
    --name pay-app \
    --resource-group pay-rg \
    --docker-custom-image-name payregistry.azurecr.io/pay-app:latest

# Set startup command
az webapp config set \
    --name pay-app \
    --resource-group pay-rg \
    --startup-file "nginx -g 'daemon off;'"
```

### 4. Get Your App URL
```bash
az webapp show --name pay-app --resource-group pay-rg --query defaultHostName --output tsv
```

## Verification
- Main app: `https://your-app-url`
- Health check: `https://your-app-url/health`

## Management Commands
```bash
# View logs
az webapp log tail --name pay-app --resource-group pay-rg

# Restart app
az webapp restart --name pay-app --resource-group pay-rg

# Delete everything (cleanup)
az group delete --name pay-rg --yes
```

## Cost Estimate
- **B1 App Service Plan**: ~$13/month
- **Basic Container Registry**: ~$5/month
- **Total**: ~$18/month

## Troubleshooting
- Check logs: `az webapp log tail --name pay-app --resource-group pay-rg`
- Verify container: `az webapp config container show --name pay-app --resource-group pay-rg`
- Test health: `curl https://your-app-url/health`
