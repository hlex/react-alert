
import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ReactAlertMessage from 'react-alert-message';
import 'react-alert-message/style.scss';
// import 'react-alert-message/dist/style.css';

// State
function mapStateToProps(state) {
  return {
    alertMessage: state.alertMessage,
    todoLists: state.todo.todoLists,
    sortByStatus: state.todo.sortByStatus
  }
}

// Action
const actions = {
  addTodo: (todo) => ({
    type: 'ADD_TODO',
    todo,
  }),
  deleteTodo: (id) => ({
    type: 'DELETE_TODO',
    id,
  }),
  sortTodoStatus: (status) => ({
    type: 'SORT_TODO_BY_STATUS',
    status,
  }),
  updateTodoStatus: (id, status) => ({
    type: 'UPDATE_TODO_STATUS',
    id,
    status,
  }),
  showAlertMessage: (type, timeout) => ({
    type: 'OPEN_ALERT_MESSAGE',
    message: {
      type: type,
      trxId: '9NCCZVH7ZD3SW',
      processInstance: 'tmsapnpr1 (instance: SFF_node1)Technical Message',
      message: {
        th: 'นายมณฑิษ ธรรมนิรมล',
        en: 'Mr.Mondit Thumniramon',
        technical: 'ccbs error 500.',
      },
    },
  }),
  closeAlertMessage: () => ({
    type: 'CLOSE_ALERT_MESSAGE',
  }),
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends React.Component {
  static propTypes = {
    todoLists: React.PropTypes.array,
    sortByStatus: React.PropTypes.string,
  }
  handleShowAlertMessage = (type, timeout = '') => {
    const { actions } = this.props;
    actions.showAlertMessage(type);
    if (timeout !== '') {
      setTimeout(() => {
        actions.closeAlertMessage();
      }, timeout * 1000);
    }
  }
  render() {
    const { alertMessage, todoLists, sortByStatus, actions } = this.props;
    console.log('App:props', this.props);
    /**
     * Sort Todo list by status
     * @type {Array}
     */
    let todoListBySort = todoLists;
    if (sortByStatus !== 'All') {
      todoListBySort = todoLists.filter((todo) => todo.status === sortByStatus);
    }

    return (
      <div className="container">
        <ReactAlertMessage
          open={alertMessage.open}
          type={alertMessage.type}
          message={alertMessage.message}
          trxId={alertMessage.trxId}
          processInstance={alertMessage.processInstance}
          closeAlertMessage={actions.closeAlertMessage}
        />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="D-3 T-6 M-6 SM-12">
             <button className="button red" onClick={() => this.handleShowAlertMessage('ERROR')}>Show ERROR</button>
          </div>
          <div className="D-3 T-6 M-6 SM-12">
             <button className="button yellow" onClick={() => this.handleShowAlertMessage('WARNING')}>Show WARNING</button>
          </div>
          <div className="D-3 T-6 M-6 SM-12">
            <button className="button green" onClick={() => this.handleShowAlertMessage('SUCCESS')}>Show SUCCESS</button>
          </div>
          <div className="D-3 T-6 M-6 SM-12">
            <button className="button grey" onClick={() => this.handleShowAlertMessage('LOADING')}>Show LOADING</button>
          </div>
          <div className="D-3 T-6 M-6 SM-12">
            <button className="button grey" onClick={() => this.handleShowAlertMessage('LOADING', 3)}>Show LOADING 3s</button>
          </div>          
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}


/**
 * Component button sortby
 * @param  {String} options.sortByStatus
 * @param  {String} options.label
 * @param  {Function} options.onClickButton
 * @return {Component}
 */
const ButtonSortBy = ({ sortByStatus, label, onClickButton}) => {
  return (
    <button
      className={`${sortByStatus === label ? 'button active' : 'button'}`}
      onClick={() => onClickButton(label)}
    >{label}</button>
  )
}

ButtonSortBy.propTypes = {
  sortByStatus: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClickButton: PropTypes.func.isRequired,
}


/**
 * Component todo item
 * @param  {Object} options.todo
 * @param  {Function} options.updateTodoStatus
 * @return {Component}
 */
const TodoItem = ({ todo, updateTodoStatus, deleteTodo }) => {
  return (
    <div className="todo-item">
      <div className="input-checkbox">
        <label>
          <input type="checkbox" name="checkbox" checked={todo.status === 'Completed'} onChange={() => updateTodoStatus(todo.id, todo.status)} />
          <span className="input"></span>
        </label>
      </div>
      {
        todo.status === 'Active'
        ? todo.label
        : <del>{todo.label}</del>
      }
      <div className="delete" onClick={deleteTodo}>✘</div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  updateTodoStatus: PropTypes.func.isRequired,
}
