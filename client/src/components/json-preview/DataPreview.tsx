import React from 'react';
import { TextField } from "@mui/material";

interface DataPreviewProps {
  preview: any
}

const DataPreview: React.FC<DataPreviewProps> = ({preview}) => {
  return (

    <div style={{display: "flex", flexDirection: "column", width: "100%", margin: "auto"}}>
      <label style={{textAlign: "left"}} htmlFor="preview">Preview</label>
      <TextField sx={{width: "1000px"}} variant={"filled"} size={"small"} maxRows={32} multiline id={"preview"} value={preview ? JSON.stringify(preview, null, 2) : ""}/>
    </div>

  );
};

export default DataPreview;