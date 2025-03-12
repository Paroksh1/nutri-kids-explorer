
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChildProfile } from '@/components/onboarding/ChildProfileForm';
import { assessChildHealth, getHealthStatusDescription, getFocusDescription } from '@/utils/healthAssessment';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Award, Dumbbell, Utensils } from 'lucide-react';

interface HealthAssessmentCardProps {
  childProfile: ChildProfile;
}

const HealthAssessmentCard: React.FC<HealthAssessmentCardProps> = ({ childProfile }) => {
  const assessment = assessChildHealth(childProfile);

  // Determine BMI color based on status
  const getBmiColor = (status: string) => {
    switch (status) {
      case 'underweight':
        return 'text-yellow-500';
      case 'healthy':
        return 'text-green-500';
      case 'overweight':
        return 'text-orange-500';
      case 'obese':
        return 'text-red-500';
      default:
        return 'text-primary';
    }
  };

  // Determine progress percentage based on BMI
  const getBmiProgressPercentage = (bmi: number) => {
    // Map BMI to a percentage between 0-100
    // This is a simplified approach - in real app we'd use medical charts
    if (bmi < 13) return 10;
    if (bmi > 30) return 90;
    // Map the range 13-30 to 10-90%
    return 10 + ((bmi - 13) / (30 - 13) * 80);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="mr-2 h-6 w-6 text-primary" />
          Health Assessment for {childProfile.name}
        </CardTitle>
        <CardDescription>
          Based on height, weight, age, and gender
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* BMI Display */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">BMI (Body Mass Index)</span>
              <span className={`font-bold ${getBmiColor(assessment.status)}`}>
                {assessment.bmi} - {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
              </span>
            </div>
            <Progress value={getBmiProgressPercentage(assessment.bmi)} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">
              {getHealthStatusDescription(assessment.status)}
            </p>
          </div>

          <Separator />

          {/* Recommended Focus */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-medium">Recommended Focus</h3>
            </div>
            <p className="text-sm ml-7">{getFocusDescription(assessment.recommendedFocus)}</p>
          </div>

          {/* Exercise Recommendation */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Dumbbell className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-medium">Exercise Recommendation</h3>
            </div>
            <p className="text-sm ml-7">{assessment.exerciseRecommendation}</p>
          </div>

          {/* Diet Recommendation */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Utensils className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-medium">Diet Recommendation</h3>
            </div>
            <p className="text-sm ml-7">{assessment.dietRecommendation}</p>
          </div>

          <div className="pt-2 text-xs text-muted-foreground italic">
            Note: This assessment is based on simplified calculations. For personalized medical advice, please consult a healthcare professional.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthAssessmentCard;
