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

/**
 * Process food text to identify food groups
 * Returns an array of food group IDs
 */
export function processFoodText(foodText: string): number[] {
  if (!foodText || foodText.trim() === '') {
    return [];
  }
  
  const detectedGroups = new Set<number>();
  const normalizedText = foodText.toLowerCase();
  
  // Check for cereals and grains (group 1)
  if (/\b(rice|bread|wheat|corn|maize|chapati|roti|pasta|noodle|cereal|grain|oats)\b/.test(normalizedText)) {
    detectedGroups.add(1);
  }
  
  // Check for white roots and tubers (group 2)
  if (/\b(potato|yam|cassava|sweet potato|taro|white root|tuber)\b/.test(normalizedText)) {
    detectedGroups.add(2);
  }
  
  // Check for vitamin A rich vegetables (group 3)
  if (/\b(carrot|pumpkin|squash|sweet pepper|red pepper)\b/.test(normalizedText)) {
    detectedGroups.add(3);
  }
  
  // Check for dark green leafy vegetables (group 4)
  if (/\b(spinach|kale|amaranth|cassava leaves|green leafy|palak|saag)\b/.test(normalizedText)) {
    detectedGroups.add(4);
  }
  
  // Check for other vegetables (group 5)
  if (/\b(tomato|onion|eggplant|cucumber|cabbage|cauliflower|broccoli|vegetable|veg)\b/.test(normalizedText)) {
    detectedGroups.add(5);
  }
  
  // Check for vitamin A rich fruits (group 6)
  if (/\b(mango|papaya|apricot|peach|cantaloupe)\b/.test(normalizedText)) {
    detectedGroups.add(6);
  }
  
  // Check for other fruits (group 7)
  if (/\b(apple|banana|orange|grape|pear|berry|berries|fruit)\b/.test(normalizedText)) {
    detectedGroups.add(7);
  }
  
  // Check for organ meat (group 8)
  if (/\b(liver|kidney|heart|organ meat|blood)\b/.test(normalizedText)) {
    detectedGroups.add(8);
  }
  
  // Check for flesh meats (group 9)
  if (/\b(beef|pork|lamb|goat|chicken|duck|bird|game|meat|mutton)\b/.test(normalizedText)) {
    detectedGroups.add(9);
  }
  
  // Check for eggs (group 10)
  if (/\b(egg|eggs)\b/.test(normalizedText)) {
    detectedGroups.add(10);
  }
  
  // Check for fish and seafood (group 11)
  if (/\b(fish|seafood|prawn|shrimp|crab|shellfish)\b/.test(normalizedText)) {
    detectedGroups.add(11);
  }
  
  // Check for legumes, nuts and seeds (group 12)
  if (/\b(bean|lentil|pulse|dal|nut|seed|peanut|almond|cashew|walnut|legume)\b/.test(normalizedText)) {
    detectedGroups.add(12);
  }
  
  // Check for milk and milk products (group 13)
  if (/\b(milk|cheese|yogurt|yoghurt|curd|dairy|paneer|cream)\b/.test(normalizedText)) {
    detectedGroups.add(13);
  }
  
  // Check for oils and fats (group 14)
  if (/\b(oil|fat|butter|ghee|cream|margarine)\b/.test(normalizedText)) {
    detectedGroups.add(14);
  }
  
  // Check for sweets (group 15)
  if (/\b(sugar|honey|sweet|candy|chocolate|dessert|cake|cookie|biscuit|sweets|mithai)\b/.test(normalizedText)) {
    detectedGroups.add(15);
  }
  
  // Check for spices, condiments, beverages (group 16)
  if (/\b(spice|salt|pepper|sauce|tea|coffee|beverage|drink|alcohol|wine|beer|masala|garam masala)\b/.test(normalizedText)) {
    detectedGroups.add(16);
  }
  
  return Array.from(detectedGroups);
}

/**
 * Get ingredients for a composite dish
 * Returns an array of ingredient names
 */
