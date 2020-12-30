import React, { Component } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProviders } from '../../actions/authActions';

class SuiteEach extends Component {
  constructor(props){
    super(props);
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
      suitename: this.props.suite.suitename,
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
    if (!suite.notes){
      suiteNotes = "Please note any needed supplies, repairs, etc."
    } else {
      suiteNotes = suite.notes
    }

    const { loading } = this.props.auth;
    const providers = this.props.auth.providers;
    let providerList = [];

    if(providers === null || loading){
      providerList = null;
    }

    const providerArray = Object.values(providers);
    console.log(providerArray);

    providerList = providerArray.map(provider =>
      <option key={provider._id} value={provider._id}>{provider.name}</option>
      )
    
      console.log("provider = " + suite.provider);
    return (
      <div>
        <form className="col-md-9 col-xs-12 mx-auto mb-5 mt-3 custom-form card py-4" id="assistant-card"  onSubmit={this.onSubmit}>
            <div className="form-group col-12 mx-auto">
              <label htmlFor="suite-availability-choices">Available?</label>
              <select id="suite-availability-choices" className="col-12 custom-select" name="status" 
              defaultValue={suite.status}
              onChange={this.onChange}>
                <option value="1">Heads Up</option>
                <option value="2">Labor in Progress</option>
                <option value="3">Postpartum</option>
                <option value="4">Cleaning</option>
                <option value="5">Available</option>
              </select>
            </div>

            <div className="form-group col-12 mx-auto">
              <label htmlFor="provider-choices">Provider</label>
              <select id="provider-choices" className="custom-select" 
              name="provider" 
              defaultValue={suite.provider}
              onChange={this.onChange}
              value={this.provider}>

               {providerList}
              </select>
            </div>

            <div className="form-group col-12 mx-auto">
              <label htmlFor="suite-notes">Notes</label>
              <textarea 
              className="form-control" id="suite-notes" 
              placeholder={suiteNotes} 
              value={this.state.notes}
              onChange={this.onChange}
              name="notes"/>
            </div>
            <div className="container mx-auto d-flex justify-content-around align-items-center mt-5">
              <button type="submit" className="btn shadow custom-button btn-outline-dark">
                Save Update
              </button>
            </div>
        </form>
      </div>
    )
  }
}

SuiteEach.propTypes = {
  getProviders: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { getProviders })(SuiteEach);