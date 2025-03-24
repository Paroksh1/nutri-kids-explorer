// This utility provides mapping for food names in different languages and common variations

// Hindi to English food name mapping
const hindiToEnglishMap: Record<string, string> = {
  // Cereals and grains
  'चावल': 'rice',
  'आटा': 'wheat flour',
  'गेहूं': 'wheat',
  'मक्का': 'corn',
  'बाजरा': 'millet',
  'ज्वार': 'sorghum',
  'रागी': 'finger millet',
  'जौ': 'barley',
  'अनाज': 'grain',
  
  // Vegetables
  'आलू': 'potato',
  'प्याज': 'onion',
  'टमाटर': 'tomato',
  'मिर्च': 'chili',
  'हरी मिर्च': 'green chili',
  'लाल मिर्च': 'red chili',
  'पालक': 'spinach',
  'गोभी': 'cabbage',
  'फूलगोभी': 'cauliflower',
  'बैंगन': 'eggplant',
  'मटर': 'peas',
  'गाजर': 'carrot',
  'भिंडी': 'okra',
  'करेला': 'bitter gourd',
  'लौकी': 'bottle gourd',
  'सब्जी': 'vegetable',
  
  // Pulses and legumes
  'दाल': 'lentil',
  'मूंग दाल': 'yellow lentil',
  'अरहर दाल': 'split pigeon peas',
  'छोले': 'chickpeas',
  'राजमा': 'kidney beans',
  'सोयाबीन': 'soybean',
  
  // Dairy
  'दूध': 'milk',
  'दही': 'yogurt',
  'पनीर': 'cheese',
  'घी': 'clarified butter',
  'मक्खन': 'butter',
  
  // Fruits
  'सेब': 'apple',
  'केला': 'banana',
  'संतरा': 'orange',
  'अंगूर': 'grapes',
  'आम': 'mango',
  'पपीता': 'papaya',
  'तरबूज': 'watermelon',
  'अनार': 'pomegranate',
  'फल': 'fruit',
  
  // Meats
  'चिकन': 'chicken',
  'मटन': 'mutton',
  'मछली': 'fish',
  'अंडा': 'egg',
  'मांस': 'meat',
  
  // Others
  'नमक': 'salt',
  'चीनी': 'sugar',
  'तेल': 'oil'
};

