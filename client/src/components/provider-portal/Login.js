import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginProvider } from '../../actions/providerActions';

class Login extends Component {
  constructor(){
    super();
    //localstate
    this.state = {
      email: '',
      password: '',
      errors: {}
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
      password: this.state.password
    };

    this.props.loginProvider(provider);
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/provider-portal');
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.auth.isAuthenticated){
      this.props.history.push('/provider-portal');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  render(){
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container align-items-center mx-auto col-lg-6">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 id="login" className="display-4 text-center">
                Log In
              </h1>
              <p className="lead text-center">
                <p className="lead text-muted">Log In to Connexion </p>
              </p>

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

                <div className="container mx-auto d-flex justify-content-around align-items-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-lg btn-light bg-light btn-outline-dark align-self-center p-3 col-5"
                  >
                    Submit
                  </button>
                  <Link to="/forgotPassword">
                    <button
                      type="button"
                      class="btn btn-default btn-lg btn-block"
                    >
                      Forgot Password?
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

Login.propTypes = {
  loginProvider: propTypes.func.isRequired,
  errors: propTypes.func.isRequired,
  auth: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { loginProvider })(Login);