// import {
//     SET_MESSAGE,
//     CLEAR_MESSAGE,
//     REGISTER_SUCCESS,
//     REGISTER_FAIL,
//     LOGIN_SUCCESS,
//     LOGIN_FAIL,
//     LOGOUT
// } from "./actionType";

// const initialState = {};

// const user = JSON.parse(localStorage.getItem("user"));

// const initialState = user ?
//     {
//         isLoggedIn: true,
//         user
//     } :
//     {
//         isLoggedIn: false,
//         user: null
//     };

// export default function (state = initialState, action) {
//     const {
//         type,
//         payload
//     } = action;
//     switch (type) {
//         case SET_MESSAGE:
//             return {
//                 message: payload
//             };

//         case CLEAR_MESSAGE:
//             return {
//                 message: ""
//             };

//         case REGISTER_SUCCESS:
//             return {
//                 ...state,
//                 isLoggedIn: false,
//             };
//         case REGISTER_FAIL:
//             return {
//                 ...state,
//                 isLoggedIn: false,
//             };
//         case LOGIN_SUCCESS:
//             return {
//                 ...state,
//                 isLoggedIn: true,
//                     user: payload.user,
//             };
//         case LOGIN_FAIL:
//             return {
//                 ...state,
//                 isLoggedIn: false,
//                     user: null,
//             };
//         case LOGOUT:
//             return {
//                 ...state,
//                 isLoggedIn: false,
//                     user: null,
//             };

//         default:
//             return state;
//     }
// }
// // --------------------------------------
import { userConstants } from '../user';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function auth(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        user: null
      };
    case userConstants.LOGOUT:
      return {
        loggedIn: false,
        user: null
      };
    default:
      return state
  }
}

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}
