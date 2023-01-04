import { useState } from 'react';
import './App.css';
import React from 'react';
import ExcelToJson from "../../src/modules/excel-to-json";

// upload button (input file)
// download button (output file)
// TODO: set options for data handling
// TODO: choose headers start (A1, A12, etc. Set default to A1)
// TODO: download raw json data
// TODO: download json data with changed headers

function App() {
  const e = new ExcelToJson();

  const [file, setFile] = useState<Blob | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const [downloadLink, setDownloadLink] = useState<null | string>(null);

  const [outputExists, setOutputExists] = useState(false);

  const handleChange = (e: any) => {
    setFile(e.target.files?.[0]);
    console.log("Set file:", file);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!file) { return; }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileData(reader.result as string);
      const testData = "file data test";
      const fileBlob = new Blob([testData], {type: "text/plain"});
      const url = URL.createObjectURL(fileBlob);
      setDownloadLink(url);
      if (downloadLink !== null || downloadLink !== "") {
        console.log(downloadLink);
        setOutputExists(true);
      }
    }
  }

  return (
    <div className="App">
      <div>

        <div className={"card"}>
          <label htmlFor="preview"></label>
          <input style={{height: "400px", width: "400px"}} disabled id={"preview"} type="text"/>
        </div>

        <div>
          <form onSubmit={handleSubmit}>

            <div style={{display: "flex", flexFlow: "column", width: "100%", gap: 20}}>

              <div style={{display: "flex", flexFlow: "row"}}>
                <input  style={{display: "flex", flex: 2}} type="file" id={"file"} onChange={handleChange}/>
                <button style={{display: "flex", flex: 1, width: "100%"}} type={"submit"}>Convert To Json</button>
              </div>

              <div>
                <a target={"_blank"} href={`${downloadLink}`} download={"download-file.txt"}>
                  <button style={{width: "100%"}} value={"Download"} type={"button"} disabled={!outputExists}>
                    Download
                  </button>
                </a>
              </div>

            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default App
