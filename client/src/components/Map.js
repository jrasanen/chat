import React from 'react'
import GoogleApiComponent from './GoogleApiComponent'

const Container = React.createClass({
  render: function() {
    return <div>Google</div>;
  }
})
export default GoogleApiComponent({
  apiKey: 'AIzaSyAw_AnX4UA9zNazcqXs3mCYSMif6mw0uH4'
})(Container)
