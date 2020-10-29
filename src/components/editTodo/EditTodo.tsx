import React, { useState } from "react";

const EditTodo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;

    if (element.classList.contains("edit-modal")) {
      setIsOpen(false);
    }
  };

  return (
    <div className="edit-todo">
      <button className="edit-button" onClick={handleOpen}>
        Edit
      </button>
      {isOpen && (
        <div className="edit-modal" onClick={handleOutClick}>
          <div className="edit-form">
            <button onClick={handleClose}>Close</button>
            <h1>Edit Todo</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTodo;
