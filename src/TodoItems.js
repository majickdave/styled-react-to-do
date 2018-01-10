import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

class TodoItems extends Component {
  constructor(props, context) {
    super(props, context);

    this.createTasks = this.createTasks.bind(this);
    this.delete = this.delete.bind(this);
  }

  delete(key, e) {
    e.preventDefault();
    this.props.delete(key);
  }

  createTasks(message) {
    return <li onClick={(e) => this.delete(message.id, e)}
                key={message.id}>{message.text}</li>
  }

  render() {
    var todoEntries = this.props.entries;
    var listmessages = todoEntries.map(this.createTasks);

    return (
      <ul className="theList">
        <FlipMove duration={250} easing="ease-out">
          {listmessages}
        </FlipMove>
      </ul>
    );
  }
};

export default TodoItems;
