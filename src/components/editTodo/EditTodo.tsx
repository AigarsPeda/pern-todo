import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { TodoType } from "../../types";

type Props = {
  todo: TodoType;
};

const EditTodo: React.FC<Props> = (props) => {
  const { todo } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(todo.description);
  }, [todo.description]);

  const handleOpen = () => {
    setIsOpen(true);
    setToggle(true);
  };

  const handleClose = () => {
    setToggle(false);

    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const handleOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;

    if (element.classList.contains("edit-modal-background")) {
      setToggle(false);

      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { description };
    try {
      fetch(`${BASE_URL}/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      setToggle(false);
      setTimeout(() => {
        setIsOpen(false);
        window.location.href = "/";
      }, 500);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="edit-todo">
      <button className="edit-button" onClick={handleOpen}>
        Edit
      </button>

      {isOpen && (
        <div className="edit-modal-background" onClick={handleOutClick}>
          <div
            className={toggle ? "edit-modal toggleIn" : "edit-modal toggleOut"}
          >
            <div className="close-button-container">
              <button onClick={handleClose} className="close-button">
                X
              </button>
            </div>

            <h1>Edit Todo</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button type="submit">Done</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTodo;
