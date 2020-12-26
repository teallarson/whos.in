import React, { Component } from 'react'
import axios from 'axios';

class DashboardSuiteEach extends Component {
  constructor(){
    super();
    this.state = {
      suitename: '',
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
      suitename: this.props.suite.suitename,
    })
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onDeleteClick(e){
    e.preventDefault();
    const suiteData = this.state.suitename;


    if (window.confirm("Are you sure? This can not be undone!")) {
      axios 
        .delete('/api/suites/delete', {data: {suitename: suiteData} })
        .then(response => {window.location.reload();})
        .catch(err => console.log(err)); 
    }


  }

  onSubmitChange(e)  {
    e.preventDefault();
    const suiteData = {
      suitename: this.state.suitename,
    };

    axios 
      .post('/api/suites/update', suiteData)
      .then(response => {window.location.reload();})
      .catch(err => console.log(err));

  }

  onEditClick(e){
    e.preventDefault();
    this.setState({isEditing: !this.state.isEditing});
  }

  render() {

    const suite = this.props.suite;

    const defaultRow = (
      <div className="row shadow bg-white border text-dark p-2 pl-3 col-10 mx-auto">    
        <span className="col-4">{suite.suitename}</span> 
        <span className = "col-4"> </span>
        <span className="col-2"><i className="far fa-edit" onClick={this.onEditClick}></i></span> 
        <span className="col-2"><i className="far fa-trash-alt" onClick={this.onDeleteClick}></i></span>
      </div>)
    

    const editRow = (
      <form className="row shadow bg-white border text-dark p-2 pl-3 col-10 mx-auto">
        <input type="text" className="col-4" defaultValue={suite.suitename} name="suitename" onChange={this.onChange} /> 
        <span className = "col-4"> </span>
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

export default DashboardSuiteEach;