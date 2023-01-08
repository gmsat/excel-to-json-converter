import React from 'react';

interface DataPreviewProps {
  preview: any
}

const DataPreview: React.FC<DataPreviewProps> = ({preview}) => {
  return (
    <div style={{display: "flex", flexFlow: "column", border: "solid lightgrey 1px", borderRadius: 6}}>

      <div style={{display: "flex", flexFlow: "column"}} className={"card"}>
        <label style={{textAlign: "left"}} htmlFor="preview">Preview</label>
        <textarea style={{height: "75vh", width: "600px", resize: "none"}} disabled id={"preview"} value={preview ? JSON.stringify(preview, null, 2) : ""}/>
      </div>

    </div>
  );
};

export default DataPreview;