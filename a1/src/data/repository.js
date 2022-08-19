const USERS_KEY = "users";
const USER_KEY = "user";
const POST_DATABASE = "post";

// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
    // Stop if data is already initialised.
    if (localStorage.getItem(USERS_KEY) === null){
        const users = [];
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    if (localStorage.getItem(POST_DATABASE) === null){
        const post = [];
        localStorage.setItem(POST_DATABASE, JSON.stringify(post));
    }
}

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
            id: id,
        };

    const post =
        {
            id : id,
            post_data:[],
            reply_data:[]
        };
    const users = getUsers();
    users.push(user);
    const posts = getPosts();
    console.log(posts)
    posts.push(post);
    console.log(posts)
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(POST_DATABASE, JSON.stringify(posts));
    localStorage.setItem(USER_KEY, JSON.stringify(id));
    return id;
}

function generateId(){
    const users = getUsers();
    if (users[0]===undefined){
        return 1
    }else{
        return users[users.length-1].id+1
    }
}


function getUsers() {
    // Extract user data from local storage.
    const data = localStorage.getItem(USERS_KEY);

    // Convert data to objects.
    return JSON.parse(data);
}

function getPosts(){
    const data = localStorage.getItem(POST_DATABASE);
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
//    const users = getUsers();
//    for (const user of users) {
//        if (username === user.username && password === user.password) {
//            setUser(user.id);
//            return user.id;
//        }
//    }
//
//    return null;
//}

    if(username === ""){
        return "error.usr.isempty";

    } else if (password === ""){
        return "error.pswd.isempty";

    } else {
        const users = getUsers();
        for (const user of users) {
            if (username === user.username && password === user.password) {
                return user.id;
            }
        }
        return "not-authorised.credential.incorrect";
    }

    return null;
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
    if (newUsername!==""){
        for (const user of users) {
            if (id === user.id) {
                user.username = newUsername;
            }
            newUsers.push(user);
        }
        localStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
        return true;
    }else {
        alert("Name can not be empty")
    }
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


// ========================================= MFA =================================
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
    console.log(id);

    if(id !== "" && mfaAnswer!== ""){
        const users = getUsers();
        for (const user of users) {
            if (id === user.id) {
                console.log(user);

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
// ========================================= MFA =================================

export {
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
    createUsers
}