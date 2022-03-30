import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";

function Homepage() {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Typography.Title level={2} className="heading">
        Global Crypto Stats
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(globalStats?.total)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats?.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats?.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats?.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats?.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Typography.Title className="home-title" level={2}>
          Top 10 Cryptocurrencies in the world
        </Typography.Title>
        <Typography.Title className="show-more" level={3}>
          <Link to={"/cryptocurrencies"}>Show more</Link>
        </Typography.Title>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="home-heading-container">
        <Typography.Title className="home-title" level={2}>
          Latest Crypto News
        </Typography.Title>
        <Typography.Title className="show-more" level={3}>
          <Link to={"/news"}>Show more</Link>
        </Typography.Title>
      </div>
      <News simplified={true} />
    </>
  );
}

export default Homepage;
