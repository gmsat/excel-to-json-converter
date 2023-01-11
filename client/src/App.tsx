import React, { useContext } from 'react';
import './App.css';
import ExcelToJson from "./modules/excel-to-json";
import { UploadDownload, DataPreview, DataOptions } from "./components";
import MyContext from "./context/my-context/MyContext";
import { ArrayHelpers } from "./modules/json-data-options/ArrayHelpers";
import ChangeValuesDialog, { ChangeValuesTable } from "./components/change-values-dialog/ChangeValuesDialog";

// TODO: feature to change header values based on their index, choose for which objects to change values for
// TODO: enable / disable header feature, choose which keys and values to show and update all objects

// TODO: logic improvements
// TODO: after importing file, make the logic to manipulate json data separately, and set download file after manipulating the data
//  - don't run the the convert button logic, make separate logic for options (Apply Changes)
//  - set json data
//  - manipulate data with options
//  - apply button applies changes to data and sets new download file with the data
//  - setting headers will rerun the conversion from .xlsx file and reset the options (because headers will be different)

// TODO: implement logic to change key values based on the index of the object (change based on selection)

// TODO: data manipulation should only happen to json object after importing file

// TODO: workflow
//  - choose .xlsx file to upload
//  - press convert button
//  - convert input to json (with selected header)
//  - manipulate converted data (options)
//  - apply changes (Apply Changes btn) / reset changes resets data to initial conversion (Reset btn)
//  - set new output file data
//  - download (Download btn)

// TODO: refactoring tasks
// TODO: refactor prop drilling from components

// TODO: Requirements
// TODO: change values by index
// TODO: detect value types
// TODO: create executable

// TODO: Current
// TODO: Make a separate function to save file for manipulated data
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
    setFile(e.target.files?.[0]);
    setOutputExists(true);
  }

  const changeHeader = (e: any) => {
    const inputVal = e.target.value;
    setHeader(inputVal);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const reader = new FileReader();
    const etj = new ExcelToJson();

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
      }
    };

    reader.readAsArrayBuffer(file);
  }

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <div style={{display: "flex", gap: 20}}>

          <UploadDownload handleChange={handleChange}
                          outputExists={outputExists}
                          downloadEnabled={downloadEnabled}
                          setDownloadEnabled={setDownloadEnabled}
                          downloadLink={downloadLink!}/>

          <DataOptions headerKeys={headerKeys}
                       oldKeys={oldKeys}
                       setOldKeys={setOldKeys}
                       newKeys={newKeys}
                       setNewKeys={setNewKeys}
                       handleSubmit={handleSubmit}
                       outputExists={outputExists}/>

          <DataPreview preview={preview}/>

          <ChangeValuesDialog/>

        </div>
      </form>
    </div>
  );
}

export default App
