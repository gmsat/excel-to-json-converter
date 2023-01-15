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
    <>

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

    </>
  );
};

export default DataOptions;