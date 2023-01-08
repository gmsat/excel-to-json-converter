import React, { useContext } from 'react';
import './App.css';
import ExcelToJson from "./modules/excel-to-json";
import { UploadDownload, DataPreview, DataOptions } from "./components";
import ContextTest from "./components/ContextTest";
import MyContext from "./context/my-context/MyContext";

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

function App() {
  // const [file, setFile] = useState<Blob | null>(null);
  // const [fileData, setFileData] = useState<string | null>(null);
  // const [downloadLink, setDownloadLink] = useState<null | string>(null);
  // const [outputData, setOutputData] = useState([]);
  // const [preview, setPreview] = useState(null);
  //
  // const [outputExists, setOutputExists] = useState(false);
  // const [downloadEnabled, setDownloadEnabled] = useState(false);
  //
  // // data options
  // // const [options, setOptions] = useState<boolean>(false);
  // const [header, setHeader] = useState("A12");
  // const [headerKeys, setHeaderKeys] = useState<string[]>([]);
  // const [oldKeys, setOldKeys] = useState<string[]>([]);
  // const [newKeys, setNewKeys] = useState<string[]>([]);


  // context
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
      }
    };

    reader.readAsArrayBuffer(file);
  }

  function setInstanceData(_headers: string[],
                           _parsed: any,
                           _outputExists: boolean,
                           _previewData: any
  ) {
    setHeaderKeys(_headers);
    setOldKeys(_headers);
    setNewKeys(_headers);
    setOutputData(_parsed);
    setOutputExists(_outputExists);
    setPreview(_parsed);
  }

  return (
    <div className="App">

      <ContextTest/>

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
