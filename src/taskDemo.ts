/**
 * Demonstration file showing how to use the get_task lambda function
 * and other task management utilities.
 * 
 * This file can be imported and used in other parts of the application
 * or run independently for testing purposes.
 */

import { getTask, getTasks, createTask, updateTask, deleteTask, toggleTaskCompletion } from './taskUtils';
import { Task, TaskFilter } from './types';

// Demo function to showcase the get_task lambda function
export const demoGetTaskFunction = (): void => {
  console.log('=== Todo App Lambda Function Demo ===\n');

  // Create some sample tasks
  console.log('1. Creating sample tasks...');
  const task1 = createTask('Learn TypeScript', 'Study TypeScript fundamentals and advanced features');
  const task2 = createTask('Build Todo App', 'Create a complete todo application with CRUD operations');
  const task3 = createTask('Write Documentation', 'Document the API and usage examples');

  console.log(`Created task 1: ${task1.id} - "${task1.title}"`);
  console.log(`Created task 2: ${task2.id} - "${task2.title}"`);
  console.log(`Created task 3: ${task3.id} - "${task3.title}"`);
  console.log('');

  // Demonstrate the getTask lambda function
  console.log('2. Demonstrating getTask lambda function...');
  
  // Get a specific task by ID
  const retrievedTask = getTask(task1.id);
  if (retrievedTask) {
    console.log(`✅ Successfully retrieved task: "${retrievedTask.title}"`);
    console.log(`   ID: ${retrievedTask.id}`);
    console.log(`   Description: ${retrievedTask.description}`);
    console.log(`   Completed: ${retrievedTask.completed}`);
    console.log(`   Created: ${retrievedTask.createdAt.toISOString()}`);
  } else {
    console.log('❌ Task not found');
  }
  console.log('');

  // Try to get a non-existent task
  console.log('3. Testing with non-existent task ID...');
  const nonExistentTask = getTask('non-existent-id');
  console.log(`Result: ${nonExistentTask ? 'Found' : 'Not found (as expected)'}`);
  console.log('');

  // Demonstrate getTasks with filters
  console.log('4. Demonstrating getTasks with filters...');
  
  // Get all tasks
  const allTasks = getTasks();
  console.log(`Total tasks: ${allTasks.length}`);
  
  // Mark one task as completed
  toggleTaskCompletion(task2.id);
  console.log(`Marked task "${task2.title}" as completed`);
  
  // Get only completed tasks
  const completedTasks = getTasks({ completed: true });
  console.log(`Completed tasks: ${completedTasks.length}`);
  
  // Get only pending tasks
  const pendingTasks = getTasks({ completed: false });
  console.log(`Pending tasks: ${pendingTasks.length}`);
  
  // Search tasks
  const searchResults = getTasks({ search: 'TypeScript' });
  console.log(`Tasks containing "TypeScript": ${searchResults.length}`);
  console.log('');

  // Demonstrate other lambda functions
  console.log('5. Demonstrating other task operations...');
  
  // Update a task
  const updatedTask = updateTask(task3.id, { 
    title: 'Write Comprehensive Documentation',
    description: 'Document the API, usage examples, and best practices'
  });
  
  if (updatedTask) {
    console.log(`✅ Updated task: "${updatedTask.title}"`);
  }
  
  // Delete a task
  const deleteResult = deleteTask(task1.id);
  console.log(`Delete operation: ${deleteResult ? 'Success' : 'Failed'}`);
  
  // Final count
  const finalTasks = getTasks();
  console.log(`Final task count: ${finalTasks.length}`);
  console.log('');

  console.log('=== Demo Complete ===');
};

// Lambda function to generate sample data for testing
export const generateSampleTasks = (): Task[] => {
  const sampleTasks = [
    { title: 'Review code', description: 'Review pull requests and provide feedback' },
    { title: 'Update dependencies', description: 'Update npm packages to latest versions' },
    { title: 'Write unit tests', description: 'Add test coverage for new features' },
    { title: 'Deploy to production', description: 'Deploy the latest version to production environment' },
    { title: 'Create user documentation', description: 'Write user-friendly documentation' }
  ];

  return sampleTasks.map(({ title, description }) => createTask(title, description));
};

// Lambda function to clear all tasks (useful for testing)
export const clearAllTasks = (): void => {
  const allTasks = getTasks();
  allTasks.forEach(task => deleteTask(task.id));
  console.log('All tasks cleared');
};

// Export the main getTask function for easy access
export { getTask } from './taskUtils';