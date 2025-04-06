
const foodGroups = {
  grains: "Grains, white roots and tubers, and plantains",
  pulses: "Pulses (beans, peas and lentils)",
  nuts: "Nuts and seeds",
  dairy: "Dairy",
  meat: "Meat, poultry and fish",
  eggs: "Eggs",
  darkGreenVegetables: "Dark green leafy vegetables",
  vitaminAFruits: "Vitamin A-rich fruits and vegetables",
  otherVegetables: "Other vegetables",
  otherFruits: "Other fruits"
};

// Map common food names to their food groups
export const foodNameToGroupMap: Record<string, string> = {
  // Grains
  rice: foodGroups.grains,
  bread: foodGroups.grains,
  pasta: foodGroups.grains,
  noodles: foodGroups.grains,
  wheat: foodGroups.grains,
  flour: foodGroups.grains,
  cereal: foodGroups.grains,
  oats: foodGroups.grains,
  barley: foodGroups.grains,
  corn: foodGroups.grains,
  maize: foodGroups.grains,
  tortilla: foodGroups.grains,
  chapati: foodGroups.grains,
  roti: foodGroups.grains,
  naan: foodGroups.grains,
  paratha: foodGroups.grains,
  poha: foodGroups.grains,
  idli: foodGroups.grains,
  dosa: foodGroups.grains,
  upma: foodGroups.grains,
  quinoa: foodGroups.grains,
  millet: foodGroups.grains,
  sorghum: foodGroups.grains,
  cornflakes: foodGroups.grains,
  semolina: foodGroups.grains,
  couscous: foodGroups.grains,
  
  // White roots, tubers and plantains
  potato: foodGroups.grains,
  sweetpotato: foodGroups.vitaminAFruits,
  cassava: foodGroups.grains,
  yam: foodGroups.grains,
  plantain: foodGroups.grains,
  taro: foodGroups.grains,
  
  // Pulses
  beans: foodGroups.pulses,
  lentils: foodGroups.pulses,
  peas: foodGroups.pulses,
  chickpeas: foodGroups.pulses,
  dahl: foodGroups.pulses,
  tofu: foodGroups.pulses,
  soybeans: foodGroups.pulses,
  tempeh: foodGroups.pulses,
  edamame: foodGroups.pulses,
  hummus: foodGroups.pulses,
  rajma: foodGroups.pulses,
  chana: foodGroups.pulses,
  moong: foodGroups.pulses,
  urad: foodGroups.pulses,
  
  // Nuts and seeds
  almonds: foodGroups.nuts,
  cashews: foodGroups.nuts,
  walnuts: foodGroups.nuts,
  pistachios: foodGroups.nuts,
  hazelnuts: foodGroups.nuts,
  pecans: foodGroups.nuts,
  peanuts: foodGroups.nuts, 
  sesameSeeds: foodGroups.nuts,
  flaxseeds: foodGroups.nuts,
  sunflowerSeeds: foodGroups.nuts,
  pumpkinSeeds: foodGroups.nuts,
  chiaSeeds: foodGroups.nuts,
  
  // Dairy
  milk: foodGroups.dairy,
  cheese: foodGroups.dairy,
  yogurt: foodGroups.dairy,
  curd: foodGroups.dairy,
  paneer: foodGroups.dairy,
  butter: foodGroups.dairy,
  ghee: foodGroups.dairy,
  cream: foodGroups.dairy,
  icecream: foodGroups.dairy,
  lassi: foodGroups.dairy,
  
  // Meat, poultry and fish
  chicken: foodGroups.meat,
  beef: foodGroups.meat,
  pork: foodGroups.meat,
  mutton: foodGroups.meat,
  lamb: foodGroups.meat,
  goat: foodGroups.meat,
  turkey: foodGroups.meat,
  duck: foodGroups.meat,
  fish: foodGroups.meat,
  salmon: foodGroups.meat,
  tuna: foodGroups.meat,
  sardines: foodGroups.meat,
  mackerel: foodGroups.meat,
  prawns: foodGroups.meat,
  shrimp: foodGroups.meat,
  crab: foodGroups.meat,
  lobster: foodGroups.meat,
  
  // Eggs
  eggs: foodGroups.eggs,
  eggwhite: foodGroups.eggs,
  eggyolk: foodGroups.eggs,
  
  // Dark green leafy vegetables
  spinach: foodGroups.darkGreenVegetables,
  kale: foodGroups.darkGreenVegetables,
  arugula: foodGroups.darkGreenVegetables,
  collardgreens: foodGroups.darkGreenVegetables,
  bokchoy: foodGroups.darkGreenVegetables,
  mustardgreens: foodGroups.darkGreenVegetables,
  broccolirabe: foodGroups.darkGreenVegetables,
  swisschard: foodGroups.darkGreenVegetables,
  dandeliongreens: foodGroups.darkGreenVegetables,
  turnipgreens: foodGroups.darkGreenVegetables,
  palak: foodGroups.darkGreenVegetables,
  methi: foodGroups.darkGreenVegetables,
  sarson: foodGroups.darkGreenVegetables,
  
  // Vitamin A-rich fruits and vegetables
  carrot: foodGroups.vitaminAFruits,
  pumpkin: foodGroups.vitaminAFruits,
  mango: foodGroups.vitaminAFruits,
  cantaloupe: foodGroups.vitaminAFruits,
  apricot: foodGroups.vitaminAFruits,
  papaya: foodGroups.vitaminAFruits,
  redpeppers: foodGroups.vitaminAFruits,
  
  // Other vegetables
  cucumber: foodGroups.otherVegetables,
  tomato: foodGroups.otherVegetables,
  onion: foodGroups.otherVegetables,
  eggplant: foodGroups.otherVegetables,
  cabbage: foodGroups.otherVegetables,
  cauliflower: foodGroups.otherVegetables,
  broccoli: foodGroups.otherVegetables,
  bellpepper: foodGroups.otherVegetables,
  zucchini: foodGroups.otherVegetables,
  okra: foodGroups.otherVegetables,
  bittergoard: foodGroups.otherVegetables,
  bottlegoard: foodGroups.otherVegetables,
  radish: foodGroups.otherVegetables,
  turnip: foodGroups.otherVegetables,
  artichoke: foodGroups.otherVegetables,
  asparagus: foodGroups.otherVegetables,
  celery: foodGroups.otherVegetables,
  mushroom: foodGroups.otherVegetables,
  greenbean: foodGroups.otherVegetables,
  greenpeas: foodGroups.otherVegetables,
  
  // Other fruits
  apple: foodGroups.otherFruits,
  banana: foodGroups.otherFruits,
  orange: foodGroups.otherFruits,
  grape: foodGroups.otherFruits,
  watermelon: foodGroups.otherFruits,
  pineapple: foodGroups.otherFruits,
  strawberry: foodGroups.otherFruits,
  blueberry: foodGroups.otherFruits,
  kiwi: foodGroups.otherFruits,
  peach: foodGroups.otherFruits,
  pear: foodGroups.otherFruits,
  plum: foodGroups.otherFruits,
  cherry: foodGroups.otherFruits,
  avocado: foodGroups.otherFruits,
  coconut: foodGroups.otherFruits,
  fig: foodGroups.otherFruits,
  guava: foodGroups.otherFruits,
  lychee: foodGroups.otherFruits,
  dragonfruit: foodGroups.otherFruits,
  pomegranate: foodGroups.otherFruits,
  
  // International dishes and their main food groups
  pizza: foodGroups.grains,
  burger: foodGroups.grains,
  sandwich: foodGroups.grains,
  sushi: foodGroups.grains,
  taco: foodGroups.grains,
  burrito: foodGroups.grains,
  dumpling: foodGroups.grains,
  croissant: foodGroups.grains,
  bagel: foodGroups.grains,
  muffin: foodGroups.grains,
  pancake: foodGroups.grains,
  waffle: foodGroups.grains,
  
  // Indian foods
  samosa: foodGroups.grains,
  pakora: foodGroups.grains,
  biryani: foodGroups.grains,
  pulao: foodGroups.grains,
  dalroti: foodGroups.pulses,
  cholemasala: foodGroups.pulses,
  rajmacurry: foodGroups.pulses,
  
  // Italian foods
  lasagna: foodGroups.grains,
  risotto: foodGroups.grains,
  gnocchi: foodGroups.grains,
  
  // Mexican foods
  enchilada: foodGroups.grains,
  quesadilla: foodGroups.grains,
  tamale: foodGroups.grains,
  
  // Chinese foods
  dimsum: foodGroups.grains,
  springroll: foodGroups.grains,
  friedrice: foodGroups.grains,
  
  // Japanese foods
  ramen: foodGroups.grains,
  udon: foodGroups.grains,
  
  // Thai foods
  padthai: foodGroups.grains,
  curryrice: foodGroups.grains,
  
  // Fast foods
  fries: foodGroups.grains,
  nuggets: foodGroups.meat,
  
  // Desserts
  cake: foodGroups.grains,
  cookies: foodGroups.grains,
  pie: foodGroups.grains,
  
  // Beverages (typically not counted in food groups but included for completeness)
  coffee: "beverage",
  tea: "beverage",
  soda: "beverage",
  juice: "beverage",
  smoothie: "beverage",
  
  // Additional foods and variants
  "omlet": foodGroups.eggs,
  "omelette": foodGroups.eggs,
  "omelet": foodGroups.eggs,
  "omlette": foodGroups.eggs,
  "scrambledeggs": foodGroups.eggs,
  "eggscrambled": foodGroups.eggs,
  "boiledegg": foodGroups.eggs,
  "friedegg": foodGroups.eggs,
  
  "biscuit": foodGroups.grains,
  "biscuits": foodGroups.grains,
  "cookie": foodGroups.grains,
  "crackers": foodGroups.grains,
  
  "sweet": foodGroups.grains,
  "sweets": foodGroups.grains,
  "chocolate": foodGroups.grains,
  "candy": foodGroups.grains,
  "candies": foodGroups.grains,
  "dessert": foodGroups.grains,
  "sugar": foodGroups.grains,
  "honey": foodGroups.grains,
  "syrup": foodGroups.grains,
  "jam": foodGroups.grains,
  "jelly": foodGroups.grains,
  
  // Additional items with spelling variants
  "porridge": foodGroups.grains,
  "granola": foodGroups.grains,
  "muesli": foodGroups.grains,
  "toast": foodGroups.grains,
  "parata": foodGroups.grains, // variant of paratha
  "parotta": foodGroups.grains, // South Indian variant
  "rotti": foodGroups.grains, // variant of roti
  "chappati": foodGroups.grains, // variant of chapati
  "maggi": foodGroups.grains, // instant noodles common in India
  "maggie": foodGroups.grains, // misspelling of Maggi
  "noodels": foodGroups.grains, // misspelling of noodles
  "pasta": foodGroups.grains,
  "spagetti": foodGroups.grains, // misspelling of spaghetti
  "spaghetti": foodGroups.grains,
  "macaroni": foodGroups.grains,
  "bun": foodGroups.grains,
  "pav": foodGroups.grains, // Indian bread
  "pawbhaji": foodGroups.grains, // misspelling of pav bhaji
  "pavbhaji": foodGroups.grains,
  "beal": foodGroups.meat, // misspelling of beef
  "checken": foodGroups.meat, // misspelling of chicken
  "chiken": foodGroups.meat, // misspelling of chicken
  "panir": foodGroups.dairy, // misspelling of paneer
  "yougurt": foodGroups.dairy, // misspelling of yogurt
  "yoghurt": foodGroups.dairy, // variant spelling of yogurt
  "dahi": foodGroups.dairy, // Hindi for yogurt
  "curd": foodGroups.dairy,
  "buttermilk": foodGroups.dairy,
  "chaas": foodGroups.dairy, // Indian buttermilk
  "lassi": foodGroups.dairy, // yogurt drink
  "milkshake": foodGroups.dairy
};

