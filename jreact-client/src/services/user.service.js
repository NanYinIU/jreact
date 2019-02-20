import {
    authHeader
} from '../helpers/authHeader';
import axios from 'axios'

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
};

function login(username, password) {
    return axios({
        method:'get',
        url:'/user/login',
        params:{
            username:username,
            password:password
        }
    }).then(handleResponse).then(user => {
        localStorage.setItem('user',user)
    })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    return fetch(`/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
        if (!response.status === 200) {
            if (response.status === 401) {
            // auto logout if 401 response returned fro,m api
                logout();
                window.location.reload(true);
            }

            const error = (response.data && response.data.message) || response.statusText;
            return Promise.reject(error);
        }
        return response.data;
}
