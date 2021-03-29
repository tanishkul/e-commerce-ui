/* eslint-disable array-callback-return */
import { userConstants } from './actionType';
import { userService } from '../../services';
import { alertActions } from '../alert';
import { history } from '../../helpers';

const login = async (username, password) => {
  const request = user => ({ type: userConstants.LOGIN_REQUEST, user })
  const success = user => ({ type: userConstants.LOGIN_SUCCESS, user })
  const failure = error => ({ type: userConstants.LOGIN_FAILURE, error })
  try {
    request({ user: username });
    const user = await userService.login(username, password)
    success(user);
    history.push('/', { user });
    return user;
  } catch (err) {
    console.log('Error-11111111111----------', err)
    err.map(({ msg }) => {
      failure(`${msg}`);
      alertActions.error(`${msg}`);
    })
    throw err;
  }
}

const logout = () => {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

const register = (user) => {
  const request = userRequest => ({ type: userConstants.REGISTER_REQUEST, userRequest });
  const success = userRequest => ({ type: userConstants.REGISTER_SUCCESS, userRequest });
  const failure = error => ({ type: userConstants.REGISTER_FAILURE, error });

  return (dispatch) => {
    dispatch(request(user));

    userService.register(user)
      .then(
        (userRes) => {
          dispatch(success());
          history.push('/login');
          dispatch(alertActions.success('Registration successful'));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };
}

const getAll = () => {
  const request = () => ({ type: userConstants.GETALL_REQUEST });
  const success = users => ({ type: userConstants.GETALL_SUCCESS, users });
  const failure = error => ({ type: userConstants.GETALL_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    userService.getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString()))
      );
  };
}

// prefixed function name with underscore because delete is a reserved word in javascript
const _delete = (id) => {
  const request = idReq => ({ type: userConstants.DELETE_REQUEST, idReq });
  const success = idReq => ({ type: userConstants.DELETE_SUCCESS, idReq });
  const failure = (idReq, error) => ({ type: userConstants.DELETE_FAILURE, idReq, error });

  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id)
      .then(
        user => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };
}

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete
};
