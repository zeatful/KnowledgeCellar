// containers/App.js
import classNames from 'classnames'
import React, {Component, PropTypes} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import _ from 'lodash'

import ReactMarkdown from 'react-markdown';
import {Typography} from 'material-ui'

import {withTheme, withStyles} from 'material-ui/styles'

const styles = theme => ({
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  }
});

class Body extends Component {
  
  constructor(props){
    super(props)
  }

  // render a page body, should make use of react-markdown
  render() {
    const { selectedTopic, classes } = this.props

    return (
      <main className={classes.content}>
        <ReactMarkdown source={selectedTopic.body}/>
      </main>
   )
  }
}

// must add state for reducers here
function mapStateToProps(state) {
  return {
    selectedTopic: state.selectedTopic
  }
}

export default compose(
  withTheme(), // middleware to supply theme
  withStyles(styles), // middleware to render with jss
  connect(mapStateToProps) // map props and actions
)(Body)