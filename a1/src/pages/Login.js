import {Col, Row, Input, Space, Button} from 'antd';
import {UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';

import AccountPageBg from "../assets/account-page-bg.svg";
import Logo from '../assets/logo.svg'

import React from 'react';
import {Link} from "react-router-dom";

// TODO: spec pa.b redirect when user are logged
const Login = () => {
    return (<Row style={{height: 'calc(100vh - 120px)'}}>
        <Col className={"login-page login-page-left"} span={12} style={{}}>
            <img src={Logo} width={300} style={{paddingBottom: "20px"}} alt={"Logo"}></img>
            <img src={AccountPageBg} width={400} alt={"background"}></img>
        </Col>
        <Col className={"login-page login-page-right"} span={12} style={{}}>
            <form id={"login-form"}>
                <h1><strong>Login to LAN</strong></h1>

                <p>Username</p>
                <Input size="large" placeholder="Input username" prefix={<UserOutlined/>}/>
                <br/>
                <br/>

                <p>Password</p>
                <Space direction="vertical" style={{width: "100%"}}>
                    <Input.Password
                        size="large"
                        placeholder="Input password"
                        iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        prefix={<LockOutlined/>}
                    />
                </Space>
                <br/>
                <br/>
                <br/>

                {/*TODO: add an validation and sign in action once the btn click*/}
                <Button type="primary" size={"default"}>Login</Button>

                <span>&nbsp;&nbsp;&nbsp;&nbsp;or
                    <Link className={"link"} to="/signup" state={"From Contact Page"}>&nbsp;Sign up</Link>
                </span>
            </form>
        </Col>
    </Row>);
}

export default Login;