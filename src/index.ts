import XLSX from "xlsx";
import * as fs from "fs";
import path from "path";
import { ExportOption, FCondition, InputOutputPath } from "./types";
import moment from "moment";

// TODO: modify field values based on chosen options (ex. replace "AMOUNT" value to 5000)

class ExcelToJson {
  private inputPath!: string;
  private outputPath!: string;
  private outputTextFileName!: string;
  private rawOutputFileName!: string;
  private rawJsonData: string = "";

  private getWorkSheetData(_filePath: string): XLSX.WorkSheet {
    const workBook = XLSX.readFile(_filePath)
    const sheetName = workBook.SheetNames[0];
    return workBook.Sheets[sheetName];
  }

  private convertContentToJSON(_sheet: any): string {
    const range = this.setSheetRange(_sheet, "A12");

    console.log("Converting to JSON...")
    const json = XLSX.utils.sheet_to_json(_sheet, {range: range});
    return this.rawJSONData(JSON.stringify(json, null, 2));
  }

  private writeFileToOutput(_outputTextFileName: string, _fileContent: any) {
    const filePath: string = path.join(__dirname, 'files', 'output', `${_outputTextFileName}`);
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

  private processExcelData(_data: any): XLSX.WorkSheet {
    const data = _data;
    let result: XLSX.WorkSheet = {};

    // TODO: iterate over each worksheet lines field (print to console to check)
    const rangeStr = this.setSheetRange(data,"A12");
    const range: any = XLSX.utils.decode_range(rangeStr);

    const row = data[range];

    // TODO: change selected field the values based on options

    // console.log(range);

    const firstRow = row[0].v = 'test'
    console.log(firstRow);

    // console.log(row);

    // // Iterate over the cells in the header row and log their values
    // for (let c = range.s.c; c <= range.e.c; c++) {
    //   const cell = sheet[XLSX.utils.encode_cell({ c, r: range.s.r })];
    //
    //   if (cell) {
    //     console.log(cell.v);
    //   }
    // }

    return result;
  }

  private processJsonData(_json: string) {
    console.log("Process Json data method running...");
    const data: any[] = JSON.parse(_json);

    // const modifiedData = data.map((item, index) => {
    //   Object.entries(item).map(([key, value]) => {
    //     if (key === "AMOUNT") {
    //       item[key] = 9999;
    //     }
    //     // return [key === "AMOUNT" ? "TEST_KEY" : key, value];
    //   });
    //   return item;
    // });
    this.changeDataByCondition(data, "AMOUNT", );
    const modifiedData = this.changeDataFromKey(data, "AMOUNT", 4444);
    const changeKeys = this.multiRenameKeys(modifiedData, ["AMOUNT", "N.laukas", "CURRENCY"], ["A", "N", "C"]);

    return JSON.stringify(changeKeys, null, 2);
  }

  private changeDataByCondition(_array: any[], _key: string, _condition: FCondition) {

  }

  private changeDataFromKey(_array: any[], _key: string, _newValue: string | number) {
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

    for (let i = 0; i <= _newKeys.length-1; i++) {
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

  private exportJSONFromOption(_workSheet: XLSX.WorkSheet, _exportOptions: ExportOption) {
    if (_exportOptions === "transform") {
      const json = this.convertContentToJSON(_workSheet);
      const processed = this.processJsonData(json);
      this.exportJSON(this.outputTextFileName, processed);

      return;
    }

    const json = this.convertContentToJSON(_workSheet);
    this.exportJSON(this.rawOutputFileName, json);
  }

  private setSheetRange(_sheet: any, _header: string = "A12") {
    const lastRow: XLSX.WorkSheet = _sheet['!ref'].split(":")[1].substring(0);
    const headerRow = "A12"
    return `${headerRow}:${lastRow}`;
  }

  private getHeaders(_startRow: string): Array<any> {
    const sheet: any = this.getWorkSheetData(this.inputPath);;
    const rangeStr = this.setSheetRange(sheet, _startRow);
    const range = XLSX.utils.decode_range(rangeStr);
    const headers = [];

    for (let c = range.s.c; c <= range.e.c; c++) {
      const cell = sheet[XLSX.utils.encode_cell({ c, r: range.s.r })];

      if (cell) {
        headers.push(cell.v);
      }
    }

    console.log(headers);
    return headers;
  }

  JSON(_inputOutputOptions: InputOutputPath, _outputFileName: string, _exportOption: ExportOption = "original") {
    const {inputPath, outputPath} = _inputOutputOptions;
    const fileName = _outputFileName;
    const option = _exportOption;

    this.inputPath = inputPath;
    this.outputPath = outputPath;

    this.outputTextFileName = fileName + "_" + this.getExportTimeStamp() + ".txt";
    this.rawOutputFileName = fileName + "_" + "Orig" + "_" + this.getExportTimeStamp() + ".txt";

    const sheet: any = this.getWorkSheetData(this.inputPath);

    if (sheet) {
      // console.log("sheet:", sheet[range]);
      try {
        this.exportJSONFromOption(sheet, option);
      } catch (e) {
        console.log("Error!", e)
      }
    }
  }
}

const options: InputOutputPath = {
  inputPath: path.join(__dirname, 'files', 'input', 'input.xlsx'),
  outputPath: path.join(__dirname, 'files', 'output')
}

const excelToJson = new ExcelToJson();

excelToJson.JSON(options, 'FILENAME_JSON_Export', "transform");

// INPUT_PATH = ./src/files/input
// OUTPUT_PATH = ./src/files/output