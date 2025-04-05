
import { getIngredientsForDish, getFoodGroup, processFoodText } from './foodNameMapper';

// Enhanced Hindi food dictionary for direct matching
const additionalHindiFoods: Record<string, number> = {
  // Dairy products (13)
  "दही": 13, "छाछ": 13, "दूध": 13, "पनीर": 13, "मट्ठा": 13, "मक्खन": 13, "घी": 13, 
  "लस्सी": 13, "श्रीखंड": 13, "रबड़ी": 13, "खोआ": 13, "चकका": 13, "छेना": 13, "कुल्फी": 13,
  
  // Cereals/Grains (1)
  "चावल": 1, "गेहूं": 1, "रोटी": 1, "आटा": 1, "पराठा": 1, "नान": 1, "चपाती": 1,
  "बाजरा": 1, "ज्वार": 1, "मक्का": 1, "सूजी": 1, "पोहा": 1, "दलिया": 1, "सत्तू": 1, 
  "इडली": 1, "डोसा": 1, "उत्तपम": 1, "चिवड़ा": 1, "मुरमुरा": 1,
  
  // Legumes/Pulses (12)
  "दाल": 12, "चना": 12, "राजमा": 12, "मूंग": 12, "मसूर": 12, "उड़द": 12, "अरहर": 12, 
  "लोबिया": 12, "काला चना": 12, "मटर": 12, "मूंगफली": 12, "तूर": 12, "काबुली चना": 12,
  
  // Vegetables (3, 4, 5)
  "आलू": 5, "प्याज": 5, "टमाटर": 5, "गोभी": 5, "फूलगोभी": 5, "भिंडी": 5, "बैंगन": 5,
  "करेला": 5, "लौकी": 5, "तोरई": 5, "पत्तागोभी": 5, "मूली": 5, "खीरा": 5, "शिमलामिर्च": 5,
  "अदरक": 16, "लहसुन": 16, "हरीमिर्च": 5, "कद्दू": 3, "शकरकंद": 3, "गाजर": 3,
  
  // Green leafy vegetables (4)
  "पालक": 4, "मेथी": 4, "सरसों का साग": 4, "बथुआ": 4, "चौलाई": 4, "पोई": 4, "हरी पत्तेदार सब्जियां": 4,
  
  // Fruits (6, 7)
  "केला": 7, "सेब": 7, "संतरा": 7, "अंगूर": 7, "नींबू": 7, "अनार": 7, "अमरूद": 7,
  "आम": 6, "पपीता": 6, "खरबूजा": 7, "तरबूज": 7, "जामुन": 7, "लीची": 7, "शरीफा": 7,
  "अनानास": 7, "नाशपाती": 7, "चीकू": 7, "अंजीर": 7, "खजूर": 7, "बेर": 7, "कटहल": 7,
  
  // Meat and fish (9, 11)
  "मछली": 11, "मुर्गी": 9, "चिकन": 9, "गोश्त": 9, "मटन": 9, "अंडा": 10, "झींगा": 11,
  "केकड़ा": 11, "सूअर का मांस": 9, "बकरी का मांस": 9, "मांस": 9, 
  
  // Nuts and seeds (12)
  "बादाम": 12, "काजू": 12, "अखरोट": 12, "पिस्ता": 12, "तिल": 12, "मखाना": 12, "चिया": 12,
  "सूरजमुखी के बीज": 12, "कद्दू के बीज": 12, "खसखस": 12, "सरसों": 12,
  
  // Oils and fats (14)
  "तेल": 14, "सरसों का तेल": 14, "जैतून का तेल": 14, "नारियल तेल": 14, "वनस्पति तेल": 14,
  
  // Spices and condiments (16)
  "हल्दी": 16, "धनिया": 16, "जीरा": 16, "गरम मसाला": 16, "लाल मिर्च": 16, "काली मिर्च": 16,
  "इलायची": 16, "दालचीनी": 16, "लौंग": 16, "सौंफ": 16, "अजवाइन": 16, "मेथी दाना": 16,
  "अचार": 16, "चटनी": 16, "नमक": 16,
  
  // Sweets (15)
  "मिठाई": 15, "गुलाब जामुन": 15, "रसगुल्ला": 15, "जलेबी": 15, "लड्डू": 15, "बर्फी": 15,
  "हलवा": 15, "पेड़ा": 15, "रसमलाई": 15, "खीर": 15, "सेवई": 15, "गजक": 15, "चीनी": 15, "शहद": 15,
  
  // Beverages (16)
  "चाय": 16, "कॉफी": 16, "पानी": 16, "नारियल पानी": 16, "फलों का रस": 16, "शरबत": 16
};

