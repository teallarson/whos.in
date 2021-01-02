import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProviders } from '../../actions/authActions';

class ProviderList extends Component {
  constructor(){
    super();
    this.state = {
      suitename:'',
      provider: ''
    }

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    this.props.getProviders();
  }

  componentWillReceiveProps(props){
    this.setState({
      provider: props.provider
    });

  }


  onChange(e){

    this.setState({[e.target.name]: e.target.value})
    this.props.handleStateChange(e.target.value);

  }

  render() {
    let providers; 
    let providerList;
    if(this.props.auth){
      providers = this.props.auth.providers;
    }

    if(providers === null){
       providerList = null;
     }
    const providerArray = Object.values(providers);

    providerList = providerArray.map(provider =>
    <option key={provider._id} value={provider._id}>{provider.name}</option>
    )


    return (
      <div className="form-group col-12 mx-auto">
              <label htmlFor="provider-choices">Provider</label>
              <select id="provider-choices" className="custom-select" 
              name="provider" 
              value={this.state.provider}
              onChange={this.onChange}
              >
                {providerList}
              </select>
            </div>
    )
  }
}


ProviderList.propTypes = {
  auth: PropTypes.object.isRequired,
  suite: PropTypes.object.isRequired,
  getProviders: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  suite: state.suite
})


export default connect(mapStateToProps, { getProviders })(ProviderList);
