import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

class TodoItems extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.createTasks = this.createTasks.bind(this);
    this.delete = this.delete.bind(this);
  }

  delete(key) {
    this.props.delete(key);
  }

  createTasks(message) {
    return <li onClick={(e) => this.delete(message.key, e)}
                key={message.key}>{message.text}</li>
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
