import React, { useContext, useDeferredValue, useEffect, useRef, useState } from 'react';
import {
  Backdrop,
  Dialog,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import MyContext from "../../context/my-context/MyContext";
import { CircularProgress, CssVarsProvider, Input, Typography, Select, Option, Button } from "@mui/joy";
import { ArrayHelpers } from "../../modules/json-data-options/ArrayHelpers";

export type TableObject = { index: number, keyIndex: number, key: string, value: number | string };
type SelectorDataTypes = "text" | "number" | "date";

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
  setSaveAllClicked: (_val: boolean) => void,
  indexNumbers: number[],
  allValuesDataType: SelectorDataTypes,
  setAllValuesDataType: (_dataType: SelectorDataTypes) => void
}

interface DataTypeSelectorProps {
  dataType: SelectorDataTypes,
  setDataType: (_type: SelectorDataTypes) => void,
  disabled?: boolean,
  onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined,
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined,
  allValuesDataType: SelectorDataTypes,
  setAllValuesDataType: (_dataType: SelectorDataTypes) => void
}

interface ChangeAllValuesControlProps {
  indexNumbers: number[],
  keyIndex: number,
  key: string,
  data: TableObject[],
  setAllValues: (_newVal: string | number) => void,
  allValues: string | number,
  allValuesDataType: SelectorDataTypes,
  setAllValuesDataType: (_dataType: SelectorDataTypes) => void,
  setSaveAllClicked: (_val: boolean) => void
}

const DataTypeSelector: React.FC<DataTypeSelectorProps> = ({
                                                             dataType,
                                                             setDataType,
                                                             disabled,
                                                             onFocus,
                                                             onBlur,
                                                             allValuesDataType,
                                                             setAllValuesDataType
                                                           }) => {
  const [value, setValue] = useState<SelectorDataTypes>("text");

  // const handleChange = (e: any) => {
  //   setValue(e.target.value as SelectorDataTypes);
  //   console.log(e.target.value);
  //   // setDataType(value);
  // }

  const handleChange = (e: any, newValue: any) => {
    setValue(newValue);
  }

  useEffect(() => {
    setDataType(value);
    setAllValuesDataType(value);
  }, [value]);

  return (
    <>
      <FormControl size={"small"} variant={"outlined"} fullWidth>
        {/*<Select onFocus={onFocus} onBlur={onBlur} disabled={disabled} size={"small"} value={dataType}*/}
        {/*        onChange={handleChange}>*/}
        {/*  <MenuItem value={"text"}>String</MenuItem>*/}
        {/*  <MenuItem value={"number"}>Number</MenuItem>*/}
        {/*  <MenuItem value={"date"}>Date</MenuItem>*/}
        {/*</Select>*/}
        <Select sx={{minWidth: "100px"}} onChange={(e, newValue) => handleChange(e, newValue)} defaultValue={"text"} size={"sm"}>
          <Option value={"text"}>Text</Option>
          <Option value={"number"}>Number</Option>
          <Option value={"date"}>Date</Option>
        </Select>
      </FormControl>
    </>
  )
}

