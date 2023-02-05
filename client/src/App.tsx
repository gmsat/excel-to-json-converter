import React, { useContext, useEffect } from 'react';
import ExcelToJson from "./modules/excel-to-json";
import { DataOptions, DataPreview, UploadDownload, Loading } from "./components";
import MyContext from "./context/my-context/MyContext";
import ChangeValuesDialog from "./components/change-values-dialog/ChangeValuesDialog";
import { AppBar, Grid, Box, Drawer, Grow, Paper, Typography } from "@mui/material";
import "./app.css";
import { ArrayHelpers } from "./modules/json-data-options/ArrayHelpers";

// TODO: feature to change header values based on their index, choose for which objects to change values for
// TODO: enable / disable header feature, choose which keys and values to show and update all objects

// logic improvements
// after importing file, make the logic to manipulate json data separately, and set download file after manipulating the data
//  - don't run the convert button logic, make separate logic for options (Apply Changes)
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
  const {linesData, setLinesData} = useContext(MyContext);
  const {headersData, setHeadersData} = useContext(MyContext);
  const {outputDataNew, setOutputDataNew} = useContext(MyContext);

  const {downloadOutput, setDownloadOutput} = useContext(MyContext);

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

    // // original working (only lines)
    // reader.onload = (evt) => {
    //   if (evt.target) {
    //     const binary = evt.target.result;
    //     const headers = etj.getHeadersFromBinary(binary, header);
    //     const data = etj.JSON_web(binary, header);
    //     const parsed = JSON.parse(data);
    //     const fileBlob = new Blob([data], {type: "text/plain"});
    //     const url = URL.createObjectURL(fileBlob);
    //
    //     setDownloadLink(url);
    //
    //     setHeaderKeys(headers);
    //     setOldKeys(headers);
    //     setNewKeys(headers);
    //
    //     setOutputData(parsed);
    //     setOutputExists(true);
    //     setPreview(parsed);
    //
    //     // array.getDataTypes(parsed);
    //     array.getDataTypes2(parsed);
    //   }
    // };

    // App.tsx
    // TODO: set lines data
    // TODO: set headers data
    // TODO: set output data [add lines to headers] headers.lines = linesData
    // TODO: set preview data [headers with lines]

    // HeaderInput.tsx | ChangeValuesDialog.tsx
    // TODO: editing lines - update lines and update output/preview [update headers object] with updated lines data

    // reader.onload = (evt) => {
    //   if (evt.target) {
    //     const binary = evt.target.result;
    //     const headers = etj.getHeadersFromBinary(binary, header);
    //     const data = etj.JSON_web_all_data(binary, header);
    //
    //     const linesData = data[0];
    //     const headersSheet = JSON.parse(data[1]);
    //     const headersObj = headersSheet[0];
    //     const linesWithHeaders = headersObj;
    //
    //     linesWithHeaders.lines = JSON.parse(linesData);
    //
    //     console.log("Original Headers Only", headersObj);
    //     console.log("<<><><><><", linesWithHeaders);
    //
    //     // linesWithHeaders.lines = JSON.parse(linesData);
    //
    //     const parsed = JSON.parse(linesWithHeaders);
    //     const fileBlob = new Blob([linesWithHeaders], {type: "text/plain"});
    //     const url = URL.createObjectURL(fileBlob);
    //
    //
    //     setHeadersData(headersObj);
    //
    //
    //     console.log("Lines Data", JSON.parse(linesData));
    //     console.log("Headers data", headersData);
    //
    //
    //     setDownloadLink(url);
    //
    //     setHeaderKeys(headers);
    //     setOldKeys(headers);
    //     setNewKeys(headers);
    //
    //     setOutputData(parsed);
    //     setOutputExists(true);
    //
    //     setLinesData(JSON.parse(linesData));
    //
    //
    //     headersObj.lines = parsed;
    //
    //
    //     console.log("HEADERS WITH LINES:", headersObj);
    //
    //
    //     setOutputDataNew(headersObj);
    //     setPreview(headersObj);
    //
    //     // array.getDataTypes2(parsed);
    //   }
    // };

    // TODO: sets structure that includes headers
    reader.onload = (evt) => {
      if (evt.target) {
        const binary = evt.target.result;
        const headers = etj.getHeadersFromBinary(binary, header);
        const data = etj.JSON_web_all_data(binary, header);
        const headersSheet = JSON.parse(data[1]);
        const lines = JSON.parse(data[0]);
        const headersObj = headersSheet[0];

        // const headersOut = JSON.stringify(headersObj, null, 2);
        // const fileBlob = new Blob([headersOut], {type: "text/plain"});
        // const url = URL.createObjectURL(fileBlob);

        // setDownloadLink(url);

        setHeaderKeys(headers);
        setOldKeys(headers);
        setNewKeys(headers);

        // setLinesData(lines);
        setOutputData(lines);
        setOutputExists(true);
        setHeadersData(headersObj);
        setPreview({...headersObj, lines});

        setDownloadOutput({...headersObj, lines});

        setHeadersData(headersObj);

        // set file download output data
        const file = JSON.stringify({...headersObj, lines}, null, 2);
        const fileBlob = new Blob([file], {type: "text/plain"});
        const url = URL.createObjectURL(fileBlob);

        setDownloadLink(url);
        // array.getDataTypes(lines);
      }
    };

    // // TODO: sets structure that includes headers
    // reader.onload = (evt) => {
    //   if (evt.target) {
    //     const binary = evt.target.result;
    //     const headers = etj.getHeadersFromBinary(binary, header);
    //     const data = etj.JSON_web_all_data(binary, header);
    //     const headersSheet = JSON.parse(data[1]);
    //     const lines = JSON.parse(data[0]);
    //     const headersObj = headersSheet[0];
    //     const outputObj = headersObj;
    //
    //     outputObj.lines = lines;
    //
    //     const outputFile = JSON.stringify(outputObj, null, 2);
    //     const fileBlob = new Blob([outputFile], {type: "text/plain"});
    //     const url = URL.createObjectURL(fileBlob);
    //
    //     setDownloadLink(url);
    //
    //     setHeaderKeys(headers);
    //     setOldKeys(headers);
    //     setNewKeys(headers);
    //
    //     setOutputData(lines);
    //     // setOutputDataNew(outputObj);
    //     setOutputExists(true);
    //     setPreview(outputObj);
    //   }
    // };

    reader.readAsArrayBuffer(file);
  }

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
             padding: 1,
             boxSizing: "border-box",
             backgroundColor: "#FFB600"
           }}>

        <Grid container display={"flex"} flexDirection={"row"}>

          <Grid item sx={{
            display: "flex",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            flexShrink: 1
          }}>

            <UploadDownload handleChange={handleChange}
                            outputExists={outputExists}
                            downloadEnabled={downloadEnabled}
                            setDownloadEnabled={setDownloadEnabled}
                            downloadLink={downloadLink!}/>

          </Grid>

          {preview &&
            <Grow in={outputExists}>
              <Paper variant={"elevation"}
                     elevation={3}
                     sx={{
                       display: "flex",
                       padding: 2,
                       borderRadius: 2,
                       gap: 2,
                       backgroundColor: "#e3e4e9",
                       flex: 4}}>

                <Paper variant={"outlined"}>
                  <Grid item display={"flex"} flexDirection={"column"} padding={2}>
                    <Typography sx={{margin: 0, padding: 0}} fontSize={"0.6rem"} variant={"caption"}>{file?.name}</Typography>
                    <DataOptions headerKeys={headerKeys}
                                 oldKeys={oldKeys}
                                 setOldKeys={setOldKeys}
                                 newKeys={newKeys}
                                 setNewKeys={setNewKeys}
                                 handleSubmit={handleSubmit}
                                 outputExists={outputExists}/>
                  </Grid>
                </Paper>

                <Grid item flex={1}>
                  <DataPreview preview={preview}/>
                </Grid>

              </Paper>
            </Grow>

          }

        </Grid>

        <ChangeValuesDialog/>

      </Box>

    </Grid>
  );
}

export default App
