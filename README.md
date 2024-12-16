# Eval Tool

Eval Tool is a web application designed to help users evaluate various Large Language Models (LLMs) such as OpenAI, Anthropic, and Groq. The application allows users to create, edit, and run tests to assess the performance of different LLMs, providing detailed results and automated reviews.

## Overview

The Eval Tool web application is built with a Node.js and Express backend, utilizing MongoDB for storing tests, user information, and test results. The application interacts with various LLM providers via their respective SDKs: OpenAI, Anthropic, and Groq. The front end is rendered using EJS templates and styled with Bootstrap for responsiveness and aesthetics. The application follows a Model-View-Controller (MVC) architecture to separate concerns, making the codebase more manageable and scalable.

### Architecture and Technologies
- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose)
- **Frontend**: EJS templates, Bootstrap
- **Authentication**: Session-based authentication (currently being removed)
- **Configuration**: Environment variables (.env file)
- **LLM SDKs**: OpenAI, Anthropic, Groq

### Project Structure
- **models/**: Contains Mongoose models for MongoDB
  - `testModel.js`
  - `User.js` (being removed)
- **public/**: Static files (CSS, JS)
  - `css/style.css`
  - `js/editTest.js`
  - `js/main.js`
  - `js/reviewScenarios.js`
  - `js/testRunConfig.js`
- **routes/**: Express routes
  - `testRoutes.js`
- **sample_test_conversations/**: Sample JSON files for test conversations
- **views/**: EJS templates
  - `index.ejs`
  - `partials/_head.ejs`
  - `partials/_header.ejs`
  - `partials/_footer.ejs`
  - `scenarioDetails.ejs`
  - `testDetails.ejs`
  - `testRunConfig.ejs`
- **.env**: Environment variables
- **server.js**: Main server file

## Features

- **Test Management**: Create, edit, and delete tests.
- **Scenario Configuration**: Define scenarios with different providers, models, and parameters.
- **Parallel Execution**: Run multiple LLM requests in parallel for efficient processing.
- **Automated Reviews**: Use GPT-4-turbo-preview for automated review of LLM responses.
- **Detailed Results**: View detailed results for each scenario, including LLM responses, review notes, and scores.
- **Import Messages**: Import test messages via JSON files.
- **Dynamic Forms**: Add and remove messages and scenarios dynamically in the forms.

## Getting started

### Requirements

Ensure you have the following technologies set up on your computer:
- Node.js (v14.x or later)
- MongoDB (local installation or cloud version like MongoDB Atlas)

### Quickstart

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd eval-tool
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file based on the `.env.example` template.
    - Set the required environment variables such as `PORT`, `DATABASE_URL`, `SESSION_SECRET`, and API keys for OpenAI, Anthropic, and Groq.

4. **Run the application**:
    ```bash
    npm start
    ```

5. **Access the application**:
    - Open your browser and navigate to `http://localhost:<PORT>` (default port is 3000).

### License

The project is proprietary (not open source).

```
Copyright (c) 2024.
```
