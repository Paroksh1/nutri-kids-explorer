
// A utility to map common food names to standardized names for better recognition
// Includes Hindi to English translations and food group mappings

type FoodMapping = {
  [key: string]: string;
};

// Maps common food names, including Hindi names, to standardized food names
export const foodNameMap: FoodMapping = {
  // Hindi to English mappings
  "aloo": "potato",
  "aaloo": "potato",
  "आलू": "potato",
  "चावल": "rice",
  "chawal": "rice",
  "दाल": "lentils",
  "dal": "lentils",
  "रोटी": "chapati",
  "roti": "chapati",
  "चपाती": "chapati",
  "पालक": "spinach",
  "palak": "spinach",
  "गोभी": "cauliflower",
  "gobhi": "cauliflower",
  "मटर": "peas",
  "matar": "peas",
  "टमाटर": "tomato",
  "tamatar": "tomato",
  "प्याज": "onion",
  "pyaaj": "onion",
  "गाजर": "carrot",
  "gajar": "carrot",
  "अदरक": "ginger",
  "adrak": "ginger",
  "लहसुन": "garlic",
  "lahsun": "garlic",
  "केला": "banana",
  "kela": "banana",
  "सेब": "apple",
  "seb": "apple",
  "अंगूर": "grapes",
  "angoor": "grapes",
  "अमरूद": "guava",
  "amrood": "guava",
  "पपीता": "papaya",
  "papeeta": "papaya",
  "दूध": "milk",
  "doodh": "milk",
  "दही": "yogurt",
  "dahi": "yogurt",
  "पनीर": "cheese",
  "paneer": "cheese",
  "मक्खन": "butter",
  "makkhan": "butter",
  "घी": "ghee",
  "ghee": "ghee",
  "अंडा": "egg",
  "anda": "egg",
  "मुर्गी": "chicken",
  "murgi": "chicken",
  "चिकन": "chicken",
  "मछली": "fish",
  "machli": "fish",
  "मटन": "mutton",
  "mutton": "mutton",

  // Common dish to ingredient mappings
  "dal rice": "lentils and rice",
  "dal chawal": "lentils and rice",
  "chapati": "wheat",
  "roti": "wheat",
  "naan": "wheat",
  "paratha": "wheat",
  "bread": "wheat",
  "pasta": "wheat",
  "noodles": "wheat",
  "idli": "rice",
  "dosa": "rice",
  "poha": "rice",
  "upma": "semolina",
  "khichdi": "rice and lentils",
  "pulao": "rice",
  "biryani": "rice",
  "curd rice": "rice and yogurt",
  "rajma": "beans",
  "chole": "chickpeas",
  "chana": "chickpeas",
  "paneer butter masala": "cheese",
  "palak paneer": "spinach and cheese",
  "aloo gobhi": "potato and cauliflower",
  "aloo matar": "potato and peas",
  "mix veg": "mixed vegetables",
  "mixed vegetables": "mixed vegetables",
  "salad": "mixed vegetables",
  "fruit salad": "mixed fruits",
  "lassi": "yogurt",
  "butter chicken": "chicken",
  "chicken curry": "chicken",
  "fish curry": "fish",
  "egg curry": "egg",
  "omelette": "egg",
  "mutton curry": "mutton",
  "chicken biryani": "chicken and rice",
  "veg biryani": "rice and vegetables",
  "samosa": "potato",
  "pakora": "vegetables",
  "bhaji": "vegetables",

  // Common variations and misspellings
  "chapathi": "chapati",
  "chappati": "chapati",
  "yoghurt": "yogurt",
  "curd": "yogurt",
  "tomatoe": "tomato",
  "tomatos": "tomato",
  "potatoe": "potato",
  "potatos": "potato"
};

