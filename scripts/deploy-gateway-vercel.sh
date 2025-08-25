#!/bin/bash

echo "🚀 Deploying Gateway Agent to Vercel..."

# Navigate to gateway agent directory
cd gateway-agent

# Install Vercel CLI if not installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build the project
echo "🔨 Building gateway agent..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Gateway Agent deployment complete!"
echo ""
echo "📝 IMPORTANT: Set environment variables in Vercel dashboard:"
echo "   - RESEARCH_AGENT_URL=https://short-orange-country.mastra.cloud"
echo "   - WRITING_AGENT_URL=https://brown-early-england.mastra.cloud"
echo "   - ANALYSIS_AGENT_URL=https://numerous-long-memory.mastra.cloud"
echo ""
echo "🔗 After deployment, your gateway will be available at:"
echo "   https://your-gateway-agent.vercel.app"
echo ""
echo "🧪 Test your deployment:"
echo "   curl https://your-gateway-agent.vercel.app/health"
