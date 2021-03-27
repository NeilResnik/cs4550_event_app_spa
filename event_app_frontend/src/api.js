import store from './store.js';

const API_URL = "http://localhost:4000/api/v1";

async function api_get(path) {
    let text = await fetch(API_URL + path, {});
    let resp = await text.json();
    return resp.data;
}

async function api_post(path, data) {
    let opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    let text = await fetch(API_URL + path, opts);
    return await text.json();
}

// user functions
const USERS_PATH = '/users';
export function fetch_users() {
    api_get(USERS_PATH).then((data) => store.dispatch({
        type: 'users/set',
        data: data,
    }));
}

export function create_user(user) {
    return api_post(USERS_PATH, {user});
}

// event functions
const EVENTS_PATH = '/events';
export function fetch_events() {
    api_get(EVENTS_PATH).then((data) => store.dispatch({
        type: 'events/set',
        data: data,
    }));
}

export async function create_event(event) {
    let state = store.getState();
    let token = state?.session?.token;

    let data = new FormData();
    // TODO
    
    let opts = {
        method: 'POST',
        body: data,
        headers: {
            'x-auth': token,
        },
    };

    let text = await fetch(API_URL + EVENTS_PATH, opts);
    return await text.json();
}

export function api_login(email, password) {
    api_post("/session", {email, password}).then((data) => {
        console.log("Login Response:", data);
        if(data.session) {
            store.dispatch({
                type: 'session/set',
                data: data.session,
            });
        } else if(data.error) {
            store.dispatch({
                type: 'error/set',
                data: data.error
            });
        }
    });
}

export function create_comment(comment) {
    api_post("/comments", {comment});
}

export function create_invite(invite) {
    api_post("/invites", {invite});
}

export function edit_invite(invite) {
    // TODO
}

export function load_defaults() {
    fetch_users();
    fetch_events();
}