// Dish to ingredients mapping for more detailed analysis
export const dishToIngredientsMap: {[key: string]: string[]} = {
  "chapati": ["wheat"],
  "roti": ["wheat"],
  "naan": ["wheat", "yogurt"],
  "paratha": ["wheat", "oil"],
  "dal": ["lentils"],
  "rice": ["rice"],
  "dal rice": ["lentils", "rice"],
  "curd rice": ["rice", "yogurt"],
  "khichdi": ["rice", "lentils"],
  "idli": ["rice", "lentils"],
  "dosa": ["rice", "lentils"],
  "upma": ["semolina", "vegetables"],
  "poha": ["rice", "peanuts", "vegetables"],
  "pulao": ["rice", "vegetables", "spices"],
  "biryani": ["rice", "vegetables", "spices"],
  "samosa": ["wheat", "potato", "peas"],
  "pakora": ["chickpeas", "vegetables", "oil"],
  "aloo gobhi": ["potato", "cauliflower", "spices"],
  "aloo matar": ["potato", "peas", "spices"],
  "palak paneer": ["spinach", "cheese", "spices"],
  "paneer butter masala": ["cheese", "tomato", "butter", "spices"],
  "butter chicken": ["chicken", "butter", "tomato", "spices"],
  "chicken curry": ["chicken", "tomato", "spices"],
  "fish curry": ["fish", "tomato", "spices"],
  "egg curry": ["egg", "tomato", "spices"],
  "mutton curry": ["mutton", "tomato", "spices"],
  "rajma": ["beans", "tomato", "spices"],
  "chole": ["chickpeas", "tomato", "spices"],
  "lassi": ["yogurt", "sugar"],
  "fruit salad": ["mixed fruits"],
  "mix veg": ["mixed vegetables"],
  "omelette": ["egg", "vegetables"]
};

