// Demo script to showcase the create_task lambda function
// This can be run independently to demonstrate the lambda functionality

import { invokeCreateTaskLambda, createTaskLambda } from './lambdaFunctions';
import { CreateTaskRequest, LambdaEvent, LambdaContext } from './types';

// Demo function to showcase lambda functionality
export const runLambdaDemo = async () => {
  console.log('🚀 Create Task Lambda Function Demo\n');
  console.log('=====================================\n');

  // Demo 1: Basic task creation using wrapper function
  console.log('📝 Demo 1: Creating a task using the wrapper function');
  console.log('---------------------------------------------------');
  
  const taskRequest: CreateTaskRequest = {
    title: 'Learn AWS Lambda patterns',
    description: 'Study serverless architecture and implement lambda functions'
  };

  console.log('Request:', JSON.stringify(taskRequest, null, 2));
  
  try {
    const result = await invokeCreateTaskLambda(taskRequest);
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (result.success && result.task) {
      console.log(`✅ Task created successfully with ID: ${result.task.id}\n`);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }

  // Demo 2: Direct lambda invocation
  console.log('🔧 Demo 2: Direct lambda function invocation');
  console.log('--------------------------------------------');

  const event: LambdaEvent<CreateTaskRequest> = {
    body: {
      title: 'Build Todo Application',
      description: 'Create a full-featured todo app with lambda functions'
    },
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Demo-Client/1.0'
    },
    requestId: 'demo-request-' + Date.now()
  };

  const context: LambdaContext = {
    requestId: event.requestId,
    timestamp: Date.now()
  };

  console.log('Event:', JSON.stringify(event, null, 2));
  console.log('Context:', JSON.stringify(context, null, 2));

  try {
    const result = await createTaskLambda(event, context);
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (result.success && result.task) {
      console.log(`✅ Task created successfully with ID: ${result.task.id}\n`);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }

  // Demo 3: Error handling demonstration
  console.log('⚠️  Demo 3: Error handling demonstration');
  console.log('--------------------------------------');

  const invalidRequest = {
    title: '', // Empty title should cause validation error
    description: 'This should fail validation'
  };

  console.log('Invalid Request:', JSON.stringify(invalidRequest, null, 2));

  try {
    const result = await invokeCreateTaskLambda(invalidRequest as CreateTaskRequest);
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (!result.success) {
      console.log(`✅ Validation error handled correctly: ${result.error}\n`);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }

  // Demo 4: Multiple task creation
  console.log('📋 Demo 4: Creating multiple tasks');
  console.log('----------------------------------');

  const tasks = [
    { title: 'Setup development environment', description: 'Install Node.js, npm, and VS Code' },
    { title: 'Design database schema', description: 'Plan the data structure for tasks' },
    { title: 'Implement authentication', description: 'Add user login and registration' },
    { title: 'Deploy to production' }
  ];

  const createdTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    console.log(`Creating task ${i + 1}: ${task.title}`);
    
    try {
      const result = await invokeCreateTaskLambda(task);
      if (result.success && result.task) {
        createdTasks.push(result.task);
        console.log(`✅ Created: ${result.task.id}`);
      } else {
        console.log(`❌ Failed: ${result.error}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error}`);
    }
  }

  console.log(`\n📊 Summary: Created ${createdTasks.length} out of ${tasks.length} tasks`);
  console.log('Task IDs:', createdTasks.map(t => t.id));

  console.log('\n🎉 Lambda function demo completed!');
  console.log('=====================================');
  
  return createdTasks;
};

// Export for use in other files
export default runLambdaDemo;