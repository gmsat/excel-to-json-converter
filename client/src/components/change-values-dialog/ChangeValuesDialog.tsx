import React, { useContext, useEffect } from 'react';
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import MyContext from "../../context/my-context/MyContext";
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Input } from "@mui/joy";

// get values for each object based on header index
// TODO: apply new value to object on save button click

interface ChangeValuesDialogProps {
  headerIndex: number
}

export type TableObject = {index: number, keyIndex: number, key: string, value: number | string }

export interface TableData {
  data: TableObject[]
}

const KeyValuesTableDataRows: React.FC<TableData> = ({data}) => {

  useEffect(() => {
    console.log("Table Data:", data)
  }, [data]);

  // const {headers} = useContext(MyContext);

  const mapData =
  <>
    <DialogTitle>{data[0].key}</DialogTitle>
    <table align={"left"} style={{borderCollapse: "collapse", border: "solid lightgrey 1px"}}>
      <tr>
        <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "2%"}}>Reset</th>
        <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "2%"}}>Index</th>
        <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "10%"}}>Key</th>
        <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "10%"}}>Value</th>
        <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "10%"}}>Set Value</th>
        <th align={"left"} style={{padding: "10px", border: "solid lightgrey 1px", width: "2%"}}>Save</th>
      </tr>
      {data.map((obj, index) => (
        <tr>
          <th style={{padding: "2px", border: "solid lightgrey 1px"}} align={"left"}>
            <IconButton>
              <RestartAltIcon/>
            </IconButton>
          </th>
          <th style={{padding: "2px", border: "solid lightgrey 1px"}} align={"left"}>{obj.index}</th>
          <th style={{padding: "2px", border: "solid lightgrey 1px"}} align={"left"}>{obj.key}</th>
          <th style={{padding: "2px", border: "solid lightgrey 1px"}} align={"left"}>{obj.value}</th>
          <th style={{padding: "2px", border: "solid lightgrey 1px"}} align={"left"}>
            <Input size={"sm"} variant={"outlined"} type="text" placeholder={"enter new value"}/>
          </th>
          <th style={{padding: "2px", border: "solid lightgrey 1px"}} align={"left"}>
            <IconButton>
              <SaveIcon/>
            </IconButton>
          </th>
        </tr>
      ))}
    </table>
  </>

  return (
    <>
      {mapData}
    </>
  )
}

export const ChangeValuesTable = () => {

  const {dialogKeyValueData} = useContext(MyContext);

  // useEffect(() => {
  //   // console.log("dialog data", dialogKeyValueData);
  //   // TODO: log data
  //   dialogKeyValueData.map((obj, index) => {
  //     Object.entries(obj).map(([key, val]) => {
  //       // console.log("dialog key val", key, val);
  //       // console.log("dialog key val", obj.index);
  //       // console.log(obj);
  //     });
  //   });
  // }, [dialogKeyValueData]);

  return (
    <div style={{width: "100%"}}>
      <KeyValuesTableDataRows data={dialogKeyValueData}/>
    </div>
  );
};

const ChangeValuesDialog: React.FC<ChangeValuesDialogProps> = ({headerIndex}) => {
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
    <Dialog fullWidth maxWidth={"lg"} sx={{margin: "auto", maxWidth: "100%"}} open={showUpdateKeyValuesDialog}
            onClose={hideDialog}>
      {/*<DialogTitle>Update key values</DialogTitle>*/}
      <ChangeValuesTable/>
    </Dialog>
  );
};

export default ChangeValuesDialog;