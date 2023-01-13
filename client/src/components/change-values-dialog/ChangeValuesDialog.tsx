import React, { useContext, useDeferredValue, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import MyContext from "../../context/my-context/MyContext";
import { Input, Typography } from "@mui/joy";
import { ArrayHelpers } from "../../modules/json-data-options/ArrayHelpers";

// get values for each object based on header index
// TODO: Create a component to change the values for objects based on their index [new value input, object indices]

export type TableObject = { index: number, keyIndex: number, key: string, value: number | string };
type SelectorDataTypes = "string" | "number";

export interface TableData {
  data: TableObject[],
  setData: (_data: TableObject[]) => void
}

interface KeyValueRow {
  obj: TableObject,
  index: number,
  data: TableObject[],
  allValues: string | number,
  saveAllClicked: boolean,
  setSaveAllClicked: (_val: boolean) => void
}

interface DataTypeSelectorProps {
  dataType: SelectorDataTypes,
  setDataType: (_type: SelectorDataTypes) => void,
  disabled?: boolean,
  onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
}

interface ChangeAllValuesControlProps {
  indexNumbers: number[],
  keyIndex: number,
  key: string,
  data: TableObject[],
  setAllValues: (_newVal: string | number) => void,
  allValues: string | number,
  setSaveAllClicked: (_val: boolean) => void
}

const DataTypeSelector: React.FC<DataTypeSelectorProps> = ({dataType, setDataType, disabled, onFocus, onBlur}) => {

  const [value, setValue] = useState<SelectorDataTypes>("string");

  useEffect(() => {
    setDataType(value);
  }, [value]);

  const handleChange = (e: SelectChangeEvent) => {
    setValue(e.target.value as SelectorDataTypes);
  }

  return (
    <>
      <FormControl variant={"outlined"} fullWidth>
        <Select onFocus={onFocus} onBlur={onBlur} disabled={disabled} size={"small"} value={dataType} onChange={handleChange}>
          <MenuItem value={"string"}>String</MenuItem>
          <MenuItem value={"number"}>Number</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}

const ChangeAllValuesControl: React.FC<ChangeAllValuesControlProps> = ({key, keyIndex, indexNumbers, data, setAllValues, allValues, setSaveAllClicked}) => {
  const [dataType, setDataType] = useState<"string" | "number">("string");
  const [newValue, setNewValue] = useState<string | number>("");
  const [saveAllActive, setSaveAllActive] = useState(false);

  const {outputData, setOutputData} = useContext(MyContext);
  const {setPreview} = useContext(MyContext);

  const {dialogKeyValueData, setDialogKeyValueData} = useContext(MyContext);

  useEffect(() => {
    console.log("ChangeAllValuesControl [data]:", data);
  }, [data]);

  useEffect(() => {
    if (allValues !== "") {
      setSaveAllActive(true);
    } else {
      setSaveAllActive(false);
    }
  }, [allValues]);

  const handleSave = () => {
    // get indices for all objects
    // use updateObject values with all object indices to change values for all
    // set the data for download
    setSaveAllClicked(true);
    // TODO: re-render row data to show that it has changed

    // setDialogKeyValueData([""]);
    const array = new ArrayHelpers();
    const newData = array.updateObjectValues(outputData, allValues, keyIndex, indexNumbers, dataType);

    setPreview(newData);
    setOutputData(newData);
    // setDialogKeyValueData(newData);
    // setDialogData(keyIndex);

    setAllValues("");
    // setSaveAllClicked(false);
  }

  function setDialogData(_keyIndex: number) {
    const array = new ArrayHelpers();
    const dialogData = array.getHeaderValuesByNameIndex(outputData, "AMOUNT", _keyIndex);

    console.log("DIALOG DATA <><><><>", dialogData);

    setDialogKeyValueData(dialogData);
  }

  const handleNewValueChange = (e: any) => {
    const targetVal = e.target.value;
    setAllValues(targetVal);
  }

  return (
    <Grid padding={2} sx={{border: "solid lightgrey 1px"}}>
      <FormControl>
        <FormLabel>Change all values</FormLabel>
        <Grid display={"flex"} flexDirection={"row"} gap={2}>
          <TextField size={"small"} variant={"outlined"} sx={{flex: 3}} placeholder={"enter new value"} value={allValues}
                     onChange={handleNewValueChange}/>
          <Grid item>
            <DataTypeSelector dataType={dataType} setDataType={setDataType}/>
          </Grid>
          <Button disabled={!saveAllActive} onClick={handleSave} sx={{borderRadius: 0}} variant={"outlined"}>Save All</Button>
        </Grid>
      </FormControl>
    </Grid>
  );
}

export const MultiChangeValuesInput = () => {
  return (
    <Grid display={"flex"} gap={1} sx={{margin: "auto", flex: 1, padding: 3}}>
      <Input sx={{flex: 3}} placeholder={"index numbers"}/>
      <Input sx={{flex: 1}} placeholder={"new value"}/>
      <Button variant={"outlined"} sx={{flex: 0.5, backgroundColor: "skyblue"}}>Apply</Button>
    </Grid>
  );
}

const KeyValueRow: React.FC<KeyValueRow> = ({obj, index, data, allValues, saveAllClicked, setSaveAllClicked}) => {
  const [newValue, setNewValue] = useState<string | number>("");
  const [rowData, setRowData] = useState<TableObject>(obj);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [dataType, setDataType] = useState<"string" | "number">("string");

  const {outputData, setOutputData} = useContext(MyContext);
  const {setPreview} = useContext(MyContext);
  const {downloadLink, setDownloadLink} = useContext(MyContext);
  const {file, setFile} = useContext(MyContext);

  const deferred = useDeferredValue(allValues);

  const handleValueChange = (e: any) => {
    const targetVal = e.target.value;
    setNewValue(targetVal);

    if (targetVal !== "" && targetVal !== obj.value) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }
  }

  useEffect(() => {
    if (allValues !== "") {
      setSaveDisabled(false);
    }
  }, [allValues])

  useEffect(() => {
    setNewValue(allValues);
  }, [deferred]);

  useEffect(() => {
    if (saveAllClicked) {
      handleSave(rowData, allValues);
      setSaveAllClicked(false);
    }
  }, [saveAllClicked]);

  const handleSave = (_obj: any, _newValue: string | number) => {
    const array = new ArrayHelpers();
    const objectIndex = _obj.index;
    const keyIndex = _obj.keyIndex;
    const changedValues = array.updateObjectValues(outputData, _newValue, keyIndex, [objectIndex], dataType);

    setTimeout(() => {
      setPreview(changedValues);
      setOutputData(changedValues);

      setRowData({
        value: newValue,
        keyIndex: rowData.keyIndex,
        key: rowData.key,
        index: rowData.index
      });

      setNewValue("");
      setSaveDisabled(true);
      // setDownload(changedValues);
    }, 100);
  }

  // function setDownload(_newData: any) {
  //   if (!file) {
  //     return;
  //   }
  //
  //   const data = JSON.stringify(_newData, null, 2);
  //   const fileBlob = new Blob([data], {type: "text/plain"});
  //   const url = URL.createObjectURL(fileBlob);
  //
  //   setDownloadLink(url);
  // }

  function setSaveDisabledDebounced(_val: boolean, _ms: number) {
    setTimeout(() => {
      setSaveDisabled(_val);
    }, _ms);
  }

  return (
    <>
      <tr tabIndex={0}>
        <th style={{padding: "6px", border: "solid lightgrey 1px"}} align={"right"}><Typography
          variant={"plain"}>{rowData.index}</Typography></th>
        <th style={{padding: "6px", border: "solid lightgrey 1px"}} align={"left"}>{rowData.key}</th>
        <th style={{padding: "6px", border: "solid lightgrey 1px"}} align={"left"}>{rowData.value}</th>
        <th style={{padding: "6px", border: "solid lightgrey 1px"}} align={"left"}>
          <Input onChange={handleValueChange} size={"sm"} variant={"plain"} type="text" placeholder={"enter new value"} value={newValue}/>
        </th>
        <th style={{padding: "6px", border: "solid lightgrey 1px"}} align={"left"}>
          <DataTypeSelector dataType={dataType} setDataType={setDataType}/>
        </th>
        <th style={{padding: "6px", border: "solid lightgrey 1px"}} align={"center"}>
          <Button disabled={saveDisabled} sx={{borderRadius: 0}} variant={"outlined"}
                  onClick={() => handleSave(rowData, newValue)}>Save</Button>
        </th>
      </tr>
    </>

  );
}

const KeyValuesTableDataRows: React.FC<TableData> = ({data, setData}) => {
  const [objectsIndicesArr, setObjectIndicesArr] = useState<number[]>([]);
  const [tableData, setTableData] = useState(data);
  const [allValues, setAllValues] = useState<string | number>("");
  const [saveAllClicked, setSaveAllClicked] = useState(false);

  useEffect(() => {
    setObjectIndicesArr(setIndexNumbers(data));
    setTableData(data);

    console.log("TABLE DATA [KeyValuesTableDataRows]", tableData);

  }, [data]);

  function setIndexNumbers(_array: object[]): number[] {
    const numArr: number[] = [];
    _array.map((obj, index) => {
      numArr.push(index);
    });

    return numArr;
  }

  // function setDialogData(_keyIndex: number) {
  //   const array = new ArrayHelpers();
  //   const dialogData = array.getHeaderValuesByNameIndex(outputData, value, _keyIndex);
  //   setDialogKeyValueData(dialogData);
  // }

  const mapData =
    <Grid display={"flex"} flexDirection={"column"} gap={2}>

      <Grid display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>

        <DialogTitle sx={{flex: 1}}>{tableData[0]?.key}</DialogTitle>

        <ChangeAllValuesControl data={tableData}
                                key={tableData[0]?.key}
                                keyIndex={tableData[0]?.keyIndex}
                                setAllValues={setAllValues}
                                allValues={allValues}
                                setSaveAllClicked={setSaveAllClicked}
                                indexNumbers={objectsIndicesArr}/>
      </Grid>

      <table align={"left"} style={{borderCollapse: "collapse", border: "solid lightgrey 1px"}}>
        <tr>
          {/*<th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "2%"}}>Reset</th>*/}
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "2%"}}>Index</th>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "10%"}}>Key</th>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "10%"}}>Value</th>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "6%"}}>Set Value</th>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "4%"}}>Data Type</th>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "2%"}}></th>
        </tr>
        {tableData.map((obj, index) => (
          <KeyValueRow allValues={allValues} data={tableData} obj={obj} index={index} saveAllClicked={saveAllClicked} setSaveAllClicked={setSaveAllClicked}/>
        ))}
      </table>

    </Grid>

  return (
    <>
      {mapData}
    </>
  );
}

