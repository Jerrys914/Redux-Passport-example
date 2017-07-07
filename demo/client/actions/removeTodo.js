let axios = require('axios');

const removeTodo = (todo) => { 
  let request = axios.post('/api/removeTodo',{todo:todo});
  return {
    type: 'REMOVE_TODO',
    payload: request
  }
}

export default removeTodo;