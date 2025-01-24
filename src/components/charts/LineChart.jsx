import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = ({ coinHistory }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (coinHistory?.prices) {
      const labels = coinHistory.prices.map((dataPoint) =>
        new Date(dataPoint[0]).toLocaleDateString()
      );
      const prices = coinHistory.prices.map((dataPoint) => dataPoint[1]);

      setChartData({
        labels,
        datasets: [
          {
            label: "Price",
            data: prices,
            borderColor: "#42A5F5",
            backgroundColor: "rgba(66, 165, 245, 0.2)",
            tension: 0.4,
            pointRadius: 3,
          },
        ],
      });
    }
  }, [coinHistory]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
        },
      },
    },
  };

  return chartData ? (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={chartData} options={options} />
    </div>
  ) : (
    <div>Loading chart...</div>
  );
};

LineChart.propTypes = {
  coinHistory: PropTypes.shape({
    prices: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number) 
    ).isRequired,
  }).isRequired,
};

export default LineChart;


