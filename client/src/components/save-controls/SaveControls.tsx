import React, { useContext, useEffect, useRef, useState } from 'react';
import { Grid } from "@mui/material";
import { ApplyChangesSnackbar } from "../data-keys/DataKeys";
import MyContext from "../../context/my-context/MyContext";
import { Button } from "@mui/joy";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';

const SaveControls: React.FC = () => {
  const {preview, setPreview} = useContext(MyContext);
  const {reset, setReset} = useContext(MyContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [resetClicked, setResetClicked] = useState(false);
  // const [originalValue, setOriginalValue] = useState();
  const {file, setDownloadLink, downloadOutput} = useContext(MyContext);

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

    // const data = JSON.stringify(outputData, null, 2);
    // const fileBlob = new Blob([data], {type: "text/plain"});
    // const url = URL.createObjectURL(fileBlob);

    const data = JSON.stringify(downloadOutput, null, 2);
    const fileBlob = new Blob([data], {type: "text/plain"});
    const url = URL.createObjectURL(fileBlob);

    setDownloadLink(url);
    setOpenSnackbar(true);
  }

  // // // reset inputs to original values on reset button click
  // useEffect(() => {
  //   setValue(originalVal);
  // }, [resetClicked]);

  return (
    <>
      {/*<Grid sx={{position: "absolute", bottom: 0, left: 0}}>*/}
      {/*<Grid sx={{padding: 0, margin: 0, width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>*/}
      {/*  <button style={{margin: 12, backgroundColor: "orangered", color: "white"}} onClick={handleReset}>Reset</button>*/}
      {/*  <button style={{margin: 12, backgroundColor: "aquamarine"}} onClick={handleApply}>Save Changes</button>*/}
      {/*</Grid>*/}
      <Grid sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 1}}>


        {/*<button style={{margin: 0, backgroundColor: "orangered", color: "white"}} onClick={handleReset}>*/}
        {/*  <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 10}}>*/}
        {/*    <RestartAltIcon /> <div>Reset</div>*/}
        {/*  </div>*/}
        {/*</button>*/}

        <Button type={"submit"} startDecorator={<RestartAltIcon/>} size={"sm"} color={"danger"} variant={"solid"} onClick={handleReset}>Reset</Button>
        <Button startDecorator={<SaveIcon/>} size={"sm"} color={"success"} variant={"solid"} onClick={handleApply}>Save</Button>

      </Grid>

      <ApplyChangesSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}/>

    </>

  );
};

export default SaveControls;