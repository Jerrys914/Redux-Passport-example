import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import addTodo from '../actions/addTodo.js';

class Input extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return(
      <div>
        <input id='todoInput' type='text' placeholder='Add To List'/>
        <button onClick={()=>{ this.props.addTodo(document.getElementById('todoInput').value); document.getElementById('todoInput').value = ''} }>Add Todo</button>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ addTodo }, dispatch);
}

export default connect(null, mapDispatchToProps)(Input);