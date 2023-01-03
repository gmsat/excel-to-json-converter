import { useState } from 'react';
import './App.css';
import React from 'react';
import ExcelToJson from "../../src/modules/excel-to-json";

// TODO: upload button (input file)
// TODO: download button (output file)
// TODO: set options for data handling
// TODO: choose headers start (A1, A12, etc. Set default to A1)
// TODO: download raw json data
// TODO: download json data with changed headers

function App() {
  const [count, setCount] = useState(0);
  const e = new ExcelToJson();
  
  return (
    <div className="App">
      <div className="card">
        <button onClick={() => e.showAlertTest()}>test</button>
      </div>
    </div>
  )
}

export default App
