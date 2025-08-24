
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { writingAgent } from './agents/writing-agent';

/**
 * Mastra Configuration - Writing Agent Server
 *
 * This configuration:
 * 1. Registers our Writing Agent with Mastra
 * 2. Enables A2A communication capabilities
 * 3. Sets up storage and logging for the agent
 * 4. Exposes the agent via Mastra Dev Server
 */
export const mastra = new Mastra({
  // Agent Registration - This makes our Writing Agent available for A2A communication
  agents: {
    writingAgent  // This agent will be discoverable by other agents
  },

  // Storage Configuration - For telemetry, evaluations, and agent state
  storage: new LibSQLStore({
    // Using file storage for persistence across server restarts
    // This enables other agents to maintain context about this agent
    url: "file:../mastra.db",
  }),

  // Logging Configuration - For monitoring and debugging
  logger: new PinoLogger({
    name: 'Writing Agent Server',
    level: 'info',
  }),
});

/**
 * What This Configuration Enables:
 *
 * 1. **A2A Endpoints**: Mastra automatically exposes:
 *    - GET /api/a2a/agents - List available agents
 *    - GET /api/a2a/agents/{agentId} - Get agent details
 *    - POST /api/a2a/messages - Send messages to agents
 *    - POST /api/a2a/tasks - Create tasks for agents
 *
 * 2. **Agent Discovery**: Other agents can discover this agent using:
 *    - Agent ID: 'writing-agent'
 *    - Capabilities: content creation, report writing, style adaptation
 *
 * 3. **Message Exchange**: Other agents can communicate with this agent:
 *    - Direct messaging for writing requests
 *    - Task delegation for content creation
 *    - Streaming responses for long-running writing tasks
 *
 * 4. **Dev Server**: Running 'mastra dev' will start a server with:
 *    - A2A endpoints for agent communication
 *    - Agent management and monitoring
 *    - Hot reloading for development
 *
 * 5. **Collaboration**: This agent can collaborate with:
 *    - Research Agent: Accept research data for content creation
 *    - Analysis Agent: Provide writing services for analysis reports
 *    - Gateway Agent: Accept writing tasks from frontend requests
 */
