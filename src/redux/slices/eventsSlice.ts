
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Event {
  _id?: string;
  title: string;
  category: 'exercise' | 'eating' | 'work' | 'relax' | 'family' | 'social';
  start: string;
  end: string;
  taskId?: string;
  goalId?: string;
}

interface EventsState {
  events: Event[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  status: 'idle',
  error: null,
};

// For development purposes, we'll use a mock API URL
// In a production environment, this should come from environment variables
const API_URL = '/api/events';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  // In a real application, this would be an actual API call
  // For now, we'll return mock data
  // const response = await axios.get(API_URL);
  // return response.data;
  
  // Mock data for development
  return [
    {
      _id: '1',
      title: 'Monday Wake-Up',
      category: 'exercise',
      start: '2025-04-08T06:00:00',
      end: '2025-04-08T06:30:00',
    },
    {
      _id: '2',
      title: 'All-Team Kickoff',
      category: 'work',
      start: '2025-04-08T09:00:00',
      end: '2025-04-08T10:00:00',
    },
    {
      _id: '3',
      title: 'Coffee Chat',
      category: 'social',
      start: '2025-04-10T09:00:00',
      end: '2025-04-10T09:30:00',
    },
    {
      _id: '4',
      title: 'Design Review',
      category: 'work',
      start: '2025-04-08T13:00:00',
      end: '2025-04-08T14:00:00',
    },
  ];
});

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (event: Omit<Event, '_id'>) => {
    // In a real application, this would be an actual API call
    // const response = await axios.post(API_URL, event);
    // return response.data;
    
    // Mock response for development
    return {
      ...event,
      _id: Math.random().toString(36).substr(2, 9),
    };
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async (event: Event) => {
    // In a real application, this would be an actual API call
    // const response = await axios.put(`${API_URL}/${event._id}`, event);
    // return response.data;
    
    // Mock response for development
    return event;
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (id: string) => {
    // In a real application, this would be an actual API call
    // await axios.delete(`${API_URL}/${id}`);
    // return id;
    
    // Mock response for development
    return id;
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch events';
      })
      .addCase(createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        const index = state.events.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action: PayloadAction<string>) => {
        state.events = state.events.filter((e) => e._id !== action.payload);
      });
  },
});

export default eventsSlice.reducer;
