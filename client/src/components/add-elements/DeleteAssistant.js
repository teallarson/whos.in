import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAssistant } from '../../actions/assistantActions';
import Spinner from '../common/Spinner';
import AssistantActions from '../../actions/assistantActions';

//TO DO: IMPORT LIST OF PROVIDERS FOR A DROPDOWN!

class DeleteAssistant extends Component {
  onDeleteClick(e){
    this.props.deleteAssistant();
  }

  render(){
    const { provider } = this.props.provider;

  }
}