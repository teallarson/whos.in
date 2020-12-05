import React, { Component } from 'react'
import AddAssistant from './AddAssistant';
import AddSuite from './AddSuite';

class AddElements extends Component {

  render() {
    let addSuite = (<div><AddSuite/></div>)

    let addAssistant = (<div><AddAssistant/></div>)

    return (
      <div>
      <div className="container m-5 col-9 mx-auto">
        <div className="accordion" id="addElements">
          <div className="card">
            {addSuite}
          </div>
          <div className="card">
            {addAssistant}
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default AddElements;