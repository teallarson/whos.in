import React, { Component } from "react";
import { connect } from 'react-redux';
import { getProviders, registerProvider } from '../../actions/authActions';
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import DashboardProviderEach from './DashboardProviderEach';

class DashboardProvider extends Component {
  constructor() {
    super();
    //Local state
    this.state = {
      name: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }
  
  componentDidMount(){
    this.props.getProviders();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onAddClick(e){
    e.preventDefault();
    this.setState({isAdding: !this.state.isAdding})
  }

  onSubmitClick(e){
    e.preventDefault();

    const providerData = {
      name: this.state.name
    };
    this.props.registerProvider(providerData);
    window.location.reload();
  }
  

  render() {
    const { providers, loading } = this.props.auth;
    let providerItems;

    if (!providers || loading){
      providerItems = <Spinner />
    } else {
      if (providers.length > 0){
        providerItems = 
        providers.map((provider) => (
          <DashboardProviderEach key={provider._id} provider = {provider} />
        ));
      } else {
        providerItems = <h4>No providers found.</h4>;
      }
    }

    const addRow = (
      <form className="row shadow bg-white border text-dark p-2 pl-3 col-10 mx-auto">
        <input type="text" className="col-4" defaultValue="Provider Name" name="name" onChange={this.onChange} /> 
        <span className="col-2"><i className="far fa-save" onClick={this.onSubmitClick}></i></span>

        <span className="col-2"><i className="fas fa-undo" onClick={this.onAddClick}></i></span> 
      </form>
    )

    const addButton = (
      <div className="row shadow bg-white border text-dark p-2 pl-3 col-10 mx-auto">  
        <div className="col-4">
          <button className="btn mx-auto" onClick={this.onAddClick}><i className="fas fa-plus pr-2"></i>Add Provider</button>   
        </div>
      </div>
    )

    return (
      <div>
        <div className="card shadow p-2 mx-auto m-2" id="category-card">
          <div className="card-header mx-auto my-auto shadow col-10">
            <h3>Providers</h3>
          </div>
          <div className="card-body justify-content-center">
            {providerItems}
            {this.state.isAdding ? addRow : addButton}
          </div>
        </div>
      </div>
    )

  }
}

DashboardProvider.propTypes = {
  getProviders: PropTypes.func.isRequired,
  registerProvider: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  provider: state.provider
})

export default connect(mapStateToProps, { getProviders, registerProvider })(DashboardProvider);