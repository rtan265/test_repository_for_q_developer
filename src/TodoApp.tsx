import React, { useState, useEffect } from 'react';
import { Task, TaskFilter } from './types';
import { 
  getTask, 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  toggleTaskCompletion 
} from './taskUtils';

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [filter, setFilter] = useState<TaskFilter>({});
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, [filter]);

  // Lambda function to load tasks with current filter
  const loadTasks = () => {
    const filteredTasks = getTasks(filter);
    setTasks(filteredTasks);
  };

  // Lambda function to handle task creation
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    createTask(newTaskTitle.trim(), newTaskDescription.trim() || undefined);
    setNewTaskTitle('');
    setNewTaskDescription('');
    loadTasks();
  };

  // Lambda function to handle task deletion
  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    loadTasks();
  };

  // Lambda function to handle task completion toggle
  const handleToggleCompletion = (taskId: string) => {
    toggleTaskCompletion(taskId);
    loadTasks();
  };

  // Lambda function to demonstrate getTask functionality
  const handleGetTask = () => {
    if (!selectedTaskId.trim()) {
      setSelectedTask(null);
      return;
    }

    // Using the getTask lambda function
    const task = getTask(selectedTaskId.trim());
    setSelectedTask(task);
  };

  // Lambda function to handle filter changes
  const handleFilterChange = (newFilter: TaskFilter) => {
    setFilter(newFilter);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Todo Application</h1>
      
      {/* Task Creation Form */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Create New Task</h2>
        <form onSubmit={handleCreateTask}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <textarea
              placeholder="Task description (optional)"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              style={{ width: '100%', padding: '8px', minHeight: '60px' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Create Task
          </button>
        </form>
      </div>

      {/* Get Task Demo */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
        <h2>Get Task Demo (Lambda Function)</h2>
        <p>Enter a task ID to demonstrate the <code>getTask</code> lambda function:</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Enter task ID"
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            style={{ flex: 1, padding: '8px' }}
          />
          <button 
            onClick={handleGetTask}
            style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Get Task
          </button>
        </div>
        {selectedTask ? (
          <div style={{ padding: '10px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h4>{selectedTask.title}</h4>
            <p><strong>ID:</strong> {selectedTask.id}</p>
            <p><strong>Description:</strong> {selectedTask.description || 'No description'}</p>
            <p><strong>Status:</strong> {selectedTask.completed ? 'Completed' : 'Pending'}</p>
            <p><strong>Created:</strong> {selectedTask.createdAt.toLocaleString()}</p>
            <p><strong>Updated:</strong> {selectedTask.updatedAt.toLocaleString()}</p>
          </div>
        ) : selectedTaskId && (
          <p style={{ color: '#dc3545' }}>Task not found with ID: {selectedTaskId}</p>
        )}
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Filters</h3>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <label>
            <input
              type="radio"
              name="completion"
              checked={filter.completed === undefined}
              onChange={() => handleFilterChange({ ...filter, completed: undefined })}
            />
            All Tasks
          </label>
          <label>
            <input
              type="radio"
              name="completion"
              checked={filter.completed === false}
              onChange={() => handleFilterChange({ ...filter, completed: false })}
            />
            Pending
          </label>
          <label>
            <input
              type="radio"
              name="completion"
              checked={filter.completed === true}
              onChange={() => handleFilterChange({ ...filter, completed: true })}
            />
            Completed
          </label>
          <input
            type="text"
            placeholder="Search tasks..."
            value={filter.search || ''}
            onChange={(e) => handleFilterChange({ ...filter, search: e.target.value })}
            style={{ padding: '5px', marginLeft: '15px' }}
          />
        </div>
      </div>

      {/* Task List */}
      <div>
        <h2>Tasks ({tasks.length})</h2>
        {tasks.length === 0 ? (
          <p>No tasks found. Create a new task above!</p>
        ) : (
          <div>
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  padding: '15px',
                  margin: '10px 0',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: task.completed ? '#f8f9fa' : 'white'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      margin: '0 0 5px 0', 
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? '#6c757d' : 'inherit'
                    }}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p style={{ margin: '5px 0', color: '#6c757d' }}>{task.description}</p>
                    )}
                    <small style={{ color: '#6c757d' }}>
                      ID: {task.id} | Created: {task.createdAt.toLocaleString()}
                    </small>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleToggleCompletion(task.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: task.completed ? '#ffc107' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {task.completed ? 'Mark Pending' : 'Mark Complete'}
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
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
    </div>
  );
};

export default TodoApp;