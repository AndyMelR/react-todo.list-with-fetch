import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  let url = "https://assets.breatheco.de/apis/fake/todos/user/ameleror";

  let options = {
    method: "get",
    body: JSON.stringify(todos),
    headers: {
      "Content-Type": "application/json"
    }
  };

  fetch(url, options)
    .then(respuesta => {
      if (respuesta.status >= 200 && respuesta.status < 300) {
        console.log("El request se hizo correctamente");
        return respuesta.json();
      } else {
        console.log(`Hubo un error ${respuesta.status} en el request`);
      }
    })
    .then(body => {
      console.log("Este es el body del request", body);
      let html = body.map(todo => `<li>${todo.label}</li>`).join("");
      html = `<ul>${html}</ul>`;
      document.getElementById("content").innerHTML = html;
    })
    .catch(error => console.error("Error:", error));

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
                onChange={e => setInputValue(e.target.value)}
                value={inputValue}
                onKeyUp={e => {
                  if (e.key === "Enter") {
                    setTodos(todos.concat([inputValue]));
                    setInputValue("");
                  }
                }}
              />
            </li>

            {todos.map((todo, index) => (
              <li key={index}>
                <span>{todo}</span>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() =>
                    setTodos(
                      todos.filter((t, currentIndex) => index !== currentIndex)
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
