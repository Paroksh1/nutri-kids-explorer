import { foodMappings } from './foodNameMapper';

// Identify Hindi food items and map them to food groups
export function identifyHindiFood(foodName: string): string {
  const normalizedName = foodName.toLowerCase().trim();
  
  // Hindi/Indian cereals and grains
  if (/(chawal|roti|chapati|paratha|naan|aata|atta|besan|suji|dalia|idli|dosa|sevai)/i.test(normalizedName)) {
    return "starchy_staples";
  }
  
  // Hindi/Indian legumes and pulses
  if (/(dal|daal|rajma|chana|chole|moong|urad|masoor|toor|arhar|bean|lobhia|moth)/i.test(normalizedName)) {
    return "legumes_nuts_seeds";
  }
  
  // Hindi/Indian vegetables
  if (/(palak|saag|gobhi|aloo|bhindi|baingan|tamatar|pyaaz|gajar|matar|tinda|torai|kaddu|lauki)/i.test(normalizedName)) {
    if (/(palak|saag)/i.test(normalizedName)) {
      return "dark_green_leafy_veg";
    }
    if (/(gajar|kaddu)/i.test(normalizedName)) { // carrot, pumpkin
      return "vitamin_a_fruits_vegetables";
    }
    return "other_vegetables";
  }
  
  // Hindi/Indian fruits
  if (/(seb|kela|santara|aam|amrood|papita|ananas|angoor|nashpati|anar|jamun|tarbooj)/i.test(normalizedName)) {
    if (/(aam|papita)/i.test(normalizedName)) { // mango, papaya
      return "vitamin_a_fruits_vegetables";
    }
    return "other_fruits";
  }
  
  // Hindi/Indian dairy products
  if (/(doodh|dahi|paneer|ghee|makhan|lassi|chaas|khoya|mava)/i.test(normalizedName)) {
    return "dairy";
  }
  
  // Hindi/Indian animal products
  if (/(machli|machi|gosht|mutton|chicken|murgi|murga|anda|anday)/i.test(normalizedName)) {
    if (/(anda|anday)/i.test(normalizedName)) { // eggs
      return "eggs";
    }
    return "meat_fish";
  }
  
  // Hindi/Indian sweets and desserts
  if (/(mithai|jalebi|halwa|barfi|ladoo|peda|gulab jamun|rasgulla|kheer|payasam|rabri)/i.test(normalizedName)) {
    return "sugars";
  }
  
  // Hindi/Indian fats and oils
  if (/(tel|ghee|makhan|cream|malai)/i.test(normalizedName)) {
    return "oils_fats";
  }
  
  return "unknown";
}

// Get food group for Hindi food
export function getHindiFoodGroup(foodName: string): string {
  const hindiFood = identifyHindiFood(foodName);
  if (hindiFood !== "unknown") {
    return hindiFood;
  }
  
  // Try to identify common global foods
  return identifyGlobalFood(foodName)[0] || "unknown";
}

// Identify global food items and map them to food groups
export function identifyGlobalFood(foodName: string): string[] {
  const normalizedName = foodName.toLowerCase().trim();
  const foodGroups = new Set<string>();
  
  // Cereals and grains
  if (/(rice|bread|pasta|wheat|corn|maize|oat|barley|quinoa|cereal|grain|flour|noodle)/i.test(normalizedName)) {
    foodGroups.add("starchy_staples");
  }
  
  // Roots and tubers
  if (/(potato|cassava|yam|sweet potato|turnip|taro|parsnip)/i.test(normalizedName)) {
    foodGroups.add("starchy_staples");
  }
  
  // Vitamin A rich vegetables and fruits
  if (/(carrot|pumpkin|squash|sweet potato|mango|papaya|apricot|cantaloupe)/i.test(normalizedName)) {
    foodGroups.add("vitamin_a_fruits_vegetables");
  }
  
  // Dark green leafy vegetables
  if (/(spinach|kale|collard|amaranth|chard|mustard green|broccoli rabe)/i.test(normalizedName)) {
    foodGroups.add("dark_green_leafy_veg");
  }
  
  // Other vegetables
  if (/(tomato|pepper|onion|garlic|cucumber|eggplant|zucchini|cabbage|cauliflower|broccoli|vegetable)/i.test(normalizedName) && !/(spinach|kale|collard|amaranth)/i.test(normalizedName)) {
    foodGroups.add("other_vegetables");
  }
  
  // Other fruits
  if (/(apple|banana|orange|grape|berr(y|ies)|pear|peach|plum|melon|pineapple|fruit)/i.test(normalizedName) && !/(mango|papaya|apricot)/i.test(normalizedName)) {
    foodGroups.add("other_fruits");
  }
  
  // Organ meats
  if (/(liver|kidney|heart|brain|tripe|tongue|sweetbread)/i.test(normalizedName)) {
    foodGroups.add("organ_meat");
  }
  
  // Flesh meats
  if (/(beef|pork|lamb|goat|chicken|duck|turkey|rabbit|venison|meat)/i.test(normalizedName) && !/(liver|kidney|heart|brain)/i.test(normalizedName)) {
    foodGroups.add("meat_fish");
  }
  
  // Eggs
  if (/(egg)/i.test(normalizedName)) {
    foodGroups.add("eggs");
  }
  
  // Fish and seafood
  if (/(fish|seafood|salmon|tuna|shrimp|prawn|crab|lobster|mussel|clam|oyster|scallop)/i.test(normalizedName)) {
    foodGroups.add("meat_fish");
  }
  
  // Legumes, nuts and seeds
  if (/(bean|lentil|pea|chickpea|nut|seed|almond|walnut|cashew|peanut|legume)/i.test(normalizedName)) {
    foodGroups.add("legumes_nuts_seeds");
  }
  
  // Milk and milk products
  if (/(milk|cheese|yogurt|yoghurt|curd|dairy|cream|butter)/i.test(normalizedName)) {
    foodGroups.add("dairy");
  }
  
  // Composite dishes
  if (/(pizza|burger|sandwich|pasta|curry|stew|soup|salad|casserole|lasagna|stir fry|pilaf|risotto|paella)/i.test(normalizedName)) {
    foodGroups.add("mixed_dish");
  }
  
  return Array.from(foodGroups);
}

