import React, { useContext, useEffect } from 'react';
import ExcelToJson from "./modules/excel-to-json";
import { DataOptions, DataPreview, UploadDownload, Loading } from "./components";
import MyContext from "./context/my-context/MyContext";
import ChangeValuesDialog from "./components/change-values-dialog/ChangeValuesDialog";
import { AppBar, Grid, Box, Drawer, Grow } from "@mui/material";
import "./app.css";
import { ArrayHelpers } from "./modules/json-data-options/ArrayHelpers";

// TODO: feature to change header values based on their index, choose for which objects to change values for
// TODO: enable / disable header feature, choose which keys and values to show and update all objects

// logic improvements
// after importing file, make the logic to manipulate json data separately, and set download file after manipulating the data
//  - don't run the the convert button logic, make separate logic for options (Apply Changes)
//  - set json data
//  - manipulate data with options
//  - apply button applies changes to data and sets new download file with the data
//  - setting headers will rerun the conversion from .xlsx file and reset the options (because headers will be different)

// implement logic to change key values based on the index of the object (change based on selection)

// data manipulation should only happen to json object after importing file

// workflow
//  - choose .xlsx file to upload
//  - press convert button
//  - convert input to json (with selected header)
//  - manipulate converted data (options)
//  - apply changes (Apply Changes btn) / reset changes resets data to initial conversion (Reset btn)
//  - set new output file data
//  - download (Download btn)

// refactoring tasks
// refactor prop drilling from components

// Requirements
// change values by index
// TODO: detect value types
// TODO: create executable

// TODO: Current
// Make a separate function to save file for manipulated data
// TODO: Setting headers uses .xlsx file and resets the options
// TODO: implement feature to change the value of key based on index (enter index numbers / choose objects)

function App() {
  const {file, setFile} = useContext(MyContext);
  const {downloadLink, setDownloadLink} = useContext(MyContext);
  const {outputData, setOutputData} = useContext(MyContext);
  const {preview, setPreview} = useContext(MyContext);
  const {outputExists, setOutputExists} = useContext(MyContext);
  const {downloadEnabled, setDownloadEnabled} = useContext(MyContext);
  const {header, setHeader} = useContext(MyContext);
  const {headerKeys, setHeaderKeys} = useContext(MyContext);
  const {oldKeys, setOldKeys} = useContext(MyContext);
  const {newKeys, setNewKeys} = useContext(MyContext);

  const handleChange = (e: any) => {
    const files = e.target.files;
    const file = e.target.files?.[0];

    console.log("FILE FILE FIEL", file)

    // setFile(e.target.files?.[0]);
    setFile(file);
    setOutputExists(true);

    // e.target.value = "";

    console.log("\nFILES:", files);
  }

  const changeHeader = (e: any) => {
    const inputVal = e.target.value;
    setHeader(inputVal);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!file) {
      console.log("NO FILE! return;");
      return;
    }

    const reader = new FileReader();
    const etj = new ExcelToJson();
    const array = new ArrayHelpers();

    reader.onload = (evt) => {
      if (evt.target) {
        const binary = evt.target.result;
        const headers = etj.getHeadersFromBinary(binary, header);
        const data = etj.JSON_web(binary, header);
        const parsed = JSON.parse(data);
        const fileBlob = new Blob([data], {type: "text/plain"});
        const url = URL.createObjectURL(fileBlob);

        setDownloadLink(url);

        setHeaderKeys(headers);
        setOldKeys(headers);
        setNewKeys(headers);

        setOutputData(parsed);
        setOutputExists(true);
        setPreview(parsed);


        array.getDataTypes(parsed);
      }
    };

    reader.readAsArrayBuffer(file);
  }

  // useEffect(() => {
  //   console.log("DOWNLOAD ENABLED:", downloadEnabled)}, [downloadEnabled]);
  // useEffect(() => {
  //   console.log("DOWNLOAD ENABLED:", downloadEnabled)}, []);

  return (

    <Grid display={"flex"}
          sx={{
            boxSizing: "content-box",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            backgroundColor: "black"
          }}
    >

      <Box component={"form"}
           onSubmit={handleSubmit}
           sx={{
             display: "flex",
             flexFlow: "row",
             justifyContent: "center",
             alignItems: "center",
             width: "100%",
             margin: "auto",
             padding: 3,
             boxSizing: "border-box",
             backgroundColor: "#FFB600"
           }}>

        <Grid container display={"flex"} flexDirection={"row"}>

          <Grid item sx={{
            display: "flex",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1
          }}>

            <UploadDownload handleChange={handleChange}
                            outputExists={outputExists}
                            downloadEnabled={downloadEnabled}
                            setDownloadEnabled={setDownloadEnabled}
                            downloadLink={downloadLink!}/>

          </Grid>

          {preview &&
            <Grow in={outputExists}>
              <Grid item display={"flex"} sx={{
                border: "solid white 1px",
                padding: 2,
                borderRadius: 2,
                backgroundColor: "white"
              }}>

                <Grid item display={"flex"} flexDirection={"row"} gap={4} padding={4}>
                  <DataOptions headerKeys={headerKeys}
                               oldKeys={oldKeys}
                               setOldKeys={setOldKeys}
                               newKeys={newKeys}
                               setNewKeys={setNewKeys}
                               handleSubmit={handleSubmit}
                               outputExists={outputExists}/>
                </Grid>

                <Grid item flex={1}>
                  <DataPreview preview={preview}/>
                </Grid>

              </Grid>
            </Grow>

          }

        </Grid>

        <ChangeValuesDialog/>

      </Box>

    </Grid>
  );
}

export default App
