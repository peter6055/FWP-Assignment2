import {stringify, v4 as uuidv4} from 'uuid';
import {
    message,
    Avatar,
    Button,
    Typography,
    Divider,
    Popconfirm,
    Row,
    Col,
    Comment,
    Card,
    Image,
    Modal,
    Form,
    Input,
    Alert,
    AutoComplete, Empty
} from "antd";
import {
    QuestionCircleOutlined,
    LikeFilled,
    DislikeFilled,
    StarFilled,
    PlusCircleFilled,
    MinusCircleFilled,
    CloseCircleFilled
} from '@ant-design/icons';
import axios from "axios";

// TODO ------------------------------------------------------------------------------------------
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// TODO ------------------------------------------------------------------------------------------


// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:40003";
// import $ from 'jquery';
const USER_KEY = "user";
// const POST_DATABASE = "posts";
// const REPLY_DATABASE = "replys";
//!!! we use some code from week3 lec example 10 as start code like initUsers verifyUser getter setter functions.!!!
// Initialise local storage with empty data, if the data is already set this function returns immediately.
// function initUsers() {
//     // Stop if data is already initialised.
//     if (localStorage.getItem(USERS_KEY) !== null)
//         return;

//     const users = [];
//     const posts = [];
//     const replys = [];
//     // Set data into local storage.
//     localStorage.setItem(USERS_KEY, JSON.stringify(users));
//     localStorage.setItem(POST_DATABASE, JSON.stringify(posts));
//     localStorage.setItem(REPLY_DATABASE, JSON.stringify(replys));
// }
// Initialise

// creating
async function createUsers(username, password, email) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    let day = days[d.getDay()];
    let date = d.getDate()
    let month = months[d.getMonth()] + 1;
    let year = d.getFullYear();
    const JoinDate = `${day} ${date} ${month} ${year}`;
    const user =
        {
            username: username,
            password: password,
            email: email,
            join_date: JoinDate,
        };
    const response = await axios.post(API_HOST + "/api/v1/users/create", user);

    return response.data;
}

async function createPost(userId, text, images) {
    const posts = getPosts();
    const ImageData = [];
    for (const image of images) {
        ImageData.push(image);
    }
    const d = new Date();
    let date = d.getDate()
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let hour = d.getHours();
    let minutes = d.getMinutes()
    const post_time = `${year}-${month}-${date} ${hour}:${minutes}`;
    const post = {
        user_id: userId,
        post_text: text,
        post_img: JSON.stringify(ImageData),
        post_time: post_time
    }
    const response = await axios.post(API_HOST + "/api/v1/posts/create", post);

    return response.data;
}

async function createReply(userId, post_id, reply_id, text) {
    const d = new Date();
    let date = d.getDate()
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let hour = d.getHours();
    let minutes = d.getMinutes()
    const reply_time = `${year}-${month}-${date} ${hour}:${minutes}`;
    const reply = {
        user_id: userId,
        parent_post_id: post_id,
        parent_reply_id: reply_id,
        reply_text: text,
        reply_time: reply_time
    }
    const response = await axios.post(API_HOST + "/api/v1/replies/create", reply);
    return response.data;
}

// function generateId(){
//     return uuidv4();
// }
// // creating

// // getter setter delete
// function getUsers() {
//     // Extract user data from local storage.
//     const data = localStorage.getItem(USERS_KEY);

//     // Convert data to objects.
//     return JSON.parse(data);
// }

async function getPosts() {
    const response = await axios.get(API_HOST + "/api/v1/posts/getAll");
    return response.data;
}

// function getReplys() {
//     // Extract reply data from local storage.
//     const data = localStorage.getItem(REPLY_DATABASE);

//     // Convert data to objects.
//     return JSON.parse(data);
// }


// function getUserName(id){
//     const users = getUsers();
//     if (users[0]===undefined){
//         return null;
//     }else{
//         for (const user of users) {
//             if (id === user.id) {
//                 return user.username;
//             }
//         }
//     }
// }

// function getJoinDate(id) {
//     const users = getUsers();
//     for (const user of users) {
//         if (id === user.id) {
//             return user.JoinDate;
//         }
//     }
// }

// function getEmail(id) {
//     const users = getUsers();
//     for (const user of users) {
//         if (id === user.id) {
//             return user.email;
//         }
//     }
// }

