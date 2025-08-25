# Mastra & A2A — Essential Documentation

## 📚 Quick Links

### Mastra (TypeScript Agent Framework)

- **Website (Overview)**: [https://mastra.ai/](https://mastra.ai/)
- **Docs – Introduction**: [https://mastra.ai/docs](https://mastra.ai/docs)
- **Getting Started – Installation**: [https://mastra.ai/en/docs/getting-started/installation](https://mastra.ai/en/docs/getting-started/installation)
- **Agents – Overview**: [https://mastra.ai/en/docs/agents/overview](https://mastra.ai/en/docs/agents/overview)
- **Tools & MCP – Overview**: [https://mastra.ai/en/docs/tools-mcp/overview](https://mastra.ai/en/docs/tools-mcp/overview)
- **Workflows – Overview**: [https://mastra.ai/en/docs/workflows/overview](https://mastra.ai/en/docs/workflows/overview)
- **Server & DB – Production Server**: [https://mastra.ai/en/docs/server-db/production-server](https://mastra.ai/en/docs/server-db/production-server)
- **Mastra Cloud – Setup & Deploy**: [https://mastra.ai/en/docs/mastra-cloud/setting-up](https://mastra.ai/en/docs/mastra-cloud/setting-up)
- **MCP Docs Server (Cursor/Windsurf integration)**: [https://mastra.ai/en/docs/getting-started/mcp-docs-server](https://mastra.ai/en/docs/getting-started/mcp-docs-server)
- **GitHub – Mastra**: [https://github.com/mastra-ai/mastra](https://github.com/mastra-ai/mastra)

### A2A (Agent-to-Agent Protocol)

- **Official Site**: [https://a2aprotocol.ai/](https://a2aprotocol.ai/)
- **Docs – Index**: [https://a2aprotocol.ai/docs/](https://a2aprotocol.ai/docs/)
- **Key Concepts (Spec Site)**: [https://google.github.io/A2A/topics/key-concepts/](https://google.github.io/A2A/topics/key-concepts/)
- **ADK × A2A (Quickstarts)**: [https://google.github.io/adk-docs/a2a/](https://google.github.io/adk-docs/a2a/)
- **Google Developers Blog (Background)**: [https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- **Linux Foundation Announcement**: [https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents](https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents)
- **GitHub – A2A (Spec & Reference)**: [https://github.com/a2aproject/A2A](https://github.com/a2aproject/A2A)
- **SDKs**:
  - **JS**: [https://github.com/a2aproject/a2a-js](https://github.com/a2aproject/a2a-js)
  - **Python**: [https://github.com/a2aproject/a2a-python](https://github.com/a2aproject/a2a-python)
  - **Java**: [https://github.com/a2aproject/a2a-java](https://github.com/a2aproject/a2a-java)
- **Samples**: [https://github.com/a2aproject/a2a-samples](https://github.com/a2aproject/a2a-samples)
- **Codelab – Purchasing Concierge**: [https://codelabs.developers.google.com/intro-a2a-purchasing-concierge](https://codelabs.developers.google.com/intro-a2a-purchasing-concierge)

---

## 🚀 Our A2A Implementation

### Project Overview

We've built a **distributed A2A (Agent-to-Agent) communication system** using Mastra's native A2A client and Google's A2A protocol v0.3.0. This system demonstrates how multiple AI agents can collaborate across different servers using standardized communication protocols.

### Architecture

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

### Key Components

#### 1. Gateway Agent (Port 3001)
- **Express.js server** with Mastra A2A client
- **Coordinates communication** between agents
- **Provides REST API** for frontend integration
- **Orchestrates multi-agent workflows**

#### 2. Research Agent (Port 4111)
- **Specialized in information gathering** and analysis
- **Mastra Dev Server** with A2A capabilities
- **Receives research tasks** via A2A protocol

#### 3. Writing Agent (Port 4112)
- **Specialized in content creation** and report generation
- **Mastra Dev Server** with A2A capabilities
- **Creates content** based on research and analysis

#### 4. Analysis Agent (Port 4113)
- **Specialized in deep data analysis** and pattern recognition
- **Mastra Dev Server** with A2A capabilities
- **Processes research findings** and provides insights

#### 5. Frontend (Port 3000)
- **Next.js application** with real-time monitoring
- **Agent status dashboard** and message interface
- **Workflow execution** and streaming updates

---

## 💻 Real Mastra A2A Client Usage

The system uses **Mastra's native A2A client** (not simulation):

```typescript
import { MastraClient } from '@mastra/client-js';

// Initialize Mastra clients for each agent server
const mastraClients = {
  research: new MastraClient({ baseUrl: 'http://localhost:4111' }),
  writing: new MastraClient({ baseUrl: 'http://localhost:4112' }),
  analysis: new MastraClient({ baseUrl: 'http://localhost:4113' })
};

// Get A2A instances for each agent (using export names)
const a2aClients = {
  research: mastraClients.research.getA2A('researchAgent'),
  writing: mastraClients.writing.getA2A('writingAgent'),
  analysis: mastraClients.analysis.getA2A('analysisAgent')
};

// A2A Operations
// 1. Get agent information
const agentCard = await a2aClients.research.getCard();

// 2. Send messages to agents
const response = await a2aClients.research.sendMessage({
  message: {
    kind: 'message',
    messageId: 'msg-123',
    role: 'user',
    parts: [{ kind: 'text', text: 'Research AI trends' }],
    metadata: { from: 'gateway-agent' }
  }
});

// 3. Stream real-time updates
const stream = a2aClients.research.sendStreamingMessage({
  message: {
    kind: 'message',
    messageId: 'msg-124',
    role: 'user',
    parts: [{ kind: 'text', text: 'Stream research updates' }],
    metadata: { from: 'gateway-agent' }
  }
});
```

---

## 🔧 A2A Protocol Features Used

### 1. Agent Discovery
- **`getCard()`** - Retrieve agent metadata and capabilities
- **Agent identification** and status checking

### 2. Message Exchange
- **`sendMessage()`** - Direct communication between agents
- **Structured message format** with sender/receiver

### 3. Real-time Streaming
- **`sendStreamingMessage()`** - Server-Sent Events (SSE) - *Currently disabled due to JSON parsing issues*
- **Live task progress** and status updates - *Using reliable message exchange instead*

### 4. Task Management
- **`getTask()`** - Query task status and results
- **`cancelTask()`** - Cancel running tasks

---

## 🔄 Workflow Example

**Research → Analysis → Writing** workflow:

```typescript
async function executeResearchAnalysisWriteWorkflow(topic: string, targetAudience: string) {
  // Step 1: Research
  const researchResponse = await a2aClients.research.sendMessage({
    message: createMessage(`Research topic: ${topic}`, 'gateway-agent')
  });

  // Step 2: Analysis
  const analysisResponse = await a2aClients.analysis.sendMessage({
    message: createMessage(`Analyze findings for: ${topic}`, 'gateway-agent')
  });

  // Step 3: Writing
  const writingResponse = await a2aClients.writing.sendMessage({
    message: createMessage(`Create content for: ${topic}`, 'gateway-agent')
  });

  // Step 4: Real-time streaming
  const researchStream = a2aClients.research.sendStreamingMessage({
    message: createMessage(`Stream updates for: ${topic}`, 'gateway-agent')
  });

  return { researchResponse, analysisResponse, writingResponse, researchStream };
}

// Helper function to create A2A messages
function createMessage(content: string, from: string = 'gateway-agent') {
  return {
    kind: 'message' as const,
    messageId: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    role: 'user',
    parts: [{ kind: 'text' as const, text: content }],
    metadata: { from }
  };
}
```

---

## 🎯 Key Learnings

### 1. Real A2A Client Access
- **A2A client is accessed via** `MastraClient.getA2A(agentId)`
- **Not available as direct import**: `import { A2A } from '@mastra/client-js'`
- **Available in** `@mastra/client-js` v0.10.23+

### 2. Agent Naming Convention
- **Use export names** (`researchAgent`) not internal names (`research-agent`)
- **Agent registration key** must match A2A client access
- **Consistent naming** across Gateway Agent and Frontend

### 3. Protocol Compliance
- **Follows Google's A2A v0.3.0** specification
- **Uses Mastra's native A2A** implementation
- **Compatible with official A2A SDKs**

### 4. Distributed Architecture Benefits
- **True separation of concerns**
- **Independent scaling and deployment**
- **Fault isolation and resilience**
- **Protocol-based communication**

### 5. Development Approach
- **Learning by implementing** real A2A concepts
- **Understanding distributed** agent systems
- **Building production-ready** A2A applications

---

## 🔌 API Endpoints

### Gateway Agent provides these REST endpoints:

- **`GET /health`** - System health check
- **`GET /api/agents`** - Discover all available agents
- **`POST /api/agents/{agentId}/message`** - Send message to specific agent
- **`POST /api/workflow/research-analysis-write`** - Execute complete workflow (reliable message exchange)
- **`POST /api/workflow/simple`** - Execute simple workflow (reliable message exchange)
- **`POST /api/test/a2a-communication`** - Test A2A communication

### Example Usage

```bash
# Health check
curl http://localhost:3001/health

# Discover agents
curl http://localhost:3001/api/agents

# Send message to research agent
curl -X POST http://localhost:3001/api/agents/researchAgent/message \
  -H "Content-Type: application/json" \
  -d '{"message": "Research AI trends"}'

# Execute workflow (reliable message exchange)
curl -X POST http://localhost:3001/api/workflow/research-analysis-write \
  -H "Content-Type: application/json" \
  -d '{"topic": "AI Trends", "targetAudience": "Developers"}'

# Execute simple workflow (reliable message exchange)
curl -X POST http://localhost:3001/api/workflow/simple \
  -H "Content-Type: application/json" \
  -d '{"topic": "AI Trends", "targetAudience": "Developers"}'
```

---

## 🎨 Frontend Integration

**Next.js frontend** with real-time agent status monitoring:

- **Agent discovery** and status display
- **Message sending** interface
- **Workflow execution** dashboard
- **Real-time streaming** updates

### Frontend Features

- **Real-time Agent Status**: Live monitoring of all agents
- **Message Interface**: Send messages to any agent
- **Workflow Dashboard**: Execute and monitor workflows
- **Streaming Updates**: Real-time task progress
- **Modern UI**: Clean, responsive design with Tailwind CSS

---

## 🚀 Deployment

### Each agent runs on its own server/port:

- **Research Agent**: http://localhost:4111
- **Writing Agent**: http://localhost:4112
- **Analysis Agent**: http://localhost:4113
- **Gateway Agent**: http://localhost:3001
- **Frontend**: http://localhost:3000

### Production Deployment

Each agent can be deployed independently:

```bash
# Deploy Research Agent to AWS
cd research-agent && npm run build && deploy-to-aws

# Deploy Writing Agent to Google Cloud
cd writing-agent && npm run build && deploy-to-gcp

# Deploy Analysis Agent to Azure
cd analysis-agent && npm run build && deploy-to-azure

# Deploy Gateway Agent to your server
cd gateway-agent && npm run build && deploy-to-server

# Deploy Frontend to Vercel
cd a2a-frontend && npm run build && deploy-to-vercel
```

---

## 🔮 Future Enhancements

### 1. Task Persistence
- **Store task history** and results
- **Resume interrupted** workflows

### 2. Advanced Routing
- **Load balancing** across agent instances
- **Dynamic agent discovery**

### 3. Security
- **Authentication and authorization**
- **Encrypted A2A communication**

### 4. Monitoring
- **Performance metrics**
- **Error tracking and alerting**

### 5. Scalability
- **Horizontal scaling** of agents
- **Multi-region deployment**
- **Auto-scaling** based on demand

---

## 📚 References

- **Mastra A2A Changelog**: [https://mastra.ai/blog/changelog-2025-05-15](https://mastra.ai/blog/changelog-2025-05-15)
- **A2A Protocol Specification**: [https://google.github.io/A2A/](https://google.github.io/A2A/)
- **Mastra Client JS**: [https://www.npmjs.com/package/@mastra/client-js](https://www.npmjs.com/package/@mastra/client-js)
- **Project Repository**: [https://github.com/Sri01729/mastra-a2a-distributed-system](https://github.com/Sri01729/mastra-a2a-distributed-system)

---

## 🎉 Current Status

### ✅ **Fully Working Components:**
- **A2A Protocol communication** between all agents
- **Agent discovery** and status monitoring
- **Message exchange** via A2A protocol
- **Workflow orchestration**
- **Frontend integration**
- **Distributed architecture**

### ✅ **Recent Fixes:**
- **Fixed agent naming convention** (export names vs internal names)
- **Resolved port conflicts** with environment variables
- **Updated frontend** to use correct agent IDs
- **Added root package.json** for development convenience
- **Removed streaming from workflows** to avoid JSON parsing issues
- **Both workflows now use reliable message exchange** for consistent operation
- **Simplified architecture** focusing on core A2A communication

---

*This documentation is continuously updated to reflect the current state of the project.*

