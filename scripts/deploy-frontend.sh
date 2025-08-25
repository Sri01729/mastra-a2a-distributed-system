#!/bin/bash

echo "🚀 Deploying Frontend to Vercel..."

# Navigate to frontend directory
cd a2a-frontend

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build the project
echo "🔨 Building frontend..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Frontend deployed successfully!"
echo "📝 Set these environment variables in Vercel dashboard:"
echo "   NEXT_PUBLIC_GATEWAY_URL=https://your-gateway-domain.com"
echo "   NEXT_PUBLIC_RESEARCH_AGENT_URL=https://your-research-agent-domain.com"
echo "   NEXT_PUBLIC_WRITING_AGENT_URL=https://your-writing-agent-domain.com"
echo "   NEXT_PUBLIC_ANALYSIS_AGENT_URL=https://your-analysis-agent-domain.com"
