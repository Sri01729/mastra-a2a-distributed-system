# Deployment Quick Reference

## 🚀 Quick Start

### 1. Deploy Agents to Mastra Cloud

```bash
# Run the deployment script
./scripts/deploy-all-agents-mastra-cloud.sh
```

### 2. Create Projects on Mastra Cloud

For each agent, create a project at [https://cloud.mastra.ai](https://cloud.mastra.ai):

| Agent | Project Root | Mastra Directory | Expected URL |
|-------|-------------|------------------|--------------|
| Research | `research-agent` | `src/mastra` | `https://your-research-agent.mastra.ai` |
| Writing | `writing-agent` | `src/mastra` | `https://your-writing-agent.mastra.ai` |
| Analysis | `analysis-agent` | `src/mastra` | `https://your-analysis-agent.mastra.ai` |

### 3. Configure Gateway Agent

```bash
# Copy environment template
cp gateway-agent/config/agents.env.example gateway-agent/.env

# Edit gateway-agent/.env with your URLs
RESEARCH_AGENT_URL=https://your-research-agent.mastra.ai
WRITING_AGENT_URL=https://your-writing-agent.mastra.ai
ANALYSIS_AGENT_URL=https://your-analysis-agent.mastra.ai
```

### 4. Deploy Gateway & Frontend

```bash
# Deploy gateway to Vercel/AWS
cd gateway-agent
# Deploy to your preferred platform

# Deploy frontend to Vercel
cd a2a-frontend
npm run build
# Deploy to Vercel
```

## 🔧 Environment Variables

### Required for Each Agent Project
- `OPENAI_API_KEY`

### Required for Gateway Agent
- `RESEARCH_AGENT_URL`
- `WRITING_AGENT_URL`
- `ANALYSIS_AGENT_URL`

## 🧪 Testing

### Test Individual Agents
```bash
# Test research agent
curl https://your-research-agent.mastra.ai/api/agents

# Test gateway
curl https://your-gateway-agent.vercel.app/health
```

### Test Complete Workflow
```bash
curl -X POST https://your-gateway-agent.vercel.app/api/workflow/simple \
  -H "Content-Type: application/json" \
  -d '{"topic": "AI in healthcare", "targetAudience": "medical professionals"}'
```

## 📊 Monitoring

- **Mastra Cloud**: Each agent project dashboard
- **Gateway**: Your deployment platform logs
- **Frontend**: Vercel analytics

## 🆘 Troubleshooting

### Agent Discovery Issues
- Check URLs in gateway configuration
- Verify agents are deployed and running
- Check Mastra Cloud project status

### Build Failures
- Check `mastra.config.ts` syntax
- Verify dependencies in `package.json`
- Review build logs in Mastra Cloud

## 📚 Full Documentation

See [MASTRA_CLOUD_DEPLOYMENT.md](./MASTRA_CLOUD_DEPLOYMENT.md) for detailed instructions.
