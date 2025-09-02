# Todo Application with Lambda Functions

This is a React/TypeScript Todo application that demonstrates serverless architecture patterns using a **create_task lambda function**. The application is built with Vite and showcases how to implement AWS Lambda-style functions within a frontend application.

## Features

- ✅ **Create Task Lambda Function**: Serverless-style task creation with proper validation
- ✅ **TypeScript Support**: Full type safety with comprehensive interfaces
- ✅ **Error Handling**: Robust error handling and user feedback
- ✅ **Task Management**: Create, complete, and delete tasks
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Lambda Testing**: Comprehensive test suite for lambda functions

## Lambda Function Implementation

The application features a `create_task` lambda function that:

- Follows AWS Lambda handler patterns (`event`, `context` parameters)
- Validates input data and handles errors gracefully
- Generates unique task IDs and timestamps
- Returns structured responses with success/error information
- Includes comprehensive logging and request tracking

For detailed documentation about the lambda function, see [LAMBDA_FUNCTION_README.md](./LAMBDA_FUNCTION_README.md).

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed:

- Node.js (version 12 or later)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/q-developer-demonstration.git
   ```

2. Navigate into the project directory:
   ```bash
   cd q-developer-demonstration
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:
```bash
npm run dev
```

Your Todo application will be running at `http://localhost:3000`.

## Usage

1. **Create Tasks**: Use the form to create new tasks with title and optional description
2. **Manage Tasks**: Mark tasks as complete or delete them
3. **Lambda Function**: Each task creation uses the lambda function with proper validation
4. **View Details**: See creation and update timestamps for each task

## Testing the Lambda Function

The application includes a comprehensive test suite for the lambda function. You can run tests by importing and executing the test function in the browser console:

```javascript
import runLambdaTests from './src/lambdaFunctions.test';
runLambdaTests();
```

## Project Structure

```
src/
├── types.ts                    # TypeScript interfaces and types
├── lambdaFunctions.ts         # Create task lambda function implementation
├── lambdaFunctions.test.ts    # Lambda function test suite
├── TodoApp.tsx               # Main Todo application component
├── App.tsx                   # Root application component
├── main.tsx                  # Application entry point
└── index.css                 # Global styles
```

### Building for Production

To create a production build of the application, run:
```bash
npm run build
```

The build artifacts will be stored in the `dist` directory.

### Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

### License

This project is licensed under the MIT License. See the LICENSE file for details.