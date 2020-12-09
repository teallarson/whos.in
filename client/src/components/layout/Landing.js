import React, { Component } from 'react';
import Assistants from '../assistants/Assistants';
import Suites from '../suites/Suites';

 class Landing extends Component {
  render() {
    return (
      <div>
          <Suites />
          <Assistants />
      </div>
    )
  }
}

export default Landing
