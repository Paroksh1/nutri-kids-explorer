/**
 * Utility functions for Dietary Diversity calculations
 */

// Food groups as defined by WHO for minimum dietary diversity for women (MDD-W) and children (MDD)
export enum FoodGroup {
  STARCHY_STAPLES = "Starchy Staples",
  PULSES = "Beans, Peas and Lentils",
  NUTS_AND_SEEDS = "Nuts and Seeds",
  DAIRY = "Dairy Products",
  FLESH_FOODS = "Flesh Foods",
  EGGS = "Eggs",
  VITAMIN_A_RICH_FRUITS_AND_VEGETABLES = "Vitamin A-rich Fruits and Vegetables",
  OTHER_FRUITS_AND_VEGETABLES = "Other Fruits and Vegetables"
}

export interface ConsumedFood {
  name: string;
  group: FoodGroup;
  category?: string;
}

// Function to count unique food groups from consumed foods
export function countFoodGroups(consumedFoods: ConsumedFood[]): number {
  const uniqueGroups = new Set<FoodGroup>();
  
  for (const food of consumedFoods) {
    uniqueGroups.add(food.group);
  }
  
  return uniqueGroups.size;
}

// Function to calculate dietary diversity score based on WHO standards
export function calculateDietaryDiversityScore(consumedFoods: ConsumedFood[], isChild: boolean = false): number {
  const uniqueGroupsCount = countFoodGroups(consumedFoods);
  
  // For children (MDD): minimum score is 4 out of 7 food groups for adequate diversity
  // For women (MDD-W): minimum score is 5 out of 10 food groups for adequate diversity
  return uniqueGroupsCount;
}

// Get the recommended minimum number of food groups based on whether it's for a child
export function getRecommendedMinimumFoodGroups(isChild: boolean = false): number {
  return isChild ? 4 : 5;
}

// Determine if the dietary diversity is adequate based on WHO standards
export function isDietaryDiversityAdequate(consumedFoods: ConsumedFood[], isChild: boolean = false): boolean {
  const score = calculateDietaryDiversityScore(consumedFoods, isChild);
  const minimumRecommended = getRecommendedMinimumFoodGroups(isChild);
  
  return score >= minimumRecommended;
}

// Count consumed foods in each group and return a mapping
export function countFoodsInGroups(consumedFoods: ConsumedFood[]): Record<FoodGroup, number> {
  const counts: Record<FoodGroup, number> = {
    [FoodGroup.STARCHY_STAPLES]: 0,
    [FoodGroup.PULSES]: 0,
    [FoodGroup.NUTS_AND_SEEDS]: 0,
    [FoodGroup.DAIRY]: 0,
    [FoodGroup.FLESH_FOODS]: 0,
    [FoodGroup.EGGS]: 0,
    [FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES]: 0,
    [FoodGroup.OTHER_FRUITS_AND_VEGETABLES]: 0
  };
  
  for (const food of consumedFoods) {
    counts[food.group]++;
  }
  
  return counts;
}

// Get missing food groups based on consumed foods
export function getMissingFoodGroups(consumedFoods: ConsumedFood[]): FoodGroup[] {
  const counts = countFoodsInGroups(consumedFoods);
  const missing: FoodGroup[] = [];
  
  for (const group in counts) {
    if (counts[group as FoodGroup] === 0) {
      missing.push(group as FoodGroup);
    }
  }
  
  return missing;
}

// Get examples of foods for each food group
export function getFoodExamples(group: FoodGroup): string[] {
  switch(group) {
    case FoodGroup.STARCHY_STAPLES:
      return ['Rice', 'Bread', 'Pasta', 'Potato', 'Corn', 'Oats'];
    case FoodGroup.PULSES:
      return ['Beans', 'Lentils', 'Chickpeas', 'Tofu', 'Peas'];
    case FoodGroup.NUTS_AND_SEEDS:
      return ['Almonds', 'Walnuts', 'Peanuts', 'Sesame seeds', 'Chia seeds'];
    case FoodGroup.DAIRY:
      return ['Milk', 'Yogurt', 'Cheese', 'Curd', 'Paneer'];
    case FoodGroup.FLESH_FOODS:
      return ['Chicken', 'Fish', 'Beef', 'Lamb', 'Pork', 'Seafood'];
    case FoodGroup.EGGS:
      return ['Chicken eggs', 'Duck eggs', 'Quail eggs', 'Omelette'];
    case FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES:
      return ['Carrots', 'Sweet potatoes', 'Spinach', 'Mango', 'Papaya'];
    case FoodGroup.OTHER_FRUITS_AND_VEGETABLES:
      return ['Apple', 'Banana', 'Orange', 'Tomato', 'Cucumber', 'Broccoli'];
    default:
      return [];
  }
}

