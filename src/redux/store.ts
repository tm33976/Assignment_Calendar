
import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/eventsSlice';
import goalsReducer from './slices/goalsSlice';
import tasksReducer from './slices/tasksSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    goals: goalsReducer,
    tasks: tasksReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
