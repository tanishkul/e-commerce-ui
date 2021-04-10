// import { alertConstants } from './actionType';

// export function alert(state = {}, action) {
//   switch (action.type) {
//     case alertConstants.SUCCESS:
//       return {
//         type: 'alert-success',
//         message: action.message
//       };
//     case alertConstants.ERROR:
//       return {
//         type: 'alert-danger',
//         message: action.message
//       };
//     case alertConstants.CLEAR:
//       return {};
//     default:
//       return state
//   }
// }
export const alert = (state = {}, action) => {
  switch (action.type) {
    case 'SNACKBAR_SUCCESS':
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message
      };
    case 'SNACKBAR_CLEAR':
      return {
        ...state,
        successSnackbarOpen: false,
        errorSnackbarOpen: false,
        infoSnackbarOpen: false
      };
    default:
      return state;
  }
};