// Get a list of foods consumed from each food group
export function getFoodsInGroups(consumedFoods: ConsumedFood[]): Record<FoodGroup, string[]> {
  const foods: Record<FoodGroup, string[]> = {
    [FoodGroup.STARCHY_STAPLES]: [],
    [FoodGroup.PULSES]: [],
    [FoodGroup.NUTS_AND_SEEDS]: [],
    [FoodGroup.DAIRY]: [],
    [FoodGroup.FLESH_FOODS]: [],
    [FoodGroup.EGGS]: [],
    [FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES]: [],
    [FoodGroup.OTHER_FRUITS_AND_VEGETABLES]: []
  };
  
  for (const food of consumedFoods) {
    foods[food.group].push(food.name);
  }
  
  return foods;
}

// Map a food name to its food group using the food database
import { foodMapping } from './foodNameMapper';

export function mapFoodToGroup(foodName: string): ConsumedFood | null {
  // Normalize the food name by converting to lowercase and trimming
  const normalizedFoodName = foodName.toLowerCase().trim();
  
  // Check if the food exists in our mapping
  if (normalizedFoodName in foodMapping) {
    const mappedFood = foodMapping[normalizedFoodName];
    return {
      name: mappedFood.name,
      group: mappedFood.group,
      category: mappedFood.category
    };
  }
  
  // If the food doesn't exist in our mapping, try a fuzzy match
  const similarFoods = findSimilarFoods(normalizedFoodName, Object.keys(foodMapping));
  if (similarFoods.length > 0) {
    // Return the most similar food's mapping
    const mostSimilarFood = similarFoods[0];
    const mappedFood = foodMapping[mostSimilarFood.toLowerCase()];
    return {
      name: mappedFood.name,
      group: mappedFood.group,
      category: mappedFood.category
    };
  }
  
  // If no match is found, return null
  return null;
}

// Generate recommendations based on missing food groups
export function generateRecommendations(consumedFoods: ConsumedFood[]): string[] {
  const missing = getMissingFoodGroups(consumedFoods);
  const recommendations: string[] = [];
  
  if (missing.length === 0) {
    recommendations.push("Great job! You've included all major food groups in your diet.");
    return recommendations;
  }
  
  recommendations.push("To improve dietary diversity, consider adding foods from these groups:");
  
  for (const group of missing) {
    const examples = getFoodExamples(group).join(', ');
    recommendations.push(`- ${group}: Examples include ${examples}`);
  }
  
  return recommendations;
}

// Calculate percentage of dietary diversity achieved
export function calculateDietaryDiversityPercentage(consumedFoods: ConsumedFood[], isChild: boolean = false): number {
  const score = calculateDietaryDiversityScore(consumedFoods, isChild);
  const totalGroups = Object.keys(FoodGroup).length / 2; // Divide by 2 because enum has both string and numeric keys
  
  return Math.round((score / totalGroups) * 100);
}

