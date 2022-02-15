import React from 'react';
import {Chart, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Col, Row, Typography } from 'antd';
import { useGetExchangeRateQuery } from '../services/exchangeRateApi';
const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  console.log("CH,CP,CN",coinHistory,currentPrice,coinName)
  const coinPrice = [];
  const coinTimestamp = [];
  const { data: exchangeRate } = useGetExchangeRateQuery();

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price*exchangeRate);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In INR',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: ₹ {new Intl.NumberFormat('en-IN').format(currentPrice)}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;