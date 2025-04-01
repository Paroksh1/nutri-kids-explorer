// A utility to map common food names to standardized names for better recognition
// Includes Hindi to English translations and food group mappings

// Hindi to English translation map
const hindiToEnglishMap: Record<string, string> = {
  "चावल": "rice",
  "आलू": "potato",
  "प्याज": "onion",
  "टमाटर": "tomato",
  "गोभी": "cabbage",
  "फूलगोभी": "cauliflower",
  "मटर": "peas",
  "गाजर": "carrot",
  "भिंडी": "okra",
  "बैंगन": "eggplant",
  "मिर्च": "chili",
  "अदरक": "ginger",
  "लहसुन": "garlic",
  "धनिया": "coriander",
  "जीरा": "cumin",
  "हल्दी": "turmeric",
  "दाल": "lentil",
  "चना": "chickpea",
  "राजमा": "kidney beans",
  "मूंग": "mung beans",
  "पनीर": "cheese",
  "दही": "yogurt",
  "घी": "ghee",
  "मक्खन": "butter",
  "दूध": "milk",
  "अंडा": "egg",
  "मुर्गी": "chicken",
  "मछली": "fish",
  "चपाती": "chapati",
  "रोटी": "roti",
  "नान": "naan",
  "परांठा": "paratha",
  "पुलाव": "pilaf",
  "बिरयानी": "biryani",
  "समोसा": "samosa",
  "पकोड़ा": "pakora",
  "खीर": "rice pudding",
  "हलवा": "halwa",
  "जलेबी": "jalebi",
  "गुलाब जामुन": "gulab jamun",
  "रसगुल्ला": "rasgulla",
  "पेड़ा": "peda",
  "केला": "banana",
  "सेब": "apple",
  "संतरा": "orange",
  "अंगूर": "grapes",
  "आम": "mango",
  "पपीता": "papaya",
  "तरबूज": "watermelon",
  "खरबूजा": "muskmelon",
  "अनार": "pomegranate",
  "अनानास": "pineapple",
  "चाय": "tea",
  "कॉफी": "coffee",
  "पानी": "water",
  "लस्सी": "lassi",
  "नींबू पानी": "lemon water",
  
  // Adding more common Hindi food terms
  "छाछ": "buttermilk",
  "मट्ठा": "buttermilk",
  "शाक": "vegetable",
  "साग": "leafy greens",
  "पालक": "spinach",
  "मेथी": "fenugreek leaves",
  "सरसों का साग": "mustard greens",
  "बथुआ": "chenopodium",
  "चौलाई": "amaranth leaves",
  "तोरी": "ridge gourd",
  "लौकी": "bottle gourd",
  "करेला": "bitter gourd",
  "कद्दू": "pumpkin",
  "शकरकंद": "sweet potato",
  "अरबी": "taro root",
  "जिमीकंद": "yam",
  "शलजम": "turnip",
  "मूली": "radish",
  "खीरा": "cucumber",
  "नीबू": "lemon",
  "नारियल": "coconut",
  "बादाम": "almond",
  "काजू": "cashew",
  "अखरोट": "walnut",
  "किशमिश": "raisin",
  "मुनक्का": "dried grapes",
  "छोले": "chickpea",
  "मूंगफली": "peanut",
  "तिल": "sesame seeds",
  "सरसों": "mustard seeds",
  "अजवाइन": "carom seeds",
  "मेथी दाना": "fenugreek seeds",
  "सौंफ": "fennel seeds",
  "इलायची": "cardamom",
  "दालचीनी": "cinnamon",
  "लौंग": "clove",
  "जावित्री": "mace",
  "जायफल": "nutmeg",
  "काली मिर्च": "black pepper",
  "पिस्ता": "pistachio",
  "खजूर": "dates",
  "अंजीर": "fig",
  "बाजरा": "pearl millet",
  "ज्वार": "sorghum",
  "रागी": "finger millet",
  "मक्का": "corn",
  "जौ": "barley",
  "बेसन": "gram flour",
  "आटा": "wheat flour",
  "मैदा": "refined flour",
  "सूजी": "semolina",
  "इडली": "idli",
  "डोसा": "dosa",
  "उपमा": "upma",
  "पोहा": "flattened rice",
  "सत्तू": "roasted gram flour",
  "भरवां": "stuffed",
  "भुना": "roasted",
  "तला": "fried",
  "उबला": "boiled",
  "भजिया": "fritter",
  
  // Also add English terms for better matching
  "dal": "lentil",
  "milk": "milk",
  "curd": "yogurt",
  "yoghurt": "yogurt",
  "butter": "butter",
  "ghee": "ghee",
  "cheese": "cheese",
  "buttermilk": "buttermilk",
  "paneer": "cheese",
  "rice": "rice",
  "wheat": "wheat",
  "roti": "roti",
  "bread": "bread"
};

