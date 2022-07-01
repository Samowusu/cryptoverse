import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link, NavLink } from "react-router-dom";
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
    if (screenSizeState <= 800) {
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
          <NavLink to={"/"}>Cryptoverse</NavLink>
        </Typography.Title>
        <Button className="menu-control-container" onClick={toggleMenuHandler}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenuState && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />} key={"item-1"}>
            <NavLink to={"/"}>Home</NavLink>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />} key={"item-2"}>
            <NavLink to={"/cryptocurrencies"}>Cryptocurrencies</NavLink>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />} key={"item-3"}>
            <NavLink to={"/exchanges"}>Exchanges</NavLink>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />} key={"item-4"}>
            <NavLink to={"/news"}>News</NavLink>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
}

export default Navbar;
