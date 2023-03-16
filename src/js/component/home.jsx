import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong, faXmark } from "@fortawesome/free-solid-svg-icons";

//High Order Functions
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  return (
    <>
      <div className="container">
        <h1>todos</h1>
        <div className="container sombra" id="notebook">
          <ul>
            <li>
              <input
                type="text"
                placeholder="Write here your new to-do"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setTodos(todos.concat([inputValue]));
                    setInputValue("");
                  }
                }}
              ></input>
            </li>

            {todos.map((todo, index) => (
              <li key={index}>
                <span>{todo}</span>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() =>
                    setTodos(
                      todos.filter((t, currentIndex) => index != currentIndex)
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
