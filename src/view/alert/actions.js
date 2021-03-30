import { alertConstants } from './actionType';

function success(message) {
  return { type: alertConstants.SUCCESS, message };
}

function error(message) {
console.log('alert-----------', message)
  return { type: alertConstants.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}

export const alertActions = {
  success,
  error,
  clear
};
