
import axios from 'axios';
import { Event } from '@/redux/slices/eventsSlice';
import { Goal } from '@/redux/slices/goalsSlice';
import { Task } from '@/redux/slices/tasksSlice';

// In a real application, this would be an environment variable
// We'll use a mockable API endpoint for now
const API_URL = 'https://api.example.com/api/v1';

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Events API
export const fetchEventsApi = async (): Promise<Event[]> => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEventApi = async (event: Omit<Event, '_id'>): Promise<Event> => {
  try {
    const response = await axios.post(`${API_URL}/events`, event);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEventApi = async (event: Event): Promise<Event> => {
  try {
    const response = await axios.put(`${API_URL}/events/${event._id}`, event);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEventApi = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/events/${id}`);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Goals API
export const fetchGoalsApi = async (): Promise<Goal[]> => {
  try {
    const response = await axios.get(`${API_URL}/goals`);
    return response.data;
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};

export const createGoalApi = async (goal: Omit<Goal, '_id'>): Promise<Goal> => {
  try {
    const response = await axios.post(`${API_URL}/goals`, goal);
    return response.data;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

export const updateGoalApi = async (goal: Goal): Promise<Goal> => {
  try {
    const response = await axios.put(`${API_URL}/goals/${goal._id}`, goal);
    return response.data;
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};

export const deleteGoalApi = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/goals/${id}`);
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }
};

// Tasks API
export const fetchTasksApi = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const fetchTasksByGoalIdApi = async (goalId: string): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_URL}/tasks?goalId=${goalId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks by goal ID:', error);
    throw error;
  }
};

export const createTaskApi = async (task: Omit<Task, '_id'>): Promise<Task> => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTaskApi = async (task: Task): Promise<Task> => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${task._id}`, task);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTaskApi = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
