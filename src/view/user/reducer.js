import { userConstants } from './actionType';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map(user => (user.id === action.id
          ? { ...user, deleting: true }
          : user))
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        ...state,
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        user: null
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: null
      };
    default:
      return state
  }
}
