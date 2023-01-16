import React, { useContext, useEffect, useState } from 'react';
import { HeadersList } from "./HeadersList";
import { Button, Grid } from "@mui/material";
import MyContext from "../../context/my-context/MyContext";

export interface DataKeysProps {
  data: string[] | null,
  oldKeys: string[],
  setOldKeys: (newOldKeys: string[]) => void,
  newKeys: string[],
  setNewKeys: (newKeys: string[]) => void,
  handleSubmit: (e: any) => void
}

const DataKeys: React.FC<DataKeysProps> = ({data, newKeys, oldKeys, setNewKeys}) => {
  const [headers, setHeaders] = useState<string[]>(data!);
  const [resetClicked, setResetClicked] = useState(false);

  const {file, setFile} = useContext(MyContext);
  const {outputData, setOutputData} = useContext(MyContext);
  const {setDownloadLink} = useContext(MyContext);

  const handleReset = () => {
    setResetClicked(!resetClicked);
  }

  const handleApply = (e: any) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const data = JSON.stringify(outputData, null, 2);
    const fileBlob = new Blob([data], {type: "text/plain"});
    const url = URL.createObjectURL(fileBlob);

    setDownloadLink(url);
  }

  useEffect(() => {
    setHeaders(data!);
  }, [data]);

  return (
    <div style={{display: "flex", flexFlow: "column", gap: 5}}>

      <Grid>
        <button style={{margin: 12, backgroundColor: "orangered", color: "white"}} onClick={handleReset}>Reset</button>
        <button style={{margin: 12, backgroundColor: "aquamarine"}} onClick={handleApply}>Apply Changes</button>
      </Grid>

      {headers ? <HeadersList setResetClicked={setResetClicked} resetClicked={resetClicked} setHeaders={setHeaders} headers={headers} newKeys={newKeys} setNewKeys={setNewKeys} oldKeys={oldKeys}/> : <div>Upload file to get data...</div>}

    </div>
  );
}

export default DataKeys;