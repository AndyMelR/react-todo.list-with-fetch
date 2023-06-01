import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEdit } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const url = "https://assets.breatheco.de/apis/fake/todos/user/ameleror";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        } else {
          console.log(`Hubo un error ${response.status} en el request`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (todos.length === 0) {
      fetchTodos();
    }
  }, []);

  const updateTodosOnServer = async (updatedTodos) => {
    try {
      const url = "https://assets.breatheco.de/apis/fake/todos/user/ameleror";
      const options = {
        method: "PUT",
        body: JSON.stringify(updatedTodos),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        console.log(`Hubo un error ${response.status} en el request`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClearAll = async () => {
    try {
      const url = "https://assets.breatheco.de/apis/fake/todos/user/ameleror";
      const options = {
        method: "DELETE",
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        console.log(`Hubo un error ${response.status} en el request`);
      } else {
        setTodos([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? { ...todo, label: inputValue } : todo
      );
      updateTodosOnServer(updatedTodos);
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      const newTodo = { label: inputValue, done: false };
      const newTodos = [...todos, newTodo];
      updateTodosOnServer(newTodos);
      setTodos(newTodos);
    }
    setInputValue("");
  };

  const handleEdit = (index) => {
    const todo = todos[index];
    setInputValue(todo.label);
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setInputValue("");
    setEditIndex(null);
  };

  return (
    <>
      <div className="container">
        <h1>todos</h1>
        <div className="container sombra" id="notebook">
          <form onSubmit={handleSubmit}>
            <input
              value={inputValue}
              placeholder="Write your task"
              onChange={(e) => setInputValue(e.target.value)}
            />
            {editIndex !== null ? (
              <div className="edit-btn-container">
                <button type="submit" className="edit-btn">Edit Task</button>
                <button type="button" onClick={handleCancelEdit} className="cancel-btn">
                  Cancel
                </button>
              </div>
            ) : (
              <button type="submit" className="add-btn">Add Task</button>
            )}
          </form>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                {editIndex === index ? (
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                ) : (
                  <span>{todo.label}</span>
                )}
                <div className="buttons-container">
                  <FontAwesomeIcon
                    className="edit-icon"
                    icon={faEdit}
                    onClick={() => handleEdit(index)}
                  />
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => {
                      const updatedTodos = todos.filter(
                        (_, currentIndex) => index !== currentIndex
                      );
                      setTodos(updatedTodos);
                      updateTodosOnServer(updatedTodos);
                    }}
                  />
                </div>
              </li>
            ))}
            <li id="task-counter">
              <div>{todos.length} task left</div>
            </li>
            <button type="button" onClick={handleClearAll} className="clear-btn">
              Clear All Tasks
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;


