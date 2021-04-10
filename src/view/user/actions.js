import { userConstants } from './actionType';
import { userService } from '../../services';
import { showSuccessSnackbar } from '../alert';
import { history } from '../../helpers';

const setMessage = message => ({
  type: userConstants.SET_MESSAGE,
  payload: message,
});

const clearMessage = () => ({
  type: userConstants.CLEAR_MESSAGE,
});

const login = (username, email, password) => async (dispatch) => {
  const request = user => ({ type: userConstants.LOGIN_REQUEST, user })
  const success = user => ({ type: userConstants.LOGIN_SUCCESS, user })
  const failure = error => ({ type: userConstants.LOGIN_FAILURE, error })

  try {
    dispatch(request({ user: username }));
    const user = await userService.login(username, email, password)
    dispatch(success(user));
    dispatch(showSuccessSnackbar('Success!'));
  } catch (error) {
    dispatch(failure(error));
    // error.forEach(({ msg }) => {
    //   dispatch(alertActions.error(`${msg}`));
    // })
  }
}

const logout = () => (dispatch) => {
  const success = () => ({ type: userConstants.LOGOUT })
  userService.logout();
  dispatch(success());
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
          // dispatch(alertActions.success('Registration successful'));
        },
        (error) => {
          dispatch(failure(error.toString()));
          // dispatch(alertActions.error(error.toString()));
        }
      );
  };
}

const getAll = () => async (dispatch) => {
  const request = () => ({ type: userConstants.GETALL_REQUEST });
  const success = users => ({ type: userConstants.GETALL_SUCCESS, users });
  const failure = error => ({ type: userConstants.GETALL_FAILURE, error });

  try {
    dispatch(request());
    const users = await userService.getAll();
    dispatch(success(users));
  } catch (error) {
    dispatch(failure(error));
    // error.forEach(({ msg }) => {
    //   dispatch(alertActions.error(`${msg}`));
    // })
  }
}

const _delete = id => async (dispatch) => {
  const request = idReq => ({ type: userConstants.DELETE_REQUEST, id: idReq });
  const success = idReq => ({ type: userConstants.DELETE_SUCCESS, id: idReq });
  const failure = (idReq, error) => ({ type: userConstants.DELETE_FAILURE, id: idReq, error });


  try {
    dispatch(request(id));
    await userService.delete(id);
    dispatch(success(id));
  } catch (error) {
    dispatch(failure(error));
    // error.forEach(({ msg }) => {
    //   dispatch(alertActions.error(`${msg}`));
    // })
  }
}

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
  setMessage,
  clearMessage
};
