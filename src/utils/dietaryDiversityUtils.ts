import { getIngredientsForDish, guessFoodGroup, processFoodText } from "./foodNameMapper";

// Food groups according to FAO/WHO guidelines
export const foodGroupsGlobal = {
  starchy_staples: "Grains, roots, and tubers",
  dark_green_leafy_veg: "Dark green leafy vegetables",
  vitamin_a_fruits_vegetables: "Vitamin A rich fruits and vegetables",
  other_fruits: "Other fruits",
  other_vegetables: "Other vegetables",
  organ_meat: "Organ meat",
  meat_fish: "Meat and fish",
  eggs: "Eggs",
  legumes_nuts_seeds: "Legumes, nuts and seeds",
  dairy: "Milk and milk products",
  oils_fats: "Oils and fats",
  sugars: "Sweets and sugars",
  spices_condiments: "Spices, condiments, beverages"
};

// Hindi dish to food group mapping
const hindiDishToFoodGroup: Record<string, string> = {
  // Rice & grains
  "chawal": "starchy_staples",
  "bhaat": "starchy_staples",
  "rice": "starchy_staples",
  "biryani": "starchy_staples",
  "pulao": "starchy_staples",
  "khichdi": "starchy_staples",
  
  // Breads
  "roti": "starchy_staples",
  "chapati": "starchy_staples",
  "paratha": "starchy_staples",
  "naan": "starchy_staples",
  "puri": "starchy_staples",
  "bhakri": "starchy_staples",
  "thepla": "starchy_staples",
  "dosa": "starchy_staples",
  "idli": "starchy_staples",
  "appam": "starchy_staples",
  "uttapam": "starchy_staples",
  
  // Legumes & pulses
  "dal": "legumes_nuts_seeds",
  "rajma": "legumes_nuts_seeds",
  "chana": "legumes_nuts_seeds",
  "chole": "legumes_nuts_seeds",
  "sambhar": "legumes_nuts_seeds",
  "masoor": "legumes_nuts_seeds",
  "toor": "legumes_nuts_seeds",
  "moong": "legumes_nuts_seeds",
  "urad": "legumes_nuts_seeds",
  
  // Dairy
  "dahi": "dairy",
  "yogurt": "dairy",
  "paneer": "dairy",
  "cheese": "dairy",
  "butter": "dairy",
  "ghee": "dairy",
  "makhan": "dairy",
  "lassi": "dairy",
  "chaas": "dairy",
  "milk": "dairy",
  "doodh": "dairy",
  
  // Vegetables
  "sabzi": "other_vegetables",
  "vegetables": "other_vegetables",
  "aloo": "starchy_staples",
  "potato": "starchy_staples",
  "gobi": "other_vegetables",
  "cauliflower": "other_vegetables",
  "matar": "legumes_nuts_seeds",
  "peas": "legumes_nuts_seeds",
  "bhindi": "other_vegetables",
  "okra": "other_vegetables",
  "baingan": "other_vegetables",
  "eggplant": "other_vegetables",
  "brinjal": "other_vegetables",
  "pyaz": "other_vegetables",
  "onion": "other_vegetables",
  "tamatar": "other_vegetables",
  "tomato": "other_vegetables",
  "lahsun": "other_vegetables",
  "garlic": "other_vegetables",
  "adrak": "other_vegetables",
  "ginger": "other_vegetables",
  "gajar": "vitamin_a_fruits_vegetables",
  "carrot": "vitamin_a_fruits_vegetables",
  "palak": "dark_green_leafy_veg",
  "spinach": "dark_green_leafy_veg",
  "methi": "dark_green_leafy_veg",
  "fenugreek": "dark_green_leafy_veg",
  "sarson": "dark_green_leafy_veg",
  "mustard greens": "dark_green_leafy_veg",
  
  // Fruits
  "aam": "vitamin_a_fruits_vegetables",
  "mango": "vitamin_a_fruits_vegetables",
  "kela": "other_fruits",
  "banana": "other_fruits",
  "seb": "other_fruits",
  "apple": "other_fruits",
  "santra": "other_fruits",
  "orange": "other_fruits",
  "papita": "vitamin_a_fruits_vegetables",
  "papaya": "vitamin_a_fruits_vegetables",
  "ananas": "other_fruits",
  "pineapple": "other_fruits",
  
  // Meat & Fish
  "chicken": "meat_fish",
  "murgh": "meat_fish",
  "mutton": "meat_fish",
  "gosht": "meat_fish",
  "machli": "meat_fish",
  "fish": "meat_fish",
  "jhinga": "meat_fish",
  "prawn": "meat_fish",
  "keema": "meat_fish",
  "minced meat": "meat_fish",
  
  // Eggs
  "anda": "eggs",
  "egg": "eggs",
  "omelette": "eggs",
  
  // Nuts & Seeds
  "badam": "legumes_nuts_seeds",
  "almond": "legumes_nuts_seeds",
  "akhrot": "legumes_nuts_seeds",
  "walnut": "legumes_nuts_seeds",
  "kaju": "legumes_nuts_seeds",
  "cashew": "legumes_nuts_seeds",
  "pista": "legumes_nuts_seeds",
  "pistachio": "legumes_nuts_seeds",
  "til": "legumes_nuts_seeds",
  "sesame": "legumes_nuts_seeds",
  "moongfali": "legumes_nuts_seeds",
  "peanut": "legumes_nuts_seeds",
  
  // Oils & Fats
  "tel": "oils_fats",
  "oil": "oils_fats",
  
  // Sweets & Desserts
  "mithai": "sugars",
  "sweet": "sugars",
  "jalebi": "sugars",
  "gulab jamun": "sugars",
  "rasgulla": "sugars",
  "halwa": "sugars",
  "barfi": "sugars",
  "ladoo": "sugars",
  "kheer": "sugars",
  "payasam": "sugars",
  "shrikhand": "sugars",
  
  // Spices & Condiments
  "masala": "spices_condiments",
  "spice": "spices_condiments",
  "haldi": "spices_condiments",
  "turmeric": "spices_condiments",
  "jeera": "spices_condiments",
  "cumin": "spices_condiments",
  "dhaniya": "spices_condiments",
  "coriander": "spices_condiments",
  "mirch": "spices_condiments",
  "chilli": "spices_condiments",
  "namak": "spices_condiments",
  "salt": "spices_condiments",
  "chai": "spices_condiments",
  "tea": "spices_condiments",
  "coffee": "spices_condiments",
  
  // Indian Dishes
  "dal-chawal": "mixed",
  "butter chicken": "meat_fish",
  "chicken tikka": "meat_fish",
  "tandoori chicken": "meat_fish",
  "malai kofta": "mixed",
  "chana masala": "legumes_nuts_seeds",
  "rajma chawal": "legumes_nuts_seeds",
  "pav bhaji": "mixed",
  "vada pav": "starchy_staples",
  "samosa": "starchy_staples",
  "pakora": "mixed",
  "bhaji": "other_vegetables",
  "upma": "starchy_staples",
  "poha": "starchy_staples",
  "dhokla": "legumes_nuts_seeds",
  "khandvi": "legumes_nuts_seeds",
  "thali": "mixed",
  "saag": "dark_green_leafy_veg",
  "korma": "meat_fish",
  "curry": "mixed",
  "tikka": "meat_fish",
  "seekh kebab": "meat_fish",
  "bhurji": "eggs",
  
  // Fast Food / International
  "pizza": "mixed",
  "burger": "mixed",
  "sandwich": "mixed",
  "pasta": "starchy_staples",
  "noodles": "starchy_staples",
  "maggi": "starchy_staples",
  "chowmein": "starchy_staples",
  "fried rice": "starchy_staples",
  "manchurian": "mixed",
  "momo": "mixed",
  "dumpling": "starchy_staples",
  "roll": "mixed",
  "paratha roll": "mixed",
  "frankies": "mixed",
  "chaat": "mixed",
  "golgappa": "starchy_staples",
  "pani puri": "starchy_staples"
};

