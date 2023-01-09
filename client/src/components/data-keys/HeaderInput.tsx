import React, { useContext, useEffect, useRef, useState } from "react";
import { ArrayHelpers } from "../../modules/json-data-options/ArrayHelpers";
import MyContext from "../../context/my-context/MyContext";

export interface HeaderInputProps {
  itemData: string,
  index: number,
  // newKeys: string[] | null,
  // setNewKeys: (newKeys: string[]) => void,
  // updateKeysOnChange: (e: any) => void,
  setUpdatedKeys: (_keys: string[]) => void,
  updatedKeys: string[],
  resetClicked: boolean,
  setResetClicked: (state: boolean) => void
}

export const HeaderInput: React.FC<HeaderInputProps> = ({
                                                          itemData,
                                                          index,
                                                          setUpdatedKeys,
                                                          updatedKeys,
                                                          resetClicked
                                                        }) => {
  const [originalVal, setOriginalVal] = useState(itemData);
  const [value, setValue] = useState(itemData);
  const [checked, setChecked] = useState(true);

  const {outputData, setOutputData} = useContext(MyContext);
  const {newKeys, setNewKeys} = useContext(MyContext);
  const {oldKeys, setOldKeys} = useContext(MyContext);
  const {preview, setPreview} = useContext(MyContext);

  const [newData, setNewData] = useState<any[]>(outputData);

  const inputRef = useRef()

  // reset inputs to original values on reset button click
  useEffect(() => {
    setValue(originalVal);
  }, [resetClicked]);

  useEffect(() => {
    // console.log("new", newData);
    setOutputData(newData);
    setPreview(newData);
  }, [value]);

  // useEffect(() => {
  //   setPreview();
  // }, [outputData]);

  // TODO: change this input so that it returns new data based on selected changes
  const handleInputChange = (e: any) => {
    const ah = new ArrayHelpers();
    const targetVal = e.target.value;

    if (ah.keyExists(outputData, targetVal)) {
      console.log(`Key name: [${targetVal}] already exists! Enter another key!`);
      return;
    }

    setValue(targetVal);

    const updated = ah.getNewKeys(newKeys, index, targetVal);
    setNewKeys(updated);

    const data = ah.renameKeysByIndex(outputData, index, targetVal);

    setNewData(data);
    // TODO: return changed objects based on input changes
  }

  const testValueChanges = () => {
    console.log("change values button clicked!");

    const ah = new ArrayHelpers();
    const changedValues = ah.updateObjectValuesByIndex(outputData, 5000, 5, [0, 2, 5]);
    // expected output --> key: [amount(i:5)] = 5000 for objects with index 0, 2, 5
    // old values for 0, 2, 5 objects

    console.log(changedValues);

    setPreview(changedValues);
    setNewData(changedValues);

    // TODO: return changed objects based on input changes
  }

  const handleChecked = () => {
    setChecked(!checked);
  }

  return (
    <div>
      <div style={{display: "flex", gap: 10}}>
        <button onClick={testValueChanges}>Change values test</button>
        <p>{index}</p>
        <input type="checkbox" checked={checked} onChange={handleChecked}/>
        <input type="text" value={value} onChange={handleInputChange}/>
        <input type="text" placeholder={"new value"}/>
      </div>
    </div>
  );
}