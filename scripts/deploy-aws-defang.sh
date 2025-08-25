#!/bin/bash

echo "🚀 Deploying Mastra A2A Agents to AWS using Defang..."

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

# Deploy all services
echo "🚀 Deploying all services to AWS..."
defang deploy

# Get service URLs
echo "📋 Getting service URLs..."
defang status

echo "✅ Deployment complete!"
echo "📝 Update your Vercel frontend environment variables with the AWS URLs:"
echo "   NEXT_PUBLIC_GATEWAY_URL=https://gateway.your-domain.com"
echo "   NEXT_PUBLIC_RESEARCH_AGENT_URL=https://research.your-domain.com"
echo "   NEXT_PUBLIC_WRITING_AGENT_URL=https://writing.your-domain.com"
echo "   NEXT_PUBLIC_ANALYSIS_AGENT_URL=https://analysis.your-domain.com"
echo ""
echo "🚀 Deploy frontend to Vercel:"
echo "   ./scripts/deploy-frontend.sh"
