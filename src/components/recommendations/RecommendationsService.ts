
import { ChildProfile } from '../onboarding/ChildProfileForm';

// Exercise recommendation interfaces
interface ExerciseVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  durationMinutes: number;
  ageRangeMin: number;
  ageRangeMax: number;
  activityLevel: string[];
  tags: string[];
}

interface CheatMealRecipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  dietTypes: string[];
  imageUrl?: string;
  calories: number;
}

// Sample exercise videos data
const exerciseVideos: ExerciseVideo[] = [
  {
    id: 'ex1',
    title: 'Fun Dance Moves for Toddlers',
    description: 'Simple and fun dance moves that toddlers can follow along with music.',
    url: 'https://www.youtube.com/watch?v=BQ9q4U2P3ig',
    durationMinutes: 10,
    ageRangeMin: 2,
    ageRangeMax: 4,
    activityLevel: ['sedentary', 'light'],
    tags: ['dance', 'indoor', 'music']
  },
  {
    id: 'ex2',
    title: 'Kids Yoga Adventure',
    description: 'A yoga adventure that combines storytelling with simple yoga poses for young children.',
    url: 'https://www.youtube.com/watch?v=KAT5NiWHFIU',
    durationMinutes: 15,
    ageRangeMin: 3,
    ageRangeMax: 6,
    activityLevel: ['light', 'moderate'],
    tags: ['yoga', 'flexibility', 'mindfulness']
  },
  {
    id: 'ex3',
    title: 'Backyard Obstacle Course',
    description: 'Create an obstacle course in your backyard or living room with simple household items.',
    url: 'https://www.youtube.com/watch?v=xmE3TCO3RQw',
    durationMinutes: 20,
    ageRangeMin: 5,
    ageRangeMax: 9,
    activityLevel: ['moderate', 'active'],
    tags: ['outdoor', 'obstacle', 'coordination']
  },
  {
    id: 'ex4',
    title: 'Kids HIIT Workout',
    description: 'High-intensity interval training designed specifically for children.',
    url: 'https://www.youtube.com/watch?v=lc1Ag9m7XQo',
    durationMinutes: 15,
    ageRangeMin: 7,
    ageRangeMax: 12,
    activityLevel: ['active', 'veryActive'],
    tags: ['hiit', 'cardio', 'strength']
  },
  {
    id: 'ex5',
    title: 'Kids Soccer Drills',
    description: 'Basic soccer skills and drills that children can practice at home.',
    url: 'https://www.youtube.com/watch?v=coQdgX1XbEM',
    durationMinutes: 25,
    ageRangeMin: 6,
    ageRangeMax: 14,
    activityLevel: ['moderate', 'active', 'veryActive'],
    tags: ['soccer', 'sports', 'coordination']
  },
  {
    id: 'ex6',
    title: 'Balance and Coordination Games',
    description: 'Fun games that improve balance and coordination for younger children.',
    url: 'https://www.youtube.com/watch?v=kKWGfF5BF5Q',
    durationMinutes: 12,
    ageRangeMin: 3,
    ageRangeMax: 7,
    activityLevel: ['light', 'moderate'],
    tags: ['balance', 'coordination', 'games']
  },
  {
    id: 'ex7',
    title: 'Teen Bodyweight Workout',
    description: 'A full bodyweight workout designed for teenagers to build strength and endurance.',
    url: 'https://www.youtube.com/watch?v=eJaP5k1xjR8',
    durationMinutes: 30,
    ageRangeMin: 13,
    ageRangeMax: 17,
    activityLevel: ['active', 'veryActive'],
    tags: ['strength', 'bodyweight', 'fitness']
  },
  {
    id: 'ex8',
    title: 'Gentle Movement for Kids with Limited Mobility',
    description: 'Gentle exercises for children with limited mobility or those recovering from injury.',
    url: 'https://www.youtube.com/watch?v=ow8wZcN3f2A',
    durationMinutes: 15,
    ageRangeMin: 4,
    ageRangeMax: 16,
    activityLevel: ['sedentary', 'light'],
    tags: ['gentle', 'adaptive', 'mobility']
  }
];

