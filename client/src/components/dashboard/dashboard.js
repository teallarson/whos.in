import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DashboardSuites from './DashboardSuites';
import DashboardAssistants from './DashboardAssistants';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="container card" id="dashboard-card">
          <div className="pt-3 card-header bg-transparent">
            <h3>  </h3>
            <h2>Provider Dashboard</h2>
          </div>
          <div className="card-body">
            <DashboardAssistants />
            <DashboardSuites />
          </div>
          <div className="card-body">
          <div className="pt-3 card-header bg-transparent">
            <h2>Account Dashboard</h2>
          </div>
            <div className="d-flex justify-content-around mx-auto mt-5 my-3">
              <div id ="return-button">
              <Link to="/changepw" className="btn btn-outline-secondary mx-auto">Change Password</Link>
              </div>
              <div id ="return-button" className="">
              <Link to="/login" className="btn btn-outline-secondary">Add Admin Provider</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
