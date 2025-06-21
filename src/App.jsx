import { useState } from "react";
import "./App.css";
import Login1 from "./Components/Login1";
import Requisition from "./Components/Requisition";

function App() {
  return (
    <>
      <div>
        <Login1 />
      </div>
      <div>
        <Requisition />
      </div>
    </>
  );
}

export default App;
