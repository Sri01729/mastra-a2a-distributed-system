#!/bin/bash

# Deploy All Agents to Mastra Cloud
# This script deploys all three agents (research, writing, analysis) as separate projects on Mastra Cloud

set -e

echo "🚀 Deploying All Agents to Mastra Cloud..."
echo ""

# Check if mastra CLI is installed
if ! command -v mastra &> /dev/null; then
    echo "❌ Mastra CLI not found. Please install it first:"
    echo "   npm install -g mastra"
    exit 1
fi

# Deploy Research Agent
echo "📚 Deploying Research Agent..."
./scripts/deploy-research-agent.sh
echo ""

# Deploy Writing Agent
echo "✍️  Deploying Writing Agent..."
./scripts/deploy-writing-agent.sh
echo ""

# Deploy Analysis Agent
echo "📊 Deploying Analysis Agent..."
./scripts/deploy-analysis-agent.sh
echo ""

echo "✅ All agents prepared for Mastra Cloud deployment!"
echo ""
echo "📋 Deployment Summary:"
echo "======================"
echo ""
echo "🔗 You'll need to create 3 separate projects on Mastra Cloud:"
echo ""
echo "1. Research Agent Project:"
echo "   - Project root: research-agent"
echo "   - Mastra directory: src/mastra"
echo "   - URL: https://your-research-agent.mastra.ai"
echo ""
echo "2. Writing Agent Project:"
echo "   - Project root: writing-agent"
echo "   - Mastra directory: src/mastra"
echo "   - URL: https://your-writing-agent.mastra.ai"
echo ""
echo "3. Analysis Agent Project:"
echo "   - Project root: analysis-agent"
echo "   - Mastra directory: src/mastra"
echo "   - URL: https://your-analysis-agent.mastra.ai"
echo ""
echo "🔧 Environment Variables needed for each project:"
echo "   - OPENAI_API_KEY"
echo "   - Any other API keys your agents use"
echo ""
echo "🌐 After deployment, update the gateway agent with the new URLs:"
echo "   RESEARCH_AGENT_URL=https://your-research-agent.mastra.ai"
echo "   WRITING_AGENT_URL=https://your-writing-agent.mastra.ai"
echo "   ANALYSIS_AGENT_URL=https://your-analysis-agent.mastra.ai"
echo ""
echo "🎯 Next Steps:"
echo "1. Go to https://cloud.mastra.ai"
echo "2. Create 3 separate projects (one for each agent)"
echo "3. Import this repository for each project"
echo "4. Configure project settings as shown above"
echo "5. Deploy all projects"
echo "6. Update gateway agent environment variables"
echo "7. Deploy gateway agent (can be on Vercel or any other platform)"
echo ""
echo "🔍 Testing:"
echo "- Use Mastra Cloud Playground to test each agent individually"
echo "- Use the gateway agent to test the complete workflow"
echo "- Monitor logs and traces in Mastra Cloud dashboard"
