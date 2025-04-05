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
  sweetpotato: foodGroups.grains,
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
  sweetpotato: foodGroups.vitaminAFruits,
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
  pizza: foodGroups.grains, // Crust is grain
  burger: foodGroups.grains, // Bun is grain
  sandwich: foodGroups.grains, // Bread is grain
  pasta: foodGroups.grains,
  sushi: foodGroups.grains, // Rice is grain
  taco: foodGroups.grains, // Shell is grain
  burrito: foodGroups.grains, // Tortilla is grain
  noodles: foodGroups.grains,
  dumpling: foodGroups.grains, // Wrapper is grain
  croissant: foodGroups.grains,
  bagel: foodGroups.grains,
  muffin: foodGroups.grains,
  pancake: foodGroups.grains,
  waffle: foodGroups.grains,
  cereal: foodGroups.grains,
  
  // Indian foods
  samosa: foodGroups.grains, // Outer covering is grain
  pakora: foodGroups.grains, // Batter is grain
  biryani: foodGroups.grains, // Rice is grain
  pulao: foodGroups.grains, // Rice is grain
  dalroti: foodGroups.pulses, // Main component is lentils
  cholemasala: foodGroups.pulses, // Chickpeas
  rajma: foodGroups.pulses, // Kidney beans
  
  // Italian foods
  lasagna: foodGroups.grains, // Pasta sheets are grain
  risotto: foodGroups.grains, // Rice is grain
  gnocchi: foodGroups.grains, // Potato-based pasta
  
  // Mexican foods
  enchilada: foodGroups.grains, // Tortilla is grain
  quesadilla: foodGroups.grains, // Tortilla is grain
  tamale: foodGroups.grains, // Corn masa is grain
  
  // Chinese foods
  dimsum: foodGroups.grains, // Usually has wrapper made of grain
  springroll: foodGroups.grains, // Wrapper is grain
  friedrice: foodGroups.grains, // Rice is grain
  
  // Japanese foods
  ramen: foodGroups.grains, // Noodles are grain
  udon: foodGroups.grains, // Noodles are grain
  
  // Thai foods
  padthai: foodGroups.grains, // Noodles are grain
  curryrice: foodGroups.grains, // Rice is grain
  
  // Fast foods
  fries: foodGroups.grains, // Potato is considered starchy vegetable
  nuggets: foodGroups.meat, // Typically chicken
  
  // Desserts
  cake: foodGroups.grains, // Flour is grain
  cookie: foodGroups.grains, // Flour is grain
  pie: foodGroups.grains, // Crust is grain
  
  // Beverages (typically not counted in food groups but included for completeness)
  coffee: "beverage",
  tea: "beverage",
  soda: "beverage",
  juice: "beverage",
  smoothie: "beverage" // Depends on ingredients
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
  
  // If no match found, try to guess based on common ingredients
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
    return foodGroups.grains; // Main component is the crust (grain)
  }
  
  if (foodItem.includes("salad")) {
    return foodGroups.otherVegetables; // Most salads are primarily vegetables
  }
  
  if (foodItem.includes("sandwich") || foodItem.includes("burger")) {
    return foodGroups.grains; // Main component is bread (grain)
  }
  
  if (foodItem.includes("soup")) {
    return "mixed"; // Soups can vary greatly in composition
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
