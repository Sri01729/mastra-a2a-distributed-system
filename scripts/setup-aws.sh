#!/bin/bash

echo "🔧 Setting up AWS infrastructure for Mastra A2A..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "📦 Installing AWS CLI..."
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "🔐 Please configure AWS credentials:"
    echo "   aws configure"
    echo "   Enter your AWS Access Key ID, Secret Access Key, and region"
    exit 1
fi

# Create ECR repositories
echo "📦 Creating ECR repositories..."
aws ecr create-repository --repository-name mastra-a2a-gateway --region us-east-1
aws ecr create-repository --repository-name mastra-a2a-research --region us-east-1
aws ecr create-repository --repository-name mastra-a2a-writing --region us-east-1
aws ecr create-repository --repository-name mastra-a2a-analysis --region us-east-1

# Get ECR login token
echo "🔐 Getting ECR login token..."
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $(aws sts get-caller-identity --query Account --output text).dkr.ecr.us-east-1.amazonaws.com

echo "✅ AWS setup complete!"
echo "📝 ECR repositories created:"
echo "   - mastra-a2a-gateway"
echo "   - mastra-a2a-research"
echo "   - mastra-a2a-writing"
echo "   - mastra-a2a-analysis"
