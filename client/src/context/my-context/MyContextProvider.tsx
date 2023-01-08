import React, { useState } from "react"
import MyContext from "./MyContext";

interface MyContextProviderProps {
  children: React.ReactNode
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({children}) => {
  const [stringValue, setStringValue] = useState("");
  // const {stringValue, setStringValue} = useContext(MyContext);

  const [file, setFile] = useState<Blob | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const [downloadLink, setDownloadLink] = useState<null | string>(null);
  const [outputData, setOutputData] = useState<any>([]);
  const [preview, setPreview] = useState(null);

  const [outputExists, setOutputExists] = useState(false);
  const [downloadEnabled, setDownloadEnabled] = useState(false);

  // data options
  const [options, setOptions] = useState<boolean>(false);
  const [header, setHeader] = useState("A12");
  const [headerKeys, setHeaderKeys] = useState<string[]>([]);
  const [oldKeys, setOldKeys] = useState<string[]>([]);
  const [newKeys, setNewKeys] = useState<string[]>([]);

  return (
    <MyContext.Provider value={{
      stringValue,
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
      setStringValue,
      setPreview,
      setOutputExists,
      setOutputData,
      setOldKeys,
      setHeader,
      setNewKeys,
      setDownloadEnabled,
      setHeaderKeys,
      setDownloadLink,
      setFile
    }}>
      {children}
    </MyContext.Provider>
  );
}