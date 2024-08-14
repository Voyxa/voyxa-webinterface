import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Chart = () => {
  const data = {
    labels: [
      '13-07-24', '14-07-24', '15-07-24', '16-07-24', '17-07-24', '18-07-24', '19-07-24',
      '20-07-24', '21-07-24', '22-07-24', '23-07-24', '24-07-24', '25-07-24', '26-07-24',
      '27-07-24', '28-07-24', '29-07-24', '30-07-24', '31-07-24', '01-08-24', '02-08-24',
      '03-08-24', '04-08-24', '05-08-24', '06-08-24', '07-08-24', '08-08-24', '09-08-24',
      '10-08-24', '11-08-24'
    ],
    datasets: [
      {
        label: 'Calls',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        fill: false,
        borderColor: '#4F46E5',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow p-6 mt-6">
      <Line data={data} />
    </div>
  );
};

export default Chart;
