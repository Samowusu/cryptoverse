import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptosState, setCryptosState] = useState([]);
  const [searchTermState, setSearchTermState] = useState("");

  useEffect(() => {
    const filteredCryptos = cryptosList?.data?.coins.filter((currency) =>
      currency.name.toLowerCase().includes(searchTermState.toLowerCase())
    );
    setCryptosState(filteredCryptos);
  }, [searchTermState, cryptosList]);

  if (isFetching) return <Loader />;

  const searchHandler = (event) => {
    setSearchTermState(event.target.value);
  };

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" onChange={searchHandler} />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptosState?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            key={currency.uuid}
            className="crypto-card"
          >
            <Link to={`/cryptocurrencies/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price : {millify(currency.price)}</p>
                <p>Market Cap : {millify(currency.marketCap)}</p>
                <p>Daily Change : {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
