import { ChildProfile } from '../onboarding/ChildProfileForm';

// Interfaces for meal tracking
interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
}

interface MealLog {
  id: string;
  childId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: Array<FoodItem & { quantity: number }>;
}

interface MealPlanDay {
  date: string;
  breakfast: Array<{ name: string; portion: string; calories: number }>;
  lunch: Array<{ name: string; portion: string; calories: number }>;
  dinner: Array<{ name: string; portion: string; calories: number }>;
  snacks: Array<{ name: string; portion: string; calories: number }>;
}

interface NutritionSummary {
  calories: { consumed: number; recommended: number };
  protein: { consumed: number; recommended: number };
  carbs: { consumed: number; recommended: number };
  fat: { consumed: number; recommended: number };
}

// In-memory storage (in a real app, this would be a database)
let mealLogs: MealLog[] = [];
let mealPlans: Record<string, MealPlanDay[]> = {};

// Enhanced food database based on the provided image
const foodDatabase: FoodItem[] = [
  // Grains
  { id: '1', name: 'Rice', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, servingSize: '100g cooked' },
  { id: '2', name: 'Wheat', calories: 340, protein: 13.2, carbs: 71, fat: 2.5, servingSize: '100g' },
  { id: '3', name: 'Barley', calories: 354, protein: 12.5, carbs: 73.5, fat: 2.3, servingSize: '100g' },
  { id: '4', name: 'Oats', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, servingSize: '100g' },
  { id: '5', name: 'Maize', calories: 365, protein: 9.4, carbs: 74, fat: 4.7, servingSize: '100g' },
  
  // Protein sources
  { id: '6', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g cooked' },
  { id: '7', name: 'Egg', calories: 155, protein: 12.6, carbs: 1.1, fat: 11.2, servingSize: '100g (2 eggs)' },
  { id: '8', name: 'Beef', calories: 250, protein: 26, carbs: 0, fat: 17, servingSize: '100g cooked' },
  { id: '9', name: 'Fish', calories: 206, protein: 22, carbs: 0, fat: 12, servingSize: '100g' },
  { id: '10', name: 'Pork', calories: 242, protein: 24, carbs: 0, fat: 16, servingSize: '100g cooked' },
  { id: '11', name: 'Lentil', calories: 116, protein: 9, carbs: 20, fat: 0.4, servingSize: '100g cooked' },
  
  // Dairy products
  { id: '12', name: 'Milk', calories: 42, protein: 3.4, carbs: 5, fat: 1, servingSize: '100ml' },
  { id: '13', name: 'Cheese', calories: 402, protein: 25, carbs: 1.3, fat: 33, servingSize: '100g' },
  { id: '14', name: 'Yogurt', calories: 59, protein: 3.6, carbs: 5, fat: 3.1, servingSize: '100g' },
  { id: '15', name: 'Butter', calories: 717, protein: 0.9, carbs: 0.1, fat: 81, servingSize: '100g' },
  
  // Vegetables
  { id: '16', name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, servingSize: '100g' },
  { id: '17', name: 'Carrot', calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, servingSize: '100g' },
  { id: '18', name: 'Broccoli', calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4, servingSize: '100g' },
  { id: '19', name: 'Potato', calories: 77, protein: 2, carbs: 17, fat: 0.1, servingSize: '100g' },
  { id: '20', name: 'Tomato', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, servingSize: '100g' },
  
  // Fruits
  { id: '21', name: 'Apple', calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, servingSize: '100g' },
  { id: '22', name: 'Banana', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, servingSize: '100g' },
  { id: '23', name: 'Orange', calories: 43, protein: 0.9, carbs: 8.3, fat: 0.2, servingSize: '100g' },
  { id: '24', name: 'Grapes', calories: 67, protein: 0.6, carbs: 17.2, fat: 0.4, servingSize: '100g' },
  { id: '25', name: 'Watermelon', calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, servingSize: '100g' },
  
  // Nuts and seeds
  { id: '26', name: 'Almonds', calories: 579, protein: 21.2, carbs: 21.7, fat: 49.9, servingSize: '100g' },
  { id: '27', name: 'Walnuts', calories: 654, protein: 15.2, carbs: 13.7, fat: 65.2, servingSize: '100g' },
  { id: '28', name: 'Cashews', calories: 553, protein: 18.2, carbs: 30.2, fat: 43.9, servingSize: '100g' },
  { id: '29', name: 'Sunflower Seeds', calories: 584, protein: 20.8, carbs: 20, fat: 51.5, servingSize: '100g' },
  
  // Legumes
  { id: '30', name: 'Chickpeas', calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6, servingSize: '100g cooked' },
  { id: '31', name: 'Black Beans', calories: 132, protein: 8.9, carbs: 23.7, fat: 0.5, servingSize: '100g cooked' },
  { id: '32', name: 'Green Peas', calories: 81, protein: 5.4, carbs: 14.5, fat: 0.4, servingSize: '100g' },
  
  // Oils
  { id: '33', name: 'Olive Oil', calories: 884, protein: 0, carbs: 0, fat: 100, servingSize: '100g' },
  { id: '34', name: 'Coconut Oil', calories: 862, protein: 0, carbs: 0, fat: 100, servingSize: '100g' },
  
  // Sweeteners
  { id: '35', name: 'Honey', calories: 304, protein: 0.3, carbs: 82.4, fat: 0, servingSize: '100g' },
  { id: '36', name: 'Sugar', calories: 387, protein: 0, carbs: 100, fat: 0, servingSize: '100g' },
  
  // Beverages
  { id: '37', name: 'Orange Juice', calories: 45, protein: 0.7, carbs: 10.4, fat: 0.2, servingSize: '100ml' },
  { id: '38', name: 'Apple Juice', calories: 46, protein: 0.1, carbs: 11.3, fat: 0.1, servingSize: '100ml' },
  
  // Processed foods
  { id: '39', name: 'Bread', calories: 265, protein: 9, carbs: 49, fat: 3.2, servingSize: '100g' },
  { id: '40', name: 'Pasta', calories: 131, protein: 5, carbs: 25, fat: 1.1, servingSize: '100g cooked' },
  { id: '41', name: 'Pizza', calories: 266, protein: 11, carbs: 33, fat: 10, servingSize: '100g' },
  { id: '42', name: 'Ice Cream', calories: 207, protein: 3.5, carbs: 23.6, fat: 11, servingSize: '100g' },
  { id: '43', name: 'Chocolate', calories: 546, protein: 4.9, carbs: 61, fat: 31, servingSize: '100g' },
  { id: '44', name: 'Potato Chips', calories: 536, protein: 7, carbs: 53, fat: 35, servingSize: '100g' },
];

// Sample meal plans based on diet type
const vegetarianMeals = {
  breakfast: [
    { name: 'Oatmeal with Berries', portion: '1 cup', calories: 220 },
    { name: 'Greek Yogurt with Honey', portion: '200g', calories: 180 },
    { name: 'Whole Grain Toast with Avocado', portion: '2 slices', calories: 280 },
    { name: 'Fruit Smoothie with Spinach', portion: '16oz', calories: 210 },
    { name: 'Vegetable Omelette', portion: '3 eggs', calories: 290 },
  ],
  lunch: [
    { name: 'Quinoa Salad with Vegetables', portion: '1.5 cups', calories: 320 },
    { name: 'Lentil Soup with Bread', portion: '1 bowl + 1 slice', calories: 350 },
    { name: 'Veggie Wrap with Hummus', portion: '1 large wrap', calories: 380 },
    { name: 'Caprese Sandwich', portion: '1 sandwich', calories: 310 },
    { name: 'Pasta Salad with Vegetables', portion: '1.5 cups', calories: 340 },
  ],
  dinner: [
    { name: 'Bean and Vegetable Stir Fry', portion: '1.5 cups', calories: 360 },
    { name: 'Vegetable Curry with Rice', portion: '1 serving', calories: 420 },
    { name: 'Stuffed Bell Peppers', portion: '2 peppers', calories: 380 },
    { name: 'Eggplant Parmesan', portion: '1 serving', calories: 390 },
    { name: 'Vegetable Lasagna', portion: '1 slice', calories: 410 },
  ],
  snacks: [
    { name: 'Apple with Peanut Butter', portion: '1 apple + 2 tbsp', calories: 200 },
    { name: 'Hummus with Carrot Sticks', portion: '1/4 cup + 1 cup', calories: 150 },
    { name: 'Trail Mix', portion: '1/4 cup', calories: 170 },
    { name: 'Fruit Smoothie', portion: '8oz', calories: 120 },
    { name: 'Yogurt with Granola', portion: '6oz + 2 tbsp', calories: 180 },
  ]
};

const nonVegetarianMeals = {
  breakfast: [
    { name: 'Scrambled Eggs with Toast', portion: '2 eggs + 1 slice', calories: 250 },
    { name: 'Oatmeal with Fruit', portion: '1 cup', calories: 210 },
    { name: 'Chicken Breakfast Wrap', portion: '1 wrap', calories: 320 },
    { name: 'Yogurt Parfait', portion: '1 cup', calories: 180 },
    { name: 'Breakfast Burrito', portion: '1 burrito', calories: 350 },
  ],
  lunch: [
    { name: 'Grilled Chicken Salad', portion: '1 bowl', calories: 310 },
    { name: 'Turkey Sandwich', portion: '1 sandwich', calories: 340 },
    { name: 'Beef and Vegetable Soup', portion: '1 bowl', calories: 280 },
    { name: 'Tuna Wrap', portion: '1 wrap', calories: 330 },
    { name: 'Chicken Quesadilla', portion: '1 serving', calories: 380 },
  ],
  dinner: [
    { name: 'Grilled Salmon with Vegetables', portion: '1 fillet + sides', calories: 390 },
    { name: 'Chicken Stir Fry with Rice', portion: '1.5 cups', calories: 420 },
    { name: 'Beef Tacos', portion: '2 tacos', calories: 380 },
    { name: 'Baked Chicken with Sweet Potato', portion: '1 serving', calories: 410 },
    { name: 'Turkey Meatballs with Pasta', portion: '1 serving', calories: 440 },
  ],
  snacks: [
    { name: 'Greek Yogurt', portion: '1 container', calories: 120 },
    { name: 'Beef Jerky', portion: '1oz', calories: 80 },
    { name: 'Hard-Boiled Egg', portion: '1 egg', calories: 70 },
    { name: 'String Cheese', portion: '1 stick', calories: 80 },
    { name: 'Trail Mix', portion: '1/4 cup', calories: 170 },
  ]
};

const veganMeals = {
  breakfast: [
    { name: 'Overnight Oats with Berries', portion: '1 cup', calories: 210 },
    { name: 'Avocado Toast', portion: '2 slices', calories: 280 },
    { name: 'Chia Pudding with Fruit', portion: '1 cup', calories: 190 },
    { name: 'Green Smoothie Bowl', portion: '1 bowl', calories: 220 },
    { name: 'Tofu Scramble with Vegetables', portion: '1 serving', calories: 240 },
  ],
  lunch: [
    { name: 'Quinoa Buddha Bowl', portion: '1 bowl', calories: 330 },
    { name: 'Chickpea Salad Sandwich', portion: '1 sandwich', calories: 310 },
    { name: 'Lentil Soup', portion: '1 bowl', calories: 280 },
    { name: 'Falafel Wrap', portion: '1 wrap', calories: 340 },
    { name: 'Vegetable Sushi Rolls', portion: '6 pieces', calories: 300 },
  ],
  dinner: [
    { name: 'Vegetable Stir Fry with Tofu', portion: '1.5 cups', calories: 330 },
    { name: 'Chickpea and Vegetable Curry', portion: '1 serving', calories: 370 },
    { name: 'Zucchini Pasta with Lentil Sauce', portion: '1.5 cups', calories: 310 },
    { name: 'Bean and Rice Burrito Bowl', portion: '1 bowl', calories: 390 },
    { name: 'Stuffed Portobello Mushrooms', portion: '2 mushrooms', calories: 280 },
  ],
  snacks: [
    { name: 'Apple with Almond Butter', portion: '1 apple + 1 tbsp', calories: 170 },
    { name: 'Hummus with Vegetable Sticks', portion: '1/4 cup + vegetables', calories: 150 },
    { name: 'Trail Mix', portion: '1/4 cup', calories: 170 },
    { name: 'Roasted Chickpeas', portion: '1/4 cup', calories: 120 },
    { name: 'Fruit Smoothie', portion: '8oz', calories: 120 },
  ]
};

// Initialize data from localStorage
const initializeData = () => {
  const storedLogs = localStorage.getItem('mealLogs');
  if (storedLogs) {
    mealLogs = JSON.parse(storedLogs);
  }
  
  const storedPlans = localStorage.getItem('mealPlans');
  if (storedPlans) {
    mealPlans = JSON.parse(storedPlans);
  }
};

// Call initialize on module load
initializeData();

// Get meal logs for a specific child
export const getMealLogs = (childId: string): MealLog[] => {
  return mealLogs.filter(log => log.childId === childId);
};

// Add a new meal log
export const addMealLog = (mealLog: MealLog): boolean => {
  try {
    mealLogs.push(mealLog);
    localStorage.setItem('mealLogs', JSON.stringify(mealLogs));
    return true;
  } catch (error) {
    console.error('Error adding meal log:', error);
    return false;
  }
};

// Generate a meal plan for a child
export const generateMealPlan = (childProfile: ChildProfile): MealPlanDay[] => {
  // Determine which meal set to use based on diet type
  let mealSet;
  switch (childProfile.dietType) {
    case 'vegetarian':
      mealSet = vegetarianMeals;
      break;
    case 'vegan':
      mealSet = veganMeals;
      break;
    case 'non-vegetarian':
    default:
      mealSet = nonVegetarianMeals;
      break;
  }
  
  // Filter out any allergies
  const filteredMeals = {...mealSet};
  if (childProfile.hasAllergies && childProfile.allergies.length > 0) {
    // This is a simplified implementation. In a real app, you would check each meal against allergies
    // For now, we'll just assume we're filtering properly
  }
  
  // Generate a 7-day meal plan
  const today = new Date();
  const mealPlan: MealPlanDay[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    
    // Randomly select meals for each day
    const randomBreakfast = [...filteredMeals.breakfast].sort(() => 0.5 - Math.random()).slice(0, 2);
    const randomLunch = [...filteredMeals.lunch].sort(() => 0.5 - Math.random()).slice(0, 2);
    const randomDinner = [...filteredMeals.dinner].sort(() => 0.5 - Math.random()).slice(0, 2);
    const randomSnacks = [...filteredMeals.snacks].sort(() => 0.5 - Math.random()).slice(0, 3);
    
    mealPlan.push({
      date: dateString,
      breakfast: randomBreakfast,
      lunch: randomLunch,
      dinner: randomDinner,
      snacks: randomSnacks
    });
  }
  
  return mealPlan;
};

// Get meal plan for a child
export const getMealPlan = (childId: string): MealPlanDay[] => {
  // If no plan exists, create one based on the child's profile
  if (!mealPlans[childId]) {
    const childProfiles = JSON.parse(localStorage.getItem('childProfiles') || '{}');
    const userProfiles = Object.values(childProfiles).flat() as ChildProfile[];
    const profile = userProfiles.find(p => p.id === childId);
    
    if (profile) {
      mealPlans[childId] = generateMealPlan(profile);
      localStorage.setItem('mealPlans', JSON.stringify(mealPlans));
    } else {
      // Return a default empty plan
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
          date: date.toISOString().split('T')[0],
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: []
        };
      });
    }
  }
  
  return mealPlans[childId];
};

