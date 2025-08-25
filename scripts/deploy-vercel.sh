#!/bin/bash

echo "🚀 Deploying Mastra A2A Frontend to Vercel..."

# Navigate to frontend directory
cd a2a-frontend

# Install Vercel CLI if not installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "📝 Don't forget to set environment variables in Vercel dashboard:"
echo "   - NEXT_PUBLIC_GATEWAY_URL"
echo "   - NEXT_PUBLIC_RESEARCH_AGENT_URL"
echo "   - NEXT_PUBLIC_WRITING_AGENT_URL"
echo "   - NEXT_PUBLIC_ANALYSIS_AGENT_URL"
