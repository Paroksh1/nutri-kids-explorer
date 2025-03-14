
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
  const suggestions = [];
  
  // Default Indian recipes if no specific region is selected
  const defaultIndianRecipes = [
    {
      name: "Simple Dal and Rice",
      description: "Nutritious yellow dal with steamed rice, perfect for children",
      ingredients: ["1 cup toor dal", "1/2 tsp turmeric", "1 tsp cumin seeds", "2 tbsp ghee", "1 cup rice", "Salt to taste"],
      instructions: ["Pressure cook dal with turmeric and salt", "Prepare tempering with cumin in ghee", "Cook rice separately", "Serve dal over rice"],
      nutritionalInfo: {
        calories: 320,
        protein: "14g",
        carbs: "52g",
        fat: "6g"
      }
    },
    {
      name: "Vegetable Khichdi",
      description: "One-pot rice and lentil dish with mixed vegetables",
      ingredients: ["1/2 cup rice", "1/2 cup moong dal", "Mixed vegetables (carrots, peas, beans)", "1 tsp cumin seeds", "1/2 tsp turmeric", "1 tbsp ghee"],
      instructions: ["Wash rice and dal together", "Sauté cumin in ghee", "Add vegetables, rice, dal, and spices", "Pressure cook for 2-3 whistles"],
      nutritionalInfo: {
        calories: 285,
        protein: "11g",
        carbs: "48g",
        fat: "5g"
      }
    },
    {
      name: "Paneer Paratha",
      description: "Whole wheat flatbread stuffed with spiced cottage cheese",
      ingredients: ["2 cups whole wheat flour", "200g paneer", "1 small onion, finely chopped", "Green chilies (optional)", "Coriander leaves", "Ghee for cooking"],
      instructions: ["Knead dough with flour and water", "Mix paneer with spices for stuffing", "Roll out parathas with stuffing", "Cook on tawa with ghee"],
      nutritionalInfo: {
        calories: 340,
        protein: "18g",
        carbs: "32g",
        fat: "14g"
      }
    }
  ];
  
  // North Indian recipes
  const northIndianRecipes = [
    {
      name: "Chole with Whole Wheat Roti",
      description: "Protein-rich chickpea curry with whole wheat flatbread",
      ingredients: ["1 cup chickpeas", "2 tomatoes", "1 onion", "2 tsp chole masala", "Whole wheat flour for rotis", "Ghee"],
      instructions: ["Soak chickpeas overnight and pressure cook", "Sauté onions and tomatoes with spices", "Add chickpeas and simmer", "Make fresh rotis with whole wheat flour"],
      nutritionalInfo: {
        calories: 380,
        protein: "19g",
        carbs: "60g",
        fat: "8g"
      }
    },
    {
      name: "Aloo Paratha with Curd",
      description: "Potato-stuffed flatbread served with fresh yogurt",
      ingredients: ["2 cups whole wheat flour", "3 medium potatoes", "1 tsp cumin powder", "1/2 tsp red chili powder", "Fresh curd"],
      instructions: ["Boil and mash potatoes with spices", "Make paratha dough and stuff with potato mixture", "Cook on tawa with ghee", "Serve with fresh curd"],
      nutritionalInfo: {
        calories: 350,
        protein: "12g",
        carbs: "58g",
        fat: "9g"
      }
    }
  ];
  
  // South Indian recipes
  const southIndianRecipes = [
    {
      name: "Idli Sambar",
      description: "Steamed rice cakes with lentil vegetable stew",
      ingredients: ["1 cup idli rice", "1/2 cup urad dal", "1 cup toor dal", "Mixed vegetables", "1 tbsp sambar powder", "Curry leaves"],
      instructions: ["Ferment rice and urad dal batter", "Steam to make idlis", "Cook toor dal with vegetables and spices for sambar", "Serve hot idlis with sambar"],
      nutritionalInfo: {
        calories: 280,
        protein: "15g",
        carbs: "50g",
        fat: "3g"
      }
    },
    {
      name: "Rava Upma",
      description: "Savory semolina breakfast with vegetables",
      ingredients: ["1 cup rava (semolina)", "1 onion", "1 carrot", "Green peas", "1 green chili", "1 tsp mustard seeds", "Curry leaves"],
      instructions: ["Roast rava until light brown", "Temper mustard seeds and add vegetables", "Add water and cook until semolina absorbs all water", "Garnish with coriander leaves"],
      nutritionalInfo: {
        calories: 220,
        protein: "7g",
        carbs: "42g",
        fat: "4g"
      }
    }
  ];
  
  // East Indian recipes
  const eastIndianRecipes = [
    {
      name: "Masoor Dal Khichuri",
      description: "Bengali rice and red lentil one-pot meal",
      ingredients: ["1/2 cup rice", "1/2 cup masoor dal", "1 potato", "1 tsp turmeric", "1 tsp panch phoron", "2 tbsp mustard oil"],
      instructions: ["Wash rice and dal together", "Heat oil and add panch phoron", "Add vegetables and spices", "Add rice, dal, and water and cook until done"],
      nutritionalInfo: {
        calories: 310,
        protein: "12g",
        carbs: "52g",
        fat: "7g"
      }
    },
    {
      name: "Luchi with Aloo Dum",
      description: "Bengali deep-fried bread with spiced potato curry",
      ingredients: ["1 cup maida (all-purpose flour)", "2 tbsp oil", "4 potatoes", "1 tsp cumin seeds", "1 tsp garam masala", "Oil for frying"],
      instructions: ["Make luchi dough and rest", "Make potato curry with spices", "Deep fry luchi until puffed", "Serve hot with aloo dum"],
      nutritionalInfo: {
        calories: 420,
        protein: "8g",
        carbs: "64g",
        fat: "16g"
      }
    }
  ];
  
  // West Indian recipes
  const westIndianRecipes = [
    {
      name: "Thalipeeth with Curd",
      description: "Multi-grain Maharashtrian flatbread",
      ingredients: ["1 cup multigrain flour (bhajani)", "1 onion", "1 tsp sesame seeds", "Fresh coriander leaves", "Ghee", "Fresh curd"],
      instructions: ["Mix flour with vegetables and spices", "Add water to make dough", "Pat down on a greased tawa", "Cook with ghee until crisp", "Serve with curd"],
      nutritionalInfo: {
        calories: 280,
        protein: "10g",
        carbs: "48g",
        fat: "7g"
      }
    },
    {
      name: "Poha",
      description: "Flattened rice breakfast with peanuts and spices",
      ingredients: ["2 cups flattened rice (poha)", "1 potato", "1/4 cup peanuts", "1 tsp mustard seeds", "1 onion", "Curry leaves", "1 lemon"],
      instructions: ["Rinse poha and drain", "Temper mustard seeds and add vegetables", "Mix in poha and spices", "Garnish with coriander and lemon juice"],
      nutritionalInfo: {
        calories: 260,
        protein: "8g",
        carbs: "44g",
        fat: "6g"
      }
    }
  ];
  
  // Select based on region preference if available
  if (cuisinePreferences?.indianRegionPreference) {
    switch(cuisinePreferences.indianRegionPreference) {
      case 'north':
        suggestions.push(...northIndianRecipes);
        break;
      case 'south':
        suggestions.push(...southIndianRecipes);
        break;
      case 'east':
        suggestions.push(...eastIndianRecipes);
        break;
      case 'west':
        suggestions.push(...westIndianRecipes);
        break;
      default:
        suggestions.push(...defaultIndianRecipes);
    }
  } else {
    suggestions.push(...defaultIndianRecipes);
  }
  
  // Filter based on spice preference
  if (cuisinePreferences?.spiceLevel === 'mild') {
    // For mild preference, add note about reducing spice levels
    suggestions.forEach(recipe => {
      recipe.description += " (made with minimal spices for children)";
    });
  }
  
  // Filter based on dietary restrictions
  if (cuisinePreferences?.dietaryRestrictions?.includes('vegetarian')) {
    // Already all vegetarian, but can be expanded
  }
  
  return suggestions;
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
      const hasIndianPreference = cuisinePreferences.favoriteCuisines.includes('indian');
      
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
      } else {
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
        if (cuisinePreferences && cuisinePreferences.favoriteCuisines.includes('indian')) {
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
        if (cuisinePreferences && cuisinePreferences.favoriteCuisines.includes('indian')) {
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
