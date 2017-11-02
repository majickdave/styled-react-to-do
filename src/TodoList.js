import React, { Component } from 'react';
import TodoItems from './TodoItems';
import './TodoList.css';
import fire from './fire';


class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }

  deleteMessage(key){
    fire.database().ref('messages').remove(key);
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <h1>Dave's Notes</h1>
          <h6>It is {new Date().toLocaleTimeString()}.</h6>
      <form onSubmit={this.addMessage.bind(this)}>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input className="mdl-textfield__input" type="text" ref={ el => this.inputEl = el }/>
          <label className="mdl-textfield__label" >Work Work...</label>
        </div>
          <button className="" type="submit"><i className="material-icons">add</i></button>
        <ul>
          <TodoItems entries={ /* Render the list of messages */
                      this.state.messages
                      }
                      delete={this.deleteMessage}/>
        </ul>
      </form>
        </div>
    </div>
    );
    }
    }

export default TodoList;
