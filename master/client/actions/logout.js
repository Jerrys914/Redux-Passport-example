let axios = require('axios');

const logout = () => {
  console.log('logout action')
  let request = axios.get('/logout');
  return {
    type: 'LOGOUT',
    payload: request
  }
};

export default logout;