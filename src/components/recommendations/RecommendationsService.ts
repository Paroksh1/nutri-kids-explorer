
// Recommendations service for generating health and nutrition recommendations

interface UserProfile {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
}

interface DietaryData {
  dietaryDiversityScore: number;
  foodGroups: any[];
}

// Generate personalized recommendations based on user profile and health data
export async function generateRecommendations(
  userProfile: UserProfile,
  dietaryData?: DietaryData
): Promise<string[]> {
  // Basic recommendations that apply to everyone
  const baseRecommendations = [
    "Stay hydrated by drinking water throughout the day",
    "Include a variety of fruits and vegetables in your diet",
    "Limit processed foods and added sugars",
    "Get regular physical activity appropriate for your age",
    "Ensure adequate sleep for optimal growth and development"
  ];
  
  const personalizedRecommendations: string[] = [];
  
  // Add age-specific recommendations
  if (userProfile.age < 5) {
    personalizedRecommendations.push("Children under 5 need foods rich in essential nutrients for growth");
    personalizedRecommendations.push("Regular growth monitoring is important at this stage");
  } else if (userProfile.age < 12) {
    personalizedRecommendations.push("School-age children need calcium-rich foods for bone development");
    personalizedRecommendations.push("Limit screen time to less than 2 hours per day");
  } else if (userProfile.age < 18) {
    personalizedRecommendations.push("Adolescents need extra iron and protein for growth spurts");
    personalizedRecommendations.push("Include healthy snacks between meals to meet increased energy needs");
  }
  
  // Add gender-specific recommendations
  if (userProfile.gender === 'female' && userProfile.age > 10) {
    personalizedRecommendations.push("Include iron-rich foods to prevent anemia");
  }
  
  // Add BMI-based recommendations
  const bmi = calculateBMI(userProfile.weight, userProfile.height);
  
  if (bmi < 18.5) {
    personalizedRecommendations.push("Focus on nutrient-dense foods to reach a healthy weight");
    personalizedRecommendations.push("Include protein in all meals to support growth");
  } else if (bmi >= 25) {
    personalizedRecommendations.push("Emphasize portion control and balanced meals");
    personalizedRecommendations.push("Increase physical activity to at least 60 minutes daily");
  }
  
  // Add dietary diversity recommendations if available
  if (dietaryData) {
    if (dietaryData.dietaryDiversityScore < 4) {
      personalizedRecommendations.push("Try to include more variety in your diet");
      personalizedRecommendations.push("Aim to eat from at least 5 different food groups daily");
    } else if (dietaryData.dietaryDiversityScore < 7) {
      personalizedRecommendations.push("Your diet has good variety - try adding more items from food groups you eat less often");
    } else {
      personalizedRecommendations.push("Great job maintaining a diverse diet! Keep up the good work!");
    }
    
    // Check if missing any important food groups
    const consumedGroups = dietaryData.foodGroups.filter(group => group.value).map(group => group.id);
    
    if (!consumedGroups.includes(3) && !consumedGroups.includes(4)) {
      personalizedRecommendations.push("Include more dark green leafy vegetables in your diet");
    }
    
    if (!consumedGroups.includes(12)) {
      personalizedRecommendations.push("Add more legumes, nuts and seeds to your meals for plant-based protein");
    }
  }
  
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...baseRecommendations, ...personalizedRecommendations]);
    }, 500);
  });
}

// Helper function to calculate BMI
function calculateBMI(weight: number, height: number): number {
  // Height in meters (converted from cm)
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

// Get general recommendations by age group
export function getGeneralRecommendations(age: number): string[] {
  if (age < 2) {
    return [
      "Exclusive breastfeeding for first 6 months",
      "Introduce complementary foods after 6 months while continuing breastfeeding",
      "Offer a variety of foods to develop taste preferences",
      "Avoid added sugar and salt in infant foods",
      "Ensure adequate iron intake from 6 months onwards"
    ];
  } else if (age < 5) {
    return [
      "Provide 3 meals and 2-3 snacks daily",
      "Include foods from all food groups daily",
      "Limit juice to 4-6 ounces per day",
      "Encourage self-feeding to develop motor skills",
      "Make family meals a priority"
    ];
  } else if (age < 12) {
    return [
      "Ensure regular meal times with healthy snacks between meals",
      "Include calcium-rich foods for bone development",
      "Promote physical activity for at least 60 minutes daily",
      "Limit screen time to less than 2 hours per day",
      "Teach basic nutrition concepts"
    ];
  } else {
    return [
      "Meet increased caloric needs during growth spurts",
      "Include iron-rich foods to support development",
      "Provide 3 nutrient-dense meals with healthy snacks",
      "Encourage participation in meal planning and preparation",
      "Promote regular physical activity and adequate sleep"
    ];
  }
}