// Function to guess food group based on partial matches
export function guessFoodGroup(foodItem: string): string {
  foodItem = foodItem.toLowerCase().replace(/\s+/g, '');
  
  // Check for exact match first
  if (foodNameToGroupMap[foodItem]) {
    return foodNameToGroupMap[foodItem];
  }
  
  // Check for partial matches
  for (const [key, value] of Object.entries(foodNameToGroupMap)) {
    if (foodItem.includes(key)) {
      return value;
    }
  }
  
  // Special handling for common misspellings
  if (foodItem.includes("omlet") || 
      foodItem.includes("omlette") || 
      foodItem.includes("omelet")) {
    return foodGroups.eggs;
  }
  
  if (foodItem.includes("biscuit") || 
      foodItem.includes("cookie") || 
      foodItem.includes("cracker")) {
    return foodGroups.grains;
  }
  
  if (foodItem.includes("rice") || 
      foodItem.includes("bread") || 
      foodItem.includes("pasta") || 
      foodItem.includes("noodle") || 
      foodItem.includes("dough") ||
      foodItem.includes("flour") ||
      foodItem.includes("wheat") ||
      foodItem.includes("grain") ||
      foodItem.includes("potato")) {
    return foodGroups.grains;
  }
  
  if (foodItem.includes("bean") || 
      foodItem.includes("lentil") || 
      foodItem.includes("pea") ||
      foodItem.includes("dal") ||
      foodItem.includes("tofu")) {
    return foodGroups.pulses;
  }
  
  if (foodItem.includes("nut") || 
      foodItem.includes("seed") ||
      foodItem.includes("almond") || 
      foodItem.includes("cashew") ||
      foodItem.includes("walnut") ||
      foodItem.includes("pistachio")) {
    return foodGroups.nuts;
  }
  
  if (foodItem.includes("milk") || 
      foodItem.includes("cheese") || 
      foodItem.includes("yogurt") ||
      foodItem.includes("curd") ||
      foodItem.includes("cream") ||
      foodItem.includes("butter")) {
    return foodGroups.dairy;
  }
  
  if (foodItem.includes("meat") || 
      foodItem.includes("chicken") || 
      foodItem.includes("beef") ||
      foodItem.includes("pork") ||
      foodItem.includes("fish") ||
      foodItem.includes("lamb") ||
      foodItem.includes("mutton") ||
      foodItem.includes("seafood") ||
      foodItem.includes("shrimp")) {
    return foodGroups.meat;
  }
  
  if (foodItem.includes("egg")) {
    return foodGroups.eggs;
  }
  
  if (foodItem.includes("spinach") || 
      foodItem.includes("kale") || 
      foodItem.includes("greens") ||
      foodItem.includes("lettuce") ||
      foodItem.includes("palak")) {
    return foodGroups.darkGreenVegetables;
  }
  
  if (foodItem.includes("carrot") || 
      foodItem.includes("pumpkin") || 
      foodItem.includes("mango") ||
      foodItem.includes("papaya") ||
      foodItem.includes("apricot")) {
    return foodGroups.vitaminAFruits;
  }
  
  if (foodItem.includes("tomato") || 
      foodItem.includes("cucumber") || 
      foodItem.includes("onion") ||
      foodItem.includes("eggplant") ||
      foodItem.includes("mushroom") ||
      foodItem.includes("broccoli") ||
      foodItem.includes("pepper") ||
      foodItem.includes("cauliflower") ||
      foodItem.includes("cabbage")) {
    return foodGroups.otherVegetables;
  }
  
  if (foodItem.includes("apple") || 
      foodItem.includes("banana") || 
      foodItem.includes("orange") ||
      foodItem.includes("grape") ||
      foodItem.includes("berry") ||
      foodItem.includes("melon") ||
      foodItem.includes("peach") ||
      foodItem.includes("pear") ||
      foodItem.includes("fruit")) {
    return foodGroups.otherFruits;
  }
  
  // For complex dishes with multiple ingredients
  if (foodItem.includes("pizza")) {
    return foodGroups.grains;
  }
  
  if (foodItem.includes("salad")) {
    return foodGroups.otherVegetables;
  }
  
  if (foodItem.includes("sandwich") || foodItem.includes("burger")) {
    return foodGroups.grains;
  }
  
  if (foodItem.includes("soup")) {
    return "mixed";
  }
  
  // Default return if no match found
  return "unknown";
}

