
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MealTracker: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Meal Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This feature is currently under development and will be available soon.
        </p>
      </CardContent>
    </Card>
  );
};

export default MealTracker;
