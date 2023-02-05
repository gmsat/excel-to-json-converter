import React, { useContext, useEffect, useState } from "react";
import { HeaderInput } from "./HeaderInput";
import MyContext from "../../context/my-context/MyContext";
import { Box, Grid, List, Paper } from "@mui/material";

export interface HeadersListProps {
  headers: string[],
  oldKeys: string[],
  newKeys: string[],
  setNewKeys: (_keys: string[]) => void,
  setHeaders: (_headers: string[]) => void,
  resetClicked: boolean,
  setResetClicked: (state: boolean) => void
}

export const HeadersList: React.FC<HeadersListProps> = ({
                                                          oldKeys,
                                                          setNewKeys,
                                                          headers,
                                                          resetClicked,
                                                          setResetClicked
                                                        }) => {
  const [oldLocal, setOldLocal] = useState(oldKeys);
  const [updatedKeys, setUpdatedKeys] = useState(oldKeys);
  const [headersLocal, setHeadersLocal] = useState(headers);

  const {file, setFile} = useContext(MyContext);
  const {outputData, setOutputData} = useContext(MyContext);
  const {setDownloadLink} = useContext(MyContext);

  const {newKeys} = useContext(MyContext);

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
    setOldLocal(oldKeys);
    setUpdatedKeys(oldKeys);
    setNewKeys(headers);
  }, [oldKeys]);

  useEffect(() => {
    setNewKeys(updatedKeys);
  }, [updatedKeys]);

  useEffect(() => {
    setHeadersLocal(headers);
  }, [headers]);

  return (
    <Grid>
      {headersLocal.map((item, index) =>
        <Grid key={index} style={{display: "flex", flexFlow: "column", alignItems: "flex-start"}}>

          {/*<div style={{display: "flex", gap: 10}}>*/}
          {/*  {index === 0 ? <text style={{fontSize: "0.8rem"}}>Lines</text> : null}*/}
          {/*</div>*/}

          <HeaderInput resetClicked={resetClicked}
                       setResetClicked={setResetClicked}
                       updatedKeys={updatedKeys}
                       setUpdatedKeys={setUpdatedKeys}
                       key={index}
                       itemData={item}
                       index={index}/>

        </Grid>
      )}
    </Grid>
  )
}