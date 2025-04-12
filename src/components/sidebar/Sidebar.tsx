
import { DragDropContext } from 'react-beautiful-dnd';
import { useAppDispatch } from '@/redux/hooks';
import { openEventModal } from '@/redux/slices/uiSlice';
import GoalsList from './GoalsList';
import TasksList from './TasksList';
import { roundToNearestQuarter } from '@/utils/dateUtils';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    // Handle dropping a task onto the calendar
    if (result.source.droppableId === 'tasks-list' && 
        result.destination.droppableId.startsWith('day-')) {
      
      const taskId = result.draggableId.split('-')[1];
      const dayId = result.destination.droppableId.split('-').slice(1).join('-');
      
      // Extract task name from the dragged element
      const draggedElement = document.querySelector(`[data-rbd-draggable-id="${result.draggableId}"]`);
      const taskName = draggedElement?.textContent?.trim().replace('📌', '').trim() || 'New Task';
      
      // Create the event at the dropped date with a default time
      const dropDate = new Date(dayId);
      const currentHour = new Date().getHours();
      
      // Set a reasonable default time (e.g., current hour or work hours)
      const defaultHour = (currentHour >= 9 && currentHour <= 17) ? currentHour : 12;
      dropDate.setHours(defaultHour, 0, 0, 0);
      
      const roundedStartTime = roundToNearestQuarter(dropDate);
      const endTime = new Date(roundedStartTime);
      endTime.setMinutes(endTime.getMinutes() + 30);
      
      dispatch(openEventModal({
        mode: 'create',
        initialData: {
          title: taskName,
          category: 'work' as const, // Specify the type
          start: roundedStartTime.toISOString(),
          end: endTime.toISOString(),
          taskId: taskId, // This is now correctly typed
        }
      }));
    }
  };
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-64 h-full bg-gray-100 p-4 overflow-y-auto border-r">
        <GoalsList />
        <TasksList />
      </div>
    </DragDropContext>
  );
};

export default Sidebar;
