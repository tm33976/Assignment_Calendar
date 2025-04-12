
import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useAppDispatch } from '@/redux/hooks';
import { fetchEvents } from '@/redux/slices/eventsSlice';
import { fetchGoalsApi } from '@/services/api';
import { fetchTasksApi } from '@/services/api';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import EventModal from '@/components/calendar/EventModal';
import Sidebar from '@/components/sidebar/Sidebar';
import { toast } from 'sonner';

const Calendar = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Fetch events, goals, and tasks in parallel
        await Promise.all([
          dispatch(fetchEvents()).unwrap(),
          fetchGoalsApi(),
          fetchTasksApi()
        ]);
        toast.success('Calendar data loaded successfully');
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load some calendar data. Using fallback data.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllData();
  }, [dispatch]);
  
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading your calendar...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <CalendarGrid />
        </div>
      </div>
      <EventModal />
    </div>
  );
};

export default Calendar;
