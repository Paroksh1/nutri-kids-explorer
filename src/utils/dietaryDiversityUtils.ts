
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

// Enhanced function to identify food items and their groups
export const identifyHindiFood = (foodText: string): string[] => {
  if (!foodText || foodText.trim() === '') {
    return [];
  }
  
  // Process input text - split by common separators and normalize
  // Improved to handle more separator types and whitespace
  const foods = foodText.toLowerCase()
    .split(/[,;\n\s]+/)
    .map(f => f.trim())
    .filter(f => f !== '');
    
  console.log("Processing food items:", foods);
  
  // First try to directly map common food items (faster lookup)
  const directGroupIds = new Set<number>();
  
  foods.forEach(food => {
    // Check for dairy products
    if (["दही", "छाछ", "दूध", "पनीर", "मट्ठा", "मक्खन", "घी", 
         "milk", "dahi", "curd", "yogurt", "butter", "ghee", "cheese", 
         "buttermilk", "paneer"].includes(food)) {
      directGroupIds.add(13); // Milk and Milk Products
      console.log(`Direct match: ${food} → Milk and Milk Products`);
    }
    
    // Check for legumes/pulses
    else if (["दाल", "चना", "राजमा", "मूंग", "मसूर", "उड़द", "अरहर", 
         "dal", "lentil", "rajma", "chana", "moong", "masoor", "urad", 
         "toor", "pulses", "beans"].includes(food)) {
      directGroupIds.add(12); // Legumes, Nuts and Seeds
      console.log(`Direct match: ${food} → Legumes, Nuts and Seeds`);
    }
    
    // Check for cereals/grains
    else if (["चावल", "गेहूं", "रोटी", "आटा", "पराठा", "नान", "चपाती",
             "rice", "wheat", "roti", "chapati", "naan", "paratha", "bread"].includes(food)) {
      directGroupIds.add(1); // Starchy Staples
      console.log(`Direct match: ${food} → Starchy Staples`);
    }
    
    // Check for vegetables
    else if (["पालक", "मेथी", "गोभी", "फूलगोभी", "आलू", "प्याज", "टमाटर", "भिंडी", "बैंगन",
              "spinach", "potato", "onion", "tomato", "okra", "eggplant", "cauliflower"].includes(food)) {
      // Dark green leafy vegetables
      if (["पालक", "मेथी", "spinach", "fenugreek leaves"].includes(food)) {
        directGroupIds.add(4);
        console.log(`Direct match: ${food} → Dark Green Leafy Vegetables`);
      } else {
        directGroupIds.add(5); // Other vegetables
        console.log(`Direct match: ${food} → Other Vegetables`);
      }
    }
    
    // Check for fruits
    else if (["केला", "सेब", "संतरा", "अंगूर", "आम", "पपीता",
              "banana", "apple", "orange", "grapes", "mango", "papaya"].includes(food)) {
      // Vitamin A rich fruits
      if (["पपीता", "आम", "papaya", "mango"].includes(food)) {
        directGroupIds.add(6);
        console.log(`Direct match: ${food} → Vitamin A Rich Fruits`);
      } else {
        directGroupIds.add(7); // Other fruits
        console.log(`Direct match: ${food} → Other Fruits`);
      }
    }
    
    // Check for eggs
    else if (["अंडा", "egg"].includes(food)) {
      directGroupIds.add(10); // Eggs
      console.log(`Direct match: ${food} → Eggs`);
    }
    
    // Check for meat and fish
    else if (["मछली", "मुर्गी", "गोश्त", "मटन", "चिकन",
              "fish", "chicken", "meat", "mutton"].includes(food)) {
      directGroupIds.add(9); // Flesh Meats
      console.log(`Direct match: ${food} → Flesh Meats`);
    }
  });
  
  // If we found direct matches, use them
  if (directGroupIds.size > 0) {
    const groups = Array.from(directGroupIds);
    console.log("Found direct food group matches:", groups);
    
    // Then use the processor for additional groups
    const processedGroups = processFoodText(foodText);
    console.log("Additional processed groups:", processedGroups);
    
    // Combine direct and processed groups
    const allGroups = [...new Set([...groups, ...processedGroups])];
    console.log("Final combined group IDs:", allGroups);
    
    // Convert to readable names
    return allGroups.map(id => formatFoodGroupName(id).toLowerCase());
  }
  
  // If no direct matches, fall back to the processor
  const groupIds = processFoodText(foodText);
  console.log("Processed group IDs:", groupIds);
  
  // Map the group IDs back to string names
  return groupIds.map(id => formatFoodGroupName(id).toLowerCase());
};

// Improved function to map Hindi food names to food groups
export const getHindiFoodGroup = (hindiFood: string): string => {
  // Normalize input
  const normalizedFood = hindiFood.toLowerCase().trim();
  
  // Common dairy products in Hindi and English
  if (["दही", "छाछ", "दूध", "पनीर", "मट्ठा", "मक्खन", "घी", "milk", "dahi", "curd", "yogurt", "butter", "ghee", "cheese", "buttermilk", "paneer"].includes(normalizedFood)) {
    console.log(`getHindiFoodGroup: ${normalizedFood} → dairy`);
    return "dairy";
  }
  
  // Common legumes/dals
  if (["दाल", "चना", "राजमा", "मूंग", "मसूर", "अरहर", "उड़द", "dal", "lentil", "rajma", "chana", "moong", "masoor", "urad", "toor", "arhar", "pulses", "beans"].includes(normalizedFood)) {
    console.log(`getHindiFoodGroup: ${normalizedFood} → legumes_nuts_seeds`);
    return "legumes_nuts_seeds";
  }
  
  // Common grains
  if (["चावल", "गेहूं", "रोटी", "आटा", "पराठा", "नान", "चपाती", "rice", "wheat", "roti", "chapati", "naan", "paratha", "bread"].includes(normalizedFood)) {
    console.log(`getHindiFoodGroup: ${normalizedFood} → starchy_staples`);
    return "starchy_staples";
  }
  
  // Common vegetables
  if (["आलू", "प्याज", "टमाटर", "गोभी", "फूलगोभी", "मटर", "गाजर", "भिंडी", "बैंगन", "potato", "onion", "tomato", "cabbage", "cauliflower", "peas", "carrot", "okra", "eggplant"].includes(normalizedFood)) {
    // Check for vitamin A rich vegetables
    if (["गाजर", "carrot"].includes(normalizedFood)) {
      console.log(`getHindiFoodGroup: ${normalizedFood} → vitamin_a_fruits_vegetables`);
      return "vitamin_a_fruits_vegetables";
    }
    console.log(`getHindiFoodGroup: ${normalizedFood} → other_vegetables`);
    return "other_vegetables";
  }
  
  // Let the general mapper handle other cases
  const foodGroups = getFoodGroupsForDish(normalizedFood);
  if (foodGroups.length > 0) {
    console.log(`getHindiFoodGroup (from dish): ${normalizedFood} → ${foodGroups[0]}`);
    return foodGroups[0];
  }
  
  console.log(`getHindiFoodGroup: ${normalizedFood} → unknown`);
  return "unknown";
};

