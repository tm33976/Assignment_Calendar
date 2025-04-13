
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchGoalsApi, createGoalApi, updateGoalApi, deleteGoalApi } from '@/services/api';

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

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  try {
    return await fetchGoalsApi();
  } catch (error) {
    // Mock response for development if API fails
    return [
      { _id: '1', name: 'Be fit', color: 'bg-goal-fit' },
      { _id: '2', name: 'Academics', color: 'bg-goal-academics' },
      { _id: '3', name: 'LEARN', color: 'bg-goal-learn' },
      { _id: '4', name: 'Sports', color: 'bg-goal-sports' },
    ];
  }
});

export const createGoal = createAsyncThunk(
  'goals/createGoal',
  async (goal: Omit<Goal, '_id'>) => {
    return await createGoalApi(goal);
  }
);

export const updateGoal = createAsyncThunk(
  'goals/updateGoal',
  async (goal: Goal) => {
    return await updateGoalApi(goal);
  }
);

export const deleteGoal = createAsyncThunk(
  'goals/deleteGoal',
  async (id: string) => {
    await deleteGoalApi(id);
    return id;
  }
);

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
      })
      .addCase(createGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        state.goals.push(action.payload);
      })
      .addCase(updateGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        const index = state.goals.findIndex(goal => goal._id === action.payload._id);
        if (index !== -1) {
          state.goals[index] = action.payload;
        }
      })
      .addCase(deleteGoal.fulfilled, (state, action: PayloadAction<string>) => {
        state.goals = state.goals.filter(goal => goal._id !== action.payload);
        if (state.selectedGoalId === action.payload) {
          state.selectedGoalId = null;
        }
      });
  },
});

export const { setSelectedGoal, clearSelectedGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
