import { createContext } from "react";
import { TableObject } from "../../components/change-values-dialog/ChangeValuesDialog";

interface MyContextType {
  file: Blob | null,
  setFile: (file: Blob | null) => void,
  downloadLink: null | string,
  outputData: any[],
  outputDataNew: object,
  preview: any,
  outputExists: boolean,
  downloadEnabled: boolean,
  header: string,
  headerKeys: string[],
  oldKeys: string[],
  newKeys: string[],
  linesData: string[],
  headersData: object,
  dialogKeyValueData: TableObject[],
  showUpdateKeyValuesDialog: boolean,
  setDownloadLink: (link: string | null) => void,
  setOutputData: (data: any[]) => void,
  setOutputDataNew: (data: object) => void,
  setPreview: (data: any) => void,
  setOutputExists: (bool: boolean) => void,
  setDownloadEnabled: (bool: boolean) => void,
  setHeader: (header: string) => void,
  setHeaderKeys: (keys: string[]) => void,
  setOldKeys: (oldKeys: string[]) => void,
  setNewKeys: (newKeys: string[]) => void,
  setShowUpdateKeyValuesDialog: (bool: boolean) => void,
  setDialogKeyValueData: (data: any[]) => void,
  setLinesData: (data: any[]) => void,
  setHeadersData: (data: object) => void
}

const MyContext = createContext<MyContextType>({

  downloadEnabled: true,
  file: null,
  downloadLink: null,
  header: "A1",
  headerKeys: [],
  newKeys: [],
  outputData: [],
  outputDataNew: {},
  preview: null,
  outputExists: false,
  oldKeys: [],
  showUpdateKeyValuesDialog: false,
  dialogKeyValueData: [],
  linesData: [],
  headersData: {},

  setDownloadEnabled: () => {},
  setDownloadLink: () => {},
  setFile: () => {},
  setHeader: () => {},
  setHeaderKeys: () => {},
  setNewKeys: () => {},
  setOldKeys: () => {},
  setOutputData: () => {},
  setOutputDataNew: () => {},
  setOutputExists: () => {},
  setPreview: () => {},
  setShowUpdateKeyValuesDialog: () => {},
  setDialogKeyValueData: () => {},
  setLinesData: () => {},
  setHeadersData: () => {}

});

export default MyContext;