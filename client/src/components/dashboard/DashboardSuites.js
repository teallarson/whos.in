import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSuites, addSuite } from '../../actions/suiteActions';
import Spinner from '../common/Spinner';
import DashboardSuiteEach from './DashboardSuiteEach';

class DashboardSuites extends Component {
  constructor(){
    super();
    this.state = {
      suitename: '',
      isAdding: false,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  componentDidMount(){
    this.props.getSuites();
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onAddClick(e){
    e.preventDefault();
    this.setState({isAdding: !this.state.isAdding});
  }

  onSubmitClick(e){
    e.preventDefault();
    const suiteData = {
      suitename: this.state.suitename
    };
    this.props.addSuite(suiteData);
    window.location.reload();
  }

  render() {
    const { suites, loading } =  this.props.suite;
    let suiteItems;
    
    if(!suites || loading){
      suiteItems = <Spinner />
    } else {
      if (suites.length > 0){
        suiteItems = 
        suites.map((suite) => (
          <DashboardSuiteEach key={suite._id} suite = {suite}/>
        ));
      } else {
        suiteItems = <h4>No Suites Found.  Add your first suite to get started!</h4>
      }
    }

    const addRow = (
      <form className="row shadow bg-white border text-dark p-2 pl-3 col-10 mx-auto">
        <input type="text" className="col-6" defaultValue="Assistant Name" name="suitename" onChange={this.onChange} /> 
        <span className="col-2"><i className="far fa-save" onClick={this.onSubmitClick}></i></span>
        <span className="col-2"><i className="fas fa-undo" onClick={this.onAddClick}></i></span> 
      </form>
    )

    const addButton = (
      <div className="row shadow bg-white border text-dark p-2 pl-3 col-10 mx-auto">  
        <div className="">
          <button className="btn mx-auto" onClick={this.onAddClick}><i className="fas fa-plus pr-2"></i>Add Suite</button>   
        </div>
      </div>
    )
    
    
    return (
      <div>
        <div className="card shadow p-2 mx-auto m-2" id="category-card">
          <div className="card-header mx-auto my-auto shadow col-10">
            <h3>Suites</h3>
          </div>
          <div className="card-body justify-content-center">
            {suiteItems}
            {this.state.isAdding ? addRow : addButton}
          </div>
        </div>
      </div>
    )
  }
}

DashboardSuites.propTypes = {
  getSuites: PropTypes.func.isRequired,
  suite: PropTypes.object.isRequired,
  addSuite: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  suite: state.suite,
  auth: state.auth
})

export default connect (mapStateToProps, { getSuites, addSuite })(DashboardSuites);