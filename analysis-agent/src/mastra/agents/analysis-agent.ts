import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

/**
 * Analysis Agent - Specialized in data analysis and pattern recognition
 *
 * This agent demonstrates:
 * 1. How to create a specialized agent for data analysis
 * 2. How Mastra agents can process complex analytical tasks
 * 3. How to configure memory for analytical context and insights
 * 4. How to structure agent instructions for analysis tasks
 */
export const analysisAgent = new Agent({
  // Agent Identity - This is how other agents will discover this agent
  name: 'analysis-agent',

  // Agent Description - Used for A2A discovery and capability sharing
  description: 'Specialized in deep data analysis and pattern recognition',

  // Agent Instructions - Defines the agent's behavior and capabilities
  instructions: `
    You are an Analysis Agent specialized in data analysis and pattern recognition.

    Your primary capabilities:
    1. **Statistical Analysis**: Perform deep statistical analysis on data
    2. **Pattern Recognition**: Identify patterns, trends, and correlations
    3. **Insight Generation**: Generate actionable insights from data
    4. **Data Visualization**: Create descriptive visualizations and charts
    5. **Predictive Analysis**: Provide data-driven predictions and forecasts

    When performing analysis:
    - Always validate data quality and completeness
    - Use appropriate statistical methods for the data type
    - Identify key patterns and trends in the data
    - Provide confidence levels for your findings
    - Explain the implications of your analysis
    - Suggest actionable recommendations based on insights

    Your analysis should be:
    - Methodologically sound and rigorous
    - Clear and easy to understand
    - Actionable and practical
    - Well-documented with reasoning
    - Comprehensive yet focused

    You can handle analysis tasks including:
    - Market analysis and trend identification
    - Performance metrics and KPIs analysis
    - User behavior and engagement analysis
    - Financial data and risk assessment
    - Scientific data and research analysis
    - Social media and sentiment analysis
    - Predictive modeling and forecasting
    - Comparative analysis and benchmarking

    When collaborating with other agents:
    - Accept research data from Research Agent for analysis
    - Provide analytical insights to Writing Agent for reports
    - Request clarification if data is insufficient for analysis
    - Maintain analytical rigor and objectivity
    - Share analytical methodologies and assumptions
  `,

  // Language Model - The AI model that powers this agent
  model: openai('gpt-4o-mini'),

  // Memory Configuration - Enables persistent conversation history and analytical context
  memory: new Memory({
    storage: new LibSQLStore({
      // This creates a persistent database for analytical context and insights
      // Other agents can reference previous analysis and findings
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
 *    - Agent name: 'analysis-agent'
 *    - Capabilities: data analysis, pattern recognition, statistical analysis
 *
 * 2. **Message Exchange**: Other agents can send messages to this agent:
 *    - Direct analysis requests and data processing
 *    - Task delegation for analytical work
 *    - Data validation and quality assessment
 *
 * 3. **Task Delegation**: Other agents can delegate analysis tasks:
 *    - "Analyze this market data and identify trends"
 *    - "Perform statistical analysis on this dataset"
 *    - "Generate insights from this research data"
 *    - "Create predictive models for this data"
 *
 * 4. **Capability Sharing**: This agent exposes its analytical capabilities
 *    - Other agents know this agent can handle analysis tasks
 *    - Automatic routing of analysis requests to this agent
 *    - Collaboration with Research and Writing agents
 *
 * 5. **Data Processing Pipeline**: This agent can:
 *    - Accept raw data from Research Agent
 *    - Process and analyze the data
 *    - Generate insights and recommendations
 *    - Provide structured analysis for Writing Agent
 */
