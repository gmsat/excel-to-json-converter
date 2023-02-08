import React, { useContext, useState } from 'react';
import { Grid } from "@mui/material";
import { ApplyChangesSnackbar } from "../data-keys/DataKeys";
import MyContext from "../../context/my-context/MyContext";
import { Button } from "@mui/joy";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';

const SaveControls: React.FC = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [resetClicked, setResetClicked] = useState(false);
  const [saveEnabled, setSaveEnabled] = useState(false);

  const {file, setDownloadLink, downloadOutput} = useContext(MyContext);
  const {setReset} = useContext(MyContext);

  const handleReset = () => {
    setResetClicked(true);
    setReset(true);

    setTimeout(() => {
      setResetClicked(false);
      setReset(false);
    }, 1000);
  }

  const handleApply = (e: any) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const data = JSON.stringify(downloadOutput, null, 2);
    const fileBlob = new Blob([data], {type: "text/plain"});
    const url = URL.createObjectURL(fileBlob);

    setDownloadLink(url);
    setOpenSnackbar(true);
    setSaveEnabled(false);
  }

  return (
    <>
      <Grid sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 1,
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1
      }}>

        <Button sx={{flex: 1}} startDecorator={<SaveIcon/>} size={"sm"} color={"success"} variant={"solid"}
                onClick={handleApply}>Save</Button>
        <Button sx={{flex: 1}} type={"submit"} startDecorator={<RestartAltIcon/>} size={"sm"} color={"danger"}
                variant={"solid"} onClick={handleReset}>Reset</Button>

      </Grid>

      <ApplyChangesSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}/>
    </>

  );
};

export default SaveControls;