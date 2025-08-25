#!/bin/bash

# Deploy Research Agent to Mastra Cloud
# This script deploys the research agent as a separate project on Mastra Cloud

set -e

echo "🚀 Deploying Research Agent to Mastra Cloud..."

# Navigate to research agent directory
cd research-agent

# Check if mastra CLI is installed
if ! command -v mastra &> /dev/null; then
    echo "❌ Mastra CLI not found. Please install it first:"
    echo "   npm install -g mastra"
    exit 1
fi

# Build the agent
echo "📦 Building Research Agent..."
mastra build

# Deploy to Mastra Cloud
echo "☁️  Deploying to Mastra Cloud..."
echo "   Note: This will create a new project on Mastra Cloud"
echo "   You'll need to configure the project settings in the Mastra Cloud dashboard"
echo "   Project will be available at: https://your-research-agent.mastra.ai"

# The actual deployment will be done through Mastra Cloud dashboard
# This script prepares the project for deployment
echo "✅ Research Agent prepared for Mastra Cloud deployment!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://cloud.mastra.ai"
echo "2. Create a new project"
echo "3. Import this repository"
echo "4. Set project root to: research-agent"
echo "5. Set Mastra directory to: src/mastra"
echo "6. Add environment variables (OPENAI_API_KEY, etc.)"
echo "7. Deploy the project"
echo ""
echo "🔗 After deployment, update the gateway agent with the new URL:"
echo "   RESEARCH_AGENT_URL=https://your-research-agent.mastra.ai"

cd ..
