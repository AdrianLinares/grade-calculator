export type GradeCategory = 'A' | 'P' | 'C';

export interface GradeCounts {
  [key in GradeCategory]: number;
}

export interface CategoryWeights {
  [key in GradeCategory]: number;
}

export interface GradeResults {
  averages: {
    [key in GradeCategory]: number;
  };
  weighted: {
    [key in GradeCategory]: number;
  };
  final: number;
  total: number;
}