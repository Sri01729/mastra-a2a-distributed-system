# Mastra Cloud Deployment Guide

This guide explains how to deploy the A2A (Agent-to-Agent) system using Mastra Cloud, where each agent is deployed as a separate project.

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Research      │    │   Writing       │    │   Analysis      │
│   Agent         │    │   Agent         │    │   Agent         │
│                 │    │                 │    │                 │
│ Mastra Cloud    │    │ Mastra Cloud    │    │ Mastra Cloud    │
│ Project 1       │    │ Project 2       │    │ Project 3       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Gateway       │
                    │   Agent         │
                    │                 │
                    │ Vercel/AWS/etc  │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Frontend      │
                    │   (Next.js)     │
                    │                 │
                    │ Vercel          │
                    └─────────────────┘
```

## Prerequisites

1. **Mastra Cloud Account**: Sign up at [https://cloud.mastra.ai](https://cloud.mastra.ai)
2. **GitHub Account**: For repository integration
3. **Mastra CLI**: Install globally with `npm install -g mastra`
4. **Environment Variables**: API keys for your agents (OpenAI, etc.)

## Deployment Steps

### Step 1: Prepare the Repository

The repository is already configured for Mastra Cloud deployment. Each agent has:
- `mastra.config.ts` - Cloud-optimized configuration
- `src/mastra/index.ts` - Agent registration
- `package.json` - Dependencies and scripts

### Step 2: Deploy Individual Agents

#### Option A: Use Deployment Scripts

```bash
# Deploy all agents (preparation only)
./scripts/deploy-all-agents-mastra-cloud.sh

# Or deploy individually
./scripts/deploy-research-agent.sh
./scripts/deploy-writing-agent.sh
./scripts/deploy-analysis-agent.sh
```

#### Option B: Manual Deployment

For each agent (research, writing, analysis):

1. **Go to Mastra Cloud Dashboard**
   - Visit [https://cloud.mastra.ai](https://cloud.mastra.ai)
   - Sign in with GitHub

2. **Create New Project**
   - Click "Create new project"
   - Import your GitHub repository

3. **Configure Project Settings**
   - **Project name**: `research-agent` (or `writing-agent`, `analysis-agent`)
   - **Branch**: `mastra-cloud-deployment`
   - **Project root**: `research-agent` (or respective agent folder)
   - **Mastra directory**: `src/mastra`

4. **Environment Variables**
   - `OPENAI_API_KEY`: Your OpenAI API key
   - Add any other API keys your agents need

5. **Deploy Project**
   - Click "Deploy Project"
   - Wait for deployment to complete

### Step 3: Get Agent URLs

After deployment, each agent will have a unique URL:
- Research Agent: `https://your-research-agent.mastra.ai`
- Writing Agent: `https://your-writing-agent.mastra.ai`
- Analysis Agent: `https://your-analysis-agent.mastra.ai`

### Step 4: Configure Gateway Agent

1. **Copy Environment Template**
   ```bash
   cp gateway-agent/config/agents.env.example gateway-agent/.env
   ```

2. **Update with Real URLs**
   ```bash
   # Edit gateway-agent/.env
   RESEARCH_AGENT_URL=https://your-research-agent.mastra.ai
   WRITING_AGENT_URL=https://your-writing-agent.mastra.ai
   ANALYSIS_AGENT_URL=https://your-analysis-agent.mastra.ai
   ```

3. **Deploy Gateway Agent**
   - Deploy to Vercel, AWS, or any platform
   - Set environment variables in your deployment platform

### Step 5: Deploy Frontend

The frontend can be deployed to Vercel as before:
```bash
cd a2a-frontend
npm run build
# Deploy to Vercel
```

## Testing Your Deployment

### 1. Test Individual Agents

Use Mastra Cloud Playground for each agent:
- Go to your project dashboard
- Click "Playground" → "Agents"
- Test each agent individually

### 2. Test Gateway Agent

```bash
# Test agent discovery
curl https://your-gateway-agent.vercel.app/api/agents

# Test A2A communication
curl -X POST https://your-gateway-agent.vercel.app/api/test/a2a-communication

# Test workflow
curl -X POST https://your-gateway-agent.vercel.app/api/workflow/simple \
  -H "Content-Type: application/json" \
  -d '{"topic": "AI in healthcare", "targetAudience": "medical professionals"}'
```

### 3. Test Complete System

Use the frontend to test the complete workflow:
- Visit your frontend URL
- Submit a research request
- Monitor the workflow execution

## Monitoring and Debugging

### Mastra Cloud Dashboard

Each agent project provides:
- **Logs**: Real-time application logs
- **Traces**: Detailed execution traces
- **Playground**: Interactive testing interface
- **Deployments**: Build and deployment history

### Gateway Agent Monitoring

Monitor the gateway agent through your deployment platform:
- Vercel: Built-in analytics and logs
- AWS: CloudWatch logs and metrics
- Other platforms: Use their monitoring tools

## Troubleshooting

### Common Issues

1. **Agent Discovery Fails**
   - Check agent URLs in gateway configuration
   - Verify agents are deployed and running
   - Check Mastra Cloud project status

2. **A2A Communication Errors**
   - Verify agent IDs match (`researchAgent`, `writingAgent`, `analysisAgent`)
   - Check environment variables
   - Review Mastra Cloud logs

3. **Build Failures**
   - Check `mastra.config.ts` syntax
   - Verify dependencies in `package.json`
   - Review build logs in Mastra Cloud

### Debug Commands

```bash
# Test agent connectivity
curl https://your-research-agent.mastra.ai/api/agents

# Check gateway health
curl https://your-gateway-agent.vercel.app/health

# Test individual agent
curl -X POST https://your-research-agent.mastra.ai/api/agents/researchAgent/generate \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'
```

## Cost Optimization

### Mastra Cloud Pricing

- Each agent is a separate project
- Pay per usage (requests, compute time)
- Monitor usage in dashboard

### Optimization Tips

1. **Use Caching**: Implement caching in gateway agent
2. **Batch Requests**: Combine multiple operations
3. **Monitor Usage**: Track usage patterns
4. **Scale Down**: Use smaller instances for development

## Security Considerations

1. **API Keys**: Store securely in environment variables
2. **CORS**: Configure CORS properly in gateway agent
3. **Rate Limiting**: Implement rate limiting if needed
4. **Authentication**: Add authentication if required

## Next Steps

1. **Production Deployment**: Set up production environment
2. **Monitoring**: Implement comprehensive monitoring
3. **Scaling**: Optimize for high traffic
4. **Features**: Add more agents or capabilities

## Support

- **Mastra Cloud Docs**: [https://docs.mastra.ai/mastra-cloud](https://docs.mastra.ai/mastra-cloud)
- **Mastra Community**: [https://discord.gg/mastra](https://discord.gg/mastra)
- **GitHub Issues**: Report issues in this repository
