import React, { useContext, useEffect, useState, useTransition } from 'react';
import { TextField, Grid, Paper } from "@mui/material";
import { Button } from "@mui/joy";
import MyContext from "../../context/my-context/MyContext";
import CodeEditor from "@uiw/react-textarea-code-editor";
import BackdropLoader from "../backdrop-loading/BackdropLoader";
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';

interface DataPreviewProps {
  preview: any
}

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
  const [enableEditButtonText, setEnableEditButtonText] = useState<string>("Edit");
  const [editButtonColor, setEditButtonColor] = useState<"primary" | "danger">("primary");
  const [previewVariant, setPreviewVariant] = useState<"filled" | "outlined">("filled");

  const {outputData, setOutputData} = useContext(MyContext);

  const {downloadOutput, setDownloadOutput} = useContext(MyContext);

  const [isPending, setTransition] = useTransition();

  const handleChange = (e: any) => {
    const targetVal = e.target.value;
    // setOutputData(JSON.parse(targetVal));
    setDownloadOutput(JSON.parse(targetVal));
    setPreviewData(targetVal);
  }

  useEffect(() => {
    const lines = preview;

    setTransition(() => {
      setPreviewData(JSON.stringify(preview, null, 2));
    });

    // setPreviewData(JSON.stringify({...headersData}, null, 2));
  }, [preview]);

  useEffect(() => {
    if (enableDirectEdit) {
      setEnableEditButtonText("Stop");
      setEditButtonColor("danger");
      setPreviewVariant("outlined");
    } else {
      setEnableEditButtonText("Edit");
      setEditButtonColor("primary");
      setPreviewVariant("filled");
    }
  }, [enableDirectEdit]);

  return (

    <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", margin: "auto", justifyContent: "flex-end", gap: 10}}>

      <Paper variant={"outlined"} sx={{height: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", padding: 2}}>
        <Button startDecorator={!enableDirectEdit ? <EditIcon fontSize={"small"}/> : <EditOffIcon fontSize={"small"}/>} color={editButtonColor} onClick={() => setEnableDirectEdit(!enableDirectEdit)} variant={"solid"} size={"sm"}>{enableEditButtonText}</Button>
      </Paper>

      <Paper variant={"outlined"}>
        <Grid sx={{height: "85vh", overflowY: "scroll"}}>
          <CodeEditor value={previewData ? previewData : ""}
                      language={"json"}
                      disabled={!enableDirectEdit}
                      onChange={handleChange}
                      style={{
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        backgroundColor: !enableDirectEdit ? "#f5f5f5" : "white",
                        fontSize: 18,
                        borderRadius: 4,
                        lineHeight: 1.2
                      }}
          />

          {isPending && <BackdropLoader open={true}/>}
        </Grid>
      </Paper>

    </div>
  );
};

export default DataPreview;