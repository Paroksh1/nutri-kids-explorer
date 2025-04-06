// Food mapping database - maps food names to their categories
export const foodMappings: Record<string, string> = {
  // Starchy staples
  "rice": "starchy_staples",
  "bread": "starchy_staples",
  "pasta": "starchy_staples",
  "wheat": "starchy_staples",
  "chapati": "starchy_staples",
  "roti": "starchy_staples",
  "naan": "starchy_staples",
  "potato": "starchy_staples",
  "yam": "starchy_staples",
  "cassava": "starchy_staples",
  "corn": "starchy_staples",
  "maize": "starchy_staples",
  "oats": "starchy_staples",
  "barley": "starchy_staples",
  "quinoa": "starchy_staples",
  "millet": "starchy_staples",
  "sorghum": "starchy_staples",
  
  // Dark green leafy vegetables
  "spinach": "dark_green_leafy_veg",
  "kale": "dark_green_leafy_veg",
  "amaranth": "dark_green_leafy_veg",
  "cassava leaves": "dark_green_leafy_veg",
  "pumpkin leaves": "dark_green_leafy_veg",
  "mustard greens": "dark_green_leafy_veg",
  "broccoli": "dark_green_leafy_veg",
  "chard": "dark_green_leafy_veg",
  "collard greens": "dark_green_leafy_veg",
  "palak": "dark_green_leafy_veg", // Hindi name for spinach
  "saag": "dark_green_leafy_veg", // General term for leafy greens in Hindi
  
  // Vitamin A rich fruits and vegetables
  "carrot": "vitamin_a_fruits_vegetables",
  "pumpkin": "vitamin_a_fruits_vegetables",
  "sweet potato": "vitamin_a_fruits_vegetables",
  "mango": "vitamin_a_fruits_vegetables",
  "papaya": "vitamin_a_fruits_vegetables",
  "cantaloupe": "vitamin_a_fruits_vegetables",
  "apricot": "vitamin_a_fruits_vegetables",
  "red pepper": "vitamin_a_fruits_vegetables",
  "yellow pepper": "vitamin_a_fruits_vegetables",
  "gajar": "vitamin_a_fruits_vegetables", // Hindi for carrot
  "kaddu": "vitamin_a_fruits_vegetables", // Hindi for pumpkin
  "aam": "vitamin_a_fruits_vegetables", // Hindi for mango
  "papita": "vitamin_a_fruits_vegetables", // Hindi for papaya
  
  // Other vegetables
  "tomato": "other_vegetables",
  "eggplant": "other_vegetables",
  "cucumber": "other_vegetables",
  "cauliflower": "other_vegetables",
  "cabbage": "other_vegetables",
  "onion": "other_vegetables",
  "garlic": "other_vegetables",
  "green beans": "other_vegetables",
  "peas": "other_vegetables",
  "bell pepper": "other_vegetables",
  "zucchini": "other_vegetables",
  "okra": "other_vegetables",
  "baingan": "other_vegetables", // Hindi for eggplant
  "tamatar": "other_vegetables", // Hindi for tomato
  "pyaaz": "other_vegetables", // Hindi for onion
  "gobhi": "other_vegetables", // Hindi for cauliflower
  "bhindi": "other_vegetables", // Hindi for okra
  "matar": "other_vegetables", // Hindi for peas
  
  // Other fruits
  "apple": "other_fruits",
  "banana": "other_fruits",
  "orange": "other_fruits",
  "grape": "other_fruits",
  "watermelon": "other_fruits",
  "pineapple": "other_fruits",
  "strawberry": "other_fruits",
  "lemon": "other_fruits",
  "lime": "other_fruits",
  "pear": "other_fruits",
  "peach": "other_fruits",
  "plum": "other_fruits",
  "kiwi": "other_fruits",
  "seb": "other_fruits", // Hindi for apple
  "kela": "other_fruits", // Hindi for banana
  "santara": "other_fruits", // Hindi for orange
  "angoor": "other_fruits", // Hindi for grapes
  "tarbooj": "other_fruits", // Hindi for watermelon
  "ananas": "other_fruits", // Hindi for pineapple
  
  // Organ meat
  "liver": "organ_meat",
  "kidney": "organ_meat",
  "heart": "organ_meat",
  "brain": "organ_meat",
  "kaleji": "organ_meat", // Hindi for liver
  "gurda": "organ_meat", // Hindi for kidney
  
  // Flesh meat
  "beef": "meat_fish",
  "pork": "meat_fish",
  "chicken": "meat_fish",
  "goat": "meat_fish",
  "lamb": "meat_fish",
  "duck": "meat_fish",
  "rabbit": "meat_fish",
  "venison": "meat_fish",
  "murga": "meat_fish", // Hindi for chicken
  "gosht": "meat_fish", // Hindi/Urdu for meat
  "mutton": "meat_fish", // Commonly used in India for goat meat
  
  // Eggs
  "egg": "eggs",
  "eggs": "eggs",
  "anda": "eggs", // Hindi for egg
  
  // Fish and seafood
  "fish": "meat_fish",
  "salmon": "meat_fish",
  "tuna": "meat_fish",
  "sardines": "meat_fish",
  "shrimp": "meat_fish",
  "crab": "meat_fish",
  "lobster": "meat_fish",
  "machli": "meat_fish", // Hindi for fish
  "jhinga": "meat_fish", // Hindi for prawn/shrimp
  
  // Legumes, nuts and seeds
  "beans": "legumes_nuts_seeds",
  "lentils": "legumes_nuts_seeds",
  "chickpeas": "legumes_nuts_seeds",
  "peanuts": "legumes_nuts_seeds",
  "almonds": "legumes_nuts_seeds",
  "cashews": "legumes_nuts_seeds",
  "walnuts": "legumes_nuts_seeds",
  "sesame seeds": "legumes_nuts_seeds",
  "flaxseeds": "legumes_nuts_seeds",
  "chia seeds": "legumes_nuts_seeds",
  "sunflower seeds": "legumes_nuts_seeds",
  "pumpkin seeds": "legumes_nuts_seeds",
  "dal": "legumes_nuts_seeds", // Hindi for lentils
  "chana": "legumes_nuts_seeds", // Hindi for chickpeas
  "rajma": "legumes_nuts_seeds", // Hindi for kidney beans
  "moong": "legumes_nuts_seeds", // Hindi for mung beans
  "urad": "legumes_nuts_seeds", // Hindi for black gram
  "masoor": "legumes_nuts_seeds", // Hindi for red lentils
  "badam": "legumes_nuts_seeds", // Hindi for almonds
  "kaju": "legumes_nuts_seeds", // Hindi for cashews
  "akhrot": "legumes_nuts_seeds", // Hindi for walnuts
  "til": "legumes_nuts_seeds", // Hindi for sesame
  
  // Dairy
  "milk": "dairy",
  "cheese": "dairy",
  "yogurt": "dairy",
  "curd": "dairy",
  "butter": "dairy",
  "cream": "dairy",
  "doodh": "dairy", // Hindi for milk
  "paneer": "dairy", // Hindi for cottage cheese
  "dahi": "dairy", // Hindi for yogurt
  "makhan": "dairy", // Hindi for butter
  "ghee": "dairy", // Clarified butter common in South Asian cooking
  
  // Oils and fats
  "oil": "oils_fats",
  "vegetable oil": "oils_fats",
  "olive oil": "oils_fats",
  "coconut oil": "oils_fats",
  "ghee": "oils_fats",
  "butter": "oils_fats",
  "lard": "oils_fats",
  "tel": "oils_fats", // Hindi for oil
  
  // Sugars
  "sugar": "sugars",
  "honey": "sugars",
  "jaggery": "sugars",
  "molasses": "sugars",
  "syrup": "sugars",
  "candy": "sugars",
  "chocolate": "sugars",
  "dessert": "sugars",
  "cheeni": "sugars", // Hindi for sugar
  "shakkar": "sugars", // Hindi for sugar
  "gur": "sugars", // Hindi for jaggery
  "shahad": "sugars", // Hindi for honey
  "mithai": "sugars", // Hindi for sweets
};

