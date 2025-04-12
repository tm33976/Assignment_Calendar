
import { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useAppDispatch } from '@/redux/hooks';
import { fetchEvents } from '@/redux/slices/eventsSlice';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import EventModal from '@/components/calendar/EventModal';
import Sidebar from '@/components/sidebar/Sidebar';

const Calendar = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  
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
