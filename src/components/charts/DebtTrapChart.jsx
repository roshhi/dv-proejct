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
import { processDebtTrapData } from '../../utils/dataProcessing';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DebtTrapChart = ({ data }) => {
  const scatterData = useMemo(() => processDebtTrapData(data), [data]);

  const chartData = {
    datasets: [
      {
        label: 'Countries',
        data: scatterData,
        backgroundColor: 'rgba(245, 158, 11, 0.6)',
        borderColor: 'rgba(245, 158, 11, 1)',
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
        text: 'Debt Trap: Household Debt vs Economic Output',
        color: '#f1f5f9',
        font: { size: 18, weight: 'bold' }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        callbacks: {
          label: (ctx) => `${ctx.raw.country}: Debt ${ctx.raw.x.toFixed(1)}%, GDP $${Math.round(ctx.raw.y).toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Household Debt to Income (%)',
          color: '#cbd5e1',
          font: { weight: 'bold' }
        },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' }
      },
      y: {
        title: {
          display: true,
          text: 'GDP Per Capita ($)',
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

export default DebtTrapChart;
