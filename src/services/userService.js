import axios from 'axios';

import config from '../config/config';
import {
  authHeader
} from '../helpers';

const login = async (username, email, password) => {
  try {
    const data = await axios({
      method: 'post',
      url: `${config.apiUrl}/user/login`,
      data: {
        email,
        name: username,
        password
      }
    });
    console.log('data-userServeic-----------', data);
    const user = handleResponse(data);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    const data = handleResponse(error.response);
    console.log('Inside login ', data);
    throw data;
  }
}

// function login(username, password) {
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: {
//       email: 'hvadjv',
//       name: username,
//       password
//     }
//   };

//   // axios({
//   //   method: 'POST',
//   //   url: '/user/12345',
//   //   data: {
//   //     firstName: 'Fred',
//   //     lastName: 'Flintstone'
//   //   }
//   // });
//   return axios({
//     method: 'post',
//     url: `${config.apiUrl}/user/`,
//     data: {
//       // email: 'hvadjv',
//       name: username,
//       password
//     }
//   }).then(handleResponse)
//     .then((user) => {
//       // store user details and jwt token in local storage to keep user logged in between page refreshes
//       localStorage.setItem('user', JSON.stringify(user));

//       return user;
//     }).catch((err) => {
//     });
//   // return axios.post(`${config.apiUrl}/user/`, requestOptions)
//   // .then(handleResponse)
//   // .then((user) => {
//   //   // store user details and jwt token in local storage to keep user logged in between page refreshes
//   //   localStorage.setItem('user', JSON.stringify(user));

//   //   return user;
//   // });
// }

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/user`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/user/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/user/register`, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/user/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/user/${id}`, requestOptions).then(handleResponse);
}

const handleResponse = (response) => {
  try {
    const { data: { data, message, status }, status: apiStatus } = response;
    if (!apiStatus === 200) {
      if (apiStatus === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true);
      }
      // const error = (data && data.message) || response.statusText;
      console.log('Inside handleResponse', data)
      throw data;
    }
    return data;
  } catch (err) {
    console.log('Inside catch of handleResponse', err)
    throw err;
  }
  // return response.data().then((text) => {
  //   const data = text && JSON.parse(text);
  //   if (!response.ok) {
  //     if (response.status === 401) {
  //     // auto logout if 401 response returned from api
  //       logout();
  //     // location.reload(true);
  //     }

  //     const error = (data && data.message) || response.statusText;
  //     return Promise.reject(error);
  //   }

  //   return data;
  // })
  // return response.data().then((text) => {
  //   const data = text && JSON.parse(text);
  //   if (!response.ok) {
  //     if (response.status === 401) {
  //     // auto logout if 401 response returned from api
  //       logout();
  //     // location.reload(true);
  //     }

  //     const error = (data && data.message) || response.statusText;
  //     return Promise.reject(error);
  //   }

  //   return data;
  // })
}


const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

export default userService;
