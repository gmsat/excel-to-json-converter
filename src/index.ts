import ExcelToJson from "./modules/excel-to-json";
import path from "path";
import { InputOutputPath } from "./modules/excel-to-json/types";

const e = new ExcelToJson();

const options: InputOutputPath = {
  inputPath: path.join(__dirname, 'files', 'input', 'input.xlsx'),
  outputPath: path.join(__dirname, 'files', 'output')
}

e.JSON(options, "export-test-file");

// excelToJson.JSON(options, 'FILENAME_JSON_Export', "transform");
// excelToJson.JSON(options, 'FILENAME_JSON_Export');

// INPUT_PATH = ./src/files/input
// OUTPUT_PATH = ./src/files/output