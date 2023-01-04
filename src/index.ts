import ExcelToJson from "./modules/excel-to-json";
import path from "path";
import { InputOutputPath } from "./modules/excel-to-json/types";

async function getJson() {
  const excelToJson = new ExcelToJson();
  const options: InputOutputPath = {
    inputPath: path.join(__dirname, 'files', 'input', 'input.xlsx'),
    outputPath: path.join(__dirname, 'files', 'output')
  }

  // export JSON with original data
  await excelToJson.JSON(options,
    "EXPORT",
    "A12");

  // change key names
  await excelToJson.JSON(options,
    "EXPORT",
    "A12",
    "transform",
    ["AMOUNT", "N.laukas"],
    ["AMT", "N"]);

  // change all values for a specific key
  await excelToJson.JSON(options,
    "EXPORT-2",
    "A12",
    "transform",
    [],
    [],
    "AMOUNT",
    5000);
}

// getJson();