export const getFoodGroupColor = (group: string): string => {
  switch (group) {
    case foodGroups.grains:
      return "bg-amber-500";
    case foodGroups.pulses:
      return "bg-rose-500";
    case foodGroups.nuts:
      return "bg-amber-700";
    case foodGroups.dairy:
      return "bg-blue-200";
    case foodGroups.meat:
      return "bg-red-600";
    case foodGroups.eggs:
      return "bg-yellow-200";
    case foodGroups.darkGreenVegetables:
      return "bg-emerald-600";
    case foodGroups.vitaminAFruits:
      return "bg-orange-500";
    case foodGroups.otherVegetables:
      return "bg-green-500";
    case foodGroups.otherFruits:
      return "bg-purple-500";
    default:
      return "bg-gray-400";
  }
};

export const getTextColor = (group: string): string => {
  switch (group) {
    case foodGroups.dairy:
    case foodGroups.eggs:
      return "text-gray-800";
    default:
      return "text-white";
  }
};

// Examples of foods in each group for user guidance
export const foodGroupExamples = {
  [foodGroups.grains]: "Rice, bread, pasta, potatoes, corn",
  [foodGroups.pulses]: "Beans, lentils, chickpeas, peas, tofu",
  [foodGroups.nuts]: "Almonds, walnuts, peanuts, sunflower seeds",
  [foodGroups.dairy]: "Milk, cheese, yogurt, curd, butter",
  [foodGroups.meat]: "Chicken, beef, fish, pork, seafood",
  [foodGroups.eggs]: "Eggs (any preparation)",
  [foodGroups.darkGreenVegetables]: "Spinach, kale, lettuce, broccoli",
  [foodGroups.vitaminAFruits]: "Carrots, mangoes, papaya, pumpkin",
  [foodGroups.otherVegetables]: "Tomatoes, onions, eggplant, cucumber",
  [foodGroups.otherFruits]: "Apples, bananas, berries, oranges"
};

