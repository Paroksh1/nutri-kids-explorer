
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Apple, Brain, GraduationCap, Heart, InfoIcon } from 'lucide-react';

interface NutritionFact {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: string;
  tooltip?: string;
}

const NutritionFacts: React.FC = () => {
  const funFacts: NutritionFact[] = [
    {
      id: 'fact1',
      icon: <Apple className="h-8 w-8 text-green-500" />,
      title: "Colorful Plate Power",
      content: "Eating fruits and vegetables of different colors gives you different vitamins and minerals. Try to make your plate as colorful as a rainbow!",
      tooltip: "Different colored foods contain different phytonutrients"
    },
    {
      id: 'fact2',
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      title: "Brain Food Magic",
      content: "Foods like fish, eggs, and nuts have special nutrients that help your brain work better so you can do well in school!",
      tooltip: "Omega-3 fatty acids support cognitive development"
    },
    {
      id: 'fact3',
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Strong Bones Secret",
      content: "Drinking milk and eating yogurt gives your bones calcium to grow strong. That means you can run faster and jump higher!",
      tooltip: "Calcium and vitamin D support bone development"
    },
    {
      id: 'fact4',
      icon: <GraduationCap className="h-8 w-8 text-blue-500" />,
      title: "Water Wonder",
      content: "Your body is more than half water! Drinking plenty of water helps you think clearly, keeps your skin healthy, and gives you energy to play.",
      tooltip: "Children should drink 5-8 cups of water daily"
    }
  ];
  
  const nutritionQuizzes = [
    {
      question: "What color group gives you vitamin C to keep you from getting sick?",
      options: ["Red and orange foods", "Green and white foods", "Blue and purple foods"],
      answer: 0,
      explanation: "Red and orange foods like oranges, strawberries, and red peppers are high in vitamin C!"
    },
    {
      question: "Which food helps make your muscles strong?",
      options: ["Candy", "Chicken", "Cookies"],
      answer: 1,
      explanation: "Protein foods like chicken, fish, beans, and eggs help build strong muscles."
    },
    {
      question: "How many cups of fruits and vegetables should kids eat every day?",
      options: ["1 cup", "2-3 cups", "5 or more cups"],
      answer: 1,
      explanation: "Most children should eat about 2-3 cups of fruits and vegetables every day."
    }
  ];
  
  const [quizResults, setQuizResults] = React.useState<{[key: number]: number | null}>({});
  
  const handleQuizAnswer = (quizIndex: number, answerIndex: number) => {
    setQuizResults(prev => ({
      ...prev,
      [quizIndex]: answerIndex
    }));
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto glass-panel">
      <CardHeader>
        <CardTitle className="text-2xl font-heading text-center">Fun Nutrition Facts</CardTitle>
        <CardDescription className="text-center">
          Learn about healthy eating with these fun facts and quizzes!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="facts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="facts">Fun Facts</TabsTrigger>
            <TabsTrigger value="quiz">Nutrition Quiz</TabsTrigger>
          </TabsList>
          
          <TabsContent value="facts" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TooltipProvider>
                {funFacts.map((fact) => (
                  <Card key={fact.id} className="bg-background/50 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {fact.icon}
                          <CardTitle className="text-lg">{fact.title}</CardTitle>
                        </div>
                        
                        {fact.tooltip && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{fact.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{fact.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </TooltipProvider>
            </div>
          </TabsContent>
          
          <TabsContent value="quiz" className="pt-4">
            <div className="space-y-6">
              {nutritionQuizzes.map((quiz, index) => (
                <Card key={index} className="bg-background/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{quiz.question}</p>
                    <div className="space-y-2">
                      {quiz.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          className={`w-full text-left p-3 rounded-md border ${
                            quizResults[index] === optionIndex
                              ? optionIndex === quiz.answer
                                ? "bg-green-100 border-green-500 dark:bg-green-900/30"
                                : "bg-red-100 border-red-500 dark:bg-red-900/30"
                              : "bg-background border-border hover:bg-muted/50"
                          }`}
                          onClick={() => handleQuizAnswer(index, optionIndex)}
                          disabled={quizResults[index] !== undefined}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    {quizResults[index] !== undefined && (
                      <div className={`mt-3 p-3 rounded-md ${
                        quizResults[index] === quiz.answer
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                      }`}>
                        {quizResults[index] === quiz.answer ? "Correct! " : "Not quite. "}
                        {quiz.explanation}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NutritionFacts;
