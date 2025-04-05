import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Check, Info, AlertCircle, HelpCircle, Search } from 'lucide-react';
import DietaryDiversityResults from './DietaryDiversityResults';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { getCurrentUser } from './auth/AuthForm';
import { processFoodText, getFoodGroup } from '@/utils/foodNameMapper';
import { identifyHindiFood, getHindiFoodGroup } from '@/utils/dietaryDiversityUtils';

export const foodGroups = [
  {
    id: 1,
    name: 'CEREALS',
    examples: 'Corn/maize, rice, wheat, sorghum, millet or any other grains or foods made from these (e.g. bread, noodles, porridge or other grain products)',
    value: false
  },
  {
    id: 2,
    name: 'WHITE ROOTS AND TUBERS',
    examples: 'White potatoes, white yam, white cassava, or other foods made from roots',
    value: false
  },
  {
    id: 3,
    name: 'VITAMIN A RICH VEGETABLES AND TUBERS',
    examples: 'Pumpkin, carrot, squash, or sweet potato that are orange inside, red sweet pepper',
    value: false
  },
  {
    id: 4,
    name: 'DARK GREEN LEAFY VEGETABLES',
    examples: 'Dark green leafy vegetables, including wild forms, amaranth, cassava leaves, kale, spinach',
    value: false
  },
  {
    id: 5,
    name: 'OTHER VEGETABLES',
    examples: 'Other vegetables (e.g. tomato, onion, eggplant)',
    value: false
  },
  {
    id: 6,
    name: 'VITAMIN A RICH FRUITS',
    examples: 'Ripe mango, cantaloupe, apricot (fresh or dried), ripe papaya, dried peach, and 100% fruit juice made from these',
    value: false
  },
  {
    id: 7,
    name: 'OTHER FRUITS',
    examples: 'Other fruits, including wild fruits and 100% fruit juice made from these',
    value: false
  },
  {
    id: 8,
    name: 'ORGAN MEAT',
    examples: 'Liver, kidney, heart or other organ meats or blood-based foods',
    value: false
  },
  {
    id: 9,
    name: 'FLESH MEATS',
    examples: 'Beef, pork, lamb, goat, rabbit, game, chicken, duck, other birds, insects',
    value: false
  },
  {
    id: 10,
    name: 'EGGS',
    examples: 'Eggs from chicken, duck, guinea fowl or any other egg',
    value: false
  },
  {
    id: 11,
    name: 'FISH AND SEAFOOD',
    examples: 'Fresh or dried fish or shellfish',
    value: false
  },
  {
    id: 12,
    name: 'LEGUMES, NUTS AND SEEDS',
    examples: 'Dried beans, dried peas, lentils, nuts, seeds or foods made from these (eg. hummus, peanut butter)',
    value: false
  },
  {
    id: 13,
    name: 'MILK AND MILK PRODUCTS',
    examples: 'Milk, cheese, yogurt or other milk products',
    value: false
  },
  {
    id: 14,
    name: 'OILS AND FATS',
    examples: 'Oil, fats or butter added to food or used for cooking',
    value: false
  },
  {
    id: 15,
    name: 'SWEETS',
    examples: 'Sugar, honey, sweetened soda or sweetened juice drinks, sugary foods such as chocolates, candies, cookies and cakes',
    value: false
  },
  {
    id: 16,
    name: 'SPICES, CONDIMENTS, BEVERAGES',
    examples: 'Spices (black pepper, salt), condiments (soy sauce, hot sauce), coffee, tea, alcoholic beverages',
    value: false
  }
];

interface MealEntry {
  foods: string;
}

