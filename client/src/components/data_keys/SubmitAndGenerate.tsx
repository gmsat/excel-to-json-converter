import React from 'react';


interface Props {
  // outputExists: boolean,
  // setDownloadEnabled: (bool: boolean) => void

}

const SubmitAndGenerate: React.FC<Props> = () => {
  return (
    // <div>
    //   <button
    //           style={{width: "100%", backgroundColor: "lightblue"}}
    //           type={"submit"}
    //           onClick={() => setDownloadEnabled(true)}>
    //     Submit Changes
    //   </button>
    // </div>
    <div>
      <button
        style={{width: "100%", backgroundColor: "lightblue"}}
        type={"submit"}>
        Save
      </button>
    </div>
  );
}

export default SubmitAndGenerate;