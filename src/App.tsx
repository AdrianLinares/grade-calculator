import React from 'react';
import GradeCalculator from './components/GradeCalculator';
import { BookOpen } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-blue-800">Calculadora de Calificaciones</h1>
        </div>
        <p className="text-slate-600">Calcula promedios y notas finales ponderadas con precisión</p>
      </header>
      
      <main className="w-full max-w-4xl">
        <GradeCalculator />
      </main>
      
      <footer className="mt-12 text-center text-sm text-slate-500">
        <p>© 2025 Calculadora de Calificaciones</p>
      </footer>
    </div>
  );
}

export default App;