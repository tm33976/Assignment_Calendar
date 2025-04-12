
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Task {
  _id: string;
  name: string;
  goalId: string;
}

interface TasksState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
  error: null,
};

// Mock API URL
const API_URL = '/api/tasks';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  // Mock response for development
  return [
    { _id: '1', name: 'AI based agents', goalId: '3' },
    { _id: '2', name: 'MLE', goalId: '3' },
    { _id: '3', name: 'DE related', goalId: '3' },
    { _id: '4', name: 'Basics', goalId: '3' },
  ];
});

export const fetchTasksByGoalId = createAsyncThunk(
  'tasks/fetchTasksByGoalId',
  async (goalId: string) => {
    // Mock response for development based on goalId
    let mockTasks: Task[] = [];
    
    if (goalId === '1') { // Be fit
      mockTasks = [
        { _id: '5', name: 'Morning run', goalId: '1' },
        { _id: '6', name: 'Gym workout', goalId: '1' },
      ];
    } else if (goalId === '2') { // Academics
      mockTasks = [
        { _id: '7', name: 'Math homework', goalId: '2' },
        { _id: '8', name: 'Science project', goalId: '2' },
        { _id: '9', name: 'Literature essay', goalId: '2' },
      ];
    } else if (goalId === '3') { // LEARN
      mockTasks = [
        { _id: '1', name: 'AI based agents', goalId: '3' },
        { _id: '2', name: 'MLE', goalId: '3' },
        { _id: '3', name: 'DE related', goalId: '3' },
        { _id: '4', name: 'Basics', goalId: '3' },
      ];
    } else if (goalId === '4') { // Sports
      mockTasks = [
        { _id: '10', name: 'Basketball practice', goalId: '4' },
        { _id: '11', name: 'Swimming', goalId: '4' },
      ];
    }
    
    return mockTasks;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(fetchTasksByGoalId.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      });
  },
});

export default tasksSlice.reducer;
