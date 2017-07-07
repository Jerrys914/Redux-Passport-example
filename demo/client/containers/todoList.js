import React, { Component } from 'react';
import { connect } from 'react-redux';
import addTodo from '../actions/addTodo.js';
import removeTodo from '../actions/removeTodo.js'

class TODO extends Component {
  constructor(props){
    super(props);
    this.props.addTodo('default');
  }

  renderList(todos){
    return todos.map((todo) =>{
      return( 
        <li 
          key={todo} 
          onClick={()=>{  
            this.props.removeTodo(todo);
          }}>
          {todo}
        </li>
      )
    })
  }

  render(){
    return (
      <ul>
        {this.renderList(this.props.todoItems)}
      </ul>
    )
  };
}

const mapStateToProps = (state) => {
  return {todoItems: state.todos};
};

export default connect(mapStateToProps,{addTodo, removeTodo})(TODO);