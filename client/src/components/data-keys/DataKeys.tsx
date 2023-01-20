import React, { useContext, useEffect, useState } from 'react';
import { HeadersList } from "./HeadersList";
import { Button, Grid, Snackbar } from "@mui/material";
import MyContext from "../../context/my-context/MyContext";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { SaveControls } from "../index";

export interface DataKeysProps {
  data: string[] | null,
  oldKeys: string[],
  setOldKeys: (newOldKeys: string[]) => void,
  newKeys: string[],
  setNewKeys: (newKeys: string[]) => void,
  handleSubmit: (e: any) => void
}

interface ApplyChangesSnackbarProps {
  openSnackbar: boolean,
  setOpenSnackbar: (_val: boolean) => void
}

export const ApplyChangesSnackbar: React.FC<ApplyChangesSnackbarProps> = ({openSnackbar, setOpenSnackbar}) => {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar open={openSnackbar}
              autoHideDuration={1500}
              onClose={handleClose}
              message={"Changes saved!"}
              action={action}
    />
  )
}

const DataKeys: React.FC<DataKeysProps> = ({data, newKeys, oldKeys, setNewKeys}) => {
  const [headers, setHeaders] = useState<string[]>(data!);
  const [resetClicked, setResetClicked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [enableSaveChanges, setEnableSaveChanges] = useState(false);

  const {file, setFile} = useContext(MyContext);
  const {outputData, setOutputData} = useContext(MyContext);
  const {setDownloadLink} = useContext(MyContext);

  const {downloadOutput, setDownloadOutput} = useContext(MyContext);

  // const handleReset = () => {
  //   setResetClicked(!resetClicked);
  // }
  //
  // const handleApply = (e: any) => {
  //   e.preventDefault();
  //
  //   if (!file) {
  //     return;
  //   }
  //
  //   // const data = JSON.stringify(outputData, null, 2);
  //   // const fileBlob = new Blob([data], {type: "text/plain"});
  //   // const url = URL.createObjectURL(fileBlob);
  //
  //   const data = JSON.stringify(downloadOutput, null, 2);
  //   const fileBlob = new Blob([data], {type: "text/plain"});
  //   const url = URL.createObjectURL(fileBlob);
  //
  //   setDownloadLink(url);
  //   setOpenSnackbar(true);
  // }

  useEffect(() => {
    setHeaders(data!);
  }, [data]);

  return (
    <Grid>
      <div style={{display: "flex", flexFlow: "column", gap: 5}}>

        <Grid>

          {/*<SaveControls handleReset={handleReset} handleApply={handleApply}/>*/}

          {/*<ApplyChangesSnackbar*/}
          {/*  openSnackbar={openSnackbar}*/}
          {/*  setOpenSnackbar={setOpenSnackbar}/>*/}

        </Grid>

        {headers ? <HeadersList setResetClicked={setResetClicked}
                                resetClicked={resetClicked}
                                setHeaders={setHeaders}
                                headers={headers}
                                newKeys={newKeys}
                                setNewKeys={setNewKeys}
                                oldKeys={oldKeys}/>

          : <div>Upload file to get data...</div>}

      </div>

      {/*<Grid>*/}
      {/*  <button style={{margin: 12, backgroundColor: "orangered", color: "white"}} onClick={handleReset}>Reset</button>*/}
      {/*  <button style={{margin: 12, backgroundColor: "aquamarine"}} onClick={handleApply}>Save Changes</button>*/}
      {/*</Grid>*/}

      {/*<SaveControls handleReset={handleReset} handleApply={handleApply}/>*/}

    </Grid>

  );
}

export default DataKeys;