
/**
 * Utility functions for food spelling suggestions
 */

// Calculates Levenshtein distance between two strings
// This helps us find similar words with different spellings
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
}

// Find similar food names from a database based on Levenshtein distance
export function findSimilarFoods(input: string, foodDatabase: string[], threshold: number = 2): string[] {
  // Convert input to lowercase and trim for better matching
  const normalizedInput = input.toLowerCase().trim();
  
  // Don't suggest for very short inputs (less than 3 characters)
  if (normalizedInput.length < 3) {
    return [];
  }
  
  // Calculate distance for each food in database
  const similarities = foodDatabase.map(food => {
    const normalizedFood = food.toLowerCase().trim();
    const distance = levenshteinDistance(normalizedInput, normalizedFood);
    
    // Return food name and its distance from input
    return {
      food,
      distance,
      // Adjust threshold based on word length to account for longer words
      isMatch: distance <= (normalizedInput.length > 5 ? threshold + 1 : threshold)
    };
  });
  
  // Sort by distance (closest match first) and filter those within threshold
  return similarities
    .filter(item => item.isMatch && item.food.toLowerCase() !== normalizedInput)
    .sort((a, b) => a.distance - b.distance)
    .map(item => item.food)
    .slice(0, 3); // Return top 3 suggestions
}

// Normalize food name for better matching (remove spaces, lowercase)
export function normalizeFood(food: string): string {
  return food.toLowerCase().replace(/\s+/g, '');
}

// Check if two food names are the same after normalization
export function isSameFood(food1: string, food2: string): boolean {
  return normalizeFood(food1) === normalizeFood(food2);
}
