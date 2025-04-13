
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/redux/slices/eventsSlice';
import { Goal } from '@/redux/slices/goalsSlice';
import { Task } from '@/redux/slices/tasksSlice';

// Events API
export const fetchEventsApi = async (): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_time', { ascending: true });
      
    if (error) throw error;
    
    // Map database fields to our app's expected format with proper category typing
    return (data || []).map(item => ({
      _id: item.id,
      title: item.title,
      // Cast the category string to the specific union type
      category: item.category as "exercise" | "eating" | "work" | "relax" | "family" | "social",
      start: item.start_time,
      end: item.end_time,
      goalId: item.goal_id,
      taskId: item.task_id,
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEventApi = async (event: Omit<Event, '_id'>): Promise<Event> => {
  try {
    const user = supabase.auth.getUser();
    
    // Prepare the data for Supabase
    const eventData = {
      title: event.title,
      category: event.category,
      start_time: event.start,
      end_time: event.end,
      goal_id: event.goalId,
      task_id: event.taskId,
      user_id: (await user).data.user?.id
    };
    
    const { data, error } = await supabase
      .from('events')
      .insert(eventData)
      .select()
      .single();
      
    if (error) throw error;
    
    // Map the response back to our app's format
    return {
      _id: data.id,
      title: data.title,
      // Cast the category to ensure it matches the expected type
      category: data.category as "exercise" | "eating" | "work" | "relax" | "family" | "social",
      start: data.start_time,
      end: data.end_time,
      goalId: data.goal_id,
      taskId: data.task_id,
    };
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEventApi = async (event: Event): Promise<Event> => {
  try {
    // Prepare the data for Supabase
    const eventData = {
      title: event.title,
      category: event.category,
      start_time: event.start,
      end_time: event.end,
      goal_id: event.goalId,
      task_id: event.taskId,
    };
    
    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', event._id)
      .select()
      .single();
      
    if (error) throw error;
    
    // Map the response back to our app's format
    return {
      _id: data.id,
      title: data.title,
      // Cast the category to ensure it matches the expected type
      category: data.category as "exercise" | "eating" | "work" | "relax" | "family" | "social",
      start: data.start_time,
      end: data.end_time,
      goalId: data.goal_id,
      taskId: data.task_id,
    };
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
      .eq('id', id);
      
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
      .select('*')
      .order('created_at', { ascending: true });
      
    if (error) throw error;
    
    // Map database fields to our app's expected format
    return (data || []).map(item => ({
      _id: item.id,
      name: item.name,
      color: item.color,
    }));
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};

export const createGoalApi = async (goal: Omit<Goal, '_id'>): Promise<Goal> => {
  try {
    const user = supabase.auth.getUser();
    
    // Prepare the data for Supabase
    const goalData = {
      name: goal.name,
      color: goal.color,
      user_id: (await user).data.user?.id
    };
    
    const { data, error } = await supabase
      .from('goals')
      .insert(goalData)
      .select()
      .single();
      
    if (error) throw error;
    
    // Map the response back to our app's format
    return {
      _id: data.id,
      name: data.name,
      color: data.color,
    };
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

export const updateGoalApi = async (goal: Goal): Promise<Goal> => {
  try {
    // Prepare the data for Supabase
    const goalData = {
      name: goal.name,
      color: goal.color,
    };
    
    const { data, error } = await supabase
      .from('goals')
      .update(goalData)
      .eq('id', goal._id)
      .select()
      .single();
      
    if (error) throw error;
    
    // Map the response back to our app's format
    return {
      _id: data.id,
      name: data.name,
      color: data.color,
    };
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
      .eq('id', id);
      
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
    
    // Map database fields to our app's expected format
    return (data || []).map(item => ({
      _id: item.id,
      name: item.name,
      goalId: item.goal_id,
    }));
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
      .eq('goal_id', goalId);
      
    if (error) throw error;
    
    // Map database fields to our app's expected format
    return (data || []).map(item => ({
      _id: item.id,
      name: item.name,
      goalId: item.goal_id,
    }));
  } catch (error) {
    console.error('Error fetching tasks by goal ID:', error);
    throw error;
  }
};

export const createTaskApi = async (task: Omit<Task, '_id'>): Promise<Task> => {
  try {
    const user = supabase.auth.getUser();
    
    // Prepare the data for Supabase
    const taskData = {
      name: task.name,
      goal_id: task.goalId,
      user_id: (await user).data.user?.id
    };
    
    const { data, error } = await supabase
      .from('tasks')
      .insert(taskData)
      .select()
      .single();
      
    if (error) throw error;
    
    // Map the response back to our app's format
    return {
      _id: data.id,
      name: data.name,
      goalId: data.goal_id,
    };
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTaskApi = async (task: Task): Promise<Task> => {
  try {
    // Prepare the data for Supabase
    const taskData = {
      name: task.name,
      goal_id: task.goalId,
    };
    
    const { data, error } = await supabase
      .from('tasks')
      .update(taskData)
      .eq('id', task._id)
      .select()
      .single();
      
    if (error) throw error;
    
    // Map the response back to our app's format
    return {
      _id: data.id,
      name: data.name,
      goalId: data.goal_id,
    };
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
      .eq('id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
