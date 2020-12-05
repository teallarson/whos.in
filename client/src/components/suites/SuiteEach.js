import React, { Component } from 'react'
import axios from 'axios';

class SuiteEach extends Component {
  constructor(){
    super();
    this.state = {
      status: '',
      provider:'',
      notes:'',
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
    const suiteUpdate = {
      status: this.state.status,
      provider: this.state.provider,
      notes: this.state.notes
    }

    axios
      .post('api/suites/update', suiteUpdate)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}));
  }
  
  render() {
    return (
      <div>
        <form className="card col-lg-9 col-md-4 col-sm-9 mx-auto mb-5 mt-3">
          <div className="card-body">
            <div className="form-group col-6 mx-auto">
              <label htmlFor="suite-availability-choices">Available?</label>
              <select id="suite-availability-choices" className="custom-select" name="status" defaultValue="default">
                <option value="Heads Up">Heads Up</option>
                <option value="Labor in Progress">Labor in Progress</option>
                <option value="Postpartum">Postpartum</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Available">Available</option>
              </select>
            </div>

            <div className="form-group col-6 mx-auto">
              <label htmlFor="provider-choices">Provider</label>
              <select id="provider-choices" className="custom-select" name="provider" defaultValue="default">
                <option value="Terah">Terah</option>
                <option value="Brittany">Brittany</option>
                <option value="Jenn">Jenn</option>
                <option value="Kate">Kate</option>
              </select>
            </div>

            <div className="form-group col-9 mx-auto">
              <label htmlFor="suite-notes">Notes</label>
              <textarea className="form-control" id="suite-notes" placeholder="Please note any needed supplies, repairs, etc." name="notes"/>
            </div>
            <div className="container mx-auto d-flex justify-content-around align-items-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-outline-secondary"
                  >
                    Save Update
                  </button>
                </div>
          </div>
        </form>
      </div>
    )
  }
}

export default SuiteEach;