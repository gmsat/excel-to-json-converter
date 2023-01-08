import { createContext } from "react";

interface MyContextType {
  // context test
  stringValue: string,
  setStringValue: (newValue: string) => void,
  // app variables
  file: Blob | null,
  setFile: (file: Blob | null) => void,
  downloadLink: null | string,
  setDownloadLink: (link: string | null) => void,
  outputData: any[],
  setOutputData: (data: any[]) => void,
  preview: any,
  setPreview: (data: any) => void,
  outputExists: boolean,
  setOutputExists: (bool: boolean) => void,
  downloadEnabled: boolean,
  setDownloadEnabled: (bool: boolean) => void,
  header: string,
  setHeader: (header: string) => void,
  headerKeys: string[],
  setHeaderKeys: (keys: string[]) => void,
  oldKeys: string[],
  setOldKeys: (oldKeys: string[]) => void,
  newKeys: string[],
  setNewKeys: (newKeys: string[]) => void
}

const MyContext = createContext<MyContextType>({
  stringValue: "",
  setStringValue: () => {},

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