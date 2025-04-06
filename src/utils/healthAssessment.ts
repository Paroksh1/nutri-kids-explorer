
// Health assessment utility functions

interface HealthData {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';
  activityLevel: string;
  dietaryDiversityScore?: number;
}

interface HealthAssessment {
  bmi: number;
  bmiCategory: string;
  nutritionStatus: string;
  recommendations: string[];
}

// Calculate BMI
export function calculateBMI(weight: number, height: number): number {
  // Height in meters (converted from cm)
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

// Determine BMI category for children
export function getBMICategoryForChild(bmi: number, age: number, gender: 'male' | 'female'): string {
  // Simplified BMI categories for children
  if (age < 5) {
    if (bmi < 14) return 'Underweight';
    else if (bmi >= 14 && bmi < 17) return 'Healthy weight';
    else if (bmi >= 17 && bmi < 18.5) return 'At risk of overweight';
    else return 'Overweight';
  } else if (age < 18) {
    if (bmi < 15) return 'Underweight';
    else if (bmi >= 15 && bmi < 22) return 'Healthy weight';
    else if (bmi >= 22 && bmi < 26) return 'At risk of overweight';
    else return 'Overweight';
  } else {
    // Adult BMI categories
    if (bmi < 18.5) return 'Underweight';
    else if (bmi >= 18.5 && bmi < 25) return 'Healthy weight';
    else if (bmi >= 25 && bmi < 30) return 'Overweight';
    else return 'Obese';
  }
}

// Get nutritional status based on health data
export function getNutritionalStatus(healthData: HealthData): string {
  const { bmiCategory } = assessHealth(healthData);
  
  if (bmiCategory === 'Underweight') {
    return 'At risk of malnutrition';
  } else if (bmiCategory === 'Healthy weight') {
    return 'Good nutritional status';
  } else if (bmiCategory === 'At risk of overweight' || bmiCategory === 'Overweight') {
    return 'At risk of overnutrition';
  } else {
    return 'Requires nutritional evaluation';
  }
}

// Generate health recommendations based on assessment
export function getHealthRecommendations(healthData: HealthData): string[] {
  const { bmiCategory } = assessHealth(healthData);
  const { age, dietaryDiversityScore } = healthData;
  
  const recommendations: string[] = [];
  
  // BMI-based recommendations
  if (bmiCategory === 'Underweight') {
    recommendations.push('Increase calorie intake with nutrient-dense foods');
    recommendations.push('Include protein-rich foods in every meal');
    recommendations.push('Consider nutritional supplements under medical supervision');
  } else if (bmiCategory === 'Healthy weight') {
    recommendations.push('Maintain current eating habits with emphasis on whole foods');
    recommendations.push('Stay physically active for at least 60 minutes daily');
  } else if (bmiCategory === 'At risk of overweight' || bmiCategory === 'Overweight') {
    recommendations.push('Focus on portion control and balanced meals');
    recommendations.push('Reduce intake of sugary drinks and processed foods');
    recommendations.push('Increase physical activity to at least 60-90 minutes daily');
  }
  
  // Age-specific recommendations
  if (age < 5) {
    recommendations.push('Ensure regular growth monitoring every 3-6 months');
    recommendations.push('Provide a variety of foods from all food groups daily');
  } else if (age < 12) {
    recommendations.push('Include calcium-rich foods for bone development');
    recommendations.push('Limit screen time to less than 2 hours per day');
  } else if (age < 18) {
    recommendations.push('Include iron-rich foods for adolescent growth');
    recommendations.push('Ensure adequate sleep of 8-10 hours per night');
  }
  
  // Dietary diversity recommendations
  if (dietaryDiversityScore !== undefined) {
    if (dietaryDiversityScore <= 3) {
      recommendations.push('Increase variety in diet by including foods from more food groups');
      recommendations.push('Include more fruits and vegetables of different colors');
    } else if (dietaryDiversityScore <= 6) {
      recommendations.push('Continue to improve dietary diversity by exploring new foods');
    } else {
      recommendations.push('Maintain excellent dietary diversity');
    }
  }
  
  return recommendations;
}

// Comprehensive health assessment
export function assessHealth(healthData: HealthData): HealthAssessment {
  const { weight, height, age, gender } = healthData;
  
  // Calculate BMI
  const bmi = calculateBMI(weight, height);
  
  // Determine BMI category
  const bmiCategory = getBMICategoryForChild(bmi, age, gender);
  
  // Get nutritional status
  const nutritionStatus = getNutritionalStatus(healthData);
  
  // Generate recommendations
  const recommendations = getHealthRecommendations(healthData);
  
  return {
    bmi,
    bmiCategory,
    nutritionStatus,
    recommendations
  };
}
