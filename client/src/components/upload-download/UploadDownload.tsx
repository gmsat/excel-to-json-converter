import React, { useContext, useRef } from 'react';
import MyContext from "../../context/my-context/MyContext";
import { Input, TextField, FormLabel, Grid, Grow, Fab } from "@mui/material";
import { Input as JoyInput, Box, Button, IconButton } from "@mui/joy";
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { HeaderInput } from "../data-keys/HeaderInput";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import RestartAltSharpIcon from '@mui/icons-material/RestartAltSharp';

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
  border: "dashed black 2px",
  height: "100%",
  backgroundColor: "white",
  borderRadius: 2,
  display: "flex",
  flexFlow: "row",
  justifyContent: "center",
  '&:hover': {
    backgroundColor: "black",
    color: "white",
    border: "dashed white 2px",
  }
}

const containerStyle = {
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: 2,
  gap: 4
}

const HeaderInputProps = {
  style: {
    fontSize: "0.9rem"
  }
}

const ResetButtonStyle = {
  position: "absolute",
  top: -5,
  right: -5,
  '&:hover': {
    transform: "scale(1.1)",
    transition: ".5s"
  }
}

const UploadDownload: React.FC<UploadDownloadProps> = ({downloadLink,
                                                        setDownloadEnabled,
                                                        downloadEnabled,
                                                        outputExists,
                                                        handleChange}) => {
  const {header, setHeader, file} = useContext(MyContext);
  const {preview} = useContext(MyContext);

  const uploadRef = useRef<HTMLInputElement>(null);

  const {setPreview,
         setOutputExists,
         setOutputData,
         setOldKeys,
         setNewKeys,
         setHeaderKeys,
         setDownloadLink,
         setFile,
         setDialogKeyValueData} = useContext(MyContext);

  const changeHeader = (e: any) => {
    const inputVal = e.target.value;
    setHeader(inputVal);
  }

  // const handleReset = () => {
  //   setDownloadEnabled(false);
  //   setPreview(null);
  //   // setOutputExists(false);
  //   setOutputData([]);
  //   setOldKeys([]);
  //   setNewKeys([]);
  //   setHeaderKeys([]);
  //   setDownloadLink(null);
  //   setFile(null);
  //   setDialogKeyValueData([]);
  //
  //   uploadRef.current!.value = "";
  //
  //   console.log("FILE:", file);
  // }

  const handleReset = () => {
    window.location.reload();
  }

  return (
    <Grid container sx={containerStyle}>

      <Grid container display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"} gap={1} flex={1}
            sx={{
              backgroundColor: "#0049FF",
              padding: 2,
              borderRadius: 2,
              position: "relative"
            }}>

        <IconButton sx={ResetButtonStyle} onClick={handleReset}>
          <RestartAltSharpIcon sx={{color: "white", fontSize: "2rem"}}/>
        </IconButton>

        <Grid container display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={2}>

          <Grid item display={"flex"} flexDirection={"column"} width={"100%"} flex={1}>
            <label style={{fontSize: "0.8rem", color: "white"}} htmlFor="set-header">Header</label>
            <TextField inputProps={HeaderInputProps} sx={{backgroundColor: "white", borderRadius: 1, width: "100%"}} size={"small"} id={"set-header"} type={"text"} value={header} onChange={changeHeader}/>
          </Grid>

          <Grid item flex={2} alignSelf={"flex-end"}>
            <Button disabled={!outputExists} style={{width: "100%", backgroundColor: `${outputExists ? "#23C0AD" : "grey"}`, color: "white"}} type={"submit"} onClick={() => setDownloadEnabled(true)}>Convert</Button>
          </Grid>

        </Grid>

        <Grid item sx={uploadButtonBoxStyle} width={"100%"}>
          <FileUploadRoundedIcon sx={{position: "absolute", fontSize: "2rem"}} fontSize={"large"}/>
          <TextField ref={uploadRef} sx={hideUpload} itemID={"upload"} variant={"outlined"} type="file" id={"file"} onInputCapture={handleChange} required/>
        </Grid>

      </Grid>

      <Grid container display={"flex"} flexDirection={"row"} margin={"auto"} gap={1} width={"30%"} sx={{justifyContent: "center", alignItems: "center"}} flex={1}>

        {preview &&
          <Grow in={outputExists}>
            <Grid item width={"100%"}>
              <a target={"_blank"} href={`${downloadLink}`} download={"download-file.txt"}>
                {downloadEnabled ? <Button startDecorator={<DownloadRoundedIcon/>}
                                           sx={{
                                             width: "100%",
                                             backgroundColor: "#141824",
                                             color: "white",
                                             display: "flex",
                                             alignItems: "center",
                                             justifyContent: "center",
                                             '&:hover': {
                                               backgroundColor: "white",
                                               color: "black"
                                             }
                                           }}
                                           type={"button"} disabled={!downloadEnabled}></Button> : null}
              </a>
            </Grid>
          </Grow>
        }

      </Grid>

    </Grid>
  );
}

export default UploadDownload;