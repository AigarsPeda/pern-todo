import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { TodoType } from "../../types";
import EditTodo from "../editTodo/EditTodo";

const ListTodos: React.FC = () => {
  const [listTodos, setListTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todos`);
      const jsonData: TodoType[] = await response.json();
      setListTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE"
      });

      const newListTodos = listTodos.filter((todo) => todo.todo_id !== id);
      setListTodos(newListTodos);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="list-todos">
      <ul>
        {listTodos.map((todo) => {
          return (
            <div key={todo.todo_id}>
              <li>
                <p>{todo.description}</p>
                <div className="todo-buttons">
                  <EditTodo todo={todo} />
                  <button
                    className="delete"
                    onClick={() => handleDelete(todo.todo_id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ListTodos;
