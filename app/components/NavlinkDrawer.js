import classNames from 'classnames'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import _ from 'lodash'

import {withTheme, withStyles} from 'material-ui/styles'
import {Button, Drawer, Switch, List, MenuItem, TextField, Divider, Icon, IconButton, MenuIcon, Hidden} from 'material-ui'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'

import {selectTopic, fetchTopics, addTopic, deleteTopic} from '../actions'

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

  // handle toggle for editting topic titles
  handleToggle = name => (event, checked) => {
    this.setState({topicBeingEditted: ''});
    this.setState(...this.state, { [name]: checked})
  }

  // edit an existing topic
  topicEdit = key => {
    this.setState(...this.state, {topicBeingEditted: key})
    console.log(key);
  }

  // load topics on page load
  componentWillMount() {
    this.props.fetchTopics()
  }

  // submit a topic to be added
  addTopic = event => {
    if(event.keyCode === 13){
      this.props.addTopic(event.target.value)
      event.target.value = ''
    }
  }

  selectTopic = topic => {
    this.props.selectTopic(topic)
  }

  deleteTopic = id => {
    // deselect a topic that is deleted
    if(this.props.selectedTopic._id === id){
      this.props.selectTopic({})  
    } 
    this.props.deleteTopic(id)   
  }

  // generate a list of topics
  renderTopics() {
    const { classes } = this.props
    return this.props.topics.map(topic => {
      let id = topic._id;
      let link = null;
      
      if(this.state.topicEditMode && this.state.topicBeingEditted === id){
        link = <TextField
        key={id+'topic-title'} 
        lable='Update Topic Title'
        id={id + 'current-topic-title'}
        className={classes.TextField}
        defaultValue={topic.title}
        value={this.state.updatedTopicValue}
        onKeyDown={this.updateTopic}/> 
      } else {
        link = <li key={id}>       
          { this.state.topicEditMode ? 
            <span>
              <DeleteIcon key={id + '-delete'} style={{ width: 16, height: 16}} onClick={() => this.deleteTopic(id)}/>
              <EditIcon key={id + '-edit'} style={{ width: 16, height: 16}} onClick={() => this.topicEdit(id)}/>
            </span> : null 
          }
          <a onClick={() => this.selectTopic(topic)}> {topic.title}</a>
        </li>
      }

      return link;
    })
  }

  render() {
    const { classes } = this.props

    const topicBeingEditedValue = this.props.topics.filter(h => {h.id === this.state.topicBeingEditted}).map(h => h.title);

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
              checked={this.state.topicEditMode}
              onChange={this.handleToggle('topicEditMode')}
              aria-label="Edit Links"
            />
          }
          label="Edit Links"
          />
        <List>{this.renderTopics()}</List>
        { this.state.topicEditMode ?
          <TextField 
            id='topicBeingEdited' 
            label='Add Topic'
            className={classes.TextField}
            value={this.state.topicBeingEditedValue}
            onKeyDown={this.addTopic}/>
          : null 
        }   
      </Drawer>
    )
  }
}

// must add state for reducers here
function mapStateToProps(state) {
  return {
    topics: state.topics,
    selectedTopic: state.selectedTopic
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({    
    selectTopic,
    fetchTopics,
    addTopic,
    deleteTopic    
  }, dispatch)
}

export default compose(
  withTheme(), // middleware to supply theme
  withStyles(styles), // middleware to render with jss
  connect(mapStateToProps, mapDispatchToProps) // map props and actions
)(NavlinkDrawer)