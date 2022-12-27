import dotenv from "dotenv";
import xlsx from "xlsx";
import * as fs from "fs";
import path from "path";

dotenv.config();

class ExcelToJson {
  private readonly inputPath!: string;
  private readonly outputPath!: string;

  constructor(_options: InputOutput) {
    this.inputPath = _options.inputPath;
    this.outputPath = _options.outputPath;
  }

  getWorkSheetContent(_filePath: string): xlsx.WorkSheet {
    const workBook = xlsx.readFile(_filePath)
    const firstSheet = workBook.SheetNames[0];
    return workBook.Sheets[firstSheet];
  }

  convertContentToJSON_log(_excelData: xlsx.WorkSheet) {
    const data = xlsx.utils.sheet_to_json(_excelData);
    // data.map((row) => {
    //   console.log(row)
    // });
    return data;
  }

  // writeFileToOutput(_path: string = this.outputPath, _outputFileName: string, _fileContent: any) {
  //   const filePath: string = path.join(__dirname, 'files', 'output', `${_path}`, `${_outputFileName}`);
  //   fs.writeFileSync(filePath, _fileContent);
  // }

  writeFileToOutput(_outputFileName: string, _fileContent: any) {
    const filePath: string = path.join(__dirname, 'files', 'output', `${_outputFileName}`);
    fs.writeFileSync(filePath, _fileContent);
  }



  // TODO: save output to text file
  // TODO: name output file with current dateTime (to prevent from overwriting) OR make an option to choose how the file should be named

  JSON() {
    const workSheetContent = this.getWorkSheetContent(this.inputPath);
    const toJson = this.convertContentToJSON_log(workSheetContent);
    this.writeFileToOutput('write_test.txt', JSON.stringify(toJson,null, 2));
  }

  debug() {
    console.log(this.inputPath);
    console.log(this.outputPath);
  }
}

interface InputOutput {
  inputPath: string,
  outputPath: string
}

const options: InputOutput = {
  inputPath: "./files/input/input.xlsx",
  outputPath: "./files/output"
}

const filePathLog = new ExcelToJson(options);
filePathLog.JSON();

// INPUT_PATH = ./src/files/input
// OUTPUT_PATH = ./src/files/output