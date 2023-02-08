import React, { useContext } from 'react';
import ExcelToJson from "./modules/excel-to-json";
import { DataOptions, DataPreview, UploadDownload } from "./components";
import MyContext from "./context/my-context/MyContext";
import ChangeValuesDialog from "./components/change-values-dialog/ChangeValuesDialog";
import { Box, Grid, Grow, Paper, Typography } from "@mui/material";

function App() {
  const {file, setFile} = useContext(MyContext);
  const {downloadLink, setDownloadLink} = useContext(MyContext);
  const {setOutputData} = useContext(MyContext);
  const {preview, setPreview} = useContext(MyContext);
  const {outputExists, setOutputExists} = useContext(MyContext);
  const {downloadEnabled, setDownloadEnabled} = useContext(MyContext);
  const {header} = useContext(MyContext);
  const {headerKeys, setHeaderKeys} = useContext(MyContext);
  const {oldKeys, setOldKeys} = useContext(MyContext);
  const {newKeys, setNewKeys} = useContext(MyContext);
  const {setHeadersData} = useContext(MyContext);
  const {setDownloadOutput} = useContext(MyContext);

  const handleChange = (e: any) => {
    const file = e.target.files?.[0];

    setFile(file);

    if (file) {
      setOutputExists(true);
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const reader = new FileReader();
    const etj = new ExcelToJson();

    reader.onload = (evt) => {
      if (evt.target) {
        const binary = evt.target.result;
        const headers = etj.getHeadersFromBinary(binary, header);
        const data = etj.JSON_web_all_data(binary, header);

        if (!data[1]) {
          setPreview(null);
          setOutputExists(false);
          setDownloadLink(null);
          setDownloadEnabled(false);
          return;
        }

        const headersSheet = JSON.parse(data[1]);
        const lines = JSON.parse(data[0]);
        const headersObj = headersSheet[0];

        setHeaderKeys(headers);
        setOldKeys(headers);
        setNewKeys(headers);

        setOutputData(lines);
        setOutputExists(true);
        setHeadersData(headersObj);
        setPreview({...headersObj, lines});

        setDownloadOutput({...headersObj, lines});
        setHeadersData(headersObj);

        // set file download output data
        const file = JSON.stringify({...headersObj, lines}, null, 2);
        const fileBlob = new Blob([file], {type: "text/plain"});
        const url = URL.createObjectURL(fileBlob);

        setDownloadLink(url);
      }
    };

    reader.readAsArrayBuffer(file);
  }

  return (

    <Grid display={"flex"}
          sx={{
            boxSizing: "content-box",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            backgroundColor: "black"
          }}
    >

      <Box component={"form"}
           onSubmit={handleSubmit}
           sx={{
             display: "flex",
             flexFlow: "row",
             justifyContent: "center",
             alignItems: "center",
             width: "100%",
             margin: "auto",
             padding: 1,
             boxSizing: "border-box",
             backgroundColor: "#FFB600"
           }}>

        <Grid container display={"flex"} flexDirection={"row"}>

          <Grid item sx={{
            display: "flex",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            flexShrink: 1
          }}>

            <UploadDownload handleChange={handleChange}
                            outputExists={outputExists}
                            downloadEnabled={downloadEnabled}
                            setDownloadEnabled={setDownloadEnabled}
                            downloadLink={downloadLink!}/>

          </Grid>

          {preview &&
            <Grow in={outputExists}>
              <Paper variant={"elevation"}
                     elevation={3}
                     sx={{
                       display: "flex",
                       padding: 2,
                       borderRadius: 2,
                       gap: 2,
                       backgroundColor: "#e3e4e9",
                       flex: 4
                     }}>

                <Paper variant={"outlined"}>
                  <Grid item display={"flex"} flexDirection={"column"} padding={2}>
                    <Typography sx={{margin: 0, padding: 0}} fontSize={"0.6rem"}
                                variant={"caption"}>{file?.name}</Typography>
                    <DataOptions headerKeys={headerKeys}
                                 oldKeys={oldKeys}
                                 setOldKeys={setOldKeys}
                                 newKeys={newKeys}
                                 setNewKeys={setNewKeys}
                                 handleSubmit={handleSubmit}
                                 outputExists={outputExists}/>
                  </Grid>
                </Paper>

                <Grid item flex={1}>
                  <DataPreview preview={preview}/>
                </Grid>

              </Paper>
            </Grow>

          }

        </Grid>

        <ChangeValuesDialog/>

      </Box>

    </Grid>
  );
}

export default App
