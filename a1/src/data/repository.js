import {v4 as uuidv4} from 'uuid';
import {message, Avatar, Button, Typography, Divider, Popconfirm, Row, Col, Comment, Card, Image, Modal, Form, Input, Alert, AutoComplete} from "antd";
import {QuestionCircleOutlined} from '@ant-design/icons';

const USERS_KEY = "users";
const USER_KEY = "user";
const POST_DATABASE = "posts";
const REPLY_DATABASE = "replys";

// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
    // Stop if data is already initialised.
    if (localStorage.getItem(USERS_KEY) !== null)
        return;

    const users = [];
    const posts = [];
    const replys = [];
    // Set data into local storage.
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(POST_DATABASE, JSON.stringify(posts));
    localStorage.setItem(REPLY_DATABASE, JSON.stringify(replys));
}
// Initialise

// creating
function createUsers(username, password, email) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    let day = days[d.getDay()];
    let date = d.getDate()
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    const JoinDate = `${day} ${date} ${month} ${year}`;
    const id =generateId();
    const user =
        {
            username: username,
            password: password,
            email: email,
            JoinDate: JoinDate,
            mfaStatus : false,
            mfaQuestion: "",
            mfaAnswer: "",
            id: id        
         };

    
    const reply = {
            UserId : id,
            parentId: "",
            replyId : "",
            reply_data:"",
            reply_time:""
        }
    const users = getUsers();
    const replys = getReplys();
    users.push(user);
    replys.push(reply);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(USER_KEY, JSON.stringify(id));
    localStorage.setItem(REPLY_DATABASE, JSON.stringify(replys));
    return id;
}

function createPost(userId, text, images){
    const posts = getPosts();
    const postData =[text];
    for(const image of images){
        postData.push(image);
    }
    const d = new Date();
    let date = d.getDate()
    let month = d.getMonth();
    let year = d.getFullYear();
    let hour=d.getHours();
    let minutes=d.getMinutes()
    const post_time = `${year}-${month}-${date} ${hour}:${minutes}`;
    const post =
        {
            userId : userId,
            postId : generateId(),
            post_data: postData,
            post_time:post_time
        };
    posts.push(post);
    localStorage.setItem(POST_DATABASE, JSON.stringify(posts));
}


function generateId(){
    return uuidv4();
}
// creating

// getter setter delete
function getUsers() {
    // Extract user data from local storage.
    const data = localStorage.getItem(USERS_KEY);

    // Convert data to objects.
    return JSON.parse(data);
}

function getPosts() {
    // Extract posts data from local storage.
    const data = localStorage.getItem(POST_DATABASE);

    // Convert data to objects.
    return JSON.parse(data);
}
function getReplys() {
    // Extract reply data from local storage.
    const data = localStorage.getItem(REPLY_DATABASE);

    // Convert data to objects.
    return JSON.parse(data);
}


function getUserName(id){
    const users = getUsers();
    if (users[0]===undefined){
        return null;
    }else{
        for (const user of users) {
            if (id === user.id) {
                return user.username;
            }
        }
    }
}

function getJoinDate(id) {
    const users = getUsers();
    for (const user of users) {
        if (id === user.id) {
            return user.JoinDate;
        }
    }
}

function getEmail(id) {
    const users = getUsers();
    for (const user of users) {
        if (id === user.id) {
            return user.email;
        }
    }
}

// NOTE: In this example the login is also persistent as it is stored in local storage.
function verifyUser(username, password) {
    const users = getUsers();
    for (const user of users) {
        if (username === user.username && password === user.password) {
            setUser(user.id);
            return user.id;
        }
    }
}

function setUser(id) {
    localStorage.setItem(USER_KEY, id);
}

function getUser() {
    let data = localStorage.getItem(USER_KEY);
    return JSON.parse(data)
}

function removeUser() {
    localStorage.removeItem(USER_KEY);
}