// Common food names to standard food group mapping
const commonFoodToGroupMap: Record<string, number> = {
  // Group 1: CEREALS
  'rice': 1,
  'wheat': 1,
  'bread': 1,
  'pasta': 1,
  'noodles': 1,
  'chapati': 1,
  'roti': 1,
  'paratha': 1,
  'tortilla': 1,
  'corn': 1,
  'maize': 1,
  'oats': 1,
  'barley': 1,
  'quinoa': 1,
  'millet': 1,
  'sorghum': 1,
  'cereal': 1,
  'grain': 1,
  'flour': 1,
  'porridge': 1,
  
  // Group 2: WHITE ROOTS AND TUBERS
  'potato': 2,
  'sweet potato': 2,
  'yam': 2,
  'cassava': 2,
  'taro': 2,
  'plantain': 2,
  'parsnip': 2,
  'turnip': 2,
  'white radish': 2,
  'white yam': 2,
  
  // Group 3: VITAMIN A RICH VEGETABLES AND TUBERS
  'carrot': 3,
  'pumpkin': 3,
  'squash': 3,
  'sweet red pepper': 3,
  'orange sweet potato': 3,
  
  // Group 4: DARK GREEN LEAFY VEGETABLES
  'spinach': 4,
  'kale': 4,
  'amaranth leaves': 4,
  'cassava leaves': 4,
  'moringa': 4,
  'broccoli': 4,
  'collard greens': 4,
  'mustard greens': 4,
  'turnip greens': 4,
  'arugula': 4,
  'bok choy': 4,
  'dark lettuce': 4,
  'swiss chard': 4,
  'methi': 4,
  'fenugreek leaves': 4,
  'saron': 4,
  'palak': 4,
  
  // Group 5: OTHER VEGETABLES
  'tomato': 5,
  'onion': 5,
  'eggplant': 5,
  'cucumber': 5,
  'cabbage': 5,
  'cauliflower': 5,
  'bell pepper': 5,
  'chili': 5,
  'garlic': 5,
  'ginger': 5,
  'mushroom': 5,
  'okra': 5,
  'zucchini': 5,
  'lettuce': 5,
  'celery': 5,
  'asparagus': 5,
  'green beans': 5,
  'peas': 5,
  'bitter gourd': 5,
  'bottle gourd': 5,
  'ridge gourd': 5,
  'lady finger': 5,
  'bhindi': 5,
  
  // Group 6: VITAMIN A RICH FRUITS
  'mango': 6,
  'papaya': 6,
  'cantaloupe': 6,
  'apricot': 6,
  'peach': 6,
  
  // Group 7: OTHER FRUITS
  'apple': 7,
  'banana': 7,
  'orange': 7,
  'grapes': 7,
  'pear': 7,
  'guava': 7,
  'watermelon': 7,
  'berry': 7,
  'strawberry': 7,
  'blueberry': 7,
  'raspberry': 7,
  'blackberry': 7,
  'pomegranate': 7,
  'pineapple': 7,
  'kiwi': 7,
  'lemon': 7,
  'lime': 7,
  'grapefruit': 7,
  'melon': 7,
  'plum': 7,
  'cherry': 7,
  'fig': 7,
  'date': 7,
  'avocado': 7,
  'jackfruit': 7,
  'lychee': 7,
  'longan': 7,
  'coconut': 7,
  'dragon fruit': 7,
  'durian': 7,
  'rambutan': 7,
  
  // Group 8: ORGAN MEAT
  'liver': 8,
  'kidney': 8,
  'heart': 8,
  'brain': 8,
  'tripe': 8,
  'sweetbread': 8,
  'tongue': 8,
  'blood': 8,
  'blood sausage': 8,
  'foie gras': 8,
  
  // Group 9: FLESH MEATS
  'beef': 9,
  'pork': 9,
  'lamb': 9,
  'goat': 9,
  'chicken': 9,
  'duck': 9,
  'turkey': 9,
  'rabbit': 9,
  'game': 9,
  'venison': 9,
  'quail': 9,
  'guinea fowl': 9,
  'mutton': 9,
  'meat': 9,
  
  // Group 10: EGGS
  'egg': 10,
  'chicken egg': 10,
  'duck egg': 10,
  'quail egg': 10,
  'goose egg': 10,
  
  // Group 11: FISH AND SEAFOOD
  'fish': 11,
  'shellfish': 11,
  'shrimp': 11,
  'prawn': 11,
  'crab': 11,
  'lobster': 11,
  'oyster': 11,
  'mussel': 11,
  'clam': 11,
  'squid': 11,
  'octopus': 11,
  'salmon': 11,
  'tuna': 11,
  'mackerel': 11,
  'sardine': 11,
  'trout': 11,
  'pomfret': 11,
  'cod': 11,
  'hilsa': 11,
  'rohu': 11,
  'catfish': 11,
  
  // Group 12: LEGUMES, NUTS AND SEEDS
  'bean': 12,
  'lentil': 12,
  'pea': 12,
  'chickpea': 12,
  'dal': 12,
  'peanut': 12,
  'almond': 12,
  'cashew': 12,
  'walnut': 12,
  'pistachio': 12,
  'pecan': 12,
  'hazelnut': 12,
  'sunflower seed': 12,
  'pumpkin seed': 12,
  'flax seed': 12,
  'sesame seed': 12,
  'chia seed': 12,
  'hemp seed': 12,
  'kidney bean': 12,
  'black bean': 12,
  'mung bean': 12,
  'soybean': 12,
  'tofu': 12,
  'tempeh': 12,
  'hummus': 12,
  
  // Group 13: MILK AND MILK PRODUCTS
  'milk': 13,
  'cheese': 13,
  'yogurt': 13,
  'curd': 13,
  'paneer': 13,
  'butter': 13,
  'cream': 13,
  'ice cream': 13,
  'kefir': 13,
  'ghee': 13,
  'dahi': 13,
  
  // Group 14: OILS AND FATS
  'oil': 14,
  'fat': 14,
  'butter': 14,
  'ghee': 14,
  'margarine': 14,
  'lard': 14,
  'coconut oil': 14,
  'olive oil': 14,
  'sunflower oil': 14,
  'mustard oil': 14,
  'groundnut oil': 14,
  'sesame oil': 14,
  'palm oil': 14,
  
  // Group 15: SWEETS
  'sugar': 15,
  'honey': 15,
  'jaggery': 15,
  'sweet': 15,
  'candy': 15,
  'chocolate': 15,
  'cake': 15,
  'cookie': 15,
  'pastry': 15,
  'dessert': 15,
  'ice cream': 15,
  'pudding': 15,
  'jam': 15,
  'jelly': 15,
  'syrup': 15,
  
  // Group 16: SPICES, CONDIMENTS, BEVERAGES
  'salt': 16,
  'pepper': 16,
  'spice': 16,
  'herb': 16,
  'condiment': 16,
  'sauce': 16,
  'coffee': 16,
  'tea': 16,
  'juice': 16,
  'beverage': 16,
  'soft drink': 16,
  'alcohol': 16,
  'wine': 16,
  'beer': 16,
  'liquor': 16,
  'soy sauce': 16,
  'vinegar': 16,
  'ketchup': 16,
  'mustard': 16,
  'mayonnaise': 16,
  'pickle': 16,
  'chutney': 16,
  'masala': 16,
  'garam masala': 16,
  'turmeric': 16,
  'coriander': 16,
  'cumin': 16,
  'cardamom': 16,
  'cinnamon': 16,
  'clove': 16,
  'black pepper': 16
};

