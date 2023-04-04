import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

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
    fetchTodos();
  }, []);

 
    let html = todos.map((todo) => `<li>${todo.label}</li>`).join("");
    html = `<ul>${html}</ul>`;


  const handleSubmit = async (e) => {
    const newTodo = { label: inputValue, done: false };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    try {
      const url = "https://assets.breatheco.de/apis/fake/todos/user/ameleror";
      const options = {
        method: "PUT",
        body: JSON.stringify(newTodos),
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
    setInputValue("");
  };

  return (
    <>
      <div className="container">
        <h1>todos</h1>
        <div className="container sombra" id="notebook">
          <form onSubmit={handleSubmit}>
            <input value={inputValue} placeholder=" Write your task" onChange={(e) => setInputValue(e.target.value)} />
          </form>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                <span>{todo.label}</span>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() =>
                    setTodos(
                      todos.filter(
                        (t, currentIndex) => index !== currentIndex
                      )
                    )
                  }
                />
              </li>
            ))}
            <li id="task-counter">
              <div>{todos.length} task left</div>
            </li>
            <button type="reset" onClick={() => setTodos([])}>
               Clear
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
