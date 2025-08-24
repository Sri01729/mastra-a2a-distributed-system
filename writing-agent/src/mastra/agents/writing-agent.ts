import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

/**
 * Writing Agent - Specialized in content creation and report generation
 *
 * This agent demonstrates:
 * 1. How to create a specialized agent for content creation
 * 2. How Mastra agents can collaborate with other agents via A2A
 * 3. How to configure memory for writing context and style preferences
 * 4. How to structure agent instructions for writing tasks
 */
export const writingAgent = new Agent({
  // Agent Identity - This is how other agents will discover this agent
  name: 'writing-agent',

  // Agent Description - Used for A2A discovery and capability sharing
  description: 'Specialized in creating compelling content and reports based on research data',

  // Agent Instructions - Defines the agent's behavior and capabilities
  instructions: `
    You are a Writing Agent specialized in content creation and report generation.

    Your primary capabilities:
    1. **Content Creation**: Transform research data into engaging content
    2. **Report Writing**: Create comprehensive reports and summaries
    3. **Style Adaptation**: Adapt writing style for different audiences
    4. **Structure Organization**: Ensure clarity and logical flow
    5. **Multi-format Output**: Create content in various formats (reports, blogs, summaries)

    When creating content:
    - Always ask for the target audience if not specified
    - Adapt tone and style to match the audience (executive, technical, general)
    - Structure information logically with clear sections
    - Use engaging language while maintaining accuracy
    - Include relevant examples and supporting details
    - Ensure proper formatting and readability

    Your writing should be:
    - Clear and concise
    - Well-structured and organized
    - Engaging and informative
    - Appropriate for the target audience
    - Professional and polished

    You can handle writing tasks including:
    - Executive summaries and reports
    - Technical documentation and guides
    - Blog posts and articles
    - Marketing copy and presentations
    - Research summaries and findings
    - Educational content and tutorials

    When collaborating with other agents:
    - Accept research data from Research Agent
    - Request clarification if data is insufficient
    - Provide structured output for Analysis Agent
    - Maintain consistent style across collaborations
  `,

  // Language Model - The AI model that powers this agent
  model: openai('gpt-4o-mini'),

  // Memory Configuration - Enables persistent conversation history and style preferences
  memory: new Memory({
    storage: new LibSQLStore({
      // This creates a persistent database for writing context and style preferences
      // Other agents can reference previous writing collaborations
      url: 'file:../mastra.db',
    }),
  }),

  // A2A Configuration - This agent will be discoverable by other agents
  // Mastra automatically exposes A2A endpoints when this agent is registered
});

/**
 * Key A2A Features This Agent Provides:
 *
 * 1. **Agent Discovery**: Other agents can find this agent using:
 *    - Agent name: 'writing-agent'
 *    - Capabilities: content creation, report writing, style adaptation
 *
 * 2. **Message Exchange**: Other agents can send messages to this agent:
 *    - Direct writing requests and content creation
 *    - Task delegation for writing work
 *    - Style and format specifications
 *
 * 3. **Task Delegation**: Other agents can delegate writing tasks:
 *    - "Create an executive summary of this research"
 *    - "Write a blog post about AI trends"
 *    - "Generate a technical report from this data"
 *
 * 4. **Capability Sharing**: This agent exposes its writing capabilities
 *    - Other agents know this agent can handle writing tasks
 *    - Automatic routing of writing requests to this agent
 *    - Collaboration with Research and Analysis agents
 */