// // NOTE: In this example the login is also persistent as it is stored in local storage.
async function verifyUser(username, password) {
    const data = {
        username: username,
        password: password
    }
    const response = await axios.post(API_HOST + "/api/v1/users/login", data);
    return response.data;
}

function setUser(id) {
    localStorage.setItem(USER_KEY, JSON.stringify(id));
}

async function getUserDetail(id) {
    const data = {
        user_id: id
    }
    const response = await axios.post(API_HOST + "/api/v1/users/detail", data);
    return response.data;
}

function getUser() {
    let data = localStorage.getItem(USER_KEY);
    return JSON.parse(data)
}

function removeUser() {
    localStorage.removeItem(USER_KEY);
}

// function getNameByReplyId(id){
//     const users = getUsers();
//     const replys =getReplys();
//     let userId="";
//     for (const reply of replys) {
//         if (id === reply.replyId) {
//             userId=reply.userId;
//         }
//     }
//     for (const user of users) {
//         if (userId === user.id) {
//             return user.username
//         }
//     }
// }
async function changeName(id, newUsername) {
    const userDetail = await getUserDetail(id);
    const data = {
        user_id: id,
        new_username: newUsername,
        new_email: userDetail.data.email
    }
    const response = await axios.post(API_HOST + "/api/v1/users/edit", data);
    if (response.data.success) {
        return true
    } else {
        message.error({
            content: response.data.message,
        });
    }

    // const newUsers = [];
    // const users = getUsers();
    // for (const user of users) {
    //     if (id === user.id) {
    //         user.username = newUsername;
    //     }
    //     newUsers.push(user);
    // }
    // localStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
    // return true;
}

async function changeEmail(id, newEmail) {
    if (/\S+@\S+\.\S+/.test(newEmail)) {
        const userDetail = await getUserDetail(id);
        const data = {
            user_id: id,
            new_username: userDetail.data.username,
            new_email: newEmail
        }
        const response = await axios.post(API_HOST + "/api/v1/users/edit", data);
        if (response.data.success) {
            return true
        } else {
            message.error({
                content: response.data.message,
            });
        }
    } else {
        message.error({
            content: 'Please input a valid email address',
        });
    }
}

async function deleteAccount(id) {
    const data = {
        user_id: id,
        is_del: "1"
    }
    await axios.post(API_HOST + "/api/v1/users/delete", data);
    const getUserPostsId = {
        user_id: id
    }
    const response = await axios.post(API_HOST + "/api/v1/posts/getAllFromUserId", getUserPostsId);
    const posts =response.data.data
    for (const post of posts) {
        await deleteProfilePost(post.post_id);
    }
    removeUser();
}
// // getter setter delete

// // ============================================================== MFA ===============================
// function setMFA(id, mfaQuestion, mfaAnswer){
//     if(id !== "" && mfaQuestion !== "" && mfaAnswer !== ""){
//         const users = getUsers();
//         for (const user of users) {
//             if (id === user.id) {
//                 user.mfaStatus = true;
//                 user.mfaQuestion = mfaQuestion;
//                 user.mfaAnswer = mfaAnswer;
//                 localStorage.setItem(USERS_KEY, JSON.stringify(users));
//                 return true;
//             }
//         }
//         return "Username props error, please refresh the page. (msg: no usr found)";

//     } else {
//         if(mfaQuestion === ""){
//             return "Question should not be empty";

//         } else if (mfaAnswer === ""){
//             return "Answer should not be empty, case sensitive";

//         } else if (id === ""){
//             return "ID props error, please refresh the page. (msg: no usr input)";

//         }
//         return false;
//     }
// }


// function getMFA(id){
//     var result = [];
//     if(id !== ""){
//         const users = getUsers();
//         for (const user of users) {
//             if (id === user.id) {
//                 result["mfaStatus"] = user.mfaStatus;
//                 result["mfaQuestion"] = user.mfaQuestion;
//                 if(user.mfaAnswer != null){
//                     result["mfaAnswer"] = true;
//                 }
//                 return result;
//             }
//         }
//         return "ID props error, please refresh the page. (msg: no usr found)";

//     } else {
//         return "ID props error, please refresh the page. (msg: no usr input)";
//     }
// }

// function getMFAStatus(id){
//     if(id !== ""){
//         const users = getUsers();
//         for (const user of users) {
//             if (id === user.id) {
//                 if (user.mfaStatus === true) {
//                     return true
//                 } else {
//                     return false
//                 }
//             }
//         }
//         return "ID props error, please refresh the page. (msg: no usr found)";