function changeName(id, newUsername) {
    const newUsers = [];
    const users = getUsers();
    for (const user of users) {
        if (id === user.id) {
            user.username = newUsername;
        }
        newUsers.push(user);
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
    return true;

}

function changeEmail(id, newEmail) {
    if (/\S+@\S+\.\S+/.test(newEmail)) {
        const users = getUsers();
        for (const user of users) {
            if (id === user.id) {
                user.email = newEmail;
                localStorage.setItem(USERS_KEY, JSON.stringify(users));
            }
        }
        return true
    } else {
        alert("Please input a valid email address " + newEmail)
    }
}

function deleteAccount(id) {
    const users = getUsers();
    const newUsers = [];
    for (const user of users) {
        if (id !== user.id) {
            newUsers.push(user);
        }
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
    removeUser();
}
// getter setter delete

// ============================================================== MFA ===============================
function setMFA(id, mfaQuestion, mfaAnswer){
    if(id !== "" && mfaQuestion !== "" && mfaAnswer !== ""){
        const users = getUsers();
        for (const user of users) {
            if (id === user.id) {
                user.mfaStatus = true;
                user.mfaQuestion = mfaQuestion;
                user.mfaAnswer = mfaAnswer;
                localStorage.setItem(USERS_KEY, JSON.stringify(users));
                return true;
            }
        }
        return "Username props error, please refresh the page. (msg: no usr found)";

    } else {
        if(mfaQuestion === ""){
            return "Question should not be empty";

        } else if (mfaAnswer === ""){
            return "Answer should not be empty, case sensitive";

        } else if (id === ""){
            return "ID props error, please refresh the page. (msg: no usr input)";

        }
        return false;
    }
}


function getMFA(id){
    var result = [];
    if(id !== ""){
        const users = getUsers();
        for (const user of users) {
            if (id === user.id) {
                result["mfaStatus"] = user.mfaStatus;
                result["mfaQuestion"] = user.mfaQuestion;
                if(user.mfaAnswer != null){
                    result["mfaAnswer"] = true;
                }
                return result;
            }
        }
        return "ID props error, please refresh the page. (msg: no usr found)";

    } else {
        return "ID props error, please refresh the page. (msg: no usr input)";
    }
}

function getMFAStatus(id){
    if(id !== ""){
        const users = getUsers();
        for (const user of users) {
            if (id === user.id) {
                if (user.mfaStatus === true) {
                    return true
                } else {
                    return false
                }
            }
        }
        return "ID props error, please refresh the page. (msg: no usr found)";

    } else {
        return "ID props error, please refresh the page. (msg: no usr input)";
    }
}

function verifyMFAAnswer(id, mfaAnswer){
    if(id !== "" && mfaAnswer!== ""){
        const users = getUsers();
        for (const user of users) {
            if (id === user.id) {
                if(user.mfaStatus === true){
                    if(user.mfaAnswer === mfaAnswer){
                        return true;
                    } else {
                        return "MFA answer Incorrect, not authorised, please try again!";
                    }
                } else {
                    return "MFA not set, not require to authorise";
                }
            }
        }
        return "Username props error, please refresh the page. (msg: no usr found)";

    } else {
        if (mfaAnswer === "") {
            return "Answer should not be empty, case sensitive, please try again!";

        } else if (id === "") {
            return "ID props error, please refresh the page. (msg: no usr input)";

        }
    }
}
// ============================================================== MFA ===============================
function printPost(handleReplySubmit, handleReplyOnClick){
    const {TextArea} = Input;
    let print = [];
    const posts=getPosts();
    for (const post of posts) {
        const id = post.userId;
        const images =[];
        let i=1;
        while(i<post.post_data.length){
            let URL=post.post_data[i].url;
            images.push(<Image className={"center-cropped"} width={"12vh"} src={URL}/>)
            i++;
        }
        print.push(
            <Card style={{width: "100%"}}>
            <Comment
                actions={[
                    <div>
                        <span key="comment-nested-reply-to" onClick={handleReplyOnClick} style={{cursor: "pointer"}}>
                            Reply post
                            <replyinput style={{display: "none"}}>
                                <Comment
                                    avatar={
                                        <Avatar alt={getUserName(id)} className={"postAvatar"} size="default" style={{
                                            backgroundColor: "#f56a00",
                                            verticalAlign: 'middle',
                                            fontSize: '17px'
                                        }}>
                                            {JSON.stringify(getUserName(id)).charAt(1).toUpperCase()}
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
                author={<a>{getUserName(id)}</a>}
                avatar={<Avatar size="large" src="https://joeschmoe.io/api/v1/random" alt="Han Solo"
                                className={"postAvatar"}/>}
                content={
                    <div>
                        <p>
                            {post.post_data[0]}
                        </p>
                        <div className={"postImageGroup"}>
                            {images}
                        </div>
                    </div>
                }
                datetime={
                    post.post_time
                }
            >
            </Comment>
            </Card>
            );
    }
    return <div>{print}</div>;
}

function printProfilePost(id,handleEditPost, editPostOnClick, handleDeletePost){
    const {TextArea} = Input;
    let print = [];
    const posts=getPosts();
    for (const post of posts) {
        const images =[];
        let i=1;
        while(i<post.post_data.length){
            let URL=post.post_data[i].url;
            images.push(<Image className={"center-cropped"} width={"12vh"} src={URL}/>)
            i++;
        }
        if (post.userId===id){
            print.push(
                <Card style={{width: "100%"}}>
            <Comment
                actions={[
                    <span className={"clickable-text"} key="comment-nested-reply-to" onClick={editPostOnClick}>Edit post</span>,
                    <Popconfirm
                        title={"You sure you want to delete this post?"}
                        icon={
                            <QuestionCircleOutlined
                                style={{
                                    color: 'red',
                                }}
                            />
                        }
                        onConfirm={handleDeletePost}
                        placement="bottom"
                        okText="Delete Forever!"
                        cancelText="No"
                    >
                        <span className={"danger-text"} key="comment-nested-reply-to" type="danger">Delete post</span>
                    </Popconfirm>
                ]}
                author={<a>{getUserName(id)}</a>}
                avatar={<Avatar size="large" src="https://joeschmoe.io/api/v1/random" alt="Han Solo"
                                className={"postAvatar"}/>}
                content={
                    <div>
                        <div className={"postText"}>
                            <p>
                            {post.post_data[0]}
                            </p>
                            <Button type="primary" onClick={handleEditPost} style={{marginTop: "20px", display: "none"}}>Save changes</Button>
                        </div>
                        <div className={"postImageGroup"}>
                        {images}
                        </div>
                    </div>
                }
                datetime={
                    post.post_time
                }
            >
            </Comment>
        </Card>
            );
        }
    }
    return <div>{print}</div>;
}
export {
    printProfilePost,
    printPost,
    createPost,
    getUserName,
    deleteAccount,
    changeEmail,
    changeName,
    getEmail,
    getJoinDate,
    initUsers,
    verifyUser,
    getUser,
    removeUser,
    createUsers,
    setMFA,
    getMFA,
    getMFAStatus,
    verifyMFAAnswer,
    setUser
}
