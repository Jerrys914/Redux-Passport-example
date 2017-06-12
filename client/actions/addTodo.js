let axios = require('axios');

const addTodo = (todo) => { 
  let request = axios.post('/api/addTodo',{todo:todo});
  return {
    type: 'ADD_TODO',
    payload: request
  }
}

export default addTodo;