# Todo Application with Lambda Functions

This is a React-based Todo application that demonstrates the implementation of a `get_task` lambda function and other task management utilities. The application is built using React, TypeScript, and Vite.

## Features

### Lambda Functions
- **`getTask(taskId: string)`**: Retrieves a specific task by its ID
- **`getTasks(filter?: TaskFilter)`**: Retrieves all tasks with optional filtering
- **`createTask(title: string, description?: string)`**: Creates a new task
- **`updateTask(taskId: string, updates: Partial<Task>)`**: Updates an existing task
- **`deleteTask(taskId: string)`**: Deletes a task
- **`toggleTaskCompletion(taskId: string)`**: Toggles task completion status

### Todo Application Features
- Create new tasks with title and optional description
- View all tasks in a clean, organized interface
- Filter tasks by completion status (All, Pending, Completed)
- Search tasks by title or description
- Mark tasks as complete/incomplete
- Delete tasks
- Persistent storage using localStorage
- Real-time task ID lookup demonstration

### Task Management
- Each task has a unique ID, title, optional description, completion status, and timestamps
- Tasks are stored locally in the browser's localStorage
- Full CRUD (Create, Read, Update, Delete) operations
- Type-safe implementation using TypeScript interfaces

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

Your application will be running at `http://localhost:3000`.

## Usage

### Using the get_task Lambda Function

The main `get_task` lambda function can be used in several ways:

#### 1. Direct Function Call
```typescript
import { getTask } from './src/taskUtils';

// Get a specific task by ID
const task = getTask('your-task-id-here');
if (task) {
  console.log(`Found task: ${task.title}`);
} else {
  console.log('Task not found');
}
```

#### 2. In the Web Interface
1. Create a new task using the form
2. Copy the task ID from the task list
3. Use the "Get Task Demo" section to test the `getTask` function
4. Enter the task ID and click "Get Task" to see the lambda function in action

#### 3. Using the Demo Functions
```typescript
import { demoGetTaskFunction, generateSampleTasks } from './src/taskDemo';

// Run a complete demonstration
demoGetTaskFunction();

// Generate sample data for testing
generateSampleTasks();
```

### API Reference

#### Task Interface
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Available Lambda Functions
- `getTask(taskId: string): Task | null`
- `getTasks(filter?: TaskFilter): Task[]`
- `createTask(title: string, description?: string): Task`
- `updateTask(taskId: string, updates: Partial<Task>): Task | null`
- `deleteTask(taskId: string): boolean`
- `toggleTaskCompletion(taskId: string): Task | null`

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