// Process a meal to identify food groups
export function processMeal(mealText: string): string[] {
  const words = mealText.toLowerCase().split(/[\s,;.]+/);
  const foodGroups = new Set<string>();
  
  for (const word of words) {
    const hindiGroup = identifyHindiFood(word);
    if (hindiGroup !== "unknown") {
      foodGroups.add(hindiGroup);
      continue;
    }
    
    const globalGroups = identifyGlobalFood(word);
    for (const group of globalGroups) {
      foodGroups.add(group);
    }
  }
  
  return Array.from(foodGroups);
}

// Map food group name to ID
export function mapFoodGroupToId(groupName: string): number {
  const groupMap: Record<string, number> = {
    "starchy_staples": 1,
    "white_roots_tubers": 2,
    "vitamin_a_vegetables": 3,
    "dark_green_leafy_veg": 4,
    "other_vegetables": 5,
    "vitamin_a_fruits": 6,
    "other_fruits": 7,
    "organ_meat": 8,
    "flesh_meat": 9,
    "eggs": 10,
    "fish": 11,
    "legumes_nuts_seeds": 12,
    "dairy": 13,
    "oils_fats": 14,
    "sugars": 15,
    "spices_condiments": 16
  };
  
  return groupMap[groupName] || 0;
}

// Get nutritional quality score
export function getNutritionalQualityScore(foodGroupsChecked: any[]): {
  score: number;
  maxScore: number;
  category: string;
  description: string;
  recommendations: string[];
} {
  // Calculate the Women's Dietary Diversity Score (WDDS)
  const nineGroupScore = [
    foodGroupsChecked[0].value || foodGroupsChecked[1].value ? 1 : 0, // Starchy staples
    foodGroupsChecked[3].value ? 1 : 0, // Dark green leafy vegetables
    foodGroupsChecked[2].value || foodGroupsChecked[5].value ? 1 : 0, // Vitamin A rich fruits and vegetables
    foodGroupsChecked[4].value || foodGroupsChecked[6].value ? 1 : 0, // Other fruits and vegetables
    foodGroupsChecked[7].value ? 1 : 0, // Organ meat
    foodGroupsChecked[8].value || foodGroupsChecked[10].value ? 1 : 0, // Meat and fish
    foodGroupsChecked[9].value ? 1 : 0, // Eggs
    foodGroupsChecked[11].value ? 1 : 0, // Legumes, nuts and seeds
    foodGroupsChecked[12].value ? 1 : 0  // Milk and milk products
  ];
  
  const score = nineGroupScore.reduce((sum, val) => sum + val, 0);
  const maxScore = 9;
  
  let category = '';
  let description = '';
  let recommendations: string[] = [];
  
  if (score <= 3) {
    category = 'Low Dietary Diversity';
    description = 'Your diet lacks variety and may not provide all the nutrients your body needs.';
    recommendations = [
      'Try to include at least one food from each of the 9 food groups daily',
      'Include more fruits and vegetables in your meals',
      'Add legumes, nuts, and seeds to boost your protein and mineral intake',
      'Consider including eggs or dairy products for additional protein'
    ];
  } else if (score <= 6) {
    category = 'Medium Dietary Diversity';
    description = 'Your diet has moderate variety but could benefit from including more food groups.';
    recommendations = [
      'Try to include dark green leafy vegetables more regularly',
      'Add vitamin A rich fruits and vegetables to your diet',
      'Include animal-source foods at least 2-3 times a week if possible',
      'Vary your grain intake between different types (rice, wheat, corn, etc.)'
    ];
  } else {
    category = 'High Dietary Diversity';
    description = 'Your diet has excellent variety and likely provides a wide range of nutrients.';
    recommendations = [
      'Maintain your diverse eating pattern',
      'Continue to include foods from all food groups',
      'Focus on the quality of foods within each food group',
      'Consider seasonal variations to maximize nutrient intake throughout the year'
    ];
  }
  
  return {
    score,
    maxScore,
    category,
    description,
    recommendations
  };
}
