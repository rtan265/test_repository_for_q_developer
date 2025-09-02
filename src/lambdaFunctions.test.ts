// Test file for the create_task lambda function
// This demonstrates how the lambda function works and can be used for testing

import { createTaskLambda, invokeCreateTaskLambda } from './lambdaFunctions';
import { CreateTaskRequest, LambdaEvent, LambdaContext } from './types';

// Mock console.log for testing
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

// Test helper function to create mock event and context
const createMockEventAndContext = (body: any) => {
  const requestId = 'test-request-' + Date.now();
  
  const event: LambdaEvent<any> = {
    body,
    headers: { 'Content-Type': 'application/json' },
    requestId
  };

  const context: LambdaContext = {
    requestId,
    timestamp: Date.now()
  };

  return { event, context };
};

// Test cases for the create_task lambda function
export const runLambdaTests = async () => {
  console.log('🧪 Running create_task Lambda Function Tests...\n');

  // Test 1: Valid task creation
  console.log('Test 1: Valid task creation');
  try {
    const validRequest: CreateTaskRequest = {
      title: 'Test Task',
      description: 'This is a test task'
    };

    const { event, context } = createMockEventAndContext(validRequest);
    const result = await createTaskLambda(event, context);

    console.log('✅ Result:', JSON.stringify(result, null, 2));
    console.log('✅ Test 1 passed: Valid task created successfully\n');
  } catch (error) {
    console.log('❌ Test 1 failed:', error);
  }

  // Test 2: Task creation without description
  console.log('Test 2: Task creation without description');
  try {
    const validRequest: CreateTaskRequest = {
      title: 'Task without description'
    };

    const { event, context } = createMockEventAndContext(validRequest);
    const result = await createTaskLambda(event, context);

    console.log('✅ Result:', JSON.stringify(result, null, 2));
    console.log('✅ Test 2 passed: Task created without description\n');
  } catch (error) {
    console.log('❌ Test 2 failed:', error);
  }

  // Test 3: Invalid request - empty title
  console.log('Test 3: Invalid request - empty title');
  try {
    const invalidRequest = {
      title: '',
      description: 'This should fail'
    };

    const { event, context } = createMockEventAndContext(invalidRequest);
    const result = await createTaskLambda(event, context);

    console.log('✅ Result:', JSON.stringify(result, null, 2));
    if (!result.success) {
      console.log('✅ Test 3 passed: Empty title correctly rejected\n');
    } else {
      console.log('❌ Test 3 failed: Empty title should be rejected\n');
    }
  } catch (error) {
    console.log('❌ Test 3 failed:', error);
  }

  // Test 4: Invalid request - missing title
  console.log('Test 4: Invalid request - missing title');
  try {
    const invalidRequest = {
      description: 'This should fail - no title'
    };

    const { event, context } = createMockEventAndContext(invalidRequest);
    const result = await createTaskLambda(event, context);

    console.log('✅ Result:', JSON.stringify(result, null, 2));
    if (!result.success) {
      console.log('✅ Test 4 passed: Missing title correctly rejected\n');
    } else {
      console.log('❌ Test 4 failed: Missing title should be rejected\n');
    }
  } catch (error) {
    console.log('❌ Test 4 failed:', error);
  }

  // Test 5: Invalid request - null body
  console.log('Test 5: Invalid request - null body');
  try {
    const { event, context } = createMockEventAndContext(null);
    const result = await createTaskLambda(event, context);

    console.log('✅ Result:', JSON.stringify(result, null, 2));
    if (!result.success) {
      console.log('✅ Test 5 passed: Null body correctly rejected\n');
    } else {
      console.log('❌ Test 5 failed: Null body should be rejected\n');
    }
  } catch (error) {
    console.log('❌ Test 5 failed:', error);
  }

  // Test 6: Using the wrapper function
  console.log('Test 6: Using the wrapper function (invokeCreateTaskLambda)');
  try {
    const request: CreateTaskRequest = {
      title: 'Task via wrapper',
      description: 'Created using the wrapper function'
    };

    const result = await invokeCreateTaskLambda(request);

    console.log('✅ Result:', JSON.stringify(result, null, 2));
    console.log('✅ Test 6 passed: Wrapper function works correctly\n');
  } catch (error) {
    console.log('❌ Test 6 failed:', error);
  }

  // Test 7: Multiple tasks with unique IDs
  console.log('Test 7: Multiple tasks should have unique IDs');
  try {
    const tasks = [];
    for (let i = 0; i < 3; i++) {
      const request: CreateTaskRequest = {
        title: `Task ${i + 1}`,
        description: `Description for task ${i + 1}`
      };

      const result = await invokeCreateTaskLambda(request);
      if (result.success && result.task) {
        tasks.push(result.task);
      }
    }

    const ids = tasks.map(task => task.id);
    const uniqueIds = new Set(ids);

    if (ids.length === uniqueIds.size) {
      console.log('✅ Test 7 passed: All tasks have unique IDs');
      console.log('✅ Task IDs:', ids);
    } else {
      console.log('❌ Test 7 failed: Duplicate IDs found');
    }
  } catch (error) {
    console.log('❌ Test 7 failed:', error);
  }

  console.log('\n🎉 Lambda function tests completed!');
};

// Export for use in development
export default runLambdaTests;