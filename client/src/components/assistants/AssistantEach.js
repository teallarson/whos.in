import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  componentDidMount(){
    this.setState({
      name: this.props.assistant.name,
      phone: this.props.assistant.phone,
      status: this.props.assistant.status
    })
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    const assistantData = {
      name: this.state.name,
      phone: this.state.phone,
      status: this.state.status,
      notes: this.state.notes
    };

    axios
    .post('/api/assistants/update' , assistantData)
    .then(res => console.log(res.data))
    .catch(err  => console.log(err));
    
  }


  render() {
    const assistant = this.props.assistant;

    return (
      <div>
        <div className="col">
          <form className="card mb-4 mx-auto custom-form" 
          onSubmit={this.onSubmit}
            >
            <div className="card-header pt-4" id="assistant-name-box">
              <p>{assistant.name}</p>
              <p> {assistant.phone}</p>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="assistant-availability-choices">Status</label>
                <select id="assistant-availability-choices" className="custom-select" 
                name="status" 
                defaultValue={assistant.status}
                onChange={this.onChange}
                >
                  <option value="1">Available</option>
                  <option value="2">Unavailable</option>
                  <option value="3">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="assistant-notes">Notes</label>
                <textarea 
                className="form-control" 
                id="assistant-notes" 
                placeholder={assistant.notes} 
                value={this.state.notes}
                onChange={this.onChange}
                name="notes" />
              </div>
              <div className="container mx-auto d-flex justify-content-around align-items-center mt-4">
                <button
                  type="submit"
                  className="btn custom-button"
                >
                  Save Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AssistantEach;
