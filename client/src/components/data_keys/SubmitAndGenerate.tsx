import React from 'react';


interface Props {
  outputExists: boolean,
  setDownloadEnabled: (bool: boolean) => void
}

const SubmitAndGenerate: React.FC<Props> = ({outputExists, setDownloadEnabled}) => {
  return (
    <div>
      <button disabled={!outputExists}
              style={{width: "100%", backgroundColor: "lightblue"}}
              type={"submit"}
              onClick={() => setDownloadEnabled(true)}>
        Submit Changes
      </button>
    </div>
  );
}

export default SubmitAndGenerate;