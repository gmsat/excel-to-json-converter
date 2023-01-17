import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Grid } from "@mui/material";
import MyContext from "../../context/my-context/MyContext";

interface DataPreviewProps {
  preview: any
}

type DisableEnableEdit = "Edit Data" | "Stop Editing";

const TextFieldStyle = {
  width: "1000px",
  '& .MuiInputBase-input.Mui-disabled': {
    fontSize: "1rem",
    WebkitTextFillColor: "#000000"
  }
}

const DataPreview: React.FC<DataPreviewProps> = ({preview}) => {
  const [previewData, setPreviewData] = useState(JSON.stringify(preview, null, 2));
  const [enableDirectEdit, setEnableDirectEdit] = useState(false);
  const [enableEditButtonText, setEnableEditButtonText] = useState<DisableEnableEdit>("Edit Data");
  const [editButtonColor, setEditButtonColor] = useState<"primary" | "error">("primary");
  const [previewVariant, setPreviewVariant] = useState<"filled" | "outlined">("filled");

  const {outputData, setOutputData} = useContext(MyContext);

  const handleChange = (e: any) => {
    const targetVal = e.target.value;
    setOutputData(JSON.parse(targetVal));
    setPreviewData(targetVal);
  }

  useEffect(() => {
    setPreviewData(JSON.stringify(preview, null, 2));
  }, [preview]);

  useEffect(() => {
    if (enableDirectEdit) {
      setEnableEditButtonText("Stop Editing");
      setEditButtonColor("error");
      setPreviewVariant("outlined");
    } else {
      setEnableEditButtonText("Edit Data");
      setEditButtonColor("primary");
      setPreviewVariant("filled");
    }
  }, [enableDirectEdit]);

  return (

    <div style={{display: "flex", flexDirection: "column", width: "100%", margin: "auto"}}>
      <Grid gap={3} display={"flex"} flexDirection={"row"} justifyContent={"flex-start"} alignItems={"center"} padding={2}>
        <label style={{textAlign: "left"}} htmlFor="preview">Preview / Edit</label>
        <Button color={editButtonColor} onClick={() => setEnableDirectEdit(!enableDirectEdit)} variant={"contained"} size={"small"}>{enableEditButtonText}</Button>
      </Grid>
      <TextField disabled={!enableDirectEdit} onChange={handleChange} sx={TextFieldStyle} variant={previewVariant} size={"small"} maxRows={32} multiline id={"preview"} value={previewData ? previewData : ""}/>
    </div>

  );
};

export default DataPreview;