// Maps foods to their food groups for dietary diversity calculation
export const foodToGroupMap: {[key: string]: string} = {
  // Starchy staples
  "rice": "starchy_staples",
  "wheat": "starchy_staples",
  "maize": "starchy_staples",
  "corn": "starchy_staples",
  "potato": "starchy_staples",
  "sweet potato": "starchy_staples",
  "yam": "starchy_staples",
  "cassava": "starchy_staples",
  "bread": "starchy_staples",
  "pasta": "starchy_staples",
  "noodles": "starchy_staples",
  "semolina": "starchy_staples",
  "oats": "starchy_staples",
  "barley": "starchy_staples",
  "quinoa": "starchy_staples",
  "millet": "starchy_staples",
  "sorghum": "starchy_staples",
  "taro": "starchy_staples",
  "plantain": "starchy_staples",

  // Beans and peas
  "lentils": "beans_and_peas",
  "beans": "beans_and_peas",
  "chickpeas": "beans_and_peas",
  "peas": "beans_and_peas",
  "soybeans": "beans_and_peas",
  "kidney beans": "beans_and_peas",
  "black beans": "beans_and_peas",
  "pinto beans": "beans_and_peas",
  "lima beans": "beans_and_peas",
  "broad beans": "beans_and_peas",
  "split peas": "beans_and_peas",
  "mung beans": "beans_and_peas",
  "black-eyed peas": "beans_and_peas",
  
  // Nuts and seeds
  "almonds": "nuts_and_seeds",
  "walnuts": "nuts_and_seeds",
  "cashews": "nuts_and_seeds",
  "pistachios": "nuts_and_seeds",
  "peanuts": "nuts_and_seeds",
  "hazelnuts": "nuts_and_seeds",
  "pecans": "nuts_and_seeds",
  "sunflower seeds": "nuts_and_seeds",
  "pumpkin seeds": "nuts_and_seeds",
  "sesame seeds": "nuts_and_seeds",
  "flax seeds": "nuts_and_seeds",
  "chia seeds": "nuts_and_seeds",
  "pine nuts": "nuts_and_seeds",
  "macadamia nuts": "nuts_and_seeds",
  
  // Dairy
  "milk": "dairy",
  "yogurt": "dairy",
  "cheese": "dairy",
  "butter": "dairy",
  "ghee": "dairy",
  "cream": "dairy",
  "ice cream": "dairy",
  "curd": "dairy",
  "buttermilk": "dairy",
  "lassi": "dairy",
  
  // Flesh foods
  "beef": "flesh_foods",
  "chicken": "flesh_foods",
  "pork": "flesh_foods",
  "lamb": "flesh_foods",
  "mutton": "flesh_foods",
  "fish": "flesh_foods",
  "seafood": "flesh_foods",
  "prawns": "flesh_foods",
  "shrimp": "flesh_foods",
  "crab": "flesh_foods",
  "goat": "flesh_foods",
  "turkey": "flesh_foods",
  "duck": "flesh_foods",
  "organ meats": "flesh_foods",
  "liver": "flesh_foods",
  "kidney": "flesh_foods",
  "heart": "flesh_foods",
  
  // Eggs
  "egg": "eggs",
  "eggs": "eggs",
  "quail eggs": "eggs",
  "duck eggs": "eggs",
  
  // Vitamin A-rich fruits and vegetables
  "carrot": "vitamin_a_fruits_vegetables",
  "pumpkin": "vitamin_a_fruits_vegetables",
  "sweet red pepper": "vitamin_a_fruits_vegetables",
  "mango": "vitamin_a_fruits_vegetables",
  "papaya": "vitamin_a_fruits_vegetables",
  "apricot": "vitamin_a_fruits_vegetables",
  "sweet potato": "vitamin_a_fruits_vegetables", 
  "spinach": "vitamin_a_fruits_vegetables",
  "kale": "vitamin_a_fruits_vegetables",
  "collard greens": "vitamin_a_fruits_vegetables",
  "turnip greens": "vitamin_a_fruits_vegetables",
  "beet greens": "vitamin_a_fruits_vegetables",
  "amaranth leaves": "vitamin_a_fruits_vegetables",
  "mustard greens": "vitamin_a_fruits_vegetables",

  // Other fruits
  "apple": "other_fruits",
  "banana": "other_fruits",
  "orange": "other_fruits",
  "grapes": "other_fruits",
  "watermelon": "other_fruits",
  "pineapple": "other_fruits",
  "strawberry": "other_fruits",
  "blueberry": "other_fruits",
  "raspberry": "other_fruits",
  "blackberry": "other_fruits",
  "kiwi": "other_fruits",
  "pear": "other_fruits",
  "peach": "other_fruits",
  "plum": "other_fruits",
  "cherry": "other_fruits",
  "guava": "other_fruits",
  "lychee": "other_fruits",
  "pomegranate": "other_fruits",
  "fig": "other_fruits",
  "date": "other_fruits",
  "coconut": "other_fruits",

  // Other vegetables
  "onion": "other_vegetables",
  "tomato": "other_vegetables",
  "cucumber": "other_vegetables",
  "eggplant": "other_vegetables",
  "cauliflower": "other_vegetables",
  "cabbage": "other_vegetables",
  "broccoli": "other_vegetables",
  "lettuce": "other_vegetables",
  "capsicum": "other_vegetables",
  "bell pepper": "other_vegetables",
  "zucchini": "other_vegetables",
  "okra": "other_vegetables",
  "radish": "other_vegetables",
  "beetroot": "other_vegetables",
  "celery": "other_vegetables",
  "leek": "other_vegetables",
  "artichoke": "other_vegetables",
  "asparagus": "other_vegetables",
  "brussels sprouts": "other_vegetables",
  "garlic": "other_vegetables",
  "ginger": "other_vegetables",
  "mushroom": "other_vegetables",
  "turnip": "other_vegetables",
  "mixed vegetables": "other_vegetables",
  "vegetables": "other_vegetables",
  "spices": "other_vegetables"
};

// Helper function to map a food name to its standardized version
export const mapFoodName = (input: string): string => {
  const lowercaseInput = input.toLowerCase().trim();
  return foodNameMap[lowercaseInput] || lowercaseInput;
};

