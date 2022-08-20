import React, {useEffect, useState} from 'react';
import {Avatar, Card, Comment, Image, Row, Col, Form, Input, Button, Upload, Modal, message} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import $ from 'jquery';

import {getUserName,createPost, printPost} from "../data/repository";



const {TextArea} = Input;

const Post = (props) => {
    const handleReplyOnClick = (e) => {
        var currentReplyInputDisplay = $(e.target).children().css("display")

        if(currentReplyInputDisplay == "none"){
            $(e.target).children().css({display: "inline"});

        } else if(currentReplyInputDisplay == "inline") {
            $(e.target).children().css({display: "none"});

        }
    };
    const handleReplySubmit = (e) => {
        // TODO HD.2 reply post
        //this is the value of input textarea
        console.log($(e.target).closest('.ant-comment-content-detail').find('textarea').val())

        // successful msg
        message.success({
            content: 'Reply posted',
            style: {
                marginTop: '80px',
            },
        });
    }
    const [Name, setName] = useState(getUserName(props.id));
    const [postsData, setPostData] = useState(printPost(handleReplySubmit, handleReplyOnClick));


    // ============================================================== Make Post ===============================
    const MakePostElement = () => (
        <Card style={{width: "100%"}}>
            <Comment
                avatar={
                    <Avatar alt={getUserName(props.id)} className={"postAvatar"} size="default" style={{
                        backgroundColor: "#f56a00",
                        verticalAlign: 'middle',
                        fontSize: '17px'
                    }}>
                        {JSON.stringify(Name).charAt(1).toUpperCase()}
                    </Avatar>
                }
                content={
                    <div>
                        <Form.Item>
                            <TextArea id="postTextItem" rows={4} placeholder={"Write a post..."}/>
                        </Form.Item>
                        <Form.Item>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                accept="image/*"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handleFilePreview}
                                onChange={handleFileUpload}
                                onRemove={handleFileRemove}
                            >
                                {fileList.length >= 8 ? null :
                                    <div>
                                        <PlusOutlined/>
                                        <div style={{marginTop: 8,}}>Upload</div>
                                    </div>
                                }
                            </Upload>
                            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                                <img
                                    alt="example"
                                    style={{
                                        width: '100%',
                                    }}
                                    src={previewImage}
                                />
                            </Modal>
                            <TextArea type={"hidden"} style={{display: "none"}} id="postImageItem" rows={4}/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" onClick={handleSubmitPost} type="primary">Make a Post</Button>
                        </Form.Item>
                    </div>
                }
            >
            </Comment>
        </Card>
    );

    // upload file
    const [fileList, setFileList] = useState([]);
    const handleFileUpload = (e) => {
        let status = e.file.status;
        let event = e.event;
        let uid = e.file.uid;
        let name = e.file.name;

        let reader = new FileReader();
        reader.readAsDataURL(e.file.originFileObj);

        // because render.onLoad will fire onChange three times
        // this is to push the images only in the first time
        if (status === "uploading" && event === undefined) {
            reader.onload = function (e) {
                fileList.push({"uid": uid, "name": name, "status": "done", "url": reader.result});
            }
        }
    }

    // for preview modal (source: https://ant.design/components/upload/#onChange)
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('')
    const handleFilePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = file;
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleCancel = () => setPreviewVisible(false);


    // remove file
    const [forceRefresh, setForceRefresh] = useState(0);
    const handleFileRemove = (e) => {
        let uid = e.uid;
        for (var count = 0; count < fileList.length; count++) {
            console.log(fileList[count]);

            if (fileList[count].uid === uid) {
                fileList.splice(count, 1);
            }
        }

        //force refresh to refresh the file list
        setForceRefresh(forceRefresh + 1);
    }


    // onclick make a post
    const handleSubmitPost = () => {
        // this is text of post
        console.log(document.getElementById("postTextItem").value)
        const text = document.getElementById("postTextItem").value;
        if (text.length>200 || !text){
            message.error({
                content: 'Post message can not be empty or exceed 250 characters',
                style: {
                    marginTop: '80px',
                },
            });
            return
        }

        // this is images of post
        console.log(fileList)

        // TODO DI: make a post validations and save to storage
        createPost(props.id ,text, fileList);
        setPostData(printPost(handleReplySubmit, handleReplyOnClick));
        // successful msg
        message.success({
            content: 'Post successful',
            style: {
                marginTop: '80px',
            },
        });
    };
    // ============================================================== Make Post ===============================





    // ============================================================== Post ===============================
    // the children in post is comment(reply)
    const PostElement = ({children}) => (
        <Card style={{width: "100%"}}>
            <Comment
                actions={[
                    <div>
                        <span key="comment-nested-reply-to" onClick={handleReplyOnClick} style={{cursor: "pointer"}}>
                            Reply post
                            <replyinput style={{display: "none"}}>
                                <Comment
                                    avatar={
                                        <Avatar alt={getUserName(props.id)} className={"postAvatar"} size="default" style={{
                                            backgroundColor: "#f56a00",
                                            verticalAlign: 'middle',
                                            fontSize: '17px'
                                        }}>
                                            {JSON.stringify(Name).charAt(1).toUpperCase()}
                                        </Avatar>
                                    }
                                    content={
                                        <div>
                                            <Form.Item>
                                                <TextArea rows={2} placeholder={"Write a reply..."}/>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button htmlType="submit" onClick={handleReplySubmit} type="primary">Reply</Button>
                                            </Form.Item>
                                        </div>
                                    }
                                >
                                </Comment>
                            </replyinput>
                        </span>
                    </div>
                ]}
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
                {children}
            </Comment>
        </Card>
    );
    // ============================================================== Post ===============================


    // ============================================================== Comment ===============================
    // the children in comment(reply) is sub-comment(sub-reply)
    const CommentElement  = ({children}) => (
        <Comment
            actions={[
                <div>
                        <span key="comment-nested-reply-to" onClick={handleReplyOnClick} style={{cursor: "pointer"}}>
                            Reply post
                            <replyinput style={{display: "none"}}>
                                <Comment
                                    avatar={
                                        <Avatar alt={getUserName(props.id)} className={"postAvatar"} size="default" style={{
                                            backgroundColor: "#f56a00",
                                            verticalAlign: 'middle',
                                            fontSize: '17px'
                                        }}>
                                            {JSON.stringify(Name).charAt(1).toUpperCase()}
                                        </Avatar>
                                    }
                                    content={
                                        <div>
                                            <Form.Item>
                                                <TextArea rows={2} placeholder={"Write a reply..."}/>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button htmlType="submit" onClick={handleReplySubmit} type="primary">Reply</Button>
                                            </Form.Item>
                                        </div>
                                    }
                                >
                                </Comment>
                            </replyinput>
                        </span>
                </div>
            ]}
            author={<a>Han Solo</a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure).
                </p>
            }
        >
            {children}
        </Comment>
    );
    // ============================================================== Comment ===============================


    return (
        <Row className={"profilePage safeArea"} style={{display: "flex", justifyContent: "center"}}>
            <Col span={24} style={{maxWidth: "1000px"}}>
                <div className={"postContainer"}>
                    <MakePostElement></MakePostElement>
                    {/* <PostElement>
                        <CommentElement>
                            <CommentElement>
                                <CommentElement>
                                    <CommentElement>
                                    </CommentElement>
                                </CommentElement>
                            </CommentElement>
                        </CommentElement>
                    </PostElement>
                    <PostElement></PostElement>
                    <PostElement></PostElement>
                    <PostElement></PostElement> */}
                    {postsData}
                </div>
            </Col>
        </Row>
    );

}

export default Post;