//     } else {
//         return "ID props error, please refresh the page. (msg: no usr input)";
//     }
// }

// function verifyMFAAnswer(id, mfaAnswer){
//     if(id !== "" && mfaAnswer!== ""){
//         const users = getUsers();
//         for (const user of users) {
//             if (id === user.id) {
//                 if(user.mfaStatus === true){
//                     if(user.mfaAnswer === mfaAnswer){
//                         return true;
//                     } else {
//                         return "MFA answer Incorrect, not authorised, please try again!";
//                     }
//                 } else {
//                     return "MFA not set, not require to authorise";
//                 }
//             }
//         }
//         return "Username props error, please refresh the page. (msg: no usr found)";

//     } else {
//         if (mfaAnswer === "") {
//             return "Answer should not be empty, case sensitive, please try again!";

//         } else if (id === "") {
//             return "ID props error, please refresh the page. (msg: no usr input)";

//         }
//     }
// }
// // ============================================================== MFA ===============================

// generate post and reply depends on local storage database
async function printPost(handleReplySubmit, handleReplyOnClick, handleReactionSubmit, handleFollowSubmit) {
    let print = [];
    const data={
        user_id:getUser()
    }
    //get this user's userID， get all followed user id.
    const getFollowedUser=await axios.post(API_HOST + "/api/v1/follows/getFollowersFromUserId",data);
    const FollowedUses=getFollowedUser.data.data;
    const getPosts = await axios.get(API_HOST + "/api/v1/posts/getAll");
    const posts = getPosts.data.data
    for (const post of posts) {
        const userDetail = await getUserDetail(post.user_id)
        const id = post.user_id;
        const post_id = post.post_id;
        // generate image tags depends on local storage
        const imageTag=[];
        const images = JSON.parse(post.post_img);
        for (const image of images) {
            let URL = image.url;
            imageTag.push(<Image className={"center-cropped"} width={"12vh"} src={URL}/>);
        }
        //if Id is exist then follow is true
        let follow=false;
        if(FollowedUses!=null){
            for(const FollowedUse of FollowedUses){
                if (FollowedUse.followed_user_id === post.user_id){
                    follow=true;
                }
            }
        }
        print.push(
            <Card style={{width: "100%", marginTop: "12px"}}>
                <Comment
                    actions={[
                        <div>
                        <span key="comment-nested-reply-to" className={"reply"} onClick={handleReplyOnClick}
                              style={{cursor: "pointer"}}>
                            Reply
                            <replyinput style={{display: "none"}}>
                                <Comment
                                    avatar={
                                        <Avatar alt={userDetail.data.username} className={"postAvatar"} size="default"
                                                style={{
                                                    backgroundColor: "#f56a00",
                                                    verticalAlign: 'middle',
                                                    fontSize: '17px'
                                                }}>
                                            {JSON.stringify(userDetail.data.username).charAt(1).toUpperCase()}
                                        </Avatar>
                                    }
                                    content={
                                        <div className={"reply-input-box"}>
                                            <Form.Item>

                                                {/*TODO -------------------------------------------------------------------------------*/}
                                                <ReactQuill id="postTextItem" theme="snow"
                                                            placeholder={"Write a post..."}></ReactQuill>
                                                {/*TODO -------------------------------------------------------------------------------*/}

                                            </Form.Item>
                                            <Form.Item>
                                                <Button htmlType="submit" style={{marginTop: "10px"}}
                                                        parent_post_id={post_id}
                                                        parent_reply_id={""}
                                                        onClick={handleReplySubmit}
                                                        type="primary">Reply</Button>
                                            </Form.Item>
                                        </div>
                                    }
                                >
                                </Comment>
                            </replyinput>
                        </span>
                            <br/><br/>
                            <span className={"reaction reaction-like"} style={{cursor: "pointer"}} reaction={"like"}
                                  target_id={post_id} target_type={"post"} onClick={handleReactionSubmit}><LikeFilled/>  Like(x)</span>
                            <span className={"reaction reaction-dislike"} style={{cursor: "pointer"}}
                                  reaction={"dislike"} target_id={post_id} target_type={"post"}
                                  onClick={handleReactionSubmit}><DislikeFilled/>  Dislike(x)</span>
                            <span className={"reaction reaction-star"} style={{cursor: "pointer"}} reaction={"star"}
                                  target_id={post_id} target_type={"post"} onClick={handleReactionSubmit}><StarFilled/>  Star(x)</span>
                        </div>
                    ]}
                    author={<a>{userDetail.data.username}</a>}
                    avatar={<Avatar alt={userDetail.data.username} className={"postAvatar"} size="default" style={{
                        backgroundColor: "#f56a00",
                        verticalAlign: 'middle',
                        fontSize: '17px'
                    }}>
                        {JSON.stringify(userDetail.data.username).charAt(1).toUpperCase()}
                    </Avatar>}
                    content={
                        <div>
                            <p>
                                <div dangerouslySetInnerHTML={{__html: post.post_text}}></div>
                            </p>
                            <div className={"postImageGroup"}>
                                {imageTag}
                            </div>
                        </div>
                    }
                    datetime={
                        <div>
                            <div style={{display: "flex"}}>
                                {post.post_time}
                                {/* TODO: if have follow this user, display this*/}
                                {follow ?
                                <div className={"follow-btn has-follow"} style={{position: "absolute", right: 0, top: 0}}
                                user_id={id} action={"unfollow"} username={userDetail.data.username} onClick={handleFollowSubmit}><CloseCircleFilled/> Unfollow
                                </div>
                                :
                                <div  className={"follow-btn"} style={{position: "absolute", right: 0, top: 0}}
                                user_id={id} action={"follow"} username={userDetail.data.username}
                                onClick={handleFollowSubmit}><PlusCircleFilled/> Follow @{userDetail.data.username}</div>
                    }
                                
                            </div>
                        </div>
                    }
                >

                    {await printPostReplys(post_id, handleReplyOnClick, handleReplySubmit, handleReactionSubmit)}
                </Comment>
            </Card>
        );
    }
    return <div>{print}</div>;
}
async function printFollowingPost(FollowedId,handleReplySubmit, handleReplyOnClick, handleReactionSubmit, handleFollowSubmit) {
    let print = [];
    const data={
        user_id:getUser()
    }
    //get this user's userID， get all followed user id.
    const getFollowedUser=await axios.post(API_HOST + "/api/v1/follows/getFollowersFromUserId",data);
    const FollowedUses=getFollowedUser.data.data;
    console.log(FollowedUses);
    const getUserPostsId = {
        user_id: FollowedId
    }
    const getPosts = await axios.post(API_HOST + "/api/v1/posts/getAllFromUserId", getUserPostsId);
    const posts =getPosts.data.data
    for (const post of posts) {
        const userDetail = await getUserDetail(post.user_id)
        const id = post.user_id;
        const post_id = post.post_id;
        // generate image tags depends on local storage
        const imageTag=[];
        const images = JSON.parse(post.post_img);
        for (const image of images) {
            let URL = image.url;
            imageTag.push(<Image className={"center-cropped"} width={"12vh"} src={URL}/>);
        }
        //if Id is exist then follow is true
        let follow=false;
        if(FollowedUses!=null){
            for(const FollowedUse of FollowedUses){
                if (FollowedUse.followed_user_id === post.user_id){
                    follow=true;
                }
            }
        }
        print.push(
            <Card style={{width: "100%", marginTop: "12px"}}>
                <Comment
                    actions={[
                        <div>
                        <span key="comment-nested-reply-to" className={"reply"} onClick={handleReplyOnClick}
                              style={{cursor: "pointer"}}>
                            Reply
                            <replyinput style={{display: "none"}}>
                                <Comment
                                    avatar={
                                        <Avatar alt={userDetail.data.username} className={"postAvatar"} size="default"
                                                style={{
                                                    backgroundColor: "#f56a00",
                                                    verticalAlign: 'middle',
                                                    fontSize: '17px'
                                                }}>
                                            {JSON.stringify(userDetail.data.username).charAt(1).toUpperCase()}
                                        </Avatar>
                                    }
                                    content={
                                        <div className={"reply-input-box"}>
                                            <Form.Item>

                                                {/*TODO -------------------------------------------------------------------------------*/}
                                                <ReactQuill id="postTextItem" theme="snow"
                                                            placeholder={"Write a post..."}></ReactQuill>
                                                {/*TODO -------------------------------------------------------------------------------*/}

                                            </Form.Item>
                                            <Form.Item>
                                                <Button htmlType="submit" style={{marginTop: "10px"}}
                                                        parent_post_id={post_id}
                                                        parent_reply_id={""}
                                                        onClick={handleReplySubmit}
                                                        type="primary">Reply</Button>
                                            </Form.Item>
                                        </div>
                                    }
                                >
                                </Comment>
                            </replyinput>
                        </span>
                            <br/><br/>
                            <span className={"reaction reaction-like"} style={{cursor: "pointer"}} reaction={"like"}
                                  target_id={post_id} target_type={"post"} onClick={handleReactionSubmit}><LikeFilled/>  Like(x)</span>
                            <span className={"reaction reaction-dislike"} style={{cursor: "pointer"}}
                                  reaction={"dislike"} target_id={post_id} target_type={"post"}
                                  onClick={handleReactionSubmit}><DislikeFilled/>  Dislike(x)</span>
                            <span className={"reaction reaction-star"} style={{cursor: "pointer"}} reaction={"star"}
                                  target_id={post_id} target_type={"post"} onClick={handleReactionSubmit}><StarFilled/>  Star(x)</span>
                        </div>
                    ]}
                    author={<a>{userDetail.data.username}</a>}
                    avatar={<Avatar alt={userDetail.data.username} className={"postAvatar"} size="default" style={{
                        backgroundColor: "#f56a00",
                        verticalAlign: 'middle',
                        fontSize: '17px'
                    }}>
                        {JSON.stringify(userDetail.data.username).charAt(1).toUpperCase()}
                    </Avatar>}
                    content={
                        <div>
                            <p>
                                <div dangerouslySetInnerHTML={{__html: post.post_text}}></div>
                            </p>
                            <div className={"postImageGroup"}>
                                {imageTag}
                            </div>
                        </div>
                    }
                    datetime={
                        <div>
                            <div style={{display: "flex"}}>
                                {post.post_time}
                                {/* TODO: if have follow this user, display this*/}
                                {follow ?
                                <div className={"follow-btn has-follow"} style={{position: "absolute", right: 0, top: 0}}
                                user_id={id} action={"unfollow"} username={userDetail.data.username} onClick={handleFollowSubmit}><CloseCircleFilled/> Unfollow
                                </div>
                                :
                                <div  className={"follow-btn"} style={{position: "absolute", right: 0, top: 0}}
                                user_id={id} action={"follow"} username={userDetail.data.username}
                                onClick={handleFollowSubmit}><PlusCircleFilled/> Follow @{userDetail.data.username}</div>
                    }
                                
                            </div>
                        </div>
                    }
                >

                    {await printPostReplys(post_id, handleReplyOnClick, handleReplySubmit, handleReactionSubmit)}
                </Comment>
            </Card>
        );
    }
    return <div>{print}</div>;
}