const ChangeAllValuesControl: React.FC<ChangeAllValuesControlProps> = ({
                                                                         key,
                                                                         keyIndex,
                                                                         indexNumbers,
                                                                         data,
                                                                         setAllValues,
                                                                         allValues,
                                                                         setSaveAllClicked,
                                                                         allValuesDataType,
                                                                         setAllValuesDataType
                                                                       }) => {
  const [dataType, setDataType] = useState<SelectorDataTypes>("text");
  const [saveAllActive, setSaveAllActive] = useState(false);

  const {outputData, setOutputData} = useContext(MyContext);
  const {setPreview} = useContext(MyContext);
  const {headersData, setHeadersData} = useContext(MyContext);

  const {downloadOutput, setDownloadOutput} = useContext(MyContext);

  const handleSave = () => {
    setSaveAllClicked(true);
    const array = new ArrayHelpers();
    const newData = array.updateObjectValues(outputData, allValues, keyIndex, indexNumbers, dataType);

    // console.log("object index numbers", indexNumbers);

    const lines = newData;

    // setPreview(newData);
    // setOutputData(newData);

    setPreview({...headersData, lines});

    setOutputData(lines);
    setDownloadOutput({...headersData, lines});

    setAllValues("");

    // setTimeout(() => {
    //   setPreview({...headersData, lines});
    //
    //   setOutputData(lines);
    //   setDownloadOutput({...headersData, lines});
    //
    //   setAllValues("");
    // }, 100);
  }

  const handleNewValueChange = (e: any) => {
    const targetVal = e.target.value;
    setAllValues(targetVal);
  }

  useEffect(() => {
    if (allValues !== "") {
      setSaveAllActive(true);
    } else {
      setSaveAllActive(false);
    }
  }, [allValues]);

  return (
    <Grid padding={2} sx={{border: "solid lightgrey 1px"}}>
      <FormControl>
        <FormLabel>Change all values</FormLabel>
        <Grid display={"flex"} flexDirection={"row"} gap={2}>
          <Input type={dataType} size={"sm"} variant={"outlined"} sx={{flex: 3}} placeholder={"enter new value"}
                     value={allValues}
                     onChange={handleNewValueChange}/>
          <Grid item>
            <DataTypeSelector allValuesDataType={allValuesDataType} setAllValuesDataType={setAllValuesDataType}
                              dataType={dataType} setDataType={setDataType}/>
          </Grid>
          <Button size={"sm"} disabled={!saveAllActive} onClick={handleSave} variant={"outlined"}>
            Save All
          </Button>
        </Grid>
      </FormControl>
    </Grid>
  );
}

