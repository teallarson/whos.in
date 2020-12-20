import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { changePassword } from "../../actions/authActions";

class ChangePassword extends Component {
  constructor() {
    super();
    //Local state
    this.state = {
      email: "",
      oldPassword: "",
      newPassword: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const provider = {
      email: this.state.email,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      newPassword2: this.state.newPassword2
    };

    this.props.changePassword(provider, this.props.history);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="changePassword">
        <div className="container card-body shadow mt-5 col-lg-6" id="login-card">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="display-5 p-2 shadow mb-3 col-8 mx-auto text-center" id="changepw-label">Change password</h2>
              
              <form noValidate className="col-10 mx-auto mt-4" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg shadow", {
                      "is-invalid": errors.email,
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg shadow", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Old Password"
                    name="oldPassword"
                    value={this.state.oldPassword}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("mt-5 form-control shadow form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="New Password"
                    name="newPassword"
                    value={this.state.newPassword}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg shadow", {
                      "is-invalid": errors.newPassword2,
                    })}
                    placeholder="Confirm New Password"
                    name="newPassword2"
                    value={this.state.newPassword2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-lg btn-outline-dark align-self-center col-5 custom-button mt-2">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ChangePassword.propTypes = {
  
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {changePassword}) (withRouter(ChangePassword));
