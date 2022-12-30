import XLSX from "xlsx";
import * as fs from "fs";
import path from "path";
import { InputOutputPath, ExportOption } from "./types";

// TODO: modify field values based on chosen options (ex. replace "AMOUNT" value to 5000)

class ExcelToJson {
  private inputPath!: string;
  private outputPath!: string;
  private outputTextFileName!: string;
  private rawOutputFileName!: string;
  private rawJsonData: Object = [];

  private getWorkSheetData(_filePath: string): XLSX.WorkSheet {
    const workBook = XLSX.readFile(_filePath)
    const sheetName = workBook.SheetNames[0];
    return workBook.Sheets[sheetName];
  }

  private convertContentToJSON(_sheet: any): Object {
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

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const time = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}${month}${day}-${time}${minutes}${seconds}`;
  }

  private rawJSONData(_data: Object = this.rawJsonData): Object {
    this.rawJsonData = _data;
    return this.rawJsonData;
  }

  private processData(_data: any): XLSX.WorkSheet {
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

  private exportJSON(_jsonData: Object) {
    this.writeFileToOutput(this.outputTextFileName, _jsonData);
  }

  private exportJSONFromOption(_workSheet: XLSX.WorkSheet, _exportOptions: ExportOption) {
    if (_exportOptions === "transform") {
      // const transformed = this.processData(_workSheet);
      // const json = this.convertContentToJSON(transformed);
      this.processData(_workSheet);
      return;
    }

    const json = this.convertContentToJSON(_workSheet);
    this.exportJSON(json);
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

    console.log(this.getHeaders("A12"));

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

excelToJson.JSON(options, 'FILENAME_JSON_Export');
// excelToJson.JSON(options, 'FILENAME_JSON_Export', "transform");

// INPUT_PATH = ./src/files/input
// OUTPUT_PATH = ./src/files/output