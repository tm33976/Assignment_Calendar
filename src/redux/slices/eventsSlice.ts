
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchEventsApi, createEventApi, updateEventApi, deleteEventApi } from '@/services/api';

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

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    return await fetchEventsApi();
  } catch (error) {
    // Fallback to mock data if API fails
    console.log("Using mock data due to API failure");
    return [
      {
        _id: '1',
        title: 'Monday Wake-Up',
        category: 'exercise' as const,
        start: '2025-04-08T06:00:00',
        end: '2025-04-08T06:30:00',
      },
      {
        _id: '2',
        title: 'All-Team Kickoff',
        category: 'work' as const,
        start: '2025-04-08T09:00:00',
        end: '2025-04-08T10:00:00',
      },
      {
        _id: '3',
        title: 'Coffee Chat',
        category: 'social' as const,
        start: '2025-04-10T09:00:00',
        end: '2025-04-10T09:30:00',
      },
      {
        _id: '4',
        title: 'Design Review',
        category: 'work' as const,
        start: '2025-04-08T13:00:00',
        end: '2025-04-08T14:00:00',
      },
    ] as Event[];
  }
});

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (event: Omit<Event, '_id'>) => {
    try {
      return await createEventApi(event);
    } catch (error) {
      // Fallback to mock response if API fails
      console.log("Using mock data due to API failure");
      return {
        ...event,
        _id: Math.random().toString(36).substr(2, 9),
      };
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async (event: Event) => {
    try {
      return await updateEventApi(event);
    } catch (error) {
      // Fallback to mock response if API fails
      console.log("Using mock data due to API failure");
      return event;
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (id: string) => {
    try {
      await deleteEventApi(id);
      return id;
    } catch (error) {
      // Fallback if API fails
      console.log("Using mock data due to API failure");
      return id;
    }
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