async function printProfilePost(id, editPostOnClick, deletePost, handleEditPost) {
    let print = [];
    const getPosts = await axios.get(API_HOST + "/api/v1/posts/getAll");
    const posts = getPosts.data.data
    for (const post of posts) {
        const imageTag=[];
        const images = JSON.parse(post.post_img);
        for (const image of images) {
            let URL = image.url;
            imageTag.push(<Image className={"center-cropped"} width={"12vh"} src={URL}/>);
        }
       
        if (post.user_id === id) {
            const userDetail = await getUserDetail(post.user_id)
            print.push(
                <Card style={{width: "100%", marginTop: "12px"}}>
                    <Comment
                        actions={[
                            <span className={"clickable-text"} key="comment-nested-reply-to"
                                  onClick={editPostOnClick} style={{paddingLeft: "10px"}}>Edit post</span>,
                            <Popconfirm
                                title={<div><p>You sure you want to delete this post?</p><input type={"hidden"}
                                                                                                name="postId"
                                                                                                value={post.post_id}></input>
                                </div>}
                                icon={
                                    <QuestionCircleOutlined
                                        style={{
                                            color: 'red',
                                        }}
                                    />
                                }
                                onConfirm={deletePost}
                                placement="bottom"
                                okText="Delete Forever!"
                                cancelText="No"
                            >
                                <span className={"danger-text"} key="comment-nested-reply-to"
                                      style={{paddingLeft: "10px"}} type="danger">Delete post</span>

                            </Popconfirm>

                        ]}
                        author={<a>{userDetail.data.username}</a>}
                        avatar={<Avatar alt={userDetail.data.username} className={"postAvatar"} size="default" style={{
                            backgroundColor: "#f56a00",
                            verticalAlign: 'middle',
                            fontSize: '17px'
                        }}>
                            {JSON.stringify(userDetail.data.username).charAt(1).toUpperCase()}
                        </Avatar>}
                        content={
                            <div>
                                <div className={"postText"}>
                                    <p>
                                        <div dangerouslySetInnerHTML={{__html: post.post_text}}></div>
                                    </p>
                                    {/*// TODO ------------------------------------------------------------------------------------------*/}
                                    <ReactQuill theme="snow" placeholder={"Write a post..."} style={{display: "none"}}
                                                value={post.post_text}/>
                                    {/*// TODO ------------------------------------------------------------------------------------------*/}
                                    <Button type="primary" postId={post.post_id} onClick={handleEditPost}
                                            style={{marginTop: "20px", display: "none"}}>Save changes</Button>
                                </div>
                                <div className={"postImageGroup"}>
                                    {imageTag}
                                </div>
                            </div>
                        }
                        datetime={
                            post.post_time
                        }
                    >
                        {await printProfileReplys(post.post_id)}
                    </Comment>
                </Card>
            );
        }
    }

    if (print == "") {
        print.push(
            <Card>
                <Empty description={"No Post"} style={{padding: "104px 0px"}}/>
            </Card>
        )
    }

    return <div>{print}</div>;
}
async function printFollow(){
    let print = [];
    const input={
        user_id:getUser()
    }
    const getFollowedUser=await axios.post(API_HOST + "/api/v1/follows/getFollowersFromUserId",input);
    const FollowedUses=getFollowedUser.data.data;
    for(const FollowedUse of FollowedUses){
        const userDetail = await getUserDetail(FollowedUse.followed_user_id);
        print.push(
            <div style={{display: "flex", alignItems: "center", margin: "0px 0px 25px 0px"}}>
                <Avatar
                    style={{
                        backgroundColor: "rgb(245, 106, 0)",
                        verticalAlign: 'middle',
                    }}
                    size="large"
                    gap={5}
                >
                    {JSON.stringify(userDetail.data.username).charAt(1).toUpperCase()}
                </Avatar>
                <span style={{marginLeft: "10px"}}>{userDetail.data.username}</span>
                <Button
                    size="small"
                    icon={<MinusCircleFilled/>}
                    style={{
                        margin: '0 16px',
                        verticalAlign: 'middle',
                        position: "inherit",
                        right: "0px",
                        top: "0px",
                        padding: "0px 5px 0px 5px",
                        marginLeft: "auto"
                    }}
                    className={"follow-btn"}
                >
                    Following
                </Button>
            </div>
        )
    }
    return <div>{print}</div>;
}

