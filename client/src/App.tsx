import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';
import ExcelToJson from "../../src/modules/excel-to-json";
import DataKeys from "./components/data_keys/DataKeys";

// upload button (input file)
// download button (output file)
// TODO: set options for data handling
// TODO: choose headers start (A1, A12, etc. Set default to A1)
// TODO: download raw json data
// TODO: download json data with changed headers
// TODO: create a custom hook for the logic of the app
// TODO: create separate components for the app
// TODO: style the app (tailwind / css)
// TODO: get headers from the uploaded .xlsx file (to change them to new values)
// TODO: generate a preview of the first json object

function App() {
  const e = new ExcelToJson();

  const [file, setFile] = useState<Blob | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const [downloadLink, setDownloadLink] = useState<null | string>(null);
  const [outputData, setOutputData] = useState([]);
  const [preview, setPreview] = useState(null);

  const [outputExists, setOutputExists] = useState(false);
  const [downloadEnabled, setDownloadEnabled] = useState(false);

  // data options
  const [options, setOptions] = useState<boolean>(false);
  const [header, setHeader] = useState("A12");
  const [headerKeys, setHeaderKeys] = useState<string[] | null>(null)

  // log output data when it gets set
  useEffect(() => {
    // console.log(outputData[0]);
    console.log("output exists:", outputExists);
  }, [outputData]);

  const handleChange = (e: any) => {
    setFile(e.target.files?.[0]);
    setOutputExists(true);
    // console.log("Set file:", file);
  }

  const handleEnableOptions = (e: any) => {
    setOptions(!options);
  }

  const changeHeader = (e: any) => {
    const inputVal = e.target.value;
    setHeader(inputVal);
  }

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //
  //   if (!file) { return; }
  //
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     setFileData(reader.result as string);
  //     const testData = "file data test";
  //     const fileBlob = new Blob([testData], {type: "text/plain"});
  //     const url = URL.createObjectURL(fileBlob);
  //     setDownloadLink(url);
  //     if (downloadLink !== null || downloadLink !== "") {
  //       console.log(downloadLink);
  //       setOutputExists(true);
  //     }
  //   }
  // }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!file) {
      console.log("NO FILE!!!");
      return;
    }

    const reader = new FileReader();
    const etj = new ExcelToJson();

    // reader.readAsDataURL(file);

    reader.onload = (evt) => {
      if (evt.target) {
        const binary = evt.target.result;

        const headers = etj.getHeadersFromBinary(binary, header);
        setHeaderKeys(headers);

        const data = etj.JSON_web(binary, header, "transform", ["AMOUNT", "N.laukas"], ["A", "N"]);
        const parsed = JSON.parse(data);
        const fileBlob = new Blob([data], {type: "text/plain"});
        const url = URL.createObjectURL(fileBlob);

        setDownloadLink(url);
        setOutputData(parsed);
        setOutputExists(true);
        setPreview(parsed[0]);

        // console.log("headers:", headers);
      }
    };

    reader.readAsArrayBuffer(file);
  }

  // data options
  // set header
  // select option (original data / transform)
  // transform options
  // TODO: controls to change old key names to custom
  //  1. Get header keys from data
  //  2. Options for header
  //    *change_key_name
  //    *change_key_value
  //    *disable_header
  // TODO: controls to change value to custom one for selected key
  // TODO: button to accept options and regenerate data
  // TODO: get header keys after pressing convert to json

  return (
    <div className="App">
      <div>

        <div style={{display: "flex", flexFlow: "column"}} className={"card"}>
          <label style={{textAlign: "left"}} htmlFor="preview">Preview</label>
          <textarea style={{height: "500px", width: "600px", resize: "none"}} disabled id={"preview"} value={preview ? JSON.stringify(preview, null, 2) : ""}/>
        </div>

        <div>
          <form onSubmit={handleSubmit}>

            <div style={{display: "flex", flexFlow: "column", width: "100%", gap: 20}}>

              <div style={{display: "flex", flexFlow: "row"}}>
                <input style={{display: "flex", flex: 2}} accept={".xlsx"} type="file" id={"file"} onChange={handleChange}/>
                <button disabled={!outputExists} style={{display: "flex", flex: 1, width: "100%"}} type={"submit"} onClick={() => setDownloadEnabled(true)}>Convert To Json</button>
              </div>

              <div>
                <a target={"_blank"} href={`${downloadLink}`} download={"download-file.txt"}>
                  <button style={{width: "100%"}} value={"Download"} type={"button"} disabled={!downloadEnabled}>Download</button>
                </a>
              </div>

              <div style={{display: "flex", flexFlow: "column", gap: 10, width: "100%", alignItems: "flex-start", padding: 7, border: "1px solid black"}}>
                <div>
                  <label htmlFor="enable-disable-options">Enable options</label>
                  <input id={"enable-disable-options"} type="checkbox" checked={options} onChange={handleEnableOptions}/>
                </div>
                <div>
                  <label htmlFor="set-header">Set Header</label>
                  <input disabled={!options} id={"set-header"} type={"text"} value={header} onChange={changeHeader}/>
                </div>
                <DataKeys data={headerKeys}/>
                <button disabled={!outputExists} style={{display: "flex", flex: 1, width: "100%"}} type={"submit"} onClick={() => setDownloadEnabled(true)}>Json With Options</button>
              </div>

            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default App
