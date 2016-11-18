import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
// import { SubmissionError } from 'redux-form'

import { entryNew } from '../actions'

import Map from '../components/Map'

class EntryList extends Component {
  render() {
    return (
      <div>
        {this.props.entries.map((e, i) => {
          return (
            <div key={i}>
              { e.content }
            </div>
          )
        })}
      </div>
    )
  }
}

class Home extends Component {
  onSubmit = (e) => {
    e.preventDefault()
    let content = e.target.message.value.trim()
    if (content) {
      this.props.onNewEntry({
        content: content
      })
    }
    e.target.reset()
  }
  render() {
    return (
      <div>

        <pre>{ JSON.stringify(this.props.user, null, 3) }</pre>
        <EntryList entries={this.props.entries} />
        <form onSubmit={this.onSubmit}>
          <input type="text" name="message" />
          <button type="submit">YES</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    entries: state.entries.data,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNewEntry: (entry) => {
      return dispatch(entryNew(entry))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
