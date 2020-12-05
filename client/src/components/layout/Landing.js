import React, { Component } from 'react';
import AddElements from '../add-elements/AddElements';
import Assistants from '../assistants/Assistants';
import Suites from '../suites/Suites';

 class Landing extends Component {
  render() {
    return (
      <div>
        <div>
          <Suites />
          <Assistants />
          <AddElements />
        </div>
      </div>
    )
  }
}

export default Landing