// Helper function to get the food group for a given food
export const getFoodGroup = (food: string): string => {
  const standardizedFood = mapFoodName(food);
  const group = foodToGroupMap[standardizedFood];
  
  if (group) {
    return group;
  }
  
  // Handle composite foods by checking parts
  const parts = standardizedFood.split(/\s+and\s+|\s*,\s*|\s+with\s+|\s+&\s+/);
  if (parts.length > 1) {
    for (const part of parts) {
      const trimmedPart = part.trim();
      const partGroup = foodToGroupMap[trimmedPart];
      if (partGroup) {
        return partGroup; // Return the first valid group found
      }
    }
  }
  
  return "unknown";
};

// Helper function to check if a food belongs to a specific group
export const isFoodInGroup = (food: string, group: string): boolean => {
  return getFoodGroup(food) === group;
};

// Get all ingredients for a dish and return their food groups
export const getIngredientsForDish = (dish: string): string[] => {
  const standardizedDish = mapFoodName(dish);
  
  // Check if we have a mapping for this dish
  if (dishToIngredientsMap[standardizedDish]) {
    return dishToIngredientsMap[standardizedDish];
  }
  
  // If no specific mapping, return the dish itself as the ingredient
  return [standardizedDish];
};

// Get all food groups for a dish by analyzing its ingredients
export const getFoodGroupsForDish = (dish: string): string[] => {
  const ingredients = getIngredientsForDish(dish);
  const groups = new Set<string>();
  
  ingredients.forEach(ingredient => {
    const group = getFoodGroup(ingredient);
    if (group !== "unknown") {
      groups.add(group);
    }
  });
  
  return Array.from(groups);
};

// Map food groups to their corresponding ID in the foodGroups array
const foodGroupToIdMap: {[key: string]: number} = {
  "starchy_staples": 1, // CEREALS + WHITE ROOTS AND TUBERS
  "vitamin_a_fruits_vegetables": 3, // VITAMIN A RICH VEGETABLES AND TUBERS
  "beans_and_peas": 12, // LEGUMES, NUTS AND SEEDS
  "nuts_and_seeds": 12, // LEGUMES, NUTS AND SEEDS
  "dairy": 13, // MILK AND MILK PRODUCTS
  "flesh_foods": 9, // FLESH MEATS
  "eggs": 10, // EGGS
  "other_vegetables": 5, // OTHER VEGETABLES
  "other_fruits": 7, // OTHER FRUITS
};

// Function to process food text and suggest food groups that were likely consumed
export const processFoodText = (foodText: string): number[] => {
  if (!foodText || foodText.trim() === '') {
    return [];
  }
  
  // Split the input into individual food items
  const foodItems = foodText.split(/[,;\n]+/).filter(item => item.trim().length > 0);
  
  // Map each food to its standardized name and get its food group
  const detectedGroups = new Set<number>();
  
  foodItems.forEach(item => {
    const food = item.trim();
    
    // Get all food groups for this dish by analyzing its ingredients
    const foodGroups = getFoodGroupsForDish(food);
    
    foodGroups.forEach(group => {
      if (foodGroupToIdMap[group]) {
        detectedGroups.add(foodGroupToIdMap[group]);
        
        // Special case handling
        if (group === "starchy_staples") {
          // Both CEREALS and WHITE ROOTS AND TUBERS might be detected
          detectedGroups.add(1); // CEREALS
          detectedGroups.add(2); // WHITE ROOTS AND TUBERS
        }
      }
    });
    
    // Additional special case handling for specific foods
    if (food.includes("spinach") || food.includes("kale") || 
        food.includes("amaranth") || food.includes("collard") ||
        food.includes("palak")) {
      detectedGroups.add(4); // DARK GREEN LEAFY VEGETABLES
    }
    
    if (food.includes("liver") || food.includes("kidney") || food.includes("heart")) {
      detectedGroups.add(8); // ORGAN MEAT
    }
    
    if (food.includes("fish") || food.includes("seafood") || food.includes("prawn") || 
        food.includes("shrimp") || food.includes("machli") || food.includes("मछली")) {
      detectedGroups.add(11); // FISH AND SEAFOOD
    }
  });
  
  return Array.from(detectedGroups);
};
