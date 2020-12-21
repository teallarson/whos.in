import React, { Component } from 'react';
import DashboardSuites from './DashboardSuites';
import DashboardAssistants from './DashboardAssistants';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="container card" id="dashboard-card">
          <div className="pt-3 card-header bg-transparent">
            <h2>Provider Dashboard</h2>
          </div>
          <div className="card-body">
            <DashboardAssistants />
            <DashboardSuites />
          </div>
        </div>
      </div>
    )
  }
}
