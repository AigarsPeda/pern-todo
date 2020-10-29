import React from "react";
import InputTodo from "./components/inputTodo/InputTodo";
import ListTodos from "./components/listTodo/ListTodos";

import "./styles.scss";

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>PERN Todo List</h1>
      <InputTodo />
      <ListTodos />
    </div>
  );
};

export default App;