// Common English variants and phonetic spellings
const hindiFoodPhoneticVariants: Record<string, number> = {
  // Dairy variants
  "dahi": 13, "chaas": 13, "chaach": 13, "matha": 13, "mattha": 13, "paneer": 13, "ghee": 13,
  "dudh": 13, "doodh": 13, "makhan": 13, "lassi": 13, "shrikhand": 13, "rabri": 13, "khoa": 13,
  "kulfi": 13, "chhena": 13, "chakka": 13, "buttermilk": 13, "curd": 13, "yogurt": 13, "yoghurt": 13,
  
  // Cereal variants
  "chawal": 1, "atta": 1, "gehun": 1, "roti": 1, "paratha": 1, "parantha": 1, "naan": 1, 
  "chapati": 1, "chapatti": 1, "phulka": 1, "bajra": 1, "jowar": 1, "jwar": 1, "makka": 1, 
  "sooji": 1, "poha": 1, "dalia": 1, "sattu": 1, "idli": 1, "dosa": 1, "uttapam": 1, "chiwda": 1,
  
  // Pulse variants
  "dal": 12, "daal": 12, "chana": 12, "rajma": 12, "moong": 12, "masoor": 12, "urad": 12, 
  "arhar": 12, "toor": 12, "lobia": 12, "kala chana": 12, "matar": 12, "mungfali": 12, 
  "kabuli chana": 12, "chhole": 12, "chole": 12, "lentil": 12, "beans": 12,
  
  // Vegetable variants
  "aloo": 5, "pyaaz": 5, "pyaz": 5, "tamatar": 5, "gobhi": 5, "gobi": 5, "phool gobhi": 5, 
  "bhindi": 5, "baingan": 5, "karela": 5, "lauki": 5, "torai": 5, "patta gobhi": 5, "mooli": 5,
  "kheera": 5, "shimla mirch": 5, "adrak": 16, "lehsun": 16, "lahsun": 16, "hari mirch": 5,
  "kaddu": 3, "shakarkand": 3, "gajar": 3, "potato": 5, "onion": 5, "tomato": 5, "okra": 5,
  "eggplant": 5, "cauliflower": 5, "cabbage": 5, "carrot": 3, "cucumber": 5, "ginger": 16, "garlic": 16,
  
  // Green leafy vegetable variants
  "palak": 4, "methi": 4, "sarson ka saag": 4, "bathua": 4, "cholai": 4, "chaulai": 4, "poi": 4, 
  "spinach": 4, "fenugreek leaves": 4, "greens": 4, "leafy vegetables": 4, "saag": 4,
  
  // Fruit variants
  "kela": 7, "seb": 7, "santra": 7, "angoor": 7, "nimbu": 7, "anar": 7, "amrood": 7, "guava": 7,
  "aam": 6, "papita": 6, "papaya": 6, "mango": 6, "kharbuja": 7, "tarbuj": 7, "jamun": 7,
  "lichi": 7, "litchi": 7, "sitaphal": 7, "sharifa": 7, "ananas": 7, "nashpati": 7, "chiku": 7,
  "anjeer": 7, "khajoor": 7, "ber": 7, "kathal": 7, "banana": 7, "apple": 7, "orange": 7, "grapes": 7,
  
  // Meat and fish variants
  "machli": 11, "fish": 11, "murgi": 9, "chicken": 9, "gosht": 9, "mutton": 9, "meat": 9, "anda": 10,
  "egg": 10, "jhinga": 11, "kekda": 11, "crab": 11, "prawns": 11, "bakra": 9, "pork": 9, "goat": 9,
  
  // Nuts and seeds variants
  "badam": 12, "kaju": 12, "akhrot": 12, "pista": 12, "til": 12, "makhana": 12, "chiya": 12,
  "surajmukhi ke beej": 12, "kaddu ke beej": 12, "khas khas": 12, "sarson": 12, "almond": 12,
  "cashew": 12, "walnut": 12, "pistachio": 12, "sesame": 12, "sunflower seeds": 12, "pumpkin seeds": 12,
  
  // Oil variants
  "tel": 14, "sarson ka tel": 14, "mustard oil": 14, "olive oil": 14, "nariyal tel": 14, "coconut oil": 14,
  "vanaspati tel": 14, "vegetable oil": 14, "oil": 14,
  
  // Spice variants
  "haldi": 16, "turmeric": 16, "dhaniya": 16, "coriander": 16, "jeera": 16, "cumin": 16, 
  "garam masala": 16, "lal mirch": 16, "red chili": 16, "kali mirch": 16, "black pepper": 16,
  "elaichi": 16, "cardamom": 16, "dalchini": 16, "cinnamon": 16, "laung": 16, "clove": 16,
  "saunf": 16, "fennel": 16, "ajwain": 16, "carom": 16, "methi dana": 16, "achar": 16, "pickle": 16,
  "chutney": 16, "namak": 16, "salt": 16, "mirch": 16, "masala": 16, "spice": 16,
  
  // Sweet variants
  "mithai": 15, "gulab jamun": 15, "rasgulla": 15, "jalebi": 15, "laddu": 15, "ladoo": 15, 
  "barfi": 15, "halwa": 15, "halva": 15, "peda": 15, "rasmalai": 15, "kheer": 15, "payasam": 15,
  "sevai": 15, "vermicelli": 15, "gajak": 15, "cheeni": 15, "sugar": 15, "shahad": 15, "honey": 15,
  "sweet": 15, "dessert": 15,
  
  // Beverage variants
  "chai": 16, "tea": 16, "coffee": 16, "pani": 16, "water": 16, "nariyal pani": 16, "coconut water": 16,
  "juice": 16, "rus": 16, "sharbat": 16, "cold drink": 16, "soda": 16
};

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
  
  console.log("Raw food text for analysis:", foodText);
  
  // Process input text - improved splitter to handle various separators and formats
  // This captures food items separated by commas, semicolons, newlines, and spaces
  // It also handles items with spaces within them (like "sarson ka saag")
  const rawFoodItems = foodText.toLowerCase()
    .replace(/[,;।]/g, ' ')  // Replace common separators with spaces
    .replace(/\s+/g, ' ')    // Normalize spaces
    .trim()
    .split(' ');
    
  // Process common multi-word food items before splitting completely
  const possibleMultiWords = [
    "sarson ka saag", "palak paneer", "aloo gobhi", "aloo matar", 
    "dal makhani", "chana masala", "matar paneer", "kali mirch", 
    "garam masala", "lal mirch", "phool gobhi", "patta gobhi",
    "kaddu ke beej", "nariyal pani", "kala chana", "kabuli chana",
    "surajmukhi ke beej", "coconut water", "olive oil", "mustard oil"
  ];
  
  const foodItems: string[] = [];
  let skipNext = 0;
  
  // First try to identify multi-word foods
  for (let i = 0; i < rawFoodItems.length; i++) {
    if (skipNext > 0) {
      skipNext--;
      continue;
    }
    
    let found = false;
    
    // Check if this word starts a multi-word food
    for (const multiWord of possibleMultiWords) {
      const words = multiWord.split(' ');
      if (i + words.length <= rawFoodItems.length) {
        const phrase = rawFoodItems.slice(i, i + words.length).join(' ');
        if (phrase === multiWord) {
          foodItems.push(phrase);
          skipNext = words.length - 1;
          found = true;
          break;
        }
      }
    }
    
    if (!found) {
      foodItems.push(rawFoodItems[i]);
    }
  }
    
  console.log("Identified food items:", foodItems);
  
  const detectedGroups = new Set<number>();
  const recognizedFoods: string[] = [];
  
  // First try to match against our enhanced Hindi food dictionaries
  foodItems.forEach(item => {
    // Clean the item
    const cleanItem = item.trim().toLowerCase();
    if (!cleanItem) return;
    
    // Try exact matches in additional Hindi foods dictionary
    if (additionalHindiFoods[cleanItem] !== undefined) {
      detectedGroups.add(additionalHindiFoods[cleanItem]);
      recognizedFoods.push(`${cleanItem} → ${formatFoodGroupName(additionalHindiFoods[cleanItem]).toLowerCase()}`);
      console.log(`Match in additional Hindi foods: ${cleanItem} → Group ${additionalHindiFoods[cleanItem]}`);
      return;
    }
    
    // Try phonetic variants and English translations
    if (hindiFoodPhoneticVariants[cleanItem] !== undefined) {
      detectedGroups.add(hindiFoodPhoneticVariants[cleanItem]);
      recognizedFoods.push(`${cleanItem} → ${formatFoodGroupName(hindiFoodPhoneticVariants[cleanItem]).toLowerCase()}`);
      console.log(`Match in phonetic variants: ${cleanItem} → Group ${hindiFoodPhoneticVariants[cleanItem]}`);
      return;
    }
    
    // Try partial matches for longer phrases (e.g., "aloo ke parathe" should match "aloo")
    for (const [key, groupId] of Object.entries(additionalHindiFoods)) {
      if (cleanItem.includes(key) || key.includes(cleanItem)) {
        detectedGroups.add(groupId);
        recognizedFoods.push(`${cleanItem} → ${formatFoodGroupName(groupId).toLowerCase()}`);
        console.log(`Partial match in Hindi foods: ${cleanItem} contains/is contained in ${key} → Group ${groupId}`);
        return;
      }
    }
    
    for (const [key, groupId] of Object.entries(hindiFoodPhoneticVariants)) {
      if (cleanItem.includes(key) || key.includes(cleanItem)) {
        detectedGroups.add(groupId);
        recognizedFoods.push(`${cleanItem} → ${formatFoodGroupName(groupId).toLowerCase()}`);
        console.log(`Partial match in phonetic variants: ${cleanItem} contains/is contained in ${key} → Group ${groupId}`);
        return;
      }
    }
  });
  
  // If no matches found or to supplement direct matches, use the processor
  const processedGroups = processFoodText(foodText);
  console.log("Groups from food processor:", processedGroups);
  
  processedGroups.forEach(groupId => detectedGroups.add(groupId));
  
  // Map the group IDs back to string names
  const allGroupNames = Array.from(detectedGroups).map(id => formatFoodGroupName(id).toLowerCase());
  
  console.log("Final recognized food groups:", allGroupNames);
  console.log("Recognized foods:", recognizedFoods);
  
  return allGroupNames.length > 0 ? allGroupNames : recognizedFoods.length > 0 ? recognizedFoods : [];
};

