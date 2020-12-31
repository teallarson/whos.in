import React, { Component } from "react";

// import { withRouter } from "react-router-dom";
import classnames from "classnames";
import axios from 'axios';

class DeleteProvider extends Component {
  constructor() {
    super();
    //Local state
    this.state = {
      email: "",
      email2: "",
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
    const providerData = {
      email: this.state.email,
      email2: this.state.email2
    };

      axios 
        .delete(
          'api/providers/delete',
          {data: providerData})
        .then(window.location = "/dashboard")
        .catch((err) => console.log(err));
  }
  

  render() {
    const { errors } = this.state;
    return (
      <div className="changePassword">
        <div className="container card-body shadow mt-5 col-lg-6" id="login-card">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="display-5 p-2 shadow mb-3 col-8 mx-auto text-center" id="changepw-label">Delete Provider</h2>
              
              <form noValidate className="col-10 mx-auto mt-4" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg shadow", {
                      "is-invalid": errors.email,
                    })}
                    placeholder="User's Email Address"
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
                    type="email"
                    className={classnames("form-control form-control-lg shadow", {
                      "is-invalid": errors.email2,
                    })}
                    placeholder="Confirm User's Email Address"
                    name="email2"
                    value={this.state.email2}
                    onChange={this.onChange}
                  />
                  {errors.email2 && (
                    <div className="invalid-feedback">{errors.email2}</div>
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

export default DeleteProvider;
