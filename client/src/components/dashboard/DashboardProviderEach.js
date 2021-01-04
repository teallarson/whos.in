import React, { Component } from 'react'
import axios from 'axios';

class DashboardProviderEach extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      errors: {}
    }

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount(){
    this.setState({
      name: this.props.provider.name,
    })
  }

  onDeleteClick(e){
    e.preventDefault();
    const providerData = this.state.name;

    if (window.confirm("Are you sure? This can not be undone!")) {
      axios 
        .delete('/api/providers/delete', {data: {name: providerData} })
        .then(response => {window.location.reload();})
        .catch(err => console.log(err)); 
    }
  }
  
  render() {
    const provider = this.props.provider;

    const defaultRow = (
      <div className="row shadow bg-white border text-dark p-2 pl-3 col-10 mx-auto">    
        <span className="col-12 col-md-8">{provider.name}</span> 
        
        <span className="col-12 col-md-4"><i className="far fa-trash-alt" onClick={this.onDeleteClick}></i></span>
      </div>)

    return (
      <div>
          {defaultRow}
      </div>
    )
  }
}

export default DashboardProviderEach;