export const ChangeValuesTable = () => {

  const {dialogKeyValueData, setDialogKeyValueData} = useContext(MyContext);

  useEffect(() => {
    console.log("DIALOG KEY VALUE DATA [ChangeValuesTable]", dialogKeyValueData);
  }, [dialogKeyValueData]);

  return (
    <div style={{width: "100%"}}>
      <KeyValuesTableDataRows data={dialogKeyValueData} setData={setDialogKeyValueData}/>
    </div>
  );
};

const ChangeValuesDialog: React.FC = () => {
  const {showUpdateKeyValuesDialog, setShowUpdateKeyValuesDialog} = useContext(MyContext);

  const hideDialog = () => {
    setShowUpdateKeyValuesDialog(false);
  }

  // data and UI to show in dialog
  // Header text
  // TODO: Selector to change header / or list of headers and show currently selected header
  // TODO: Input field to enter index numbers (apply changes only to objects with index)
  // TODO: [all objects / custom selection / enter index]
  // Table [object index, key name, value, reset original]

  return (
    <Dialog fullWidth maxWidth={"lg"} sx={{margin: "auto", maxWidth: "100%"}} open={showUpdateKeyValuesDialog}
            onClose={hideDialog}>
      <Grid item padding={5}>
        {/*<ChangeAllValuesControl indexNumbers={[1,2,3]} keyIndex={2} key={"AMOUNT"} data={}/>*/}
        <ChangeValuesTable/>
      </Grid>
    </Dialog>
  );
};

export default ChangeValuesDialog;