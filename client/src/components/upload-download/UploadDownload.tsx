import React from 'react';

interface UploadDownloadProps {
  handleChange: (e: any) => void,
  outputExists: boolean,
  downloadEnabled: boolean,
  setDownloadEnabled: (_bool: boolean) => void,
  downloadLink: string

}

const UploadDownload: React.FC<UploadDownloadProps> = ({downloadLink, setDownloadEnabled, downloadEnabled, outputExists, handleChange}) => {

  return (
    <>
      <div style={{display: "flex", flexFlow: "column", border: "solid lightgrey 1px", borderRadius: 6, padding: 10, gap: 10}}>

        <div style={{display: "flex", flexFlow: "row", padding: 20, alignItems: "center", backgroundColor: "lightgrey", borderRadius: 6}}>
          <input accept={".xlsx"} type="file" id={"file"} onChange={handleChange}/>
        </div>

        <div>
          <button disabled={!outputExists} style={{width: "100%", backgroundColor: "lightblue"}} type={"submit"} onClick={() => setDownloadEnabled(true)}>Convert</button>
        </div>

        <div>
          <a target={"_blank"} href={`${downloadLink}`} download={"download-file.txt"}>
            <button style={{width: "100%", backgroundColor: "orange"}} type={"button"} disabled={!downloadEnabled}>Download</button>
          </a>
        </div>

      </div>
    </>

  );
}

export default UploadDownload;