export function getIngredientsForDish(dishName: string): string[] {
  const normalizedName = dishName.toLowerCase().trim();
  
  // Common dishes and their ingredients
  const dishIngredients: Record<string, string[]> = {
    "pizza": ["wheat flour", "cheese", "tomato"],
    "burger": ["bread", "meat", "lettuce", "tomato"],
    "sandwich": ["bread", "vegetables", "cheese"],
    "pasta": ["wheat flour", "tomato"],
    "spaghetti": ["wheat flour", "tomato"],
    "rice and beans": ["rice", "beans"],
    "fried rice": ["rice", "vegetable", "egg"],
    "dal": ["lentil", "spices"],
    "curry": ["spices", "vegetable", "meat"],
    "soup": ["vegetable", "water"],
    "salad": ["vegetable", "olive oil"],
    "omelette": ["egg", "vegetable"],
    "chicken curry": ["chicken", "spices"],
    "stir fry": ["vegetable", "oil"],
    "noodles": ["wheat flour", "vegetable"],
    "paratha": ["wheat flour", "oil"],
    "roti": ["wheat flour"],
    "chapati": ["wheat flour"],
    "dosa": ["rice", "lentil"],
    "idli": ["rice", "lentil"],
    "biryani": ["rice", "meat", "spices"],
    "pulao": ["rice", "vegetable", "spices"],
    "samosa": ["wheat flour", "potato", "vegetable"],
    "pakora": ["gram flour", "vegetable", "oil"],
    "chaat": ["potato", "chickpea", "spices"],
    "lassi": ["yogurt", "sugar"],
    "paneer butter masala": ["paneer", "butter", "tomato", "spices"],
    "smoothie": ["fruit", "milk"],
    "milkshake": ["milk", "fruit", "sugar"]
  };
  
  // Check for exact dish match
  if (dishIngredients[normalizedName]) {
    return dishIngredients[normalizedName];
  }
  
  // Check for partial dish matches
  for (const [dish, ingredients] of Object.entries(dishIngredients)) {
    if (normalizedName.includes(dish)) {
      return ingredients;
    }
  }
  
  return [];
}

/**
 * Guess the food group based on food name
 * Returns an array of potential food group names
 */
export function guessFoodGroup(foodName: string): string[] {
  const normalizedName = foodName.toLowerCase().trim();
  const groups: string[] = [];
  
  // Starchy staples
  if (/\b(rice|bread|wheat|corn|maize|chapati|roti|pasta|noodle|cereal|grain|oats|potato|yam|cassava)\b/.test(normalizedName)) {
    groups.push("starchy_staples");
  }
  
  // Vitamin A rich fruits and vegetables
  if (/\b(carrot|pumpkin|squash|sweet pepper|red pepper|mango|papaya|apricot|peach|cantaloupe)\b/.test(normalizedText)) {
    groups.push("vitamin_a_fruits_vegetables");
  }
  
  // Dark green leafy vegetables
  if (/\b(spinach|kale|amaranth|cassava leaves|green leafy|palak|saag)\b/.test(normalizedText)) {
    groups.push("dark_green_leafy_veg");
  }
  
  // Other vegetables
  if (/\b(tomato|onion|eggplant|cucumber|cabbage|cauliflower|broccoli|vegetable|veg)\b/.test(normalizedText)) {
    groups.push("other_vegetables");
  }
  
  // Other fruits
  if (/\b(apple|banana|orange|grape|pear|berry|berries|fruit)\b/.test(normalizedText)) {
    groups.push("other_fruits");
  }
  
  // Organ meat
  if (/\b(liver|kidney|heart|organ meat|blood)\b/.test(normalizedText)) {
    groups.push("organ_meat");
  }
  
  // Meat and fish
  if (/\b(beef|pork|lamb|goat|chicken|duck|bird|game|meat|mutton|fish|seafood|prawn|shrimp|crab|shellfish)\b/.test(normalizedText)) {
    groups.push("meat_fish");
  }
  
  // Eggs
  if (/\b(egg|eggs)\b/.test(normalizedText)) {
    groups.push("eggs");
  }
  
  // Legumes, nuts and seeds
  if (/\b(bean|lentil|pulse|dal|nut|seed|peanut|almond|cashew|walnut|legume)\b/.test(normalizedText)) {
    groups.push("legumes_nuts_seeds");
  }
  
  // Dairy
  if (/\b(milk|cheese|yogurt|yoghurt|curd|dairy|paneer|cream)\b/.test(normalizedText)) {
    groups.push("dairy");
  }
  
  // Oils and fats
  if (/\b(oil|fat|butter|ghee|cream|margarine)\b/.test(normalizedText)) {
    groups.push("oils_fats");
  }
  
  // Sugars
  if (/\b(sugar|honey|sweet|candy|chocolate|dessert|cake|cookie|biscuit|sweets|mithai)\b/.test(normalizedText)) {
    groups.push("sugars");
  }
  
  // Spices and condiments
  if (/\b(spice|salt|pepper|sauce|tea|coffee|beverage|drink|alcohol|wine|beer|masala|garam masala)\b/.test(normalizedText)) {
    groups.push("spices_condiments");
  }
  
  // If it's a mixed dish
  if (/\b(pizza|burger|sandwich|pasta|curry|biryani|stir fry|soup|salad)\b/.test(normalizedText)) {
    groups.push("mixed_dish");
  }
  
  return groups;
}

// Food mappings to standardize food names
// The key is the input form (lowercase), the value is the standardized output
export const foodMappings: Record<string, string> = {
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
