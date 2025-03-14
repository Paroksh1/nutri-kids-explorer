import { ChildProfile } from '@/components/onboarding/ChildProfileForm';
import { enhanceRecommendationsWithAI } from '@/services/AIRecommendationService';

// Types for recommendations
export interface ExerciseVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number; // in minutes
  intensity: 'low' | 'moderate' | 'high';
  ageRange: { min: number; max: number };
  tags: string[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  ingredients: string[];
  instructions: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  ageRange: { min: number; max: number };
  tags: string[];
}

// Mock database of exercise videos
const exerciseVideos: ExerciseVideo[] = [
  {
    id: 'ex1',
    title: 'Fun Dance Workout for Kids',
    description: 'A fun and energetic dance workout designed specifically for children to improve coordination and burn energy.',
    thumbnailUrl: 'https://placehold.co/300x200?text=Dance+Workout',
    videoUrl: 'https://example.com/videos/dance-workout',
    duration: 15,
    intensity: 'moderate',
    ageRange: { min: 5, max: 12 },
    tags: ['dance', 'cardio', 'fun', 'coordination']
  },
  {
    id: 'ex2',
    title: 'Yoga for Young Children',
    description: 'Gentle yoga poses that help children improve flexibility, balance, and mindfulness.',
    thumbnailUrl: 'https://placehold.co/300x200?text=Kids+Yoga',
    videoUrl: 'https://example.com/videos/kids-yoga',
    duration: 20,
    intensity: 'low',
    ageRange: { min: 4, max: 10 },
    tags: ['yoga', 'flexibility', 'mindfulness', 'balance']
  },
  {
    id: 'ex3',
    title: 'Playground Circuit Training',
    description: 'Turn any playground into a fun circuit training course with these simple exercises.',
    thumbnailUrl: 'https://placehold.co/300x200?text=Playground+Workout',
    videoUrl: 'https://example.com/videos/playground-circuit',
    duration: 25,
    intensity: 'moderate',
    ageRange: { min: 6, max: 12 },
    tags: ['outdoor', 'strength', 'cardio', 'playground']
  },
  {
    id: 'ex4',
    title: 'Teen Strength Training Basics',
    description: 'Safe and effective strength training exercises designed specifically for teenagers.',
    thumbnailUrl: 'https://placehold.co/300x200?text=Teen+Strength',
    videoUrl: 'https://example.com/videos/teen-strength',
    duration: 30,
    intensity: 'high',
    ageRange: { min: 13, max: 18 },
    tags: ['strength', 'muscle', 'building', 'teens']
  },
  {
    id: 'ex5',
    title: 'HIIT for Active Teens',
    description: 'High-intensity interval training workout that helps teens improve cardiovascular fitness and burn calories.',
    thumbnailUrl: 'https://placehold.co/300x200?text=Teen+HIIT',
    videoUrl: 'https://example.com/videos/teen-hiit',
    duration: 20,
    intensity: 'high',
    ageRange: { min: 14, max: 18 },
    tags: ['hiit', 'cardio', 'calorie', 'burn', 'weight loss']
  },
  {
    id: 'ex6',
    title: 'Toddler Movement Games',
    description: 'Simple and fun movement games that help toddlers develop motor skills and burn energy.',
    thumbnailUrl: 'https://placehold.co/300x200?text=Toddler+Games',
    videoUrl: 'https://example.com/videos/toddler-movement',
    duration: 15,
    intensity: 'low',
    ageRange: { min: 2, max: 5 },
    tags: ['toddler', 'motor skills', 'games', 'development']
  },
  {
    id: 'ex7',
    title: 'Swimming Exercises for Kids',
    description: 'Fun swimming exercises that help children become comfortable in water while getting a full-body workout.',
    thumbnailUrl: 'https://placehold.co/300x200?text=Swimming+Kids',
    videoUrl: 'https://example.com/videos/kids-swimming',
    duration: 25,
    intensity: 'moderate',
    ageRange: { min: 6, max: 14 },
    tags: ['swimming', 'water', 'full-body', 'cardio']
  },
  {
    id: 'ex8',
    title: 'Bodyweight Exercises for Teens',
    description: 'Effective bodyweight exercises that teens can do anywhere to build strength and muscle.',
    thumbnailUrl: 'https://placehold.co/300x200?text=Teen+Bodyweight',
    videoUrl: 'https://example.com/videos/teen-bodyweight',
    duration: 30,
    intensity: 'high',
    ageRange: { min: 13, max: 18 },
    tags: ['bodyweight', 'strength', 'muscle', 'no equipment']
  }
];

