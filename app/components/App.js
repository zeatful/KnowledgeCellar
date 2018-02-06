// containers/App.js
import classNames from 'classnames'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import _ from 'lodash'

import {withTheme, withStyles} from 'material-ui/styles'
import {AppBar, Button, Drawer, Switch, Toolbar, List, MenuItem, TextField, Typography, Divider, Icon, IconButton, MenuIcon, Hidden} from 'material-ui'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'

import {selectHeader, fetchHeaders, addHeader, deleteHeader} from '../actions'

import Body from './Body'
import FormControlLabel from 'material-ui/Form/FormControlLabel';

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

  handleToggle = name => (event, checked) => {
    this.setState({ [name]: checked});
  }

  // load headers on page load
  componentWillMount() {
    this.props.fetchHeaders()
  }

  // submit a header to be added
  addHeader = event => {
    if(event.keyCode === 13){
      this.props.addHeader(event.target.value)
      event.target.value = ''
    }
  }

  selectHeader = header => {
    this.props.selectHeader(header);
  }

  deleteHeader = id => {
    // deselect a header that is deleted
    if(this.selectedHeader._id === id){
     this.props.selectedHeader({}) ;
    }
    this.props.deleteHeader(id)
  }

  // generate a list of headers
  renderHeaders() {
    const { classes } = this.props
    return this.props.headers.map(header => {
      return <li key={header._id}>
          <a onClick={() => this.selectHeader(header)}>{header.title}</a>
          { this.state.headerEditMode ? <DeleteIcon style={{ width: 16, height: 16} } onClick={() => this.deleteHeader(header._id)}/> : null }
          { this.state.headerEditMode ? <EditIcon style={{ width: 16, height: 16}}/> : null }
        </li>
    })
  }

  render() {
    const { classes } = this.props
    const { anchor } = this.state

    const drawerTitle = 'Knowledge Cellar'

    const drawer = (
      <Drawer
        type="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor={anchor}>
        <div/>
        <h4>Navigation Links</h4>
        <Divider />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.headerEditMode}
              onChange={this.handleToggle('headerEditMode')}
              aria-label="Edit Links"
            />
          }
          label="Edit Links"
          />
        <List>{this.renderHeaders()}</List>
        { this.state.headerEditMode &&
        <TextField 
          id='headerTitle' 
          label='Add Header'
          className={classes.TextField}
          value={this.state.headerTitle}
          onKeyDown={this.addHeader}/> 
        }   
      </Drawer>
    )

    let before = null
    let after = null

    if (anchor === 'left') {
      before = drawer
    } else {
      after = drawer
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
        <Body styles={styles}/>
        {after}
      </div>
    </div>
   );
  }
}

// must add state for reducers here
function mapStateToProps(state) {
  return {
    headers: state.headers,
    selectedHeader: state.selectedHeader
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({    
    selectHeader,
    fetchHeaders,
    addHeader,
    deleteHeader    
  }, dispatch)
}

export default compose(
  withTheme(), // middleware to supply theme
  withStyles(styles), // middleware to render with jss
  connect(mapStateToProps, mapDispatchToProps) // map props and actions
)(App)