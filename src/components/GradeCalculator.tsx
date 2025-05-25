import React, { useState, useEffect } from 'react';
import GradeInput from './GradeInput';
import GradeTable from './GradeTable';
import ResultsSection from './ResultsSection';
import { calculateResults } from '../utils/calculations';
import { GradeCategory, GradeCounts, CategoryWeights, GradeResults } from '../types/grades';
import { RotateCcw } from 'lucide-react';

const GradeCalculator: React.FC = () => {
  const initialGradeCounts: GradeCounts = {
    A: 3,
    P: 3,
    C: 3
  };

  const initialWeights: CategoryWeights = {
    A: 10,
    P: 40,
    C: 50
  };

  const [gradeCounts, setGradeCounts] = useState<GradeCounts>(initialGradeCounts);
  const [weights, setWeights] = useState<CategoryWeights>(initialWeights);
  
  const [grades, setGrades] = useState<{
    [key in GradeCategory]: number[];
  }>({
    A: Array(3).fill(''),
    P: Array(3).fill(''),
    C: Array(3).fill('')
  });
  
  const [results, setResults] = useState<GradeResults>({
    averages: { A: 0, P: 0, C: 0 },
    weighted: { A: 0, P: 0, C: 0 },
    final: 0,
    total: 0
  });

  useEffect(() => {
    setResults(calculateResults(grades, weights));
  }, [grades, weights]);

  const handleCountChange = (category: GradeCategory, newCount: number) => {
    setGradeCounts(prev => ({
      ...prev,
      [category]: newCount
    }));
    
    setGrades(prev => ({
      ...prev,
      [category]: resizeArray(prev[category], newCount)
    }));
  };

  const handleWeightChange = (category: GradeCategory, newWeight: number) => {
    setWeights(prev => ({
      ...prev,
      [category]: newWeight
    }));
  };

  const resizeArray = (array: number[], newSize: number): number[] => {
    if (newSize < array.length) {
      return array.slice(0, newSize);
    } else {
      return [...array, ...Array(newSize - array.length).fill('')];
    }
  };

  const handleGradeChange = (category: GradeCategory, index: number, value: string) => {
    const numValue = value === '' ? '' : Number(value);
    
    setGrades(prev => {
      const newGrades = { ...prev };
      newGrades[category] = [...prev[category]];
      newGrades[category][index] = numValue;
      return newGrades;
    });
  };

  const handleReset = () => {
    // Create empty arrays with current lengths
    setGrades({
      A: Array(gradeCounts.A).fill(''),
      P: Array(gradeCounts.P).fill(''),
      C: Array(gradeCounts.C).fill('')
    });
    setResults({
      averages: { A: 0, P: 0, C: 0 },
      weighted: { A: 0, P: 0, C: 0 },
      final: 0,
      total: 0
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300">
      <h2 className="text-lg font-semibold text-blue-800 mb-6">Calculadora de Calificaciones</h2>
      
      <GradeInput 
        gradeCounts={gradeCounts}
        weights={weights}
        onCountChange={handleCountChange}
        onWeightChange={handleWeightChange}
      />
      
      <button
        onClick={handleReset}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 mb-6 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
      >
        <RotateCcw className="h-4 w-4" />
        <span>Reiniciar</span>
      </button>
      
      <GradeTable
        gradeCounts={gradeCounts}
        grades={grades}
        weights={weights}
        onGradeChange={handleGradeChange}
      />
      
      <ResultsSection results={results} weights={weights} />
    </div>
  );
};

export default GradeCalculator;