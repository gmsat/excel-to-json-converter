import React, { useContext, useEffect, useState } from "react";
import { ArrayHelpers } from "../../modules/json-data-options/ArrayHelpers";
import MyContext from "../../context/my-context/MyContext";
import EditIcon from '@mui/icons-material/Edit';
import { Chip, CssVarsProvider, IconButton, Input, Tooltip } from "@mui/joy";
import { ListItem } from "@mui/material";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DoneIcon from '@mui/icons-material/Done';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export interface HeaderInputProps {
  itemData: string,
  index: number,
  setUpdatedKeys: (_keys: string[]) => void,
  updatedKeys: string[],
  resetClicked: boolean,
  setResetClicked: (state: boolean) => void
}

export const HeaderInput: React.FC<HeaderInputProps> = ({itemData, index, resetClicked}) => {
  const [originalVal, setOriginalVal] = useState(itemData);
  const [oldValue, setOldValue] = useState(itemData);
  const [value, setValue] = useState(itemData);
  const [checked, setChecked] = useState(true);
  const [keyInputEnabled, setKeyInputEnabled] = useState(false);
  const [dataTypes, setDataTypes] = useState<any>([]);

  const {outputData, setOutputData} = useContext(MyContext);
  const {newKeys, setNewKeys} = useContext(MyContext);
  const {setPreview} = useContext(MyContext);
  const {headersData} = useContext(MyContext);
  const {setShowUpdateKeyValuesDialog} = useContext(MyContext);
  const {setDialogKeyValueData} = useContext(MyContext);
  const {setDownloadOutput} = useContext(MyContext);
  const {reset} = useContext(MyContext);
  const {setHeaderKeys} = useContext(MyContext);

  const [newData, setNewData] = useState<any[]>(outputData);

  const handleInputChange = (e: any) => {
    const targetVal = e.target.value;
    setValue(targetVal);
  }

  const handleInputSave = () => {
    const array = new ArrayHelpers();

    if (array.keyExists(outputData, value)) {
      console.log(`Key name: [${value}] already exists! Enter another key!`);
      return;
    }

    const updated = array.getNewKeys(newKeys, index, value);
    setNewKeys(updated);

    const data = array.renameKeysByKeyName(outputData, oldValue, value);
    const lines = data;

    setNewData(data);
    setOutputData(lines);
    setDownloadOutput({...headersData, lines});

    setPreview({...headersData, lines});
    setOldValue(value);
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
    if (keyInputEnabled) {
      handleInputSave()
    }
  }

  const handleDeleteKey = (_keyName: string) => {
    const updatedData = ArrayHelpers.deleteKeyByKeyNameFromObjectArray(outputData, _keyName);
    const updatedHeaders = ArrayHelpers.getObjectHeaders(updatedData);

    setHeaderKeys(updatedHeaders);
    updateData(updatedData);
  }

  const updateData = (_data: any) => {
    const lines = _data;

    setNewData(_data);
    setOutputData(_data);
    setDownloadOutput({...headersData, lines});
    setPreview({...headersData, lines});
  }

  useEffect(() => {
    setValue(originalVal);
    setOldValue(originalVal);
  }, [reset]);

  useEffect(() => {
    const array = new ArrayHelpers();
    const objToCheck = outputData.reduce((a, b) => {
      return a.length > b.length ? a : b;
    });
    const types = array.getObjectDataTypes(outputData[0]);

    if (types) {
      setDataTypes(types);
    }
  }, []);

  // update input on headers change
  useEffect(() => {
    setValue(itemData);
    setOldValue(itemData);
  }, [itemData]);

  return (
    <ListItem sx={{height: "40px", display: "flex", gap: 1, borderBottom: "solid lightgrey 1px"}}>

      <div style={{flex: 1}}>
        <Tooltip placement={"left"} size={"sm"} color={"danger"} title={"Delete"}>
          <IconButton size={"sm"} color={"warning"} variant={"plain"} onClick={() => handleDeleteKey(value)}>
            <DeleteForeverIcon/>
          </IconButton>
        </Tooltip>
      </div>

      <div style={{display: "flex", flex: 5, justifyContent: "center", alignItems: "center", gap: 6}}>
        <p style={{flex: 1, fontSize: "0.7rem", color: "grey"}}>{index}</p>
        <div style={{flex: 1}}>
          <Chip sx={{borderRadius: 3, fontSize: "0.75rem"}} size={"sm"} variant={"soft"}
                color={"neutral"}>{dataTypes[index]}</Chip>
        </div>
      </div>

      <div style={{display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center", flex: 1}}>
        <IconButton size={"sm"} onClick={handleEditInputKey} variant={"plain"}>
          {!keyInputEnabled ? <EditIcon sx={{fontSize: "1.2rem"}}/> : <DoneIcon color={"success"}/>}
        </IconButton>
      </div>

      <div style={{flex: 10}}>
        <Input readOnly={!keyInputEnabled} sx={{
          backgroundColor: keyInputEnabled ? "white" : null,
          border: keyInputEnabled ? "solid lightgrey 1px" : null
        }} type={"text"} variant={"soft"} size={"sm"} value={value} onChange={handleInputChange}/>
      </div>

      <div style={{flex: 1}}>
        <CssVarsProvider>
          <IconButton size={"sm"} variant={"soft"} onClick={() => showDialog(index)} key={index}>
            <MenuOpenIcon/>
          </IconButton>
        </CssVarsProvider>
      </div>

    </ListItem>
  );
}