import React, { useState } from "react"
import MyContext from "./MyContext";
import { TableObject } from "../../components/change-values-dialog/ChangeValuesDialog";

interface MyContextProviderProps {
  children: React.ReactNode
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({children}) => {
  const [file, setFile] = useState<Blob | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const [downloadLink, setDownloadLink] = useState<null | string>(null);
  const [outputData, setOutputData] = useState<any>([]);
  const [preview, setPreview] = useState(null);

  const [outputExists, setOutputExists] = useState(false);
  const [downloadEnabled, setDownloadEnabled] = useState(false);

  // data options
  const [header, setHeader] = useState("A1");
  const [headerKeys, setHeaderKeys] = useState<string[]>([]);
  const [oldKeys, setOldKeys] = useState<string[]>([]);
  const [newKeys, setNewKeys] = useState<string[]>([]);

  const [showUpdateKeyValuesDialog, setShowUpdateKeyValuesDialog] = useState(false);
  const [dialogKeyValueData, setDialogKeyValueData] = useState<TableObject[]>([]);

  return (
    <MyContext.Provider value={{

      header,
      newKeys,
      downloadEnabled,
      oldKeys,
      preview,
      outputExists,
      outputData,
      headerKeys,
      file,
      downloadLink,
      showUpdateKeyValuesDialog,
      dialogKeyValueData,

      setPreview,
      setOutputExists,
      setOutputData,
      setOldKeys,
      setHeader,
      setNewKeys,
      setDownloadEnabled,
      setHeaderKeys,
      setDownloadLink,
      setFile,
      setShowUpdateKeyValuesDialog,
      setDialogKeyValueData

    }}>
      {children}
    </MyContext.Provider>
  );
}