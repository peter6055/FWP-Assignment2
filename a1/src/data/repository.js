const USERS_KEY = "users";
const USER_KEY = "user";

// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
    // Stop if data is already initialised.
    if (localStorage.getItem(USERS_KEY) !== null)
        return;

    // User data is hard-coded, passwords are in plain-text.
    const users = [];
    // Set data into local storage.
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
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
            mfaStatus : false,
            mfaQuestion: "",
            mfaAnswer: "",
            id: id
        };
    const users = getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
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
        return null;
    }
}

function setUser(username) {
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

function setMFA(username, mfaQuestion, mfaAnswer){
    if(username !== "" && mfaQuestion !== "" && mfaAnswer !== ""){
        const users = getUsers();
        for (const user of users) {
            if (username === user.username) {
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

        } else if (username === ""){
            return "Username props error, please refresh the page. (msg: no usr input)";

        }
        return false;
    }
}


function getMFA(username){
    var result = [];
    if(username !== ""){
        const users = getUsers();
        for (const user of users) {
            if (username === user.username) {
                result["mfaStatus"] = user.mfaStatus;
                result["mfaQuestion"] = user.mfaQuestion;
                if(user.mfaAnswer != null){
                    result["mfaAnswer"] = true;
                }
                return result;
            }
        }
        return "Username props error, please refresh the page. (msg: no usr found)";

    } else {
        return "Username props error, please refresh the page. (msg: no usr input)";
    }
}

function getMFAStatus(username){
    if(username !== ""){
        const users = getUsers();
        for (const user of users) {
            if (username === user.username) {
                if (user.mfaStatus === true) {
                    return true
                } else {
                    return false
                }
            }
        }
        return "Username props error, please refresh the page. (msg: no usr found)";

    } else {
        return "Username props error, please refresh the page. (msg: no usr input)";
    }
}

function verifyMFAAnswer(username, mfaAnswer){
    if(username !== "" && mfaAnswer!== ""){
        const users = getUsers();
        for (const user of users) {
            if (username === user.username) {
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

        } else if (username === "") {
            return "Username props error, please refresh the page. (msg: no usr input)";

        }
    }
}


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
    createUsers,
    setMFA,
    getMFA,
    getMFAStatus,
    verifyMFAAnswer,
    setUser
}
