#!/bin/bash

# Check if service name is provided
if [ -z "$1" ]; then
    echo "❌ Please specify a service to deploy:"
    echo "   Usage: ./scripts/deploy-individual-aws.sh [gateway|research|writing|analysis]"
    echo "   Example: ./scripts/deploy-individual-aws.sh gateway"
    exit 1
fi

SERVICE=$1

echo "🚀 Deploying $SERVICE agent to AWS using Defang..."

# Check if Defang CLI is installed
if ! command -v defang &> /dev/null; then
    echo "📦 Installing Defang CLI..."
    npm install -g @defang/cli
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run:"
    echo "   aws configure"
    exit 1
fi

# Deploy specific service
echo "🚀 Deploying $SERVICE service..."
defang deploy --service $SERVICE

echo "✅ $SERVICE deployed successfully!"
echo "📋 Getting service URL..."
defang status --service $SERVICE