// Function to identify Hindi foods and map them to food groups
export function identifyHindiFood(foodItem: string): string[] {
  const lowerFoodItem = foodItem.toLowerCase().trim();
  
  // Direct match with a Hindi food name
  if (hindiDishToFoodGroup[lowerFoodItem]) {
    return [hindiDishToFoodGroup[lowerFoodItem]];
  }
  
  // Check for partial matches
  for (const [hindiFood, foodGroup] of Object.entries(hindiDishToFoodGroup)) {
    if (lowerFoodItem.includes(hindiFood)) {
      return [foodGroup];
    }
  }
  
  return [];
}

// Function to get food group based on Hindi food name
export function getHindiFoodGroup(foodItem: string): string {
  const groups = identifyHindiFood(foodItem);
  return groups.length > 0 ? groups[0] : "unknown";
}

// Enhanced global food recognition database with more common foods and spelling variations
const globalFoods: Record<string, string[]> = {
  // Western foods
  "pizza": ["starchy_staples", "dairy", "other_vegetables"],
  "burger": ["starchy_staples", "meat_fish", "other_vegetables"],
  "sandwich": ["starchy_staples", "mixed"],
  "pasta": ["starchy_staples"],
  "spaghetti": ["starchy_staples"],
  "macaroni": ["starchy_staples"],
  "lasagna": ["starchy_staples", "dairy", "other_vegetables"],
  "bread": ["starchy_staples"],
  "bagel": ["starchy_staples"],
  "croissant": ["starchy_staples"],
  "toast": ["starchy_staples"],
  "cereal": ["starchy_staples"],
  "oatmeal": ["starchy_staples"],
  "pancake": ["starchy_staples", "eggs"],
  "waffle": ["starchy_staples", "eggs"],
  "french toast": ["starchy_staples", "eggs"],
  "muffin": ["starchy_staples", "sugars"],
  "donut": ["starchy_staples", "sugars"],
  "cake": ["starchy_staples", "sugars", "eggs"],
  "cookie": ["starchy_staples", "sugars"],
  "biscuit": ["starchy_staples", "sugars"],
  "biscuits": ["starchy_staples", "sugars"],
  "cookie": ["starchy_staples", "sugars"],
  "cookies": ["starchy_staples", "sugars"],
  "pie": ["starchy_staples", "sugars"],
  "pastry": ["starchy_staples", "sugars"],
  "ice cream": ["dairy", "sugars"],
  "yogurt": ["dairy"],
  "cheese": ["dairy"],
  "milk": ["dairy"],
  "butter": ["dairy", "oils_fats"],
  "salad": ["other_vegetables"],
  "soup": ["mixed"],
  "stew": ["mixed"],
  "steak": ["meat_fish"],
  "chicken": ["meat_fish"],
  "beef": ["meat_fish"],
  "pork": ["meat_fish"],
  "lamb": ["meat_fish"],
  "turkey": ["meat_fish"],
  "fish": ["meat_fish"],
  "salmon": ["meat_fish"],
  "tuna": ["meat_fish"],
  "shrimp": ["meat_fish"],
  "crab": ["meat_fish"],
  "lobster": ["meat_fish"],
  "egg": ["eggs"],
  "eggs": ["eggs"],
  "omlet": ["eggs"],
  "omelette": ["eggs"],
  "omlette": ["eggs"],
  "omelet": ["eggs"],
  "scrambled eggs": ["eggs"],
  "fried egg": ["eggs"],
  "boiled egg": ["eggs"],
  "potato": ["starchy_staples"],
  "french fries": ["starchy_staples", "oils_fats"],
  "mashed potato": ["starchy_staples"],
  "rice": ["starchy_staples"],
  "beans": ["legumes_nuts_seeds"],
  "lentils": ["legumes_nuts_seeds"],
  "tofu": ["legumes_nuts_seeds"],
  "peanut": ["legumes_nuts_seeds"],
  "almond": ["legumes_nuts_seeds"],
  "walnut": ["legumes_nuts_seeds"],
  "cashew": ["legumes_nuts_seeds"],
  "apple": ["other_fruits"],
  "banana": ["other_fruits"],
  "orange": ["other_fruits"],
  "grape": ["other_fruits"],
  "strawberry": ["other_fruits"],
  "blueberry": ["other_fruits"],
  "raspberry": ["other_fruits"],
  "watermelon": ["other_fruits"],
  "mango": ["vitamin_a_fruits_vegetables"],
  "papaya": ["vitamin_a_fruits_vegetables"],
  "carrot": ["vitamin_a_fruits_vegetables"],
  "sweet potato": ["vitamin_a_fruits_vegetables"],
  "pumpkin": ["vitamin_a_fruits_vegetables"],
  "tomato": ["other_vegetables"],
  "cucumber": ["other_vegetables"],
  "lettuce": ["dark_green_leafy_veg"],
  "spinach": ["dark_green_leafy_veg"],
  "kale": ["dark_green_leafy_veg"],
  "broccoli": ["other_vegetables"],
  "cauliflower": ["other_vegetables"],
  "onion": ["other_vegetables"],
  "pepper": ["other_vegetables"],
  "garlic": ["other_vegetables"],
  "chocolate": ["sugars"],
  "candy": ["sugars"],
  "sweet": ["sugars"],
  "jam": ["sugars"],
  "jelly": ["sugars"],
  "honey": ["sugars"],
  "maple syrup": ["sugars"],
  "syrup": ["sugars"],
  "sugar": ["sugars"],
  "bread": ["starchy_staples"],
  "toast": ["starchy_staples"],
  "roll": ["starchy_staples"],
  "bun": ["starchy_staples"],
  "naan": ["starchy_staples"],
  "chapati": ["starchy_staples"],
  "roti": ["starchy_staples"],
  "tortilla": ["starchy_staples"],
  "crackers": ["starchy_staples"],
  "chips": ["starchy_staples", "oils_fats"],
  "popcorn": ["starchy_staples"],
  "cereal": ["starchy_staples"],
  "granola": ["starchy_staples", "legumes_nuts_seeds"],
  "muesli": ["starchy_staples", "legumes_nuts_seeds"],
  "oats": ["starchy_staples"],
  "porridge": ["starchy_staples"],
  
  // Asian foods
  "sushi": ["starchy_staples", "meat_fish"],
  "ramen": ["starchy_staples"],
  "pho": ["starchy_staples", "meat_fish"],
  "stir fry": ["mixed"],
  "fried rice": ["starchy_staples"],
  "pad thai": ["starchy_staples", "eggs"],
  "curry": ["mixed"],
  "biryani": ["starchy_staples", "meat_fish"],
  "naan": ["starchy_staples"],
  "samosa": ["starchy_staples"],
  "dim sum": ["mixed"],
  "spring roll": ["starchy_staples", "other_vegetables"],
  "dumpling": ["starchy_staples"],
  "bao": ["starchy_staples"],
  
  // Latin American foods
  "taco": ["starchy_staples", "meat_fish", "other_vegetables"],
  "burrito": ["starchy_staples", "legumes_nuts_seeds", "other_vegetables"],
  "enchilada": ["starchy_staples", "meat_fish", "other_vegetables"],
  "quesadilla": ["starchy_staples", "dairy"],
  "tortilla": ["starchy_staples"],
  "guacamole": ["other_fruits"],
  "salsa": ["other_vegetables"],
  "nachos": ["starchy_staples", "dairy"],
  "empanada": ["starchy_staples", "meat_fish"],
  
  // Middle Eastern foods
  "hummus": ["legumes_nuts_seeds"],
  "falafel": ["legumes_nuts_seeds"],
  "tabouleh": ["starchy_staples", "other_vegetables"],
  "pita": ["starchy_staples"],
  "kebab": ["meat_fish"],
  "shawarma": ["meat_fish", "starchy_staples"],
  "baklava": ["starchy_staples", "sugars"],
  
  // Beverages
  "coffee": ["spices_condiments"],
  "tea": ["spices_condiments"],
  "juice": ["other_fruits"],
  "smoothie": ["mixed"],
  "soda": ["sugars"],
  "water": ["spices_condiments"]
};

