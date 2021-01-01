import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DashboardSuites from './DashboardSuites';
import DashboardAssistants from './DashboardAssistants';
import DashboardProvider from './DashboardProvider';

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
            <DashboardProvider />
          </div>
          <div className="card-body">
          <div className="pt-3 card-header bg-transparent">
            <h2>Account Dashboard</h2>
          </div>
            <div className="d-flex card-body justify-content-center mx-auto mt-5 my-3">
              <div id ="return-button">
              <Link to="/changepw" className="btn btn-outline-secondary mx-3">Change Password</Link>
              </div>
              <div id ="return-button" className="">
              <Link to="/register" className="btn btn-outline-secondary mx-3">Add Admin Provider</Link>
              </div>
              <div id ="return-button">
              
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
