const USERS_KEY = "users";
const USER_KEY = "user";

// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
    // Stop if data is already initialised.
    if (localStorage.getItem(USERS_KEY) !== null)
        return;

    // User data is hard-coded, passwords are in plain-text.
    const users = [
        {
            username: "mbolger",
            password: "abc123"
        },
        {
            username: "shekhar",
            password: "def456"
        }
    ];

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
    const users = getUsers();
    const user =
        {
            uid: users.length,
            username: username,
            password: password,
            email: email,
            JoinDate: JoinDate,
            mfaStatus : false,
            mfaQuestion: "",
            mfaAnswer: "",
        };
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function uniqueName(username) {
    const users = getUsers();
    for (const user of users) {
        if (username === user.username) {
            return false;
        }
    }
    return true;
}

function getUsers() {
    // Extract user data from local storage.
    const data = localStorage.getItem(USERS_KEY);

    // Convert data to objects.
    return JSON.parse(data);
}

function getJoinDate(username) {
    const users = getUsers();
    for (const user of users) {
        if (username === user.username) {
            return user.JoinDate;
        }
    }
}

function getEmail(username) {
    const users = getUsers();
    for (const user of users) {
        if (username === user.username) {
            return user.email;
        }
    }
}

// NOTE: In this example the login is also persistent as it is stored in local storage.
function verifyUser(username, password) {
    if(username === ""){
        return "error.usr.isempty";

    } else if (password === ""){
        return "error.pswd.isempty";

    } else {
        const users = getUsers();
        for (const user of users) {
            if (username === user.username && password === user.password) {
                return true;
            }
        }
        return false;
    }
}


function setUser(username) {
    localStorage.setItem(USER_KEY, username);
}

function getUser() {
    let data = localStorage.getItem(USER_KEY);
    return JSON.parse(data)
}

function removeUser() {
    localStorage.removeItem(USER_KEY);
}

function changeName(username, newUsername) {
    const newUsers = [];
    const users = getUsers();
    if (uniqueName(newUsername)) {
        for (const user of users) {
            if (username === user.username) {
                user.username = newUsername;
            }
            newUsers.push(user);
        }
        localStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
        const newName = '"' + newUsername + '"';
        localStorage.setItem("user", newName);
        return true;
    } else {
        alert("Someone is using it")
    }
}

function changeEmail(username, newEmail) {
    if (/\S+@\S+\.\S+/.test(newEmail)) {
        const users = getUsers();
        for (const user of users) {
            if (username === user.username) {
                user.email = newEmail;
                localStorage.setItem(USERS_KEY, JSON.stringify(users));
            }
        }
        return true
    } else {
        alert("Please input a valid email address " + newEmail)
    }
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

function deleteAccount(username) {
    const users = getUsers();
    const newUsers = [];
    for (const user of users) {
        if (username !== user.username) {
            newUsers.push(user);
        }
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
    removeUser();
}

export {
    deleteAccount,
    changeEmail,
    changeName,
    getEmail,
    uniqueName,
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
