import xlsx from "xlsx";
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

  private getWorkSheetContent(_filePath: string): xlsx.WorkSheet {
    const workBook = xlsx.readFile(_filePath)
    const sheetName = workBook.SheetNames[0];
    return workBook.Sheets[sheetName];
  }

  private convertContentToJSON(_sheet: any): Object {
    const lastRow: xlsx.WorkSheet = _sheet['!ref'].split(":")[1].substring(0);
    const headerRow = "A12"
    const range = `${headerRow}:${lastRow}`;

    console.log("Converting to JSON...")
    const json = xlsx.utils.sheet_to_json(_sheet, {range: range});
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

  private updateJsonData(_data: Object) {
    const data = _data;
    const result: Array<Object> = [];
    // const data2 = Object.entries(data);

    // TODO: change json to array of objects that you can map
    Object.entries(data).map(([key, value]) => {
      const obj = {[key]: value}
      result.push(obj)
    })


    // TODO: iterate over each object of the array




    // TODO: change the values based on options




    // console.log(data);
    console.log(result[0], result[1]);
    return {};
  }

  private exportJSON(_jsonData: Object) {
    this.writeFileToOutput(this.outputTextFileName, _jsonData);
  }

  private exportJSONFromOption(_workSheet: xlsx.WorkSheet, _exportOptions: ExportOption) {
    if (_exportOptions === "raw") {
      const json = this.convertContentToJSON(_workSheet);
      this.exportJSON(json);
    }

    if (_exportOptions === "transform") {
      const originalJson = this.convertContentToJSON(_workSheet);
      // const updatedData = this.updateJsonData(originalJson);

      this.updateJsonData(originalJson);


      // this.exportJSON(updatedData);
    }

    if (_exportOptions === "both") {
      const originalJson = this.convertContentToJSON(_workSheet);
      const updatedData = this.updateJsonData(originalJson);

      // this.exportJSON(originalJson);
      // this.exportJSON(updatedData);
    }
  }

  JSON(_inputOutputOptions: InputOutputPath, _outputFileName: string, _exportOption: ExportOption = "raw") {
    this.inputPath = _inputOutputOptions.inputPath;
    this.outputPath = _inputOutputOptions.outputPath;
    this.outputTextFileName = _outputFileName + "_" + this.getExportTimeStamp() + ".txt";
    this.rawOutputFileName = _outputFileName + "_" + "Orig" + "_" + this.getExportTimeStamp() + ".txt";

    const workSheet = this.getWorkSheetContent(this.inputPath);

    if (workSheet) {
      try {
        this.exportJSONFromOption(workSheet, _exportOption);
      } catch (e) {
        console.log("Error!", e)
      }
    }

    return this;
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