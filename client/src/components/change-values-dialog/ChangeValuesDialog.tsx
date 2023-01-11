import React, { useContext, useEffect, useState } from 'react';
import { Dialog, DialogTitle, IconButton,  } from "@mui/material";
import MyContext from "../../context/my-context/MyContext";
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Input, Grid, Button } from "@mui/joy";
import { Select } from "@mui/joy";
import { ArrayHelpers } from "../../modules/json-data-options/ArrayHelpers";

// get values for each object based on header index
// TODO: Create a component to change the values for objects based on their index [new value input, object indices]

// interface ChangeValuesDialogProps {
//   headerIndex: number
// }

export type TableObject = {index: number, keyIndex: number, key: string, value: number | string }

export interface TableData {
  data: TableObject[]
}

interface KeyValueRow {
  obj: TableObject
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

const KeyValueRow: React.FC<KeyValueRow> = ({obj}) => {
  const [newValue, setNewValue] = useState<string | number>("");
  const [rowData, setRowData] = useState<TableObject>(obj);
  const [applyClicked, setApplyClicked] = useState(false);

  // const {dialogKeyValueData} = useContext(MyContext);

  // TODO: set value type of the input [string or number or date]

  const {outputData, setOutputData} = useContext(MyContext);
  // const {newData, setNewData} = useContext(MyContext);
  const {setPreview} = useContext(MyContext);
  const {downloadLink, setDownloadLink} = useContext(MyContext);
  const {file, setFile} = useContext(MyContext);

  useEffect(() => {
    setRowData(obj);
  }, [applyClicked]);

  const handleValueChange = (e: any) => {
    const targetVal = e.target.value;
    setNewValue(targetVal);
    console.log(targetVal);
  }

  const handleSave = (_obj: any, _newValue: string | number) => {
    const array = new ArrayHelpers();
    const objectIndex = _obj.index;
    const keyIndex = _obj.keyIndex;
    const changedValues = array.updateObjectValuesByIndex(outputData, _newValue, keyIndex, [objectIndex]);

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
      // setDownload(changedValues);
    }, 100);
  }

  function setDownload(_newData: any) {
    if (!file) {
      return;
    }

    const data = JSON.stringify(_newData, null, 2);
    const fileBlob = new Blob([data], {type: "text/plain"});
    const url = URL.createObjectURL(fileBlob);

    setDownloadLink(url);
  }

  return (
    <tr>
      {/*<th style={{padding: "2px", border: "solid lightgrey 1px"}} align={"left"}>*/}
      {/*  <IconButton>*/}
      {/*    <RestartAltIcon/>*/}
      {/*  </IconButton>*/}
      {/*</th>*/}
      <th style={{padding: "2px", border: "solid lightgrey 1px"}} align={"left"}>{rowData.index}</th>
      <th style={{padding: "2px", border: "solid lightgrey 1px"}} align={"left"}>{rowData.key}</th>
      <th style={{padding: "2px", border: "solid lightgrey 1px"}} align={"left"}>{rowData.value}</th>
      <th style={{padding: "2px", border: "solid lightgrey 1px"}} align={"left"}>
        <Input onChange={handleValueChange} size={"sm"} variant={"plain"} type="text" placeholder={"enter new value"} value={newValue}/>
      </th>
      <th style={{padding: "2px", border: "solid lightgrey 1px"}} align={"left"}>
        <IconButton onClick={() => handleSave(rowData, newValue)}>
          <SaveIcon/>
        </IconButton>
      </th>
    </tr>
  )
}

const KeyValuesTableDataRows: React.FC<TableData> = ({data}) => {
  // useEffect(() => {
  //   console.log("Table Data : useEffect() [ChangeValuesDialog]", data);
  // }, [data]);

  const mapData =
    <div>

      <Grid display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
        <DialogTitle sx={{flex: 1}}>{data[0]?.key}</DialogTitle>
        <MultiChangeValuesInput/>
        {/*<Select size={"sm"} variant={"outlined"}/>*/}
      </Grid>

      <table align={"left"} style={{borderCollapse: "collapse", border: "solid lightgrey 1px", margin: 30}}>
        <tr>
          {/*<th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "2%"}}>Reset</th>*/}
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "2%"}}>Index</th>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "10%"}}>Key</th>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "10%"}}>Value</th>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "10%"}}>Set Value</th>
          <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "2%"}}>Save</th>
        </tr>
        {data.map((obj, index) => (
          <KeyValueRow obj={obj}/>
        ))}
      </table>
    </div>

  return (
    <>
      {mapData}
    </>
  )
}

export const ChangeValuesTable = () => {

  const {dialogKeyValueData} = useContext(MyContext);

  useEffect(() => {
    console.log("dialog key value data [ChangeValuesDialog]", dialogKeyValueData);
  }, [dialogKeyValueData])

  // useEffect(() => {
  //   // console.log("dialog data", dialogKeyValueData);
  //   // TODO: log data
  //   dialogKeyValueData.map((obj, index) => {
  //     Object.entries(obj).map(([key, val]) => {
  //       // console.log("dialog key val", key, val);
  //       // console.log("dialog key val", obj.index);
  //       console.log("USE EFFECT [ChangeValuesDialog]", obj);
  //     });
  //   });
  // }, [dialogKeyValueData]);

  return (
    <div style={{width: "100%"}}>
      <KeyValuesTableDataRows data={dialogKeyValueData}/>
    </div>
  );
};

const ChangeValuesDialog: React.FC = () => {
  // const [open, setOpen] = useState(true);
  const {outputData, setOutputData} = useContext(MyContext);
  const {showUpdateKeyValuesDialog, setShowUpdateKeyValuesDialog} = useContext(MyContext);

  const hideDialog = () => {
    setShowUpdateKeyValuesDialog(false);
  }

  const handleSubmit = () => {
    // TODO: update data
    // TODO: update download file
  }

  // data and UI to show in dialog
  // TODO: Header text
  // TODO: Selector to change header / or list of headers and show currently selected header
  // TODO: Input field to enter index numbers (apply changes only to objects with index)
  // TODO: [all objects / custom selection / enter index]
  // TODO: Table [object index, key name, value, reset original]

  return (
    <Dialog fullWidth maxWidth={"lg"} sx={{margin: "auto", maxWidth: "100%"}} open={showUpdateKeyValuesDialog} onClose={hideDialog}>
      {/*<DialogTitle>Update key values</DialogTitle>*/}
      <ChangeValuesTable/>
    </Dialog>
  );
};

export default ChangeValuesDialog;