import React, { useContext, useEffect, useState } from "react";
import { ArrayHelpers } from "../../modules/json-data-options/ArrayHelpers";
import MyContext from "../../context/my-context/MyContext";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Button } from "@mui/joy";
// import { TextField } from "@mui/material"
import { ListItem, Chip } from "@mui/material";
import TableRowsIcon from '@mui/icons-material/TableRows';
import { CssVarsProvider, Input } from "@mui/joy";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DoneIcon from '@mui/icons-material/Done';

export interface HeaderInputProps {
  itemData: string,
  index: number,
  setUpdatedKeys: (_keys: string[]) => void,
  updatedKeys: string[],
  resetClicked: boolean,
  setResetClicked: (state: boolean) => void
}

// TODO: fix headers resetting when changing state too quickly for inputs
// TODO: get types of key values and set the chip value [STR, INT, FLOAT, DATE]

const HeaderInputProps = {
  style: {
    fontSize: "0.7rem"
  }
}

export const HeaderInput: React.FC<HeaderInputProps> = ({itemData, index, resetClicked}) => {
  const [originalVal, setOriginalVal] = useState(itemData);
  const [value, setValue] = useState(itemData);
  const [checked, setChecked] = useState(true);
  const [keyInputEnabled, setKeyInputEnabled] = useState(false);

  const {outputData, setOutputData} = useContext(MyContext);
  const {newKeys, setNewKeys} = useContext(MyContext);
  const {preview, setPreview} = useContext(MyContext);
  const {downloadLink, setDownloadLink} = useContext(MyContext);
  const {file, setFile} = useContext(MyContext);

  const {headersData} = useContext(MyContext);

  const {showUpdateKeyValuesDialog, setShowUpdateKeyValuesDialog} = useContext(MyContext);
  const {dialogKeyValueData, setDialogKeyValueData} = useContext(MyContext);

  const [newData, setNewData] = useState<any[]>(outputData);

  const handleInputChange = (e: any) => {
    const array = new ArrayHelpers();
    const originalKey = value;
    const targetVal = e.target.value;

    if (array.keyExists(outputData, targetVal)) {
      console.log(`Key name: [${targetVal}] already exists! Enter another key!`);
      return;
    }

    setValue(targetVal);

    const updated = array.getNewKeys(newKeys, index, targetVal);
    setNewKeys(updated);

    // renames by key index
    // const data = array.renameKeysByIndex(outputData, index, targetVal);

    // renames by key name
    const data = array.renameKeysByKeyName(outputData, originalKey, targetVal);

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

  const handleEditInputKey = () => {
    setKeyInputEnabled(!keyInputEnabled);
  }

  // reset inputs to original values on reset button click
  useEffect(() => {
    setValue(originalVal);
  }, [resetClicked]);

  // updates data preview based when changing fields
  useEffect(() => {
    setOutputData(newData);

    const lines = newData;

    // setPreview(newData);
    setPreview({...headersData, lines});
  }, [value]);

  return (
    // <ListItem style={{height: "30px", display: "flex"}}>
    //   <div style={{display: "flex", gap: 5, justifyContent: "center", alignItems: "center"}}>
    //
    //     <p style={{flex: 1}}>({index})</p>
    //
    //     {/*<input type="checkbox" checked={checked} onChange={handleChecked}/>*/}
    //     {/*<input type="text" value={value} onChange={handleInputChange}/>*/}
    //
    //     <div style={{display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center", flex: 1}}>
    //       <IconButton size={"sm"} variant={"outlined"} onClick={() => showDialog(index)} key={index}>
    //         <EditIcon/>
    //       </IconButton>
    //     </div>
    //
    //     <TextField InputProps={HeaderInputProps} variant={"outlined"} sx={{flex: 6}} size={"small"} type="text" value={value} onChange={handleInputChange}/>
    //
    //   </div>
    // </ListItem>

    <ListItem sx={{height: "40px", display: "flex", gap: 1, borderBottom: "solid lightgrey 1px", padding: "12px"}}>
      {/*<div style={{display: "flex", gap: 5, justifyContent: "center", alignItems: "center"}}>*/}

        <p style={{flex: 1, fontSize: "0.7rem", color: "grey"}}>({index})</p>

        {/*<input type="checkbox" checked={checked} onChange={handleChecked}/>*/}
        {/*<input type="text" value={value} onChange={handleInputChange}/>*/}

        <div style={{display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center", flex: 1}}>
          <IconButton onClick={handleEditInputKey} variant={"plain"} >
            {!keyInputEnabled ? <EditIcon sx={{fontSize: "1.2rem"}}/> : <DoneIcon/>}
          </IconButton>
        </div>

        <div style={{flex: 10}}>
          {/*<TextField InputProps={HeaderInputProps} variant={"outlined"} size={"small"} type="text" value={value} onChange={handleInputChange}/>*/}
          <Input disabled={!keyInputEnabled} type={"text"} variant={"soft"} size={"sm"} value={value} onChange={handleInputChange}/>
        </div>

        <div style={{flex: 1}}>
          <CssVarsProvider>
            <IconButton size={"sm"} variant={"soft"} onClick={() => showDialog(index)} key={index}>
              <MenuOpenIcon/>
            </IconButton>
          </CssVarsProvider>
        </div>

        {/*<Chip label={"INT"} size={"small"} sx={{borderRadius: 1}} color={"default"}/>*/}

      {/*</div>*/}
    </ListItem>


  );
}