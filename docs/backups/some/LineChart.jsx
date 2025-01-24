import { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import PropTypes from 'prop-types';

const LineChart = ({ coinHistory }) => {
  const [chartData, setChartData] = useState([["Date", "Price"]]);

  useEffect(() => {
    let chartDataCopy = [["Date", "Price"]];
    if (coinHistory && coinHistory.prices) {
      coinHistory.prices.forEach((chart) => {
        chartDataCopy.push([new Date(chart[0]).toLocaleDateString().slice(0, -5), chart[1]]);
      });
      setChartData(chartDataCopy);
    }
  }, [coinHistory]);

  return (
    <Chart
      chartType="LineChart"
      chartData={chartData}
      height="400px" 
       options={{
        title: 'Price History',
        curveType: 'function',
        legend: { position: 'bottom' },
      }} 
    />
  );
};

LineChart.propTypes = {
  coinHistory: PropTypes.shape({
    prices: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      )
    ),
  }).isRequired,
};

export default LineChart;


