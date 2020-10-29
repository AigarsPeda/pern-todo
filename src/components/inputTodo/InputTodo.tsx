import React, { useState } from "react";
import { BASE_URL } from "../../constants";

const InputTodo: React.FC = () => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const body = { description };
      await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      // console.log(response);
      // window.location = "/";
      setDescription("");

      // this is needed for page to refresh
      // end get new todo list
      // with added todo
      window.location.href = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="input-todo">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={!description.trim()}>
          Add
        </button>
      </form>
    </div>
  );
};

export default InputTodo;
