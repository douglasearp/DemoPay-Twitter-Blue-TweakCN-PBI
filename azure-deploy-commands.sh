#!/bin/bash

# Azure deployment script for Pay app
# Run these commands after installing Azure CLI and logging in

echo "🚀 Starting Azure deployment for Pay app..."

# Set variables
RESOURCE_GROUP="pay-rg"
LOCATION="eastus"
APP_SERVICE_PLAN="pay-plan"
WEB_APP_NAME="pay-app"
ACR_NAME="payregistry"
IMAGE_NAME="pay-app"

echo "📦 Creating resource group..."
az group create --name $RESOURCE_GROUP --location $LOCATION

echo "📋 Creating App Service plan..."
az appservice plan create \
    --name $APP_SERVICE_PLAN \
    --resource-group $RESOURCE_GROUP \
    --sku B1 \
    --is-linux

echo "🐳 Creating Azure Container Registry..."
az acr create \
    --resource-group $RESOURCE_GROUP \
    --name $ACR_NAME \
    --sku Basic \
    --admin-enabled true

echo "🔐 Getting ACR credentials..."
ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP --query loginServer --output tsv)
ACR_USERNAME=$(az acr credential show --name $ACR_NAME --query username --output tsv)
ACR_PASSWORD=$(az acr credential show --name $ACR_NAME --query passwords[0].value --output tsv)

echo "🏗️ Building and pushing Docker image..."
# Login to ACR
docker login $ACR_LOGIN_SERVER -u $ACR_USERNAME -p $ACR_PASSWORD

# Build and tag image
docker build -f Dockerfile.azure -t $ACR_LOGIN_SERVER/$IMAGE_NAME:latest .

# Push to ACR
docker push $ACR_LOGIN_SERVER/$IMAGE_NAME:latest

echo "🌐 Creating Web App..."
az webapp create \
    --resource-group $RESOURCE_GROUP \
    --plan $APP_SERVICE_PLAN \
    --name $WEB_APP_NAME \
    --deployment-local-git

echo "⚙️ Configuring Web App for container..."
az webapp config container set \
    --name $WEB_APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --docker-custom-image-name $ACR_LOGIN_SERVER/$IMAGE_NAME:latest

echo "🔧 Setting startup command..."
az webapp config set \
    --name $WEB_APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --startup-file "nginx -g 'daemon off;'"

echo "🌍 Getting Web App URL..."
WEB_APP_URL=$(az webapp show --name $WEB_APP_NAME --resource-group $RESOURCE_GROUP --query defaultHostName --output tsv)

echo "✅ Deployment complete!"
echo "🌐 Your app is available at: https://$WEB_APP_URL"
echo "🏥 Health check: https://$WEB_APP_URL/health"

echo ""
echo "📊 Useful commands:"
echo "  View logs: az webapp log tail --name $WEB_APP_NAME --resource-group $RESOURCE_GROUP"
echo "  Restart app: az webapp restart --name $WEB_APP_NAME --resource-group $RESOURCE_GROUP"
echo "  Delete resources: az group delete --name $RESOURCE_GROUP --yes"
