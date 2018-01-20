// components/Navbar.js

import React, { Component } from 'react'
import { AppBar, IconButton, RaisedButton } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class Navbar extends Component {
  render() {
    return (
    <div>
      <AppBar
        title="Knowledge Cellar"
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}        
      />
    </div>
    )
  }
}