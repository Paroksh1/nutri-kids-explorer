import { ChildProfile } from '../onboarding/ChildProfileForm';
import { assessChildHealth } from '@/utils/healthAssessment';

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

// ML recommendation enhancement interfaces
interface MLWeights {
  age: number;
  activityLevel: number;
  recentPreferences: number;
}

interface UserPreference {
  userId: string;
  exercisePreferences: {
    [videoId: string]: number;  // Score from 0-10
  };
  mealPreferences: {
    [recipeId: string]: number;  // Score from 0-10
  };
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
  },
  {
    id: 'ex9',
    title: 'Fun Weight Gain Activities for Underweight Kids',
    description: 'Gentle strength-building activities designed for underweight children to build muscle and increase appetite.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    durationMinutes: 18,
    ageRangeMin: 5,
    ageRangeMax: 14,
    activityLevel: ['light', 'moderate'],
    tags: ['strength', 'underweight', 'muscle-building']
  },
  {
    id: 'ex10',
    title: 'Kid-Friendly Cardio for Weight Management',
    description: 'Fun cardio exercises that help with weight management while keeping children engaged and motivated.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    durationMinutes: 20,
    ageRangeMin: 6,
    ageRangeMax: 15,
    activityLevel: ['moderate', 'active'],
    tags: ['cardio', 'weight-loss', 'fat-burning']
  },
  {
    id: 'ex11',
    title: 'Balanced Fitness Routine for Healthy Kids',
    description: 'A well-rounded fitness routine for children at a healthy weight that focuses on strength, flexibility, and endurance.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    durationMinutes: 25,
    ageRangeMin: 7,
    ageRangeMax: 16,
    activityLevel: ['moderate', 'active'],
    tags: ['balanced', 'maintenance', 'fitness']
  },
  {
    id: 'ex12',
    title: 'Family-Friendly Weight Management Activities',
    description: 'Exercise routines that the whole family can do together to support a child who needs to manage their weight.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    durationMinutes: 30,
    ageRangeMin: 5,
    ageRangeMax: 17,
    activityLevel: ['moderate', 'active'],
    tags: ['family', 'weight-loss', 'overweight']
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
  },
  {
    id: 'cm7',
    name: 'Protein-Packed Pancakes for Weight Gain',
    description: 'Delicious, high-protein pancakes perfect for supporting healthy weight gain in underweight children.',
    ingredients: [
      '1 cup oat flour',
      '2 scoops vanilla protein powder',
      '1 banana',
      '2 eggs',
      '1/2 cup Greek yogurt',
      '1 tbsp honey',
      '1/2 tsp baking powder',
      'Pinch of salt'
    ],
    instructions: [
      'Blend all ingredients until smooth.',
      'Heat a non-stick pan over medium heat.',
      'Pour batter to form pancakes.',
      'Cook until bubbles form, then flip.',
      'Serve with fresh fruit and a drizzle of honey.'
    ],
    prepTimeMinutes: 15,
    dietTypes: ['vegetarian', 'non-vegetarian'],
    calories: 350
  },
  {
    id: 'cm8',
    name: 'Balanced Energy Bowl for Healthy Kids',
    description: 'A perfectly balanced bowl with whole grains, veggies, and protein to maintain a healthy weight.',
    ingredients: [
      '1/2 cup quinoa',
      '1/4 cup black beans',
      '1/4 cup corn',
      '1/4 cup cherry tomatoes',
      '1/4 avocado',
      '2 tbsp cilantro',
      'Juice of 1/2 lime',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Cook quinoa according to package instructions.',
      'Mix quinoa with beans and corn.',
      'Top with sliced cherry tomatoes and avocado.',
      'Sprinkle with cilantro and drizzle with lime juice.',
      'Season with salt and pepper.'
    ],
    prepTimeMinutes: 20,
    dietTypes: ['vegetarian', 'vegan', 'non-vegetarian'],
    calories: 290
  },
  {
    id: 'cm9',
    name: 'Lighter Pizza Pockets for Weight Management',
    description: 'Kid-friendly pizza pockets with a lightened-up twist to help with weight management.',
    ingredients: [
      'Whole wheat pita pockets',
      '1/4 cup low-sodium marinara sauce',
      '1/2 cup part-skim mozzarella',
      'Vegetables of choice (bell peppers, spinach, mushrooms)',
      'Italian seasoning'
    ],
    instructions: [
      'Preheat oven to 375°F.',
      'Cut pita pockets in half to form two pouches.',
      'Fill each with sauce, cheese, and veggies.',
      'Sprinkle with Italian seasoning.',
      'Bake for 10-12 minutes until cheese melts.'
    ],
    prepTimeMinutes: 15,
    dietTypes: ['vegetarian', 'non-vegetarian'],
    calories: 220
  }
];

