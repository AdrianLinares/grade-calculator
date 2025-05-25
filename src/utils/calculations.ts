import { GradeCategory, GradeResults, CategoryWeights } from '../types/grades';

/**
 * Calculate average for an array of grades, ignoring empty values
 */
export const calculateAverage = (grades: (number | string)[]): number => {
  // Filter out empty values and convert to numbers
  const validGrades = grades
    .filter(grade => grade !== '')
    .map(grade => Number(grade));
  
  if (validGrades.length === 0) return 0;
  
  // Calculate the sum and divide by the number of valid grades
  const sum = validGrades.reduce((acc, grade) => acc + grade, 0);
  return Math.round(sum / validGrades.length);
};

/**
 * Calculate weighted value based on category average and weight
 */
export const calculateWeighted = (average: number, weight: number): number => {
  return Math.round(average * (weight / 100));
};

/**
 * Calculate all results based on current grades and weights
 */
export const calculateResults = (
  grades: { [key in GradeCategory]: (number | string)[] },
  weights: CategoryWeights
): GradeResults => {
  // Calculate averages for each category
  const averages = {
    A: calculateAverage(grades.A),
    P: calculateAverage(grades.P),
    C: calculateAverage(grades.C)
  };
  
  // Calculate weighted values
  const weighted = {
    A: calculateWeighted(averages.A, weights.A),
    P: calculateWeighted(averages.P, weights.P),
    C: calculateWeighted(averages.C, weights.C)
  };
  
  // Calculate final grade (sum of weighted values)
  const final = Math.round(weighted.A + weighted.P + weighted.C);
  
  // Calculate total (same as final in this case)
  const total = final;
  
  return {
    averages,
    weighted,
    final,
    total
  };
};