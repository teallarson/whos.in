import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAssistants, addAssistant} from '../../actions/assistantActions';
import Spinner from '../common/Spinner';
import DashboardAssistantEach from './DashboardAssistantEach';

class DashboardAssistants extends Component {
  componentDidMount(){
    this.props.getAssistants();
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

    return (
      <div>
        <div className="card shadow p-2 mx-auto m-2" id="category-card">
          <div className="card-header mx-auto my-auto shadow col-10">
            <h3>Assistants</h3>
          </div>
          <div className="card-body justify-content-center">
            {assistantItems}
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