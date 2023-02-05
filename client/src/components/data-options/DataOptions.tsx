import React, { useState } from 'react';
import DataKeys from "../data-keys/DataKeys";
import { Grid, Paper, Divider } from "@mui/material";
import { SaveControls } from "../index";

interface DataOptionsProps {
  headerKeys: string[] | null,
  oldKeys: string[],
  setOldKeys: (newOldKeys: string[]) => void,
  newKeys: string[],
  setNewKeys: (newKeys: string[]) => void,
  handleSubmit: (e: any) => void,
  outputExists: boolean
}

const DataOptions: React.FC<DataOptionsProps> = ({
                                                   headerKeys,
                                                   newKeys,
                                                   oldKeys,
                                                   setOldKeys,
                                                   setNewKeys,
                                                   handleSubmit,
                                                   outputExists
                                                 }) => {
  const [resetClicked, setResetClicked] = useState(false);

  return (
    <Grid container display={"flex"} flexDirection={"column"} sx={{width: "100%", height: "100%"}} gap={1}>
      <Grid item
            sx={{
              overflowY: "scroll",
              maxHeight: "80vh",
              '&::-webkit-scrollbar': {
                width: 7,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: "lightgray",
                borderRadius: 4,
              }
      }}>

        {outputExists ?
          <DataKeys
            data={headerKeys}
            oldKeys={oldKeys}
            newKeys={newKeys && newKeys}
            setNewKeys={setNewKeys}
            setOldKeys={setOldKeys}
            handleSubmit={handleSubmit}
          />

          : null
        }

      </Grid>

      <Divider/>

      <Paper variant={"outlined"} sx={{border: "none"}}>
        <Grid>
          <SaveControls/>
        </Grid>
      </Paper>

    </Grid>

  );
};

export default DataOptions;