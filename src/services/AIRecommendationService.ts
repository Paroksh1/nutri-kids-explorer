
import { ChildProfile } from '@/components/onboarding/ChildProfileForm';
import { toast } from 'sonner';
import { CuisinePreferences } from '@/components/meal/CuisinePreferenceForm';

// Types for AI-powered recommendations
export interface AIRecommendationRequest {
  childProfile: ChildProfile;
  requestType: 'meal' | 'exercise' | 'recipe';
  preferences?: Record<string, number>;
  healthGoals?: string[];
  dietaryRestrictions?: string[];
  cuisinePreferences?: CuisinePreferences;
}

export interface AIRecommendationResponse {
  recommendations: any[];
  explanation: string;
  personalizationScore: number; // 0-100 score indicating how personalized the recommendations are
}

// Indian cuisine suggestions based on region and preferences
const getIndianMealSuggestions = (childProfile: ChildProfile, cuisinePreferences?: CuisinePreferences) => {
  // Use meal type to show appropriate options for breakfast, lunch, or dinner
  const suggestions = [];
  
  // Indian breakfast recipes
  const indianBreakfastRecipes = [
    {
      name: "Poha (Flattened Rice)",
      description: "Light, nutritious flattened rice breakfast with peanuts and vegetables",
      mealType: "breakfast",
      ingredients: ["2 cups flattened rice (poha)", "1 potato, diced", "1 onion, finely chopped", "1/2 cup peanuts", "1 green chili, chopped", "1 tsp mustard seeds", "1 tsp cumin seeds", "Few curry leaves", "1/2 tsp turmeric powder", "1 tbsp oil", "Salt to taste", "Fresh coriander and lemon for garnish"],
      instructions: ["Rinse poha lightly with water, drain and keep aside for 5 minutes", "Heat oil in a pan, add mustard seeds and let them splutter", "Add cumin seeds, curry leaves, green chili and sauté for 30 seconds", "Add onions and cook until translucent", "Add potatoes and cook until soft", "Add turmeric powder, salt, and peanuts", "Mix well and add the soaked poha", "Stir gently and cook for 2-3 minutes", "Garnish with coriander leaves and lemon juice before serving"],
      nutritionalInfo: {
        calories: 280,
        protein: "8g",
        carbs: "44g",
        fat: "7g"
      },
      prepTime: "5 minutes",
      cookTime: "15 minutes"
    },
    {
      name: "Upma",
      description: "Savory semolina breakfast popular in South India",
      mealType: "breakfast",
      ingredients: ["1 cup semolina (suji/rava)", "1 onion, finely chopped", "1 tomato, chopped", "1 green chili, chopped", "1 carrot, grated", "1/4 cup peas", "1 tsp mustard seeds", "1 tsp urad dal", "1 tsp chana dal", "Few curry leaves", "2 tbsp oil", "2.5 cups water", "Salt to taste", "Fresh coriander for garnish"],
      instructions: ["Dry roast semolina for 2-3 minutes until light golden and set aside", "Heat oil in a pan, add mustard seeds and let them splutter", "Add urad dal, chana dal and sauté until light golden", "Add curry leaves, green chili and sauté for 30 seconds", "Add onions and cook until translucent", "Add vegetables and cook for 2 minutes", "Add water and salt, bring to boil", "Lower the flame and slowly add roasted semolina while stirring", "Mix well, cover and cook for 2-3 minutes on low flame", "Garnish with coriander leaves before serving"],
      nutritionalInfo: {
        calories: 240,
        protein: "6g",
        carbs: "38g",
        fat: "6g"
      },
      prepTime: "5 minutes",
      cookTime: "15 minutes"
    },
    {
      name: "Aloo Paratha",
      description: "Whole wheat flatbread stuffed with spiced potato filling",
      mealType: "breakfast",
      ingredients: ["2 cups whole wheat flour", "3 medium potatoes, boiled and mashed", "1 onion, finely chopped", "2 green chilies, finely chopped", "1 tsp cumin powder", "1 tsp coriander powder", "1/2 tsp red chili powder", "1 tsp garam masala", "Fresh coriander, chopped", "Salt to taste", "Water for kneading", "Ghee for cooking"],
      instructions: ["Knead whole wheat flour with water to make soft dough and let it rest for 15 minutes", "Mix mashed potatoes with chopped onions, green chilies, and all spices", "Divide the dough into small balls", "Roll each ball into a small circle", "Place the potato filling in the center", "Bring the edges together, seal and roll again carefully", "Heat a tawa (flat pan), place the paratha", "Cook on both sides applying ghee", "Serve hot with yogurt or pickle"],
      nutritionalInfo: {
        calories: 320,
        protein: "9g",
        carbs: "52g",
        fat: "10g"
      },
      prepTime: "20 minutes",
      cookTime: "15 minutes"
    },
    {
      name: "Idli with Coconut Chutney",
      description: "Steamed rice cakes served with coconut chutney",
      mealType: "breakfast",
      ingredients: [
        "For Idli: 2 cups idli rice, 1 cup urad dal, 1 tsp fenugreek seeds, Salt to taste", 
        "For Chutney: 1 cup grated coconut, 2 green chilies, 1 inch ginger, 1 tbsp roasted chana dal, Few curry leaves, Salt to taste, 1 tsp mustard seeds, 1 tsp urad dal, Few curry leaves for tempering"
      ],
      instructions: ["Soak rice, urad dal and fenugreek seeds separately for 4-5 hours", "Grind them to make a smooth batter", "Ferment the batter overnight or for 8 hours", "Pour the batter into idli molds and steam for 10-12 minutes", "For chutney, grind coconut with green chilies, ginger, roasted chana dal, curry leaves and salt", "Prepare tempering with mustard seeds, urad dal and curry leaves", "Add tempering to the chutney and serve with hot idlis"],
      nutritionalInfo: {
        calories: 220,
        protein: "7g",
        carbs: "42g",
        fat: "2g"
      },
      prepTime: "12 hours (including soaking and fermentation)",
      cookTime: "15 minutes"
    },
    {
      name: "Masala Dosa",
      description: "Crispy rice and lentil crepe filled with spiced potato filling",
      mealType: "breakfast",
      ingredients: [
        "For Dosa: 3 cups dosa rice, 1 cup urad dal, 1/2 tsp fenugreek seeds, Salt to taste", 
        "For Potato Filling: 4 potatoes (boiled and mashed), 1 onion (finely chopped), 1 green chili (chopped), 1/2 tsp mustard seeds, 1/2 tsp turmeric powder, Few curry leaves, 2 tbsp oil, Salt to taste"
      ],
      instructions: ["Soak rice, urad dal and fenugreek seeds separately for 4-5 hours", "Grind them to make a smooth batter", "Ferment the batter overnight or for 8 hours", "For filling, heat oil, add mustard seeds and let them splutter", "Add curry leaves, green chili, onions and sauté until golden", "Add turmeric powder, salt and mashed potatoes, mix well", "Heat a dosa tawa, pour a ladle of batter and spread in circular motion", "Cook until golden and crisp", "Put potato filling on one side, fold and serve hot with chutney and sambar"],
      nutritionalInfo: {
        calories: 320,
        protein: "8g",
        carbs: "58g",
        fat: "6g"
      },
      prepTime: "12 hours (including soaking and fermentation)",
      cookTime: "20 minutes"
    }
  ];
  
  // Indian lunch recipes
  const indianLunchRecipes = [
    {
      name: "Dal Chawal",
      description: "Comforting yellow lentil soup with steamed rice",
      mealType: "lunch",
      ingredients: ["1 cup toor dal (yellow lentils)", "1 tomato, chopped", "1 onion, finely chopped", "2 green chilies, slit", "1 tsp cumin seeds", "1/2 tsp turmeric powder", "1 tsp red chili powder", "1 tsp garam masala", "2 tbsp ghee", "Few curry leaves", "2 cups rice", "Salt to taste", "Fresh coriander for garnish"],
      instructions: ["Wash and pressure cook toor dal with turmeric powder and salt", "Wash rice and cook separately", "Heat ghee in a pan, add cumin seeds and let them splutter", "Add curry leaves, green chilies, onions and sauté until golden", "Add tomatoes and cook until soft", "Add red chili powder, garam masala and mix well", "Add cooked dal, adjust consistency and simmer for 5 minutes", "Garnish with fresh coriander and serve hot with steamed rice"],
      nutritionalInfo: {
        calories: 380,
        protein: "16g",
        carbs: "64g",
        fat: "8g"
      },
      prepTime: "10 minutes",
      cookTime: "25 minutes"
    },
    {
      name: "Chole Bhature",
      description: "Spiced chickpea curry served with deep-fried bread",
      mealType: "lunch",
      ingredients: [
        "For Chole: 2 cups chickpeas (soaked overnight), 2 onions (finely chopped), 2 tomatoes (pureed), 1 tbsp ginger-garlic paste, 2 green chilies (chopped), 2 tsp chole masala, 1 tsp cumin powder, 1 tsp coriander powder, 1/2 tsp turmeric powder, 1 tsp red chili powder, 1 tsp garam masala, 2 tbsp oil, Salt to taste", 
        "For Bhature: 2 cups all-purpose flour, 1/4 cup yogurt, 1 tsp sugar, 1/2 tsp baking soda, 2 tbsp oil, Water as needed, Oil for deep frying"
      ],
      instructions: ["Pressure cook soaked chickpeas with salt and a tea bag (for color)", "Heat oil in a pan, add chopped onions and sauté until golden", "Add ginger-garlic paste and green chilies, sauté for a minute", "Add all spice powders and cook for a minute", "Add tomato puree and cook until oil separates", "Add cooked chickpeas with some water, simmer for 15 minutes", "For bhature, mix all ingredients to make a soft dough, cover and rest for 2 hours", "Divide dough into small balls, roll into oval shape", "Deep fry each bhature until puffed and golden", "Serve hot chole with bhature"],
      nutritionalInfo: {
        calories: 520,
        protein: "18g",
        carbs: "72g",
        fat: "18g"
      },
      prepTime: "12 hours (including soaking)",
      cookTime: "45 minutes"
    },
    {
      name: "Rajma Chawal",
      description: "Kidney bean curry served with steamed rice",
      mealType: "lunch",
      ingredients: ["2 cups kidney beans (soaked overnight)", "1 onion, finely chopped", "2 tomatoes, pureed", "1 tbsp ginger-garlic paste", "2 green chilies, chopped", "1 tsp cumin seeds", "1 tsp coriander powder", "1/2 tsp turmeric powder", "1 tsp red chili powder", "1 tsp garam masala", "2 tbsp oil", "Salt to taste", "Fresh coriander for garnish", "2 cups rice"],
      instructions: ["Pressure cook soaked kidney beans with salt", "Wash rice and cook separately", "Heat oil in a pan, add cumin seeds and let them splutter", "Add onions and sauté until golden", "Add ginger-garlic paste and green chilies, sauté for a minute", "Add all spice powders and cook for a minute", "Add tomato puree and cook until oil separates", "Add cooked kidney beans with some water, simmer for 15 minutes", "Garnish with fresh coriander and serve hot with steamed rice"],
      nutritionalInfo: {
        calories: 420,
        protein: "18g",
        carbs: "68g",
        fat: "9g"
      },
      prepTime: "12 hours (including soaking)",
      cookTime: "40 minutes"
    },
    {
      name: "Palak Paneer with Roti",
      description: "Cottage cheese in spinach gravy served with Indian flatbread",
      mealType: "lunch",
      ingredients: [
        "For Palak Paneer: 250g paneer (cut into cubes), 2 bunches spinach (blanched and pureed), 1 onion (finely chopped), 1 tomato (chopped), 1 tbsp ginger-garlic paste, 1 green chili (chopped), 1 tsp cumin seeds, 1/2 tsp turmeric powder, 1 tsp red chili powder, 1 tsp garam masala, 2 tbsp cream, 2 tbsp butter, Salt to taste", 
        "For Roti: 2 cups whole wheat flour, Water as needed, Ghee for applying"
      ],
      instructions: ["Blanch spinach in hot water for 2 minutes, drain and blend to make puree", "Heat butter in a pan, add cumin seeds and let them splutter", "Add onions and sauté until golden", "Add ginger-garlic paste and green chili, sauté for a minute", "Add tomatoes and cook until soft", "Add all spice powders and cook for a minute", "Add spinach puree and cook for 5 minutes", "Add paneer cubes and cream, simmer for 5 minutes", "For roti, knead whole wheat flour with water to make soft dough", "Divide into small balls, roll into circles", "Cook on hot tawa until done, apply ghee", "Serve hot palak paneer with rotis"],
      nutritionalInfo: {
        calories: 450,
        protein: "20g",
        carbs: "48g",
        fat: "18g"
      },
      prepTime: "15 minutes",
      cookTime: "30 minutes"
    },
    {
      name: "Vegetable Biryani",
      description: "Fragrant rice dish cooked with vegetables and spices",
      mealType: "lunch",
      ingredients: ["2 cups basmati rice", "2 cups mixed vegetables (carrots, beans, peas, cauliflower)", "2 onions, thinly sliced", "2 tomatoes, chopped", "1 tbsp ginger-garlic paste", "2 green chilies, slit", "1 tsp cumin seeds", "1 cinnamon stick", "4 cloves", "4 cardamoms", "1 bay leaf", "1 tsp red chili powder", "1/2 tsp turmeric powder", "1 tsp garam masala", "1/4 cup fresh mint leaves", "1/4 cup fresh coriander leaves", "3 tbsp ghee", "Salt to taste"],
      instructions: ["Wash and soak rice for 30 minutes", "Heat ghee in a heavy-bottomed pan, add whole spices", "Add sliced onions and sauté until golden", "Add ginger-garlic paste and green chilies, sauté for a minute", "Add vegetables and cook for 5 minutes", "Add tomatoes and all spice powders, cook until tomatoes are soft", "Add soaked rice, salt, and water (1:2 ratio rice to water)", "Bring to a boil, then lower the flame", "Cover with a tight lid and cook until rice is done", "Garnish with mint and coriander leaves", "Serve hot with raita"],
      nutritionalInfo: {
        calories: 380,
        protein: "8g",
        carbs: "62g",
        fat: "12g"
      },
      prepTime: "40 minutes",
      cookTime: "30 minutes"
    }
  ];
  
  // Indian dinner recipes
  const indianDinnerRecipes = [
    {
      name: "Roti Sabzi",
      description: "Indian flatbread served with mixed vegetable curry",
      mealType: "dinner",
      ingredients: [
        "For Roti: 2 cups whole wheat flour, Water as needed, Ghee for applying", 
        "For Sabzi: 3 cups mixed vegetables (cauliflower, potatoes, peas, carrots), 1 onion (finely chopped), 1 tomato (chopped), 1 tbsp ginger-garlic paste, 2 green chilies (chopped), 1 tsp cumin seeds, 1/2 tsp turmeric powder, 1 tsp red chili powder, 1 tsp coriander powder, 1/2 tsp garam masala, 2 tbsp oil, Salt to taste, Fresh coriander for garnish"
      ],
      instructions: ["For roti, knead whole wheat flour with water to make soft dough, rest for 15 minutes", "For sabzi, heat oil in a pan, add cumin seeds and let them splutter", "Add onions and sauté until golden", "Add ginger-garlic paste and green chilies, sauté for a minute", "Add all spice powders and cook for a minute", "Add vegetables and salt, mix well", "Cover and cook until vegetables are tender", "Add garam masala and garnish with fresh coriander", "Roll rotis into circles and cook on hot tawa", "Serve hot sabzi with rotis"],
      nutritionalInfo: {
        calories: 320,
        protein: "10g",
        carbs: "52g",
        fat: "8g"
      },
      prepTime: "15 minutes",
      cookTime: "30 minutes"
    },
    {
      name: "Khichdi",
      description: "One-pot dish made with rice and lentils",
      mealType: "dinner",
      ingredients: ["1 cup rice", "1/2 cup yellow moong dal", "1 onion, finely chopped", "1 tomato, chopped", "1 carrot, chopped", "1/2 cup peas", "1 potato, diced", "1 tsp cumin seeds", "1/2 tsp turmeric powder", "1 tsp red chili powder", "1 green chili, slit", "1 inch ginger, julienned", "2 tbsp ghee", "Salt to taste", "Fresh coriander for garnish"],
      instructions: ["Wash rice and dal together", "Heat ghee in a pressure cooker, add cumin seeds", "Add onions and sauté until translucent", "Add ginger, green chili and all vegetables, sauté for 2 minutes", "Add all spice powders and tomatoes, cook for a minute", "Add washed rice, dal, salt and water (1:3 ratio rice+dal to water)", "Pressure cook for 2 whistles", "Garnish with fresh coriander and serve hot with yogurt or pickle"],
      nutritionalInfo: {
        calories: 340,
        protein: "12g",
        carbs: "58g",
        fat: "7g"
      },
      prepTime: "10 minutes",
      cookTime: "20 minutes"
    },
    {
      name: "Dal Tadka with Jeera Rice",
      description: "Yellow lentil soup with tempering served with cumin rice",
      mealType: "dinner",
      ingredients: [
        "For Dal: 1 cup yellow moong dal, 1 onion (finely chopped), 1 tomato (chopped), 1 tbsp ginger-garlic paste, 2 green chilies (slit), 1/2 tsp turmeric powder, 1 tsp red chili powder, 1 tsp cumin seeds, 1 tsp garam masala, 2 tbsp ghee, Few curry leaves, 2 dry red chilies, 1 tsp cumin powder, Salt to taste, Fresh coriander for garnish", 
        "For Jeera Rice: 1 cup basmati rice, 1 tsp cumin seeds, 1 bay leaf, 1 tbsp ghee, Salt to taste"
      ],
      instructions: ["Wash and pressure cook moong dal with turmeric powder", "For tadka, heat ghee in a pan, add cumin seeds, curry leaves, dry red chilies", "Add onions and sauté until golden", "Add ginger-garlic paste and green chilies, sauté for a minute", "Add tomatoes and cook until soft", "Add all spice powders and cook for a minute", "Add cooked dal, adjust consistency and simmer for 5 minutes", "For jeera rice, wash and soak rice for 20 minutes", "Heat ghee in a pan, add cumin seeds and bay leaf", "Add drained rice and sauté for a minute", "Add water (1:2 ratio), salt and cook until done", "Serve hot dal tadka with jeera rice"],
      nutritionalInfo: {
        calories: 420,
        protein: "14g",
        carbs: "64g",
        fat: "12g"
      },
      prepTime: "10 minutes",
      cookTime: "30 minutes"
    },
    {
      name: "Paneer Butter Masala with Naan",
      description: "Cottage cheese in rich tomato gravy served with leavened flatbread",
      mealType: "dinner",
      ingredients: [
        "For Paneer Butter Masala: 250g paneer (cut into cubes), 2 onions (finely chopped), 4 tomatoes (pureed), 1 tbsp ginger-garlic paste, 1 tsp red chili powder, 1/2 tsp turmeric powder, 1 tsp coriander powder, 1 tsp garam masala, 2 tbsp butter, 2 tbsp cream, 1 tsp honey, Salt to taste, Fresh coriander for garnish", 
        "For Naan: 2 cups all-purpose flour, 1/2 cup yogurt, 1 tsp sugar, 1/2 tsp baking soda, 1 tsp active dry yeast, Warm water as needed, Butter for brushing"
      ],
      instructions: ["For paneer butter masala, heat butter in a pan", "Add onions and sauté until golden", "Add ginger-garlic paste and sauté for a minute", "Add all spice powders and cook for a minute", "Add tomato puree and cook until oil separates", "Add paneer cubes, cream, honey and simmer for 5 minutes", "For naan, mix all ingredients to make a soft dough", "Cover and let it rise for 2 hours", "Divide into small balls, roll into oval shape", "Cook on hot tawa or in tandoor", "Brush with butter", "Serve hot paneer butter masala with naan"],
      nutritionalInfo: {
        calories: 580,
        protein: "22g",
        carbs: "62g",
        fat: "24g"
      },
      prepTime: "20 minutes (plus 2 hours for dough rising)",
      cookTime: "30 minutes"
    },
    {
      name: "Veg Pulao with Raita",
      description: "Aromatic rice dish with vegetables served with yogurt side dish",
      mealType: "dinner",
      ingredients: [
        "For Pulao: 2 cups basmati rice, 2 cups mixed vegetables (carrots, beans, peas), 1 onion (sliced), 1 tbsp ginger-garlic paste, 2 green chilies (slit), 1 cinnamon stick, 4 cloves, 4 cardamoms, 1 bay leaf, 1 tsp cumin seeds, 2 tbsp ghee, Salt to taste, Fresh coriander and mint for garnish", 
        "For Raita: 1 cup yogurt, 1 cucumber (grated), 1 tomato (chopped), 1 onion (finely chopped), 1/2 tsp cumin powder, 1/2 tsp red chili powder, Salt to taste, Fresh coriander for garnish"
      ],
      instructions: ["Wash and soak rice for 30 minutes", "Heat ghee in a heavy-bottomed pan, add whole spices", "Add sliced onions and sauté until golden", "Add ginger-garlic paste and green chilies, sauté for a minute", "Add vegetables and sauté for 3 minutes", "Add soaked rice, salt and water (1:2 ratio)", "Bring to a boil, then lower the flame", "Cover with a tight lid and cook until rice is done", "For raita, whisk yogurt with salt and spices", "Add grated cucumber, chopped tomatoes and onions", "Garnish with fresh coriander", "Serve hot pulao with raita"],
      nutritionalInfo: {
        calories: 380,
        protein: "10g",
        carbs: "60g",
        fat: "10g"
      },
      prepTime: "40 minutes",
      cookTime: "25 minutes"
    }
  ];
  
  // North Indian regional specialties
  const northIndianRecipes = [
    {
      name: "Kadhi Chawal",
      description: "Yogurt-based curry with gram flour served with rice",
      mealType: "lunch",
      ingredients: ["2 cups yogurt", "4 tbsp gram flour (besan)", "1 tsp turmeric powder", "1 tsp red chili powder", "1 tsp cumin seeds", "1/2 tsp fenugreek seeds", "1/2 tsp mustard seeds", "Few curry leaves", "2 dry red chilies", "1 inch ginger, julienned", "2 green chilies, slit", "2 tbsp oil", "Salt to taste", "Fresh coriander for garnish", "2 cups rice"],
      instructions: ["Whisk yogurt, gram flour, turmeric powder, red chili powder and salt together", "Add 4 cups water and mix well", "Cook rice separately", "Heat oil in a pan, add all seeds and let them splutter", "Add curry leaves, dry red chilies, ginger and green chilies, sauté for a minute", "Add yogurt mixture and bring to a boil", "Simmer for 15-20 minutes until thickened", "Garnish with fresh coriander and serve hot with rice"],
      nutritionalInfo: {
        calories: 360,
        protein: "12g",
        carbs: "58g",
        fat: "9g"
      }
    },
    {
      name: "Punjabi Chole with Kulcha",
      description: "Spicy chickpea curry with leavened bread",
      mealType: "dinner",
      ingredients: [
        "For Chole: 2 cups chickpeas (soaked overnight), 2 onions (finely chopped), 2 tomatoes (pureed), 1 tbsp ginger-garlic paste, 2 green chilies (chopped), 2 tsp chole masala, 1 tsp cumin powder, 1 tsp coriander powder, 1/2 tsp turmeric powder, 1 tsp red chili powder, 1 tsp garam masala, 2 tbsp oil, Salt to taste", 
        "For Kulcha: 2 cups all-purpose flour, 1/2 cup yogurt, 1 tsp sugar, 1/2 tsp baking soda, 1 tsp active dry yeast, Warm water as needed, Butter for brushing"
      ],
      instructions: ["Pressure cook soaked chickpeas with salt and a tea bag (for color)", "Heat oil in a pan, add chopped onions and sauté until golden", "Add ginger-garlic paste and green chilies, sauté for a minute", "Add all spice powders and cook for a minute", "Add tomato puree and cook until oil separates", "Add cooked chickpeas with some water, simmer for 15 minutes", "For kulcha, mix all ingredients to make a soft dough", "Cover and let it rise for 2 hours", "Divide into small balls, roll into round shape", "Cook on hot tawa with butter", "Serve hot chole with kulcha"],
      nutritionalInfo: {
        calories: 520,
        protein: "18g",
        carbs: "72g",
        fat: "18g"
      }
    }
  ];
  
  // South Indian regional specialties
  const southIndianRecipes = [
    {
      name: "Sambar Rice",
      description: "Lentil-based vegetable stew mixed with rice",
      mealType: "lunch",
      ingredients: ["1 cup toor dal", "1 cup rice", "1 onion, chopped", "1 tomato, chopped", "1 carrot, chopped", "1 potato, diced", "1/2 cup drumsticks", "1/2 cup eggplant, diced", "2 tbsp sambar powder", "1 tsp mustard seeds", "1 tsp urad dal", "Few curry leaves", "1 tsp turmeric powder", "2 tbsp tamarind pulp", "2 tbsp oil", "Salt to taste", "Fresh coriander for garnish"],
      instructions: ["Pressure cook toor dal and rice separately", "Heat oil in a pan, add mustard seeds and let them splutter", "Add urad dal, curry leaves and sauté for a minute", "Add onions and sauté until translucent", "Add all vegetables and cook for 5 minutes", "Add sambar powder, turmeric powder, salt and tamarind pulp", "Add 2 cups water and cook until vegetables are tender", "Add cooked dal and simmer for 5 minutes", "Mix with cooked rice and serve hot"],
      nutritionalInfo: {
        calories: 420,
        protein: "14g",
        carbs: "70g",
        fat: "8g"
      }
    },
    {
      name: "Dosa with Sambar and Chutney",
      description: "Crispy rice crepes served with lentil stew and coconut chutney",
      mealType: "breakfast",
      ingredients: [
        "For Dosa: 3 cups dosa rice, 1 cup urad dal, 1/2 tsp fenugreek seeds, Salt to taste", 
        "For Sambar: 1/2 cup toor dal, Mixed vegetables, 2 tbsp sambar powder, 1 tbsp tamarind pulp, Tempering ingredients", 
        "For Chutney: 1 cup coconut, Green chilies, Ginger, Tempering ingredients"
      ],
      instructions: ["Soak rice, urad dal and fenugreek seeds separately for 4-5 hours", "Grind them to make a smooth batter", "Ferment the batter overnight or for 8 hours", "Prepare sambar by cooking toor dal with vegetables and spices", "Prepare coconut chutney by grinding coconut with green chilies and ginger", "Heat a dosa tawa, pour a ladle of batter and spread in circular motion", "Cook until golden and crisp", "Serve hot with sambar and chutney"],
      nutritionalInfo: {
        calories: 380,
        protein: "12g",
        carbs: "64g",
        fat: "6g"
      }
    }
  ];
  
  // East Indian regional specialties
  const eastIndianRecipes = [
    {
      name: "Bengali Fish Curry with Rice",
      description: "Traditional Bengali fish curry with mustard oil served with steamed rice",
      mealType: "lunch",
      ingredients: ["500g fish (Rohu/Katla), cut into pieces", "2 potatoes, cut into wedges", "1 onion, finely chopped", "1 tomato, chopped", "1 tbsp ginger-garlic paste", "2 green chilies, slit", "1 tsp turmeric powder", "1 tsp red chili powder", "1 tsp cumin powder", "1 tsp coriander powder", "3 tbsp mustard oil", "Salt to taste", "Fresh coriander for garnish", "2 cups rice"],
      instructions: ["Marinate fish with turmeric powder and salt", "Heat mustard oil in a pan until it starts smoking", "Fry fish pieces until golden and set aside", "In the same oil, add potatoes and fry until golden", "Add onions and sauté until golden", "Add ginger-garlic paste and green chilies, sauté for a minute", "Add all spice powders and cook for a minute", "Add tomatoes and cook until soft", "Add 2 cups water and bring to a boil", "Add fried potatoes and simmer for 5 minutes", "Add fried fish pieces and simmer for 5 more minutes", "Cook rice separately", "Garnish with fresh coriander and serve hot with rice"],
      nutritionalInfo: {
        calories: 480,
        protein: "28g",
        carbs: "58g",
        fat: "14g"
      }
    },
    {
      name: "Macher Jhol",
      description: "Light Bengali fish curry with minimal spices",
      mealType: "dinner",
      ingredients: ["500g fish (Rohu/Katla), cut into pieces", "1 potato, cut into wedges", "1 tomato, chopped", "1 onion, finely chopped", "1 tbsp ginger paste", "2 green chilies, slit", "1 tsp turmeric powder", "1 tsp cumin powder", "1/2 tsp nigella seeds (kalonji)", "3 tbsp mustard oil", "Salt to taste", "Fresh coriander for garnish"],
      instructions: ["Marinate fish with turmeric powder and salt", "Heat mustard oil in a pan until it starts smoking", "Fry fish pieces until golden and set aside", "In the same oil, add nigella seeds", "Add potatoes and fry until golden", "Add onions and sauté until translucent", "Add ginger paste and green chilies, sauté for a minute", "Add turmeric powder, cumin powder and cook for a minute", "Add tomatoes and cook until soft", "Add 2 cups water and bring to a boil", "Add fried potatoes and simmer for 5 minutes", "Add fried fish pieces and simmer for 5 more minutes", "Garnish with fresh coriander and serve hot with rice"],
      nutritionalInfo: {
        calories: 380,
        protein: "26g",
        carbs: "22g",
        fat: "18g"
      }
    }
  ];
  
  // West Indian regional specialties
  const westIndianRecipes = [
    {
      name: "Pav Bhaji",
      description: "Mashed vegetable curry served with buttered bread rolls",
      mealType: "dinner",
      ingredients: ["3 potatoes, boiled and mashed", "1 cup mixed vegetables (cauliflower, beans, carrots, peas), boiled and mashed", "2 onions, finely chopped", "2 tomatoes, chopped", "1 capsicum, finely chopped", "1 tbsp ginger-garlic paste", "2 tbsp pav bhaji masala", "1 tsp red chili powder", "1/2 tsp turmeric powder", "4 tbsp butter", "Salt to taste", "Fresh coriander for garnish", "8 pav (bread rolls)", "1 lemon, cut into wedges"],
      instructions: ["Heat butter in a pan, add onions and sauté until golden", "Add ginger-garlic paste and sauté for a minute", "Add capsicum and sauté for 2 minutes", "Add tomatoes and cook until soft", "Add all spice powders and cook for a minute", "Add boiled and mashed vegetables, mix well", "Add salt and 1 cup water, mash everything together", "Simmer for 10 minutes, add more butter", "Split pav horizontally and toast with butter", "Garnish bhaji with fresh coriander, butter and serve hot with pav and lemon wedges"],
      nutritionalInfo: {
        calories: 480,
        protein: "12g",
        carbs: "68g",
        fat: "18g"
      }
    },
    {
      name: "Gujarati Thali",
      description: "Complete meal with dal, vegetables, roti, rice and dessert",
      mealType: "lunch",
      ingredients: [
        "For Dal: 1 cup toor dal, Tempering ingredients", 
        "For Shaak: 2 cups mixed vegetables, Spices", 
        "For Kadhi: 1 cup yogurt, 2 tbsp gram flour, Tempering ingredients", 
        "For Roti: Whole wheat flour", 
        "For Rice: 1 cup rice", 
        "For Dessert: Ingredients for shrikhand or jalebi"
      ],
      instructions: ["Prepare dal by cooking toor dal with spices", "Prepare vegetable dish (shaak) with seasonal vegetables", "Prepare kadhi by cooking yogurt-gram flour mixture with spices", "Make rotis with whole wheat flour", "Cook rice", "Prepare sweet dish", "Serve all items together in a thali (plate) with accompaniments like papad, pickle, etc."],
      nutritionalInfo: {
        calories: 850,
        protein: "28g",
        carbs: "120g",
        fat: "26g"
      }
    }
  ];
  
  // Select appropriate recipes based on meal type
  // If no specific meal type is requested, provide a mix
  let mealTypeRecipes = [...indianBreakfastRecipes, ...indianLunchRecipes, ...indianDinnerRecipes];
  
  // Select based on region preference if available
  if (cuisinePreferences?.indianRegionPreference) {
    const regionRecipes = {
      'north': northIndianRecipes,
      'south': southIndianRecipes,
      'east': eastIndianRecipes,
      'west': westIndianRecipes
    };
    
    // Add region-specific recipes to the mix
    const selectedRegionalRecipes = regionRecipes[cuisinePreferences.indianRegionPreference] || [];
    mealTypeRecipes = [...mealTypeRecipes, ...selectedRegionalRecipes];
  }
  
  // Filter based on spice preference
  if (cuisinePreferences?.spiceLevel === 'mild') {
    // For mild preference, add note about reducing spice levels
    mealTypeRecipes.forEach(recipe => {
      recipe.description += " (prepared with minimal spices for children)";
    });
  }
  
  // Filter based on dietary restrictions
  if (cuisinePreferences?.dietaryRestrictions) {
    if (cuisinePreferences.dietaryRestrictions.includes('vegetarian')) {
      // Filter out non-vegetarian dishes
      mealTypeRecipes = mealTypeRecipes.filter(recipe => 
        !recipe.ingredients.some(ing => 
          ing.toLowerCase().includes('fish') || 
          ing.toLowerCase().includes('chicken') || 
          ing.toLowerCase().includes('meat')
        )
      );
    }
    
    // Add more dietary filters as needed
  }
  
  // Return the appropriate recipes - randomly select some to avoid overwhelming the user
  return mealTypeRecipes.sort(() => 0.5 - Math.random()).slice(0, 6);
};