// Improved function to map Hindi food names to food groups
export const getHindiFoodGroup = (hindiFood: string): string => {
  // Normalize input
  const normalizedFood = hindiFood.toLowerCase().trim();
  console.log(`Checking food group for: "${normalizedFood}"`);
  
  // Check direct matches in enhanced Hindi dictionary
  if (additionalHindiFoods[normalizedFood] !== undefined) {
    const groupId = additionalHindiFoods[normalizedFood];
    const groupName = mapGroupIdToName(groupId);
    console.log(`Direct match in Hindi dictionary: ${normalizedFood} → ${groupName}`);
    return groupName;
  }
  
  // Check phonetic variants and English translations
  if (hindiFoodPhoneticVariants[normalizedFood] !== undefined) {
    const groupId = hindiFoodPhoneticVariants[normalizedFood];
    const groupName = mapGroupIdToName(groupId);
    console.log(`Match in phonetic variants: ${normalizedFood} → ${groupName}`);
    return groupName;
  }
  
  // Try partial matches for multi-word phrases
  for (const [key, groupId] of Object.entries(additionalHindiFoods)) {
    if (normalizedFood.includes(key) || key.includes(normalizedFood)) {
      const groupName = mapGroupIdToName(groupId);
      console.log(`Partial match in Hindi dictionary: ${normalizedFood} contains/is contained in ${key} → ${groupName}`);
      return groupName;
    }
  }
  
  for (const [key, groupId] of Object.entries(hindiFoodPhoneticVariants)) {
    if (normalizedFood.includes(key) || key.includes(normalizedFood)) {
      const groupName = mapGroupIdToName(groupId);
      console.log(`Partial match in phonetic variants: ${normalizedFood} contains/is contained in ${key} → ${groupName}`);
      return groupName;
    }
  }
  
  // Let the general mapper handle other cases
  const foodGroups = getFoodGroupsForDish(normalizedFood);
  if (foodGroups.length > 0) {
    console.log(`Found food group via dish mapper: ${normalizedFood} → ${foodGroups[0]}`);
    return foodGroups[0];
  }
  
  console.log(`No food group found for: ${normalizedFood}`);
  return "unknown";
};

// Helper function to map group IDs to standard names used in the app
function mapGroupIdToName(groupId: number): string {
  switch(groupId) {
    case 1: return "starchy_staples";
    case 2: return "starchy_staples"; // White roots also go into starchy staples category
    case 3: return "vitamin_a_fruits_vegetables";
    case 4: return "dark_green_leafy_veg";
    case 5: return "other_vegetables";
    case 6: return "vitamin_a_fruits_vegetables";
    case 7: return "other_fruits";
    case 8: return "organ_meat";
    case 9: return "meat_fish";
    case 10: return "eggs";
    case 11: return "meat_fish"; // Fish also goes into meat category
    case 12: return "legumes_nuts_seeds";
    case 13: return "dairy";
    case 14: return "oils_fats";
    case 15: return "sugars";
    case 16: return "spices_condiments";
    default: return "unknown";
  }
}