// Sample cheat meal recipes
const cheatMealRecipes: CheatMealRecipe[] = [
  {
    id: 'cm1',
    name: 'Rainbow Fruit Pizza',
    description: 'A colorful fruit pizza with a cookie base and cream cheese frosting.',
    ingredients: [
      '1 sugar cookie dough roll',
      '8 oz cream cheese, softened',
      '1/4 cup honey',
      '1/2 tsp vanilla extract',
      'Assorted fruits (strawberries, kiwi, blueberries, mandarin oranges, grapes)'
    ],
    instructions: [
      'Bake sugar cookie dough according to package instructions in a pizza pan.',
      'Mix cream cheese, honey, and vanilla until smooth.',
      'Spread mixture over cooled cookie crust.',
      'Arrange fruits in rainbow pattern on top.',
      'Chill for 1 hour before serving.'
    ],
    prepTimeMinutes: 30,
    dietTypes: ['vegetarian'],
    calories: 280
  },
  {
    id: 'cm2',
    name: 'Mini Cauliflower Pizzas',
    description: 'Personal-sized pizzas with a cauliflower crust, perfect for a healthier pizza night.',
    ingredients: [
      '1 head cauliflower, riced',
      '1 egg',
      '1/2 cup shredded mozzarella',
      '1/4 cup grated parmesan',
      '1/2 tsp Italian seasoning',
      'Pizza sauce',
      'Toppings of choice'
    ],
    instructions: [
      'Rice cauliflower and microwave for 5 minutes, then drain well.',
      'Mix cauliflower with egg, cheeses, and seasoning.',
      'Form into small crusts on a baking sheet.',
      'Bake at 425°F for 15 minutes.',
      'Add sauce and toppings, bake 5-10 minutes more.'
    ],
    prepTimeMinutes: 45,
    dietTypes: ['vegetarian', 'gluten-free'],
    calories: 180
  },
  {
    id: 'cm3',
    name: 'Sweet Potato Mac and Cheese',
    description: 'Creamy mac and cheese with a hidden veggie boost from sweet potatoes.',
    ingredients: [
      '8 oz whole grain pasta',
      '1 medium sweet potato, cooked and mashed',
      '1 cup milk',
      '1 1/2 cups shredded cheddar cheese',
      '1/4 tsp garlic powder',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Cook pasta according to package directions.',
      'Blend sweet potato and milk until smooth.',
      'In a saucepan, heat sweet potato mixture over medium heat.',
      'Stir in cheese until melted and smooth.',
      'Add seasonings and fold in cooked pasta.'
    ],
    prepTimeMinutes: 25,
    dietTypes: ['vegetarian'],
    calories: 320
  },
  {
    id: 'cm4',
    name: 'Turkey Taco Lettuce Wraps',
    description: 'Taco night gets a healthy twist with lettuce wraps instead of shells.',
    ingredients: [
      '1 lb ground turkey',
      '1 packet taco seasoning',
      'Romaine lettuce leaves',
      'Diced tomatoes',
      'Shredded cheese',
      'Avocado slices',
      'Salsa or sour cream'
    ],
    instructions: [
      'Brown turkey in a pan, drain excess fat.',
      'Add taco seasoning and water according to packet instructions.',
      'Simmer for 5 minutes.',
      'Spoon mixture into lettuce leaves.',
      'Top with desired toppings and serve.'
    ],
    prepTimeMinutes: 20,
    dietTypes: ['non-vegetarian', 'low-carb'],
    calories: 250
  },
  {
    id: 'cm5',
    name: 'Black Bean Brownies',
    description: 'Rich, fudgy brownies made with black beans instead of flour. No one will guess the secret ingredient!',
    ingredients: [
      '1 can (15 oz) black beans, drained and rinsed',
      '3 eggs',
      '3 tbsp coconut oil',
      '1/4 cup cocoa powder',
      '2/3 cup sugar',
      '1 tsp vanilla extract',
      '1/2 tsp baking powder',
      '1/4 tsp salt',
      '1/2 cup chocolate chips'
    ],
    instructions: [
      'Preheat oven to 350°F and line an 8x8 pan with parchment paper.',
      'Blend all ingredients except chocolate chips until smooth.',
      'Stir in half the chocolate chips.',
      'Pour batter into prepared pan and sprinkle with remaining chips.',
      'Bake for 25-30 minutes until a toothpick comes out clean.'
    ],
    prepTimeMinutes: 35,
    dietTypes: ['vegetarian', 'gluten-free'],
    calories: 180
  },
  {
    id: 'cm6',
    name: 'Chickpea Chocolate Chip Cookies',
    description: 'Protein-packed cookies made with chickpeas that taste like traditional chocolate chip cookies.',
    ingredients: [
      '1 can (15 oz) chickpeas, drained and rinsed',
      '1/2 cup natural peanut butter',
      '1/3 cup maple syrup or honey',
      '1 tsp vanilla extract',
      '1/2 tsp baking powder',
      '1/4 tsp baking soda',
      'Pinch of salt',
      '1/2 cup chocolate chips'
    ],
    instructions: [
      'Preheat oven to 350°F and line a baking sheet with parchment paper.',
      'Blend all ingredients except chocolate chips until smooth.',
      'Stir in chocolate chips by hand.',
      'Drop spoonfuls onto prepared baking sheet.',
      'Bake for 10-12 minutes until edges are golden.'
    ],
    prepTimeMinutes: 20,
    dietTypes: ['vegetarian', 'vegan', 'gluten-free'],
    calories: 170
  }
];

// Get exercise recommendations based on child profile
export const getExerciseRecommendations = (childProfile: ChildProfile): ExerciseVideo[] => {
  return exerciseVideos.filter(video => {
    // Filter by age range
    const ageMatch = childProfile.age >= video.ageRangeMin && 
                     childProfile.age <= video.ageRangeMax;
    
    // Filter by activity level
    const activityMatch = video.activityLevel.includes(childProfile.activityLevel);
    
    return ageMatch && activityMatch;
  });
};

// Get cheat meal recommendations based on child profile
export const getCheatMealRecommendations = (childProfile: ChildProfile): CheatMealRecipe[] => {
  return cheatMealRecipes.filter(recipe => {
    // Filter by diet type
    return recipe.dietTypes.includes(childProfile.dietType) || 
           (childProfile.dietType === 'non-vegetarian' && recipe.dietTypes.includes('vegetarian'));
  });
};
