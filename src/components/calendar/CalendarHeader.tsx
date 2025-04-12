
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCurrentDate, setCurrentView } from '@/redux/slices/uiSlice';
import { addDays, subDays } from 'date-fns';

interface CalendarHeaderProps {
  weekDays: Date[];
}

const CalendarHeader = ({ weekDays }: CalendarHeaderProps) => {
  const dispatch = useAppDispatch();
  const { currentView, currentDate } = useAppSelector((state) => state.ui);
  
  const handlePrevWeek = () => {
    const newDate = subDays(new Date(currentDate), 7);
    dispatch(setCurrentDate(format(newDate, 'yyyy-MM-dd')));
  };
  
  const handleNextWeek = () => {
    const newDate = addDays(new Date(currentDate), 7);
    dispatch(setCurrentDate(format(newDate, 'yyyy-MM-dd')));
  };
  
  const handleToday = () => {
    const today = new Date();
    dispatch(setCurrentDate(format(today, 'yyyy-MM-dd')));
  };
  
  const startMonth = format(weekDays[0], 'MMMM');
  const endMonth = format(weekDays[6], 'MMMM');
  
  const monthDisplay = startMonth === endMonth
    ? startMonth
    : `${startMonth} - ${endMonth}`;
  
  return (
    <div className="bg-white sticky top-0 z-10">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleToday}>
            Today
          </Button>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handlePrevWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xl font-semibold">
            {monthDisplay} {format(weekDays[0], 'yyyy')}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button 
            variant={currentView === 'day' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => dispatch(setCurrentView('day'))}
          >
            Day
          </Button>
          <Button 
            variant={currentView === 'week' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => dispatch(setCurrentView('week'))}
          >
            Week
          </Button>
          <Button 
            variant={currentView === 'month' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => dispatch(setCurrentView('month'))}
          >
            Month
          </Button>
          <Button 
            variant={currentView === 'year' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => dispatch(setCurrentView('year'))}
          >
            Year
          </Button>
        </div>
      </div>
      
      <div className="flex border-b">
        <div className="w-16 py-2 border-r bg-white z-10">
          GMT
        </div>
        {weekDays.map((day, index) => (
          <div 
            key={day.toISOString()} 
            className={`flex-1 py-2 text-center ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="text-sm font-medium">
              {format(day, 'EEE')}
            </div>
            <div className="text-2xl font-bold">
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;
