import React, { Component } from 'react';
import Assistants from '../assistants/Assistants';
import Suites from '../suites/Suites';

 class Landing extends Component {
  render() {
    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-xs-12 col-lg-5">
            <Suites />
          </div>
          <div className="mx-auto col-xs-12 col-lg-7">
            <Assistants />
          </div>
        </div>
      </div>
    )
  }
}

export default Landing
