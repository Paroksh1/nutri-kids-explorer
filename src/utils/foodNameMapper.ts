/**
 * Utility functions for food spelling suggestions
 */

/**
 * Map food names to standardized names for consistent tracking
 * This helps account for different ways users might enter the same food
 */
export function mapFoodName(foodName: string): string {
  const normalizedName = foodName.toLowerCase().trim();
  
  // Check for exact matches first
  if (foodMappings[normalizedName]) {
    return foodMappings[normalizedName];
  }
  
  // Check for partial matches
  for (const [key, value] of Object.entries(foodMappings)) {
    if (normalizedName.includes(key)) {
      return value;
    }
  }
  
  // Return original name if no mapping found
  return foodName;
}

// Food mappings to standardize food names
// The key is the input form (lowercase), the value is the standardized output
const foodMappings: Record<string, string> = {
  "apple": "Apple",
  "apples": "Apple",
  "red apple": "Apple",
  "green apple": "Apple",
  
  "banana": "Banana",
  "bananas": "Banana",
  "ripe banana": "Banana",
  
  "orange": "Orange",
  "oranges": "Orange",
  "mandarin": "Orange",
  
  "carrot": "Carrot",
  "carrots": "Carrot",
  "baby carrots": "Carrot",
  
  "broccoli": "Broccoli",
  "brocoli": "Broccoli", // common misspelling
  
  "spinach": "Spinach",
  "baby spinach": "Spinach",
  
  "chicken": "Chicken",
  "chicken breast": "Chicken",
  "grilled chicken": "Chicken",
  
  "beef": "Beef",
  "ground beef": "Beef",
  "steak": "Beef",
  
  "rice": "Rice",
  "brown rice": "Brown Rice",
  "white rice": "White Rice",
  
  "bread": "Bread",
  "whole grain bread": "Whole Grain Bread",
  "white bread": "White Bread",
  
  "milk": "Milk",
  "whole milk": "Whole Milk",
  "skim milk": "Skim Milk",
  "almond milk": "Almond Milk",
  
  "yogurt": "Yogurt",
  "yoghurt": "Yogurt", // alternative spelling
  "greek yogurt": "Greek Yogurt",
  
  "cheese": "Cheese",
  "cheddar": "Cheddar Cheese",
  "mozzarella": "Mozzarella Cheese",
  
  "egg": "Egg",
  "eggs": "Egg",
  "boiled egg": "Egg",
  
  "potato": "Potato",
  "potatoes": "Potato",
  "sweet potato": "Sweet Potato",
  
  "tomato": "Tomato",
  "tomatoes": "Tomato",
  "cherry tomato": "Tomato",
  
  "bell pepper": "Bell Pepper",
  "red pepper": "Bell Pepper",
  "green pepper": "Bell Pepper",
  
  "onion": "Onion",
  "onions": "Onion",
  "red onion": "Onion",
  
  "garlic": "Garlic",
  "garlic clove": "Garlic",
  
  "avocado": "Avocado",
  "avocados": "Avocado",
  
  "lettuce": "Lettuce",
  "romaine lettuce": "Lettuce",
  "iceberg lettuce": "Lettuce",
  
  "cucumber": "Cucumber",
  "cucumbers": "Cucumber",
  
  "fish": "Fish",
  "salmon": "Salmon",
  "tuna": "Tuna",
  
  "beans": "Beans",
  "black beans": "Black Beans",
  "kidney beans": "Kidney Beans",
  
  "lentils": "Lentils",
  "red lentils": "Lentils",
  
  "nuts": "Nuts",
  "almonds": "Almonds",
  "walnuts": "Walnuts",
  "peanuts": "Peanuts"
};

// Common food groups for nutritional assessment
export const foodGroups = {
  fruits: ["Apple", "Banana", "Orange", "Berries", "Mango", "Grapes", "Watermelon", "Pineapple"],
  vegetables: ["Carrot", "Broccoli", "Spinach", "Lettuce", "Cucumber", "Tomato", "Bell Pepper", "Onion"],
  proteins: ["Chicken", "Beef", "Fish", "Eggs", "Beans", "Lentils", "Tofu", "Nuts"],
  grains: ["Rice", "Bread", "Pasta", "Oats", "Quinoa", "Barley", "Cereal"],
  dairy: ["Milk", "Yogurt", "Cheese", "Cottage Cheese"]
};
