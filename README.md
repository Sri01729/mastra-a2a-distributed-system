# 🚀 Mastra A2A Distributed System

A distributed Agent-to-Agent (A2A) communication system built with **Mastra** and **Google's A2A protocol v0.3.0**. This system demonstrates how multiple AI agents can collaborate across different servers using standardized communication protocols.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Research Agent │    │  Writing Agent  │    │ Analysis Agent  │
│   Port: 4111    │    │   Port: 4112    │    │   Port: 4113    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ Gateway Agent   │
                    │   Port: 3001    │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Frontend      │
                    │   Port: 3000    │
                    └─────────────────┘
```

## 🎯 Key Features

- **Real A2A Protocol**: Uses Mastra's native A2A client (not simulation)
- **Distributed Architecture**: Each agent runs on its own server/port
- **Specialized Agents**: Research, Analysis, Writing, and Gateway agents
- **Real-time Communication**: Server-Sent Events (SSE) for live updates
- **Workflow Orchestration**: Complete Research → Analysis → Writing pipeline
- **Modern Frontend**: Next.js with real-time agent monitoring
- **Protocol Compliance**: Follows Google's A2A v0.3.0 specification

## 🛠️ Technology Stack

- **Backend**: Mastra Framework, Express.js, TypeScript
- **Frontend**: Next.js, React, Tailwind CSS, Lucide React
- **Communication**: Google A2A Protocol v0.3.0, Server-Sent Events
- **Database**: LibSQL (file-based storage)
- **Language Models**: OpenAI GPT-4o-mini
- **Development**: TSX, Node.js

## 📦 Project Structure

```
mastra-a2a/
├── gateway-agent/          # Express.js server with A2A client
├── mastra-a2a-demo/        # Research Agent (Port 4111)
├── writing-agent/          # Writing Agent (Port 4112)
├── analysis-agent/         # Analysis Agent (Port 4113)
├── a2a-frontend/           # Next.js frontend (Port 3000)
└── docs.md                 # Comprehensive documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js v20.0 or higher
- OpenAI API key
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Sri01729/mastra-a2a-distributed-system.git
cd mastra-a2a-distributed-system
```

### 2. Set Up Environment Variables

Create `.env` files in each agent directory:

```bash
# In each agent directory (mastra-a2a-demo, writing-agent, analysis-agent)
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
echo "PORT=4111" >> .env  # Use 4111, 4112, 4113 respectively
```

### 3. Install Dependencies

```bash
# Install dependencies for all agents
cd mastra-a2a-demo && npm install && cd ..
cd writing-agent && npm install && cd ..
cd analysis-agent && npm install && cd ..
cd gateway-agent && npm install && cd ..
cd a2a-frontend && npm install && cd ..
```

### 4. Start the System

Open 5 terminal windows and run:

```bash
# Terminal 1: Research Agent
cd mastra-a2a-demo && npm run dev

# Terminal 2: Writing Agent
cd writing-agent && npm run dev

# Terminal 3: Analysis Agent
cd analysis-agent && npm run dev

# Terminal 4: Gateway Agent
cd gateway-agent && npm run dev

# Terminal 5: Frontend
cd a2a-frontend && npm run dev
```

### 5. Access the System

- **Frontend**: http://localhost:3000
- **Gateway API**: http://localhost:3001
- **Research Agent**: http://localhost:4111
- **Writing Agent**: http://localhost:4112
- **Analysis Agent**: http://localhost:4113

## 🔧 API Endpoints

### Gateway Agent (Port 3001)

- `GET /health` - System health check
- `GET /api/agents` - Discover all available agents
- `POST /api/agents/{agentId}/message` - Send message to specific agent
- `POST /api/workflow/research-analysis-write` - Execute complete workflow
- `POST /api/test/a2a-communication` - Test A2A communication

### Example Usage

```bash
# Health check
curl http://localhost:3001/health

# Discover agents
curl http://localhost:3001/api/agents

