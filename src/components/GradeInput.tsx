import React from 'react';
import { MinusCircle, PlusCircle, Percent } from 'lucide-react';
import { GradeCategory, GradeCounts, CategoryWeights } from '../types/grades';

interface GradeInputProps {
  gradeCounts: GradeCounts;
  weights: CategoryWeights;
  onCountChange: (category: GradeCategory, count: number) => void;
  onWeightChange: (category: GradeCategory, weight: number) => void;
}

const categoryLabels: { [key in GradeCategory]: string } = {
  A: 'Actitudinal',
  P: 'Procedimental',
  C: 'Cognitiva'
};

const GradeInput: React.FC<GradeInputProps> = ({ 
  gradeCounts, 
  weights,
  onCountChange,
  onWeightChange
}) => {
  const handleDecrease = (category: GradeCategory) => {
    if (gradeCounts[category] > 1) {
      onCountChange(category, gradeCounts[category] - 1);
    }
  };

  const handleIncrease = (category: GradeCategory) => {
    if (gradeCounts[category] < 20) {
      onCountChange(category, gradeCounts[category] + 1);
    }
  };

  const handleCountChange = (category: GradeCategory, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 20) {
      onCountChange(category, value);
    }
  };

  const handleWeightChange = (category: GradeCategory, e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = parseInt(e.target.value);
    if (isNaN(newWeight)) return;

    // Calculate total weight excluding current category
    const totalOtherWeights = Object.entries(weights)
      .filter(([key]) => key !== category)
      .reduce((sum, [, weight]) => sum + weight, 0);

    // Only update if new total weight doesn't exceed 100%
    if (totalOtherWeights + newWeight <= 100) {
      onWeightChange(category, newWeight);
    }
  };

  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);

  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
      <h2 className="text-lg font-semibold text-blue-800 mb-3">Configuración de Categorías</h2>
      
      <div className="space-y-4">
        {Object.entries(categoryLabels).map(([category, label]) => (
          <div key={category} className="bg-white p-4 rounded-lg shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-blue-700 font-medium">{label}</span>
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-blue-600" />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weights[category as GradeCategory]}
                  onChange={(e) => handleWeightChange(category as GradeCategory, e)}
                  className="w-20 text-center p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0-100"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cantidad de notas:</span>
              <div className="flex items-center">
                <button 
                  onClick={() => handleDecrease(category as GradeCategory)}
                  className="p-2 text-blue-700 hover:text-blue-900 transition-colors"
                  aria-label={`Disminuir número de calificaciones para ${label}`}
                  disabled={gradeCounts[category as GradeCategory] <= 1}
                >
                  <MinusCircle className={`h-5 w-5 ${gradeCounts[category as GradeCategory] <= 1 ? 'opacity-50' : ''}`} />
                </button>
                
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={gradeCounts[category as GradeCategory]}
                  onChange={(e) => handleCountChange(category as GradeCategory, e)}
                  className="mx-3 w-16 text-center p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Número de calificaciones para ${label}`}
                />
                
                <button 
                  onClick={() => handleIncrease(category as GradeCategory)}
                  className="p-2 text-blue-700 hover:text-blue-900 transition-colors"
                  aria-label={`Aumentar número de calificaciones para ${label}`}
                  disabled={gradeCounts[category as GradeCategory] >= 20}
                >
                  <PlusCircle className={`h-5 w-5 ${gradeCounts[category as GradeCategory] >= 20 ? 'opacity-50' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-between px-4 py-2 bg-blue-600 rounded-lg text-white">
        <span>Peso total:</span>
        <span className="font-bold">{totalWeight}%</span>
      </div>
    </div>
  );
};

export default GradeInput