// Map of food names to their food groups (using the WHO/FAO dietary diversity groups)
const foodGroupMap: Record<string, string> = {
  // Starchy staples (cereals and tubers)
  "rice": "starchy_staples",
  "wheat": "starchy_staples",
  "bread": "starchy_staples",
  "pasta": "starchy_staples",
  "barley": "starchy_staples",
  "oats": "starchy_staples",
  "corn": "starchy_staples",
  "maize": "starchy_staples",
  "potato": "starchy_staples",
  "cassava": "starchy_staples",
  "yam": "starchy_staples",
  "plantain": "starchy_staples",
  "chapati": "starchy_staples",
  "roti": "starchy_staples",
  "naan": "starchy_staples",
  "paratha": "starchy_staples",
  "dosa": "starchy_staples",
  "idli": "starchy_staples",
  "semolina": "starchy_staples",
  "couscous": "starchy_staples",
  "quinoa": "starchy_staples",
  "tapioca": "starchy_staples",
  
  // Dark green leafy vegetables
  "spinach": "dark_green_leafy_veg",
  "kale": "dark_green_leafy_veg",
  "collard greens": "dark_green_leafy_veg",
  "mustard greens": "dark_green_leafy_veg",
  "broccoli": "dark_green_leafy_veg",
  "amaranth leaves": "dark_green_leafy_veg",
  "lettuce": "dark_green_leafy_veg",
  "arugula": "dark_green_leafy_veg",
  "chard": "dark_green_leafy_veg",
  "methi": "dark_green_leafy_veg",
  "sarson ka saag": "dark_green_leafy_veg",
  "bathua": "dark_green_leafy_veg",
  "fenugreek leaves": "dark_green_leafy_veg",
  "chenopodium": "dark_green_leafy_veg",
  "leafy greens": "dark_green_leafy_veg",
  
  // Vitamin A rich fruits and vegetables
  "carrot": "vitamin_a_fruits_vegetables",
  "pumpkin": "vitamin_a_fruits_vegetables",
  "squash": "vitamin_a_fruits_vegetables",
  "sweet potato": "vitamin_a_fruits_vegetables",
  "papaya": "vitamin_a_fruits_vegetables",
  "mango": "vitamin_a_fruits_vegetables",
  "cantaloupe": "vitamin_a_fruits_vegetables",
  "apricot": "vitamin_a_fruits_vegetables",
  "red bell pepper": "vitamin_a_fruits_vegetables",
  
  // Other vegetables
  "tomato": "other_vegetables",
  "onion": "other_vegetables",
  "eggplant": "other_vegetables",
  "cabbage": "other_vegetables",
  "cauliflower": "other_vegetables",
  "green beans": "other_vegetables",
  "cucumber": "other_vegetables",
  "zucchini": "other_vegetables",
  "peas": "other_vegetables",
  "bell pepper": "other_vegetables",
  "okra": "other_vegetables",
  "celery": "other_vegetables",
  "radish": "other_vegetables",
  "turnip": "other_vegetables",
  "mushroom": "other_vegetables",
  "gourd": "other_vegetables",
  "bittergourd": "other_vegetables",
  "ridgegourd": "other_vegetables",
  "bottlegourd": "other_vegetables",
  
  // Other fruits
  "apple": "other_fruits",
  "banana": "other_fruits",
  "orange": "other_fruits",
  "grapefruit": "other_fruits",
  "lemon": "other_fruits",
  "lime": "other_fruits",
  "pear": "other_fruits",
  "peach": "other_fruits",
  "plum": "other_fruits",
  "grapes": "other_fruits",
  "strawberry": "other_fruits",
  "blueberry": "other_fruits",
  "raspberry": "other_fruits",
  "blackberry": "other_fruits",
  "pineapple": "other_fruits",
  "watermelon": "other_fruits",
  "kiwi": "other_fruits",
  "pomegranate": "other_fruits",
  "guava": "other_fruits",
  "lychee": "other_fruits",
  "fig": "other_fruits",
  "date": "other_fruits",
  "raisin": "other_fruits",
  
  // Organ meat
  "liver": "organ_meat",
  "kidney": "organ_meat",
  "heart": "organ_meat",
  "brain": "organ_meat",
  "tripe": "organ_meat",
  "thymus": "organ_meat",
  "sweetbread": "organ_meat",
  
  // Meat and fish
  "beef": "meat_fish",
  "pork": "meat_fish",
  "lamb": "meat_fish",
  "goat": "meat_fish",
  "chicken": "meat_fish",
  "duck": "meat_fish",
  "turkey": "meat_fish",
  "fish": "meat_fish",
  "shrimp": "meat_fish",
  "crab": "meat_fish",
  "lobster": "meat_fish",
  "clam": "meat_fish",
  "oyster": "meat_fish",
  "mussel": "meat_fish",
  "squid": "meat_fish",
  "octopus": "meat_fish",
  "venison": "meat_fish",
  "rabbit": "meat_fish",
  "frog legs": "meat_fish",
  "quail": "meat_fish",
  
  // Eggs
  "egg": "eggs",
  "chicken egg": "eggs",
  "duck egg": "eggs",
  "quail egg": "eggs",
  "goose egg": "eggs",
  
  // Legumes, nuts and seeds
  "beans": "legumes_nuts_seeds",
  "lentil": "legumes_nuts_seeds",
  "dal": "legumes_nuts_seeds",
  "chickpea": "legumes_nuts_seeds",
  "kidney beans": "legumes_nuts_seeds",
  "mung beans": "legumes_nuts_seeds",
  "black beans": "legumes_nuts_seeds",
  "peanut": "legumes_nuts_seeds",
  "almond": "legumes_nuts_seeds",
  "cashew": "legumes_nuts_seeds",
  "walnut": "legumes_nuts_seeds",
  "pistachio": "legumes_nuts_seeds",
  "hazelnut": "legumes_nuts_seeds",
  "pecan": "legumes_nuts_seeds",
  "sunflower seeds": "legumes_nuts_seeds",
  "pumpkin seeds": "legumes_nuts_seeds",
  "flax seeds": "legumes_nuts_seeds",
  "chia seeds": "legumes_nuts_seeds",
  "sesame seeds": "legumes_nuts_seeds",
  "pine nuts": "legumes_nuts_seeds",
  "macadamia": "legumes_nuts_seeds",
  "brazil nuts": "legumes_nuts_seeds",
  "rajma": "legumes_nuts_seeds",
  "chana": "legumes_nuts_seeds",
  "moong": "legumes_nuts_seeds",
  "masoor": "legumes_nuts_seeds",
  "urad": "legumes_nuts_seeds",
  "toor": "legumes_nuts_seeds",
  "arhar": "legumes_nuts_seeds",
  
  // Milk and milk products
  "milk": "dairy",
  "cheese": "dairy",
  "yogurt": "dairy",
  "butter": "dairy",
  "ghee": "dairy",
  "cream": "dairy",
  "ice cream": "dairy",
  "buttermilk": "dairy",
  "lassi": "dairy",
  "paneer": "dairy",
  "dahi": "dairy",
  "curd": "dairy",
  "chaas": "dairy",
  "khoa": "dairy",
  "rabri": "dairy",
  "shrikhand": "dairy",
  "chhena": "dairy",
  "mawa": "dairy",
  "kefir": "dairy",
  "whey": "dairy",
  "ricotta": "dairy",
  "mascarpone": "dairy",
  "cottage cheese": "dairy",
  "quark": "dairy",
  "sour cream": "dairy",
  
  // Others (not counted in WHO DD groups but useful for reference)
  "oil": "oils_fats",
  "olive oil": "oils_fats",
  "coconut oil": "oils_fats",
  "vegetable oil": "oils_fats",
  "mustard oil": "oils_fats",
  "sesame oil": "oils_fats",
  "lard": "oils_fats",
  "tallow": "oils_fats",
  
  "sugar": "sugars",
  "honey": "sugars",
  "jaggery": "sugars",
  "maple syrup": "sugars",
  "molasses": "sugars",
  
  "salt": "spices_condiments",
  "pepper": "spices_condiments",
  "turmeric": "spices_condiments",
  "cumin": "spices_condiments",
  "coriander": "spices_condiments",
  "ginger": "spices_condiments",
  "garlic": "spices_condiments",
  "chili": "spices_condiments",
  "cinnamon": "spices_condiments",
  "cardamom": "spices_condiments",
  "clove": "spices_condiments",
  "nutmeg": "spices_condiments",
  "soy sauce": "spices_condiments",
  "vinegar": "spices_condiments",
  "ketchup": "spices_condiments",
  "mustard": "spices_condiments",
  "mayonnaise": "spices_condiments",
  
  "tea": "beverages",
  "coffee": "beverages",
  "alcohol": "beverages",
  "soda": "beverages",
  "juice": "beverages",
  "water": "beverages"
};

