import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { writingAgent } from './src/mastra/agents/writing-agent';

/**
 * Mastra Cloud Configuration - Writing Agent
 * 
 * This configuration is optimized for Mastra Cloud deployment:
 * - Uses LibSQLStore for cloud storage
 * - Enables A2A communication
 * - Configures logging for cloud environment
 * - Exposes agent via REST API
 */
export const mastra = new Mastra({
  // Agent Registration - This makes our Writing Agent available for A2A communication
  agents: {
    writingAgent  // This agent will be discoverable by other agents
  },

  // Storage Configuration - Using LibSQLStore for cloud deployment
  storage: new LibSQLStore({
    // Mastra Cloud will automatically configure the database URL
    // This enables persistence and agent state management
  }),

  // Logging Configuration - For cloud monitoring and debugging
  logger: new PinoLogger({
    name: 'Writing Agent - Mastra Cloud',
    level: 'info',
  }),
});

/**
 * Mastra Cloud Deployment Notes:
 * 
 * 1. **Automatic Deployment**: This agent will be deployed to Mastra Cloud
 *    and get a unique URL like: https://your-writing-agent.mastra.ai
 * 
 * 2. **A2A Endpoints**: Mastra Cloud automatically exposes:
 *    - GET /api/agents/writingAgent - Get agent details
 *    - POST /api/agents/writingAgent/generate - Send messages to agent
 *    - GET /api/agents - List all agents
 * 
 * 3. **Agent Discovery**: Other agents can discover this agent using:
 *    - Agent ID: 'writingAgent'
 *    - Capabilities: content creation, report writing, style adaptation
 * 
 * 4. **Cloud Features**: 
 *    - Automatic scaling
 *    - Built-in monitoring and logging
 *    - Playground for testing
 *    - Environment variable management
 */