// Function to map food items to their food groups
export function mapFoodToGroup(foodName: string): string {
  const normalizedName = foodName.toLowerCase().trim();
  
  // Check if the exact name exists in our mapping
  if (foodMappings[normalizedName]) {
    return foodMappings[normalizedName];
  }
  
  // Check if the name contains any key from our mapping
  for (const [key, value] of Object.entries(foodMappings)) {
    if (normalizedName.includes(key)) {
      return value;
    }
  }
  
  // If no match is found
  return "unknown";
}

// Function to categorize Indian food items based on their names
export function categorizeIndianFood(foodName: string): string {
  const normalizedName = foodName.toLowerCase().trim();
  
  // Check for cereals and grains
  if (/chawal|roti|chapati|paratha|naan|aata|atta|besan|suji|dalia|idli|dosa|sevai/.test(normalizedName)) {
    return "starchy_staples";
  }
  
  // Check for pulses and legumes
  if (/dal|daal|rajma|chana|chole|moong|urad|masoor|toor|arhar|bean|lobhia|moth/.test(normalizedName)) {
    return "legumes_nuts_seeds";
  }
  
  // Check for vegetables
  if (/palak|saag|gobhi|aloo|bhindi|baingan|tamatar|pyaaz|gajar|matar|tinda|torai|kaddu|lauki/.test(normalizedName)) {
    // Check for dark green leafy vegetables
    if (/palak|saag/.test(normalizedName)) {
      return "dark_green_leafy_veg";
    }
    // Check for vitamin A rich vegetables
    if (/gajar|kaddu/.test(normalizedName)) {
      return "vitamin_a_fruits_vegetables";
    }
    return "other_vegetables";
  }
  
  // Check for fruits
  if (/seb|kela|santara|aam|amrood|papita|ananas|angoor|nashpati|anar|jamun|tarbooj/.test(normalizedName)) {
    // Check for vitamin A rich fruits
    if (/aam|papita/.test(normalizedName)) {
      return "vitamin_a_fruits_vegetables";
    }
    return "other_fruits";
  }
  
  // Check for dairy products
  if (/doodh|dahi|paneer|ghee|makhan|lassi|chaas|khoya|mava/.test(normalizedName)) {
    return "dairy";
  }
  
  // Check for meat and eggs
  if (/machli|machi|gosht|mutton|chicken|murgi|murga|anda|anday/.test(normalizedName)) {
    if (/anda|anday/.test(normalizedName)) {
      return "eggs";
    }
    return "meat_fish";
  }
  
  // Check for sweets and desserts
  if (/mithai|jalebi|halwa|barfi|ladoo|peda|gulab jamun|rasgulla|kheer|payasam|rabri/.test(normalizedName)) {
    return "sugars";
  }
  
  // Check for oils and fats
  if (/tel|ghee|makhan|cream|malai/.test(normalizedName)) {
    return "oils_fats";
  }
  
  return "unknown";
}

