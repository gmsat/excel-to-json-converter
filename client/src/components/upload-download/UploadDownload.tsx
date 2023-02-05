import React, { useContext, useRef, useState } from 'react';
import MyContext from "../../context/my-context/MyContext";
import { Input, TextField, FormLabel, Grid, Grow, Fab, Paper, Typography } from "@mui/material";
import { Input as JoyInput, Box, Button, IconButton } from "@mui/joy";
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { HeaderInput } from "../data-keys/HeaderInput";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import RestartAltSharpIcon from '@mui/icons-material/RestartAltSharp';
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy";
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider, Stack, Collapse } from "@mui/material";

interface UploadDownloadProps {
  handleChange: (e: any) => void,
  outputExists: boolean,
  downloadEnabled: boolean,
  setDownloadEnabled: (_bool: boolean) => void,
  downloadLink: string
}

const hideUpload = {
  opacity: 0,
  height: "100%",
  width: "100%",
  cursor: "pointer",
  fontSize: "1rem",
  '&:hover': {
    cursor: "pointer"
  }
}

const uploadWrapperStyle = {
  border: "dashed black 2px",
  height: "60px",
  backgroundColor: "white",
  borderRadius: 2,
  display: "flex",
  flexFlow: "row",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
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
    transition: ".5s",
    backgroundColor: "rgba(0,0,0,0)"
  }
}

const UploadDownload: React.FC<UploadDownloadProps> = ({downloadLink,
                                                        setDownloadEnabled,
                                                        downloadEnabled,
                                                        outputExists,
                                                        handleChange}) => {
  const [options, setOptions] = useState(false);

  const {header, setHeader, file} = useContext(MyContext);
  const {preview} = useContext(MyContext);

  const uploadRef = useRef<HTMLInputElement>(null);

  const changeHeader = (e: any) => {
    const inputVal = e.target.value;
    setHeader(inputVal);
  }

  // TODO: show loader while data is being converted
  const handleSubmit = () => {
    setDownloadEnabled(true);
  }

  const handleReset = () => {
    window.location.reload();
  }

  const showOptions = () => {
    const newVal = !options;
    // setOptions((prev) => !prev);
    setOptions(newVal);
    console.log("OPTIONS : ", newVal);
  }

  return (
    <Grid container sx={containerStyle}>

      {!preview &&
        <Paper variant={"elevation"} sx={{borderRadius: 2}} elevation={4}>
          <Grid container display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"} gap={1} flex={1}
                sx={{
                  backgroundColor: "#0049FF",
                  padding: 2,
                  position: "relative",
                  borderRadius: 2
                }}>

            <Grid container display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={2}>
              <Grid item flex={2} alignSelf={"flex-end"}>
                <Button disabled={!outputExists} style={{width: "100%", backgroundColor: `${outputExists ? "#23C0AD" : "grey"}`, color: "white"}} type={"submit"} onClick={handleSubmit}>Convert to Json</Button>
              </Grid>
            </Grid>

            <Grid item sx={uploadWrapperStyle} width={"100%"}>
              <FileUploadRoundedIcon sx={{position: "absolute", fontSize: "2rem"}} fontSize={"large"}/>
              <Input required inputProps={{accept: ".xlsx"}} ref={uploadRef} sx={hideUpload} itemID={"upload"} type="file" id={"file"} onInputCapture={handleChange}/>
            </Grid>

            <Grid sx={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
              <em style={{left: 5, bottom: 5, color: "white"}}>.xlsx</em>
              <IconButton sx={{color: "black"}} variant={"plain"} size={"sm"} onClick={() => showOptions()}>
                <SettingsIcon sx={{fontSize: "1rem"}}/>
              </IconButton>
            </Grid>

            <Stack sx={{width: "100%", height: "100%"}}>
              <Collapse in={options}>
                <Divider sx={{backgroundColor: "black", marginBottom: 1}} variant={"fullWidth"}/>
                <Grid item display={"flex"} flexDirection={"column"} width={"100%"} flex={1}>
                  <label style={{fontSize: "0.8rem", color: "white"}} htmlFor="set-header">Header</label>
                  <JoyInput variant={"outlined"} size={"sm"} id={"set-header"} type={"text"} value={header} onChange={changeHeader}/>
                </Grid>
              </Collapse>
            </Stack>

          </Grid>

        </Paper>
      }

      <Grid container display={"flex"} flexDirection={"row"} margin={"auto"} gap={1} width={"30%"} sx={{justifyContent: "center", alignItems: "center"}} flex={1}>

        {preview &&
          <Grow in={outputExists}>
            <Grid>
              <a target={"_blank"} href={`${downloadLink}`} download={"download-file.json"}>
                {downloadEnabled ?

                  <Grid container sx={{display: "flex", flexFlow: "column", gap: 1}}>

                    <Button type={"reset"} onClick={handleReset} startDecorator={<RefreshIcon sx={{color: "white", fontSize: "2rem"}}/>}>
                      New File
                    </Button>

                    <Button startDecorator={<DownloadRoundedIcon/>}
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
                            type={"button"}
                            disabled={!downloadEnabled}>
                      Download
                    </Button>

                  </Grid>

                  : null
                }
              </a>
            </Grid>
          </Grow>
        }

        <Backdrop open={!preview && downloadEnabled}>
          <CssVarsProvider>
            <CircularProgress variant={"solid"}/>
          </CssVarsProvider>
        </Backdrop>

      </Grid>

    </Grid>
  );
}

export default UploadDownload;