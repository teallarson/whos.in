import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateAssistant } from '../../actions/assistantActions';

class AssistantEach extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      phone: '',
      status: '',
      notes:'',
      errors:{}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentDidMount(){
  //   this.props.
  // }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    const assistantData = {
      status: this.state.status,
      notes: this.state.notes
    };
    this.props.updateAssistant(assistantData, this.props.history)
  }


  render() {
    const assistant = this.props.assistant;
    console.log(assistant);
    return (
      <div>
        <form className="card col-lg-3 col-md-4 col-sm-9" onSubmit={this.onSubmit}>
          <div className="card-header">
            <p><em>{assistant.name}</em></p>
            <p>{assistant.phone}</p>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="assistant-availability-choices">Status</label>
              <select id="assistant-availability-choices" className="custom-select" name="status" 
              defaultValue={assistant.status}>
                <option value="1">Available</option>
                <option value="2">Unavailable</option>
                <option value="3">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="assistant-notes">Notes</label>
              <textarea className="form-control" id="assistant-notes" placeholder={assistant.notes} 
              name="notes" />
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
    );
  }
}

AssistantEach.propTypes = {
  assistant: PropTypes.object.isRequired,
  updateAssistant: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  assistant: state.assistant,
})

export default connect(mapStateToProps, { updateAssistant })(AssistantEach);