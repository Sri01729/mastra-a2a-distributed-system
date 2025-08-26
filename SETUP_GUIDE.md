# A2A System Setup Guide

This guide will help you set up the complete A2A (Agent-to-Agent) distributed system.

> **⚠️ DEMO SYSTEM: This is a demonstration project for educational purposes only.**
>
> **No production security measures are implemented:**
> - No authentication or authorization
> - No rate limiting
> - No input validation
> - No API key protection
> - No CORS restrictions (beyond basic setup)
> - No request sanitization
>
> **Do not use in production without implementing proper security measures.**

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Gateway       │    │   Mastra Cloud  │
│   (Vercel)      │◄──►│   (Defang)      │◄──►│   Agents        │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

- Node.js 18+ installed
- Mastra CLI installed (`npm install -g @mastra/cli`)
- Defang CLI installed (`npm install -g @defang/cli`)
- Vercel CLI installed (`npm install -g vercel`)
- OpenAI API key

## 🚀 Step-by-Step Setup

### 1. Clone and Setup Project

**For Local Development:**
```bash
git clone <your-repo-url>
cd mastra-a2a
# Use main branch for local development
git checkout main
```

**For Production Deployment:**
```bash
git clone <your-repo-url>
cd mastra-a2a
# Use mastra-cloud-deployment branch for production
git checkout mastra-cloud-deployment
```

### 2. Deploy Individual Agents to Mastra Cloud

**Ensure you're on the production branch:**
```bash
git checkout mastra-cloud-deployment
```

#### Research Agent
```bash
cd research-agent
# Copy env.example to .env and fill in your OpenAI API key
cp env.example .env
# Edit .env with your OpenAI API key
mastra deploy
# Note the deployment URL (e.g., https://your-research-agent.mastra.cloud)
```

#### Writing Agent
```bash
cd ../writing-agent
cp env.example .env
# Edit .env with your OpenAI API key
mastra deploy
# Note the deployment URL (e.g., https://your-writing-agent.mastra.cloud)
```

#### Analysis Agent
```bash
cd ../analysis-agent
cp env.example .env
# Edit .env with your OpenAI API key
mastra deploy
# Note the deployment URL (e.g., https://your-analysis-agent.mastra.cloud)
```

### 3. Deploy Gateway Agent to Defang

```bash
cd ../gateway-agent
cp env.example .env
# Edit .env with your agent URLs and OpenAI API key
```

Set environment variables in Defang:
```bash
defang config set RESEARCH_AGENT_URL=https://your-research-agent.mastra.cloud
defang config set WRITING_AGENT_URL=https://your-writing-agent.mastra.cloud
defang config set ANALYSIS_AGENT_URL=https://your-analysis-agent.mastra.cloud
defang config set ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://your-frontend-domain.vercel.app
defang config set OPENAI_API_KEY=your-openai-api-key
```

Deploy:
```bash
defang compose up
# Note the deployment URL (e.g., https://your-gateway-domain.defang.dev)
```

### 4. Deploy Frontend to Vercel

```bash
cd ../a2a-frontend
cp env.example .env.local
# Edit .env.local with your gateway URL and agent URLs
```

Set environment variables in Vercel:
```bash
vercel env add GATEWAY_URL
vercel env add RESEARCH_AGENT_URL
vercel env add WRITING_AGENT_URL
vercel env add ANALYSIS_AGENT_URL
```

Deploy:
```bash
vercel --prod
# Note the deployment URL (e.g., https://your-frontend-domain.vercel.app)
```

### 5. Update CORS Configuration

After deploying the frontend, add its URL to the gateway's allowed origins:

```bash
cd ../gateway-agent
defang config set ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3001,https://your-frontend-domain.vercel.app"
defang compose up
```

## 🔧 Environment Variables

### Frontend (Vercel)
```bash
GATEWAY_URL=https://your-gateway-domain.defang.dev
RESEARCH_AGENT_URL=https://your-research-agent.mastra.cloud
WRITING_AGENT_URL=https://your-writing-agent.mastra.cloud
ANALYSIS_AGENT_URL=https://your-analysis-agent.mastra.cloud
```

### Gateway Agent (Defang)
```bash
RESEARCH_AGENT_URL=https://your-research-agent.mastra.cloud
WRITING_AGENT_URL=https://your-writing-agent.mastra.cloud
ANALYSIS_AGENT_URL=https://your-analysis-agent.mastra.cloud
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://your-frontend-domain.vercel.app
OPENAI_API_KEY=your-openai-api-key
NODE_ENV=production
PORT=3001
```

### Individual Agents (Mastra Cloud)
```bash
OPENAI_API_KEY=your-openai-api-key
DATABASE_URL=file:./mastra.db
NODE_ENV=production
PORT=4111  # or 4112, 4113 for other agents
```

## 🧪 Testing

1. **Gateway Health Check**:
   ```bash
   curl https://your-gateway-domain.defang.dev/health
   ```

2. **Agent Discovery**:
   ```bash
   curl https://your-gateway-domain.defang.dev/api/agents
   ```

3. **Send Message**:
   ```bash
   curl -X POST https://your-gateway-domain.defang.dev/api/agents/researchAgent/message \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello, research agent!"}'
   ```

4. **Execute Workflow**:
   ```bash
   curl -X POST https://your-gateway-domain.defang.dev/api/workflow/research-analysis-write \
     -H "Content-Type: application/json" \
     -d '{"topic": "AI in Healthcare", "targetAudience": "executives"}'
   ```

## 🔒 Security Notes

- ✅ All environment variables are server-side only
- ✅ No hardcoded URLs in source code
- ✅ CORS properly configured
- ✅ API keys secured in environment variables

## 📚 Additional Documentation

- `ENVIRONMENT_VARIABLES.md` - Detailed environment variable reference
- `DEPLOYMENT_TROUBLESHOOTING.md` - Common issues and solutions
- `MASTRA_CLOUD_DEPLOYMENT.md` - Mastra Cloud specific instructions

## 🆘 Troubleshooting

If you encounter issues:

1. Check all environment variables are set correctly
2. Verify CORS configuration includes your frontend URL
3. Ensure all agents are deployed and accessible
4. Check gateway logs: `defang logs gateway`
5. Check frontend logs in Vercel dashboard

## 🎉 Success!

Once everything is deployed and configured, your A2A system will be fully functional with:
- Distributed agents on Mastra Cloud
- Gateway coordination on Defang
- Modern frontend on Vercel
- Secure communication between all components
