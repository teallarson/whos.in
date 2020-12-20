import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class ForgotPassword extends Component {
  constructor() {
    super();
    //Local state
    this.state = {
      email: '',
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
    };

    axios
      .post('/api/providers/forgotPassword', provider)
      .then((res) => console.log(res.data))
      .catch((err) => this.setState({ errors: err.response.data }));
  }
  render() {
    const { errors } = this.state;
    return (
      <div className='container card-body align-items-center mx-auto col-lg-6 shadow' id="login-card">
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-5 text-center' id="login">Forgot password</h1>
            <p className='lead shadow p-2 text-center' id="login-label">Enter email address</p>
            <form noValidate
            onSubmit={this.onSubmit}>
              <div className='form-group'>
                <input
                  type='email'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email,
                  })}
                  placeholder='Email Address'
                  name='email'
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {errors.email && (
                  <div className='invalid-feedback'>{errors.email}</div>
                )}
              </div>
              <button type='submit' className='btn btn-lg btn-light btn-outline-dark align-self-center p-3 custom-button mt-4'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default ForgotPassword;
