import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AssistantEach from './AssistantEach';
import { getAssistants } from '../../actions/assistantActions';
import Spinner from '../common/Spinner';

class Assistants extends Component {
  componentDidMount(){
    this.props.getAssistants();
  }

  render() {
    const { assistants, loading } = this.props.assistant;
    console.log(assistants);
    let assistantItems;

    if (assistants === null || loading){
      assistantItems = <Spinner />
    } else {
      if (assistants.length > 0){
        assistantItems = assistants.map(assistant => (
          <AssistantEach key={assistant._id} assistant={assistant} />
        ));
      } else {
        assistantItems = <h4>No assistants found...</h4>;
      }
    }

    return (
      <div className="container">
        <h2>Assistant Status</h2>
        {assistantItems}
      </div>
    )
  }
}

Assistants.propTypes = {
  getAssistants: PropTypes.func.isRequired,
  assistant: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  assistant: state.assistant
});

export default connect(mapStateToProps, { getAssistants }) (Assistants);