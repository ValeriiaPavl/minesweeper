import React from "react";
import Field from "./Field";
import ControlPanel from "./ControlPanel";

function App() {
  return (
    <div className="App">
      <div className="Minesweeper">
        <div className="header">
          <h1> Minesweeper</h1>
          <img className="bomb" src="bomb.svg" />
        </div>
        <ControlPanel />

        <Field />
      </div>
    </div>
  );
}

export default App;