// Dictionary mapping dishes to their common ingredients
const dishToIngredientsMap: Record<string, string[]> = {
  "chapati": ["wheat"],
  "roti": ["wheat"],
  "naan": ["wheat", "milk"],
  "paratha": ["wheat", "oil"],
  "dal": ["lentil"],
  "rajma": ["kidney beans"],
  "chole": ["chickpea"],
  "rice": ["rice"],
  "biryani": ["rice", "vegetables", "spices"],
  "pulao": ["rice", "vegetables", "spices"],
  "idli": ["rice", "lentil"],
  "dosa": ["rice", "lentil"],
  "uttapam": ["rice", "lentil", "vegetables"],
  "sambar": ["lentil", "vegetables", "spices"],
  "rasam": ["tomato", "spices"],
  "palak paneer": ["spinach", "cheese", "spices"],
  "matar paneer": ["peas", "cheese", "spices"],
  "aloo gobi": ["potato", "cauliflower", "spices"],
  "aloo matar": ["potato", "peas", "spices"],
  "bhindi masala": ["okra", "spices"],
  "baingan bharta": ["eggplant", "spices"],
  "chana masala": ["chickpea", "spices"],
  "butter chicken": ["chicken", "butter", "cream", "spices"],
  "tandoori chicken": ["chicken", "yogurt", "spices"],
  "chicken curry": ["chicken", "spices"],
  "fish curry": ["fish", "spices"],
  "egg curry": ["egg", "spices"],
  "kheer": ["rice", "milk", "sugar"],
  "gulab jamun": ["milk", "sugar"],
  "rasgulla": ["cheese", "sugar"],
  "jalebi": ["wheat", "sugar"],
  "ladoo": ["chickpea flour", "sugar"],
  "halwa": ["semolina", "sugar", "ghee"],
  
  // Adding more Hindi dish names with proper ingredient mappings
  "दही": ["yogurt"],
  "पनीर": ["cheese"],
  "छाछ": ["buttermilk"],
  "पालक पनीर": ["spinach", "cheese", "spices"],
  "मट्ठा": ["buttermilk"],
  "पालक": ["spinach"],
  "मेथी": ["fenugreek leaves"],
  "बथुआ": ["chenopodium"],
  "चौलाई": ["amaranth leaves"],
  "सरसों का साग": ["mustard greens"],
  "आलू मटर": ["potato", "peas", "spices"],
  "छोले": ["chickpea", "spices"],
  "डाल": ["lentil"],
  "खीर": ["rice", "milk", "sugar"],
  "रसमलाई": ["cheese", "milk", "sugar"],
  "मिठाई": ["milk", "sugar"],
  "दूध": ["milk"],
  "सब्जी": ["vegetables", "spices"],
  "सलाद": ["vegetables"],
  "फल": ["fruits"],
  "अंडा करी": ["egg", "spices"],
  "अंडा भुर्जी": ["egg", "vegetables", "spices"],
  "मछली करी": ["fish", "spices"],
  "मटन करी": ["meat", "spices"],
  "चिकन करी": ["chicken", "spices"]
};

