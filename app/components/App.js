// containers/App.js
import classNames from 'classnames'
import React, {Component, PropTypes} from 'react'
import {compose} from 'redux'
import _ from 'lodash'

import {withTheme, withStyles} from 'material-ui/styles'
import {AppBar, Toolbar, Typography} from 'material-ui'

import Body from './Body'
import NavlinkDrawer from './NavlinkDrawer'

// Custom styling for permanent, responsive drawer
const drawerWidth = 150;
const styles = theme => ({  
  root: {
    width: '100%',
    height: 430,
    zIndex: 1,
    overflow: 'hidden'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    position: 'absolute',
    width: `calc(100% - ${drawerWidth}px)`
  },
  'appBar-left': {
    marginLeft: drawerWidth
  },
  'appBar-right': {
    marginRight: drawerWidth
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth
  },
  drawerHeader: theme.mixins.toolbar
})

class App extends Component {
  state = {
    anchor: 'left',
  }

  constructor(props){
    super(props)
  }

  render() {
    const { classes } = this.props
    const { anchor } = this.state
    const drawerTitle = 'Knowledge Cellar'

   return (
    <div className={classes.root}>    
      <div className={classes.appFrame}>
        <AppBar className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
          <Toolbar>
            <Typography type="title" color="inherit" noWrap>
              {drawerTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <NavlinkDrawer anchor={anchor}/>
        <Body styles={styles}/>
      </div>
    </div>
   );
  }
}

export default compose(
  withTheme(), // middleware to supply theme
  withStyles(styles)
)(App)