// Mock database of healthy recipes
const healthyRecipes: Recipe[] = [
  {
    id: 'recipe1',
    title: 'Rainbow Veggie Wraps',
    description: 'Colorful vegetable wraps that are both nutritious and appealing to children.',
    imageUrl: 'https://placehold.co/300x200?text=Veggie+Wraps',
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    ingredients: [
      '2 whole grain tortillas',
      '4 tbsp hummus',
      '1/4 red bell pepper, sliced',
      '1/4 yellow bell pepper, sliced',
      '1/4 cucumber, sliced',
      '1 carrot, grated',
      '1/2 avocado, sliced'
    ],
    instructions: [
      'Lay tortillas flat and spread hummus evenly over each one',
      'Arrange vegetables in rows across the tortilla',
      'Roll up tightly and slice into pinwheels'
    ],
    nutritionInfo: {
      calories: 320,
      protein: 10,
      carbs: 42,
      fat: 14
    },
    ageRange: { min: 4, max: 12 },
    tags: ['vegetarian', 'lunch', 'vegetables', 'fiber', 'no-cook']
  },
  {
    id: 'recipe2',
    title: 'Protein-Packed Breakfast Smoothie',
    description: 'A delicious smoothie filled with fruits, protein, and hidden vegetables.',
    imageUrl: 'https://placehold.co/300x200?text=Breakfast+Smoothie',
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    ingredients: [
      '1 banana',
      '1 cup spinach',
      '1 cup milk or plant-based alternative',
      '2 tbsp Greek yogurt',
      '1 tbsp nut butter',
      '1 tsp honey (optional)',
      '1/2 cup frozen berries'
    ],
    instructions: [
      'Add all ingredients to a blender',
      'Blend until smooth',
      'Pour into a glass and serve immediately'
    ],
    nutritionInfo: {
      calories: 350,
      protein: 15,
      carbs: 45,
      fat: 12
    },
    ageRange: { min: 2, max: 18 },
    tags: ['breakfast', 'protein', 'calorie-rich', 'fruit', 'vegetable', 'growth']
  },
  {
    id: 'recipe3',
    title: 'Baked Sweet Potato Fries',
    description: 'Crispy baked sweet potato fries that are a healthier alternative to regular french fries.',
    imageUrl: 'https://placehold.co/300x200?text=Sweet+Potato+Fries',
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    ingredients: [
      '2 large sweet potatoes',
      '1 tbsp olive oil',
      '1/2 tsp paprika',
      '1/2 tsp garlic powder',
      'Salt to taste'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C)',
      'Cut sweet potatoes into even fry shapes',
      'Toss with oil and seasonings',
      'Arrange in a single layer on a baking sheet',
      'Bake for 20-25 minutes, flipping halfway through'
    ],
    nutritionInfo: {
      calories: 120,
      protein: 2,
      carbs: 23,
      fat: 3
    },
    ageRange: { min: 1, max: 18 },
    tags: ['side dish', 'vegetable', 'baked', 'low-calorie', 'vitamin A']
  },
  {
    id: 'recipe4',
    title: 'Chicken and Vegetable Stir Fry',
    description: 'A quick and nutritious stir fry with lean protein and plenty of vegetables.',
    imageUrl: 'https://placehold.co/300x200?text=Chicken+Stir+Fry',
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    ingredients: [
      '1 lb boneless, skinless chicken breast, cut into strips',
      '2 cups mixed vegetables (broccoli, bell peppers, carrots)',
      '2 cloves garlic, minced',
      '1 tbsp ginger, grated',
      '2 tbsp low-sodium soy sauce',
      '1 tbsp honey',
      '2 tbsp olive oil',
      '2 cups cooked brown rice for serving'
    ],
    instructions: [
      'Heat 1 tbsp oil in a large pan over medium-high heat',
      'Cook chicken until no longer pink, about 5-7 minutes',
      'Remove chicken and set aside',
      'Add remaining oil, garlic, and ginger to the pan',
      'Add vegetables and stir-fry for 5 minutes',
      'Return chicken to the pan',
      'Mix soy sauce and honey, pour over the stir-fry',
      'Cook for 2 more minutes until sauce thickens',
      'Serve over brown rice'
    ],
    nutritionInfo: {
      calories: 350,
      protein: 30,
      carbs: 35,
      fat: 10
    },
    ageRange: { min: 4, max: 18 },
    tags: ['dinner', 'protein', 'lean-protein', 'vegetables', 'balanced']
  },
  {
    id: 'recipe5',
    title: 'Greek Yogurt Parfait',
    description: 'A protein-rich yogurt parfait with layers of fruit, granola, and honey.',
    imageUrl: 'https://placehold.co/300x200?text=Yogurt+Parfait',
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    ingredients: [
      '2 cups Greek yogurt',
      '1 cup mixed berries',
      '1/2 cup granola',
      '2 tbsp honey',
      '2 tbsp chia seeds'
    ],
    instructions: [
      'In two glasses or bowls, layer yogurt, berries, and granola',
      'Drizzle with honey and sprinkle with chia seeds',
      'Serve immediately or refrigerate for up to 2 hours'
    ],
    nutritionInfo: {
      calories: 300,
      protein: 20,
      carbs: 40,
      fat: 8
    },
    ageRange: { min: 2, max: 18 },
    tags: ['breakfast', 'snack', 'protein', 'fruit', 'calcium', 'no-cook']
  },
  {
    id: 'recipe6',
    title: 'Veggie-Loaded Pasta',
    description: 'Whole grain pasta loaded with vegetables and a light tomato sauce.',
    imageUrl: 'https://placehold.co/300x200?text=Veggie+Pasta',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    ingredients: [
      '8 oz whole grain pasta',
      '1 zucchini, diced',
      '1 bell pepper, diced',
      '1 cup cherry tomatoes, halved',
      '2 cups spinach',
      '2 cloves garlic, minced',
      '1 can (15 oz) low-sodium tomato sauce',
      '2 tbsp olive oil',
      '1/4 cup grated Parmesan cheese'
    ],
    instructions: [
      'Cook pasta according to package directions',
      'In a large pan, heat olive oil over medium heat',
      'Add garlic and sauté for 30 seconds',
      'Add zucchini and bell pepper, cook for 5 minutes',
      'Add cherry tomatoes and spinach, cook until spinach wilts',
      'Pour in tomato sauce and simmer for 5 minutes',
      'Drain pasta and add to the sauce',
      'Toss to combine and top with Parmesan cheese'
    ],
    nutritionInfo: {
      calories: 280,
      protein: 12,
      carbs: 45,
      fat: 8
    },
    ageRange: { min: 3, max: 18 },
    tags: ['dinner', 'vegetable', 'whole grain', 'fiber', 'low-calorie']
  }
];

