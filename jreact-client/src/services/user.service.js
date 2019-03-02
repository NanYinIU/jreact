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
        method: 'get',
        url: '/user/login',
        params: {
          username: username,
          password:password
        }
      }).then(function(response){
        console.log(response);
        var user  = response.data.user;
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      });
    
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
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
