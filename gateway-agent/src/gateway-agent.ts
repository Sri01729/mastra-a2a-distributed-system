import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { MastraClient } from '@mastra/client-js';

/**
 * Gateway Agent - Coordinator for Distributed A2A Communication
 *
 * This Gateway Agent demonstrates:
 * 1. How to build an Express.js server that coordinates multiple Mastra agents
 * 2. How to implement A2A protocol communication between distributed agents
 * 3. How to orchestrate workflows across multiple agent servers
 * 4. How to provide a unified REST API for frontend applications
 * 5. How to use Mastra's native A2A support for agent communication
 *
 * Architecture:
 * - Gateway Agent (Port 3001) - Express.js server with Mastra A2A client
 * - Research Agent (Port 4111) - Mastra Dev Server with A2A capabilities
 * - Writing Agent (Port 4112) - Mastra Dev Server with A2A capabilities
 * - Analysis Agent (Port 4113) - Mastra Dev Server with A2A capabilities
 */

// Agent Server Configuration
const AGENT_SERVERS = {
  research: 'http://localhost:4111',
  writing: 'http://localhost:4112',
  analysis: 'http://localhost:4113'
};

// Agent IDs for A2A communication
const AGENT_IDS = {
  research: 'research-agent',
  writing: 'writing-agent',
  analysis: 'analysis-agent'
};

// Initialize Mastra A2A clients for each agent server
const mastraClients = {
  research: new MastraClient({ baseUrl: AGENT_SERVERS.research }),
  writing: new MastraClient({ baseUrl: AGENT_SERVERS.writing }),
  analysis: new MastraClient({ baseUrl: AGENT_SERVERS.analysis })
};

// Get A2A instances for each agent
const a2aClients = {
  research: mastraClients.research.getA2A(AGENT_IDS.research),
  writing: mastraClients.writing.getA2A(AGENT_IDS.writing),
  analysis: mastraClients.analysis.getA2A(AGENT_IDS.analysis)
};

// Helper function to create a proper Message object for A2A
function createMessage(content: string, from: string = 'gateway-agent') {
  return {
    kind: 'message' as const,
    messageId: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    parts: [
      {
        kind: 'text' as const,
        text: content
      }
    ],
    metadata: {
      from: from
    }
  };
}

class GatewayAgent {
  private app: express.Application;
  private port: number;