// Mock "cheat meal" recommendations
export const cheatMealRecommendations = [
  {
    id: 'cheat1',
    name: 'Mini Pizza with Whole Grain Crust',
    description: 'A healthier pizza option with whole grain crust and plenty of vegetables.',
    ingredients: [
      '1 whole grain pita bread or small pizza crust',
      '2 tbsp tomato sauce',
      '1/4 cup shredded mozzarella cheese',
      'Assorted vegetables (bell peppers, mushrooms, spinach)',
      '1 tbsp olive oil'
    ],
    instructions: [
      'Preheat oven to 425°F',
      'Spread tomato sauce on pita bread',
      'Add vegetables and cheese on top',
      'Drizzle with olive oil',
      'Bake for 10-12 minutes until cheese is melted and crust is crispy'
    ],
    prepTimeMinutes: 10,
    calories: 320,
    protein: 15,
    carbs: 38,
    fat: 12
  },
  {
    id: 'cheat2',
    name: 'Baked Sweet Potato Fries',
    description: 'Crispy oven-baked sweet potato fries - a healthier alternative to regular fries.',
    ingredients: [
      '1 large sweet potato',
      '1 tbsp olive oil',
      '1/2 tsp paprika',
      '1/4 tsp garlic powder',
      'Salt to taste'
    ],
    instructions: [
      'Preheat oven to 425°F',
      'Cut sweet potato into even fry shapes',
      'Toss with oil and seasonings',
      'Arrange in a single layer on a baking sheet',
      'Bake for 20-25 minutes, flipping halfway through'
    ],
    prepTimeMinutes: 10,
    calories: 150,
    protein: 2,
    carbs: 23,
    fat: 5
  },
  {
    id: 'cheat3',
    name: 'Greek Yogurt Parfait with Chocolate',
    description: 'A sweet treat that combines protein-rich yogurt with a bit of chocolate and fruit.',
    ingredients: [
      '1 cup Greek yogurt',
      '1 tbsp honey',
      '1 tbsp dark chocolate chips',
      '1/2 cup mixed berries',
      '2 tbsp granola'
    ],
    instructions: [
      'Layer Greek yogurt in a bowl or glass',
      'Top with berries, granola, and chocolate chips',
      'Drizzle with honey',
      'Enjoy immediately or chill for 30 minutes'
    ],
    prepTimeMinutes: 5,
    calories: 280,
    protein: 18,
    carbs: 32,
    fat: 10
  },
  {
    id: 'cheat4',
    name: 'Homemade Fruit Popsicles',
    description: 'Refreshing frozen treats made with real fruit and yogurt.',
    ingredients: [
      '2 cups mixed berries or fruit',
      '1/2 cup Greek yogurt',
      '2 tbsp honey or maple syrup',
      '1/4 cup fruit juice'
    ],
    instructions: [
      'Blend all ingredients until smooth',
      'Pour into popsicle molds',
      'Freeze for at least 4 hours',
      'Run mold under warm water to release popsicle'
    ],
    prepTimeMinutes: 10,
    calories: 85,
    protein: 3,
    carbs: 18,
    fat: 1
  },
  {
    id: 'cheat5',
    name: 'Banana Oat Cookies',
    description: 'Simple cookies made with just a few healthy ingredients.',
    ingredients: [
      '2 ripe bananas',
      '1 cup rolled oats',
      '1/4 cup dark chocolate chips',
      '1/4 cup chopped nuts (optional)',
      '1 tsp cinnamon'
    ],
    instructions: [
      'Preheat oven to 350°F',
      'Mash bananas in a bowl',
      'Stir in oats, chocolate chips, nuts, and cinnamon',
      'Drop spoonfuls onto a baking sheet',
      'Bake for 12-15 minutes'
    ],
    prepTimeMinutes: 10,
    calories: 120,
    protein: 3,
    carbs: 18,
    fat: 5
  }
];

