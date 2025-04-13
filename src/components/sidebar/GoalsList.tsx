
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchGoals, setSelectedGoal } from '@/redux/slices/goalsSlice';
import { fetchTasksByGoalId } from '@/redux/slices/tasksSlice';
import { getGoalColor, getGoalTextColor } from '@/utils/colorUtils';

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
  
  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold mb-2 uppercase tracking-wider">GOALS</h2>
      <div className="space-y-2">
        {goals.map((goal) => {
          const isSelected = selectedGoalId === goal._id;
          const colorClass = getGoalColor(goal._id);
          const textColorClass = getGoalTextColor(goal._id);
          
          return (
            <div
              key={goal._id}
              className={`${colorClass} ${textColorClass} ${isSelected ? 'ring-2 ring-black' : ''} p-2 rounded-md cursor-pointer transition-all`}
              onClick={() => handleGoalClick(goal._id)}
            >
              <div className="flex items-center">
                <span className="mr-2">🏆</span>
                <span>{goal.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsList;
