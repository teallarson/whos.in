import React, { Component } from 'react';
import letterhead from '../../img/whosinlogo.png'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutProvider } from '../../actions/authActions';

class Header extends Component {

  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutProvider();
  }

  

  render() {
    const {isAuthenticated} = this.props.auth;

    const logoutButton = (
      <div id ="return-button" className="mt-3 d-flex " onClick={this.onLogoutClick.bind(this)}>
        <div className="col-8 col-md-2 btn btn-outline-secondary col-2">
        Log Out
        </div>
      </div>  
    )
    
    const loginButton = (
      <div id ="return-button" className="mt-3 d-flex">
        <Link to="/login" className="btn btn-outline-secondary col-8 col-md-2">Log in to Provider Portal</Link>
      </div>  
    )

    



    return (
      <div>
        <div id="birth-cottage-letterhead" className="mb-4 mt-4 mx-auto img-fluid">
          <img src={letterhead} alt="Birth Cottage letterhead" className="mx-auto"/>
          <div id="d-flex row">
            <div id ="return-button" className="mt-3 d-flex">
              <Link to="/" className="btn btn-outline-secondary col-8 col-md-2">Back to Main Page</Link>
            </div>
            {isAuthenticated? logoutButton : loginButton}
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  logoutProvider: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});


export default connect(mapStateToProps, {logoutProvider})(Header);