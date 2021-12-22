import React from 'react';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetExchangeRateQuery } from '../services/exchangeRateApi';
import {Cryptocurrencies,News} from '../components'
import Loader from './Loader';


const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const { data: exchangeRate } = useGetExchangeRateQuery();
  const globalStats = data?.data?.stats;

  console.log("Exchage r=",exchangeRate)
  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="opensans">Global Crypto Statistics</Title>
      <Row gutter={[32, 32]}>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={new Intl.NumberFormat('en-IN', {notation: "compact",maximumFractionDigits: 1}).format(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap:" value={`₹${new Intl.NumberFormat('en-IN', {notation: "compact",maximumFractionDigits: 1}).format(globalStats.totalMarketCap*exchangeRate)}`} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={`₹${new Intl.NumberFormat('en-IN', {notation: "compact",maximumFractionDigits: 1}).format(globalStats.total24hVolume*exchangeRate)}`} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={new Intl.NumberFormat('en-IN', {notation: "compact",maximumFractionDigits: 1}).format(globalStats.totalMarkets)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="opensans">Top 10 Cryptos In The World</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="opensans">Latest Crypto News</Title>
        <Title level={3}><Link to="/news">Show More</Link></Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;