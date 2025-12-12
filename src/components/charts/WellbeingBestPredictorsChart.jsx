import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { processBestPredictorsData } from '../../utils/dataProcessing';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WellbeingBestPredictorsChart = ({ data }) => {
  const predictors = useMemo(() => processBestPredictorsData(data), [data]);

  const chartData = {
    labels: predictors.map(d => d.feature),
    datasets: [
      {
        label: 'Positive Impact',
        data: predictors.map(d => d.coefficient),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Top Positive Predictors of Wellbeing',
        color: '#f1f5f9',
        font: { size: 18, weight: 'bold' }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        callbacks: {
          label: (ctx) => `Coefficient: ${ctx.parsed.x.toFixed(3)}`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Correlation Coefficient',
          color: '#cbd5e1',
          font: { weight: 'bold' }
        },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' }
      },
      y: {
        grid: { display: false },
        ticks: { 
          color: '#cbd5e1',
          font: { size: 10 }
        }
      }
    }
  };

  return (
    <div className="w-full h-full min-h-[400px] bg-slate-900/50 rounded-xl border border-indigo-500/20 p-4">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default WellbeingBestPredictorsChart;
