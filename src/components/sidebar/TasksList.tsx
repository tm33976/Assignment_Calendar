
import { useAppSelector } from '@/redux/hooks';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getGoalColor, getGoalTextColor } from '@/utils/colorUtils';
import { FileText } from 'lucide-react';

const TasksList = () => {
  const { tasks, status } = useAppSelector((state) => state.tasks);
  const { selectedGoalId } = useAppSelector((state) => state.goals);
  const goals = useAppSelector((state) => state.goals.goals);
  
  const selectedGoal = goals.find(goal => goal._id === selectedGoalId);
  
  if (!selectedGoalId) {
    return (
      <div>
        <h2 className="text-sm font-bold mb-3 uppercase">TASKS</h2>
        <p className="text-sm text-gray-500">Select a goal to see tasks</p>
      </div>
    );
  }
  
  if (status === 'loading') {
    return (
      <div>
        <h2 className="text-sm font-bold mb-3 uppercase">TASKS</h2>
        <p className="text-sm text-gray-500">Loading tasks...</p>
      </div>
    );
  }
  
  const colorClass = selectedGoalId ? getGoalColor(selectedGoalId) : '';
  const textColorClass = selectedGoalId ? getGoalTextColor(selectedGoalId) : '';
  
  return (
    <div>
      <h2 className="text-sm font-bold mb-3 uppercase">TASKS</h2>
      
      <Droppable droppableId="tasks-list" isDropDisabled={false}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={`task-${task._id}`} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${colorClass} ${textColorClass} p-2 rounded-md cursor-grab hover:ring-1 hover:ring-black`}
                  >
                    <div className="flex items-center">
                      <div className="w-6 flex justify-center mr-2">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{task.name}</span>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TasksList;
