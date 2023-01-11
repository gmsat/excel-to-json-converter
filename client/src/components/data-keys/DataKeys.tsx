import React, { useEffect, useState } from 'react';
import { HeadersList } from "./HeadersList";

export interface DataKeysProps {
  data: string[] | null,
  oldKeys: string[],
  setOldKeys: (newOldKeys: string[]) => void,
  newKeys: string[],
  setNewKeys: (newKeys: string[]) => void,
  handleSubmit: (e: any) => void
}

const DataKeys: React.FC<DataKeysProps> = ({data, newKeys, oldKeys, setNewKeys}) => {
  // const [headers, setHeaders] = useState<string[] | null>(null);
  // const [updatedKeys, setUpdatedKeys] = useState(oldKeys);
  const [headers, setHeaders] = useState<string[]>(data!);

  const [resetClicked, setResetClicked] = useState(false);

  useEffect(() => {
    setHeaders(data!);
  }, [data]);

  const handleReset = () => {
    setResetClicked(!resetClicked);
  }

  return (
    <div style={{display: "flex", flexFlow: "column", gap: 5}}>
      <button style={{margin: 12, backgroundColor: "orangered", color: "white"}} onClick={handleReset}>Reset</button>
      {headers ? <HeadersList setResetClicked={setResetClicked} resetClicked={resetClicked} setHeaders={setHeaders} headers={headers} newKeys={newKeys} setNewKeys={setNewKeys} oldKeys={oldKeys}/> : <div>Upload file to get data...</div>}
    </div>
  );
}

export default DataKeys;