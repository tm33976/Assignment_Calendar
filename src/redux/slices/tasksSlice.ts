
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasksApi, fetchTasksByGoalIdApi, createTaskApi, updateTaskApi, deleteTaskApi } from '@/services/api';

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

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  try {
    return await fetchTasksApi();
  } catch (error) {
    // Mock response for development
    return [
      { _id: '1', name: 'AI based agents', goalId: '3' },
      { _id: '2', name: 'MLE', goalId: '3' },
      { _id: '3', name: 'DE related', goalId: '3' },
      { _id: '4', name: 'Basics', goalId: '3' },
    ];
  }
});

export const fetchTasksByGoalId = createAsyncThunk(
  'tasks/fetchTasksByGoalId',
  async (goalId: string) => {
    try {
      return await fetchTasksByGoalIdApi(goalId);
    } catch (error) {
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
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: Omit<Task, '_id'>) => {
    return await createTaskApi(task);
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: Task) => {
    return await updateTaskApi(task);
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string) => {
    await deleteTaskApi(id);
    return id;
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
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
