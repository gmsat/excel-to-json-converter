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
  const [headers, setHeaders] = useState<string[]>(data!);
  // const [updatedKeys, setUpdatedKeys] = useState(oldKeys);

  const [resetClicked, setResetClicked] = useState(false);

  useEffect(() => {
    setHeaders(data!);
    // setUpdatedKeys(oldKeys)
  }, [data]);

  // function getNewKeys(_array: string[], _index: number, _targetVal: any) {
  //   return _array!.map((item, i) => {
  //     if (i === _index) return _targetVal;
  //     else return item;
  //   });
  // }

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