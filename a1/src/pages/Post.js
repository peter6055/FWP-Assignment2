import React, {useEffect, useState} from 'react';
import {Avatar, Card, Comment, Image, Row, Col,  Form, Input, Button, Upload, Modal} from "antd";
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function () {
        console.log(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

const Post = () => {
    const handleSubmit = () => {
        console.log(document.getElementById("postTextItem").value)
    };

    // const [previewVisible, setPreviewVisible] = useState(false);
    // const [previewImage, setPreviewImage] = useState('');
    // const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }]);


    // const handleCancel = () => setPreviewVisible(false);

    // const handlePreview = async (file) => {
    //     // if (!file.url && !file.preview) {
    //     //     file.preview = await getBase64(file.originFileObj);
    //     // }
    //     console.log(file);
    //     file.preview = await getBase64(file.originFileObj);
    //     setPreviewImage(file.url || file.preview);
    //     setPreviewVisible(true);
    //     setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    // };

    const handleChange = (s) => setFileList(s);

    // useEffect(() => {
    //     console.log(fileList)
    // }, [fileList]);

    const handleUpload = (e) => {
        handleChange("1")
        console.log(fileList);
        // setFileList("1");
        // console.log(fileList);

        // let uid = e.file.uid;
        // let name = e.file.name;
        //
        //
        // let reader = new FileReader();
        // reader.readAsDataURL(e.file.originFileObj);
        // reader.onload = function(e) {
        //     // generate file
        //     // const image = [];
        //     // image['uid'] = uid;
        //     // image['name'] = name;
        //     // image['status'] = "done";
        //     // image['url'] = reader.result;
        //     // setFileList(image);
        //
        //     // file to file list
        //
        //     // reader.result
        //     var obj = JSON.parse(JSON.stringify(fileList));
        //     obj.push({"uid":"-2","name": name,"status":"done","url": reader.result});
        //     var jsonStr = JSON.stringify(obj)
        //     console.log(jsonStr)
        //     // handleChange(jsonStr);
        //     console.log(fileList);
        //
        // }
    }



    const CommentElement = () => (
        <Card style={{ width: "100%" }}>
            <Comment
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                content={
                    <div>
                        <Form.Item>
                            <TextArea id="postTextItem" rows={4} placeholder={"Write a post..."} />
                        </Form.Item>
                        <Form.Item>
                            {/*<input onChange={handleUpload} type="file" name="file" />*/}

                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                // onPreview={handlePreview}
                                onChange={handleUpload}
                            >
                                {fileList.length >= 8 ? null :
                                    <div>
                                        <PlusOutlined />
                                        <div style={{marginTop: 8,}}>Upload</div>
                                    </div>
                                }
                            </Upload>
                            {/*<Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>*/}
                            {/*    <img*/}
                            {/*        alt="example"*/}
                            {/*        style={{*/}
                            {/*            width: '100%',*/}
                            {/*        }}*/}
                            {/*        src={previewImage}*/}
                            {/*    />*/}
                            {/*</Modal>*/}
                            <TextArea type={"hidden"} style={{display: "none"}} id="postImageItem" rows={4} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" onClick={handleSubmit} type="primary">Make a Post</Button>
                        </Form.Item>
                    </div>
                }
            >

            </Comment>

        </Card>
    );

    const PostElement = () => (
        <Card style={{ width: "100%" }}>

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
            <Col span={24}>
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