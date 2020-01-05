import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

export default props => (
  <div style={{ display: "flex", justifyContent: "center", margin: "5px" }}>
    <div
      style={{
        textDecoration: props.todo.complete ? "line-through" : "",
        margin: "0px 5px"
      }}
      onClick={props.toggleComplete}
    >
      {props.todo.text}
    </div>
    <Button
      color="secondary"
      variant="contained"
      onClick={props.removeToDo}
      style={{
        maxWidth: "50px",
        maxHeight: "30px",
        minWidth: "50px",
        minHeight: "30px",
        fontSize: "9px"
      }}
    >
      Remove
    </Button>
  </div>
);
