
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { fetchEvents } from '@/redux/slices/eventsSlice';
import { fetchGoals } from '@/redux/slices/goalsSlice';
import { fetchTasks } from '@/redux/slices/tasksSlice';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import EventModal from '@/components/calendar/EventModal';
import Sidebar from '@/components/sidebar/Sidebar';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const Calendar = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  
  // Check Supabase connection
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data } = await supabase.from('_test_connection').select('*').limit(1);
        setIsConnected(true);
        toast.success('Connected to database successfully');
      } catch (error) {
        console.error('Supabase connection error:', error);
        toast.error('Failed to connect to database. Using fallback data.');
      }
    };
    
    checkConnection();
  }, []);
  
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Fetch events, goals, and tasks in parallel
        await Promise.all([
          dispatch(fetchEvents()).unwrap(),
          dispatch(fetchGoals()).unwrap(),
          dispatch(fetchTasks()).unwrap()
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
      {!isConnected && (
        <div className="bg-yellow-100 p-2 text-yellow-800 text-center text-sm">
          Using demo data. Connect to Supabase for persistent storage.
        </div>
      )}
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
