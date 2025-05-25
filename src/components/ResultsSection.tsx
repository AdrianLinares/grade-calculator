import React from 'react';
import { GradeResults, GradeCategory, CategoryWeights } from '../types/grades';

interface ResultsSectionProps {
  results: GradeResults;
  weights: CategoryWeights;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, weights }) => {
  const categoryLabels: { [key in GradeCategory]: string } = {
    A: 'Actitudinal',
    P: 'Procedimental',
    C: 'Cognitiva'
  };

  return (
    <div className="mt-8 bg-blue-50 rounded-lg p-5">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">Resultados</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Averages */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-blue-700 mb-3">Promedios por Categoría</h3>
          <div className="space-y-3">
            {Object.entries(categoryLabels).map(([category, label]) => (
              <div key={category} className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-700">{label}:</span>
                <span className="font-medium text-blue-800">
                  {results.averages[category as GradeCategory]}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Weighted Results */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-blue-700 mb-3">Ponderaciones</h3>
          <div className="space-y-3">
            {Object.entries(categoryLabels).map(([category, label]) => (
              <div key={category} className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-700">
                  {label} ({weights[category as GradeCategory]}%):
                </span>
                <span className="font-medium text-blue-800">
                  {results.weighted[category as GradeCategory]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Final Grade */}
      <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-5 text-white shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <span className="text-white/80 mb-1">Nota Final</span>
            <span className="text-3xl font-bold">{results.final}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <span className="text-white/80 mb-1">Total (T)</span>
            <span className="text-3xl font-bold">{results.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;