// Function to analyze food text and return relevant food group IDs
export function processFoodText(text: string): number[] {
  const foodGroups = new Set<number>();
  const lowerText = text.toLowerCase();
  
  // Grains, white roots, tubers
  if (containsFoodFromGroup(lowerText, ['rice', 'bread', 'pasta', 'noodle', 'wheat', 'flour', 
                                     'cereal', 'oat', 'corn', 'potato', 'yam', 'cassava'])) {
    foodGroups.add(1);
    foodGroups.add(2);
  }
  
  // Vitamin A rich vegetables
  if (containsFoodFromGroup(lowerText, ['carrot', 'pumpkin', 'squash', 'sweet potato', 'red pepper'])) {
    foodGroups.add(3);
  }
  
  // Dark green leafy vegetables
  if (containsFoodFromGroup(lowerText, ['spinach', 'kale', 'greens', 'lettuce', 'palak', 'methi'])) {
    foodGroups.add(4);
  }
  
  // Other vegetables
  if (containsFoodFromGroup(lowerText, ['tomato', 'onion', 'eggplant', 'cucumber', 'vegetables', 
                                     'broccoli', 'cauliflower', 'cabbage', 'pepper'])) {
    foodGroups.add(5);
  }
  
  // Vitamin A rich fruits
  if (containsFoodFromGroup(lowerText, ['mango', 'papaya', 'apricot', 'cantaloupe'])) {
    foodGroups.add(6);
  }
  
  // Other fruits
  if (containsFoodFromGroup(lowerText, ['apple', 'banana', 'orange', 'fruit', 'berry', 'grapes', 
                                     'watermelon', 'pineapple', 'strawberry'])) {
    foodGroups.add(7);
  }
  
  // Organ meat
  if (containsFoodFromGroup(lowerText, ['liver', 'kidney', 'heart', 'organ'])) {
    foodGroups.add(8);
  }
  
  // Flesh meats
  if (containsFoodFromGroup(lowerText, ['beef', 'pork', 'lamb', 'goat', 'chicken', 'duck', 'meat'])) {
    foodGroups.add(9);
  }
  
  // Eggs
  if (containsFoodFromGroup(lowerText, ['egg', 'omlet', 'omelette', 'omelet'])) {
    foodGroups.add(10);
  }
  
  // Fish
  if (containsFoodFromGroup(lowerText, ['fish', 'seafood', 'prawn', 'shrimp', 'crab', 'salmon', 'tuna'])) {
    foodGroups.add(11);
  }
  
  // Legumes, nuts and seeds
  if (containsFoodFromGroup(lowerText, ['bean', 'lentil', 'pea', 'nut', 'seed', 'almond', 'walnut', 
                                     'cashew', 'peanut', 'dal', 'chana', 'rajma', 'tofu'])) {
    foodGroups.add(12);
  }
  
  // Milk and milk products
  if (containsFoodFromGroup(lowerText, ['milk', 'cheese', 'yogurt', 'curd', 'paneer', 'butter', 'ghee'])) {
    foodGroups.add(13);
  }
  
  // Oils and fats
  if (containsFoodFromGroup(lowerText, ['oil', 'fat', 'butter', 'ghee'])) {
    foodGroups.add(14);
  }
  
  // Sweets
  if (containsFoodFromGroup(lowerText, ['sugar', 'honey', 'sweet', 'candy', 'chocolate', 'dessert',
                                     'cookie', 'cake', 'ice cream'])) {
    foodGroups.add(15);
  }
  
  // Spices, condiments
  if (containsFoodFromGroup(lowerText, ['spice', 'salt', 'pepper', 'sauce', 'coffee', 'tea', 'masala'])) {
    foodGroups.add(16);
  }
  
  // Special handling for complex dishes
  if (lowerText.includes('pizza')) {
    foodGroups.add(1);
    foodGroups.add(5);
    foodGroups.add(13);
  } else if (lowerText.includes('burger')) {
    foodGroups.add(1);
    foodGroups.add(5);
    foodGroups.add(9);
  } else if (lowerText.includes('sandwich')) {
    foodGroups.add(1);
    foodGroups.add(5);
  } else if (lowerText.includes('sushi')) {
    foodGroups.add(1);
    foodGroups.add(11);
  }
  
  return Array.from(foodGroups);
}

