import React, { useContext, useEffect } from 'react';
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import MyContext from "../../context/my-context/MyContext";
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Input } from "@mui/joy";

// TODO: get values for each object based on header index

interface ChangeValuesDialogProps {
  headerIndex: number
}

export const ChangeValuesTable = () => {

  const {dialogKeyValueData} = useContext(MyContext);

  useEffect(() => {
    // console.log("dialog data", dialogKeyValueData);
    // TODO: log data
    dialogKeyValueData.map((obj, index) => {
      Object.entries(obj).map(([key, val]) => {
        console.log("dialog key val", key, val);
      });
    });
  }, [dialogKeyValueData]);

  return (
    <div style={{width: "100%"}}>
      <table style={{width: "300px"}}>
        <tr>
          <th>Reset</th>
          <th>Index</th>
          <th>Key</th>
          <th>Value</th>
          <th>Set Value</th>
          <th>Save</th>
        </tr>
        <tr>
          <th>
            <IconButton>
              <RestartAltIcon/>
            </IconButton>
          </th>
          <th>0</th>
          <th>AMOUNT</th>
          <th>3200</th>
          <th style={{display: "flex"}}>
            <Input size={"sm"} variant={"outlined"} type="text" placeholder={"enter value"}/>
          </th>
          <th>
            <IconButton>
              <SaveIcon/>
            </IconButton>
          </th>
        </tr>
      </table>
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
      <DialogTitle>Update key values</DialogTitle>
      <ChangeValuesTable/>
    </Dialog>
  );
};

export default ChangeValuesDialog;