import {Col, Row, Input, Space, Button} from 'antd';
import {UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, MailOutlined} from '@ant-design/icons';

import AccountPageBg from "../assets/account-page-bg.svg";
import Logo from '../assets/logo.svg'

import React from 'react';
import {Link} from "react-router-dom";

// TODO: spec pa.a redirect when user are logged
const Signup = () => {
    return (<Row style={{height: 'calc(100vh - 120px)'}}>
        <Col className={"login-page login-page-left"} span={12} style={{}}>
            <img src={Logo} width={300} style={{paddingBottom: "20px"}} alt={"Logo"}></img>
            <img src={AccountPageBg} width={400} alt={"Background"}></img>
        </Col>
        <Col className={"login-page login-page-right"} span={12} style={{}}>
            <form id={"login-form"}>
                <h1><strong>Sign up to LAN</strong></h1>

                <p>Username</p>
                <Input size="large" placeholder="Input username" prefix={<UserOutlined/>}/>
                <br/>
                <br/>

                <p>Email</p>
                <Input size="large" placeholder="Input email" prefix={<MailOutlined/>}/>
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

                {/*TODO: add an validation and register action once the btn click*/}
                <Button type="primary" size={"default"}>Sign up</Button>

                <span>&nbsp;&nbsp;&nbsp;&nbsp;or
                    <Link className={"link"} to="/login" state={"From Contact Page"}>&nbsp;Login</Link>
                </span>
            </form>
        </Col>
    </Row>)
        ;
}


export default Signup;