function containsFoodFromGroup(text: string, foods: string[]): boolean {
  return foods.some(food => text.includes(food));
}

// Function to get ingredients for a complex dish
export function getIngredientsForDish(dish: string): string[] {
  dish = dish.toLowerCase().trim();
  
  const dishIngredients: Record<string, string[]> = {
    "pizza": ["wheat flour", "tomato", "cheese", "herbs", "olive oil"],
    "burger": ["bread bun", "meat patty", "lettuce", "tomato", "onion", "cheese"],
    "sandwich": ["bread", "lettuce", "tomato", "cheese", "meat/egg"],
    "sushi": ["rice", "seaweed", "fish", "vinegar"],
    "pasta": ["wheat flour", "eggs", "water", "sauce"],
    "taco": ["corn tortilla", "meat", "lettuce", "tomato", "cheese", "beans"],
    "burrito": ["flour tortilla", "rice", "beans", "meat", "cheese", "vegetables"],
    "biryani": ["rice", "meat/vegetables", "spices", "ghee"],
    "curry": ["vegetables/meat", "spices", "coconut milk/yogurt"],
    "salad": ["lettuce", "vegetables", "dressing"],
    "soup": ["broth", "vegetables", "meat/beans"],
    "noodles": ["wheat flour", "eggs", "water", "vegetables"],
    "lasagna": ["pasta sheets", "tomato sauce", "cheese", "meat"],
    "risotto": ["rice", "broth", "cheese", "vegetables/meat"],
    "stir-fry": ["vegetables", "meat/tofu", "sauce", "oil"],
    "omelette": ["eggs", "vegetables", "cheese", "herbs"],
    "pie": ["flour crust", "filling (fruit/meat/vegetables)"],
    "pancake": ["flour", "eggs", "milk", "sugar"],
    "waffle": ["flour", "eggs", "milk", "sugar", "butter"],
    "muffin": ["flour", "eggs", "milk", "sugar", "fruit"],
    "smoothie": ["fruit", "yogurt/milk", "ice", "honey/sugar"]
  };
  
  // Try to find an exact match
  for (const [key, ingredients] of Object.entries(dishIngredients)) {
    if (dish === key) {
      return ingredients;
    }
  }
  
  // Try partial matches
  for (const [key, ingredients] of Object.entries(dishIngredients)) {
    if (dish.includes(key)) {
      return ingredients;
    }
  }
  
  // If no match found, return empty array
  return [];
}