async function printPostReplys(parentId, handleReplyOnClick, handleReplySubmit, handleReactionSubmit) {
    // const replys = getReplys();
    const getReplys = await axios.get(API_HOST + "/api/v1/replies/getAll");
    const replys = getReplys.data.data
    let print = [];
    for (const reply of replys) {
        if (reply.parent_post_id === parentId && reply.parent_reply_id === null || reply.parent_reply_id === parentId) {
            const reply_id = reply.reply_id;
            const data = {
                reply_id: reply_id
            }
            const getReplyDetail = await axios.post(API_HOST + "/api/v1/replies/getSingle", data);
            const replyUsersId = getReplyDetail.data.data[0].user_id;
            const UserDetail = await getUserDetail(replyUsersId);
            const name = UserDetail.data.username;

            print.push(<Comment
                actions={[
                    <div>
                            <span key="comment-nested-reply-to" onClick={handleReplyOnClick} className={"reply"}
                                  style={{cursor: "pointer"}}>
                                Reply
                                <replyinput style={{display: "none"}}>
                                    <Comment
                                        avatar={
                                            <Avatar alt={name} className={"postAvatar"} size="default" style={{
                                                backgroundColor: "#f56a00",
                                                verticalAlign: 'middle',
                                                fontSize: '17px'
                                            }}>
                                                {JSON.stringify(name).charAt(1).toUpperCase()}
                                            </Avatar>
                                        }
                                        content={
                                            <div className={"reply-input-box"}>
                                                <Form.Item>
                                                    {/*// TODO ------------------------------------------------------------------------------------------*/}
                                                    <ReactQuill id="postTextItem" theme="snow"
                                                                placeholder={"Write a post..."}/>
                                                    {/*// TODO ------------------------------------------------------------------------------------------*/}
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button htmlType="submit" style={{marginTop: "10px"}}
                                                            parent_post_id={getReplyDetail.data.data[0].parent_post_id} 
                                                            parent_reply_id={reply_id} 
                                                            onClick={handleReplySubmit}
                                                            type="primary">Reply</Button>
                                                </Form.Item>
                                            </div>
                                        }
                                    >
                                    </Comment>
                                </replyinput>
                            </span>
                        <br/><br/>
                        <span className={"reaction reaction-like"} style={{cursor: "pointer"}} reaction={"like"}
                              target_id={reply_id} target_type={"reply"} onClick={handleReactionSubmit}><LikeFilled/>  Like(x)</span>
                        <span className={"reaction reaction-dislike"} style={{cursor: "pointer"}} reaction={"dislike"}
                              target_id={reply_id} target_type={"reply"} onClick={handleReactionSubmit}><DislikeFilled/>  Dislike(x)</span>
                        <span className={"reaction reaction-star"} style={{cursor: "pointer"}} reaction={"star"}
                              target_id={reply_id} target_type={"reply"} onClick={handleReactionSubmit}><StarFilled/>  Star(x)</span>
                    </div>
                ]}
                author={<a>{name}</a>}
                avatar={
                    <Avatar alt={name} className={"postAvatar"} size="default" style={{
                        backgroundColor: "#f56a00",
                        verticalAlign: 'middle',
                        fontSize: '17px'
                    }}>
                        {JSON.stringify(name).charAt(1).toUpperCase()}
                    </Avatar>
                }
                content={
         
                    <div dangerouslySetInnerHTML={{__html: reply.reply_text}}></div>
        
                }
            >
                {await printPostReplys(reply_id, handleReplyOnClick, handleReplySubmit, handleReactionSubmit)}
            </Comment>)
        }
    }
    return <div>{print}</div>;
}

