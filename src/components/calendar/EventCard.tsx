
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { format, parseISO } from 'date-fns';
import { useAppDispatch } from '@/redux/hooks';
import { openEventModal } from '@/redux/slices/uiSlice';
import { Event } from '@/redux/slices/eventsSlice';
import { getCategoryColor, getTextColorForCategory } from '@/utils/colorUtils';

interface EventCardProps {
  event: Event;
  columnId: string;
  index: number;
  isCompact?: boolean;
}

const EventCard = ({ event, columnId, index, isCompact = false }: EventCardProps) => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  
  const startTime = format(parseISO(event.start), 'h:mm a');
  const endTime = format(parseISO(event.end), 'h:mm a');
  
  const handleClick = () => {
    if (isCompact) {
      dispatch(openEventModal({
        mode: 'edit',
        eventId: event._id,
      }));
    } else {
      setExpanded(!expanded);
    }
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(openEventModal({
      mode: 'edit',
      eventId: event._id,
    }));
  };
  
  const categoryClass = getCategoryColor(event.category);
  const textColorClass = getTextColorForCategory(event.category);
  
  return (
    <Draggable draggableId={event._id || 'temp'} index={index}>
      {(provided) => (
        <div
          className={`${categoryClass} ${textColorClass} rounded-md px-2 py-1 ${isCompact ? 'text-xs cursor-pointer' : 'cursor-pointer'} mb-1`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleClick}
        >
          {isCompact ? (
            <div className="flex items-center justify-between">
              <div className="font-medium truncate">{event.title}</div>
              <div className="text-xs whitespace-nowrap">{startTime}</div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <div className="font-medium">{event.title}</div>
                <button 
                  className="text-xs hover:bg-black/10 rounded p-1"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </div>
              {expanded ? (
                <div className="text-sm mt-1">
                  <div>Category: {event.category}</div>
                  <div>Time: {startTime} - {endTime}</div>
                </div>
              ) : (
                <div className="text-xs">{startTime} - {endTime}</div>
              )}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default EventCard;
