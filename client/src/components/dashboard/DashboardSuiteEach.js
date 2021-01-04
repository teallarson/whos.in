import React, { Component } from 'react'
import axios from 'axios';

class DashboardSuiteEach extends Component {
  constructor(){
    super();
    this.state = {
      suitename: '',
      errors: {}
    }

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount(){
    this.setState({
      suitename: this.props.suite.suitename,
    })
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

  render() {

    const suite = this.props.suite;

    const defaultRow = (
      <div className="row shadow bg-white border text-dark p-2 pl-3 col-10 mx-auto">    
        <span className="col-12 col-md-4">{suite.suitename}</span> 
        <span className = "col-4"> </span>
        <span className="col-12 col-md-4"><i className="far fa-trash-alt" onClick={this.onDeleteClick}></i></span>
      </div>)
    
    return (
      <div>
          {defaultRow}
      </div>
    )
  }
}

export default DashboardSuiteEach;