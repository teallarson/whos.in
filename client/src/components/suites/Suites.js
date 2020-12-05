import React, { Component } from 'react'
import SuiteEach from './SuiteEach';

class Suites extends Component {
  render() {
    return (
      <div className="container">
        <h2>Suite Status</h2>
        <SuiteEach />
      </div>
    )
  }
}

export default Suites;
