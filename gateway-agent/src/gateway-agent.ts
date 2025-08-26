// @ts-nocheck - TypeScript configuration issues with global types
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

// Agent Server Configuration - Mastra Cloud URLs
const AGENT_SERVERS = {
  research: process.env.RESEARCH_AGENT_URL || 'https://your-research-agent.mastra.ai',
  writing: process.env.WRITING_AGENT_URL || 'https://your-writing-agent.mastra.ai',
  analysis: process.env.ANALYSIS_AGENT_URL || 'https://your-analysis-agent.mastra.ai'
};

// Agent IDs for A2A communication (Using export names)
const AGENT_IDS = {
  research: 'researchAgent',
  writing: 'writingAgent',
  analysis: 'analysisAgent'
};

// Initialize Mastra clients for each agent server
const mastraClients = {
  research: new MastraClient({ baseUrl: AGENT_SERVERS.research }),
  writing: new MastraClient({ baseUrl: AGENT_SERVERS.writing }),
  analysis: new MastraClient({ baseUrl: AGENT_SERVERS.analysis })
};

// Get agent instances for each deployed agent
const agentClients = {
  research: mastraClients.research.getAgent(AGENT_IDS.research),
  writing: mastraClients.writing.getAgent(AGENT_IDS.writing),
  analysis: mastraClients.analysis.getAgent(AGENT_IDS.analysis)
};

