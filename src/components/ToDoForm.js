import React from "react";
import shortid from "shortid";
import Button from "@material-ui/core/Button";

export default class ToDoForm extends React.Component {
  //Store the text that the user has typed
  state = {
    text: ""
  };

  //To handle forms:
  //1. State - field in the state that stores the value
  //2. Input form - you can change the desired thing
  //a. onChange - Which has the listener as the argument
  //3. Listener = Sets state as the event.target.property changes

  //Handle Change function deals with the
  //input when it is changed
  handleChange = event => {
    this.setState({
      //event.target.name is text, so the change is reflected in the state
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    //this.props.onSubmit: Refers to the addTodo in ToDoList.js. This takes a todo as an argument
    //Returns a todo 'object' with the text, whether it is completed or not and a shorthand id
    this.props.onSubmit({
      text: this.state.text,
      completed: false,
      id: shortid.generate()
    });
    //Empty the text that is saved in the form
    this.setState({
      text: ""
    });
  };
  render() {
    return (
      <div style={{ margin: "10px" }}>
        <form onSubmit={this.handleSubmit}>
          <input
            name="text"
            style={{ height: "30px", width: "150px" }}
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="Enter a task"
          ></input>
          <Button
            style={{
              margin: "0px 5px",
              textAlign: "center"
            }}
            variant="contained"
            color="primary"
            onSubmit={this.handleSubmit}
          >
            <span
              style={{
                display: "inline-block"
              }}
            >
              Add task
            </span>
          </Button>
        </form>
      </div>
    );
  }
}
