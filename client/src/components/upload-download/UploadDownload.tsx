import React, { useContext } from 'react';
import MyContext from "../../context/my-context/MyContext";
import { Button, Input, TextField, FormLabel, Grid } from "@mui/material";
import { Input as JoyInput, Box } from "@mui/joy";
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';

interface UploadDownloadProps {
  handleChange: (e: any) => void,
  outputExists: boolean,
  downloadEnabled: boolean,
  setDownloadEnabled: (_bool: boolean) => void,
  downloadLink: string
}

const hideUpload = {
  opacity: 0,
  // zIndex: "-10",
  '&:hover': {
    cursor: "pointer"
  }
}

const uploadButtonBoxStyle = {
  border: "solid white 1px",
  width: "120px",
  backgroundColor: "black",
  borderRadius: 4,
  display: "flex",
  justifyContent: "center",
  alightItems: "center",
  '&:hover': {
    backgroundColor: "#00a10f",
  }
}

const UploadDownload: React.FC<UploadDownloadProps> = ({downloadLink,
                                                        setDownloadEnabled,
                                                        downloadEnabled,
                                                        outputExists,
                                                        handleChange}) => {
  const {header, setHeader} = useContext(MyContext);

  const changeHeader = (e: any) => {
    const inputVal = e.target.value;
    setHeader(inputVal);
  }

  return (
    <>
      <div style={{display: "flex", flexFlow: "row", borderRadius: 6, padding: 10, gap: 10}}>

        <Grid display={"flex"} flexDirection={"column"}>
          <label htmlFor="set-header">Set Header</label>
          <TextField sx={{backgroundColor: "white"}} size={"small"} id={"set-header"} type={"text"} value={header} onChange={changeHeader}/>
        </Grid>

        <Box sx={uploadButtonBoxStyle}>
          <FileUploadRoundedIcon sx={{position: "absolute", fontSize: "3rem"}} fontSize={"large"}/>
          <TextField sx={hideUpload} itemID={"upload"} variant={"outlined"} type="file" id={"file"} onChange={handleChange} required/>
        </Box>

        <div>
          <Button disabled={!outputExists} style={{width: "100%", backgroundColor: "lightblue"}} type={"submit"} onClick={() => setDownloadEnabled(true)}>Convert</Button>
        </div>

        <div>
          <a target={"_blank"} href={`${downloadLink}`} download={"download-file.txt"}>
            <Button style={{width: "100%", backgroundColor: "orange"}} type={"button"} disabled={!downloadEnabled}>Download</Button>
          </a>
        </div>

      </div>
    </>

  );
}

export default UploadDownload;