// Calculate recommendations for age-specific dietary needs
export function calculateAgeSpecificRecommendations(consumedFoods: ConsumedFood[], ageInYears: number): string[] {
  const recommendations: string[] = [];
  const missingGroups = getMissingFoodGroups(consumedFoods);
  
  // Early childhood (0-5 years)
  if (ageInYears <= 5) {
    recommendations.push("For young children, focus on nutrient-dense foods to support growth and development.");
    
    if (missingGroups.includes(FoodGroup.DAIRY)) {
      recommendations.push("Calcium is crucial for bone development. Include milk, yogurt or cheese daily.");
    }
    
    if (missingGroups.includes(FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES)) {
      recommendations.push("Vitamin A is essential for vision and immune function. Include carrots, sweet potatoes or mangoes.");
    }
    
    if (missingGroups.includes(FoodGroup.FLESH_FOODS) && missingGroups.includes(FoodGroup.PULSES)) {
      recommendations.push("Include iron-rich foods like meat, fish, beans or lentils to prevent anemia.");
    }
  }
  // School-age children (6-12 years)
  else if (ageInYears <= 12) {
    recommendations.push("School-age children need balanced nutrition to support learning and physical activity.");
    
    if (missingGroups.includes(FoodGroup.DAIRY)) {
      recommendations.push("Calcium and protein from dairy products support bone growth during this rapid growth period.");
    }
    
    if (missingGroups.includes(FoodGroup.STARCHY_STAPLES)) {
      recommendations.push("Complex carbohydrates provide energy for active school days. Include whole grains when possible.");
    }
    
    if (countFoodsInGroups(consumedFoods)[FoodGroup.OTHER_FRUITS_AND_VEGETABLES] < 2) {
      recommendations.push("Aim for multiple servings of fruits and vegetables daily to get sufficient fiber and vitamins.");
    }
  }
  // Adolescents (13-18 years)
  else {
    recommendations.push("Adolescents have increased nutritional needs due to rapid growth and development.");
    
    if (missingGroups.includes(FoodGroup.DAIRY) || missingGroups.includes(FoodGroup.FLESH_FOODS)) {
      recommendations.push("Protein is essential during adolescence. Include dairy, meat, fish, eggs or plant proteins daily.");
    }
    
    if (missingGroups.includes(FoodGroup.NUTS_AND_SEEDS) && missingGroups.includes(FoodGroup.OTHER_FRUITS_AND_VEGETABLES)) {
      recommendations.push("Healthy fats from nuts, seeds, and avocados support brain development and hormone production.");
    }
    
    recommendations.push("Iron needs increase during adolescence, especially for girls after menstruation begins.");
  }
  
  return recommendations;
}

// Function to suggest meals that would improve dietary diversity
export function suggestMeals(consumedFoods: ConsumedFood[]): string[] {
  const missing = getMissingFoodGroups(consumedFoods);
  const suggestions: string[] = [];
  
  if (missing.length === 0) {
    return ["Your diet already includes all food groups - keep up the good work!"];
  }
  
  if (missing.includes(FoodGroup.STARCHY_STAPLES) && missing.includes(FoodGroup.PULSES)) {
    suggestions.push("Rice and beans bowl with vegetables");
  }
  
  if (missing.includes(FoodGroup.FLESH_FOODS) && missing.includes(FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES)) {
    suggestions.push("Chicken and sweet potato curry");
  }
  
  if (missing.includes(FoodGroup.DAIRY) && missing.includes(FoodGroup.OTHER_FRUITS_AND_VEGETABLES)) {
    suggestions.push("Fruit smoothie with yogurt");
  }
  
  if (missing.includes(FoodGroup.EGGS) && missing.includes(FoodGroup.OTHER_FRUITS_AND_VEGETABLES)) {
    suggestions.push("Vegetable omelette with whole grain toast");
  }
  
  if (missing.includes(FoodGroup.NUTS_AND_SEEDS) && missing.includes(FoodGroup.OTHER_FRUITS_AND_VEGETABLES)) {
    suggestions.push("Fruit and nut salad with a light dressing");
  }
  
  // If we don't have specific combinations to suggest, recommend a balanced meal
  if (suggestions.length === 0) {
    suggestions.push("A balanced meal with whole grains, proteins, and colorful vegetables");
    
    // Add specific suggestions based on what's missing
    if (missing.includes(FoodGroup.DAIRY)) {
      suggestions.push("Add a glass of milk or yogurt to your meals");
    }
    
    if (missing.includes(FoodGroup.EGGS)) {
      suggestions.push("Boiled eggs make a great nutritious snack");
    }
  }
  
  return suggestions;
}

// Import food suggestion utilities
import { findSimilarFoods } from './foodSuggestionUtils';
