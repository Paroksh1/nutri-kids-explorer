
import { getIngredientsForDish, getFoodGroup, processFoodText } from './foodNameMapper';

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
  
  // Process input text - split by common separators and normalize
  const foods = foodText.toLowerCase().split(/[,;\n\s]+/).map(f => f.trim()).filter(f => f !== '');
  console.log("Processing foods:", foods);
  
  // Process the text through the food mapper to get food group IDs
  const groupIds = processFoodText(foodText);
  console.log("Identified group IDs:", groupIds);
  
  // Map the group IDs back to string names
  return groupIds.map(id => formatFoodGroupName(id).toLowerCase());
};

// Map common food items directly to food groups
export const getHindiFoodGroup = (hindiFood: string): string => {
  // Normalize input
  const normalizedFood = hindiFood.toLowerCase().trim();
  
  // Common dairy products in Hindi and English
  if (["दही", "छाछ", "दूध", "पनीर", "मट्ठा", "मक्खन", "घी", "milk", "dahi", "curd", "yogurt", "butter", "ghee", "cheese", "buttermilk", "paneer"].includes(normalizedFood)) {
    return "dairy";
  }
  
  // Common legumes/dals
  if (["दाल", "चना", "राजमा", "मूंग", "मसूर", "अरहर", "उड़द", "dal", "lentil", "rajma", "chana", "moong", "masoor", "urad", "toor", "arhar"].includes(normalizedFood)) {
    return "legumes_nuts_seeds";
  }
  
  // Common grains
  if (["चावल", "गेहूं", "रोटी", "आटा", "पराठा", "नान", "चपाती", "rice", "wheat", "roti", "chapati", "naan", "paratha", "bread"].includes(normalizedFood)) {
    return "starchy_staples";
  }
  
  // Let the general mapper handle other cases
  const foodGroups = getFoodGroupsForDish(normalizedFood);
  return foodGroups.length > 0 ? foodGroups[0] : "unknown";
};
