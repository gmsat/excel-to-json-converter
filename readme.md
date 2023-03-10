## Excel to JSON converter

The tool converts excel workbook to Json format and lets you to customize the output

* Converts .xlsx to JSON format that you can download
* Constructs JSON object with headers and lines
* Shows data types for lines
* Rename/delete keys for lines
* Change line key values based on index
* Change line key values for all line objects
* Directly edit JSON output

---

## Technologies used
* Typescript
* React front-end UI library
* Electron js (desktop app)
* xlsx

---

## Prerequisites
* The tool only works with `.xlsx` excel file format
* At least 2 sheets are required in the workbook (otherwise nothing will happen)
* For data to be correct `table headers for both sheets should start from the first row`
* Sheet 1: sets the lines data
* Sheet 2: sets the headers data (first data row)

```
.xlsx workbook

| Sheet 1 (lines) | Sheet 2 (headers)  |
```

---

## How to use
* Upload `.xlsx` file with correct format and click `Convert to Json`
* After making changes to the output - click `save` button
* Then simply click the `download` button to get the .json file

---

## Run app in dev mode
* [Download](https://nodejs.org) and install node (LTS)
* Install dependencies by running the command `"npm install"` from the `\client` directory
* From the `\client` directory run the command `"npm run dev"` to start the app in dev mode

---

## Build to executable
* Navigate to `\client` directory and install dependencies with command `"npm install"`
* Then run `"npm run build"` command
* `\dist` directory will be created, move/copy files from `\dist` to `\electron-js\public` directory
* In `\electron-js` directory run the command `"npm install"` to install dependencies
* Then run `"electron-builder build --win portable"` command
* `\dist` directory will be created with the .exe file
