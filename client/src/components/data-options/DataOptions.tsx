import React from 'react';
import DataKeys from "../data-keys/DataKeys";
import { Grid } from "@mui/material";

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
  return (
    <Grid sx={{
      overflow: "auto",
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
  );
};

export default DataOptions;