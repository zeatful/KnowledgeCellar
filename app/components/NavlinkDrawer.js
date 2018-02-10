import classNames from 'classnames'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import _ from 'lodash'

import {withTheme, withStyles} from 'material-ui/styles'
import {Button, Drawer, Switch, List, MenuItem, TextField, Divider, Icon, IconButton, MenuIcon, Hidden} from 'material-ui'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'

import {selectHeader, fetchHeaders, addHeader, deleteHeader} from '../actions'

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

class NavlinkDrawer extends Component {
  state = {};

  constructor(props){
    super(props)
  }

  handleToggle = name => (event, checked) => {
    this.setState(...this.state, { [name]: checked})
  }

  headerEdit = key => {
    this.setState(...this.state, {headerBeingEditted: key})
    console.log(key);
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
    this.props.selectHeader(header)
  }

  deleteHeader = id => {
    // deselect a header that is deleted
    if(this.props.selectedHeader._id === id){
      this.props.selectHeader({})  
    } 
    this.props.deleteHeader(id)   
  }

  // generate a list of headers
  renderHeaders() {
    const { classes } = this.props
    return this.props.headers.map(header => {
      let id = header._id;
      let link = null;
      
      if(this.state.headerBeingEditted === id){
        link = <TextField 
        id='headerTitle' 
        label='Add Header'
        className={classes.TextField}
        value={this.state.headerTitle}
        onKeyDown={this.addHeader}/> 
      } else {
        link = <li key={id}>       
          { this.state.headerEditMode ? 
            <span>
              <DeleteIcon style={{ width: 16, height: 16}} onClick={() => this.deleteHeader(id)}/>
              <EditIcon style={{ width: 16, height: 16}} onClick={() => this.headerEdit(id)}/>
            </span> : null 
          }
          <a onClick={() => this.selectHeader(header)}> {header.title}</a>
        </li>
      }

      return link;
    })
  }

  render() {
    const { classes } = this.props

    const headerBeingEditedValue = this.props.headers.filter(h => {h.id === this.state.headerBeingEditted}).map(h => h.title);

    return (
      <Drawer
        type="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor={this.props.anchor}>
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
          id='headerBeingEdited' 
          label='Add Header'
          className={classes.TextField}
          value={this.state.headerBeingEditedValue}
          onKeyDown={this.addHeader}/> 
        }   
      </Drawer>
    )
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
)(NavlinkDrawer)