import { createContext } from "react";

interface MyContextType {
  stringValue: string,
  file: Blob | null,
  setFile: (file: Blob | null) => void,
  downloadLink: null | string,
  outputData: any[],
  preview: any,
  outputExists: boolean,
  downloadEnabled: boolean,
  header: string,
  headerKeys: string[],
  oldKeys: string[],
  newKeys: string[],
  setStringValue: (newValue: string) => void,
  setDownloadLink: (link: string | null) => void,
  setOutputData: (data: any[]) => void,
  setPreview: (data: any) => void,
  setOutputExists: (bool: boolean) => void,
  setDownloadEnabled: (bool: boolean) => void,
  setHeader: (header: string) => void,
  setHeaderKeys: (keys: string[]) => void,
  setOldKeys: (oldKeys: string[]) => void,
  setNewKeys: (newKeys: string[]) => void
}

const MyContext = createContext<MyContextType>({
  stringValue: "",
  downloadEnabled: false,
  file: null,
  downloadLink: null,
  header: "A12",
  headerKeys: [],
  newKeys: [],
  outputData: [],
  preview: null,
  outputExists: false,
  oldKeys: [],

  setStringValue: () => {},
  setDownloadEnabled: () => {},
  setDownloadLink: () => {},
  setFile: () => {},
  setHeader: () => {},
  setHeaderKeys: () => {},
  setNewKeys: () => {},
  setOldKeys: () => {},
  setOutputData: () => {},
  setOutputExists: () => {},
  setPreview: () => {}
});

export default MyContext;