# Deployment Quick Reference

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

## 🚀 Quick Start

### 1. Deploy Agents to Mastra Cloud

```bash
# Ensure you're on the production branch
git checkout mastra-cloud-deployment

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

### 4. Deploy Gateway to Defang

```bash
cd gateway-agent
defang config set RESEARCH_AGENT_URL=https://your-research-agent.mastra.cloud
defang config set WRITING_AGENT_URL=https://your-writing-agent.mastra.cloud
defang config set ANALYSIS_AGENT_URL=https://your-analysis-agent.mastra.cloud
defang config set ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
defang compose up
```

### 5. Deploy Frontend to Vercel

```bash
cd a2a-frontend
vercel --prod
# Set environment variables in Vercel dashboard
```

### 6. Update CORS Configuration

```bash
cd gateway-agent
defang config set ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3001,https://your-frontend-domain.vercel.app"
defang compose up
```

## 🔧 Environment Variables

### Required for Each Agent Project
- `OPENAI_API_KEY`

### Required for Gateway Agent (Defang)
- `RESEARCH_AGENT_URL`
- `WRITING_AGENT_URL`
- `ANALYSIS_AGENT_URL`
- `ALLOWED_ORIGINS`

### Required for Frontend (Vercel)
- `GATEWAY_URL`
- `RESEARCH_AGENT_URL`
- `WRITING_AGENT_URL`
- `ANALYSIS_AGENT_URL`

## 🧪 Testing

### Test Individual Agents
```bash
# Test research agent
curl https://your-research-agent.mastra.cloud/api/agents

# Test gateway
curl https://your-gateway--3001.prod1a.defang.dev/health
```

### Test Complete Workflow
```bash
curl -X POST https://your-gateway--3001.prod1a.defang.dev/api/workflow/simple \
  -H "Content-Type: application/json" \
  -d '{"topic": "AI in healthcare", "targetAudience": "medical professionals"}'
```

## 📊 Monitoring

- **Mastra Cloud**: Each agent project dashboard
- **Gateway**: Defang dashboard logs and metrics
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
