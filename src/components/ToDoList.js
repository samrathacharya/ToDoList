import React from "react";
import ToDoForm from "./ToDoForm";
import ToDoBody from "./ToDoBody";
import { ButtonGroup, Button } from "@material-ui/core";

export default class ToDoList extends React.Component {
  state = {
    todos: [],
    todosToShow: "all",
    filtered: [],
    search: ""
  };

  addToDo = toDo => {
    this.setState({
      todos: [...this.state.todos, toDo]
    });
  };

  toggleComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        //Update
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return todo;
        }
      })
    });
  };

  //Takes a string and updates the state toDoShow attribute to the correct one
  updateToDoShow = s => {
    this.setState({
      todosToShow: s
    });
  };

  //Display all todos except the one where the id is the same as the task to be removed
  removeToDo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  };

  removeCompleted = () => {
    this.setState({
      todos: this.state.todos.filter(todo => !todo.complete)
    });
  };

  handleChange(e) {
    this.setState({
      search: e.target.value.substr(0, 20),
      todosToShow: "search"
    });
  }

  render() {
    let filteredToDos = this.state.todos.filter(todo => {
      return todo.text.indexOf(this.state.search) !== -1;
    });

    if (this.state.todosToShow === "all") {
      filteredToDos = this.state.todos;
    } else if (this.state.todosToShow === "completed") {
      filteredToDos = this.state.todos.filter(todo => todo.complete);
    } else if (this.state.todosToShow === "active") {
      filteredToDos = this.state.todos.filter(todo => !todo.complete);
    } else if (this.state.todosToShow === "search") {
      filteredToDos = this.state.todos.filter(todo => {
        return todo.text.indexOf(this.state.search) !== -1;
      });
    }

    return (
      <div>
        <h1>To Do List</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <form style={{ margin: "0px 5px" }}>
            <input
              value={this.state.search}
              type="text"
              placeholder="Search"
              onChange={this.handleChange.bind(this)}
            ></input>
          </form>
        </div>
        {filteredToDos.map(todo => (
          <ToDoBody
            removeToDo={() => this.removeToDo(todo.id)}
            toggleComplete={() => this.toggleComplete(todo.id)}
            key={todo.id}
            todo={todo}
          ></ToDoBody>
        ))}

        <div
          style={{ display: "flex", justifyContent: "center", margin: "5px" }}
        >
          <span style={{ fontSize: 18, fontWeight: "bold" }}>
            Active tasks: <s></s>
            {this.state.todos.filter(todo => !todo.complete).length}{" "}
          </span>
        </div>
        <div>
          <ButtonGroup>
            <Button color="primary" onClick={() => this.updateToDoShow("all")}>
              All
            </Button>
            <Button
              color="primary"
              onClick={() => this.updateToDoShow("active")}
            >
              Active
            </Button>
            <Button
              color="primary"
              onClick={() => this.updateToDoShow("completed")}
            >
              {" "}
              Completed
            </Button>
          </ButtonGroup>
        </div>
        {/* If there is at least one todo which is complete then display the button otherwise, do not show anything */}
        {this.state.todos.some(todo => todo.complete) ? (
          <div style={{ margin: "5px" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.removeCompleted}
            >
              Remove all completed
            </Button>
          </div>
        ) : null}
        <ToDoForm onSubmit={this.addToDo}></ToDoForm>
      </div>
    );
  }
}
