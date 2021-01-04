import React, { Component } from 'react'
import axios from 'axios';
import ProviderList from './ProviderList';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

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
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  componentDidMount(){
    this.setState({
      suitename: this.props.suite.suitename,
      status: this.props.suite.status,
      provider: this.props.suite.provider,
      notes: this.props.suite.notes
    })
    if(!this.props.suite.notes){
      this.setState({
        notes: 'Please note any needed repairs or supplies.'
      })
    }
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

  handleStateChange(value){
    this.setState({provider: value})
  }
  
  render() {
    const suite = this.props.suite;

    return (
      <div>
        <form className="col-md-9 col-xs-12 mx-auto mb-5 mt-3 custom-form card py-4" id="assistant-card"  onSubmit={this.onSubmit}>
        <div className="card-header col-6 mx-auto pt-4 m-1" id="assistant-name-box">
              <p className="shadow text-break">{suite.suitename}</p>
            </div>
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

            <ProviderList handleStateChange={this.handleStateChange} suitename={this.state.suitename} provider={this.state.provider}/>
            {/* <div className="form-group col-12 mx-auto">
              <label htmlFor="provider-choices">Provider</label>
              <select id="provider-choices" className="custom-select" 
              name="provider" 
              defaultValue={suite.provider}
              onChange={this.onChange}
              >
               <ProviderList />
              </select>
            </div> */}

            <div className="form-group col-12 mx-auto">
              <label htmlFor="suite-notes">Notes</label>
              <textarea 
              className="form-control" id="suite-notes" 
              placeholder={this.state.notes} 
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

// SuiteEach.propTypes = {
//   auth: PropTypes.object.isRequired,
//   suite: PropTypes.object.isRequired
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   suite: state.suite
// })

export default SuiteEach;