async function printProfileReplys(parentId) {
    // const replys = getReplys();
    const getReplys = await axios.get(API_HOST + "/api/v1/replies/getAll");
    const replys = getReplys.data.data
    let print = [];
    for (const reply of replys) {
        // if (reply.parentId === parentId) {
        //     const name = getNameByReplyId(reply.replyId);
        if (reply.parent_post_id === parentId && reply.parent_reply_id === null || reply.parent_reply_id === parentId) {
            const reply_id = reply.reply_id;
            const data = {
                reply_id: reply_id
            }
            const getReplyDetail = await axios.post(API_HOST + "/api/v1/replies/getSingle", data);
            const replyUsersId = getReplyDetail.data.data[0].user_id;
            const UserDetail = await getUserDetail(replyUsersId);
            const name = UserDetail.data.username;
            print.push(<Comment
                author={<a>{name}</a>}
                avatar={
                    <Avatar alt={name} className={"postAvatar"} size="default" style={{
                        backgroundColor: "#f56a00",
                        verticalAlign: 'middle',
                        fontSize: '17px'
                    }}>
                        {JSON.stringify(name).charAt(1).toUpperCase()}
                    </Avatar>
                } content={
                
                    <div dangerouslySetInnerHTML={{__html: reply.reply_text}}></div>

            }
            >
                {await printProfileReplys(reply_id)}
            </Comment>)
        }
    }
    return <div>{print}</div>;
}
async function editProfilePost(id, newtext){
    const data={
        post_id: id,
        new_post_text : newtext
    }
    await axios.post(API_HOST + "/api/v1/posts/edit", data);
}
async function deleteProfilePost(id){
    const data={
        post_id: id,
        is_del : "1"
    }
    const response = await axios.post(API_HOST + "/api/v1/posts/delete", data);
    return response.data;
}
async function setFollow(followUserId){
    const data={
        user_id : getUser(),
        followed_user_id : followUserId
    }
    const response = await axios.post(API_HOST + "/api/v1/follows/setStatus", data);
    return response.data;
}
export {
    changeName,
    setFollow,
    printFollow,
    editProfilePost,
    deleteProfilePost,
    deleteAccount,
    createReply,
    printProfileReplys,
    printPostReplys,
    createPost,
    printPost,
    printFollowingPost,
    changeEmail,
    printProfilePost,
    getPosts,
    getUser,
    getUserDetail,
    setUser,
    verifyUser,
    createUsers,
    removeUser
}