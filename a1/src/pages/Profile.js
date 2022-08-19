import React, {useEffect, useRef, useState} from "react";
import {message, Avatar, Button, Typography, Divider, Popconfirm, Row, Col, Comment, Card, Image, Modal, Form, Input, Alert} from "antd";
import {QuestionCircleOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom';

import editLogo from '../assets/edit.png'
import deleteLogo from '../assets/delete.png'
import {changeEmail, changeName, getEmail, getJoinDate, deleteAccount, setMFA, getMFA} from "../data/repository";

const {Text, Paragraph, Title} = Typography;


const Profile = (props) => {
    const navigate = useNavigate();
    const [Email, setEmail] = useState(getEmail(props.username));
    const [Name, setName] = useState(props.username);
    const date = getJoinDate(props.username);
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

    const handleNameChange = (event) => {
        if (changeName(props.username, event)) {
            setName(event);
            // refresh page to refresh props.userName
            window.location.reload(false);
        }
    }
    const handleEmailChange = (event) => {
        if (changeEmail(props.username, event)) {
            setEmail(event);
        }
    }

    // TODO: spec hd.1: on click handle hook
    const actions = [
        <div className={"button"} style={{backgroundImage: `url(${editLogo})`, color: "#1d9ce2"}}>Edit Post</div>,
        <div className={"button"} style={{backgroundImage: `url(${deleteLogo})`, color: "#e62332"}}>Delete Post</div>
    ];


    const CommentElement = () => (
        <Card style={{width: "100%"}}>
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
                            <Image className={"center-cropped"} width={"12vh"} src="https://picsum.photos/200/300"/>
                            <Image className={"center-cropped"} width={"12vh"} src="https://picsum.photos/200/300"/>
                            <Image className={"center-cropped"} width={"12vh"} src="https://picsum.photos/200/300"/>

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

    // ============================================================== MFA ===============================
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mfaInputQuestion, setMfaInputQuestion] = useState("");
    const [mfaInputAnswer, setMfaInputAnswer] = useState("");

    const MFAModal = () =>(
        <Modal className={"mfaSetupModal"} title="Set up Multi-factor Authentication" visible={isModalVisible} onOk={handleOk} okText={"Confirm to set MFA"} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
            <Alert message="You should remember the answer you put below. Following login will require you to answer this question. If you forgot it, we are not able to recover you account! Once setup you will not able to turn off it!" type="warning" showIcon />
            <br/>
            <p><strong>What is Multi-factor Authentication (MFA)?</strong></p>
            <p>Rather than just asking for a username and password, MFA requires one or more additional verification factors, which decreases the likelihood of a successful cyber attack.</p>
            <br/>
            <Form.Item label="Question">
                <Input id={"mfaTextQuestion"} placeholder={mfaInputQuestion} />
            </Form.Item>
            <Form.Item label="Answer">
                <Input id={"mfaTextAnswer"} placeholder={mfaInputAnswer} />
            </Form.Item>
        </Modal>
    );

    const showModal = () => {
        // getMFA value first
        var result = getMFA(props.username);
        setIsModalVisible(true);

        console.log(result["mfaStatus"]);
        // hide answer
        if(result["mfaStatus"] == true){
            setMfaInputQuestion(result["mfaQuestion"]);
            setMfaInputAnswer("The actual answer is hidden...");
        } else {
            setMfaInputQuestion("Input your question...");
            setMfaInputAnswer("Input your answer...");
        }
    };

    const handleOk = () => {
        let mfaQuestion = document.getElementById("mfaTextQuestion").value;
        let mfaAnswer = document.getElementById("mfaTextAnswer").value;
        let result = setMFA(props.username, mfaQuestion, mfaAnswer);

        if(result === true){
            setIsModalVisible(false);
            message.success({
                content: "Completed!",
                style: {
                    marginTop: '80px',
                },
            });

        } else {
            message.error({
                content: result,
            });
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    // ============================================================== MFA ===============================


    return (
        <Row className={"profilePage safeArea"} style={{display: "flex", justifyContent: "center"}}>
            <Col span={5} style={{display: "flex", justifyContent: "flex-end"}}>
                <div className={"profileContainer"} style={{maxWidth: "370px"}}>
                    <Card style={{width: "100%"}}>
                        <Avatar size={100} alt="Han Solo"
                                className={"profilePageAvatar"}
                                style={{backgroundColor: "#f56a00", verticalAlign: 'middle', fontSize: '70px'}}>
                            {Name.charAt(0).toUpperCase()}
                        </Avatar>

                        {/* TODO: spec pa.d: hide editable, delete account btn + list users' post in this page*/}
                        <Typography.Title
                            editable={{
                                onChange: handleNameChange,
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
                                onChange: handleEmailChange,
                                tooltip: 'click to edit text',
                            }}
                            style={{
                                marginLeft: "2px",
                                marginBottom: "30px"
                            }}
                        >
                            {Email}
                        </Paragraph>

                        <Button type="primary" onClick={showModal}>Setup MFA</Button>
                        <MFAModal></MFAModal>
                        <br/>
                        <br/>
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
            <Col span={17} style={{maxWidth: "855px"}}>
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