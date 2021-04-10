import axios from 'axios';

import config from '../config/config';
import {
  authHeader,
  utilities
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
    const user = handleResponse(data);
    utilities.storeUserInfo(user);
    return user;
  } catch (error) {
    throw handleResponse(error.response);
  }
}

const logout = () => utilities.removeUserInfo();

const getAll = async () => {
  try {
    const data = await axios({
      method: 'get',
      url: `${config.apiUrl}/user/`,
      data: {}
    });
    const user = handleResponse(data);
    return user;
  } catch (error) {
    throw handleResponse(error.response);
  }
}

const _delete = async (id) => {
  try {
    const data = await axios({
      method: 'delete',
      url: `${config.apiUrl}/user/${id}`,
      data: {}
    });
    const user = handleResponse(data);
    return user;
  } catch (error) {
    throw handleResponse(error.response);
  }
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
// function _delete(id) {
//   const requestOptions = {
//     method: 'DELETE',
//     headers: authHeader()
//   };

//   return fetch(`${config.apiUrl}/user/${id}`, requestOptions).then(handleResponse);
// }

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
      throw data;
    }
    return data;
  } catch (err) {
    console.log('Inside catch of handleResponse:::', err)
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
