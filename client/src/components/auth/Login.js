import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginProvider } from '../../actions/authActions';

class Login extends Component {
  constructor() {
    super();
    //local state of the component
    this.state = {
      email: '',
      password: '',
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
    let email = this.state.email;
    email = email.toLowerCase();

    const provider = {
      email: email,
      password: this.state.password,
    };

    this.props.loginProvider(provider);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {

      this.props.history.push('/dashboard');

    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {

      this.props.history.push('/dashboard');

    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container card-body align-items-center mx-auto col-lg-6 shadow" id="login-card">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 id="login" className="display-4 text-center">
                Log In
              </h1>
                <p className="lead shadow p-2" id="login-label">Log In to Whos.In Admin Portal </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
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
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="container mx-auto mt-4">
                  <div className="row">
                    <button
                      type="submit"
                      className="col mx-auto btn btn-lg btn-light btn-outline-dark align-self-center p-3 m-1 col-5 custom-button text-nowrap"
                    >
                      Submit
                    </button>
                  </div>
                  <div className="row">
                    <Link to="/forgotPassword" className="col mt-3" id="forgot-pw-link">
                      <p>
                        Forgot Password?
                      </p>
                      {/* </button> */}
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginProvider: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { loginProvider })(Login);
