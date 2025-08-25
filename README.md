# Mastra A2A Distributed System

A distributed agent-to-agent (A2A) communication system built with Mastra, featuring multiple specialized agents that work together through a gateway coordinator.

## Architecture

- **Frontend (Vercel)**: Next.js application for user interface
- **Gateway Agent (AWS)**: Express.js server coordinating agent communication
- **Research Agent (AWS)**: Specialized in research tasks
- **Writing Agent (AWS)**: Specialized in content creation
- **Analysis Agent (AWS)**: Specialized in data analysis

## Deployment

### Backend Agents (AWS + Defang)

1. **Setup AWS Infrastructure:**
```bash
   ./scripts/setup-aws.sh
```

2. **Deploy All Agents:**
```bash
   ./scripts/deploy-aws-defang.sh
```

3. **Deploy Individual Agents:**
```bash
   ./scripts/deploy-individual-aws.sh gateway
   ./scripts/deploy-individual-aws.sh research
   ./scripts/deploy-individual-aws.sh writing
   ./scripts/deploy-individual-aws.sh analysis
   ```

### Frontend (Vercel)

1. **Deploy Frontend:**
```bash
   ./scripts/deploy-frontend.sh
   ```

2. **Set Environment Variables in Vercel Dashboard:**
   ```
   NEXT_PUBLIC_GATEWAY_URL=https://gateway-xxxx.us-east-1.elb.amazonaws.com
   NEXT_PUBLIC_RESEARCH_AGENT_URL=https://research-xxxx.us-east-1.elb.amazonaws.com
   NEXT_PUBLIC_WRITING_AGENT_URL=https://writing-xxxx.us-east-1.elb.amazonaws.com
   NEXT_PUBLIC_ANALYSIS_AGENT_URL=https://analysis-xxxx.us-east-1.elb.amazonaws.com
   ```

## Development

### Prerequisites
- Node.js 18+
- AWS CLI configured
- Defang CLI installed

### Local Development
```bash
# Start all services locally
npm run dev:gateway
npm run dev:research
npm run dev:writing
npm run dev:analysis
npm run dev:frontend
```

## Features

- **A2A Communication**: Native Mastra A2A protocol support
- **Distributed Architecture**: Independent agent services
- **Auto Scaling**: AWS ECS Fargate with auto-scaling
- **Health Monitoring**: Built-in health checks and monitoring
- **Workflow Orchestration**: Complex multi-agent workflows
- **Real-time Status**: Live agent status monitoring

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Node.js, Express.js, Mastra
- **Infrastructure**: AWS ECS, Defang, Vercel
- **Communication**: Mastra A2A Protocol v0.3.0
