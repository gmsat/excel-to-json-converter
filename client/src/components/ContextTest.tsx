import React from 'react';
import { useContext } from "react";
import MyContext from "../context/my-context/MyContext";

const ContextTest = () => {
  const {stringValue, setStringValue} = useContext(MyContext);

  const handleChange = (e: any) => {
    const newVal = e.target.value;
    setStringValue(newVal);
  }

  const handleClick = () => {
    alert(`new global value: ${stringValue}`);
  }

  return (
    <div>
      <input onChange={handleChange} type="text" placeholder={"enter new string"} value={stringValue}/>
      <button onClick={handleClick}>Set New String</button>
    </div>
  );
};

export default ContextTest;