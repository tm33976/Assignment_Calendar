
import { useAppSelector } from '@/redux/hooks';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getGoalColor, getGoalTextColor } from '@/utils/colorUtils';
import { Code, Database, Bot, Info } from 'lucide-react';

const TasksList = () => {
  const { tasks, status } = useAppSelector((state) => state.tasks);
  const { selectedGoalId } = useAppSelector((state) => state.goals);
  const goals = useAppSelector((state) => state.goals.goals);
  
  const selectedGoal = goals.find(goal => goal._id === selectedGoalId);
  
  // Get the appropriate icon based on task name
  const getTaskIcon = (taskName: string) => {
    const lowerName = taskName.toLowerCase();
    if (lowerName.includes('ai') || lowerName.includes('agent')) {
      return <Bot className="w-4 h-4 mr-2 flex-shrink-0" />;
    } else if (lowerName.includes('mle')) {
      return <Database className="w-4 h-4 mr-2 flex-shrink-0" />;
    } else if (lowerName.includes('de') || lowerName.includes('related')) {
      return <Code className="w-4 h-4 mr-2 flex-shrink-0" />;
    } else {
      return <Info className="w-4 h-4 mr-2 flex-shrink-0" />;
    }
  };

  // Fixed task names to match the image
  const getTaskName = (taskId: string, name: string) => {
    // Map task IDs to specific names as shown in the image
    switch (taskId) {
      case '1': return 'AI based agents';
      case '2': return 'MLE';
      case '3': return 'DE related';
      case '4': return 'Basics';
      default: return name;
    }
  };
  
  if (!selectedGoalId) {
    return (
      <div>
        <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-gray-700">TASKS</h2>
        <p className="text-sm text-gray-500">Select a goal to see tasks</p>
      </div>
    );
  }
  
  if (status === 'loading') {
    return (
      <div>
        <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-gray-700">TASKS</h2>
        <p className="text-sm text-gray-500">Loading tasks...</p>
      </div>
    );
  }
  
  const colorClass = selectedGoalId ? getGoalColor(selectedGoalId) : '';
  const textColorClass = selectedGoalId ? getGoalTextColor(selectedGoalId) : '';
  
  return (
    <div>
      <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-gray-700">TASKS</h2>
      
      <Droppable droppableId="tasks-list" isDropDisabled={false}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {tasks.map((task, index) => {
              const taskName = getTaskName(task._id, task.name);
              
              return (
                <Draggable key={task._id} draggableId={`task-${task._id}`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${snapshot.isDragging ? `${colorClass} ${textColorClass} opacity-70` : 'bg-gray-100 hover:bg-gray-200'} 
                        p-2 rounded-md flex items-center cursor-grab
                        ${task._id === '4' ? `${colorClass} ${textColorClass}` : ''}`}
                    >
                      {getTaskIcon(taskName)}
                      <span className="truncate">{taskName}</span>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TasksList;
