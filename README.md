# Calculadora de Calificaciones

Una aplicación web moderna para calcular promedios y notas finales ponderadas, desarrollada con React y TypeScript.

## Características

- 🎯 Cálculo de promedios por categoría
- ⚖️ Ponderación automática de notas
- 📊 Tres categorías de evaluación configurables:
  - Actitudinal
  - Procedimental
  - Cognitiva
- ⚡ Configuración dinámica de porcentajes
- 🔄 Ajuste dinámico del número de notas por categoría
- 🧮 Cálculos en tiempo real
- 📱 Diseño responsivo
- 🔄 Botón de reinicio rápido

## Tecnologías Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (iconos)

## Uso

1. **Configurar Porcentajes**
   - Ajusta el porcentaje para cada categoría
   - La suma total no puede exceder el 100%
   - Los porcentajes se reflejan automáticamente en los cálculos

2. **Ajustar Cantidad de Notas**
   - Usa los botones + y - para ajustar el número de notas en cada categoría
   - O ingresa directamente el número deseado (1-20)

3. **Ingresar Calificaciones**
   - Ingresa las notas para cada categoría (rango 0-100)
   - Los cálculos se actualizan automáticamente

4. **Ver Resultados**
   - Los promedios por categoría se muestran en tiempo real
   - Las ponderaciones se calculan según los porcentajes configurados
   - La nota final y el total se actualizan instantáneamente

5. **Reiniciar Cálculos**
   - Usa el botón "Reiniciar" para limpiar todas las notas
   - La cantidad de notas y los porcentajes se mantienen

## Fórmulas de Cálculo

- **Promedio por Categoría**: Suma de notas ÷ Cantidad de notas
- **Ponderación**: Promedio × (Porcentaje configurado ÷ 100)
- **Nota Final**: Suma de todas las ponderaciones

## Validaciones

- Los porcentajes de las categorías deben sumar exactamente 100%
- Las notas individuales deben estar entre 0 y 100
- Cada categoría debe tener al menos una nota
- Máximo 20 notas por categoría

## Licencia

MIT