// Helper function to create a proper Message object for A2A
function createMessage(content: string, from: string = 'gateway-agent') {
  return {
    kind: 'message' as const,
    messageId: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    role: 'user',
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
    // Parse allowed origins from environment variable
    const allowedOrigins = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
      : ['http://localhost:3000', 'http://localhost:3001'];

    this.app.use(cors({
      origin: allowedOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes() {
    // Simple, fast response for load balancer health checks
    this.app.get('/health', (req: express.Request, res: express.Response) => {
      res.status(200).json({ status: 'healthy' });
    });

    // Add readiness probe separate from health check
    this.app.get('/ready', (req: express.Request, res: express.Response) => {
      res.json({
        status: 'ready',
        service: 'Gateway Agent',
        timestamp: new Date().toISOString(),
        agents: Object.keys(AGENT_SERVERS),
        a2aProtocol: 'Mastra Native A2A v0.3.0'
      });
    });

    this.app.get('/api/agents', async (req: express.Request, res: express.Response): Promise<any> => {
      try {
        const agents = await this.discoverAgentsWithMastraA2A();
        res.json(agents);
      } catch (error: any) {
        res.status(500).json({ error: 'Failed to discover agents' });
      }
    });

    this.app.post('/api/agents/:agentId/message', async (req: express.Request, res: express.Response): Promise<any> => {
      try {
        const { agentId } = req.params;
        const { message } = req.body;

        const response = await this.sendMessageToAgentWithMastraA2A(agentId, message);
        res.json(response);
      } catch (error: any) {
        res.status(500).json({ error: 'Failed to send message' });
      }
    });

    this.app.post('/api/workflow/research-analysis-write', async (req: express.Request, res: express.Response): Promise<any> => {
      try {
        const { topic, targetAudience } = req.body;

        const result = await this.executeResearchAnalysisWriteWorkflowWithMastraA2A(topic, targetAudience);
        res.json(result);
      } catch (error: any) {
        res.status(500).json({ error: 'Workflow execution failed' });
      }
    });

    this.app.post('/api/workflow/simple', async (req: express.Request, res: express.Response): Promise<any> => {
      try {
        const { topic, targetAudience } = req.body;

        const result = await this.executeSimpleWorkflow(topic, targetAudience);
        res.json(result);
      } catch (error: any) {
        res.status(500).json({ error: 'Simple workflow execution failed' });
      }
    });

    this.app.post('/api/test/a2a-communication', async (req: express.Request, res: express.Response): Promise<any> => {
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
        // Get agent details using Mastra Client
        const agentName = AGENT_IDS[serverName as keyof typeof AGENT_IDS];
        const agentClient = agentClients[serverName as keyof typeof agentClients];

        try {
          const agentDetails = await agentClient.details();
          discoveredAgents.push({
            server: serverName,
            url: serverUrl,
            agent: agentDetails,
            status: 'online',
            protocol: 'Mastra Cloud Agent API'
          });
        } catch (agentError: any) {
          console.warn(`Agent discovery failed for ${serverName}:`, agentError.message);
          discoveredAgents.push({
            server: serverName,
            url: serverUrl,
            status: 'offline',
            error: agentError.message,
            protocol: 'Mastra Cloud Agent API'
          });
        }
      } catch (error: any) {
        console.warn(`Failed to discover agent on ${serverName}:`, error.message);
        discoveredAgents.push({
          server: serverName,
          url: serverUrl,
          status: 'offline',
          error: error.message,
          protocol: 'Mastra Cloud Agent API'
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
      const agentClient = agentClients[serverName as keyof typeof agentClients];
      const result = await agentClient.generate({
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });

      return {
        success: true,
        message: `Message sent to ${agentId} using Mastra Cloud API`,
        result,
        timestamp: new Date().toISOString(),
        protocol: 'Mastra Cloud Agent API'
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
    console.log(`🚀 Starting Mastra Cloud workflow: ${topic} for ${targetAudience}`);

    try {
      console.log('📚 Step 1: Sending research message via Mastra Cloud...');
      const researchResponse = await agentClients.research.generate({
        messages: [
          {
            role: "user",
            content: `Please research the topic: ${topic}. Provide comprehensive findings with sources and insights.`,
          },
        ],
      });

      console.log('📊 Step 2: Sending analysis message via Mastra Cloud...');
      const analysisResponse = await agentClients.analysis.generate({
        messages: [
          {
            role: "user",
            content: `Please analyze the research findings for topic: ${topic}. Target audience: ${targetAudience}.`,
          },
        ],
      });

      console.log('✍️ Step 3: Sending writing message via Mastra Cloud...');
      const writingResponse = await agentClients.writing.generate({
        messages: [
          {
            role: "user",
            content: `Please create content for topic: ${topic}. Target audience: ${targetAudience}. Content type: report.`,
          },
        ],
      });

      console.log('✅ All messages sent successfully via Mastra Cloud API');

      return {
        workflow: 'research-analysis-write',
        topic,
        targetAudience,
        responses: {
          research: researchResponse,
          analysis: analysisResponse,
          writing: writingResponse
        },
        timestamp: new Date().toISOString(),
        protocol: 'Mastra Cloud Agent API',
        note: 'Using Mastra Cloud API for agent communication'
      };
    } catch (error: any) {
      console.error('❌ Workflow execution failed:', error);
      throw error;
    }
  }

  private async executeSimpleWorkflow(topic: string, targetAudience: string) {
    console.log(`🚀 Starting Simple Mastra Cloud workflow: ${topic} for ${targetAudience}`);

    try {
      console.log('📚 Step 1: Sending research message via Mastra Cloud...');
      const researchResponse = await agentClients.research.generate({
        messages: [
          {
            role: "user",
            content: `Please research the topic: ${topic}. Provide comprehensive findings with sources and insights.`,
          },
        ],
      });

      console.log('📊 Step 2: Sending analysis message via Mastra Cloud...');
      const analysisResponse = await agentClients.analysis.generate({
        messages: [
          {
            role: "user",
            content: `Please analyze the research findings for topic: ${topic}. Target audience: ${targetAudience}.`,
          },
        ],
      });

      console.log('✍️ Step 3: Sending writing message via Mastra Cloud...');
      const writingResponse = await agentClients.writing.generate({
        messages: [
          {
            role: "user",
            content: `Please create content for topic: ${topic}. Target audience: ${targetAudience}. Content type: report.`,
          },
        ],
      });

      return {
        workflow: 'simple-research-analysis-write',
        topic,
        targetAudience,
        responses: {
          research: researchResponse,
          analysis: analysisResponse,
          writing: writingResponse
        },
        timestamp: new Date().toISOString(),
        protocol: 'Mastra Cloud Agent API',
        note: 'Simple workflow using Mastra Cloud API'
      };
    } catch (error: any) {
      console.error('❌ Simple workflow execution failed:', error);
      throw error;
    }
  }

  private async testMastraA2ACommunication() {
    console.log('🧪 Testing Mastra Cloud communication...');

    const tests: any[] = [];

    try {
      const agentDetails = await agentClients.research.details();
      tests.push({ agent: 'research', status: 'success', agentDetails, protocol: 'Mastra Cloud Agent API' });
    } catch (error: any) {
      tests.push({ agent: 'research', status: 'failed', error: error.message, protocol: 'Mastra Cloud Agent API' });
    }

    try {
      const agentDetails = await agentClients.analysis.details();
      tests.push({ agent: 'analysis', status: 'success', agentDetails, protocol: 'Mastra Cloud Agent API' });
    } catch (error: any) {
      tests.push({ agent: 'analysis', status: 'failed', error: error.message, protocol: 'Mastra Cloud Agent API' });
    }

    try {
      const agentDetails = await agentClients.writing.details();
      tests.push({ agent: 'writing', status: 'success', agentDetails, protocol: 'Mastra Cloud Agent API' });
    } catch (error: any) {
      tests.push({ agent: 'writing', status: 'failed', error: error.message, protocol: 'Mastra Cloud Agent API' });
    }

    return {
      test: 'mastra-cloud-communication',
      timestamp: new Date().toISOString(),
      results: tests,
      protocol: 'Mastra Cloud Agent API'
    };
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Gateway Agent running on port ${this.port}`);
      console.log(`📊 Health check: http://localhost:${this.port}/health`);
      console.log(`🔍 Agent discovery: http://localhost:${this.port}/api/agents`);
      console.log(`💬 Send message: POST http://localhost:${this.port}/api/agents/{agentId}/message`);
      console.log(`🔄 Workflow: POST http://localhost:${this.port}/api/workflow/research-analysis-write`);
      console.log(`🔄 Simple Workflow: POST http://localhost:${this.port}/api/workflow/simple`);
      console.log(`📝 Note: Workflows use Mastra Cloud API for agent communication`);
      console.log(`🧪 Cloud Test: POST http://localhost:${this.port}/api/test/a2a-communication`);
      console.log(`🔗 Using Mastra Cloud Agent API for distributed agent communication`);
      console.log(`✅ Gateway agent ready to coordinate distributed agents on Mastra Cloud!`);
    });
  }
}

const gatewayAgent = new GatewayAgent(3001);
gatewayAgent.start();

export default GatewayAgent;
