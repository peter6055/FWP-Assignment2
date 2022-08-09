import React from 'react';

import {message, Avatar, Button, Typography, Divider, Popconfirm, Row, Col, Comment} from "antd";
import {UserOutlined, QuestionCircleOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom';


const {Text, Paragraph} = Typography;


const Profile = () => {
    const navigate = useNavigate();

    // TODO: spec cr.delete user: after clicking delete
    const confirmSelected = () => {
        // TODO: delete account & post, clear session
        navigate("/");

        message.success({
            content: 'Account deleted! You are now logout.',
            style: {
                marginTop: '80px',
            },
        });
    };

    // TODO: spec hd.1: on click handle hook
    const actions = [
        <span key="edit" style={{color: "#1890ff"}}>Edit Post  <EditOutlined />&nbsp;&nbsp;&nbsp;&nbsp;</span>,
        <span key="delete" style={{color: "#f5222d"}}>Delete Post  <DeleteOutlined /></span>,
    ];


    return (
        <Row className={"profilePage"} style={{height: 'calc(100vh - 120px)', padding: "70px 100px 0px 100px"}}>
            <Col span={9} style={{}}>
                <div className={"profileContainer"}>
                    <div className={"profileCard"}>
                        <Avatar size={100} src="https://joeschmoe.io/api/v1/random" alt="Han Solo" className={"postAvatar"}/>

                        {/* TODO: spec pa.d: hide editable, delete account btn + list users' post in this page*/}
                        {/* TODO: spec cr.edit user info: store to localstorage onchange*/}
                        <Typography.Title
                            editable
                            level={3}
                            style={{
                                marginTop: "20px",
                                marginLeft: "2px",
                                marginBottom: "5px"

                            }}
                        >
                            Peter Liu
                        </Typography.Title>

                        <Paragraph
                            editable={{
                                tooltip: 'click to edit text',
                            }}
                            style={{
                                marginLeft: "2px",
                                marginBottom: "30px"

                            }}

                        >
                            peter@shopmy.com.au
                        </Paragraph>

                        <Text type="secondary">Join Thu 28 Jul 2022</Text>
                        <br/>
                        <br/>

                        <Divider orientation="center" plain>Danger Zone</Divider>


                        <Popconfirm
                            title={"After you delete your account, you are not able to login as a user. All of you post will be delete as well."}
                            icon={
                                <QuestionCircleOutlined
                                    style={{
                                        color: 'red',
                                    }}
                                />
                            }
                            onConfirm={confirmSelected}
                            placement="bottom"
                            okText="Delete Forever!"
                            cancelText="No"

                        >
                            <a><Button danger> Delete my account</Button></a>
                        </Popconfirm>
                    </div>
                </div>
            </Col>
            <Col span={15} style={{}}>
                <div className={"postContainer"}>
                    <Comment
                        actions={actions}
                        author={<a>Han Solo</a>}
                        avatar={<Avatar size="large" src="https://joeschmoe.io/api/v1/random" alt="Han Solo" className={"postAvatar"} />}
                        content={
                            <p>
                                We supply a series of design principles, practical patterns and high quality design
                                resources (Sketch and Axure), to help people create their product prototypes beautifully
                                and efficiently.
                            </p>
                        }
                        datetime={
                            "2022-08-09 23:08:41"
                        }

                    />
                    <Divider/>
                    <Comment
                        actions={actions}
                        author={<a>Han Solo</a>}
                        avatar={<Avatar size="large" src="https://joeschmoe.io/api/v1/random" alt="Han Solo" className={"postAvatar"} />}
                        content={
                            <p>
                                We supply a series of design principles, practical patterns and high quality design
                                resources (Sketch and Axure), to help people create their product prototypes beautifully
                                and efficiently.
                            </p>
                        }
                        datetime={
                            "2022-08-09 23:08:41"
                        }
                    />
                </div>
            </Col>
        </Row>);

}


export default Profile;