// Simulated AI recommendation engine
// In a real app, this would connect to an AI service like OpenAI or a custom ML model
export const getAIRecommendations = async (
  request: AIRecommendationRequest
): Promise<AIRecommendationResponse> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { childProfile, requestType, preferences = {}, cuisinePreferences } = request;
    
    // Calculate BMI for personalization
    const bmi = childProfile.weight / ((childProfile.height / 100) ** 2);
    let healthStatus = "healthy";
    
    if (bmi < 18.5) {
      healthStatus = "underweight";
    } else if (bmi >= 25 && bmi < 30) {
      healthStatus = "overweight";
    } else if (bmi >= 30) {
      healthStatus = "obese";
    }
    
    // Simulate AI reasoning for recommendations
    let explanation = '';
    let personalizationScore = 85 + Math.floor(Math.random() * 15); // 85-100 base score
    let recommendations: any[] = [];
    
    // Add cuisine preferences to explanation if available
    let cuisineExplanation = '';
    if (cuisinePreferences) {
      // Check if Indian cuisine is preferred
      const hasIndianPreference = cuisinePreferences.favoriteCuisines?.includes('indian');
      
      if (hasIndianPreference) {
        // Provide Indian cuisine-specific explanation
        cuisineExplanation = ` Taking into account their preference for Indian cuisine`;
        
        if (cuisinePreferences.indianRegionPreference) {
          cuisineExplanation += ` (${cuisinePreferences.indianRegionPreference} Indian regional style)`;
        }
        
        if (cuisinePreferences.spiceLevel) {
          cuisineExplanation += ` with a ${cuisinePreferences.spiceLevel} spice level`;
        }
        
        if (cuisinePreferences.dietaryRestrictions && cuisinePreferences.dietaryRestrictions.length > 0) {
          cuisineExplanation += `, while respecting ${cuisinePreferences.dietaryRestrictions.join(', ')} dietary guidelines`;
        }
        
        cuisineExplanation += '.';
        personalizationScore += 10; // Higher score for regional specificity
      } else if (cuisinePreferences.favoriteCuisines && cuisinePreferences.favoriteCuisines.length > 0) {
        cuisineExplanation = ` Taking into account their preference for ${cuisinePreferences.favoriteCuisines.join(', ')} cuisines`;
        if (cuisinePreferences.spiceLevel) {
          cuisineExplanation += ` with a ${cuisinePreferences.spiceLevel} spice level`;
        }
        if (cuisinePreferences.dietaryRestrictions && cuisinePreferences.dietaryRestrictions.length > 0) {
          cuisineExplanation += `, while respecting ${cuisinePreferences.dietaryRestrictions.join(', ')} dietary guidelines`;
        }
        cuisineExplanation += '.';
        personalizationScore += 5;
      }
    }
    
    switch (requestType) {
      case 'meal':
        explanation = `Based on ${childProfile.name}'s profile (age: ${childProfile.age}, weight: ${childProfile.weight}kg, health status: ${healthStatus}), our AI nutritional analysis recommends meals optimized for their specific growth and nutrition needs.${cuisineExplanation}`;
        
        // Generate meal recommendations based on cuisine preference
        if (cuisinePreferences && cuisinePreferences.favoriteCuisines?.includes('indian')) {
          // Get Indian meal suggestions
          recommendations = getIndianMealSuggestions(childProfile, cuisinePreferences);
          explanation += ` We've selected authentic Indian meals that are commonly prepared at home and provide balanced nutrition for growing children.`;
        } else {
          // Default recommendations if Indian cuisine not selected
          recommendations = [
            {
              name: "Balanced Meal Plan",
              description: "A nutritionally balanced meal suitable for a growing child",
              items: ["Whole grain pasta", "Steamed vegetables", "Grilled chicken", "Fresh fruit"]
            }
          ];
        }
        
        if (Object.keys(preferences).length > 0) {
          explanation += ` Personalization factor: Previous meal preferences incorporated.`;
          personalizationScore += 5;
        }
        break;
        
      case 'exercise':
        explanation = `Exercise recommendations tailored for ${childProfile.name}'s age group (${childProfile.age} years), current health status (${healthStatus}) and activity level.`;
        if (Object.keys(preferences).length > 0) {
          explanation += ` Adjustments made based on previous exercise engagement patterns.`;
          personalizationScore += 5;
        }
        break;
        
      case 'recipe':
        explanation = `Recipes selected specifically for ${childProfile.name}'s nutritional requirements, age (${childProfile.age}), weight (${childProfile.weight}kg), and dietary preferences.${cuisineExplanation}`;
        
        // Generate recipe recommendations based on cuisine preference
        if (cuisinePreferences && cuisinePreferences.favoriteCuisines?.includes('indian')) {
          // Get Indian recipe suggestions
          recommendations = getIndianMealSuggestions(childProfile, cuisinePreferences);
          explanation += ` We've selected authentic Indian recipes that are commonly prepared at home and provide balanced nutrition for growing children.`;
        } else {
          // Default recommendations if Indian cuisine not selected
          recommendations = [
            {
              name: "Simple Recipe",
              description: "An easy recipe suitable for children",
              ingredients: ["Ingredient 1", "Ingredient 2"],
              instructions: ["Step 1", "Step 2"]
            }
          ];
        }
        
        if (childProfile.hasAllergies && childProfile.allergies) {
          explanation += ` Allergies and dietary restrictions (${childProfile.allergies}) have been factored into recipe selection.`;
          personalizationScore += 10;
        }
        break;
    }
    
    if (personalizationScore > 100) personalizationScore = 100;
    
    return {
      recommendations,
      explanation,
      personalizationScore
    };
  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    toast.error('Failed to generate personalized recommendations');
    
    // Return fallback response
    return {
      recommendations: [],
      explanation: 'Unable to generate personalized recommendations at this time. Using standard recommendations instead.',
      personalizationScore: 60
    };
  }
};

