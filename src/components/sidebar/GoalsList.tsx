
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchGoals, setSelectedGoal } from '@/redux/slices/goalsSlice';
import { fetchTasksByGoalId } from '@/redux/slices/tasksSlice';
import { getGoalColor, getGoalTextColor } from '@/utils/colorUtils';
import { Home, GraduationCap, BookOpen, Trophy } from 'lucide-react';

const GoalsList = () => {
  const dispatch = useAppDispatch();
  const { goals, selectedGoalId, status } = useAppSelector((state) => state.goals);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGoals());
    }
  }, [dispatch, status]);
  
  const handleGoalClick = (goalId: string) => {
    dispatch(setSelectedGoal(goalId));
    dispatch(fetchTasksByGoalId(goalId));
  };
  
  // Map goal IDs to icons
  const getGoalIcon = (goalId: string) => {
    switch (goalId) {
      case '1': // Be fit
        return <Home className="w-4 h-4 mr-2" />;
      case '2': // Academics
        return <GraduationCap className="w-4 h-4 mr-2" />;
      case '3': // LEARN
        return <BookOpen className="w-4 h-4 mr-2" />;
      case '4': // Sports
        return <Trophy className="w-4 h-4 mr-2" />;
      default:
        return <Home className="w-4 h-4 mr-2" />;
    }
  };

  // Map goal IDs to names (if not coming from the API)
  const getGoalName = (goalId: string, name: string) => {
    switch (goalId) {
      case '1': return 'Be fit';
      case '2': return 'Academics';
      case '3': return 'LEARN';
      case '4': return 'Sports';
      default: return name;
    }
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-gray-700">GOALS</h2>
      <div className="space-y-2">
        {goals.map((goal) => {
          const isSelected = selectedGoalId === goal._id;
          const colorClass = getGoalColor(goal._id);
          const textColorClass = getGoalTextColor(goal._id);
          const goalName = getGoalName(goal._id, goal.name);
          
          return (
            <div
              key={goal._id}
              className={`${isSelected ? `${colorClass} ${textColorClass}` : 'bg-gray-100 hover:bg-gray-200'} 
                p-2 rounded-md cursor-pointer transition-all flex items-center 
                ${isSelected ? 'ring-2 ring-black' : ''}`}
              onClick={() => handleGoalClick(goal._id)}
            >
              {getGoalIcon(goal._id)}
              <span className="font-medium">{goalName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsList;