// User preferences storage
const userPreferences: Record<string, {
  exercisePreferences: Record<string, number>,
  mealPreferences: Record<string, number>
}> = {};

// Helper function to get a seeded random subset of videos/recipes
const getSeededRandomSubset = (array: any[], count: number, seed: number): any[] => {
  // Simple seeded random function
  const seededRandom = (max: number, min = 0) => {
    const x = Math.sin(seed++) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
  };
  
  // Create a copy of the array to avoid modifying the original
  const arrayCopy = [...array];
  const result = [];
  
  // Get 'count' random items
  for (let i = 0; i < count && arrayCopy.length > 0; i++) {
    const randomIndex = seededRandom(arrayCopy.length - 1);
    result.push(arrayCopy[randomIndex]);
    arrayCopy.splice(randomIndex, 1);
  }
  
  return result;
};

/**
 * Recommends exercise videos based on child's profile and health status
 * Now enhanced with AI personalization
 */
export const getExerciseRecommendations = async (childProfile: ChildProfile, date = new Date()): Promise<{
  recommendations: ExerciseVideo[],
  aiExplanation: string,
  personalizationScore: number
}> => {
  const { age } = childProfile;
  
  // Calculate BMI and determine health status
  const bmi = childProfile.weight / ((childProfile.height / 100) ** 2);
  let healthStatus = "healthy";
  
  if (bmi < 18.5) {
    healthStatus = "underweight";
  } else if (bmi >= 25 && bmi < 30) {
    healthStatus = "overweight";
  } else if (bmi >= 30) {
    healthStatus = "obese";
  }
  
  // Filter by age appropriateness
  const filtered = exerciseVideos.filter(video => 
    age >= video.ageRange.min && age <= video.ageRange.max
  );

  // Filter by health status - different exercise types for different health needs
  let healthStatusFiltered = filtered;

  // Determine what type of exercises to recommend based on health status
  if (healthStatus === "underweight") {
    // For underweight: Focus on strength building exercises
    healthStatusFiltered = filtered.filter(video => 
      video.tags.some(tag => ['strength', 'muscle', 'building', 'protein', 'growth'].includes(tag.toLowerCase()))
    );
  } else if (healthStatus === "overweight" || healthStatus === "obese") {
    // For overweight/obese: Focus on cardio and weight management
    healthStatusFiltered = filtered.filter(video => 
      video.tags.some(tag => ['cardio', 'calorie', 'burn', 'weight loss', 'hiit'].includes(tag.toLowerCase()))
    );
  } else {
    // For healthy: Balanced mix of exercises
    healthStatusFiltered = filtered;
  }

  // If we have less than the requested number after filtering, fall back to the age-appropriate list
  if (healthStatusFiltered.length < 3) {
    healthStatusFiltered = filtered;
  }

  // Use the current date as seed for random selection (changes daily)
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  
  const baseRecommendations = getSeededRandomSubset(healthStatusFiltered, 3, seed);
  
  // Get user preferences for AI enhancement
  const preferences = userPreferences[childProfile.id]?.exercisePreferences || {};
  
  // Enhance with AI (add personalization)
  const enhancedResults = await enhanceRecommendationsWithAI(
    childProfile,
    baseRecommendations,
    'exercise',
    preferences
  );
  
  return {
    recommendations: enhancedResults.enhancedRecommendations,
    aiExplanation: enhancedResults.explanation,
    personalizationScore: enhancedResults.personalizationScore
  };
};

