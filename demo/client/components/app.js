import React from 'react';
import { Component } from 'react';
import Input from '../containers/input.js';
import TodoList from '../containers/todoList.js';
import Nav from '../containers/navBar.js'

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Input />
        <TodoList />
      </div>
    )
  }
}