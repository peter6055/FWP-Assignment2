const USERS_KEY = "users";
const USER_KEY = "user";
// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
  // Stop if data is already initialised.
  if(localStorage.getItem(USERS_KEY) !== null)
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
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const d = new Date();
let day = days[d.getDay()];
let date = d.getDate()
let month = months[d.getMonth()];
let year = d.getFullYear();
const JoinDate=`${day} ${date} ${month} ${year}`;
  const user = 
    {
      username: username,
      password: password,
      email: email,
      JoinDate : JoinDate
    };
  const users=getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function uniqueName(username){
  const users = getUsers();
  for(const user of users) {
    if(username === user.username)
    {
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

function getJoinDate(username){
  const users = getUsers();
  for(const user of users) {
    if(username === user.username)
    {
      return user.JoinDate;
    }
  }
}

// NOTE: In this example the login is also persistent as it is stored in local storage.
function verifyUser(username, password) {
  const users = getUsers();
  for(const user of users) {
    if(username === user.username && password === user.password)
    {
      setUser(username);
      return true;
    }
  }

  return false;
}

function setUser(username) {
  localStorage.setItem(USER_KEY, username);
}

function getUser() {
  return localStorage.getItem(USER_KEY);
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  uniqueName,
  getJoinDate,
  initUsers,
  verifyUser,
  getUser,
  removeUser,
  createUsers
}