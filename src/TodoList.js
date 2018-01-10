import React, { Component } from 'react';
import TodoItems from './TodoItems';
import './TodoList.css';
import fire from './fire';


class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      textInput: ''
     }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = {text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }

  addItem(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    // const items = this.state.messages;
    // items.push(this.state.textInput);
    // this.setState({messages: items });
    fire.database().ref('messages').push( this.state.textInput );
    this.setState({textInput: ''});
    this.inputEl.value = ''; // <- clear the input
  }

  textChanged() {
    this.setState({textInput: this.inputEl.value})
  }

  deleteItem(item){

    const items = this.state.messages;
    const result = items.filter(msg => item !== msg.id);
    this.setState({messages: result});
    console.log(item);
    // *** TODO ***///
    const messages = {};
    this.state.messages.map(function(msg){
      messages[msg.id] = msg.text;
    });
    console.log(fire.database().ref('messages'));
    fire.database().ref().set({messages: messages});
  }
  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <h1>Dave's Notes</h1>
          <h6>Implement Clock.</h6>
      <form onSubmit={this.addItem.bind(this)}>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input onChange={e => this.textChanged()} className="mdl-textfield__input" type="text" ref={ el => this.inputEl = el } required/>
          <label className="mdl-textfield__label" >Work Work...</label>
        </div>
          <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" type="submit"><i className="material-icons">add</i></button>
      </form>
    </div>
      <TodoItems  entries={this.state.messages}
      delete={(e) => this.deleteItem(e)}/>
  </div>
    );
    }
    }

export default TodoList;
