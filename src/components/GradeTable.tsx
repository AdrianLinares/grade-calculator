import React from 'react';
import { GradeCategory, GradeCounts, CategoryWeights } from '../types/grades';
import { AlertCircle } from 'lucide-react';

interface GradeTableProps {
  gradeCounts: GradeCounts;
  grades: {
    [key in GradeCategory]: number[];
  };
  weights: CategoryWeights;
  onGradeChange: (category: GradeCategory, index: number, value: string) => void;
}

const categoryLabels: { [key in GradeCategory]: string } = {
  A: 'Actitudinal',
  P: 'Procedimental',
  C: 'Cognitiva'
};

const GradeTable: React.FC<GradeTableProps> = ({ 
  gradeCounts, 
  grades,
  weights, 
  onGradeChange 
}) => {
  const validateGrade = (value: string): boolean => {
    if (value === '') return true;
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
  };

  const handleInputChange = (category: GradeCategory, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (validateGrade(value) && /^\d*\.?\d*$/.test(value))) {
      onGradeChange(category, index, value);
    }
  };

  const maxGradeCount = Math.max(...Object.values(gradeCounts));

  return (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-blue-100">
            <th className="py-3 px-4 text-left font-semibold text-blue-800 rounded-tl-lg">Categoría</th>
            {Array.from({ length: maxGradeCount }).map((_, index) => (
              <th key={index} className="py-3 px-4 text-center font-semibold text-blue-800">
                N{index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(categoryLabels).map(([category, label]) => (
            <tr key={category} className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
              <td className="py-3 px-4 font-medium text-blue-700">
                {label} ({weights[category as GradeCategory]}%)
              </td>
              {Array.from({ length: maxGradeCount }).map((_, index) => {
                if (index >= gradeCounts[category as GradeCategory]) {
                  return <td key={index} className="py-2 px-2 bg-gray-50"></td>;
                }

                const value = grades[category as GradeCategory][index];
                const isValid = validateGrade(String(value));
                
                return (
                  <td key={index} className="py-2 px-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={value === '' ? '' : value}
                        onChange={(e) => handleInputChange(category as GradeCategory, index, e)}
                        className={`w-full py-2 px-3 text-center border rounded-md transition-colors
                          ${!isValid ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'} 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                        placeholder="0-100"
                      />
                      {!isValid && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeTable;