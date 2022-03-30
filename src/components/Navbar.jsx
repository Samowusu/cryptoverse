import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Icon from "../assets/images/cryptocurrency.png";

function Navbar() {
  const [activeMenuState, setActiveMenuState] = useState(true);
  const [screenSizeState, setScreenSizeState] = useState(null);

  useEffect(() => {
    const handleSize = () => setScreenSizeState(window.innerWidth);

    window.addEventListener("resize", handleSize);

    handleSize();

    return () => window.removeEventListener("resize", handleSize);
  }, []);

  useEffect(() => {
    if (screenSizeState <= 768) {
      setActiveMenuState(false);
    } else {
      setActiveMenuState(true);
    }
  }, [screenSizeState]);

  const toggleMenuHandler = () => {
    setActiveMenuState((prevState) => !prevState);
  };
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={Icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to={"/"}>Cryptoverse</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick={toggleMenuHandler}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenuState && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to={"/"}>Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to={"/cryptocurrencies"}>Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to={"/exchanges"}>Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to={"/news"}>News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
}

export default Navbar;
