import React, { Component } from 'react'
import axios from 'axios';

class DashboardAssistantEach extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      phone: '',
      isEditing: false,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onSubmitChange = this.onSubmitChange.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }

  componentDidMount(){
    this.setState({
      name: this.props.assistant.name,
      phone: this.props.assistant.phone
    })
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onDeleteClick(e){
    e.preventDefault();
    const assistantData = this.state.name;


    if (window.confirm("Are you sure? This can not be undone!")) {
      axios 
        .delete('/api/assistants/delete', {data: {name: assistantData} })
        .then(response => {window.location.reload();})
        .catch(err => console.log(err)); 
    }


  }

  onSubmitChange(e)  {
    e.preventDefault();
    const assistantData = {
      name: this.state.name,
      phone: this.state.phone
    };

    axios 
      .post('/api/assistants/update', assistantData)
      .then(response => {window.location.reload();})
      .catch(err => console.log(err));

  }

  onEditClick(e){
    e.preventDefault();
    this.setState({isEditing: !this.state.isEditing});
  }
  
  
  render() {
    const assistant = this.props.assistant;

    const defaultRow = (
      <div className="row shadow bg-white border text-dark p-2 pl-3 col-10 mx-auto">    
        <span className="col-4">{assistant.name}</span> 
        <span className="col-4">{assistant.phone}</span> 
        <span className="col-2"><i className="far fa-edit" onClick={this.onEditClick}></i></span> 
        <span className="col-2"><i className="far fa-trash-alt" onClick={this.onDeleteClick}></i></span>
      </div>)
    

    const editRow = (
      <form className="row shadow bg-white border text-dark p-2 pl-3 col-10 mx-auto">
        <input type="text" className="col-4" defaultValue={assistant.name} name="name" onChange={this.onChange} /> 
        <input type="text" className="col-4" defaultValue={assistant.phone} onChnage={this.onChange} /> 
        <span className="col-2"><i class="far fa-save" onClick={this.onSubmitChange}></i></span>
        <span className="col-2"><i class="fas fa-undo" onClick={this.onEditClick}></i></span> 
      </form>)


    return (
      <div>
          {this.state.isEditing? editRow : defaultRow}
      </div>
    )
  }
}

export default DashboardAssistantEach;