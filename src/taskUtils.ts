import { Task, TaskFilter } from './types';

const STORAGE_KEY = 'todo-tasks';

// Helper function to get all tasks from localStorage
const getAllTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const tasks = JSON.parse(stored);
    // Convert date strings back to Date objects
    return tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt)
    }));
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

// Helper function to save tasks to localStorage
const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

// Lambda function to get a specific task by ID
export const getTask = (taskId: string): Task | null => {
  const tasks = getAllTasks();
  return tasks.find(task => task.id === taskId) || null;
};

// Lambda function to get all tasks with optional filtering
export const getTasks = (filter?: TaskFilter): Task[] => {
  let tasks = getAllTasks();
  
  if (!filter) return tasks;
  
  // Filter by completion status
  if (filter.completed !== undefined) {
    tasks = tasks.filter(task => task.completed === filter.completed);
  }
  
  // Filter by search term (searches title and description)
  if (filter.search) {
    const searchTerm = filter.search.toLowerCase();
    tasks = tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      (task.description && task.description.toLowerCase().includes(searchTerm))
    );
  }
  
  return tasks;
};

// Lambda function to create a new task
export const createTask = (title: string, description?: string): Task => {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    description,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const tasks = getAllTasks();
  tasks.push(newTask);
  saveTasks(tasks);
  
  return newTask;
};

// Lambda function to update a task
export const updateTask = (taskId: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null => {
  const tasks = getAllTasks();
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) return null;
  
  const updatedTask = {
    ...tasks[taskIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  tasks[taskIndex] = updatedTask;
  saveTasks(tasks);
  
  return updatedTask;
};

// Lambda function to delete a task
export const deleteTask = (taskId: string): boolean => {
  const tasks = getAllTasks();
  const filteredTasks = tasks.filter(task => task.id !== taskId);
  
  if (filteredTasks.length === tasks.length) return false;
  
  saveTasks(filteredTasks);
  return true;
};

// Lambda function to toggle task completion
export const toggleTaskCompletion = (taskId: string): Task | null => {
  const task = getTask(taskId);
  if (!task) return null;
  
  return updateTask(taskId, { completed: !task.completed });
};