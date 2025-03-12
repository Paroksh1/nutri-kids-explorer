import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Search, Check, Trash } from 'lucide-react';
import { getMealLogs, addMealLog, getFoodDatabase } from './MealService';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
}

interface MealLog {
  id: string;
  childId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: Array<FoodItem & { quantity: number }>;
}

const MealTracker: React.FC<{ childId: string }> = ({ childId }) => {
  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [selectedFoods, setSelectedFoods] = useState<Array<FoodItem & { quantity: number }>>([]);
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [foodDatabase, setFoodDatabase] = useState<FoodItem[]>([]);
  
  useEffect(() => {
    // Load meal logs for the child
    const logs = getMealLogs(childId);
    setMealLogs(logs);
    
    // Get the food database
    setFoodDatabase(getFoodDatabase());
  }, [childId]);
  
  useEffect(() => {
    // Filter food database based on search term
    if (searchTerm.trim() === '') {
      setSearchResults([]);
    } else {
      const results = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm, foodDatabase]);
  
  const handleAddFood = (food: FoodItem) => {
    // Check if food is already added
    if (selectedFoods.some(f => f.id === food.id)) {
      toast.info('This food is already in your meal');
      return;
    }
    
    setSelectedFoods(prev => [...prev, { ...food, quantity: 1 }]);
    setSearchTerm('');
    setSearchResults([]);
  };
  
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setSelectedFoods(prev => 
      prev.map(food => food.id === id ? { ...food, quantity } : food)
    );
  };
  
  const handleRemoveFood = (id: string) => {
    setSelectedFoods(prev => prev.filter(food => food.id !== id));
  };
  
  const handleSaveMeal = () => {
    if (selectedFoods.length === 0) {
      toast.error('Please add at least one food item');
      return;
    }
    
    const newMeal: MealLog = {
      id: Date.now().toString(),
      childId,
      date: new Date().toISOString().split('T')[0],
      mealType: selectedMealType,
      foods: [...selectedFoods]
    };
    
    const success = addMealLog(newMeal);
    
    if (success) {
      toast.success(`${selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)} logged successfully!`);
      setMealLogs(prev => [...prev, newMeal]);
      setSelectedFoods([]);
      setShowAddMeal(false);
    } else {
      toast.error('Failed to log meal. Please try again.');
    }
  };
  
  // Calculate total nutrition for the selected foods
  const totalNutrition = selectedFoods.reduce((acc, food) => {
    return {
      calories: acc.calories + (food.calories * food.quantity),
      protein: acc.protein + (food.protein * food.quantity),
      carbs: acc.carbs + (food.carbs * food.quantity),
      fat: acc.fat + (food.fat * food.quantity)
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Food Tracking</CardTitle>
              <CardDescription>Log meals to track nutritional intake</CardDescription>
            </div>
            {!showAddMeal && (
              <Button onClick={() => setShowAddMeal(true)}>
                <Plus className="mr-2 h-4 w-4" /> Log Meal
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {showAddMeal ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="mealType">Meal Type</Label>
                <Select
                  value={selectedMealType}
                  onValueChange={(value: 'breakfast' | 'lunch' | 'dinner' | 'snack') => setSelectedMealType(value)}
                >
                  <SelectTrigger id="mealType">
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="searchFood">Search Food</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="searchFood"
                    placeholder="Search for foods..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {searchResults.length > 0 && (
                  <div className="border rounded-md mt-1 max-h-60 overflow-y-auto">
                    <ul className="py-1">
                      {searchResults.map(food => (
                        <li 
                          key={food.id} 
                          className="px-3 py-2 hover:bg-accent cursor-pointer flex justify-between items-center"
                          onClick={() => handleAddFood(food)}
                        >
                          <div>
                            <div className="font-medium">{food.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {food.calories} kcal, {food.protein}g protein
                            </div>
                          </div>
                          <Plus className="h-4 w-4" />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Selected Foods</Label>
                {selectedFoods.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-2">No foods selected yet</p>
                ) : (
                  <ul className="border rounded-md divide-y">
                    {selectedFoods.map(food => (
                      <li key={food.id} className="px-3 py-2 flex items-center">
                        <div className="flex-1">
                          <div className="font-medium">{food.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {food.servingSize}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center space-x-1">
                            <Label htmlFor={`quantity-${food.id}`} className="sr-only">Quantity</Label>
                            <Input
                              id={`quantity-${food.id}`}
                              type="number"
                              min="1"
                              className="w-16"
                              value={food.quantity}
                              onChange={(e) => handleUpdateQuantity(food.id, Number(e.target.value))}
                            />
                            <span className="text-sm">×</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFood(food.id)}
                          >
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              {selectedFoods.length > 0 && (
                <div className="bg-accent/30 p-3 rounded-md">
                  <h3 className="font-medium mb-1">Meal Nutrition Summary</h3>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Calories:</span>
                      <span className="ml-1 font-medium">{totalNutrition.calories} kcal</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Protein:</span>
                      <span className="ml-1 font-medium">{totalNutrition.protein}g</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Carbs:</span>
                      <span className="ml-1 font-medium">{totalNutrition.carbs}g</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fat:</span>
                      <span className="ml-1 font-medium">{totalNutrition.fat}g</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddMeal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveMeal}>
                  <Check className="mr-2 h-4 w-4" /> Save Meal
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {mealLogs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No meal logs found for today</p>
                  <Button onClick={() => setShowAddMeal(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Log Your First Meal
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-medium">Today's Meals</h3>
                  
                  {['breakfast', 'lunch', 'dinner', 'snack'].map(mealType => {
                    const meal = mealLogs.find(log => 
                      log.mealType === mealType && 
                      log.date === new Date().toISOString().split('T')[0]
                    );
                    
                    return (
                      <div key={mealType} className="border rounded-md p-3">
                        <h4 className="font-medium capitalize">{mealType}</h4>
                        {meal ? (
                          <div className="mt-2">
                            <ul className="space-y-1.5">
                              {meal.foods.map(food => (
                                <li key={food.id} className="text-sm flex justify-between">
                                  <span>{food.name} × {food.quantity}</span>
                                  <span className="text-muted-foreground">
                                    {food.calories * food.quantity} kcal
                                  </span>
                                </li>
                              ))}
                            </ul>
                            
                            <div className="mt-3 pt-3 border-t text-sm flex justify-between">
                              <span className="font-medium">Total</span>
                              <span>
                                {meal.foods.reduce((acc, food) => acc + (food.calories * food.quantity), 0)} kcal
                              </span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1">No foods logged</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MealTracker;
