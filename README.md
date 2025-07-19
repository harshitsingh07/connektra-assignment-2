# Connektra Intelligence Pipeline

## Overview
Connektra Intelligence Pipeline is a project designed to streamline workflows by integrating various connectors, including Google Forms, MongoDB, and Discord (Slack). This repository provides a framework for managing and executing workflows efficiently.

## Features
- **Workflow Management**: Define and execute workflows using various connectors.
- **MongoDB Integration**: Store and retrieve workflow results in MongoDB.
- **Discord (Slack) Notifications**: Send messages to Discord (Slack) channels based on workflow events.

## Getting Started

### Prerequisites
- Node.js (version 18.16.12 or higher)
- MongoDB account (for MongoDB Atlas)
- Discord account and a bot created in the Discord Developer Portal / Slack channel

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/connektra-intelligence-pipeline.git
   cd connektra-intelligence-pipeline
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   MONGO_DB_URL=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
   ```

### Usage
1. **Running the Application**:
   To start the application, run:
   ```bash
   npm start
   ```

2. **Defining Workflows**:
   Workflows can be defined in the `src/schemas/workflow.ts` file. Use the `WorkflowPayloadSchema` to create your workflow steps.

3. **Sending Messages to Discord**:
   Use the `runDiscord` function to send messages to a specified Discord/Slack channel.
