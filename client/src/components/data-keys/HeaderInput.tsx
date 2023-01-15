import React, { useContext, useEffect, useState } from "react";
import { ArrayHelpers } from "../../modules/json-data-options/ArrayHelpers";
import MyContext from "../../context/my-context/MyContext";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/joy";
import { TextField } from "@mui/material"

export interface HeaderInputProps {
  itemData: string,
  index: number,
  setUpdatedKeys: (_keys: string[]) => void,
  updatedKeys: string[],
  resetClicked: boolean,
  setResetClicked: (state: boolean) => void
}

// TODO: fix headers resetting when changing state too quickly for inputs

export const HeaderInput: React.FC<HeaderInputProps> = ({itemData, index, resetClicked}) => {
  const [originalVal, setOriginalVal] = useState(itemData);
  const [value, setValue] = useState(itemData);
  const [checked, setChecked] = useState(true);

  const {outputData, setOutputData} = useContext(MyContext);
  const {newKeys, setNewKeys} = useContext(MyContext);
  const {preview, setPreview} = useContext(MyContext);
  const {downloadLink, setDownloadLink} = useContext(MyContext);
  const {file, setFile} = useContext(MyContext);

  const {showUpdateKeyValuesDialog, setShowUpdateKeyValuesDialog} = useContext(MyContext);
  const {dialogKeyValueData, setDialogKeyValueData} = useContext(MyContext);

  const [newData, setNewData] = useState<any[]>(outputData);

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

  // reset inputs to original values on reset button click
  useEffect(() => {
    setValue(originalVal);
  }, [resetClicked]);

  // updates data preview based when changing fields
  useEffect(() => {
    setOutputData(newData);
    setPreview(newData);
  }, [value]);

  return (
    <div style={{height: "25px", display: "flex"}}>
      <div style={{display: "flex", gap: 5, justifyContent: "center", alignItems: "center"}}>

        <p style={{flex: 1}}>({index})</p>

        {/*<input type="checkbox" checked={checked} onChange={handleChecked}/>*/}
        {/*<input type="text" value={value} onChange={handleInputChange}/>*/}

        <div style={{display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center", flex: 1}}>
          <IconButton size={"sm"} variant={"soft"} onClick={() => showDialog(index)} key={index}>
            <EditIcon/>
          </IconButton>
        </div>

        <TextField variant={"standard"} sx={{flex: 6}} size={"small"} type="text" value={value} onChange={handleInputChange}/>

      </div>
    </div>

  );
}