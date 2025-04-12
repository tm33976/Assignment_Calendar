
import { format } from 'date-fns';

interface CalendarTimelineProps {
  timeSlots: Date[];
}

const CalendarTimeline = ({ timeSlots }: CalendarTimelineProps) => {
  return (
    <div className="w-16 sticky left-0 bg-white z-10">
      {timeSlots.map((slot, index) => (
        <div key={index} className="flex items-center h-[60px] border-b border-r border-gray-200">
          <div className="text-xs text-gray-500 pl-2">
            {format(slot, 'h a')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarTimeline;
