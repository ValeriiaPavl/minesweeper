import React from "react";
import Field from "./Field";

function App() {
  return (
    <div className="App">
      <div className="Minesweeper">
        <div className="header">
          <h1> Minesweeper</h1>
          <img className="bomb" src="bomb.svg" />
        </div>

        <Field />
      </div>
    </div>
  );
}

export default App;
