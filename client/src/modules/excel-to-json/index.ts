import { read, utils, WorkSheet } from "xlsx";
import * as fs from "fs";
import path from "path";
import { ExportOption, InputOutputPath } from "./types";
import moment from "moment";

export default class ExcelToJson {
  private inputPath!: string;
  private outputPath!: string;
  private outputTextFileName!: string;
  private rawOutputFileName!: string;
  private rawJsonData: string = "";
  private headers: string = "A1";
  private oldKeys: string[] | undefined = [];
  private newKeys: string[] | undefined = [];
  private keyToChangeValueFor: string | undefined;
  private newValueForKey: string | number | undefined;

  private getWorkSheetData(_fileName: string): WorkSheet {
    const workBook = read(_fileName, {type: "binary"});
    const sheetName = workBook.SheetNames[0];

    return workBook.Sheets[sheetName];
  }

  private getWorkSheetNames(_fileName: string): string[] {
    const workBook = read(_fileName, {type: "binary"});
    return workBook.SheetNames;
  }

  private getDataFromAllWorkSheets(_fileName: string, _workSheets: string[]): object[] {
    const workBook = read(_fileName, {type: "binary"});
    const data: object[] = [];

    for (const workSheetName of _workSheets) {
      data.push(workBook.Sheets[workSheetName]);
    }

    return data;
  }

  private convertContentToJSON(_sheet: any) {
    const range = this.setSheetRange(_sheet, this.headers);
    const json = utils.sheet_to_json(_sheet, {range: range});

    return this.rawJSONData(JSON.stringify(json, null, 2));
  }

  private convertContentToJsonRange(_sheet: any, _range: string) {
    const range = this.setSheetRange(_sheet, _range);
    const json = utils.sheet_to_json(_sheet, {range: range});

    return this.rawJSONData(JSON.stringify(json, null, 2));
  }

  private writeFileToOutput(_outputTextFileName: string, _fileContent: any) {
    const filePath: string = path.join(this.outputPath, `${_outputTextFileName}`);
    fs.writeFileSync(filePath, _fileContent);
  }

  private getExportTimeStamp(): string {
    const date = new Date();
    const timeStamp = date.getTime();
    const isoDate: string = new Date(timeStamp).toISOString();

    return moment(isoDate).format("YYYY-MM-DD-THH-mm-ss");
  }

  private rawJSONData(_data: string = this.rawJsonData): string {
    this.rawJsonData = _data;

    return this.rawJsonData;
  }

  private processJsonData(_json: string | any) { // TODO: fix types
    const data: any[] = JSON.parse(_json);
    const modifiedData = this.changeDataFromKey(data, this.keyToChangeValueFor, this.newValueForKey);

    if (this.oldKeys && this.newKeys) {
      const changeKeys = this.multiRenameKeys(modifiedData, this.oldKeys, this.newKeys);

      return JSON.stringify(changeKeys, null, 2);
    }

    return "";
  }

  private changeDataFromKey(_array: any[], _key: string | undefined, _newValue: string | number | undefined) {
    return _array.map((item, index) => {
      Object.entries(item).map(([key, value]) => {
        if (key === _key) {
          item[key] = _newValue;
        }
      });

      return item;
    });
  }

  private multiRenameKeys(_array: any[], _oldKeys: string[], _newKeys: string[]) {
    let changedKeys = _array;

    for (let i = 0; i <= _newKeys.length - 1; i++) {
      changedKeys = this.renameKey(changedKeys, _oldKeys[i], _newKeys[i]);
    }

    return changedKeys
  }

  private renameKey(_array: any[], _originalKey: string, _newKey: string) {
    return _array.map((item, index) => {
      const newObj: any = Object.entries(item).map(([key, value]) => {
        return [key === _originalKey ? _newKey : key, value];
      });

      return Object.fromEntries(newObj);
    });
  }

  private exportJSON(_fileName: string, _jsonData: Object) {
    this.writeFileToOutput(_fileName, _jsonData);
  }

  private returnJSONFromOption(_workSheet: WorkSheet, _exportOptions: ExportOption) {
    if (_exportOptions === "transform") {
      const json = this.convertContentToJSON(_workSheet);
      return this.processJsonData(json);
    }

    return this.convertContentToJSON(_workSheet);
  }