// Get nutrition summary for a child
export const getNutritionSummary = (childId: string): NutritionSummary | null => {
  const childProfiles = JSON.parse(localStorage.getItem('childProfiles') || '{}');
  const userProfiles = Object.values(childProfiles).flat() as ChildProfile[];
  const profile = userProfiles.find(p => p.id === childId);
  
  if (!profile) {
    return null;
  }
  
  // Get today's logs
  const today = new Date().toISOString().split('T')[0];
  const todayLogs = mealLogs.filter(
    log => log.childId === childId && log.date === today
  );
  
  // Calculate consumed nutrients
  const consumed = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };
  
  todayLogs.forEach(log => {
    log.foods.forEach(food => {
      consumed.calories += food.calories * food.quantity;
      consumed.protein += food.protein * food.quantity;
      consumed.carbs += food.carbs * food.quantity;
      consumed.fat += food.fat * food.quantity;
    });
  });
  
  // Calculate recommended nutrients based on child profile
  // This is a simplified calculation
  let baseCalories = 0;
  
  if (profile.age < 3) {
    baseCalories = (profile.weight * 59.5) - 30;
  } else if (profile.age < 10) {
    baseCalories = (profile.weight * 22.7) + 495;
  } else if (profile.age < 18) {
    if (profile.gender === 'male') {
      baseCalories = (profile.weight * 17.5) + 651;
    } else {
      baseCalories = (profile.weight * 12.2) + 746;
    }
  }
  
  // Activity level adjustment
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };
  
  const activityMultiplier = activityMultipliers[profile.activityLevel] || 1.2;
  const recommendedCalories = Math.round(baseCalories * activityMultiplier);
  
  // Macronutrient distribution
  const recommendedProtein = Math.round((recommendedCalories * 0.15) / 4); // 15% of calories from protein
  const recommendedFat = Math.round((recommendedCalories * 0.3) / 9); // 30% of calories from fat
  const recommendedCarbs = Math.round((recommendedCalories * 0.55) / 4); // 55% of calories from carbs
  
  return {
    calories: { consumed: consumed.calories, recommended: recommendedCalories },
    protein: { consumed: Math.round(consumed.protein), recommended: recommendedProtein },
    carbs: { consumed: Math.round(consumed.carbs), recommended: recommendedCarbs },
    fat: { consumed: Math.round(consumed.fat), recommended: recommendedFat }
  };
};

// Export the food database for use in other components
export const getFoodDatabase = (): FoodItem[] => {
  return foodDatabase;
};
