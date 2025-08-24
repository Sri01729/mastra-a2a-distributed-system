# Contributing to Mastra A2A Distributed System

Thank you for your interest in contributing to our distributed A2A system! This document provides guidelines and information for contributors.

## 🎯 Project Goals

This project aims to demonstrate and advance:
- **Distributed A2A Communication**: Real agent-to-agent communication across servers
- **Mastra Integration**: Showcase Mastra's native A2A capabilities
- **Protocol Compliance**: Follow Google's A2A v0.3.0 specification
- **Educational Value**: Help developers understand A2A concepts

## 🚀 Getting Started

### Prerequisites

- Node.js v20.0 or higher
- Git
- Basic understanding of TypeScript and Node.js
- Familiarity with Mastra framework (helpful but not required)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/mastra-a2a-distributed-system.git
   cd mastra-a2a-distributed-system
   ```

2. **Install Dependencies**
   ```bash
   # Install dependencies for all agents
   cd research-agent && npm install && cd ..
   cd writing-agent && npm install && cd ..
   cd analysis-agent && npm install && cd ..
   cd gateway-agent && npm install && cd ..
   cd a2a-frontend && npm install && cd ..
   ```

3. **Environment Setup**
   ```bash
   # Create .env files in each agent directory
   echo "OPENAI_API_KEY=your_api_key_here" > research-agent/.env
   echo "PORT=4111" >> research-agent/.env

   echo "OPENAI_API_KEY=your_api_key_here" > writing-agent/.env
   echo "PORT=4112" >> writing-agent/.env

   echo "OPENAI_API_KEY=your_api_key_here" > analysis-agent/.env
   echo "PORT=4113" >> analysis-agent/.env
   ```

## 🛠️ Development Guidelines

### Code Style

- **TypeScript**: Use strict TypeScript with proper type annotations
- **Formatting**: Use Prettier for code formatting
- **Linting**: Follow ESLint rules
- **Comments**: Add JSDoc comments for public APIs
- **Error Handling**: Implement proper error handling and logging

### Architecture Principles

1. **Distributed Design**: Keep agents truly independent
2. **Protocol Compliance**: Follow A2A v0.3.0 specification
3. **Real A2A Usage**: Use Mastra's native A2A client, not simulations
4. **Separation of Concerns**: Each agent should have a clear, single responsibility

### Testing

- **Unit Tests**: Test individual agent functions
- **Integration Tests**: Test A2A communication between agents
- **End-to-End Tests**: Test complete workflows
- **API Tests**: Test Gateway Agent endpoints

## 📝 Contribution Areas

### High Priority

- [ ] **Task Persistence**: Store and retrieve task history
- [ ] **Error Recovery**: Handle agent failures gracefully
- [ ] **Load Balancing**: Distribute tasks across multiple agent instances
- [ ] **Authentication**: Add security to A2A communication

### Medium Priority

- [ ] **Advanced Workflows**: Complex multi-step workflows
- [ ] **Agent Discovery**: Dynamic agent registration and discovery
- [ ] **Performance Monitoring**: Metrics and observability
- [ ] **Documentation**: API documentation and examples

### Low Priority

- [ ] **UI Enhancements**: Better frontend experience
- [ ] **Multi-language Support**: Agents in different languages
- [ ] **Plugin System**: Extensible agent capabilities
- [ ] **Deployment Guides**: Docker, Kubernetes, cloud deployment

## 🔧 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Follow the coding guidelines
- Add tests for new functionality
- Update documentation if needed

### 3. Test Your Changes

   ```bash
   # Test all agents
   cd research-agent && npm test && cd ..
   cd writing-agent && npm test && cd ..
   cd analysis-agent && npm test && cd ..
   cd gateway-agent && npm test && cd ..

# Test the complete system
npm run test:integration
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No console.log statements in production code
- [ ] Environment variables are properly handled

### Pull Request Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or breaking changes documented)
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment**: OS, Node.js version, package versions
2. **Steps to Reproduce**: Clear, step-by-step instructions
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Error Messages**: Full error logs
6. **Screenshots**: If applicable

## 💡 Feature Requests

When requesting features, please include:

1. **Use Case**: Why this feature is needed
2. **Proposed Solution**: How you think it should work
3. **Alternatives**: Other approaches you've considered
4. **Impact**: How this affects the project

## 🤝 Community Guidelines

- **Be Respectful**: Treat all contributors with respect
- **Be Helpful**: Help others learn and grow
- **Be Patient**: Everyone is at different skill levels
- **Be Constructive**: Provide helpful feedback

## 📞 Getting Help

- **Issues**: [GitHub Issues](https://github.com/Sri01729/mastra-a2a-distributed-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Sri01729/mastra-a2a-distributed-system/discussions)
- **Documentation**: [docs.md](docs.md)

## 🎉 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- Contributor hall of fame

Thank you for contributing to the future of distributed A2A systems! 🚀
