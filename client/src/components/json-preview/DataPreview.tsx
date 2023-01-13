import React from 'react';
import { TextField } from "@mui/material";

interface DataPreviewProps {
  preview: any
}

const DataPreview: React.FC<DataPreviewProps> = ({preview}) => {
  return (
    <div style={{display: "flex", flexFlow: "column", borderRadius: 6, minHeight: "100%"}}>

      <div style={{display: "flex", flexFlow: "column", minHeight: "100%"}} className={"card"}>
        <label style={{textAlign: "left"}} htmlFor="preview">Preview</label>
        {/*<textarea style={{minHeight: "100vh", width: "600px", resize: "none"}} disabled id={"preview"} value={preview ? JSON.stringify(preview, null, 2) : ""}/>*/}
        <TextField fullWidth variant={"filled"} size={"small"} maxRows={32} sx={{width: "700px"}} multiline id={"preview"} value={preview ? JSON.stringify(preview, null, 2) : ""}/>
      </div>

    </div>
  );
};

export default DataPreview;