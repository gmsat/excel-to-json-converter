import React, { useState } from 'react';
import './App.css';
import ExcelToJson from "./modules/excel-to-json";
import { UploadDownload, DataPreview, DataOptions } from "./components";

// TODO: feature to change header values based on their index, choose for which objects to change values for
// TODO: enable / disable header feature, choose which keys and values to show and update all objects

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
  const [headerKeys, setHeaderKeys] = useState<string[]>([]);
  const [oldKeys, setOldKeys] = useState<string[]>([]);
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

    if (!file) {
      return;
    }

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

        setDownloadLink(url);

        setHeaderKeys(headers);
        setOldKeys(headers);
        setNewKeys(headers);

        setOutputData(parsed);
        setOutputExists(true);
        setPreview(parsed);

        // setInstanceData(
        //   headers,
        //   url,
        //   parsed,
        //   true,
        //   preview);
      }
    };

    reader.readAsArrayBuffer(file);
  }

  function setInstanceData(_headers: string[],
                           _url: string,
                           _parsed: any,
                           _outputExists: boolean,
                           _previewData: any
  ) {
    setHeaderKeys(_headers);
    setOldKeys(_headers);
    setNewKeys(_headers);

    setDownloadLink(_url);
    setOutputData(_parsed);
    setOutputExists(_outputExists);
    setPreview(_parsed);
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

          <DataPreview preview={preview}/>

          <DataOptions headerKeys={headerKeys}
                       oldKeys={oldKeys}
                       setOldKeys={setOldKeys}
                       newKeys={newKeys}
                       setNewKeys={setNewKeys}
                       handleSubmit={handleSubmit}
                       outputExists={outputExists}
                       header={header}
                       changeHeader={changeHeader}/>
        </div>
      </form>
    </div>
  );
}

export default App
