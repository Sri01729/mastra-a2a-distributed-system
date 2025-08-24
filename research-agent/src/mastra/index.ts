
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { researchAgent } from './agents/research-agent';

/**
 * Mastra Configuration - Research Agent Server
 *
 * This configuration:
 * 1. Registers our Research Agent with Mastra
 * 2. Enables A2A communication capabilities
 * 3. Sets up storage and logging for the agent
 * 4. Exposes the agent via Mastra Dev Server
 */
export const mastra = new Mastra({
  // Agent Registration - This makes our Research Agent available for A2A communication
  agents: {
    researchAgent  // This agent will be discoverable by other agents
  },

  // Storage Configuration - For telemetry, evaluations, and agent state
  storage: new LibSQLStore({
    // Using file storage for persistence across server restarts
    // This enables other agents to maintain context about this agent
    url: "file:../mastra.db",
  }),

  // Logging Configuration - For monitoring and debugging
  logger: new PinoLogger({
    name: 'Research Agent Server',
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
 *    - Agent ID: 'research-agent'
 *    - Capabilities: research, information gathering, analysis
 *
 * 3. **Message Exchange**: Other agents can communicate with this agent:
 *    - Direct messaging for questions
 *    - Task delegation for research work
 *    - Streaming responses for long-running tasks
 *
 * 4. **Dev Server**: Running 'mastra dev' will start a server with:
 *    - A2A endpoints for agent communication
 *    - Agent management and monitoring
 *    - Hot reloading for development
 */
