import React, { useMemo } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { processInequalityCrisisData } from '../../utils/dataProcessing';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InequalityCrisisChart = ({ data }) => {
  const scatterData = useMemo(() => processInequalityCrisisData(data), [data]);

  const chartData = {
    datasets: [
      {
        label: 'Countries',
        data: scatterData,
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgba(239, 68, 68, 1)',
        pointRadius: 6,
        pointHoverRadius: 9
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Inequality Crisis: Gini Index vs Wealth Concentration',
        color: '#f1f5f9',
        font: { size: 18, weight: 'bold' }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        callbacks: {
          label: (ctx) => `${ctx.raw.country}: Gini ${ctx.raw.x.toFixed(1)}, Top 10% Wealth ${ctx.raw.y.toFixed(1)}%`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Gini Index (Inequality)',
          color: '#cbd5e1',
          font: { weight: 'bold' }
        },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' }
      },
      y: {
        title: {
          display: true,
          text: 'Wealth Share of Top 10% (%)',
          color: '#cbd5e1',
          font: { weight: 'bold' }
        },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  return (
    <div className="w-full h-full min-h-[400px] bg-slate-900/50 rounded-xl border border-indigo-500/20 p-4">
      <Scatter data={chartData} options={options} />
    </div>
  );
};

export default InequalityCrisisChart;
