import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const apiUrl = 'http://localhost:3000/api/sp500';

const SP500Chart = () => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          const obsLabels = response.data.observations.map((obs) => obs.date);
          const obsValues = response.data.observations.map((obs) => obs.value);

          setLabels(obsLabels);
          setValues(obsValues);
        } else {
          console.error('Server responded with an error:', response.statusText);
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []); // Empty dependency array means this effect will run once on component mount

  return (
    <div>
      <h1>Data Chart</h1>
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: 'S&P 500',
              data: values,
              backgroundColor: [
                'rgba(53, 21, 412, 0.2)',
                'rgba(151, 241, 231, 0.2)'
              ]
            }
          ]
        }}
      />
    </div>
  );
};

export default SP500Chart;
