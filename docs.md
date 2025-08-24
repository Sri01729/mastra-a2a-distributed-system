Mastra & A2A — Essential Docs


📚 Quick Links

Mastra (TypeScript agent framework)

Website (overview): https://mastra.ai/

Docs – Introduction: https://mastra.ai/docs

Getting Started – Installation: https://mastra.ai/en/docs/getting-started/installation

Agents – Overview: https://mastra.ai/en/docs/agents/overview

Tools & MCP – Overview: https://mastra.ai/en/docs/tools-mcp/overview

Workflows – Overview: https://mastra.ai/en/docs/workflows/overview

Server & DB – Production Server: https://mastra.ai/en/docs/server-db/production-server

Mastra Cloud – Setup & Deploy: https://mastra.ai/en/docs/mastra-cloud/setting-up

MCP Docs Server (Cursor/Windsurf integration): https://mastra.ai/en/docs/getting-started/mcp-docs-server

GitHub – mastra: https://github.com/mastra-ai/mastra

A2A (Agent‑to‑Agent protocol)

Official site: https://a2aprotocol.ai/

Docs – Index: https://a2aprotocol.ai/docs/

Key Concepts (spec site): https://google.github.io/A2A/topics/key-concepts/

ADK × A2A (quickstarts): https://google.github.io/adk-docs/a2a/

Google Developers Blog (background): https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/

Linux Foundation announcement: https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents

GitHub – A2A (spec & reference): https://github.com/a2aproject/A2A

SDKs: JS — https://github.com/a2aproject/a2a-js · Python — https://github.com/a2aproject/a2a-python · Java — https://github.com/a2aproject/a2a-java

Samples: https://github.com/a2aproject/a2a-samples

Codelab – Purchasing Concierge: https://codelabs.developers.google.com/intro-a2a-purchasing-concierge


🚀 Our A2A Implementation

Project Overview

We've built a distributed A2A (Agent-to-Agent) communication system using Mastra's native A2A client and Google's A2A protocol v0.3.0. This system demonstrates how multiple AI agents can collaborate across different servers using standardized communication protocols.

Architecture

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

Key Components

1. Gateway Agent (Port 3001)
   - Express.js server with Mastra A2A client
   - Coordinates communication between agents
   - Provides REST API for frontend integration
   - Orchestrates multi-agent workflows

2. Research Agent (Port 4111)
   - Specialized in information gathering and analysis
   - Mastra Dev Server with A2A capabilities
   - Receives research tasks via A2A protocol

3. Writing Agent (Port 4112)
   - Specialized in content creation and report generation
   - Mastra Dev Server with A2A capabilities
   - Creates content based on research and analysis

4. Analysis Agent (Port 4113)
   - Specialized in deep data analysis and pattern recognition
   - Mastra Dev Server with A2A capabilities
   - Processes research findings and provides insights

Real Mastra A2A Client Usage

The system uses Mastra's native A2A client (not simulation):

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
// 1. Get agent information
const agentCard = await a2aClients.research.getCard();

// 2. Send messages to agents
const response = await a2aClients.research.sendMessage({
  content: 'Research topic: AI trends',
  from: 'gateway-agent'
});

// 3. Stream real-time updates
const stream = a2aClients.research.sendStreamingMessage({
  content: 'Stream research updates',
  from: 'gateway-agent'
});
```

A2A Protocol Features Used

1. Agent Discovery
   - `getCard()` - Retrieve agent metadata and capabilities
   - Agent identification and status checking

2. Message Exchange
   - `sendMessage()` - Direct communication between agents
   - Structured message format with sender/receiver

3. Real-time Streaming
   - `sendStreamingMessage()` - Server-Sent Events (SSE)
   - Live task progress and status updates

4. Task Management
   - `getTask()` - Query task status and results
   - `cancelTask()` - Cancel running tasks

Workflow Example

Research → Analysis → Writing workflow:

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

  // Step 4: Real-time streaming
  const researchStream = a2aClients.research.sendStreamingMessage({
    content: `Stream updates for: ${topic}`,
    from: 'gateway-agent'
  });

  return { researchResponse, analysisResponse, writingResponse, researchStream };
}
```

Key Learnings

1. Real A2A Client Access
   - A2A client is accessed via `MastraClient.getA2A(agentId)`
   - Not available as direct import: `import { A2A } from '@mastra/client-js'`
   - Available in @mastra/client-js v0.10.23+

2. Protocol Compliance
   - Follows Google's A2A v0.3.0 specification
   - Uses Mastra's native A2A implementation
   - Compatible with official A2A SDKs

3. Distributed Architecture Benefits
   - True separation of concerns
   - Independent scaling and deployment
   - Fault isolation and resilience
   - Protocol-based communication

4. Development Approach
   - Learning by implementing real A2A concepts
   - Understanding distributed agent systems
   - Building production-ready A2A applications

API Endpoints

Gateway Agent provides these REST endpoints:

- `GET /health` - System health check
- `GET /api/agents` - Discover all available agents
- `POST /api/agents/{agentId}/message` - Send message to specific agent
- `POST /api/workflow/research-analysis-write` - Execute complete workflow
- `POST /api/test/a2a-communication` - Test A2A communication

Frontend Integration

Next.js frontend with real-time agent status monitoring:
- Agent discovery and status display
- Message sending interface
- Workflow execution dashboard
- Real-time streaming updates

Deployment

Each agent runs on its own server/port:
- Research Agent: http://localhost:4111
- Writing Agent: http://localhost:4112
- Analysis Agent: http://localhost:4113
- Gateway Agent: http://localhost:3001
- Frontend: http://localhost:3000

Future Enhancements

1. Task Persistence
   - Store task history and results
   - Resume interrupted workflows

2. Advanced Routing
   - Load balancing across agent instances
   - Dynamic agent discovery

3. Security
   - Authentication and authorization
   - Encrypted A2A communication

4. Monitoring
   - Performance metrics
   - Error tracking and alerting

References

- Mastra A2A Changelog: https://mastra.ai/blog/changelog-2025-05-15
- A2A Protocol Specification: https://google.github.io/A2A/
- Mastra Client JS: https://www.npmjs.com/package/@mastra/client-js
- Project Repository: https://github.com/your-username/mastra-a2a