const DietaryDiversityCalculator: React.FC = () => {
  const [meals, setMeals] = useState<{
    breakfast: MealEntry;
    morningSnack: MealEntry;
    lunch: MealEntry;
    afternoonSnack: MealEntry;
    dinner: MealEntry;
    eveningSnack: MealEntry;
  }>({
    breakfast: { foods: '' },
    morningSnack: { foods: '' },
    lunch: { foods: '' },
    afternoonSnack: { foods: '' },
    dinner: { foods: '' },
    eveningSnack: { foods: '' },
  });
  
  const [foodGroupsChecked, setFoodGroupsChecked] = useState([...foodGroups]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState<'meals' | 'groups'>('meals');
  const [activeTab, setActiveTab] = useState<string>('breakfast');
  const [ateOutside, setAteOutside] = useState<boolean | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [analysisDetails, setAnalysisDetails] = useState<{
    dish: string;
    ingredients: string[];
    groups: string[];
  } | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUserProfile(user);
    }
  }, []);

  const updateMeal = (mealType: keyof typeof meals, foods: string) => {
    setMeals(prev => ({
      ...prev,
      [mealType]: { ...prev[mealType], foods }
    }));
  };
  
  const toggleFoodGroup = (id: number) => {
    setFoodGroupsChecked(prev => 
      prev.map(group => 
        group.id === id ? { ...group, value: !group.value } : group
      )
    );
  };
  
  const getFilledMeals = () => {
    return Object.entries(meals).filter(([_, meal]) => meal.foods.trim().length > 0);
  };

  const analyzeAndSuggestFoodGroups = () => {
    setFoodGroupsChecked(foodGroups.map(group => ({ ...group, value: false })));
    
    const allFoodText = Object.values(meals)
      .map(meal => meal.foods)
      .join(' ');
    
    console.log("Analyzing all foods:", allFoodText);
    
    if (!allFoodText.trim()) {
      toast.error("Please enter at least one food item before continuing");
      return;
    }
    
    let detectedGroups = new Set<number>();
    
    Object.entries(meals).forEach(([mealType, meal]) => {
      if (meal.foods.trim()) {
        console.log(`Processing ${mealType}:`, meal.foods);
        
        const foodItems = meal.foods.toLowerCase()
          .split(/[,;\n\s]+/)
          .map(item => item.trim())
          .filter(item => item !== '');
          
        console.log(`Food items in ${mealType}:`, foodItems);
        
        foodItems.forEach(food => {
          const foodGroup = getHindiFoodGroup(food);
          console.log(`Food "${food}" mapped to group: ${foodGroup}`);
          
          if (foodGroup === "dairy") detectedGroups.add(13);
          else if (foodGroup === "legumes_nuts_seeds") detectedGroups.add(12);
          else if (foodGroup === "starchy_staples") detectedGroups.add(1);
          else if (foodGroup === "vitamin_a_fruits_vegetables") detectedGroups.add(3);
          else if (foodGroup === "other_vegetables") detectedGroups.add(5);
          else if (foodGroup === "dark_green_leafy_veg") detectedGroups.add(4);
          else if (foodGroup === "other_fruits") detectedGroups.add(7);
          else if (foodGroup === "meat_fish") detectedGroups.add(9);
          else if (foodGroup === "eggs") detectedGroups.add(10);
        });
        
        const mealGroups = processFoodText(meal.foods);
        console.log(`Additional groups from processor for ${mealType}:`, mealGroups);
        
        mealGroups.forEach(id => detectedGroups.add(id));
      }
    });
    
    const allFoodGroups = processFoodText(allFoodText);
    console.log("Groups from processing all foods together:", allFoodGroups);
    
    allFoodGroups.forEach(id => detectedGroups.add(id));
    
    console.log("Final detected groups:", Array.from(detectedGroups));
    
    if (detectedGroups.size > 0) {
      const updatedGroups = [...foodGroupsChecked];
      Array.from(detectedGroups).forEach(groupId => {
        const index = updatedGroups.findIndex(group => group.id === groupId);
        if (index >= 0) {
          updatedGroups[index] = { ...updatedGroups[index], value: true };
          console.log(`Set group ${updatedGroups[index].name} to true`);
        }
      });
      setFoodGroupsChecked(updatedGroups);
      
      const foodItems = allFoodText
        .split(/[,;\n\s]+/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
        
      if (foodItems.length > 0) {
        const hindiGroups = identifyHindiFood(allFoodText);
        
        setAnalysisDetails({
          dish: foodItems[0],
          ingredients: foodItems.slice(0, 3),
          groups: hindiGroups
        });
        
        toast.success(`Successfully analyzed ${foodItems.length} food items!`);
      }
    } else {
      toast.warning("Couldn't determine any food groups. Please check your entries or manually select them.");
    }
    
    if (userProfile) {
      console.log(`Analyzing food entries for ${userProfile.firstName} ${userProfile.lastName}`);
    }
    
    setCurrentStep('groups');
    toast.success("Foods have been analyzed! Please review and adjust the food groups.");
  };
  
  const calculateDietaryDiversityScore = () => {
    setIsCalculating(true);
    
    const nineGroupScore = [
      foodGroupsChecked[0].value || foodGroupsChecked[1].value ? 1 : 0,
      foodGroupsChecked[3].value ? 1 : 0,
      foodGroupsChecked[2].value || foodGroupsChecked[5].value ? 1 : 0,
      foodGroupsChecked[4].value || foodGroupsChecked[6].value ? 1 : 0,
      foodGroupsChecked[7].value ? 1 : 0,
      foodGroupsChecked[8].value || foodGroupsChecked[10].value ? 1 : 0,
      foodGroupsChecked[9].value ? 1 : 0,
      foodGroupsChecked[11].value ? 1 : 0,
      foodGroupsChecked[12].value ? 1 : 0
    ];
    
    const totalScore = nineGroupScore.reduce((sum, val) => sum + val, 0);
    
    if (userProfile) {
      console.log(`Saving dietary diversity score for ${userProfile.firstName} ${userProfile.lastName}`);
    }
    
    setTimeout(() => {
      setIsCalculating(false);
      setShowResults(true);
    }, 1500);
  };
  
  const resetForm = () => {
    setMeals({
      breakfast: { foods: '' },
      morningSnack: { foods: '' },
      lunch: { foods: '' },
      afternoonSnack: { foods: '' },
      dinner: { foods: '' },
      eveningSnack: { foods: '' },
    });
    setFoodGroupsChecked(foodGroups.map(group => ({ ...group, value: false })));
    setShowResults(false);
    setCurrentStep('meals');
    setActiveTab('breakfast');
    setAteOutside(null);
  };

  if (showResults) {
    const nineGroupScore = [
      foodGroupsChecked[0].value || foodGroupsChecked[1].value ? 1 : 0,
      foodGroupsChecked[3].value ? 1 : 0,
      foodGroupsChecked[2].value || foodGroupsChecked[5].value ? 1 : 0,
      foodGroupsChecked[4].value || foodGroupsChecked[6].value ? 1 : 0,
      foodGroupsChecked[7].value ? 1 : 0,
      foodGroupsChecked[8].value || foodGroupsChecked[10].value ? 1 : 0,
      foodGroupsChecked[9].value ? 1 : 0,
      foodGroupsChecked[11].value ? 1 : 0,
      foodGroupsChecked[12].value ? 1 : 0
    ];
    
    const totalScore = nineGroupScore.reduce((sum, val) => sum + val, 0);
    
    return (
      <DietaryDiversityResults 
        score={totalScore} 
        maxScore={9}
        foodGroups={nineGroupScore}
        onReset={resetForm}
        rawData={{
          meals,
          foodGroups: foodGroupsChecked,
          ateOutside,
          user: userProfile
        }}
      />
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto glass-panel">
      <CardHeader>
        <CardTitle className="heading-md text-center">DIETARY DIVERSITY QUESTIONNAIRE</CardTitle>
        <CardDescription className="text-center">
          {userProfile ? 
            `Hi ${userProfile.firstName}! Please describe the foods (meals and snacks) that you ate yesterday during the day and night.` :
            `Please describe the foods (meals and snacks) that you ate yesterday during the day and night, whether at home or outside the home.`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {currentStep === 'meals' ? (
          <div className="space-y-6">
            <div className="bg-muted/40 p-4 rounded-lg text-sm italic">
              <p className="flex items-start">
                <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
                Start with the first food or drink of the morning. Write down all foods and drinks mentioned. 
                When composite dishes are mentioned, please include the list of ingredients.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium flex items-center text-blue-800 mb-2">
                <HelpCircle className="h-4 w-4 mr-2" />
                Food Entry Tips
              </h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• You can enter food names in Hindi or English (e.g. "आलू" or "potato")</li>
                <li>• For dishes like "dal rice", list both components</li>
                <li>• Use common names like "chapati" (for wheat) or "roti"</li>
                <li>• Include all ingredients for composite dishes</li>
                <li>• Separate different foods with commas</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium flex items-center text-green-800 mb-2">
                <Search className="h-4 w-4 mr-2" />
                Ingredient Analysis
              </h4>
              <p className="text-sm text-green-700 mb-2">
                Our system automatically analyzes dishes to identify their ingredients and food groups!
                For example:
              </p>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• "chapati" → wheat → starchy staples</li>
                <li>• "palak paneer" → spinach, cheese → vitamin A rich vegetables, dairy</li>
                <li>• "aloo gobhi" → potato, cauliflower → starchy staples, other vegetables</li>
              </ul>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
                <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                <TabsTrigger value="morningSnack">Morning Snack</TabsTrigger>
                <TabsTrigger value="lunch">Lunch</TabsTrigger>
                <TabsTrigger value="afternoonSnack">Afternoon Snack</TabsTrigger>
                <TabsTrigger value="dinner">Dinner</TabsTrigger>
                <TabsTrigger value="eveningSnack">Evening Snack</TabsTrigger>
              </TabsList>
              
              {Object.entries(meals).map(([mealType, meal]) => (
                <TabsContent key={mealType} value={mealType} className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label htmlFor={`${mealType}-foods`} className="text-lg font-semibold capitalize">
                        {mealType.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      {meal.foods.trim().length > 0 && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          <Check className="h-3 w-3 mr-1" /> Added
                        </Badge>
                      )}
                    </div>
                    <Textarea
                      id={`${mealType}-foods`}
                      placeholder={`Enter all foods and drinks consumed during ${mealType.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}...`}
                      className="min-h-[120px]"
                      value={meal.foods}
                      onChange={(e) => updateMeal(mealType as keyof typeof meals, e.target.value)}
                    />
                    <div className="mt-1 text-xs text-muted-foreground">
                      Example: chapati, dal, rice, vegetables, yogurt
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            
            <div className="bg-muted/40 p-4 rounded-lg space-y-4">
              <p className="text-sm font-medium">Did you eat anything (meal or snack) OUTSIDE the home yesterday?</p>
              <div className="flex gap-2">
                <Button 
                  variant={ateOutside === true ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setAteOutside(true)}
                >
                  Yes
                </Button>
                <Button 
                  variant={ateOutside === false ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setAteOutside(false)}
                >
                  No
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={analyzeAndSuggestFoodGroups} 
                disabled={getFilledMeals().length === 0 || ateOutside === null}
              >
                Continue to Food Groups
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-muted/40 p-4 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-amber-500" />
              <p className="text-sm">
                Please check all food groups that were consumed yesterday based on the foods you've entered. 
                We've pre-checked some based on your entries, but please review and adjust as needed.
              </p>
            </div>
            
            {analysisDetails && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Food Analysis Example</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Dish:</span> {analysisDetails.dish}</p>
                  <p><span className="font-medium">Contains:</span> {analysisDetails.ingredients.join(', ')}</p>
                  <p><span className="font-medium">Food Groups:</span> {analysisDetails.groups.length > 0 ? 
                    analysisDetails.groups.join(', ') : 'No specific groups detected'}</p>
                </div>
              </div>
            )}
            
            <div className="border rounded-md">
              <table className="w-full">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="py-2 px-4 text-left w-12">No.</th>
                    <th className="py-2 px-4 text-left">Food Group</th>
                    <th className="py-2 px-4 text-left">Examples</th>
                    <th className="py-2 px-4 text-center w-20">Yes=1 No=0</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {foodGroupsChecked.map((group) => (
                    <tr key={group.id} className="hover:bg-muted/20">
                      <td className="py-3 px-4">{group.id}</td>
                      <td className="py-3 px-4 font-medium">{group.name}</td>
                      <td className="py-3 px-4 text-sm">{group.examples}</td>
                      <td className="py-3 px-4 text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant={group.value ? "default" : "outline"} 
                                size="sm"
                                className="w-12"
                                onClick={() => toggleFoodGroup(group.id)}
                              >
                                {group.value ? "1" : "0"}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Click to {group.value ? 'remove' : 'add'} this food group</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep('meals')}>
                Back to Meals
              </Button>
              <Button 
                onClick={calculateDietaryDiversityScore} 
                disabled={isCalculating}
                className="bg-primary button-hover"
              >
                {isCalculating ? 'Calculating...' : 'Calculate Diversity Score'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DietaryDiversityCalculator;
