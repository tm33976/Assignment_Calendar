
import { supabase } from '@/lib/supabase';
import { Event } from '@/redux/slices/eventsSlice';
import { Goal } from '@/redux/slices/goalsSlice';
import { Task } from '@/redux/slices/tasksSlice';

// Helper functions for data conversion
const mapEventFromDb = (dbEvent: any): Event => ({
  _id: dbEvent.id,
  title: dbEvent.title,
  category: dbEvent.category,
  start: dbEvent.start_time,
  end: dbEvent.end_time,
  goalId: dbEvent.goal_id,
  taskId: dbEvent.task_id
});

const mapEventToDb = (event: Omit<Event, '_id'> | Event) => {
  const dbEvent: any = {
    title: event.title,
    category: event.category,
    start_time: event.start,
    end_time: event.end
  };
  
  if ('goalId' in event && event.goalId) dbEvent.goal_id = event.goalId;
  if ('taskId' in event && event.taskId) dbEvent.task_id = event.taskId;
  
  // If _id exists (for updates), map it to id
  if ('_id' in event && event._id) dbEvent.id = event._id;
  
  return dbEvent;
};

const mapGoalFromDb = (dbGoal: any): Goal => ({
  _id: dbGoal.id,
  name: dbGoal.name,
  color: dbGoal.color
});

const mapGoalToDb = (goal: Omit<Goal, '_id'> | Goal) => {
  const dbGoal: any = {
    name: goal.name,
    color: goal.color
  };
  
  // If _id exists (for updates), map it to id
  if ('_id' in goal && goal._id) dbGoal.id = goal._id;
  
  return dbGoal;
};

const mapTaskFromDb = (dbTask: any): Task => ({
  _id: dbTask.id,
  name: dbTask.name,
  goalId: dbTask.goal_id
});

const mapTaskToDb = (task: Omit<Task, '_id'> | Task) => {
  const dbTask: any = {
    name: task.name,
    goal_id: task.goalId
  };
  
  // If _id exists (for updates), map it to id
  if ('_id' in task && task._id) dbTask.id = task._id;
  
  return dbTask;
};

// Events API
export const fetchEventsApi = async (): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*');
      
    if (error) throw error;
    return (data || []).map(mapEventFromDb);
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEventApi = async (event: Omit<Event, '_id'>): Promise<Event> => {
  try {
    const eventData = mapEventToDb(event);
    
    const { data, error } = await supabase
      .from('events')
      .insert(eventData)
      .select()
      .single();
      
    if (error) throw error;
    return mapEventFromDb(data);
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEventApi = async (event: Event): Promise<Event> => {
  try {
    const eventData = mapEventToDb(event);
    
    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', event._id)
      .select()
      .single();
      
    if (error) throw error;
    return mapEventFromDb(data);
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
      .select('*');
      
    if (error) throw error;
    return (data || []).map(mapGoalFromDb);
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};

export const createGoalApi = async (goal: Omit<Goal, '_id'>): Promise<Goal> => {
  try {
    const goalData = mapGoalToDb(goal);
    
    const { data, error } = await supabase
      .from('goals')
      .insert(goalData)
      .select()
      .single();
      
    if (error) throw error;
    return mapGoalFromDb(data);
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

export const updateGoalApi = async (goal: Goal): Promise<Goal> => {
  try {
    const goalData = mapGoalToDb(goal);
    
    const { data, error } = await supabase
      .from('goals')
      .update(goalData)
      .eq('id', goal._id)
      .select()
      .single();
      
    if (error) throw error;
    return mapGoalFromDb(data);
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
    return (data || []).map(mapTaskFromDb);
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
    return (data || []).map(mapTaskFromDb);
  } catch (error) {
    console.error('Error fetching tasks by goal ID:', error);
    throw error;
  }
};

export const createTaskApi = async (task: Omit<Task, '_id'>): Promise<Task> => {
  try {
    const taskData = mapTaskToDb(task);
    
    const { data, error } = await supabase
      .from('tasks')
      .insert(taskData)
      .select()
      .single();
      
    if (error) throw error;
    return mapTaskFromDb(data);
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTaskApi = async (task: Task): Promise<Task> => {
  try {
    const taskData = mapTaskToDb(task);
    
    const { data, error } = await supabase
      .from('tasks')
      .update(taskData)
      .eq('id', task._id)
      .select()
      .single();
      
    if (error) throw error;
    return mapTaskFromDb(data);
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
