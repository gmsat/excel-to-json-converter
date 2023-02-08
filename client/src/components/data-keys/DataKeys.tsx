import React, { useContext, useEffect, useState } from 'react';
import { HeadersList } from "./HeadersList";
import { Grid, IconButton, Snackbar } from "@mui/material";
import MyContext from "../../context/my-context/MyContext";
import CloseIcon from '@mui/icons-material/Close';

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
        <CloseIcon fontSize="small"/>
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

  useEffect(() => {
    const newHeaders = data!;
    setHeaders(newHeaders);
  }, [data]);

  return (
    <Grid>
      <div style={{display: "flex", flexFlow: "column", gap: 5}}>
        {headers

          ? <HeadersList setResetClicked={setResetClicked}
                         resetClicked={resetClicked}
                         setHeaders={setHeaders}
                         headers={headers}
                         newKeys={newKeys}
                         setNewKeys={setNewKeys}
                         oldKeys={oldKeys}/>

          : <div>Upload file to get data...</div>
        }
      </div>
    </Grid>

  );
}

export default DataKeys;