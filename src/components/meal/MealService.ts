
// Meal Service API

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: string[];
  foodGroups: string[];
}

export async function getUserMeals(userId: string): Promise<Meal[]> {
  // This is a placeholder function that would normally fetch from an API
  // For now it returns mock data
  return Promise.resolve([
    {
      id: '1',
      name: 'Breakfast',
      time: '8:00 AM',
      foods: ['oatmeal', 'banana', 'milk'],
      foodGroups: ['starchy_staples', 'other_fruits', 'dairy']
    },
    {
      id: '2',
      name: 'Lunch',
      time: '12:30 PM',
      foods: ['rice', 'beans', 'vegetables'],
      foodGroups: ['starchy_staples', 'legumes_nuts_seeds', 'other_vegetables']
    }
  ]);
}

export async function addMeal(userId: string, meal: Omit<Meal, 'id'>): Promise<Meal> {
  // This is a placeholder function that would normally post to an API
  const newMeal: Meal = {
    ...meal,
    id: Math.random().toString(36).substring(2, 9)
  };
  
  return Promise.resolve(newMeal);
}

export async function deleteMeal(userId: string, mealId: string): Promise<boolean> {
  // This is a placeholder function that would normally delete from an API
  return Promise.resolve(true);
}
