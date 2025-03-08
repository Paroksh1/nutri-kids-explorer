
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertCircle, Award } from 'lucide-react';

const EducationalSection: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="basics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Nutrition Basics
          </TabsTrigger>
          <TabsTrigger value="needs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Age-Based Needs
          </TabsTrigger>
          <TabsTrigger value="tips" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Healthy Eating Tips
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="basics" className="animate-fade-in-up">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="heading-md">Nutrition Fundamentals for Growth</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="paragraph">
                Children and adolescents have unique nutritional needs that support their rapid growth, development, and overall health. Understanding these basics can help ensure they receive proper nutrition.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-background/60 p-5 rounded-lg">
                  <h3 className="font-semibold mb-3 text-lg">Macronutrients</h3>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    The building blocks of nutrition include carbohydrates for energy, proteins for growth and repair, and fats for brain development and hormone production.
                  </p>
                </div>
                
                <div className="bg-background/60 p-5 rounded-lg">
                  <h3 className="font-semibold mb-3 text-lg">Micronutrients</h3>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    Essential vitamins and minerals like calcium, iron, zinc, and vitamins A, C, D are critical for immune function, bone development, and cognitive growth.
                  </p>
                </div>
                
                <div className="bg-background/60 p-5 rounded-lg">
                  <h3 className="font-semibold mb-3 text-lg">Hydration</h3>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    Proper fluid intake is crucial for regulating body temperature, transporting nutrients, and supporting all bodily functions.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-4 text-lg">Balancing the Plate</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-primary font-semibold">1/4</span>
                    </div>
                    <p className="text-sm font-medium">Proteins</p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 font-semibold">1/4</span>
                    </div>
                    <p className="text-sm font-medium">Whole Grains</p>
                  </div>
                  
                  <div className="text-center p-4 bg-amber-100 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center mx-auto mb-2">
                      <span className="text-amber-600 font-semibold">1/4</span>
                    </div>
                    <p className="text-sm font-medium">Fruits</p>
                  </div>
                  
                  <div className="text-center p-4 bg-emerald-100 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-emerald-200 flex items-center justify-center mx-auto mb-2">
                      <span className="text-emerald-600 font-semibold">1/4</span>
                    </div>
                    <p className="text-sm font-medium">Vegetables</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="needs" className="animate-fade-in-up">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="heading-md">Nutritional Needs by Age</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="paragraph">
                Nutritional requirements change as children grow and develop. Understanding age-specific needs can help you provide the right nutrition at every stage.
              </p>
              
              <div className="space-y-6 mt-6">
                <div className="bg-background/60 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3 text-primary">Toddlers (1-3 years)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 text-sm">
                        <strong>Calories:</strong> ~1,000-1,400 daily, with healthy fats important for brain development
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 text-sm">
                        <strong>Protein:</strong> 13g daily to support rapid growth
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 text-sm">
                        <strong>Calcium:</strong> 700mg daily for developing bones and teeth
                      </span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 text-sm">
                        <strong>Watch for:</strong> Choking hazards, appropriate portion sizes
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-background/60 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3 text-primary">Children (4-8 years)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 text-sm">
                        <strong>Calories:</strong> ~1,200-2,000 daily based on activity level
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 text-sm">
                        <strong>Protein:</strong> 19g daily to support muscle development
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 text-sm">
                        <strong>Calcium:</strong> 1,000mg daily for growing bones
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Award className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 text-sm">
                        <strong>Focus on:</strong> Variety of colorful fruits and vegetables
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-background/60 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3 text-primary">Adolescents (9-18 years)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 text-sm">
                        <strong>Calories:</strong> ~1,600-3,200 daily based on age, gender, and activity
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 text-sm">
                        <strong>Protein:</strong> 34-52g daily for growth spurt support
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 text-sm">
                        <strong>Calcium:</strong> 1,300mg daily for bone density peak development
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 text-sm">
                        <strong>Iron:</strong> 8-15mg daily, with higher needs for adolescent girls
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tips" className="animate-fade-in-up">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="heading-md">Healthy Eating Strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="paragraph">
                Encouraging healthy eating habits early in life sets the foundation for lifelong wellness. Here are practical strategies for nurturing positive relationships with food.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-background/60 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-lg flex items-center">
                    <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">1</span>
                    Make Mealtimes Positive
                  </h3>
                  <ul className="space-y-3 text-foreground/80 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Create a calm, screen-free dining environment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Eat together as a family when possible</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Avoid using food as rewards or punishment</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-background/60 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-lg flex items-center">
                    <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">2</span>
                    Lead by Example
                  </h3>
                  <ul className="space-y-3 text-foreground/80 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Children often mimic adult eating behaviors</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Demonstrate enjoying healthy foods yourself</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Talk positively about nutritious foods</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-background/60 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-lg flex items-center">
                    <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2">3</span>
                    Involve Children
                  </h3>
                  <ul className="space-y-3 text-foreground/80 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Include children in meal planning and preparation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Take them grocery shopping to learn about food choices</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Plant a small garden if possible</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-background/60 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-lg flex items-center">
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">4</span>
                    Be Patient with Picky Eaters
                  </h3>
                  <ul className="space-y-3 text-foreground/80 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Offer new foods multiple times (10+ exposures may be needed)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Serve small portions of new foods alongside favorites</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Respect genuine dislikes while encouraging variety</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-primary/10 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-lg text-center">Balanced Approach to Treats</h3>
                <p className="text-foreground/80 text-sm text-center max-w-2xl mx-auto">
                  Rather than labeling foods as "good" or "bad," focus on balance and moderation. The occasional treat can be part of a healthy diet when the overall pattern is nutritious. This approach helps children develop a healthy relationship with all foods.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationalSection;
