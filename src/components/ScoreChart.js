

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ScoreChart = ({ data }) => {
  const labels = data.map((_, i) => `Resume ${i+1}`);
  return (
    <Bar
      data={{
        labels,
        datasets: [{ label: 'Score', data, backgroundColor: 'rgba(54,162,235,0.6)' }]
      }}
      options={{
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }}
    />
  );
};

export default ScoreChart;