// In-memory storage for ML-based preferences
let userPreferences: Record<string, UserPreference> = {};

// Initialize preferences from localStorage
const initializePreferences = () => {
  const storedPreferences = localStorage.getItem('userPreferences');
  if (storedPreferences) {
    userPreferences = JSON.parse(storedPreferences);
  }
};

// Call initialize on module load
initializePreferences();

// Base recommendations with health status consideration
const getBaseExerciseRecommendations = (childProfile: ChildProfile): ExerciseVideo[] => {
  // Get health assessment
  const healthAssessment = assessChildHealth(childProfile);
  
  return exerciseVideos.filter(video => {
    // Filter by age range
    const ageMatch = childProfile.age >= video.ageRangeMin && 
                     childProfile.age <= video.ageRangeMax;
    
    // Filter by activity level
    const activityMatch = video.activityLevel.includes(childProfile.activityLevel);
    
    // Health status matching
    let healthMatch = true;
    if (healthAssessment.status === 'underweight' && video.tags.includes('underweight')) {
      healthMatch = true;
    } else if (healthAssessment.status === 'healthy' && 
               (video.tags.includes('maintenance') || video.tags.includes('balanced'))) {
      healthMatch = true;
    } else if ((healthAssessment.status === 'overweight' || healthAssessment.status === 'obese') && 
               (video.tags.includes('weight-loss') || video.tags.includes('fat-burning'))) {
      healthMatch = true;
    } else {
      // If no specific health tags match, still include basic exercise videos
      healthMatch = !video.tags.some(tag => 
        ['underweight', 'weight-loss', 'fat-burning', 'maintenance'].includes(tag)
      );
    }
    
    return ageMatch && activityMatch && healthMatch;
  });
};

// Base recommendations with health status consideration
const getBaseCheatMealRecommendations = (childProfile: ChildProfile): CheatMealRecipe[] => {
  // Get health assessment
  const healthAssessment = assessChildHealth(childProfile);
  
  return cheatMealRecipes.filter(recipe => {
    // Filter by diet type
    const dietMatch = recipe.dietTypes.includes(childProfile.dietType) || 
                     (childProfile.dietType === 'non-vegetarian' && recipe.dietTypes.includes('vegetarian'));
    
    // Apply calorie considerations based on health status
    let calorieMatch = true;
    if (healthAssessment.status === 'underweight' && recipe.calories > 300) {
      calorieMatch = true;
    } else if (healthAssessment.status === 'healthy') {
      calorieMatch = true;
    } else if (healthAssessment.status === 'overweight' && recipe.calories < 300) {
      calorieMatch = true;
    } else if (healthAssessment.status === 'obese' && recipe.calories < 250) {
      calorieMatch = true;
    } else {
      // If nothing specific matches, be more lenient for healthy status
      calorieMatch = healthAssessment.status === 'healthy';
    }
    
    return dietMatch && calorieMatch;
  });
};

// Get today's date as string in YYYY-MM-DD format
const getTodayDateString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Function to get seed based on date and child ID for consistent randomization within a day
const getDailySeed = (childId: string): number => {
  const today = getTodayDateString();
  const seedString = childId + today;
  let seed = 0;
  for (let i = 0; i < seedString.length; i++) {
    seed += seedString.charCodeAt(i);
  }
  return seed;
};

// Pseudorandom number generator with seed
const seededRandom = (seed: number): () => number => {
  let currentSeed = seed;
  return () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };
};

