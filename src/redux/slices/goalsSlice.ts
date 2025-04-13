
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Goal {
  _id: string;
  name: string;
  color: string;
}

interface GoalsState {
  goals: Goal[];
  selectedGoalId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GoalsState = {
  goals: [],
  selectedGoalId: null,
  status: 'idle',
  error: null,
};

// Mock API URL
const API_URL = '/api/goals';

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  // Mock response for development
  return [
    { _id: '1', name: 'Be fit', color: 'bg-goal-fit' },
    { _id: '2', name: 'Academics', color: 'bg-goal-academics' },
    { _id: '3', name: 'LEARN', color: 'bg-goal-learn' },
    { _id: '4', name: 'Sports', color: 'bg-goal-sports' },
  ];
});

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    setSelectedGoal: (state, action: PayloadAction<string>) => {
      state.selectedGoalId = action.payload;
    },
    clearSelectedGoal: (state) => {
      state.selectedGoalId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoals.fulfilled, (state, action: PayloadAction<Goal[]>) => {
        state.status = 'succeeded';
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch goals';
      });
  },
});

export const { setSelectedGoal, clearSelectedGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
