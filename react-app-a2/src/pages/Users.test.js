import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../src/App.js";

import Profile from "../../src/pages/Profile.js";
// import Login from "../../src/pages/Login.js";

import { logoutUser, editName, loginUser } from "../../src/App.js";
import {createUsers, deleteAccount} from "../data/repository";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Login from "./Login";

// See here for more information:
// https://reactjs.org/docs/testing.html
// https://github.com/testing-library/react-testing-library
// https://testing-library.com/docs/
// https://testing-library.com/docs/react-testing-library/intro

// Global data for tests.
let user; //user for testing
let users;
let session_login; //login session
let session_profile; //login session
let container; //target page


// Runs once before tests, here global test data is initialised.
beforeAll(async () => {
    users = [{username: "mark", password: "Mark_123456", email: "mark@loop_agile.com"}];
});


// Runs before each test, here the Users component is rendered and the container is stored.
// beforeEach(() => {
//
//
// });
//


test("Create user", async () => {
    user = await createUsers(users[0]['username'], users[0]['password'], users[0]['email']);
    console.log(user)
    expect(user.code).toBe(200);
});

test("Duplicate username", async () => {
    user = await createUsers(users[0]['username'], users[0]['password'], users[0]['email']);
    console.log(user)
    expect(user.code).toBe(400);
});

// clean up created data
afterAll(async () => {
    console.log(user.data)
    console.log(await deleteAccount(user.data));
});

