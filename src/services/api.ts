
import { supabase } from '@/lib/supabase';
import { Event } from '@/redux/slices/eventsSlice';
import { Goal } from '@/redux/slices/goalsSlice';
import { Task } from '@/redux/slices/tasksSlice';

// Events API
export const fetchEventsApi = async (): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*');
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEventApi = async (event: Omit<Event, '_id'>): Promise<Event> => {
  try {
    // Remove _id if present as Supabase will generate it
    const { _id, ...eventData } = event as any;
    
    const { data, error } = await supabase
      .from('events')
      .insert(eventData)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEventApi = async (event: Event): Promise<Event> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .update(event)
      .eq('_id', event._id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEventApi = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('_id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Goals API
export const fetchGoalsApi = async (): Promise<Goal[]> => {
  try {
    const { data, error } = await supabase
      .from('goals')
      .select('*');
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};

export const createGoalApi = async (goal: Omit<Goal, '_id'>): Promise<Goal> => {
  try {
    const { _id, ...goalData } = goal as any;
    
    const { data, error } = await supabase
      .from('goals')
      .insert(goalData)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

export const updateGoalApi = async (goal: Goal): Promise<Goal> => {
  try {
    const { data, error } = await supabase
      .from('goals')
      .update(goal)
      .eq('_id', goal._id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};

export const deleteGoalApi = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('_id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }
};

// Tasks API
export const fetchTasksApi = async (): Promise<Task[]> => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*');
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const fetchTasksByGoalIdApi = async (goalId: string): Promise<Task[]> => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('goalId', goalId);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching tasks by goal ID:', error);
    throw error;
  }
};

export const createTaskApi = async (task: Omit<Task, '_id'>): Promise<Task> => {
  try {
    const { _id, ...taskData } = task as any;
    
    const { data, error } = await supabase
      .from('tasks')
      .insert(taskData)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTaskApi = async (task: Task): Promise<Task> => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update(task)
      .eq('_id', task._id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTaskApi = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('_id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
