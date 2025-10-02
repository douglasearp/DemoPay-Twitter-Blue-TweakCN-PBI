# Azure Web Apps Deployment Guide

## Prerequisites
- Azure CLI installed and logged in
- Docker installed locally
- Your app pushed to GitHub

## Deployment Steps

### 1. Create Azure Web App
```bash
# Create resource group
az group create --name pay-rg --location "East US"

# Create App Service plan
az appservice plan create --name pay-plan --resource-group pay-rg --sku B1 --is-linux

# Create Web App
az webapp create --resource-group pay-rg --plan pay-plan --name pay-app --deployment-local-git
```

### 2. Configure Container Registry (Optional)
```bash
# Create Azure Container Registry
az acr create --resource-group pay-rg --name payregistry --sku Basic

# Login to ACR
az acr login --name payregistry

# Build and push image
docker build -f Dockerfile.azure -t payregistry.azurecr.io/pay:latest .
docker push payregistry.azurecr.io/pay:latest
```

### 3. Deploy from GitHub
```bash
# Configure continuous deployment from GitHub
az webapp deployment source config --resource-group pay-rg --name pay-app --repo-url https://github.com/douglasearp/DemoPay-Twitter-Blue-TweakCN-PBI.git --branch main --manual-integration

# Set startup command
az webapp config set --resource-group pay-rg --name pay-app --startup-file "nginx -g 'daemon off;'"
```

### 4. Configure Application Settings
```bash
# Set environment variables if needed
az webapp config appsettings set --resource-group pay-rg --name pay-app --settings WEBSITES_PORT=80
```

### 5. Alternative: Deploy from Local Docker Image
```bash
# Build image locally
docker build -f Dockerfile.azure -t pay-app .

# Deploy to Azure Web App
az webapp config container set --name pay-app --resource-group pay-rg --docker-custom-image-name pay-app
```

## Azure Web App Configuration

### Startup Command
```
nginx -g "daemon off;"
```

### Port Configuration
- Default port: 80
- Azure Web Apps will automatically detect and route traffic

### Health Check
- Endpoint: `/health`
- Returns: `200 OK` with "healthy" message

### Environment Variables
- `WEBSITES_PORT=80` (if not auto-detected)
- Add any API endpoints or configuration as needed

## Monitoring and Logs

### View Logs
```bash
az webapp log tail --resource-group pay-rg --name pay-app
```

### Application Insights (Optional)
```bash
# Create Application Insights
az monitor app-insights component create --app pay-insights --location "East US" --resource-group pay-rg

# Get instrumentation key
az monitor app-insights component show --app pay-insights --resource-group pay-rg --query instrumentationKey
```

## Troubleshooting

### Common Issues
1. **Port binding**: Ensure nginx listens on port 80
2. **Health checks**: Verify `/health` endpoint returns 200
3. **SPA routing**: Check nginx configuration for `try_files`
4. **Static files**: Verify build output is in correct directory

### Debug Commands
```bash
# Check app status
az webapp show --name pay-app --resource-group pay-rg

# View configuration
az webapp config show --name pay-app --resource-group pay-rg

# Restart app
az webapp restart --name pay-app --resource-group pay-rg
```

## Cost Optimization
- Use B1 SKU for development
- Scale up to S1/P1 for production
- Enable auto-scaling based on metrics
- Use Azure Container Registry Basic tier
