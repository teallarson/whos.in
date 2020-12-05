import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';

class AddSuite extends Component {
  constructor(){
    super();

    //local state
    this.state = {
      suitename: '',
      errors:{}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    const newSuite = {
      suitename: this.state.suitename
    }

    axios 
      .post('api/suites/add', newSuite)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}));
  }

  render() {
    const {errors} = this.state;
    return (
      <div>
            <div className="card-header" id="addSuite">
              <h2 className="mb-0">
                <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#addSuite" aria-expanded="true" aria-controls="addSuite">
                  Add a Suite
                </button>
              </h2>
            </div>

            <div id="addSuite" className="collapse" aria-labelledby="headingOne" data-parent="#addElements">
              <form noValidate 
                className="card-body" 
                onSubmit={this.onSubmit}>
                <div className="form-group col-10 row mx-auto">
                  <label htmlFor="suite-name" className="col-sm-2 col-form-label">Suite Name:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className={classnames("form-control", {'is-invalid': errors.suitename})} 
                      id="suite-name" 
                      aria-describedby="suite-name" 
                      name="suitename" 
                      value={this.state.suitename} 
                      onChange = {this.onChange}/>
                      {errors.suitename && (
                        <div className = "invalid-feedback">
                          {errors.suitename}
                        </div>
                      )}
                  </div>
                </div>

                <div className="container mx-auto d-flex justify-content-around align-items-center">
                  <button
                    type="submit"
                    className="btn btn-outline-secondary"
                  >
                    Add
                  </button>
                </div>

              </form>
            </div>
        </div>
    )
  }
}

export default AddSuite;