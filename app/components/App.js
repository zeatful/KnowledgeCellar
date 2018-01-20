// containers/App.js

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import _ from 'lodash'

import fetchHeaders from '../actions/headers'

class App extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
    this.props.fetchHeaders();
  }

  renderHeaders() {
    return this.props.headers.map(header => {
      return <li key={header.id}>{header.text}</li>
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderHeaders()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {headers: state.headers}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchHeaders: fetchHeaders
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)