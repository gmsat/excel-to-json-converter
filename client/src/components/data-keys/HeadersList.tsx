import React, { useContext, useEffect, useState } from "react";
import { HeaderInput } from "./HeaderInput";
import ExcelToJson from "../../modules/excel-to-json";
import MyContext from "../../context/my-context/MyContext";
import ChangeValuesDialog from "../change-values-dialog/ChangeValuesDialog";

export interface HeadersListProps {
  headers: string[],
  oldKeys: string[],
  newKeys: string[],
  setNewKeys: (_keys: string[]) => void,
  setHeaders: (_headers: string[]) => void,
  resetClicked: boolean,
  setResetClicked: (state: boolean) => void
}

// fix apply button not working on first click (options don't get applied on first button click)
// TODO: keep the state of changed headers, don't reset to old ones after clicking apply button
// TODO: update headers to new values after changing the header option

export const HeadersList: React.FC<HeadersListProps> = ({
                                                          oldKeys,
                                                          setNewKeys,
                                                          headers,
                                                          resetClicked,
                                                          setResetClicked
                                                        }) => {
  const [oldLocal, setOldLocal] = useState(oldKeys);
  const [updatedKeys, setUpdatedKeys] = useState(oldKeys);

  useEffect(() => {
    setOldLocal(oldKeys);
    setUpdatedKeys(oldKeys);
    setNewKeys(headers);
  }, [oldKeys]);

  useEffect(() => {
    setNewKeys(updatedKeys);
  }, [updatedKeys]);

  const {file, setFile} = useContext(MyContext);
  const {outputData, setOutputData} = useContext(MyContext);
  const {setDownloadLink} = useContext(MyContext);

  function setDownload() {
    if (!file) {
      return;
    }

    const data = JSON.stringify(outputData, null, 2);
    const fileBlob = new Blob([data], {type: "text/plain"});
    const url = URL.createObjectURL(fileBlob);

    setDownloadLink(url);
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

  return (
    <>
      {headers.map((item, index) =>
        <div key={index} style={{display: "flex", flexFlow: "column", alignItems: "flex-start"}}>

          <div>
            {index === 0 ? <button style={{margin: 12, backgroundColor: "aquamarine"}} onClick={handleApply}>Apply Changes</button> : null}
          </div>

          <div style={{display: "flex", gap: 10}}>
            {index === 0 ? <text style={{fontSize: "0.8rem"}}>Edit headers</text> : null}
          </div>

          <HeaderInput resetClicked={resetClicked}
                       setResetClicked={setResetClicked}
                       updatedKeys={updatedKeys}
                       setUpdatedKeys={setUpdatedKeys}
                       key={index}
                       itemData={item}
                       index={index}/>

        </div>
      )}
    </>
  )
}