// Enhanced function to identify global foods and map them to food groups
export function identifyGlobalFood(foodItem: string): string[] {
  const lowerFoodItem = foodItem.toLowerCase().trim();
  
  // Direct match with a global food name
  if (globalFoods[lowerFoodItem]) {
    return globalFoods[lowerFoodItem];
  }
  
  // Check for partial matches
  for (const [globalFood, foodGroups] of Object.entries(globalFoods)) {
    if (lowerFoodItem.includes(globalFood)) {
      return foodGroups;
    }
    
    // Check for plurals (adding 's' at the end)
    if (globalFood + 's' === lowerFoodItem) {
      return foodGroups;
    }
    
    // Check for common spelling variations
    if (globalFood === 'omelet' && 
        (lowerFoodItem.includes('omlet') || 
         lowerFoodItem.includes('omlette') || 
         lowerFoodItem.includes('omelette'))) {
      return foodGroups;
    }
    
    if (globalFood === 'cookie' && lowerFoodItem.includes('biscuit')) {
      return ["starchy_staples", "sugars"];
    }
  }
  
  // If no match in global foods, try using the food mapper
  const foodGroup = guessFoodGroup(lowerFoodItem);
  if (foodGroup !== "unknown") {
    // Map food mapper groups to our global food groups
    if (foodGroup.includes("Grains")) return ["starchy_staples"];
    if (foodGroup.includes("Pulses")) return ["legumes_nuts_seeds"];
    if (foodGroup.includes("Nuts")) return ["legumes_nuts_seeds"];
    if (foodGroup.includes("Dairy")) return ["dairy"];
    if (foodGroup.includes("Meat")) return ["meat_fish"];
    if (foodGroup.includes("Eggs")) return ["eggs"];
    if (foodGroup.includes("Dark green")) return ["dark_green_leafy_veg"];
    if (foodGroup.includes("Vitamin A")) return ["vitamin_a_fruits_vegetables"];
    if (foodGroup.includes("Other vegetables")) return ["other_vegetables"];
    if (foodGroup.includes("Other fruits")) return ["other_fruits"];
  }
  
  // Try to identify ingredients in the food
  const ingredients = getIngredientsForDish(lowerFoodItem);
  if (ingredients.length > 0) {
    const foodGroups: string[] = [];
    
    ingredients.forEach(ingredient => {
      const groups = identifyGlobalFood(ingredient);
      groups.forEach(group => {
        if (!foodGroups.includes(group)) {
          foodGroups.push(group);
        }
      });
    });
    
    if (foodGroups.length > 0) {
      return foodGroups;
    }
  }
  
  // Additional fallback checks for common food categories
  if (lowerFoodItem.includes("biscuit") || 
      lowerFoodItem.includes("cookie") || 
      lowerFoodItem.includes("cracker")) {
    return ["starchy_staples", "sugars"];
  }
  
  if (lowerFoodItem.includes("egg") || 
      lowerFoodItem.includes("oml")) {
    return ["eggs"];
  }
  
  if (lowerFoodItem.includes("sweet") || 
      lowerFoodItem.includes("dessert") || 
      lowerFoodItem.includes("chocolate") || 
      lowerFoodItem.includes("candy")) {
    return ["sugars"];
  }
  
  return [];
}
