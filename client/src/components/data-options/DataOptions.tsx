import React from 'react';
import DataKeys from "../data-keys/DataKeys";

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
    <div>
      <div style={{display: "flex", flexFlow: "column", width: "100%", gap: 20}}>

        <div style={{
          display: "flex",
          flexFlow: "column",
          gap: 10,
          width: "100%",
          alignItems: "flex-start",
          padding: 7,
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

        </div>

      </div>
    </div>
  );
};

export default DataOptions;