/**
 * Recommends "cheat meal" recipes that are still relatively healthy
 * Now enhanced with AI personalization
 */
export const getCheatMealRecommendations = async (childProfile: ChildProfile, date = new Date()): Promise<{
  recommendations: any[],
  aiExplanation: string,
  personalizationScore: number
}> => {
  // Use the current date as seed for random selection (changes daily)
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  
  // Get user preferences to potentially influence recommendations
  const preferences = userPreferences[childProfile.id]?.mealPreferences || {};
  
  // Get a random subset of the cheat meals
  const baseRecommendations = getSeededRandomSubset(cheatMealRecommendations, 3, seed);
  
  // Enhance with AI (add personalization)
  const enhancedResults = await enhanceRecommendationsWithAI(
    childProfile,
    baseRecommendations,
    'recipe',
    preferences
  );
  
  return {
    recommendations: enhancedResults.enhancedRecommendations,
    aiExplanation: enhancedResults.explanation,
    personalizationScore: enhancedResults.personalizationScore
  };
};

/**
 * Recommends recipes based on child's profile and health status
 * Now enhanced with AI personalization
 */
export const getRecipeRecommendations = async (childProfile: ChildProfile, date = new Date()): Promise<{
  recommendations: Recipe[],
  aiExplanation: string,
  personalizationScore: number
}> => {
  const { age } = childProfile;
  
  // Calculate BMI and determine health status
  const bmi = childProfile.weight / ((childProfile.height / 100) ** 2);
  let healthStatus = "healthy";
  
  if (bmi < 18.5) {
    healthStatus = "underweight";
  } else if (bmi >= 25 && bmi < 30) {
    healthStatus = "overweight";
  } else if (bmi >= 30) {
    healthStatus = "obese";
  }
  
  // Filter by age appropriateness
  const filtered = healthyRecipes.filter(recipe => 
    age >= recipe.ageRange.min && age <= recipe.ageRange.max
  );

  // Filter by health status - different dietary needs based on health assessment
  let healthStatusFiltered = filtered;
  
  if (healthStatus === "underweight") {
    // For underweight: Higher calorie, protein-rich foods
    healthStatusFiltered = filtered.filter(recipe => 
      recipe.tags.some(tag => ['protein', 'calorie-rich', 'nutritious', 'growth'].includes(tag.toLowerCase()))
    );
  } else if (healthStatus === "overweight" || healthStatus === "obese") {
    // For overweight/obese: Lower calorie, nutrient-dense foods
    healthStatusFiltered = filtered.filter(recipe => 
      recipe.tags.some(tag => ['low-calorie', 'fiber', 'lean-protein', 'vegetable'].includes(tag.toLowerCase()))
    );
  } else {
    // For healthy: Balanced nutrition
    healthStatusFiltered = filtered;
  }

  // If we have less than the requested number after filtering, fall back to the age-appropriate list
  if (healthStatusFiltered.length < 3) {
    healthStatusFiltered = filtered;
  }

  // Use the current date as seed for random selection (changes daily)
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  
  const baseRecommendations = getSeededRandomSubset(healthStatusFiltered, 3, seed);
  
  // Get user preferences for AI enhancement
  const preferences = userPreferences[childProfile.id]?.mealPreferences || {};
  
  // Enhance with AI (add personalization)
  const enhancedResults = await enhanceRecommendationsWithAI(
    childProfile,
    baseRecommendations,
    'recipe',
    preferences
  );
  
  return {
    recommendations: enhancedResults.enhancedRecommendations,
    aiExplanation: enhancedResults.explanation,
    personalizationScore: enhancedResults.personalizationScore
  };
};

/**
 * Records a user preference for a meal or exercise
 */
export const recordPreference = (
  childId: string, 
  itemId: string, 
  rating: number, 
  type: 'meal' | 'exercise'
): void => {
  // Initialize if not exists
  if (!userPreferences[childId]) {
    userPreferences[childId] = {
      exercisePreferences: {},
      mealPreferences: {}
    };
  }
  
  // Record preference
  if (type === 'meal') {
    userPreferences[childId].mealPreferences[itemId] = rating;
  } else {
    userPreferences[childId].exercisePreferences[itemId] = rating;
  }
  
  // In a real app, this would be persisted to a database
  console.log(`Recorded ${type} preference for child ${childId}: ${itemId} = ${rating}`);
};

/**
 * Gets user preferences for meals and exercises
 */
export const getPreferences = (childId: string) => {
  return userPreferences[childId] || {
    exercisePreferences: {},
    mealPreferences: {}
  };
};

export default {
  getExerciseRecommendations,
  getRecipeRecommendations,
  getCheatMealRecommendations,
  recordPreference,
  getPreferences
};