// ML-enhanced recommendations with collaborative filtering and daily rotation
export const getExerciseRecommendations = (childProfile: ChildProfile): ExerciseVideo[] => {
  // Get base recommendations
  const baseRecommendations = getBaseExerciseRecommendations(childProfile);
  
  // Get user preferences or create new ones
  const userId = childProfile.id;
  if (!userPreferences[userId]) {
    userPreferences[userId] = {
      userId,
      exercisePreferences: {},
      mealPreferences: {}
    };
  }
  
  // Apply ML-based scoring and sorting
  const scoredRecommendations = baseRecommendations.map(video => {
    // Start with a base score
    let score = 5;
    
    // Apply user preferences if they exist
    if (userPreferences[userId].exercisePreferences[video.id]) {
      score = userPreferences[userId].exercisePreferences[video.id];
    }
    
    // Apply collaborative filtering logic
    // Find similar users based on age and activity level
    const similarUsers = Object.values(userPreferences).filter(pref => {
      // Skip the current user
      if (pref.userId === userId) return false;
      
      // Check if there are any matching preferences
      return Object.keys(pref.exercisePreferences).some(id => 
        baseRecommendations.some(rec => rec.id === id)
      );
    });
    
    // Adjust score based on similar users' preferences
    if (similarUsers.length > 0) {
      let similarityScore = 0;
      similarUsers.forEach(user => {
        if (user.exercisePreferences[video.id]) {
          similarityScore += user.exercisePreferences[video.id];
        }
      });
      
      // Average the similarity score and combine with base score
      if (similarityScore > 0) {
        const avgSimilarityScore = similarityScore / similarUsers.length;
        // Weight of 0.3 for collaborative filtering
        score = 0.7 * score + 0.3 * avgSimilarityScore;
      }
    }
    
    // Consider video tags matching with user preferences
    const preferredTags = Object.keys(userPreferences[userId].exercisePreferences)
      .flatMap(id => exerciseVideos.find(v => v.id === id)?.tags || []);
    
    // Count matching tags
    const matchingTags = video.tags.filter(tag => preferredTags.includes(tag)).length;
    if (matchingTags > 0 && preferredTags.length > 0) {
      const tagScore = (matchingTags / video.tags.length) * 10;
      // Weight of 0.2 for tag matching
      score = 0.8 * score + 0.2 * tagScore;
    }
    
    return { video, score };
  });
  
  // Sort by score (descending)
  const sortedRecommendations = scoredRecommendations
    .sort((a, b) => b.score - a.score)
    .map(item => item.video);
  
  // Use today's date and child ID to create a deterministic but daily-changing selection
  const dailySeed = getDailySeed(childProfile.id);
  const random = seededRandom(dailySeed);
  
  // Create daily subsets based on health status
  const healthAssessment = assessChildHealth(childProfile);
  
  // Split videos by health focus
  const healthFocusedVideos = sortedRecommendations.filter(video => {
    if (healthAssessment.status === 'underweight' && video.tags.includes('underweight')) {
      return true;
    } else if (healthAssessment.status === 'healthy' && 
              (video.tags.includes('maintenance') || video.tags.includes('balanced'))) {
      return true;
    } else if ((healthAssessment.status === 'overweight' || healthAssessment.status === 'obese') && 
              (video.tags.includes('weight-loss') || video.tags.includes('fat-burning'))) {
      return true;
    }
    return false;
  });
  
  const generalVideos = sortedRecommendations.filter(video => 
    !healthFocusedVideos.includes(video)
  );
  
  // Select videos for today
  const dailyVideos: ExerciseVideo[] = [];
  
  // Prioritize health-focused videos (1-2)
  const numHealthFocused = Math.min(2, healthFocusedVideos.length);
  for (let i = 0; i < numHealthFocused; i++) {
    const index = Math.floor(random() * healthFocusedVideos.length);
    dailyVideos.push(healthFocusedVideos[index]);
    healthFocusedVideos.splice(index, 1); // Remove selected video
  }
  
  // Fill remaining slots with general videos
  const totalVideosNeeded = 3; // We want 3 videos per day
  while (dailyVideos.length < totalVideosNeeded && generalVideos.length > 0) {
    const index = Math.floor(random() * generalVideos.length);
    dailyVideos.push(generalVideos[index]);
    generalVideos.splice(index, 1); // Remove selected video
  }
  
  return dailyVideos;
};