// Function to get ingredients for a dish
export const getIngredientsForDish = (dish: string): string[] => {
  // Normalize input: lowercase and trim
  const normalizedDish = dish.toLowerCase().trim();
  
  // Check if dish exists in our mapping
  if (dishToIngredientsMap[normalizedDish]) {
    return dishToIngredientsMap[normalizedDish];
  }
  
  // If the dish isn't in our mapping, see if the name itself is a food item
  if (foodGroupMap[normalizedDish]) {
    return [normalizedDish];
  }
  
  // Check Hindi translations
  const englishTerm = hindiToEnglishMap[normalizedDish];
  if (englishTerm) {
    if (dishToIngredientsMap[englishTerm]) {
      return dishToIngredientsMap[englishTerm];
    } else if (foodGroupMap[englishTerm]) {
      return [englishTerm];
    }
  }
  
  // Default case: return empty array if we can't identify the dish
  return [];
};

// Function to get the food group for a specific ingredient
export const getFoodGroup = (ingredient: string): string => {
  const normalizedIngredient = ingredient.toLowerCase().trim();
  
  // Check if the ingredient is in our food group map
  if (foodGroupMap[normalizedIngredient]) {
    return foodGroupMap[normalizedIngredient];
  }
  
  // Check Hindi translations
  const englishTerm = hindiToEnglishMap[normalizedIngredient];
  if (englishTerm && foodGroupMap[englishTerm]) {
    return foodGroupMap[englishTerm];
  }
  
  // Default if we can't identify the food group
  return "unknown";
};

