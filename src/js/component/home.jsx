import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  //const [inputValue, setInputValue] = useState("");
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

  useEffect(() => {
    let html = todos.map((todo) => `<li>${todo.label}</li>`).join("");
    html = `<ul>${html}</ul>`;
  }, [todos]);

  return (
    <>
      <div className="container">
        <h1>todos</h1>
        <div className="container sombra" id="notebook">
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
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
