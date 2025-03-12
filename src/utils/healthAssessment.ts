
import { ChildProfile } from '@/components/onboarding/ChildProfileForm';

export interface HealthAssessment {
  bmi: number;
  status: 'underweight' | 'healthy' | 'overweight' | 'obese';
  recommendedFocus: 'weight-gain' | 'maintenance' | 'balanced-weight-loss' | 'weight-loss';
  exerciseRecommendation: string;
  dietRecommendation: string;
}

// BMI classification for children is age and gender specific
// This is a simplified version; medical BMI charts are more complex
export const assessChildHealth = (childProfile: ChildProfile): HealthAssessment => {
  // Calculate BMI: weight(kg) / height(m)²
  const heightInMeters = childProfile.height / 100;
  const bmi = childProfile.weight / (heightInMeters * heightInMeters);
  const roundedBmi = Math.round(bmi * 10) / 10; // Round to 1 decimal place
  
  // Define status and recommendations based on BMI
  // Note: These are simplified thresholds. In practice, CDC or WHO growth charts should be used
  let status: HealthAssessment['status'];
  let recommendedFocus: HealthAssessment['recommendedFocus'];
  let exerciseRecommendation: string;
  let dietRecommendation: string;
  
  // Simplified age and gender-specific BMI evaluation
  // Normally this would use precise CDC or WHO growth charts
  if (childProfile.age < 5) {
    // For very young children, criteria are different
    if (bmi < 14) {
      status = 'underweight';
      recommendedFocus = 'weight-gain';
      exerciseRecommendation = 'Light, playful activities focusing on development and coordination';
      dietRecommendation = 'Nutrient-dense foods with healthy fats and proteins to support growth';
    } else if (bmi < 17) {
      status = 'healthy';
      recommendedFocus = 'maintenance';
      exerciseRecommendation = 'Regular play-based activities for motor skill development';
      dietRecommendation = 'Balanced diet with variety of nutrients to support healthy growth';
    } else if (bmi < 18) {
      status = 'overweight';
      recommendedFocus = 'balanced-weight-loss';
      exerciseRecommendation = 'Fun, active play that encourages movement throughout the day';
      dietRecommendation = 'Focus on whole foods, appropriate portions, and reduced sugary foods';
    } else {
      status = 'obese';
      recommendedFocus = 'weight-loss';
      exerciseRecommendation = 'Regular, enjoyable physical activity with family involvement';
      dietRecommendation = 'Nutritionist-guided meal plan focusing on balanced nutrition without restrictions';
    }
  } else if (childProfile.age < 13) {
    // School-age children
    if (bmi < 14.5) {
      status = 'underweight';
      recommendedFocus = 'weight-gain';
      exerciseRecommendation = 'Moderate strength-building activities combined with fun cardio';
      dietRecommendation = 'Increased calories from nutritious sources with adequate protein';
    } else if (bmi < 19) {
      status = 'healthy';
      recommendedFocus = 'maintenance';
      exerciseRecommendation = 'Regular, varied physical activities including team sports and individual skills';
      dietRecommendation = 'Balanced diet with appropriate portions for sustained energy';
    } else if (bmi < 22) {
      status = 'overweight';
      recommendedFocus = 'balanced-weight-loss';
      exerciseRecommendation = 'Daily active play or structured exercise with both cardio and strength elements';
      dietRecommendation = 'Focus on whole foods, mindful eating, and appropriate portions';
    } else {
      status = 'obese';
      recommendedFocus = 'weight-loss';
      exerciseRecommendation = 'Consistent daily activity with a mix of cardio, strength, and flexibility training';
      dietRecommendation = 'Structured meal plan with focus on veggies, lean proteins, and reducing processed foods';
    }
  } else {
    // Teenagers
    if (bmi < 18.5) {
      status = 'underweight';
      recommendedFocus = 'weight-gain';
      exerciseRecommendation = 'Progressive strength training with adequate protein intake and recovery';
      dietRecommendation = 'Increased nutritious calories with protein-rich foods to support muscle development';
    } else if (bmi < 25) {
      status = 'healthy';
      recommendedFocus = 'maintenance';
      exerciseRecommendation = 'Balanced exercise routine with cardio, strength, and flexibility components';
      dietRecommendation = 'Balanced nutrition focusing on whole foods and appropriate macro distribution';
    } else if (bmi < 30) {
      status = 'overweight';
      recommendedFocus = 'balanced-weight-loss';
      exerciseRecommendation = 'Regular cardio with strength training to preserve muscle while losing fat';
      dietRecommendation = 'Moderate calorie deficit from reduced processed foods while maintaining nutrients';
    } else {
      status = 'obese';
      recommendedFocus = 'weight-loss';
      exerciseRecommendation = 'Structured exercise program combining cardio, strength, and lifestyle activity';
      dietRecommendation = 'Supervised nutrition plan with focus on sustainable healthy habits';
    }
  }
  
  return {
    bmi: roundedBmi,
    status,
    recommendedFocus,
    exerciseRecommendation,
    dietRecommendation
  };
};

// Helper function to get user-friendly status descriptions
export const getHealthStatusDescription = (status: HealthAssessment['status']): string => {
  switch (status) {
    case 'underweight':
      return 'Your child appears to be underweight based on BMI calculations.';
    case 'healthy':
      return 'Your child has a healthy weight for their age and height.';
    case 'overweight':
      return 'Your child appears to be overweight based on BMI calculations.';
    case 'obese':
      return 'Your child\'s BMI falls in the obesity range, which may increase health risks.';
    default:
      return '';
  }
};

// Helper function to get focus descriptions
export const getFocusDescription = (focus: HealthAssessment['recommendedFocus']): string => {
  switch (focus) {
    case 'weight-gain':
      return 'Healthy weight gain through nutritious foods and strength-building activities';
    case 'maintenance':
      return 'Maintaining current healthy weight while supporting ongoing development';
    case 'balanced-weight-loss':
      return 'Gradual, balanced approach to reaching a healthier weight';
    case 'weight-loss':
      return 'Supervised approach to healthy weight management';
    default:
      return '';
  }
};
