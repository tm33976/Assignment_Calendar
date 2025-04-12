
export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'exercise':
      return 'bg-category-exercise';
    case 'eating':
      return 'bg-category-eating';
    case 'work':
      return 'bg-category-work';
    case 'relax':
      return 'bg-category-relax';
    case 'family':
      return 'bg-category-family';
    case 'social':
      return 'bg-category-social';
    default:
      return 'bg-gray-400';
  }
};

export const getCategoryBorderColor = (category: string): string => {
  switch (category) {
    case 'exercise':
      return 'border-category-exercise';
    case 'eating':
      return 'border-category-eating';
    case 'work':
      return 'border-category-work';
    case 'relax':
      return 'border-category-relax';
    case 'family':
      return 'border-category-family';
    case 'social':
      return 'border-category-social';
    default:
      return 'border-gray-400';
  }
};

export const getTextColorForCategory = (category: string): string => {
  switch (category) {
    case 'exercise':
    case 'work':
    case 'family':
      return 'text-white';
    default:
      return 'text-gray-800';
  }
};

export const getGoalColor = (goalId: string): string => {
  switch (goalId) {
    case '1': // Be fit
      return 'bg-goal-fit';
    case '2': // Academics
      return 'bg-goal-academics';
    case '3': // LEARN
      return 'bg-goal-learn';
    case '4': // Sports
      return 'bg-goal-sports';
    default:
      return 'bg-gray-400';
  }
};

export const getGoalTextColor = (goalId: string): string => {
  switch (goalId) {
    case '2': // Academics
    case '3': // LEARN
      return 'text-white';
    default:
      return 'text-gray-800';
  }
};