// ML-enhanced recommendations for cheat meals with daily rotation
export const getCheatMealRecommendations = (childProfile: ChildProfile): CheatMealRecipe[] => {
  // Get base recommendations
  const baseRecommendations = getBaseCheatMealRecommendations(childProfile);
  
  // Get user preferences or create new ones
  const userId = childProfile.id;
  if (!userPreferences[userId]) {
    userPreferences[userId] = {
      userId,
      exercisePreferences: {},
      mealPreferences: {}
    };
  }
  
  // Apply ML-based scoring and sorting
  const scoredRecommendations = baseRecommendations.map(recipe => {
    // Start with a base score
    let score = 5;
    
    // Apply user preferences if they exist
    if (userPreferences[userId].mealPreferences[recipe.id]) {
      score = userPreferences[userId].mealPreferences[recipe.id];
    }
    
    // Apply collaborative filtering logic
    // Find similar users based on diet type preferences
    const similarUsers = Object.values(userPreferences).filter(pref => {
      // Skip the current user
      if (pref.userId === userId) return false;
      
      // Check if there are any matching preferences
      return Object.keys(pref.mealPreferences).some(id => 
        baseRecommendations.some(rec => rec.id === id)
      );
    });
    
    // Adjust score based on similar users' preferences
    if (similarUsers.length > 0) {
      let similarityScore = 0;
      similarUsers.forEach(user => {
        if (user.mealPreferences[recipe.id]) {
          similarityScore += user.mealPreferences[recipe.id];
        }
      });
      
      // Average the similarity score and combine with base score
      if (similarityScore > 0) {
        const avgSimilarityScore = similarityScore / similarUsers.length;
        // Weight of 0.3 for collaborative filtering
        score = 0.7 * score + 0.3 * avgSimilarityScore;
      }
    }
    
    // Consider calorie preferences based on previous choices
    const preferredRecipeIds = Object.keys(userPreferences[userId].mealPreferences);
    if (preferredRecipeIds.length > 0) {
      const avgPreferredCalories = preferredRecipeIds
        .map(id => cheatMealRecipes.find(r => r.id === id)?.calories || 0)
        .reduce((sum, cal) => sum + cal, 0) / preferredRecipeIds.length;
      
      // Calculate how close this recipe is to preferred calorie level
      const calorieDistance = Math.abs(recipe.calories - avgPreferredCalories) / 500; // Normalize to 0-1 range
      const calorieScore = 10 * (1 - calorieDistance); // Convert to 0-10 score
      
      // Weight of 0.2 for calorie matching
      score = 0.8 * score + 0.2 * Math.max(0, Math.min(10, calorieScore));
    }
    
    return { recipe, score };
  });
  
  // Sort by score (descending)
  const sortedRecommendations = scoredRecommendations
    .sort((a, b) => b.score - a.score)
    .map(item => item.recipe);
  
  // Use today's date and child ID to create a deterministic but daily-changing selection
  const dailySeed = getDailySeed(childProfile.id);
  const random = seededRandom(dailySeed);
  
  // Get health assessment
  const healthAssessment = assessChildHealth(childProfile);
  
  // Split recipes by health focus
  const healthFocusedRecipes = sortedRecommendations.filter(recipe => {
    if (healthAssessment.status === 'underweight' && recipe.calories > 300) {
      return true;
    } else if (healthAssessment.status === 'healthy') {
      return recipe.calories >= 200 && recipe.calories <= 350;
    } else if (healthAssessment.status === 'overweight' && recipe.calories < 300) {
      return true;
    } else if (healthAssessment.status === 'obese' && recipe.calories < 250) {
      return true;
    }
    return false;
  });
  
  const otherRecipes = sortedRecommendations.filter(recipe => 
    !healthFocusedRecipes.includes(recipe)
  );
  
  // Select recipes for today
  const dailyRecipes: CheatMealRecipe[] = [];
  
  // Prioritize health-focused recipes (at least 2)
  const numHealthFocused = Math.min(2, healthFocusedRecipes.length);
  for (let i = 0; i < numHealthFocused; i++) {
    const index = Math.floor(random() * healthFocusedRecipes.length);
    dailyRecipes.push(healthFocusedRecipes[index]);
    healthFocusedRecipes.splice(index, 1); // Remove selected recipe
  }
  
  // Fill remaining slots with other recipes
  const totalRecipesNeeded = 3; // We want 3 recipes per day
  while (dailyRecipes.length < totalRecipesNeeded && otherRecipes.length > 0) {
    const index = Math.floor(random() * otherRecipes.length);
    dailyRecipes.push(otherRecipes[index]);
    otherRecipes.splice(index, 1); // Remove selected recipe
  }
  
  return dailyRecipes;
};

// Add a preference for a video or recipe
export const recordPreference = (
  childId: string, 
  itemId: string, 
  score: number, 
  type: 'exercise' | 'meal'
): void => {
  // Ensure user preferences exist
  if (!userPreferences[childId]) {
    userPreferences[childId] = {
      userId: childId,
      exercisePreferences: {},
      mealPreferences: {}
    };
  }
  
  // Update the preference
  if (type === 'exercise') {
    userPreferences[childId].exercisePreferences[itemId] = score;
  } else {
    userPreferences[childId].mealPreferences[itemId] = score;
  }
  
  // Save to localStorage
  localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
};

// Get current preferences for a child
export const getPreferences = (childId: string): UserPreference | null => {
  return userPreferences[childId] || null;
};

// Export health assessment function for use in components
export const getHealthAssessment = (childProfile: ChildProfile) => {
  return assessChildHealth(childProfile);
};
