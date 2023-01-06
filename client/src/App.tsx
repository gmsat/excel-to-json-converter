import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import ExcelToJson from "../../src/modules/excel-to-json";
import DataKeys from "./components/data_keys/DataKeys";
import { useMainStore } from "./store";

// upload button (input file)
// download button (output file)
// set options for data handling
// choose headers start (A1, A12, etc. Set default to A1)
// download raw json data
// TODO: download json data with changed headers
// TODO: separate parts of the app into separate components
// style the app (tailwind / css)
// get headers from the uploaded .xlsx file (to change them to new values)
// generate a preview of the first/all json object(s)

function App() {
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
  const [headerKeys, setHeaderKeys] = useState<string[]>([""]);
  const [oldKeys, setOldKeys] = useState<string[]>([""]);
  const [newKeys, setNewKeys] = useState<string[]>([]);

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

    if (!file) { return; }

    const reader = new FileReader();
    const etj = new ExcelToJson();

    reader.onload = (evt) => {
      if (evt.target) {
        const binary = evt.target.result;
        const headers = etj.getHeadersFromBinary(binary, header);
        const data = etj.JSON_web(binary, header, "transform", oldKeys, newKeys);
        const parsed = JSON.parse(data);
        const fileBlob = new Blob([data], {type: "text/plain"});
        const url = URL.createObjectURL(fileBlob);

        setHeaderKeys(headers);
        setOldKeys(headers);
        setNewKeys(headers);

        setDownloadLink(url);
        setOutputData(parsed);
        setOutputExists(true);
        setPreview(parsed);
      }
    };

    reader.readAsArrayBuffer(file);
  }

  // data options
  // set header
  // select option (original data / transform)
  // transform options
  // controls to change old key names to custom
  // 1. Get header keys from data
  // 2. Options for header
  // TODO: *change_key_name
  // TODO: *change_key_value
  // TODO: *disable_header
  // TODO: controls to change value to custom one for selected key
  // get header keys after pressing convert to json

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>

        <div style={{display: "flex", gap: 20}}>

          <div style={{display: "flex", flexFlow: "column", border: "solid lightgrey 1px", borderRadius: 6, padding: 10, gap: 10}}>

            <div style={{display: "flex", flexFlow: "row", padding: 20, alignItems: "center", backgroundColor: "lightgrey", borderRadius: 6}}>
              <input accept={".xlsx"} type="file" id={"file"} onChange={handleChange}/>
            </div>

            <div>
              <button disabled={!outputExists} style={{width: "100%", backgroundColor: "lightblue"}} type={"submit"} onClick={() => setDownloadEnabled(true)}>Convert</button>
            </div>

            <div>
              <a target={"_blank"} href={`${downloadLink}`} download={"download-file.txt"}>
                <button style={{width: "100%", backgroundColor: "orange"}} type={"button"} disabled={!downloadEnabled}>Download</button>
              </a>
            </div>

          </div>

          <div style={{display: "flex", flexFlow: "column", border: "solid lightgrey 1px", borderRadius: 6}}>

            <div style={{display: "flex", flexFlow: "column"}} className={"card"}>
              <label style={{textAlign: "left"}} htmlFor="preview">Preview</label>
              <textarea style={{height: "75vh", width: "600px", resize: "none"}} disabled id={"preview"} value={preview ? JSON.stringify(preview, null, 2) : ""}/>
            </div>

          </div>

          <div>
            <div style={{display: "flex", flexFlow: "column", width: "100%", gap: 20}}>

              <div style={{display: "flex", flexFlow: "column", gap: 10, width: "100%", alignItems: "flex-start", padding: 7, border: "solid lightgrey 1px", borderRadius: 6}}>

                <div style={{display: "flex", gap: 10, margin: "auto", alignItems: "center"}}>
                  <label htmlFor="set-header">Set Header</label>
                  <input id={"set-header"} type={"text"} value={header} onChange={changeHeader}/>
                </div>

                {outputExists ?
                  <DataKeys
                    data={headerKeys}
                    oldKeys={oldKeys}
                    newKeys={newKeys ?? newKeys}
                    setNewKeys={setNewKeys}
                    setOldKeys={setOldKeys}
                  />

                  : null
                }


              </div>

            </div>
          </div>

        </div>

      </form>
    </div>
  )
}

export default App
