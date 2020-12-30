import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { registerProvider } from '../../actions/authActions';

class Register extends Component{
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    const newProvider = {
      name: this.state.name,
      email: this.state.email.toLowerCase(),
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerProvider(newProvider, this.props.history);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.errors){
      this.setState({ errors: nextProps.errors });
    }
  }

  render(){
    const { errors } = this.state;

    return(
      <div className="register">
        <div className="container card-body shadow mt-5 col-lg-6" id="login-card">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="display-5 p-2 shadow mb-3 col-8 mx-auto text-center" id="changepw-label">Register a Provider</h2>
              
              <form noValidate className="col-10 mx-auto mt-4" onSubmit={this.onSubmit}>
              <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg shadow", {
                      "is-invalid": errors.name,
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
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
                    placeholder="Password"
                    name="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control shadow form-control-lg", {
                      "is-invalid": errors.password2,
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
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

Register.propTypes = {
  registerProvider: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { registerProvider })(Register);