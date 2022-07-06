import React from "react";
import "./App.css";
import MultiHeader from "./Excel/MultiHeader/MultiHeader";
import SimpleDemo from "./Excel/SimpleDemo/SimpleDemo";

function App() {
  return (
    <div className="container">
      <SimpleDemo />
      <MultiHeader />
    </div>
  );
}

export default App;