// Function to guess the food group for a food item
export function guessFoodGroup(foodName: string): string {
  const hindiGroup = categorizeIndianFood(foodName);
  if (hindiGroup !== "unknown") {
    return hindiGroup;
  }
  
  return mapFoodToGroup(foodName);
}

// Function to get ingredients for a dish
export const knownDishes: Record<string, string[]> = {
  "pizza": ["flour", "cheese", "tomato", "olive oil"],
  "burger": ["bread", "meat", "lettuce", "tomato", "onion"],
  "pasta": ["flour", "egg", "olive oil"],
  "sushi": ["rice", "fish", "seaweed", "vinegar"],
  "curry": ["spices", "onion", "tomato", "vegetables", "meat"],
  "biryani": ["rice", "meat", "spices", "onion", "yogurt"],
  "dal": ["lentils", "onion", "tomato", "spices"],
  "salad": ["lettuce", "tomato", "cucumber", "olive oil"],
  "sandwich": ["bread", "cheese", "vegetables", "meat"],
  "soup": ["vegetables", "water", "spices"],
  "noodles": ["wheat", "water", "vegetables"],
  "pancake": ["flour", "egg", "milk", "butter"],
  "omelette": ["egg", "milk", "vegetables", "cheese"],
  "stir fry": ["vegetables", "oil", "meat", "sauce"],
  "taco": ["corn", "meat", "lettuce", "cheese", "tomato"],
  "samosa": ["flour", "potato", "peas", "spices", "oil"],
  "dosa": ["rice", "lentils", "potato", "oil"],
  "idli": ["rice", "lentils", "water"],
  "paratha": ["wheat", "oil", "vegetables"],
  "roti": ["wheat", "water"]
};

export function getIngredientsForDish(dishName: string): string[] {
  const normalizedName = dishName.toLowerCase().trim();
  
  // Check if the dish is in our known dishes
  for (const [dish, ingredients] of Object.entries(knownDishes)) {
    if (normalizedName.includes(dish)) {
      return ingredients;
    }
  }
  
  // Return an empty array if dish is not recognized
  return [];
}

// Process food text to identify food groups
export function processFoodText(foodText: string): number[] {
  const foodItems = foodText.toLowerCase()
    .split(/[,;\n\s]+/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
  
  const foodGroupIds = new Set<number>();
  
  foodItems.forEach(food => {
    // Try to get ingredients if it's a dish
    const ingredients = getIngredientsForDish(food);
    if (ingredients.length > 0) {
      ingredients.forEach(ingredient => {
        addFoodGroupId(foodGroupIds, guessFoodGroup(ingredient));
      });
    } else {
      // Try to identify the food group directly
      addFoodGroupId(foodGroupIds, guessFoodGroup(food));
    }
  });
  
  return Array.from(foodGroupIds);
}

// Helper function to add food group IDs to a set
function addFoodGroupId(groupSet: Set<number>, groupName: string) {
  if (groupName === "starchy_staples") groupSet.add(1);
  else if (groupName === "vitamin_a_fruits_vegetables") {
    groupSet.add(3);
    groupSet.add(6);
  }
  else if (groupName === "dark_green_leafy_veg") groupSet.add(4);
  else if (groupName === "other_vegetables") groupSet.add(5);
  else if (groupName === "other_fruits") groupSet.add(7);
  else if (groupName === "organ_meat") groupSet.add(8);
  else if (groupName === "meat_fish") {
    groupSet.add(9);
    groupSet.add(11);
  }
  else if (groupName === "eggs") groupSet.add(10);
  else if (groupName === "legumes_nuts_seeds") groupSet.add(12);
  else if (groupName === "dairy") groupSet.add(13);
  else if (groupName === "oils_fats") groupSet.add(14);
  else if (groupName === "sugars") groupSet.add(15);
  else if (groupName === "spices_condiments") groupSet.add(16);
}
