import { useRef, useState } from 'react';
import { addDays, format, parseISO } from 'date-fns';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateEvent } from '@/redux/slices/eventsSlice';
import { openEventModal } from '@/redux/slices/uiSlice';
import { getWeekDays, generateTimeSlots, getEventPosition, getTimeFromPosition, roundToNearestQuarter } from '@/utils/dateUtils';
import CalendarHeader from './CalendarHeader';
import CalendarTimeline from './CalendarTimeline';
import EventCard from './EventCard';
import { toast } from 'sonner';

const CalendarGrid = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events);
  const { currentDate } = useAppSelector((state) => state.ui);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [startDragPosition, setStartDragPosition] = useState<{ x: number; y: number } | null>(null);
  
  const currentDateObj = currentDate ? parseISO(currentDate) : new Date();
  const weekDays = getWeekDays(currentDateObj);
  const timeSlots = generateTimeSlots();
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;
    const eventId = result.draggableId;
    
    const event = events.find(e => e._id === eventId);
    
    if (!event) return;
    
    // Extract date information from the droppable ID
    // Format: day-2023-01-01
    const destinationDayStr = destinationId.split('-').slice(1).join('-');
    const destinationDay = parseISO(destinationDayStr);
    
    const sourceStart = parseISO(event.start);
    const sourceEnd = parseISO(event.end);
    
    // Calculate the time difference between start and end
    const timeDiff = sourceEnd.getTime() - sourceStart.getTime();
    
    // Create a new start date using the destination day but keeping the original time
    const newStart = new Date(destinationDay);
    newStart.setHours(sourceStart.getHours(), sourceStart.getMinutes(), 0, 0);
    
    // Calculate the new end time
    const newEnd = new Date(newStart.getTime() + timeDiff);
    
    // Update the event with the new dates
    dispatch(updateEvent({
      ...event,
      start: newStart.toISOString(),
      end: newEnd.toISOString(),
    }))
      .unwrap()
      .then(() => {
        toast.success('Event moved successfully');
      })
      .catch((error) => {
        toast.error(`Failed to move event: ${error.message}`);
      });
  };
  
  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      
      // Calculate the position within the grid
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate which day and time was clicked
      const dayWidth = rect.width / 7; // 7 days in a week
      const dayIndex = Math.floor(x / dayWidth);
      
      // Ensure dayIndex is in bounds
      if (dayIndex >= 0 && dayIndex < 7) {
        const clickedDay = weekDays[dayIndex];
        
        // Calculate time based on vertical position
        const timelineOffset = 60; // Height of the timeline header
        const rowHeight = 60; // Each hour is 60px tall
        
        if (y > timelineOffset) {
          const minutesSinceMidnight = ((y - timelineOffset) / rowHeight) * 60;
          const clickedTime = getTimeFromPosition(minutesSinceMidnight, clickedDay);
          const roundedTime = roundToNearestQuarter(clickedTime);
          
          // Set default event duration to 30 minutes
          const endTime = new Date(roundedTime);
          endTime.setMinutes(endTime.getMinutes() + 30);
          
          dispatch(openEventModal({
            mode: 'create',
            initialData: {
              start: roundedTime.toISOString(),
              end: endTime.toISOString(),
            }
          }));
        }
      }
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <CalendarHeader weekDays={weekDays} />
      
      <div 
        className="flex flex-1 overflow-auto"
        onClick={handleGridClick}
        ref={gridRef}
      >
        <CalendarTimeline timeSlots={timeSlots} />
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-1">
            {weekDays.map((day, dayIndex) => {
              const formattedDay = format(day, 'yyyy-MM-dd');
              
              // Filter events for this day
              const dayEvents = events.filter(event => {
                const eventDate = parseISO(event.start);
                return format(eventDate, 'yyyy-MM-dd') === formattedDay;
              });
              
              return (
                <Droppable 
                  key={`day-${formattedDay}`} 
                  droppableId={`day-${formattedDay}`}
                  direction="vertical"
                >
                  {(provided) => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 relative border-r h-[1080px] ${dayIndex % 2 === 1 ? 'bg-gray-50' : ''}`}
                    >
                      {/* Time slot indicators */}
                      {timeSlots.map((slot, i) => (
                        <div 
                          key={`slot-${dayIndex}-${i}`}
                          className="border-b border-gray-200 h-[60px]"
                        />
                      ))}
                      
                      {/* Events */}
                      {dayEvents.map((event, index) => {
                        const { top, height } = getEventPosition(event.start, event.end);
                        
                        return (
                          <div 
                            key={event._id}
                            className="absolute left-1 right-1"
                            style={{
                              top: `${top}px`,
                              height: `${height}px`,
                              minHeight: '20px',
                            }}
                          >
                            <EventCard 
                              event={event} 
                              columnId={`day-${formattedDay}`} 
                              index={index}
                            />
                          </div>
                        );
                      })}
                      
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default CalendarGrid;
