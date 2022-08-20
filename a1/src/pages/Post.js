import React, {useState} from 'react';
import {
    Avatar,
    Card,
    Comment,
    Image,
    Row,
    Col,
    Form,
    Input,
    Button,
    Upload,
    Modal,
    message,
    Spin
} from "antd";
import {PlusOutlined, LoadingOutlined} from '@ant-design/icons';
import $ from 'jquery';

import {getUserName} from "../data/repository";
import {upload} from "../data/aws";

const {TextArea} = Input;
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const Post = (props) => {
    const [Name, setName] = useState(getUserName(props.id));
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
                            <Spin indicator={loadingIcon} style={{display: "none"}} id={"upload-loading-spinner"} tip="Uploading..."/>
                            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                                <img
                                    alt="example"
                                    style={{
                                        width: '100%',
                                    }}
                                    src={previewImage}
                                />
                            </Modal>
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
    let url;
    const handleFileUpload = (e) => {
        // display loading state, no using hook cuz re-rendering cause upload issue
        $("#upload-loading-spinner").css("display", "flex");

        let status = e.file.status;
        let event = e.event;
        let uid = e.file.uid;
        let name = e.file.name;
        let type = e.file.type;


        let fileExtension = type.replace(/(.*)\//g, '');
        let fileUploadName = uid + '.' + fileExtension;

        let reader = new FileReader();
        reader.readAsDataURL(e.file.originFileObj);

        // because render.onLoad will fire onChange three times
        // this is to push the images only in the first time
        if (status === "uploading" && event === undefined) {
            reader.onload = function (e) {

                if(upload(fileUploadName, reader.result, type) !== ""){

                    url = 'https://s3789585.s3.ap-southeast-2.amazonaws.com/fwp-a1/' + fileUploadName

                    setTimeout(function() {
                        fileList.push({"uid": uid, "name": name, "status": "done", "url": url});
                    }, 1500);

                } else {
                    alert("AWS upload promise issue");
                }

            }

        // error means end, cuz we are not handling upload official
        } else if(status === "error"){
            // when end, hide loading state
            $("#upload-loading-spinner").css("display", "none");

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

        // this is images of post
        console.log(fileList)

        // TODO DI: make a post validations and save to storage

        // successful msg
        message.success({
            content: 'Post successful',
            style: {
                marginTop: '80px',
            },
        });
    };
    // ============================================================== Make Post ===============================


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
                    <PostElement>
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
                    <PostElement></PostElement>
                </div>
            </Col>
        </Row>
    );

}

export default Post;