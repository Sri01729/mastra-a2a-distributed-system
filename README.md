# Mastra A2A Distributed System

A distributed agent-to-agent (A2A) communication system built with Mastra, featuring multiple specialized agents that work together through a gateway coordinator. This system demonstrates how to build scalable, distributed AI agent architectures using modern cloud platforms.

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

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Gateway       │    │   Mastra Cloud  │
│   (Vercel)      │◄──►│   (Defang)      │◄──►│   Agents        │
│   Next.js 15    │    │   Express.js    │    │   Research      │
│   React 19      │    │   Mastra Client │    │   Writing       │
│   TypeScript    │    │   A2A Protocol  │    │   Analysis      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

- **Frontend (Vercel)**: Modern Next.js application with secure server-side configuration
- **Gateway Agent (Defang)**: Express.js server coordinating distributed agent communication
- **Research Agent (Mastra Cloud)**: Specialized in information gathering and analysis
- **Writing Agent (Mastra Cloud)**: Specialized in content creation and writing tasks
- **Analysis Agent (Mastra Cloud)**: Specialized in data analysis and insights

## 🚀 Quick Start

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md).

### Prerequisites
- Node.js 18+
- Mastra CLI (`npm install -g @mastra/cli`)
- Defang CLI (`npm install -g @defang/cli`)
- Vercel CLI (`npm install -g vercel`)
- OpenAI API key

### 1. Clone and Setup

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

### 2. Deploy Agents to Mastra Cloud
```bash
# Ensure you're on the production branch
git checkout mastra-cloud-deployment

# Deploy each agent individually
cd research-agent && mastra deploy
cd ../writing-agent && mastra deploy
cd ../analysis-agent && mastra deploy
```

### 3. Deploy Gateway to Defang
```bash
# Ensure you're on the production branch
git checkout mastra-cloud-deployment

cd ../gateway-agent
defang config set RESEARCH_AGENT_URL=https://your-research-agent.mastra.cloud
defang config set WRITING_AGENT_URL=https://your-writing-agent.mastra.cloud
defang config set ANALYSIS_AGENT_URL=https://your-analysis-agent.mastra.cloud
defang config set ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
defang compose up
```

### 4. Deploy Frontend to Vercel
```bash
# Ensure you're on the production branch
git checkout mastra-cloud-deployment

cd ../a2a-frontend
vercel --prod
# Set environment variables in Vercel dashboard
```

### 5. Update CORS Configuration
```bash
# Ensure you're on the production branch
git checkout mastra-cloud-deployment

cd ../gateway-agent
defang config set ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3001,https://your-frontend-domain.vercel.app"
defang compose up
```

## 🛠️ Development

### Branch Strategy
- **`main`**: Use for local development and testing
- **`mastra-cloud-deployment`**: Use for production deployment to Mastra Cloud, Defang, and Vercel

### Local Development
```bash
# Ensure you're on main branch for development
git checkout main

# Start gateway agent locally
cd gateway-agent && npm run dev

# Start frontend locally
cd a2a-frontend && npm run dev

# For individual agents, use Mastra dev server
cd research-agent && mastra dev
cd writing-agent && mastra dev
cd analysis-agent && mastra dev
```

### Environment Variables
Each component has its own `env.example` file. Copy and configure:
- `a2a-frontend/env.example` → `.env.local`
- `gateway-agent/env.example` → `.env`
- `research-agent/env.example` → `.env`
- `writing-agent/env.example` → `.env`
- `analysis-agent/env.example` → `.env`

## ✨ Features

- **🤖 A2A Communication**: Native Mastra A2A protocol support
- **🌐 Distributed Architecture**: Independent agent services across multiple platforms
- **⚡ Auto Scaling**: Cloud-native deployment with automatic scaling
- **📊 Health Monitoring**: Built-in health checks and real-time status monitoring
- **🔄 Workflow Orchestration**: Complex multi-agent workflows and task coordination
- **🔒 Secure Communication**: Server-side environment variables and CORS protection
- **📱 Modern UI**: Responsive Next.js frontend with real-time updates
- **🛡️ Production Ready**: Comprehensive error handling and timeout management

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, Mastra Client SDK
- **Infrastructure**: Mastra Cloud, Defang, Vercel
- **Communication**: Mastra A2A Protocol, REST APIs
- **Security**: Environment variables, CORS, HTTPS

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete step-by-step setup instructions
- **[ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)** - Environment variable reference
- **[DEPLOYMENT_TROUBLESHOOTING.md](./DEPLOYMENT_TROUBLESHOOTING.md)** - Common issues and solutions

## 🔒 Security

> **⚠️ DEMO SYSTEM: This is a demonstration project for educational purposes only.**

**Current Security Measures:**
- ✅ No hardcoded secrets or URLs in source code
- ✅ Server-side environment variables only
- ✅ Basic CORS configuration
- ✅ Secure communication between services
- ✅ Production-ready error handling

**Missing Production Security Measures:**
- ❌ No authentication or authorization
- ❌ No rate limiting
- ❌ No input validation
- ❌ No API key protection
- ❌ No request sanitization
- ❌ No audit logging

**⚠️ Do not use in production without implementing proper security measures.**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
