import {message, Col, Row, Input, Space, Button, Alert} from 'antd';
import {UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';

import AccountPageBg from "../assets/account-page-bg.svg";
import Logo from '../assets/logo.svg'
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {verifyUser} from "../data/repository";
import {Link} from "react-router-dom";


const Login = (props) => {
    const [fields, setFields] = useState({username: "", password: ""});
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();

        const verified = verifyUser(fields.username, fields.password);
        // If verified login the user.
        if (verified !== null) {
            props.loginUser(verified);
            // Navigate to the home page.
            navigate("/profile");
            message.success({
                content: 'Login successful',
                style: {
                    marginTop: '80px',
                },
            });
            return;
        }

        // Reset password field to blank.
        const temp = {...fields};
        temp.password = "";
        setFields(temp);

        // Set error message.
        setErrorMessage("Username and / or password invalid, please try again.");
    }
    // Generic change handler.
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // Copy fields.
        const temp = {username: fields.username, password: fields.password};
        // Update field and state.
        temp[name] = value;
        setFields(temp);
    }

    return (
        <Row style={{height: 'calc(100vh - 120px)'}}>
            <Col className={"login-page login-page-left"} span={12} style={{}}>
                <img src={Logo} width={300} style={{paddingBottom: "20px"}} alt="Logo"></img>
                <img src={AccountPageBg} width={400} alt="AccountPageBg"></img>
            </Col>
            <Col className={"login-page login-page-right"} span={12} style={{}}>
                <form id={"login-form"}>
                    <h1><strong>Login to LAN</strong></h1>

                    <p>Username</p>
                    <Input size="large" name="username" placeholder="Input username" onChange={handleInputChange}
                           prefix={<UserOutlined/>}/>
                    <br/>
                    <br/>

                    <p>Password</p>
                    <Space direction="vertical" style={{width: "100%"}}>
                        <Input.Password
                            name="password"
                            size="large"
                            onChange={handleInputChange}
                            placeholder="Input password"
                            iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                            prefix={<LockOutlined/>}
                        />
                    </Space>
                    <br/>
                    <br/>
                    {errorMessage !== null && <Alert message={errorMessage} type="error" showIcon />}

                    <br/>
                    <Button type="primary" size={"default"} onClick={handleSubmit}>Login</Button>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;or
                    <Link className={"link"} to="/signup" state={"From Contact Page"}>&nbsp;Sign up</Link>
                </span>
                </form>
            </Col>
        </Row>);
}


export default Login;