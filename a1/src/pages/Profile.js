import React, { useState } from "react";
import {message, Avatar, Button, Typography, Divider, Popconfirm, Row, Col, Comment, Card, Image, Alert} from "antd";
import {UserOutlined, QuestionCircleOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom';

import editLogo from '../assets/edit.png'
import deleteLogo from '../assets/delete.png'
import { changeEmail,changeName, getEmail, getJoinDate,deleteAccount} from "../data/repository";

const {Text, Paragraph, Title} = Typography;

function onChangeNameEdit(){
    console.log("test");
}


const Profile = (props) => {
    const navigate = useNavigate();
    const [Email, setEmail] = useState(getEmail(props.username));
    const [Name, setName]=useState(props.username);
    const date=getJoinDate(props.username);
    // TODO: spec cr.delete user: after clicking delete
    const confirmSelected = () => {
        // TODO: delete account & post, clear session
        deleteAccount(props.username);
        props.logoutUser();
        //props.username=null;
        navigate("/");

        message.success({
            content: 'Account deleted! You are now logout.',
            style: {
                marginTop: '80px',
            },
        });
    };

    const handleNameChange = (event) =>{
        if (changeName(props.username, event)){
            setName(event);
            // refresh page to refresh props.userName
            window.location.reload(false);
        }
    }
    const handleEmailChange = (event) =>{
        if (changeEmail(props.username, event)){
            setEmail(event);
        }
    }

    // TODO: spec hd.1: on click handle hook
    const actions = [
        <div className={"button"} style={{backgroundImage: `url(${editLogo})`, color: "#1d9ce2"}}>Edit Post</div>,
        <div className={"button"} style={{backgroundImage: `url(${deleteLogo})`, color: "#e62332"}}>Delete Post</div>
    ];


    const CommentElement = () => (
        <Card style={{ width: "100%" }}>

            <Comment
                actions={actions}
                author={<a>Han Solo</a>}
                avatar={<Avatar size="large" src="https://joeschmoe.io/api/v1/random" alt="Han Solo"
                                className={"postAvatar"}/>}
                content={
                    <div>
                        <p>
                            We supply a series of design principles, practical patterns and high quality design
                            resources (Sketch and Axure), to help people create their product prototypes beautifully
                            and efficiently.
                        </p>
                        <div className={"postImageGroup"}>
                            <Image className={"center-cropped"} width={"12vh"} src="https://picsum.photos/200/300" />
                            <Image className={"center-cropped"} width={"12vh"} src="https://picsum.photos/200/300" />
                            <Image className={"center-cropped"} width={"12vh"} src="https://picsum.photos/200/300" />

                        </div>
                    </div>
                }
                datetime={
                    "2022-08-09 23:08:41"
                }
            >

            </Comment>
        </Card>

    );




    return (
        <Row className={"profilePage safeArea"}>
            <Col span={7}>
                <div className={"profileContainer"}>
                    <Card style={{ width: "100%" }}>
                        <Avatar size={100} src="https://joeschmoe.io/api/v1/random" alt="Han Solo"
                                className={"postAvatar"}/>

                        {/* TODO: spec pa.d: hide editable, delete account btn + list users' post in this page*/}
                        {/* TODO: spec cr.edit user info: store to localstorage onchange*/}

                        <Typography.Title
                            editable={{
                                onChange:handleNameChange,
                            }}
                            level={3}
                            style={{
                                marginTop: "20px",
                                marginLeft: "2px",
                                marginBottom: "5px"
                            }}
                        >
                            {Name}
                        </Typography.Title>

                        <Paragraph
                            editable={{
                                onChange:handleEmailChange,

                                tooltip: 'click to edit text',
                            }}
                            style={{
                                marginLeft: "2px",
                                marginBottom: "30px"
                            }}
                        >
                            {Email}
                        </Paragraph>

                        <Text type="secondary">{date}</Text>
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
                    </Card>
                </div>
            </Col>
            <Col span={17} style={{}}>
                <div className={"postContainer"}>
                    <CommentElement></CommentElement>
                    <CommentElement></CommentElement>
                    <CommentElement></CommentElement>
                    <CommentElement></CommentElement>
                    <CommentElement></CommentElement>
                </div>
            </Col>
            {/*<Col span={6} style={{}}>*/}
            {/*    <div className={"infoContainer"}>*/}
            {/*        <Alert*/}
            {/*            message={*/}
            {/*                <Title level={4}>Getting Start</Title>*/}

            {/*            }*/}
            {/*            description={*/}
            {/*                <div>*/}
            {/*                    <li>Take a post</li>*/}
            {/*                    <li>Discover your friend</li>*/}
            {/*                    <li>Manage profile</li>*/}
            {/*                    <li>Connect with friends</li>*/}

            {/*                </div>*/}
            {/*            }*/}
            {/*            type="warning"*/}
            {/*        />*/}
            {/*        <Card style={{ width: "100%", marginTop: "20px" }}>*/}
            {/*            <Title level={4}>Discover</Title>*/}
            {/*            <div className={"discoverFriendContainer"}>*/}
            {/*                <Avatar size={50} icon={<UserOutlined />} />*/}
            {/*                <div className={"discoverFriendProfile"}>*/}
            {/*                    <span><strong>Name Smith</strong></span>*/}
            {/*                    <span>name@loopagile.com</span>*/}
            {/*                </div>*/}
            {/*                <div className={"discoverFriendBtn"}>*/}
            {/*                    View*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className={"discoverFriendContainer"}>*/}
            {/*                <Avatar size={50} icon={<UserOutlined />} />*/}
            {/*                <div className={"discoverFriendProfile"}>*/}
            {/*                    <span><strong>Name Smith</strong></span>*/}
            {/*                    <span>name@loopagile.com</span>*/}
            {/*                </div>*/}
            {/*                <div className={"discoverFriendBtn"}>*/}
            {/*                    View*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className={"discoverFriendContainer"}>*/}
            {/*                <Avatar size={50} icon={<UserOutlined />} />*/}
            {/*                <div className={"discoverFriendProfile"}>*/}
            {/*                    <span><strong>Name Smith</strong></span>*/}
            {/*                    <span>name@loopagile.com</span>*/}
            {/*                </div>*/}
            {/*                <div className={"discoverFriendBtn"}>*/}
            {/*                    View*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className={"discoverFriendContainer"}>*/}
            {/*                <Avatar size={50} icon={<UserOutlined />} />*/}
            {/*                <div className={"discoverFriendProfile"}>*/}
            {/*                    <span><strong>Name Smith</strong></span>*/}
            {/*                    <span>name@loopagile.com</span>*/}
            {/*                </div>*/}
            {/*                <div className={"discoverFriendBtn"}>*/}
            {/*                    View*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className={"discoverFriendContainer"}>*/}
            {/*                <Avatar size={50} icon={<UserOutlined />} />*/}
            {/*                <div className={"discoverFriendProfile"}>*/}
            {/*                    <span><strong>Name Smith</strong></span>*/}
            {/*                    <span>name@loopagile.com</span>*/}
            {/*                </div>*/}
            {/*                <div className={"discoverFriendBtn"}>*/}
            {/*                    View*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className={"discoverFriendContainer"}>*/}
            {/*                <Avatar size={50} icon={<UserOutlined />} />*/}
            {/*                <div className={"discoverFriendProfile"}>*/}
            {/*                    <span><strong>Name Smith</strong></span>*/}
            {/*                    <span>name@loopagile.com</span>*/}
            {/*                </div>*/}
            {/*                <div className={"discoverFriendBtn"}>*/}
            {/*                    View*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </Card>*/}
            {/*    </div>*/}
            {/*</Col>*/}
        </Row>
    );

}


export default Profile;