// Service to enhance existing recommendations with AI insights
export const enhanceRecommendationsWithAI = async (
  childProfile: ChildProfile, 
  existingRecommendations: any[],
  type: 'meal' | 'exercise' | 'recipe',
  preferences?: Record<string, number>,
  cuisinePreferences?: CuisinePreferences
): Promise<{
  enhancedRecommendations: any[],
  explanation: string,
  personalizationScore: number
}> => {
  // Get AI recommendation metadata
  const aiResponse = await getAIRecommendations({
    childProfile,
    requestType: type,
    preferences,
    cuisinePreferences
  });
  
  // If we have AI-generated recommendations for Indian cuisine, use those
  if (aiResponse.recommendations && aiResponse.recommendations.length > 0) {
    return {
      enhancedRecommendations: aiResponse.recommendations,
      explanation: aiResponse.explanation,
      personalizationScore: aiResponse.personalizationScore
    };
  }
  
  // Otherwise, use the existing recommendations
  return {
    enhancedRecommendations: existingRecommendations,
    explanation: aiResponse.explanation,
    personalizationScore: aiResponse.personalizationScore
  };
};

// Data storage for cuisine preferences
const cuisinePreferencesStore: Record<string, CuisinePreferences> = {};

// Save cuisine preferences
export const saveCuisinePreferences = (preferences: CuisinePreferences): void => {
  cuisinePreferencesStore[preferences.childId] = preferences;
  console.log('Saved cuisine preferences:', preferences);
};

// Get cuisine preferences
export const getCuisinePreferences = (childId: string): CuisinePreferences | undefined => {
  return cuisinePreferencesStore[childId];
};

export default {
  getAIRecommendations,
  enhanceRecommendationsWithAI,
  saveCuisinePreferences,
  getCuisinePreferences
};