  private exportJSONFromOption(_workSheet: WorkSheet, _exportOptions: ExportOption) {
    if (_exportOptions === "transform") {
      const json = this.convertContentToJSON(_workSheet);
      const processed = this.processJsonData(json);
      this.exportJSON(this.outputTextFileName, processed);

      return;
    }

    const json = this.convertContentToJSON(_workSheet);
    this.exportJSON(this.rawOutputFileName, json);
  }

  private setSheetRange(_sheet: any, _header: string) {
    const lastRow: WorkSheet = _sheet['!ref'].split(":")[1].substring(0);
    const headerRow = this.headers;

    return `${headerRow}:${lastRow}`;
  }

  private getHeaders(_startRow: string): Array<any> {
    const sheet: any = this.getWorkSheetData(this.inputPath);
    const rangeStr = this.setSheetRange(sheet, _startRow);
    const range = utils.decode_range(rangeStr);
    const headers = [];

    for (let c = range.s.c; c <= range.e.c; c++) {
      const cell = sheet[utils.encode_cell({c, r: range.s.r})];

      if (cell) {
        headers.push(cell.v);
      }
    }

    return headers;
  }

  getHeadersFromBinary(_fileName: any, _startRow: string) {
    this.headers = _startRow;

    const data = this.getWorkSheetData(_fileName);
    const json = this.convertContentToJsonRange(data, _startRow);
    const parsed = JSON.parse(json);
    const first = parsed[0];

    return Object.keys(first);
  }

  JSON(_inputOutputOptions: InputOutputPath,
       _outputFileName: string,
       _headers: string = "A1",
       _exportOption: ExportOption = "original",
       _oldKeys?: string[],
       _newKeys?: string[],
       _keyToChangeValueFor?: string,
       _newValueForKey?: string | number
  ) {
    const {inputPath, outputPath} = _inputOutputOptions;
    const fileName = _outputFileName;
    const option = _exportOption;

    this.inputPath = inputPath;
    this.outputPath = outputPath;
    this.headers = _headers;
    this.oldKeys = _oldKeys;
    this.newKeys = _newKeys;
    this.keyToChangeValueFor = _keyToChangeValueFor;
    this.newValueForKey = _newValueForKey;

    this.outputTextFileName = fileName + "_" + this.getExportTimeStamp() + ".txt";
    this.rawOutputFileName = fileName + "_" + "Orig" + "_" + this.getExportTimeStamp() + ".txt";

    const sheet: any = this.getWorkSheetData(this.inputPath);

    if (sheet) {
      try {
        this.exportJSONFromOption(sheet, option);
      } catch (e) {
        console.log("Error!", e)
      }
    }
  }

  JSON_web(_file: any,
           _headers: string = "A1",
           _exportOption: ExportOption = "original",
           _oldKeys?: string[],
           _newKeys?: string[],
           _keyToChangeValueFor?: string,
           _newValueForKey?: string | number
  ) {
    const option = _exportOption;

    this.headers = _headers;
    this.oldKeys = _oldKeys;
    this.newKeys = _newKeys;
    this.keyToChangeValueFor = _keyToChangeValueFor;
    this.newValueForKey = _newValueForKey;

    const sheet: any = this.getWorkSheetData(_file);

    if (sheet) {
      try {
        this.returnJSONFromOption(sheet, option);
      } catch (e) {
        console.log("Error!", e)
      }
    }

    return this.returnJSONFromOption(sheet, option);
  }

  JSON_web_all_data(_file: any,
                    _headers: string = "A1",
                    _exportOption: ExportOption = "original",
                    _oldKeys?: string[],
                    _newKeys?: string[],
                    _keyToChangeValueFor?: string,
                    _newValueForKey?: string | number
  ) {
    this.headers = _headers;
    this.oldKeys = _oldKeys;
    this.newKeys = _newKeys;
    this.keyToChangeValueFor = _keyToChangeValueFor;
    this.newValueForKey = _newValueForKey;

    const sheetNames = this.getWorkSheetNames(_file);
    const sheetsData = this.getDataFromAllWorkSheets(_file, sheetNames);

    const jsonDataArr = [];

    for (const s of sheetsData) {
      const jsonData = this.convertContentToJSON(s);
      jsonDataArr.push(jsonData);
    }

    return jsonDataArr;
  }

  JSON_test(_binary: any) {
    const wb = read(_binary, { type: "binary" });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    return utils.sheet_to_json(ws);
  }
}
