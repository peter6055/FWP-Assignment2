import React, {useState} from 'react';
import {Avatar, Card, Comment, Image, Row, Col, Form, Input, Button, Upload, Modal} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {getUserName} from "../data/repository";


const {TextArea} = Input;

const Post = (props) => {
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

        // this is images of post
        console.log(fileList)

        // TODO: validations and save to storage
    };


    const CommentElement = () => (
        <Card style={{width: "100%"}}>
            <Comment
                avatar={
                    <Avatar alt={getUserName(props.id)} className={"postAvatar"} size="default" style={{
                        backgroundColor: "#f56a00",
                        verticalAlign: 'middle',
                        fontSize: '17px'
                    }}>
                        {getUserName(props.id).charAt(1).toUpperCase()}
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

    const PostElement = () => (
        <Card style={{width: "100%"}}>

            <Comment
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


    return (
        <Row className={"profilePage safeArea"} style={{display: "flex", justifyContent: "center"}}>
            <Col span={24} style={{maxWidth: "1000px"}}>
                <div className={"postContainer"}>
                    <CommentElement></CommentElement>
                    <PostElement></PostElement>
                    <PostElement></PostElement>
                    <PostElement></PostElement>
                    <PostElement></PostElement>
                </div>
            </Col>
        </Row>
    );

}

export default Post;