# Send message to research agent
curl -X POST http://localhost:3001/api/agents/research-agent/message \
  -H "Content-Type: application/json" \
  -d '{"message": "Research AI trends"}'

# Execute workflow
curl -X POST http://localhost:3001/api/workflow/research-analysis-write \
  -H "Content-Type: application/json" \
  -d '{"topic": "AI Trends", "targetAudience": "Developers"}'
```

## 💻 Real A2A Client Usage

This project uses Mastra's native A2A client (not simulation):

```typescript
import { MastraClient } from '@mastra/client-js';

// Initialize Mastra clients for each agent server
const mastraClients = {
  research: new MastraClient({ baseUrl: 'http://localhost:4111' }),
  writing: new MastraClient({ baseUrl: 'http://localhost:4112' }),
  analysis: new MastraClient({ baseUrl: 'http://localhost:4113' })
};

// Get A2A instances for each agent
const a2aClients = {
  research: mastraClients.research.getA2A('research-agent'),
  writing: mastraClients.writing.getA2A('writing-agent'),
  analysis: mastraClients.analysis.getA2A('analysis-agent')
};

// A2A Operations
const agentCard = await a2aClients.research.getCard();
const response = await a2aClients.research.sendMessage({
  content: 'Research topic: AI trends',
  from: 'gateway-agent'
});
const stream = a2aClients.research.sendStreamingMessage({
  content: 'Stream research updates',
  from: 'gateway-agent'
});
```

## 🔄 Workflow Example

The system supports complete workflows:

```typescript
async function executeResearchAnalysisWriteWorkflow(topic: string, targetAudience: string) {
  // Step 1: Research
  const researchResponse = await a2aClients.research.sendMessage({
    content: `Research topic: ${topic}`,
    from: 'gateway-agent'
  });

  // Step 2: Analysis
  const analysisResponse = await a2aClients.analysis.sendMessage({
    content: `Analyze findings for: ${topic}`,
    from: 'gateway-agent'
  });

  // Step 3: Writing
  const writingResponse = await a2aClients.writing.sendMessage({
    content: `Create content for: ${topic}`,
    from: 'gateway-agent'
  });

  return { researchResponse, analysisResponse, writingResponse };
}
```

## 🎨 Frontend Features

- **Real-time Agent Status**: Live monitoring of all agents
- **Message Interface**: Send messages to any agent
- **Workflow Dashboard**: Execute and monitor workflows
- **Streaming Updates**: Real-time task progress
- **Modern UI**: Clean, responsive design with Tailwind CSS

## 🔍 Key Learnings

1. **Real A2A Client Access**: A2A client is accessed via `MastraClient.getA2A(agentId)`
2. **Protocol Compliance**: Follows Google's A2A v0.3.0 specification
3. **Distributed Benefits**: True separation, independent scaling, fault isolation
4. **Development Approach**: Learning by implementing real A2A concepts

## 🚧 Future Enhancements

- [ ] Task persistence and history
- [ ] Load balancing across agent instances
- [ ] Authentication and authorization
- [ ] Performance monitoring and metrics
- [ ] Advanced workflow orchestration
- [ ] Multi-language agent support

## 📚 Documentation

- [Comprehensive Documentation](docs.md) - Detailed technical documentation
- [Mastra Documentation](https://mastra.ai/docs) - Official Mastra docs
- [A2A Protocol](https://google.github.io/A2A/) - Google's A2A specification
- [Mastra A2A Changelog](https://mastra.ai/blog/changelog-2025-05-15) - Latest A2A features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Mastra Team](https://mastra.ai/) for the amazing framework
- [Google A2A Team](https://a2aprotocol.ai/) for the protocol specification
- [OpenAI](https://openai.com/) for the language models

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Sri01729/mastra-a2a-distributed-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Sri01729/mastra-a2a-distributed-system/discussions)
- **Documentation**: [docs.md](docs.md)

---

⭐ **Star this repository if you find it helpful!**
