
import { getIngredientsForDish, getFoodGroup } from './foodNameMapper';

// Function to get all food groups for a given dish
export const getFoodGroupsForDish = (dish: string): string[] => {
  const ingredients = getIngredientsForDish(dish);
  const foodGroups = ingredients.map(ingredient => getFoodGroup(ingredient))
    .filter(group => group !== "unknown");
  
  // Return unique food groups
  return [...new Set(foodGroups)];
};

// Convert WHO food group names to readable format
export const formatFoodGroupName = (groupId: number): string => {
  switch(groupId) {
    case 1: return "Starchy Staples";
    case 2: return "White Roots and Tubers";
    case 3: return "Vitamin A Rich Vegetables";
    case 4: return "Dark Green Leafy Vegetables";
    case 5: return "Other Vegetables";
    case 6: return "Vitamin A Rich Fruits";
    case 7: return "Other Fruits";
    case 8: return "Organ Meat";
    case 9: return "Flesh Meats";
    case 10: return "Eggs";
    case 11: return "Fish and Seafood";
    case 12: return "Legumes, Nuts and Seeds";
    case 13: return "Milk and Milk Products";
    case 14: return "Oils and Fats";
    case 15: return "Sweets";
    case 16: return "Spices, Condiments, Beverages";
    default: return "Unknown";
  }
};

// Helper function to improve Hindi food detection
export const identifyHindiFood = (foodText: string): string[] => {
  if (!foodText || foodText.trim() === '') {
    return [];
  }
  
  const foods = foodText.toLowerCase().split(/[,;\n]+/).map(f => f.trim()).filter(f => f !== '');
  const identifiedGroups: string[] = [];
  
  foods.forEach(food => {
    const foodGroups = getFoodGroupsForDish(food);
    if (foodGroups.length > 0) {
      identifiedGroups.push(...foodGroups);
    }
  });
  
  return [...new Set(identifiedGroups)];
};
