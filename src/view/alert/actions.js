// import { alertConstants } from './actionType';

// function success(message) {
//   return { type: alertConstants.SUCCESS, message };
// }

// function error(message) {
//   return { type: alertConstants.ERROR, message };
// }

// function clear() {
//   return { type: alertConstants.CLEAR };
// }

// export const alertActions = {
//   success,
//   error,
//   clear
// };

export const showSuccessSnackbar = message => (dispatch) => {
  dispatch({ type: 'SNACKBAR_SUCCESS', message });
};

export const clearSnackbar = () => (dispatch) => {
  dispatch({ type: 'SNACKBAR_CLEAR' });
};
