import { Col, Row, Input, Space, Button} from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, MailOutlined } from '@ant-design/icons';

import AccountPageBg from "../assets/account-page-bg.svg";
import Logo from '../assets/logo.svg'

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {Link} from "react-router-dom";
import { createUsers } from "../data/repository";



const Signup = () =>{
  const [fields, setFields] = useState({ username: "", password: "" });
  //const [errorMessage, setErrorMessage] = useState(null);
  //const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    createUsers(fields.username,fields.password);

    // Set error message.
    //setErrorMessage("Username and / or password invalid, please try again.");
  }
  // Generic change handler.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // Copy fields.
    const temp = { username: fields.username, password: fields.password };
    // Update field and state.
    temp[name] = value;
    setFields(temp);
  }
  return(
    <Row style={{height: 'calc(100vh - 120px)'}}>
        <Col className={"login-page login-page-left"} span={12} style={{}}>
            <img src={Logo} width={300} style={{paddingBottom: "20px"}} alt="Logo"></img>
            <img src={AccountPageBg} width={400} alt="AccountPageBg"></img>
        </Col>
        <Col className={"login-page login-page-right"} span={12} style={{}}>
            <form id={"login-form"}>
                <h1><strong>Sign up to LAN</strong></h1>

                <p>Username</p>
                <Input size="large" name="username" onChange={handleInputChange} placeholder="Input username" prefix={<UserOutlined />} />
                <br />
                <br />

                <p>Email</p>
                <Input size="large" placeholder="Input email" prefix={<MailOutlined />} />
                <br />
                <br />

                <p>Password</p>
                <Space direction="vertical" style={{width: "100%"}}>
                    <Input.Password
                        name="password"
                        onChange={handleInputChange}
                        size="large"
                        placeholder="Input password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        prefix={<LockOutlined />}
                    />
                </Space>
                <br />
                <br />
                <br />

                <Button type="primary" size={"default"}onClick={handleSubmit}>Sign up</Button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;or
                    <Link className={"link"} to="/login" state={"From Contact Page"}>&nbsp;Login</Link>
                </span>
            </form>
        </Col>
    </Row>);
}


export default Signup;