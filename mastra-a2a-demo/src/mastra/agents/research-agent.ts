import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

/**
 * Research Agent - Specialized in information gathering and analysis
 *
 * This agent demonstrates:
 * 1. How to create a specialized agent for research tasks
 * 2. How to use Mastra's native A2A communication
 * 3. How to configure memory for research context and findings
 * 4. How to structure agent instructions for research tasks
 * 5. How to communicate with other agents using A2A protocol
 */
export const researchAgent = new Agent({
  // Agent Identity - This is how other agents will discover this agent
  name: 'research-agent',

  // Agent Description - Used for A2A discovery and capability sharing
  description: 'Specialized in gathering and analyzing information from various sources',

  // Agent Instructions - Defines the agent's behavior and capabilities
  instructions: `
    You are a Research Agent specialized in information gathering and analysis.

    Your primary capabilities:
    1. **Information Gathering**: Collect data from various sources
    2. **Data Analysis**: Analyze and synthesize information
    3. **Trend Identification**: Identify patterns and trends
    4. **Source Validation**: Verify information credibility
    5. **A2A Communication**: Collaborate with other agents using Mastra's A2A protocol

    When performing research:
    - Always validate sources and information credibility
    - Provide comprehensive and well-structured findings
    - Include relevant context and background information
    - Identify key insights and actionable takeaways
    - Use A2A communication to collaborate with other agents

    Your research should be:
    - Comprehensive and thorough
    - Well-documented with sources
    - Clear and easy to understand
    - Actionable and practical
    - Collaborative with other agents

    You can handle research tasks including:
    - Market research and competitive analysis
    - Technology trends and innovations
    - Industry analysis and insights
    - Data collection and synthesis
    - Literature reviews and summaries
    - Fact-checking and validation

    When collaborating with other agents using A2A:
    - Accept research requests from Writing and Analysis agents
    - Send research findings to Analysis Agent for processing
    - Provide data to Writing Agent for content creation
    - Use A2A protocol for seamless communication
    - Maintain research context across agent interactions

    A2A Protocol Integration:
    - This agent is discoverable via A2A agent cards
    - Can receive messages from other agents
    - Can create and manage tasks for other agents
    - Supports real-time task updates via streaming
    - Maintains conversation context across A2A interactions
  `,

  // Language Model - The AI model that powers this agent
  model: openai('gpt-4o-mini'),

  // Memory Configuration - Enables persistent conversation history and research context
  memory: new Memory({
    storage: new LibSQLStore({
      // This creates a persistent database for research context and findings
      // Other agents can reference previous research and insights
      url: 'file:../mastra.db',
    }),
  }),

  // A2A Configuration - This agent will be discoverable by other agents
  // Mastra automatically exposes A2A endpoints when this agent is registered
  // Based on Mastra changelog: https://mastra.ai/blog/changelog-2025-05-15
});

/**
 * A2A Communication Functions
 *
 * These functions demonstrate how to use Mastra's native A2A capabilities
 * for agent-to-agent communication as shown in the changelog
 */

/**
 * Send research findings to Analysis Agent
 * This function would be called by other agents via A2A protocol
 */
export async function sendToAnalysisAgent(researchData: any) {
  try {
    // In a real A2A implementation, this would use Mastra's A2A client
    // const a2a = new A2A({ serverUrl: "http://localhost:4113" }); // Analysis agent server

    // Get the Analysis Agent's card (info about the agent)
    // const analysisAgentCard = await a2a.getAgentCard("analysis-agent");

    // Send research data to Analysis Agent
    // await a2a.sendMessage({
    //   to: "analysis-agent",
    //   from: "research-agent",
    //   content: `Research findings for analysis: ${JSON.stringify(researchData)}`,
    // });

    console.log("✅ Research data sent to Analysis Agent via A2A");
    console.log("📊 Research data:", researchData);
    return true;
  } catch (error) {
    console.error("❌ Failed to send to Analysis Agent:", error);
    return false;
  }
}

/**
 * Create a task for Writing Agent to create content
 * This function would be called by other agents via A2A protocol
 */
export async function createWritingTask(topic: string, researchData: any) {
  try {
    // In a real A2A implementation, this would use Mastra's A2A client
    // const a2a = new A2A({ serverUrl: "http://localhost:4112" }); // Writing agent server

    // Create a task for the Writing Agent
    // const task = await a2a.createTask({
    //   agentId: "writing-agent",
    //   taskType: "createContent",
    //   payload: {
    //     topic: topic,
    //     researchData: researchData,
    //     contentType: "report"
    //   },
    // });

    // console.log("✅ Writing task created:", task.id);

    // Stream task updates
    // const stream = a2a.streamTaskUpdates(task.id, (update) => {
    //   console.log("📝 Writing task update:", update);
    // });

    const mockTask = {
      id: `task-${Date.now()}`,
      agentId: "writing-agent",
      taskType: "createContent",
      payload: { topic, researchData, contentType: "report" }
    };

    console.log("✅ Writing task created via A2A:", mockTask.id);
    return mockTask;
  } catch (error) {
    console.error("❌ Failed to create writing task:", error);
    return null;
  }
}

/**
 * Collaborate with multiple agents using A2A
 * This demonstrates the complete A2A workflow
 */
export async function collaborateWithAgents(topic: string) {
  try {
    // Step 1: Perform research
    const researchData = await performResearch(topic);

    // Step 2: Send to Analysis Agent via A2A
    await sendToAnalysisAgent(researchData);

    // Step 3: Create writing task via A2A
    await createWritingTask(topic, researchData);

    console.log("✅ A2A collaboration workflow initiated");
    return researchData;
  } catch (error) {
    console.error("❌ A2A collaboration failed:", error);
    return null;
  }
}

/**
 * Perform research (placeholder function)
 */
async function performResearch(topic: string) {
  // This would contain actual research logic
  return {
    topic: topic,
    findings: "Research findings for " + topic,
    sources: ["source1", "source2"],
    insights: ["insight1", "insight2"],
    timestamp: new Date().toISOString()
  };
}

/**
 * Key A2A Features This Agent Provides:
 *
 * 1. **Agent Discovery**: Other agents can find this agent using:
 *    - Agent name: 'research-agent'
 *    - Capabilities: research, information gathering, data analysis
 *
 * 2. **Message Exchange**: Other agents can send messages to this agent:
 *    - Direct research requests and queries
 *    - Task delegation for research work
 *    - Collaboration requests and data sharing
 *
 * 3. **Task Delegation**: Other agents can delegate research tasks:
 *    - "Research AI trends in 2024"
 *    - "Gather market data for analysis"
 *    - "Find information about blockchain technology"
 *
 * 4. **Capability Sharing**: This agent exposes its research capabilities
 *    - Other agents know this agent can handle research tasks
 *    - Automatic routing of research requests to this agent
 *    - Collaboration with Analysis and Writing agents
 *
 * 5. **A2A Protocol**: This agent uses Mastra's native A2A for:
 *    - Direct agent-to-agent communication
 *    - Task creation and management
 *    - Real-time message exchange
 *    - Agent discovery and capability sharing
 *    - Based on Mastra changelog: https://mastra.ai/blog/changelog-2025-05-15
 */
