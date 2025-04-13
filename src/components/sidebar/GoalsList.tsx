
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchGoals, setSelectedGoal } from '@/redux/slices/goalsSlice';
import { fetchTasksByGoalId } from '@/redux/slices/tasksSlice';
import { getGoalColor, getGoalTextColor } from '@/utils/colorUtils';
import { Home } from 'lucide-react';

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

  // Function to get the appropriate icon for each goal
  const getGoalIcon = (goalName: string) => {
    const name = goalName.toLowerCase();
    if (name.includes('fit')) return '🏆';
    if (name.includes('academic')) return '🎓';
    if (name.includes('learn')) return '📚';
    if (name.includes('sport')) return '🏀';
    return '🎯';
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-sm font-bold mb-3 uppercase">GOALS</h2>
      <div className="space-y-2">
        {goals.map((goal) => {
          const isSelected = selectedGoalId === goal._id;
          const colorClass = getGoalColor(goal._id);
          const textColorClass = getGoalTextColor(goal._id);
          
          return (
            <div
              key={goal._id}
              className={`${colorClass} ${textColorClass} ${isSelected ? 'ring-2 ring-black' : ''} p-2 rounded-md cursor-pointer transition-all hover:ring-1 hover:ring-black`}
              onClick={() => handleGoalClick(goal._id)}
            >
              <div className="flex items-center">
                <div className="w-6 flex justify-center mr-2">
                  <Home className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{goal.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsList;