  constructor(port: number = 3001) {
    this.port = port;
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes() {
    this.app.get('/health', (req: express.Request, res: express.Response) => {
      res.json({
        status: 'healthy',
        service: 'Gateway Agent',
        timestamp: new Date().toISOString(),
        agents: Object.keys(AGENT_SERVERS),
        a2aProtocol: 'Mastra Native A2A v0.3.0',
        changelog: 'https://mastra.ai/blog/changelog-2025-05-15'
      });
    });

    this.app.get('/api/agents', async (req: express.Request, res: express.Response) => {
      try {
        const agents = await this.discoverAgentsWithMastraA2A();
        res.json(agents);
      } catch (error: any) {
        res.status(500).json({ error: 'Failed to discover agents' });
      }
    });

    this.app.post('/api/agents/:agentId/message', async (req: express.Request, res: express.Response) => {
      try {
        const { agentId } = req.params;
        const { message } = req.body;

        const response = await this.sendMessageToAgentWithMastraA2A(agentId, message);
        res.json(response);
      } catch (error: any) {
        res.status(500).json({ error: 'Failed to send message' });
      }
    });

    this.app.post('/api/workflow/research-analysis-write', async (req: express.Request, res: express.Response) => {
      try {
        const { topic, targetAudience } = req.body;

        const result = await this.executeResearchAnalysisWriteWorkflowWithMastraA2A(topic, targetAudience);
        res.json(result);
      } catch (error: any) {
        res.status(500).json({ error: 'Workflow execution failed' });
      }
    });

    this.app.post('/api/test/a2a-communication', async (req: express.Request, res: express.Response) => {
      try {
        const result = await this.testMastraA2ACommunication();
        res.json(result);
      } catch (error: any) {
        res.status(500).json({ error: 'A2A communication test failed' });
      }
    });
  }

  private async discoverAgentsWithMastraA2A(): Promise<any[]> {
    const discoveredAgents: any[] = [];

    for (const [serverName, serverUrl] of Object.entries(AGENT_SERVERS)) {
      try {
        // Get agent card using Mastra A2A
        const agentCard = await a2aClients[serverName as keyof typeof a2aClients].getCard();

        discoveredAgents.push({
          server: serverName,
          url: serverUrl,
          agent: agentCard,
          status: 'online',
          a2aProtocol: 'Mastra Native A2A v0.3.0'
        });
      } catch (error: any) {
        console.warn(`Failed to discover agent on ${serverName}:`, error.message);
        discoveredAgents.push({
          server: serverName,
          url: serverUrl,
          status: 'offline',
          error: error.message,
          a2aProtocol: 'Mastra Native A2A v0.3.0'
        });
      }
    }
    return discoveredAgents;
  }

  private async sendMessageToAgentWithMastraA2A(agentId: string, message: string) {
    const serverName = this.findAgentServer(agentId);

    if (!serverName) {
      throw new Error(`Agent ${agentId} not found`);
    }

    try {
      const result = await a2aClients[serverName as keyof typeof a2aClients].sendMessage({
        message: createMessage(message, 'gateway-agent')
      });

      return {
        success: true,
        message: `Message sent to ${agentId} using Mastra A2A`,
        result,
        timestamp: new Date().toISOString(),
        protocol: 'Mastra Native A2A v0.3.0'
      };
    } catch (error: any) {
      throw new Error(`Failed to send message to ${agentId}: ${error.message}`);
    }
  }

  private findAgentServer(agentId: string): keyof typeof AGENT_SERVERS | null {
    for (const [serverName, serverUrl] of Object.entries(AGENT_SERVERS)) {
      if (AGENT_IDS[serverName as keyof typeof AGENT_IDS] === agentId) {
        return serverName as keyof typeof AGENT_SERVERS;
      }
    }
    return null;
  }

  private async executeResearchAnalysisWriteWorkflowWithMastraA2A(topic: string, targetAudience: string) {
    console.log(`🚀 Starting Mastra A2A workflow: ${topic} for ${targetAudience}`);

    try {
      console.log('📚 Step 1: Sending research message via Mastra A2A...');
      const researchResponse = await a2aClients.research.sendMessage({
        message: createMessage(`Please research the topic: ${topic}. Provide comprehensive findings with sources and insights.`, 'gateway-agent')
      });

      console.log('📊 Step 2: Sending analysis message via Mastra A2A...');
      const analysisResponse = await a2aClients.analysis.sendMessage({
        message: createMessage(`Please analyze the research findings for topic: ${topic}. Target audience: ${targetAudience}.`, 'gateway-agent')
      });

      console.log('✍️ Step 3: Sending writing message via Mastra A2A...');
      const writingResponse = await a2aClients.writing.sendMessage({
        message: createMessage(`Please create content for topic: ${topic}. Target audience: ${targetAudience}. Content type: report.`, 'gateway-agent')
      });

      console.log('📡 Step 4: Setting up streaming message streams...');

      // Set up streaming for real-time updates
      const researchStream = a2aClients.research.sendStreamingMessage({
        message: createMessage(`Stream research updates for: ${topic}`, 'gateway-agent')
      });

      const analysisStream = a2aClients.analysis.sendStreamingMessage({
        message: createMessage(`Stream analysis updates for: ${topic}`, 'gateway-agent')
      });

      const writingStream = a2aClients.writing.sendStreamingMessage({
        message: createMessage(`Stream writing updates for: ${topic}`, 'gateway-agent')
      });

      return {
        workflow: 'research-analysis-write',
        topic,
        targetAudience,
        responses: {
          research: researchResponse,
          analysis: analysisResponse,
          writing: writingResponse
        },
        streams: {
          research: researchStream,
          analysis: analysisStream,
          writing: writingStream
        },
        timestamp: new Date().toISOString(),
        protocol: 'Mastra Native A2A v0.3.0',
        changelog: 'https://mastra.ai/blog/changelog-2025-05-15'
      };
    } catch (error: any) {
      console.error('❌ Workflow execution failed:', error);
      throw error;
    }
  }

  private async testMastraA2ACommunication() {
    console.log('🧪 Testing Mastra A2A communication...');

    const tests: any[] = [];

    try {
      const agentCard = await a2aClients.research.getCard();
      tests.push({ agent: 'research', status: 'success', agentCard, protocol: 'Mastra Native A2A v0.3.0' });
    } catch (error: any) {
      tests.push({ agent: 'research', status: 'failed', error: error.message, protocol: 'Mastra Native A2A v0.3.0' });
    }

    try {
      const agentCard = await a2aClients.analysis.getCard();
      tests.push({ agent: 'analysis', status: 'success', agentCard, protocol: 'Mastra Native A2A v0.3.0' });
    } catch (error: any) {
      tests.push({ agent: 'analysis', status: 'failed', error: error.message, protocol: 'Mastra Native A2A v0.3.0' });
    }

    try {
      const agentCard = await a2aClients.writing.getCard();
      tests.push({ agent: 'writing', status: 'success', agentCard, protocol: 'Mastra Native A2A v0.3.0' });
    } catch (error: any) {
      tests.push({ agent: 'writing', status: 'failed', error: error.message, protocol: 'Mastra Native A2A v0.3.0' });
    }

    return {
      test: 'mastra-a2a-communication',
      timestamp: new Date().toISOString(),
      results: tests,
      protocol: 'Mastra Native A2A v0.3.0',
      changelog: 'https://mastra.ai/blog/changelog-2025-05-15'
    };
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Gateway Agent running on port ${this.port}`);
      console.log(`📊 Health check: http://localhost:${this.port}/health`);
      console.log(`🔍 Agent discovery: http://localhost:${this.port}/api/agents`);
      console.log(`💬 Send message: POST http://localhost:${this.port}/api/agents/{agentId}/message`);
      console.log(`🔄 Workflow: POST http://localhost:${this.port}/api/workflow/research-analysis-write`);
      console.log(`🧪 A2A Test: POST http://localhost:${this.port}/api/test/a2a-communication`);
      console.log(`🔗 Using Mastra's Native A2A Protocol v0.3.0 for agent communication`);
      console.log(`📖 Based on Mastra changelog: https://mastra.ai/blog/changelog-2025-05-15`);
      console.log(`✅ Real A2A client implementation - no more simulation!`);
    });
  }
}

const gatewayAgent = new GatewayAgent(3001);
gatewayAgent.start();

export default GatewayAgent;
