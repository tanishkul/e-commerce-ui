const storeUserInfo = (user) => {
  if (user) {
    if (typeof Storage !== 'undefined') {
      if (sessionStorage.getItem('user')) {
        sessionStorage.removeItem('user');
      }
      sessionStorage.setItem('user', JSON.stringify(user));
    }

    return true;
  }

  return false;
};

const getUserInfo = () => {
  if (typeof Storage !== 'undefined') {
    if (sessionStorage.getItem('user')) {
      return sessionStorage.getItem('user');
    }
  }
  return '{}';
};

const getUserName = () => {
  if (typeof Storage !== 'undefined') {
    const result = sessionStorage.getItem('user');
    if (result) {
      const { name } = JSON.parse(result);
      return name;
    }
  }

  return '';
};

const removeUserInfo = () => {
  if (typeof Storage !== 'undefined') {
    if (sessionStorage.getItem('user')) {
      sessionStorage.removeItem('user');
    }
    return true;
  }
  return false;
};

export default {
  storeUserInfo,
  getUserInfo,
  getUserName,
  removeUserInfo
}
