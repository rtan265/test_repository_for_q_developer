// Lambda functions for the Todo application

import { Task, CreateTaskRequest, CreateTaskResponse, LambdaEvent, LambdaContext } from './types';

// Utility function to generate unique IDs
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Validation function for create task request
const validateCreateTaskRequest = (request: any): request is CreateTaskRequest => {
  return (
    typeof request === 'object' &&
    request !== null &&
    typeof request.title === 'string' &&
    request.title.trim().length > 0 &&
    (request.description === undefined || typeof request.description === 'string')
  );
};

/**
 * Lambda function to create a new task
 * Follows AWS Lambda handler pattern: (event, context) => response
 */
export const createTaskLambda = async (
  event: LambdaEvent<CreateTaskRequest>,
  context: LambdaContext
): Promise<CreateTaskResponse> => {
  try {
    console.log(`Processing create task request - RequestId: ${context.requestId}`);
    
    // Validate the request body
    if (!validateCreateTaskRequest(event.body)) {
      return {
        success: false,
        error: 'Invalid request: title is required and must be a non-empty string'
      };
    }

    const { title, description } = event.body;
    const now = new Date();

    // Create the new task
    const newTask: Task = {
      id: generateId(),
      title: title.trim(),
      description: description?.trim() || undefined,
      completed: false,
      createdAt: now,
      updatedAt: now
    };

    console.log(`Task created successfully - ID: ${newTask.id}, Title: ${newTask.title}`);

    return {
      success: true,
      task: newTask
    };

  } catch (error) {
    console.error('Error creating task:', error);
    
    return {
      success: false,
      error: 'Internal server error occurred while creating task'
    };
  }
};

/**
 * Wrapper function to simulate lambda invocation in the frontend
 * This allows us to call the lambda function with proper event/context structure
 */
export const invokeCreateTaskLambda = async (
  request: CreateTaskRequest
): Promise<CreateTaskResponse> => {
  const event: LambdaEvent<CreateTaskRequest> = {
    body: request,
    headers: {
      'Content-Type': 'application/json'
    },
    requestId: generateId()
  };

  const context: LambdaContext = {
    requestId: event.requestId,
    timestamp: Date.now()
  };

  return await createTaskLambda(event, context);
};