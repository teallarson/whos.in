import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import {addAssistant} from '../../actions/assistantActions';

class AddAssistant extends Component {
  constructor(){
    super();

    //local state
    this.state = {
      name: '',
      phone:'',
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
    const newAssistant = {
      name: this.state.name,
      phone: this.state.phone
    };

    this.props.addAssistant(newAssistant, this.props.history);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    } 

  }


  render() {
    const {errors} = this.props;
    return (
      <div>
        <div className="card-header" id="add-assistant">
              <h2 className="mb-0">
                <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#add-assistant" aria-expanded="false" aria-controls="add-assistant">
                  Add an Assistant
                </button>
              </h2>
            </div>
            <div id="add-assistant" className="collapse" aria-labelledby="add-assistant" data-parent="#addElements">
              <form noValidate className="card-body" onSubmit={this.onSubmit}>
                <div className="form-group col-10 row mx-auto">
                    <label htmlFor="assistant-name" className="col-sm-2 col-form-label">Assistant Name:</label>
                    <div className="col-sm-10">
                      <input 
                        type="text" 
                        className={classnames("form-control", {'is-invalid' : errors.name})} 
                        id="assistant-name" 
                        aria-describedby="assistant-name" 
                        name="name" 
                        value={this.state.name} 
                        onChange = {this.onChange}/>
                      {errors.name && (
                        <div className = "invalid-feedback">
                          {errors.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group col-10 row mx-auto">
                    <label htmlFor="assistant-phone" className="col-sm-2 col-form-label">Assistant Phone Number:</label>
                    <div className="col-sm-10">
                      <input 
                        type="text" 
                        className={classnames("form-control", {'is-invalid' : errors.phone})} 
                        id="assistant-phone" 
                        aria-describedby="assistant-phone" 
                        name="phone"
                        value={this.state.phone} 
                        onChange = {this.onChange}/>
                      {errors.phone && (
                        <div className = "invalid-feedback">
                          {errors.phone}
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

AddAssistant.propTypes = {
  addAssistant: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, {addAssistant})(AddAssistant);