// Process the food text to identify food groups
export const processFoodText = (foodText: string): number[] => {
  // Check for empty input
  if (!foodText || foodText.trim() === '') {
    return [];
  }
  
  // Initialize set to track which food groups we've found
  const groupsFound = new Set<string>();
  
  // Normalize and split the text by common separators
  const foods = foodText.toLowerCase().split(/[,;\n\s]+/).map(f => f.trim()).filter(f => f !== '');
  console.log("Processing food items:", foods);
  
  // Process each food item
  foods.forEach(food => {
    // Direct check for common foods in Hindi and English
    // Dairy products
    if (["दही", "छाछ", "दूध", "पनीर", "मट्ठा", "मक्खन", "घी", 
         "milk", "dahi", "curd", "yogurt", "butter", "ghee", "cheese", 
         "buttermilk", "paneer"].includes(food)) {
      groupsFound.add("dairy");
      console.log(`Found dairy product: ${food}`);
      return;
    }
    
    // Lentils/pulses/dals
    if (["दाल", "चना", "राजमा", "मूंग", "मसूर", "उड़द", "अरहर", 
         "dal", "lentil", "rajma", "chana", "moong", "masoor", "urad", 
         "toor", "pulses", "beans"].includes(food)) {
      groupsFound.add("legumes_nuts_seeds");
      console.log(`Found legume: ${food}`);
      return;
    }
    
    // Check if it's a dish with multiple ingredients
    const ingredients = getIngredientsForDish(food);
    
    if (ingredients.length > 0) {
      // Process each ingredient in the dish
      ingredients.forEach(ingredient => {
        const foodGroup = getFoodGroup(ingredient);
        if (foodGroup !== "unknown") {
          groupsFound.add(foodGroup);
          console.log(`Found ingredient ${ingredient} in group ${foodGroup}`);
        }
      });
    } else {
      // If not recognized as a dish, try as a single ingredient
      const foodGroup = getFoodGroup(food);
      if (foodGroup !== "unknown") {
        groupsFound.add(foodGroup);
        console.log(`Found food ${food} in group ${foodGroup}`);
      } else {
        // Check if it's a Hindi food with a direct translation
        const englishTerm = hindiToEnglishMap[food];
        if (englishTerm) {
          const translatedGroup = getFoodGroup(englishTerm);
          if (translatedGroup !== "unknown") {
            groupsFound.add(translatedGroup);
            console.log(`Translated ${food} to ${englishTerm} in group ${translatedGroup}`);
          }
        }
      }
    }
  });
  
  console.log("Found food groups:", Array.from(groupsFound));
  
  // Map the found groups to the 16 group IDs used in the app
  const groupIds: number[] = [];
  
  if (groupsFound.has("starchy_staples")) groupIds.push(1);
  if (groupsFound.has("dark_green_leafy_veg")) groupIds.push(4);
  if (groupsFound.has("vitamin_a_fruits_vegetables")) groupIds.push(3);
  if (groupsFound.has("other_vegetables")) groupIds.push(5);
  if (groupsFound.has("other_fruits")) groupIds.push(7);
  if (groupsFound.has("organ_meat")) groupIds.push(8);
  if (groupsFound.has("meat_fish")) groupIds.push(9);
  if (groupsFound.has("eggs")) groupIds.push(10);
  if (groupsFound.has("legumes_nuts_seeds")) groupIds.push(12);
  if (groupsFound.has("dairy")) groupIds.push(13);
  if (groupsFound.has("oils_fats")) groupIds.push(14);
  if (groupsFound.has("sugars")) groupIds.push(15);
  if (groupsFound.has("spices_condiments") || groupsFound.has("beverages")) groupIds.push(16);
  
  console.log("Resulting group IDs:", groupIds);
  
  return groupIds;
};
