// Types for the Todo application

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface CreateTaskResponse {
  success: boolean;
  task?: Task;
  error?: string;
}

export interface LambdaEvent<T = any> {
  body: T;
  headers?: Record<string, string>;
  requestId: string;
}

export interface LambdaContext {
  requestId: string;
  timestamp: number;
}