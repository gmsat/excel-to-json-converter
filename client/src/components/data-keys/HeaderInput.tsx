import React, { useContext, useEffect, useRef, useState } from "react";
import { ArrayHelpers } from "../../modules/json-data-options/ArrayHelpers";
import MyContext from "../../context/my-context/MyContext";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Input } from "@mui/joy";
import { Input as MuiInput, TextField } from "@mui/material"

export interface HeaderInputProps {
  itemData: string,
  index: number,
  setUpdatedKeys: (_keys: string[]) => void,
  updatedKeys: string[],
  resetClicked: boolean,
  setResetClicked: (state: boolean) => void
}

// TODO: create UI for changing values based on object index
// TODO: input field for indexes [can only enter valid numbers / add range so that you can only enter valid indices]
// TODO: Lookup / dialog [checkbox, index, value]
// TODO: detect value types

export const HeaderInput: React.FC<HeaderInputProps> = ({itemData, index, resetClicked}) => {
  const [originalVal, setOriginalVal] = useState(itemData);
  const [value, setValue] = useState(itemData);
  const [checked, setChecked] = useState(true);

  const {outputData, setOutputData} = useContext(MyContext);
  const {newKeys, setNewKeys} = useContext(MyContext);
  const {oldKeys, setOldKeys} = useContext(MyContext);
  const {preview, setPreview} = useContext(MyContext);
  const {downloadLink, setDownloadLink} = useContext(MyContext);
  const {file, setFile} = useContext(MyContext);

  const {showUpdateKeyValuesDialog, setShowUpdateKeyValuesDialog} = useContext(MyContext);
  const {dialogKeyValueData, setDialogKeyValueData} = useContext(MyContext);

  const [newData, setNewData] = useState<any[]>(outputData);

  // reset inputs to original values on reset button click
  useEffect(() => {
    setValue(originalVal);
  }, [resetClicked]);

  // updates data preview based when changing fields
  useEffect(() => {
    // console.log("new", newData);
    setOutputData(newData);
    setPreview(newData);
  }, [value]);

  const handleInputChange = (e: any) => {
    const array = new ArrayHelpers();
    const targetVal = e.target.value;

    if (array.keyExists(outputData, targetVal)) {
      console.log(`Key name: [${targetVal}] already exists! Enter another key!`);
      return;
    }

    setValue(targetVal);

    const updated = array.getNewKeys(newKeys, index, targetVal);
    setNewKeys(updated);

    const data = array.renameKeysByIndex(outputData, index, targetVal);

    setNewData(data);
    setOutputData(newData);
  }

  // const testValueChanges = () => {
  //   const ah = new ArrayHelpers();
  //   const changedValues = ah.updateObjectValuesByIndex(outputData, 5000, 5, [0, 2, 5]);
  //
  //   setNewData(changedValues);
  //   setOutputData(newData);
  //
  //   setTimeout(() => {
  //     // console.log("timeout executed");
  //     setPreview(changedValues);
  //     setDownload(changedValues);
  //   }, 100);
  // }

  function setDownload(_newData: any) {
    if (!file) {
      return;
    }

    const data = JSON.stringify(_newData, null, 2);
    const fileBlob = new Blob([data], {type: "text/plain"});
    const url = URL.createObjectURL(fileBlob);

    setDownloadLink(url);
  }

  const handleChecked = () => {
    setChecked(!checked);
  }

  // show dialog data based on key name!
  const showDialog = (_objectIndex: number) => {
    setDialogData(_objectIndex);
    setShowUpdateKeyValuesDialog(true);
  }

  function setDialogData(_keyIndex: number) {
    const array = new ArrayHelpers();
    const dialogData = array.getHeaderValuesByNameIndex(outputData, value, _keyIndex);
    setDialogKeyValueData(dialogData);
  }

  return (
    <div style={{height: "35px", display: "flex"}}>
      <div style={{display: "flex", gap: 5, justifyContent: "center", alignItems: "center"}}>

        <p style={{flex: 1}}>({index})</p>

        {/*<input type="checkbox" checked={checked} onChange={handleChecked}/>*/}
        {/*<input type="text" value={value} onChange={handleInputChange}/>*/}

        <div style={{display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center", flex: 1}}>
          {/*<Button startIcon={<EditIcon/>} sx={{height: "20px"}} size={"small"} onClick={() => showDialog(index)} variant={"outlined"} key={index}/>*/}
          <IconButton size={"sm"} variant={"soft"} onClick={() => showDialog(index)} key={index}>
            <EditIcon/>
          </IconButton>
        </div>

        <TextField variant={"standard"} sx={{flex: 4}} size={"small"} type="text" value={value} onChange={handleInputChange}/>

      </div>
    </div>

  );
}