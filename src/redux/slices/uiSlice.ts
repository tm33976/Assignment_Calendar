
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format, addDays, startOfWeek } from 'date-fns';

interface DateRange {
  start: Date;
  end: Date;
}

interface EventModalState {
  isOpen: boolean;
  mode: 'create' | 'edit';
  eventId?: string;
  initialData?: {
    title?: string;
    category?: string;
    start?: string;
    end?: string;
    taskId?: string;
    goalId?: string;
  };
}

interface UiState {
  currentView: 'day' | 'week' | 'month' | 'year';
  currentDate: string;
  dateRange: DateRange;
  eventModal: EventModalState;
}

const today = new Date();
const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday
const endOfCurrentWeek = addDays(startOfCurrentWeek, 6); // Sunday

const initialState: UiState = {
  currentView: 'week',
  currentDate: format(today, 'yyyy-MM-dd'),
  dateRange: {
    start: startOfCurrentWeek,
    end: endOfCurrentWeek,
  },
  eventModal: {
    isOpen: false,
    mode: 'create',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<'day' | 'week' | 'month' | 'year'>) => {
      state.currentView = action.payload;
    },
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
    setDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload;
    },
    openEventModal: (state, action: PayloadAction<Omit<EventModalState, 'isOpen'> & { isOpen?: boolean }>) => {
      state.eventModal = {
        ...action.payload,
        isOpen: true,
      };
    },
    closeEventModal: (state) => {
      state.eventModal = {
        isOpen: false,
        mode: 'create',
      };
    },
  },
});

export const {
  setCurrentView,
  setCurrentDate,
  setDateRange,
  openEventModal,
  closeEventModal,
} = uiSlice.actions;

export default uiSlice.reducer;
