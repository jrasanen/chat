import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Index extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <div>
        <h1>mlem</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
