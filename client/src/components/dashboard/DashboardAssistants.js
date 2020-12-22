import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAssistants, addAssistant} from '../../actions/assistantActions';
import Spinner from '../common/Spinner';
import DashboardAssistantEach from './DashboardAssistantEach';

class DashboardAssistants extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      phone: '',
      isAdding: false,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  componentDidMount(){
    this.props.getAssistants();
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onAddClick(e){
    e.preventDefault();
    this.setState({isAdding: !this.state.isAdding})
  }

  onSubmitClick(e){
    e.preventDefault();
    this.props.addAssistant();
  }

  render() {
    const { assistants, loading } = this.props.assistant;
    let assistantItems;

    if (!assistants || loading){
      assistantItems = <Spinner />
    } else {
      if (assistants.length > 0){
        assistantItems = 
        assistants.map((assistant) => (
          <DashboardAssistantEach key={assistant._id} assistant = {assistant} />
        ));
      } else {
        assistantItems = <h4>No assistants found</h4>;
      }
    }

    const addRow = (
      <form className="row shadow bg-white border text-dark p-2 pl-3 col-10 mx-auto">
        <input type="text" className="col-4" defaultValue="Assistant Name" name="name" onChange={this.onChange} /> 
        <input type="text" className="col-4" defaultValue="Assistant Phone Number" onChange={this.onChange} /> 
        <span className="col-2"><i class="far fa-save" onClick={this.onSubmitClick}></i></span>
        <span className="col-2"><i class="fas fa-undo" onClick={this.onAddClick}></i></span> 
      </form>
    )

    const addButton = (
      <div className="row shadow bg-white border text-dark p-2 pl-3 col-10 mx-auto">  
        <div className="col-4">
          <button className="btn mx-auto" onClick={this.onAddClick}><i class="fas fa-plus pr-2"></i>Add Assistant</button>   
        </div>
      </div>
    )

    return (
      <div>
        <div className="card shadow p-2 mx-auto m-2" id="category-card">
          <div className="card-header mx-auto my-auto shadow col-10">
            <h3>Assistants</h3>
          </div>
          <div className="card-body justify-content-center">
            {assistantItems}
            {this.state.isAdding ? addRow : addButton}
          </div>
        </div>
      </div>
    )
  }
}

DashboardAssistants.propTypes = {
  getAssistants: PropTypes.func.isRequired,
  assistant: PropTypes.object.isRequired,
  addAssistant: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  assistant: state.assistant,
  auth: state.auth
})



export default connect (mapStateToProps, { getAssistants, addAssistant })(DashboardAssistants);