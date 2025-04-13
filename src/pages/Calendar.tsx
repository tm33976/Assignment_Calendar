
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { fetchEvents } from '@/redux/slices/eventsSlice';
import { fetchGoalsApi } from '@/services/api';
import { fetchTasksApi } from '@/services/api';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import EventModal from '@/components/calendar/EventModal';
import Sidebar from '@/components/sidebar/Sidebar';
import UserMenu from '@/components/UserMenu';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';

const Calendar = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();
  
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
      if (!user) return;
      
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
  }, [dispatch, user]);
  
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
    <SidebarProvider>
      <div className="h-screen flex flex-col">
        <div className="bg-primary p-2 flex justify-between items-center text-primary-foreground">
          <h1 className="text-xl font-bold">Calendar App</h1>
          <UserMenu />
        </div>
        
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
    </SidebarProvider>
  );
};

export default Calendar;
