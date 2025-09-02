import React, { useState, useCallback } from 'react';
import { Task, CreateTaskRequest } from './types';
import { invokeCreateTaskLambda } from './lambdaFunctions';

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Clear messages after a delay
  const clearMessages = useCallback(() => {
    setTimeout(() => {
      setError(null);
      setSuccessMessage(null);
    }, 3000);
  }, []);

  // Handle task creation using the lambda function
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      clearMessages();
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const request: CreateTaskRequest = {
        title: title.trim(),
        description: description.trim() || undefined
      };

      // Invoke the create task lambda function
      const response = await invokeCreateTaskLambda(request);

      if (response.success && response.task) {
        // Add the new task to the list
        setTasks(prevTasks => [response.task!, ...prevTasks]);
        
        // Clear the form
        setTitle('');
        setDescription('');
        
        setSuccessMessage(`Task "${response.task.title}" created successfully!`);
        clearMessages();
      } else {
        setError(response.error || 'Failed to create task');
        clearMessages();
      }
    } catch (err) {
      setError('An unexpected error occurred');
      clearMessages();
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Todo Application</h1>
      <p>Create and manage your tasks using our lambda-powered backend!</p>

      {/* Create Task Form */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px' 
      }}>
        <h2>Create New Task</h2>
        <form onSubmit={handleCreateTask}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
              disabled={isLoading}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description..."
              rows={3}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                resize: 'vertical'
              }}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? '#ccc' : '#007bff',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Creating Task...' : 'Create Task (Lambda)'}
          </button>
        </form>

        {/* Messages */}
        {error && (
          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}

        {successMessage && (
          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#d4edda',
            color: '#155724',
            border: '1px solid #c3e6cb',
            borderRadius: '4px'
          }}>
            {successMessage}
          </div>
        )}
      </div>

      {/* Task List */}
      <div>
        <h2>Tasks ({tasks.length})</h2>
        {tasks.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            No tasks yet. Create your first task using the form above!
          </p>
        ) : (
          <div>
            {tasks.map(task => (
              <div
                key={task.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '10px',
                  backgroundColor: task.completed ? '#f8f9fa' : 'white'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      margin: '0 0 5px 0',
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? '#666' : '#333'
                    }}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p style={{
                        margin: '0 0 10px 0',
                        color: task.completed ? '#666' : '#555'
                      }}>
                        {task.description}
                      </p>
                    )}
                    <small style={{ color: '#888' }}>
                      Created: {task.createdAt.toLocaleString()}
                      {task.updatedAt.getTime() !== task.createdAt.getTime() && (
                        <> | Updated: {task.updatedAt.toLocaleString()}</>
                      )}
                    </small>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginLeft: '15px' }}>
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      style={{
                        backgroundColor: task.completed ? '#28a745' : '#ffc107',
                        color: task.completed ? 'white' : '#212529',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      {task.completed ? 'Completed' : 'Mark Complete'}
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lambda Function Info */}
      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#e9ecef',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h3>Lambda Function Implementation</h3>
        <p>
          This Todo application uses a <strong>create_task lambda function</strong> that follows AWS Lambda patterns:
        </p>
        <ul>
          <li>Accepts event and context parameters</li>
          <li>Validates input data</li>
          <li>Generates unique task IDs</li>
          <li>Returns structured responses with success/error handling</li>
          <li>Includes proper logging and error handling</li>
        </ul>
        <p>
          The lambda function is invoked each time you create a new task, demonstrating serverless-style architecture
          within the frontend application.
        </p>
      </div>
    </div>
  );
};

export default TodoApp;