const KeyValueRow: React.FC<KeyValueRow> = ({
                                              obj,
                                              index,
                                              data,
                                              allValues,
                                              saveAllClicked,
                                              setSaveAllClicked,
                                              indexNumbers,
                                              allValuesDataType,
                                              setAllValuesDataType
                                            }) => {
  const [newValue, setNewValue] = useState<string | number>("");
  const [rowData, setRowData] = useState<TableObject>(obj);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [dataType, setDataType] = useState<SelectorDataTypes>("text");

  const {outputData, setOutputData} = useContext(MyContext);
  const {setPreview} = useContext(MyContext);

  const deferred = useDeferredValue(allValues);

  const saveButtonRef = useRef<any>(null);

  const {headersData} = useContext(MyContext);

  const {downloadOutput, setDownloadOutput} = useContext(MyContext);

  const handleValueChange = (e: any) => {
    const targetVal = e.target.value;
    setNewValue(targetVal);

    if (targetVal !== "") {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }
  }

  const handleSave = (_obj: any, _newValue: string | number, _dataType: SelectorDataTypes) => {
    const array = new ArrayHelpers();
    const objectIndex = _obj.index;
    const keyIndex = _obj.keyIndex;

    const changedValues = array.updateObjectValues(outputData, _newValue, keyIndex, [objectIndex], _dataType);

    setTimeout(() => {
      // setPreview(changedValues);
      const lines = changedValues;
      setPreview({...headersData, lines});

      setOutputData(changedValues);
      setDownloadOutput({...headersData, lines});

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

  // TODO: if value not empty for index number, add index number to array
  const handleSaveAllIndividual = () => {
    console.log("REFERENCE:", saveButtonRef);
    saveButtonRef.current.click();
    // if (saveButtonRef.current!.attribute.disabled === false) {
    //   saveButtonRef.current.click();
    // }
  }

  useEffect(() => {
    if (allValues !== "") {
      setSaveDisabled(false);
    }
  }, [allValues]);

  useEffect(() => {
    setNewValue(allValues);
  }, [deferred]);

  useEffect(() => {
    if (saveAllClicked) {
      handleSave(rowData, deferred, allValuesDataType);
      setSaveAllClicked(false);
    }
  }, [saveAllClicked]);

  return (
    <>
      {/*{index === 0 ? <button onClick={handleSaveAllIndividual}>Save All</button> : null}*/}
      <tr tabIndex={0}>
        <th style={{padding: "6px", border: "solid lightgrey 1px"}} align={"right"}>{rowData.index}</th>
        <th style={{padding: "6px", border: "solid lightgrey 1px"}} align={"left"}>{rowData.key}</th>
        <th style={{padding: "6px", border: "solid lightgrey 1px"}} align={"left"}>{rowData.value}</th>
        <th style={{padding: "6px", border: "solid lightgrey 1px"}} align={"left"}>
          <Input onChange={handleValueChange} size={"sm"} variant={"outlined"} type={dataType}
                 placeholder={"enter new value"} value={newValue}/>
        </th>
        <th style={{padding: "6px", border: "solid lightgrey 1px"}} align={"left"}>
          <DataTypeSelector allValuesDataType={allValuesDataType} setAllValuesDataType={setAllValuesDataType}
                            dataType={dataType} setDataType={setDataType}/>
        </th>
        <th style={{padding: "6px", border: "solid lightgrey 1px"}} align={"center"}>
          <Button variant={"outlined"} size={"sm"} ref={saveButtonRef} disabled={saveDisabled}
                  onClick={() => handleSave(rowData, newValue, dataType)}>Save
          </Button>
          {/*<Button disabled={saveDisabled} sx={{borderRadius: 0}} variant={"outlined"}*/}
          {/*        onClick={() => handleSave(rowData, newValue)}>Save</Button>*/}
        </th>
      </tr>
    </>

  );
}

const KeyValuesTableDataRows: React.FC<TableData> = ({data, setData}) => {
  const [objectsIndicesArr, setObjectIndicesArr] = useState<number[]>([]);
  const [tableData, setTableData] = useState(data);
  const [allValues, setAllValues] = useState<string | number>("");
  const [allValuesDataType, setAllValuesDataType] = useState<SelectorDataTypes>("text")
  const [saveAllClicked, setSaveAllClicked] = useState(false);

  // function setIndexNumbers(_array: object[]): number[] {
  //   const numArr: number[] = [];
  //   _array.map((obj, index) => {
  //     numArr.push(index);
  //   });
  //
  //   return numArr;
  // }

  useEffect(() => {
    setObjectIndicesArr(ArrayHelpers.setIndexNumbers(data));
    setTableData(data);

    // console.log("TABLE DATA [KeyValuesTableDataRows]", tableData);

  }, [data]);

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
                                indexNumbers={objectsIndicesArr}
                                allValuesDataType={allValuesDataType}
                                setAllValuesDataType={setAllValuesDataType}
        />
      </Grid>

      <table align={"left"} style={{borderCollapse: "collapse", border: "solid lightgrey 1px", fontSize: "0.9rem"}}>
        <tr>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "2%"}}>Index</th>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "10%"}}>Key</th>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "10%"}}>Value</th>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "6%"}}>Set Value</th>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "4%"}}>Data Type</th>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "2%"}}></th>
        </tr>
        {tableData.map((obj, index) => (
          <KeyValueRow
            key={index}
            indexNumbers={objectsIndicesArr}
            allValues={allValues}
            data={tableData}
            obj={obj}
            index={index}
            saveAllClicked={saveAllClicked}
            setSaveAllClicked={setSaveAllClicked}
            allValuesDataType={allValuesDataType}
            setAllValuesDataType={setAllValuesDataType}
          />
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
  const {showUpdateKeyValuesDialog, setShowUpdateKeyValuesDialog} = useContext(MyContext);

  // useEffect(() => {
  //   console.log("DIALOG KEY VALUE DATA [ChangeValuesTable]", dialogKeyValueData);
  // }, [dialogKeyValueData]);

  return (
    <div style={{width: "100%"}}>

      {/*<Backdrop open={true}>*/}
      {/*  <CssVarsProvider>*/}
      {/*    <CircularProgress variant={"solid"}/>*/}
      {/*  </CssVarsProvider>*/}
      {/*</Backdrop>*/}
      <KeyValuesTableDataRows data={dialogKeyValueData} setData={setDialogKeyValueData}/>

    </div>
  );
};

const ChangeValuesDialog: React.FC = () => {
  const {showUpdateKeyValuesDialog, setShowUpdateKeyValuesDialog} = useContext(MyContext);

  const hideDialog = () => {
    setShowUpdateKeyValuesDialog(false);
  }

  return (
    <Dialog fullWidth maxWidth={"lg"}
            onClose={hideDialog}
            open={showUpdateKeyValuesDialog}
            sx={{
              margin: "auto",
              maxWidth: "100%"
            }}>

      <Grid item padding={5}>
        <ChangeValuesTable/>
      </Grid>

    </Dialog>
  );
};

export default ChangeValuesDialog;