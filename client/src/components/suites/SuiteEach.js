import React, { Component } from 'react'
import axios from 'axios';

class SuiteEach extends Component {
  constructor(){
    super();
    this.state = {
      suitename: '',
      status: '',
      provider:'',
      notes:'',
      errors:{}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    this.setState({
      suitename: this.props.suite.suitename
    })
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    const suiteData = {
      suitename: this.state.suitename,
      status: this.state.status,
      provider: this.state.provider,
      notes: this.state.notes
    }
    
    axios
      .post('api/suites/update', suiteData)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}));
  }

  
  render() {
    const suite = this.props.suite;
    let suiteNotes = '';
    if (suite.notes.length<1){
      suiteNotes = "Please note any needed supplies, repairs, etc."
    } else {
      suiteNotes = suite.notes
    }

    return (
      <div>
        <form className="col-lg-9 col-md-4 col-sm-9 mx-auto mb-5 mt-3 custom-form" onSubmit={this.onSubmit}>
            <div className="form-group col-6 mx-auto">
              <label htmlFor="suite-availability-choices">Available?</label>
              <select id="suite-availability-choices" className="custom-select" name="status" 
              defaultValue={suite.status}
              onChange={this.onChange}>
                <option value="1">Heads Up</option>
                <option value="2">Labor in Progress</option>
                <option value="3">Postpartum</option>
                <option value="4">Cleaning</option>
                <option value="5">Available</option>
              </select>
            </div>

            <div className="form-group col-6 mx-auto">
              <label htmlFor="provider-choices">Provider</label>
              <select id="provider-choices" className="custom-select" name="provider" 
              defaultValue={suite.provider}
              onChange={this.onChange}>
                <option value="1">Terah</option>
                <option value="2">Brittany</option>
                <option value="3">Jenn</option>
                <option value="4">Kate</option>
              </select>
            </div>

            <div className="form-group col-6 mx-auto">
              <label htmlFor="suite-notes">Notes</label>
              <textarea 
              className="form-control" id="suite-notes" 
              placeholder={suiteNotes} 
              value={this.state.notes}
              onChange={this.onChange}
              name="notes"/>
            </div>
            <div className="container mx-auto d-flex justify-content-around align-items-center mt-4">
                  <button
                    type="submit"
                    className="btn custom-button"
                  >
                    Save Update
                  </button>
                </div>
        </form>
      </div>
    )
  }
}

export default SuiteEach;