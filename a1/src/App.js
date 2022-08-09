import React from 'react';
import 'antd/dist/antd.css';
import './App.css';

import Home from './pages/Home.js';
import Post from './pages/Post.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Profile from './pages/Profile.js';

import {Avatar, Button, Col, Menu, Row} from "antd";
import Logo from "./assets/logo.svg";
import {HomeOutlined, LoginOutlined, LogoutOutlined, PicRightOutlined, UserOutlined} from "@ant-design/icons";
import {BrowserRouter, NavLink, Routes, Route, Link} from 'react-router-dom';

let activeClassName = "link-active";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Row className="header">
            <Col span={6}>
                <img className="logo" src={Logo} width={150} alt={"Logo"}></img>
            </Col>

            <Col span={10} style={{marginTop: "10px"}}>
                <Menu mode="horizontal">
                    <NavLink to="" className={({ isActive }) => isActive && activeClassName} >
                        <Menu.Item icon={<HomeOutlined />}>Home</Menu.Item>
                    </NavLink>
                    <NavLink to="post" className={({ isActive }) => isActive && activeClassName}>
                        <Menu.Item icon={<PicRightOutlined />}>Post</Menu.Item>
                    </NavLink>
                    <NavLink to="login" className={({ isActive }) => isActive && activeClassName}>
                        <Menu.Item icon={<UserOutlined />}>Account</Menu.Item>
                    </NavLink>
                    <NavLink to="profile" className={({ isActive }) => isActive && activeClassName}>
                        <Menu.Item icon={<UserOutlined />}>profile_test</Menu.Item>
                    </NavLink>
                </Menu>
            </Col>
            <Col span={8} className="right-menu">
                {/*TODO: hide this when user is not login
                         then put username and avatar*/}
                <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" className={"postAvatar"} size="default">
                    Peter
                </Avatar>
                <span style={{marginLeft: '10px', color: '#494949'}}>Peter Liu</span>

                {/*TODO: hide this when user is login*/}
                <NavLink to="login">
                    <Button style={{marginLeft: '20px'}} type="primary" shape="" icon={<LoginOutlined />} size={'default'}>
                        Login
                    </Button>
                </NavLink>

                {/*TODO: hide this when user is not login*/}
                <Button style={{marginLeft: '20px'}} type="primary" shape="" icon={<LogoutOutlined />} size={'default'}>
                    Logout
                </Button>
            </Col>
        </Row>


        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="post" element={<Post/>} />
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<Signup/>} />
            <Route path="profile" element={<Profile/>} />

        </Routes>

        <Row className="footer">
            <Col span={24} style={{}}>
                Loop Agile © 2022 Created by Frocen & Peter
            </Col>
        </Row>
        </BrowserRouter>

    </div>
  );
}

export default App;
