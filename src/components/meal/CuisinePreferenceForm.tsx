
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ChefHat, AlertCircle } from 'lucide-react';
import { getCuisinePreferences } from '@/services/AIRecommendationService';

export interface CuisinePreferences {
  childId: string;
  favoriteCuisines: string[];
  favoriteProteinSources: string[];
  dislikedFoods: string[];
  allergies: string[];
  spiceLevel: string;
  dietaryRestrictions: string[];
  mealSizePreference: string;
  sweetPreference: string;
  indianRegionPreference?: string; // Added for Indian regional cuisine preference
  favoriteIndianDishes?: string[]; // Added for favorite Indian dishes
  traditionalPreference?: string; // Added for traditional vs fusion preference
}

interface CuisinePreferenceFormProps {
  childId: string;
  onSubmit: (data: CuisinePreferences) => void;
}

const CuisinePreferenceForm: React.FC<CuisinePreferenceFormProps> = ({ childId, onSubmit }) => {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [customCuisine, setCustomCuisine] = useState('');
  const [showIndianOptions, setShowIndianOptions] = useState(false);
  const [selectedIndianDishes, setSelectedIndianDishes] = useState<string[]>([]);
  const [customIndianDish, setCustomIndianDish] = useState('');
  
  // Load existing preferences if available
  useEffect(() => {
    const existingPreferences = getCuisinePreferences(childId);
    if (existingPreferences) {
      if (existingPreferences.favoriteCuisines) {
        setSelectedCuisines(existingPreferences.favoriteCuisines);
        // Check if Indian cuisine is selected
        if (existingPreferences.favoriteCuisines.includes('indian')) {
          setShowIndianOptions(true);
        }
      }
      
      if (existingPreferences.favoriteIndianDishes) {
        setSelectedIndianDishes(existingPreferences.favoriteIndianDishes);
      }
      
      // Update form defaults with existing values
      form.reset({
        ...existingPreferences
      });
    }
  }, [childId]);
  
  const form = useForm({
    defaultValues: {
      childId,
      favoriteCuisines: [],
      favoriteProteinSources: [],
      dislikedFoods: [],
      allergies: [],
      spiceLevel: 'medium',
      dietaryRestrictions: [],
      mealSizePreference: 'medium',
      sweetPreference: 'medium',
      indianRegionPreference: '',
      traditionalPreference: 'traditional'
    }
  });
  
  // Watch for changes to observe form values
  const watchedValues = form.watch();
  
  const cuisineOptions = [
    { id: 'indian', label: 'Indian' },
    { id: 'chinese', label: 'Chinese' },
    { id: 'italian', label: 'Italian' },
    { id: 'mexican', label: 'Mexican' },
    { id: 'american', label: 'American' },
    { id: 'japanese', label: 'Japanese' },
    { id: 'mediterranean', label: 'Mediterranean' },
    { id: 'thai', label: 'Thai' },
    { id: 'korean', label: 'Korean' },
    { id: 'french', label: 'French' }
  ];
  
  const proteinOptions = [
    { id: 'chicken', label: 'Chicken' },
    { id: 'beef', label: 'Beef' },
    { id: 'fish', label: 'Fish' },
    { id: 'tofu', label: 'Tofu' },
    { id: 'paneer', label: 'Paneer (Indian Cottage Cheese)' },
    { id: 'lentils', label: 'Lentils/Beans (Dal)' },
    { id: 'eggs', label: 'Eggs' },
    { id: 'dairy', label: 'Dairy (Milk, Curd)' }
  ];
  
  const dietaryRestrictionOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'dairy-free', label: 'Dairy-Free' },
    { id: 'nut-free', label: 'Nut-Free' },
    { id: 'low-sugar', label: 'Low-Sugar' }
  ];
  
  const indianDishOptions = [
    { id: 'dal-rice', label: 'Dal Rice' },
    { id: 'roti-sabzi', label: 'Roti with Sabzi' },
    { id: 'idli-dosa', label: 'Idli/Dosa' },
    { id: 'paratha', label: 'Paratha' },
    { id: 'khichdi', label: 'Khichdi' },
    { id: 'pulao', label: 'Pulao/Biryani' },
    { id: 'chaat', label: 'Chaat' },
    { id: 'samosa', label: 'Samosa/Pakora' },
    { id: 'upma', label: 'Upma/Poha' },
    { id: 'chole', label: 'Chole/Rajma' }
  ];
  
  const handleSelectCuisine = (id: string, checked: boolean) => {
    setSelectedCuisines(prev => {
      const newSelection = checked 
        ? [...prev, id] 
        : prev.filter(item => item !== id);
      
      // Show Indian specific options if Indian is selected
      if (id === 'indian') {
        setShowIndianOptions(checked);
      }
      
      return newSelection;
    });
  };
  
  const handleAddCustomCuisine = () => {
    if (customCuisine.trim() !== '') {
      setSelectedCuisines(prev => [...prev, customCuisine.trim()]);
      setCustomCuisine('');
      toast.success(`Added ${customCuisine} to favorite cuisines`);
    }
  };
  
  const handleSelectIndianDish = (id: string, checked: boolean) => {
    setSelectedIndianDishes(prev => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter(item => item !== id);
      }
    });
  };
  
  const handleAddCustomIndianDish = () => {
    if (customIndianDish.trim() !== '') {
      setSelectedIndianDishes(prev => [...prev, customIndianDish.trim()]);
      setCustomIndianDish('');
      toast.success(`Added ${customIndianDish} to favorite Indian dishes`);
    }
  };
  
  const handleSubmitForm = (data: any) => {
    // Combine selected cuisines and Indian dishes with form data
    const formData = {
      ...data,
      favoriteCuisines: selectedCuisines,
      favoriteIndianDishes: selectedIndianDishes
    };
    
    onSubmit(formData);
    toast.success("Food preferences saved successfully!");
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ChefHat className="h-5 w-5 mr-2 text-primary" />
          Child Food Preferences Questionnaire
        </CardTitle>
        <CardDescription>
          Help us customize the perfect meal plan for your child
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Favorite Cuisines</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {cuisineOptions.map((cuisine) => (
                  <div key={cuisine.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`cuisine-${cuisine.id}`} 
                      checked={selectedCuisines.includes(cuisine.id)}
                      onCheckedChange={(checked) => handleSelectCuisine(cuisine.id, checked as boolean)}
                    />
                    <label 
                      htmlFor={`cuisine-${cuisine.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {cuisine.label}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <FormLabel>Other Cuisine</FormLabel>
                  <Input 
                    value={customCuisine}
                    onChange={(e) => setCustomCuisine(e.target.value)}
                    placeholder="Enter a cuisine not listed above"
                  />
                </div>
                <Button type="button" onClick={handleAddCustomCuisine} size="sm">
                  Add
                </Button>
              </div>
            </div>
            
            {/* Indian cuisine specific questions */}
            {showIndianOptions && (
              <div className="space-y-4 p-4 border rounded-md bg-muted/30">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="text-primary mr-2">🇮🇳</span> 
                  Indian Cuisine Preferences
                </h3>
                
                <FormField
                  control={form.control}
                  name="indianRegionPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Indian Regional Cuisine</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select regional preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="north">North Indian (Punjabi, Delhi style)</SelectItem>
                          <SelectItem value="south">South Indian (Dosa, Idli, Tamil/Kerala style)</SelectItem>
                          <SelectItem value="east">East Indian (Bengali, Odia style)</SelectItem>
                          <SelectItem value="west">West Indian (Gujarati, Maharashtrian style)</SelectItem>
                          <SelectItem value="mixed">Mixed/Pan-Indian</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This helps us select recipes from your preferred regional style
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <FormLabel>Favorite Indian Dishes</FormLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {indianDishOptions.map((dish) => (
                      <div key={dish.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`dish-${dish.id}`} 
                          checked={selectedIndianDishes.includes(dish.id)}
                          onCheckedChange={(checked) => handleSelectIndianDish(dish.id, checked as boolean)}
                        />
                        <label 
                          htmlFor={`dish-${dish.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {dish.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-end gap-2 mt-2">
                    <div className="flex-1">
                      <FormLabel>Other Indian Dish</FormLabel>
                      <Input 
                        value={customIndianDish}
                        onChange={(e) => setCustomIndianDish(e.target.value)}
                        placeholder="Enter a dish not listed above"
                      />
                    </div>
                    <Button type="button" onClick={handleAddCustomIndianDish} size="sm">
                      Add
                    </Button>
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="traditionalPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preparation Style Preference</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select style preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="traditional">Traditional (Authentic recipes)</SelectItem>
                          <SelectItem value="modern">Modern (Healthier adaptations)</SelectItem>
                          <SelectItem value="fusion">Fusion (Indian flavors with global techniques)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            <FormField
              control={form.control}
              name="favoriteProteinSources"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite Protein Sources</FormLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {proteinOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`protein-${option.id}`} 
                          checked={field.value?.includes(option.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, option.id]);
                            } else {
                              field.onChange(field.value?.filter((value: string) => value !== option.id));
                            }
                          }}
                        />
                        <label 
                          htmlFor={`protein-${option.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dislikedFoods"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disliked Foods</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter foods your child dislikes (comma separated)"
                      onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
                    />
                  </FormControl>
                  <FormDescription>
                    For example: "broccoli, mushrooms, olives"
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="spiceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Spice Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select spice preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mild">Mild (No Spice)</SelectItem>
                      <SelectItem value="medium">Medium (Some Spice)</SelectItem>
                      <SelectItem value="spicy">Spicy (Likes Spicy Food)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dietaryRestrictions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dietary Restrictions</FormLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {dietaryRestrictionOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`diet-${option.id}`} 
                          checked={field.value?.includes(option.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, option.id]);
                            } else {
                              field.onChange(field.value?.filter((value: string) => value !== option.id));
                            }
                          }}
                        />
                        <label 
                          htmlFor={`diet-${option.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="mealSizePreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meal Size Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select meal size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="small">Small Portions</SelectItem>
                        <SelectItem value="medium">Medium Portions</SelectItem>
                        <SelectItem value="large">Large Portions</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sweetPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sweet Food Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sweet preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Prefers Less Sweet</SelectItem>
                        <SelectItem value="medium">Average Sweetness</SelectItem>
                        <SelectItem value="high">Prefers Very Sweet</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" className="w-full">Save Food Preferences</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CuisinePreferenceForm;
