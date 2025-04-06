
/**
 * Maps food names to their respective food groups and categories
 * This is used to organize user-entered foods properly
 */

import { FoodGroup } from './dietaryDiversityUtils';

// The key is the food name as might be entered by user, value is the standardized name and group
export const foodMapping: { [key: string]: { name: string; group: FoodGroup; category: string } } = {
  // STARCHY STAPLES
  "rice": { name: "Rice", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "white rice": { name: "White Rice", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "brown rice": { name: "Brown Rice", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "bread": { name: "Bread", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "wheat bread": { name: "Wheat Bread", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "white bread": { name: "White Bread", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "potato": { name: "Potato", group: FoodGroup.STARCHY_STAPLES, category: "Tubers" },
  "sweet potato": { name: "Sweet Potato", group: FoodGroup.STARCHY_STAPLES, category: "Tubers" },
  "pasta": { name: "Pasta", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "noodles": { name: "Noodles", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "corn": { name: "Corn", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "oats": { name: "Oats", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "quinoa": { name: "Quinoa", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "barley": { name: "Barley", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "tortilla": { name: "Tortilla", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "roti": { name: "Roti", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "chapati": { name: "Chapati", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "paratha": { name: "Paratha", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "naan": { name: "Naan", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "cereal": { name: "Cereal", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "porridge": { name: "Porridge", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "millet": { name: "Millet", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "sorghum": { name: "Sorghum", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "couscous": { name: "Couscous", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "semolina": { name: "Semolina", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "rice flour": { name: "Rice Flour", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "wheat flour": { name: "Wheat Flour", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "all purpose flour": { name: "All Purpose Flour", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "cassava": { name: "Cassava", group: FoodGroup.STARCHY_STAPLES, category: "Tubers" },
  "yam": { name: "Yam", group: FoodGroup.STARCHY_STAPLES, category: "Tubers" },
  "plantain": { name: "Plantain", group: FoodGroup.STARCHY_STAPLES, category: "Tubers" },
  "taro": { name: "Taro", group: FoodGroup.STARCHY_STAPLES, category: "Tubers" },
  "crackers": { name: "Crackers", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "biscuit": { name: "Biscuit", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "biscuits": { name: "Biscuits", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "cookies": { name: "Cookies", group: FoodGroup.STARCHY_STAPLES, category: "Grains" },
  "maggi": { name: "Maggi", group: FoodGroup.STARCHY_STAPLES, category: "Noodles" },
  "maggie": { name: "Maggi", group: FoodGroup.STARCHY_STAPLES, category: "Noodles" },

  // PULSES
  "beans": { name: "Beans", group: FoodGroup.PULSES, category: "Beans" },
  "lentils": { name: "Lentils", group: FoodGroup.PULSES, category: "Lentils" },
  "chickpeas": { name: "Chickpeas", group: FoodGroup.PULSES, category: "Beans" },
  "black beans": { name: "Black Beans", group: FoodGroup.PULSES, category: "Beans" },
  "kidney beans": { name: "Kidney Beans", group: FoodGroup.PULSES, category: "Beans" },
  "pinto beans": { name: "Pinto Beans", group: FoodGroup.PULSES, category: "Beans" },
  "green lentils": { name: "Green Lentils", group: FoodGroup.PULSES, category: "Lentils" },
  "red lentils": { name: "Red Lentils", group: FoodGroup.PULSES, category: "Lentils" },
  "yellow lentils": { name: "Yellow Lentils", group: FoodGroup.PULSES, category: "Lentils" },
  "split peas": { name: "Split Peas", group: FoodGroup.PULSES, category: "Peas" },
  "green peas": { name: "Green Peas", group: FoodGroup.PULSES, category: "Peas" },
  "black-eyed peas": { name: "Black-eyed Peas", group: FoodGroup.PULSES, category: "Peas" },
  "dal": { name: "Dal", group: FoodGroup.PULSES, category: "Lentils" },
  "toor dal": { name: "Toor Dal", group: FoodGroup.PULSES, category: "Lentils" },
  "moong dal": { name: "Moong Dal", group: FoodGroup.PULSES, category: "Lentils" },
  "chana dal": { name: "Chana Dal", group: FoodGroup.PULSES, category: "Lentils" },
  "masoor dal": { name: "Masoor Dal", group: FoodGroup.PULSES, category: "Lentils" },
  "rajma": { name: "Rajma", group: FoodGroup.PULSES, category: "Beans" },
  "tofu": { name: "Tofu", group: FoodGroup.PULSES, category: "Soy" },
  "tempeh": { name: "Tempeh", group: FoodGroup.PULSES, category: "Soy" },
  "edamame": { name: "Edamame", group: FoodGroup.PULSES, category: "Soy" },
  "soy milk": { name: "Soy Milk", group: FoodGroup.PULSES, category: "Soy" },

  // NUTS AND SEEDS
  "almonds": { name: "Almonds", group: FoodGroup.NUTS_AND_SEEDS, category: "Nuts" },
  "peanuts": { name: "Peanuts", group: FoodGroup.NUTS_AND_SEEDS, category: "Nuts" },
  "cashews": { name: "Cashews", group: FoodGroup.NUTS_AND_SEEDS, category: "Nuts" },
  "walnuts": { name: "Walnuts", group: FoodGroup.NUTS_AND_SEEDS, category: "Nuts" },
  "pistachios": { name: "Pistachios", group: FoodGroup.NUTS_AND_SEEDS, category: "Nuts" },
  "pecans": { name: "Pecans", group: FoodGroup.NUTS_AND_SEEDS, category: "Nuts" },
  "hazelnuts": { name: "Hazelnuts", group: FoodGroup.NUTS_AND_SEEDS, category: "Nuts" },
  "brazil nuts": { name: "Brazil Nuts", group: FoodGroup.NUTS_AND_SEEDS, category: "Nuts" },
  "macadamia nuts": { name: "Macadamia Nuts", group: FoodGroup.NUTS_AND_SEEDS, category: "Nuts" },
  "pine nuts": { name: "Pine Nuts", group: FoodGroup.NUTS_AND_SEEDS, category: "Nuts" },
  "chia seeds": { name: "Chia Seeds", group: FoodGroup.NUTS_AND_SEEDS, category: "Seeds" },
  "flax seeds": { name: "Flax Seeds", group: FoodGroup.NUTS_AND_SEEDS, category: "Seeds" },
  "sunflower seeds": { name: "Sunflower Seeds", group: FoodGroup.NUTS_AND_SEEDS, category: "Seeds" },
  "pumpkin seeds": { name: "Pumpkin Seeds", group: FoodGroup.NUTS_AND_SEEDS, category: "Seeds" },
  "sesame seeds": { name: "Sesame Seeds", group: FoodGroup.NUTS_AND_SEEDS, category: "Seeds" },
  "hemp seeds": { name: "Hemp Seeds", group: FoodGroup.NUTS_AND_SEEDS, category: "Seeds" },
  "poppy seeds": { name: "Poppy Seeds", group: FoodGroup.NUTS_AND_SEEDS, category: "Seeds" },
  "almond butter": { name: "Almond Butter", group: FoodGroup.NUTS_AND_SEEDS, category: "Nut Butters" },
  "peanut butter": { name: "Peanut Butter", group: FoodGroup.NUTS_AND_SEEDS, category: "Nut Butters" },
  "tahini": { name: "Tahini", group: FoodGroup.NUTS_AND_SEEDS, category: "Seed Butters" },

  // DAIRY
  "milk": { name: "Milk", group: FoodGroup.DAIRY, category: "Milk" },
  "cheese": { name: "Cheese", group: FoodGroup.DAIRY, category: "Cheese" },
  "yogurt": { name: "Yogurt", group: FoodGroup.DAIRY, category: "Yogurt" },
  "curd": { name: "Curd", group: FoodGroup.DAIRY, category: "Yogurt" },
  "cottage cheese": { name: "Cottage Cheese", group: FoodGroup.DAIRY, category: "Cheese" },
  "paneer": { name: "Paneer", group: FoodGroup.DAIRY, category: "Cheese" },
  "butter": { name: "Butter", group: FoodGroup.DAIRY, category: "Butter" },
  "cream": { name: "Cream", group: FoodGroup.DAIRY, category: "Cream" },
  "ice cream": { name: "Ice Cream", group: FoodGroup.DAIRY, category: "Frozen Dairy" },
  "greek yogurt": { name: "Greek Yogurt", group: FoodGroup.DAIRY, category: "Yogurt" },
  "whey protein": { name: "Whey Protein", group: FoodGroup.DAIRY, category: "Protein Supplement" },
  "skimmed milk": { name: "Skimmed Milk", group: FoodGroup.DAIRY, category: "Milk" },
  "whole milk": { name: "Whole Milk", group: FoodGroup.DAIRY, category: "Milk" },
  "mozzarella": { name: "Mozzarella", group: FoodGroup.DAIRY, category: "Cheese" },
  "cheddar": { name: "Cheddar", group: FoodGroup.DAIRY, category: "Cheese" },
  "parmesan": { name: "Parmesan", group: FoodGroup.DAIRY, category: "Cheese" },
  "feta": { name: "Feta", group: FoodGroup.DAIRY, category: "Cheese" },
  "ricotta": { name: "Ricotta", group: FoodGroup.DAIRY, category: "Cheese" },
  "brie": { name: "Brie", group: FoodGroup.DAIRY, category: "Cheese" },
  "gouda": { name: "Gouda", group: FoodGroup.DAIRY, category: "Cheese" },
  "sour cream": { name: "Sour Cream", group: FoodGroup.DAIRY, category: "Cream" },
  "heavy cream": { name: "Heavy Cream", group: FoodGroup.DAIRY, category: "Cream" },
  "ghee": { name: "Ghee", group: FoodGroup.DAIRY, category: "Butter" },

  // FLESH FOODS
  "chicken": { name: "Chicken", group: FoodGroup.FLESH_FOODS, category: "Poultry" },
  "beef": { name: "Beef", group: FoodGroup.FLESH_FOODS, category: "Red Meat" },
  "pork": { name: "Pork", group: FoodGroup.FLESH_FOODS, category: "Red Meat" },
  "lamb": { name: "Lamb", group: FoodGroup.FLESH_FOODS, category: "Red Meat" },
  "goat": { name: "Goat", group: FoodGroup.FLESH_FOODS, category: "Red Meat" },
  "turkey": { name: "Turkey", group: FoodGroup.FLESH_FOODS, category: "Poultry" },
  "duck": { name: "Duck", group: FoodGroup.FLESH_FOODS, category: "Poultry" },
  "salmon": { name: "Salmon", group: FoodGroup.FLESH_FOODS, category: "Fish" },
  "tuna": { name: "Tuna", group: FoodGroup.FLESH_FOODS, category: "Fish" },
  "trout": { name: "Trout", group: FoodGroup.FLESH_FOODS, category: "Fish" },
  "cod": { name: "Cod", group: FoodGroup.FLESH_FOODS, category: "Fish" },
  "tilapia": { name: "Tilapia", group: FoodGroup.FLESH_FOODS, category: "Fish" },
  "crab": { name: "Crab", group: FoodGroup.FLESH_FOODS, category: "Shellfish" },
  "shrimp": { name: "Shrimp", group: FoodGroup.FLESH_FOODS, category: "Shellfish" },
  "lobster": { name: "Lobster", group: FoodGroup.FLESH_FOODS, category: "Shellfish" },
  "clams": { name: "Clams", group: FoodGroup.FLESH_FOODS, category: "Shellfish" },
  "mussels": { name: "Mussels", group: FoodGroup.FLESH_FOODS, category: "Shellfish" },
  "oysters": { name: "Oysters", group: FoodGroup.FLESH_FOODS, category: "Shellfish" },
  "scallops": { name: "Scallops", group: FoodGroup.FLESH_FOODS, category: "Shellfish" },
  "venison": { name: "Venison", group: FoodGroup.FLESH_FOODS, category: "Game Meat" },
  "rabbit": { name: "Rabbit", group: FoodGroup.FLESH_FOODS, category: "Game Meat" },
  "sausage": { name: "Sausage", group: FoodGroup.FLESH_FOODS, category: "Processed Meat" },
  "bacon": { name: "Bacon", group: FoodGroup.FLESH_FOODS, category: "Processed Meat" },
  "ham": { name: "Ham", group: FoodGroup.FLESH_FOODS, category: "Processed Meat" },
  "salami": { name: "Salami", group: FoodGroup.FLESH_FOODS, category: "Processed Meat" },
  "prosciutto": { name: "Prosciutto", group: FoodGroup.FLESH_FOODS, category: "Processed Meat" },
  "ground beef": { name: "Ground Beef", group: FoodGroup.FLESH_FOODS, category: "Red Meat" },
  "liver": { name: "Liver", group: FoodGroup.FLESH_FOODS, category: "Organ Meat" },
  "kidney": { name: "Kidney", group: FoodGroup.FLESH_FOODS, category: "Organ Meat" },
  "heart": { name: "Heart", group: FoodGroup.FLESH_FOODS, category: "Organ Meat" },
  "tongue": { name: "Tongue", group: FoodGroup.FLESH_FOODS, category: "Organ Meat" },
  "fish": { name: "Fish", group: FoodGroup.FLESH_FOODS, category: "Fish" },
  "mutton": { name: "Mutton", group: FoodGroup.FLESH_FOODS, category: "Red Meat" },

  // EGGS
  "eggs": { name: "Eggs", group: FoodGroup.EGGS, category: "Chicken Eggs" },
  "egg": { name: "Egg", group: FoodGroup.EGGS, category: "Chicken Eggs" },
  "egg whites": { name: "Egg Whites", group: FoodGroup.EGGS, category: "Chicken Eggs" },
  "egg yolks": { name: "Egg Yolks", group: FoodGroup.EGGS, category: "Chicken Eggs" },
  "quail eggs": { name: "Quail Eggs", group: FoodGroup.EGGS, category: "Quail Eggs" },
  "duck eggs": { name: "Duck Eggs", group: FoodGroup.EGGS, category: "Duck Eggs" },
  "goose eggs": { name: "Goose Eggs", group: FoodGroup.EGGS, category: "Goose Eggs" },
  "turkey eggs": { name: "Turkey Eggs", group: FoodGroup.EGGS, category: "Turkey Eggs" },
  "omelette": { name: "Omelette", group: FoodGroup.EGGS, category: "Chicken Eggs" },
  "omlet": { name: "Omelette", group: FoodGroup.EGGS, category: "Chicken Eggs" },
  "scrambled eggs": { name: "Scrambled Eggs", group: FoodGroup.EGGS, category: "Chicken Eggs" },
  "boiled eggs": { name: "Boiled Eggs", group: FoodGroup.EGGS, category: "Chicken Eggs" },
  "fried eggs": { name: "Fried Eggs", group: FoodGroup.EGGS, category: "Chicken Eggs" },
  "poached eggs": { name: "Poached Eggs", group: FoodGroup.EGGS, category: "Chicken Eggs" },
  "egg curry": { name: "Egg Curry", group: FoodGroup.EGGS, category: "Chicken Eggs" },

  // VITAMIN A-RICH FRUITS AND VEGETABLES
  "carrot": { name: "Carrot", group: FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "carrots": { name: "Carrots", group: FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "mango": { name: "Mango", group: FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "papaya": { name: "Papaya", group: FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "cantaloupe": { name: "Cantaloupe", group: FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "apricot": { name: "Apricot", group: FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "pumpkin": { name: "Pumpkin", group: FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "sweet red pepper": { name: "Sweet Red Pepper", group: FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "butternut squash": { name: "Butternut Squash", group: FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "spinach": { name: "Spinach", group: FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES, category: "Dark Green Leafy Vegetables" },
  "kale": { name: "Kale", group: FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES, category: "Dark Green Leafy Vegetables" },
  "collard greens": { name: "Collard Greens", group: FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES, category: "Dark Green Leafy Vegetables" },
  "turnip greens": { name: "Turnip Greens", group: FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES, category: "Dark Green Leafy Vegetables" },
  "sweet potato": { name: "Sweet Potato", group: FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES, category: "Vegetables" },

  // OTHER FRUITS AND VEGETABLES
  "apple": { name: "Apple", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "banana": { name: "Banana", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "orange": { name: "Orange", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "grape": { name: "Grape", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "grapes": { name: "Grapes", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "strawberry": { name: "Strawberry", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "strawberries": { name: "Strawberries", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "blueberry": { name: "Blueberry", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "blueberries": { name: "Blueberries", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "watermelon": { name: "Watermelon", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "pineapple": { name: "Pineapple", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "kiwi": { name: "Kiwi", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "peach": { name: "Peach", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "pear": { name: "Pear", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "plum": { name: "Plum", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "cherry": { name: "Cherry", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "cherries": { name: "Cherries", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "lemon": { name: "Lemon", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "lime": { name: "Lime", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "avocado": { name: "Avocado", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "cucumber": { name: "Cucumber", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "tomato": { name: "Tomato", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "tomatoes": { name: "Tomatoes", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "bell pepper": { name: "Bell Pepper", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "onion": { name: "Onion", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "onions": { name: "Onions", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "garlic": { name: "Garlic", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "broccoli": { name: "Broccoli", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "cauliflower": { name: "Cauliflower", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "cabbage": { name: "Cabbage", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "lettuce": { name: "Lettuce", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "zucchini": { name: "Zucchini", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "mushroom": { name: "Mushroom", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "mushrooms": { name: "Mushrooms", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "celery": { name: "Celery", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "asparagus": { name: "Asparagus", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "brussels sprouts": { name: "Brussels Sprouts", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "eggplant": { name: "Eggplant", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "radish": { name: "Radish", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "beet": { name: "Beet", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "beets": { name: "Beets", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "turnip": { name: "Turnip", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "artichoke": { name: "Artichoke", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "arugula": { name: "Arugula", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "radicchio": { name: "Radicchio", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "fennel": { name: "Fennel", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "leek": { name: "Leek", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "scallion": { name: "Scallion", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Vegetables" },
  "grape fruit": { name: "Grapefruit", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "grapefruit": { name: "Grapefruit", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "pomegranate": { name: "Pomegranate", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "fig": { name: "Fig", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "date": { name: "Date", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "guava": { name: "Guava", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "passion fruit": { name: "Passion Fruit", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "dragon fruit": { name: "Dragon Fruit", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "jackfruit": { name: "Jackfruit", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "lychee": { name: "Lychee", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "persimmon": { name: "Persimmon", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "star fruit": { name: "Star Fruit", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" },
  "mulberry": { name: "Mulberry", group: FoodGroup.OTHER_FRUITS_AND_VEGETABLES, category: "Fruits" }
};

// Map a food item to its possible ingredients (for complex dishes)
const dishIngredients: { [key: string]: string[] } = {
  "pizza": ["flour", "cheese", "tomato", "olive oil"],
  "burger": ["bread", "meat", "lettuce", "tomato"],
  "pasta": ["wheat flour", "egg", "water"],
  "sandwich": ["bread", "cheese", "lettuce", "tomato"],
  "curry": ["spices", "vegetables", "meat"],
  "biryani": ["rice", "meat", "spices"],
  "dal": ["lentils", "spices", "ghee"],
  "lasagna": ["pasta", "cheese", "tomato sauce", "meat"],
  "salad": ["lettuce", "tomato", "cucumber", "olive oil"],
  "soup": ["vegetables", "broth", "spices"],
  "stir fry": ["vegetables", "oil", "soy sauce", "meat"],
  "omelette": ["egg", "vegetables", "cheese"],
  "bread": ["flour", "water", "yeast", "salt"],
  "yogurt": ["milk", "bacteria culture"],
  "cheese": ["milk", "rennet", "salt"]
};

// Process raw food text and return the category IDs
export function processFoodText(text: string): number[] {
  if (!text) return [];
  
  const normalizedText = text.toLowerCase();
  const detectedGroups = new Set<number>();
  
  // Detect starchy staples
  if (/rice|bread|pasta|potato|cereal|flour|noodle|chapati|roti|porridge|tortilla/i.test(normalizedText)) {
    detectedGroups.add(1);
  }
  
  // Detect vitamin A rich vegetables
  if (/carrot|pumpkin|squash|sweet potato|papaya|mango/i.test(normalizedText)) {
    detectedGroups.add(3);
    detectedGroups.add(6);
  }
  
  // Detect dark green leafy vegetables
  if (/spinach|kale|lettuce|greens|saag|palak|methi|fenugreek/i.test(normalizedText)) {
    detectedGroups.add(4);
  }
  
  // Detect other vegetables
  if (/tomato|onion|cucumber|eggplant|pepper|broccoli|cauliflower|cabbage|beans|peas/i.test(normalizedText)) {
    detectedGroups.add(5);
  }
  
  // Detect other fruits
  if (/apple|banana|orange|grapes|watermelon|pineapple|berries|strawberry|peach|pear/i.test(normalizedText)) {
    detectedGroups.add(7);
  }
  
  // Detect organ meat
  if (/liver|kidney|heart|brain|organs/i.test(normalizedText)) {
    detectedGroups.add(8);
  }
  
  // Detect flesh foods (meat/fish)
  if (/chicken|beef|fish|pork|lamb|mutton|goat|seafood|turkey|duck|prawn|shrimp/i.test(normalizedText)) {
    detectedGroups.add(9);
    detectedGroups.add(11);
  }
  
  // Detect eggs
  if (/egg|omelette|omlet/i.test(normalizedText)) {
    detectedGroups.add(10);
  }
  
  // Detect legumes, nuts and seeds
  if (/beans|lentils|chickpeas|nuts|seeds|almonds|cashew|peanut|walnut|dal/i.test(normalizedText)) {
    detectedGroups.add(12);
  }
  
  // Detect milk and milk products
  if (/milk|yogurt|curd|cheese|paneer|butter|ghee|cream/i.test(normalizedText)) {
    detectedGroups.add(13);
  }
  
  // Detect oils and fats
  if (/oil|ghee|butter|margarine|fat/i.test(normalizedText)) {
    detectedGroups.add(14);
  }
  
  // Detect sweets
  if (/sugar|honey|sweet|candy|chocolate|cake|cookie|biscuit|pastry|dessert/i.test(normalizedText)) {
    detectedGroups.add(15);
  }
  
  // Detect spices, condiments, beverages
  if (/salt|pepper|spice|sauce|masala|tea|coffee|wine|beer|drink|beverage/i.test(normalizedText)) {
    detectedGroups.add(16);
  }
  
  return Array.from(detectedGroups);
}

// Get ingredients for a dish
export function getIngredientsForDish(dish: string): string[] {
  const normalizedDish = dish.toLowerCase().trim();
  
  for (const [knownDish, ingredients] of Object.entries(dishIngredients)) {
    if (normalizedDish.includes(knownDish)) {
      return ingredients;
    }
  }
  
  return [];
}

// Function to guess the food group based on food name
export function guessFoodGroup(foodName: string): FoodGroup | null {
  const normalizedFoodName = foodName.toLowerCase().trim();
  
  if (normalizedFoodName in foodMapping) {
    return foodMapping[normalizedFoodName].group;
  }
  
  // Try to match with simple patterns
  if (/rice|bread|pasta|potato|cereal|flour|noodle|chapati|roti/i.test(normalizedFoodName)) {
    return FoodGroup.STARCHY_STAPLES;
  } else if (/bean|lentil|dal|chickpea|pea|tofu/i.test(normalizedFoodName)) {
    return FoodGroup.PULSES;
  } else if (/nut|seed|almond|cashew|peanut|walnut/i.test(normalizedFoodName)) {
    return FoodGroup.NUTS_AND_SEEDS;
  } else if (/milk|yogurt|curd|cheese|paneer|butter/i.test(normalizedFoodName)) {
    return FoodGroup.DAIRY;
  } else if (/chicken|beef|fish|pork|lamb|mutton|goat|seafood/i.test(normalizedFoodName)) {
    return FoodGroup.FLESH_FOODS;
  } else if (/egg|omelette|omlet/i.test(normalizedFoodName)) {
    return FoodGroup.EGGS;
  } else if (/carrot|pumpkin|squash|sweet potato|papaya|mango/i.test(normalizedFoodName)) {
    return FoodGroup.VITAMIN_A_RICH_FRUITS_AND_VEGETABLES;
  } else if (/apple|banana|orange|tomato|onion|cucumber|eggplant/i.test(normalizedFoodName)) {
    return FoodGroup.OTHER_FRUITS_AND_VEGETABLES;
  }
  
  return null;
}
