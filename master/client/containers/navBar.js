import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BindActionCreators } from 'react-redux';
import logout from '../actions/logout.js';

class Nav extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <big><strong style={{fontSize:'35px'}}>TODO LIST</strong></big>
        <span style={{padding:'15px'}}><a href='/logout'>Logout</a></span>
      </div>
    )
  }
}



export default connect(null,{logout})(Nav);