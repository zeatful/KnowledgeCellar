// containers/App.js
import classNames from 'classnames';
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import _ from 'lodash'

import {withTheme, withStyles} from 'material-ui/styles'
import {AppBar, Drawer, Toolbar, List, MenuItem, TextField, Typography, Divider, IconButton, MenuIcon, Hidden} from 'material-ui'

import {fetchHeaders} from '../actions'

const drawerWidth = 150;

const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: theme.mixins.toolbar,
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

class App extends Component {
  state = {
    anchor: 'left',
  };

  constructor(props){
    super(props)
  }

  componentWillMount() {
    this.props.fetchHeaders()
  }

  renderHeaders() {
    const navlinks = ['Home', ...this.props.headers];
    return navlinks.map(header => {
      return <li key={header._id}><a href={header.text}>{header.text}</a></li>
    })
  }

  render() {
    const { classes } = this.props;
    const { anchor } = this.state;

    const drawerTitle = 'Knowledge Cellar';

    const drawer = (
      <Drawer
        type="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={anchor}>
        <div/>
        <h4>Navigation Links</h4>
        <Divider />
        <List>{this.renderHeaders()}</List>      
      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }

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
        {before}
        <main className={classes.content}>
          <Typography>{'Your body text here!'}</Typography>
        </main>
        {after}
      </div>
    </div>
   );
  }
}

function mapStateToProps(state) {
  return {headers: state.headers}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchHeaders: fetchHeaders
  }, dispatch)
}

export default compose(
  withTheme(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(App);