// Common dishes and their components (for composite dishes)
const commonDishComponents: Record<string, string[]> = {
  'dal rice': ['lentil', 'rice'],
  'roti sabzi': ['wheat', 'vegetable'],
  'biryani': ['rice', 'meat', 'vegetable', 'spice'],
  'khichdi': ['rice', 'lentil', 'vegetable', 'spice'],
  'idli sambhar': ['rice', 'lentil', 'vegetable', 'spice'],
  'dosa': ['rice', 'lentil'],
  'chapati': ['wheat'],
  'paratha': ['wheat', 'oil'],
  'stuffed paratha': ['wheat', 'potato', 'oil'],
  'aloo paratha': ['wheat', 'potato', 'oil'],
  'gobi paratha': ['wheat', 'cauliflower', 'oil'],
  'samosa': ['wheat', 'potato', 'peas', 'oil'],
  'pakora': ['vegetable', 'lentil flour', 'oil'],
  'curry': ['vegetable', 'spice'],
  'butter chicken': ['chicken', 'butter', 'cream', 'spice'],
  'palak paneer': ['spinach', 'cheese', 'spice'],
  'chana masala': ['chickpea', 'spice'],
  'rajma': ['kidney bean', 'spice'],
  'kadhi': ['yogurt', 'lentil flour', 'spice'],
  'upma': ['wheat', 'vegetable', 'spice'],
  'poha': ['rice', 'potato', 'peanut', 'spice'],
  'pav bhaji': ['bread', 'potato', 'tomato', 'vegetable', 'spice'],
  'omelette': ['egg', 'vegetable', 'spice'],
  'pizza': ['wheat', 'cheese', 'tomato', 'vegetable'],
  'burger': ['wheat', 'meat', 'vegetable'],
  'sandwich': ['bread', 'vegetable', 'cheese'],
  'pasta': ['wheat', 'tomato', 'vegetable'],
  'noodles': ['wheat', 'vegetable', 'spice'],
  'soup': ['vegetable', 'spice'],
  'salad': ['vegetable', 'fruit']
};

/**
 * Translates Hindi food names to English
 * @param foodText - The food name in Hindi or a mix of Hindi and English
 * @returns Translated food name in English
 */
export const translateHindiToEnglish = (foodText: string): string => {
  let translatedText = foodText;
  
  // Check each word in the text for Hindi words
  Object.entries(hindiToEnglishMap).forEach(([hindi, english]) => {
    const regex = new RegExp(`\\b${hindi}\\b`, 'gi');
    translatedText = translatedText.replace(regex, english);
  });
  
  return translatedText;
};

/**
 * Maps a food item to its corresponding food group number
 * @param foodItem - The name of the food item
 * @returns The group number the food belongs to, or undefined if not found
 */
export const mapFoodToGroup = (foodItem: string): number | undefined => {
  const lowerCaseFood = foodItem.toLowerCase().trim();
  return commonFoodToGroupMap[lowerCaseFood];
};

/**
 * Analyzes a dish and returns its component food groups
 * @param dishName - The name of the dish
 * @returns Array of food group numbers this dish contains
 */
export const analyzeDish = (dishName: string): number[] => {
  const lowerCaseDish = dishName.toLowerCase().trim();
  
  // Check if it's a known dish
  const components = commonDishComponents[lowerCaseDish];
  if (components) {
    // Get unique food groups from components
    const groups = components
      .map(component => mapFoodToGroup(component))
      .filter((group): group is number => group !== undefined);
    
    return [...new Set(groups)]; // Remove duplicates
  }
  
  // If not a known dish, check if it's a single food item
  const group = mapFoodToGroup(lowerCaseDish);
  return group ? [group] : [];
};

/**
 * Process food text to extract all possible food groups
 * @param foodText - Raw text describing foods eaten
 * @returns Array of food group numbers
 */
export const processFoodText = (foodText: string): number[] => {
  if (!foodText) return [];
  
  // Translate any Hindi terms to English
  const translatedText = translateHindiToEnglish(foodText);
  
  // Split by common separators (comma, and, newline, etc.)
  const foodItems = translatedText
    .split(/,|\sand\s|\n|;/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
  
  // Get groups for each food item
  const allGroups: number[] = [];
  
  foodItems.forEach(item => {
    // Check if it's a known dish first
    const dishGroups = analyzeDish(item);
    
    if (dishGroups.length > 0) {
      allGroups.push(...dishGroups);
    } else {
      // Try individual words in case it's not a known dish but contains food names
      const words = item.split(/\s+/);
      words.forEach(word => {
        if (word.length > 2) { // Skip very short words
          const group = mapFoodToGroup(word);
          if (group) allGroups.push(group);
        }
      });
    }
  });
  
  // Return unique group numbers
  return [...new Set(allGroups)];
};

export default {
  translateHindiToEnglish,
  mapFoodToGroup,
  analyzeDish,
  processFoodText
};
