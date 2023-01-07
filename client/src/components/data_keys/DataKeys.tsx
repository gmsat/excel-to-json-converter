import React, { useEffect, useState, useRef } from 'react';

interface Props {
  data: string[] | null,
  oldKeys: string[],
  setOldKeys: (newOldKeys: string[]) => void,
  newKeys: string[],
  setNewKeys: (newKeys: string[]) => void,
  handleSubmit: (e: any) => void
}

interface HeaderInputProps {
  itemData: string,
  index: number,
  // newKeys: string[] | null,
  // setNewKeys: (newKeys: string[]) => void,
  // updateKeysOnChange: (e: any) => void,
  setUpdatedKeys: (_keys: string[]) => void,
  updatedKeys: string[],
  resetClicked: boolean,
  setResetClicked: (state: boolean) => void
}

export interface HeadersList {
  headers: string[],
  oldKeys: string[],
  newKeys: string[],
  setNewKeys: (_keys: string[]) => void,
  setHeaders: (_headers: string[]) => void,
  resetClicked: boolean,
  setResetClicked: (state: boolean) => void

}

const HeaderInput: React.FC<HeaderInputProps> = ({itemData, index, setUpdatedKeys, updatedKeys, setResetClicked, resetClicked}) => {
  const [originalVal, setOriginalVal] = useState(itemData);
  const [value, setValue] = useState(itemData);
  const [checked, setChecked] = useState(true);

  // reset inputs to original values on reset button click
  useEffect(() => {
    setValue(originalVal);
  }, [resetClicked])

  const handleInputChange = (e: any) => {
    const targetVal = e.target.value;
    const updated = getNewKeys(updatedKeys, index, targetVal);

    setUpdatedKeys(updated);
    setValue(targetVal);
  }

  // const handleInputChange = (e: any) => {
  //   const targetVal = e.target.value;
  //   setValue(targetVal);
  //   updateKeysOnChange(targetVal);
  // }

  function getNewKeys(_array: string[], _index: number, _targetVal: any) {
    return _array!.map((item, i) => {
      if (i === _index) return _targetVal;
      else return item;
    });
  }

  const handleChecked = () => {
    setChecked(!checked);
  }

  return (
    <div>
      <div style={{display: "flex", gap: 10}}>
        <input type="checkbox" checked={checked} onChange={handleChecked}/>
        <input type="text" value={value} onChange={handleInputChange}/>
        <input type="text" placeholder={"new value"}/>
      </div>
    </div>
  );
}

const HeadersList: React.FC<HeadersList> = ({oldKeys, setNewKeys, headers, newKeys, setHeaders, resetClicked, setResetClicked}) => {
  const [oldLocal, setOldLocal] = useState(oldKeys);
  const [updatedKeys, setUpdatedKeys] = useState([""]);

  useEffect(() => {
    setOldLocal(oldKeys);
    setUpdatedKeys(oldLocal);
  }, [oldKeys]);

  useEffect(() => {
    console.log("UPDATED ROOT:", updatedKeys);
    setNewKeys(updatedKeys);
  }, [updatedKeys]);

  const handleApply = () => {
    setNewKeys(updatedKeys);
  }

  // function getNewKeys(_array: string[], _index: number, _targetVal: any) {
  //   return _array!.map((item, i) => {
  //     if (i === _index) return _targetVal;
  //     else return item;
  //   });
  // }
  //
  // const updateKeysOnChange = (_index: number = 1, _value: string = "TE_ST_ST") => {
  //   const updated = getNewKeys(updatedKeys, _index, _value);
  //   console.log("KEY VAL:", _value);
  //   setUpdatedKeys(updated);
  // }

  return (
    <>
      {headers.map((item, index) =>
        <div key={index} style={{display: "flex", flexFlow: "column", alignItems: "flex-start"}}>

          <div>
            {index === 0 ? <button style={{margin: 12, backgroundColor: "aquamarine"}} onClick={handleApply}>Apply Changes</button> : null}
            {/*{index === 0 ? <button style={{margin: 12, backgroundColor: "orangered", color: "white"}} onClick={handleReset}>Reset</button> : null}*/}
          </div>


          <div style={{display: "flex", gap: 10}}>
            {index === 0 ? <text style={{fontSize: "0.8rem"}}>Edit headers</text> : null}
          </div>

          <HeaderInput resetClicked={resetClicked}
                       setResetClicked={setResetClicked}
                       updatedKeys={updatedKeys}
                       setUpdatedKeys={setUpdatedKeys}
                       key={index} itemData={item}
                       index={index}/>

        </div>
      )}
    </>
  )
}

const DataKeys: React.FC<Props> = ({data, newKeys, oldKeys, setOldKeys, setNewKeys}) => {
  // const [headers, setHeaders] = useState<string[] | null>(null);
  const [headers, setHeaders] = useState<string[]>(data!);
  // const [updatedKeys, setUpdatedKeys] = useState(oldKeys);

  const [resetClicked, setResetClicked] = useState(false);

  useEffect(() => {
    setHeaders(data!);
    // setUpdatedKeys(oldKeys)
  }, [data]);

  // function getNewKeys(_array: string[], _index: number, _targetVal: any) {
  //   return _array!.map((item, i) => {
  //     if (i === _index) return _targetVal;
  //     else return item;
  //   });
  // }

  const handleReset = () => {
    setResetClicked(!resetClicked);
  }

  return (
    <div style={{display: "flex", flexFlow: "column", gap: 5}}>
      <button style={{margin: 12, backgroundColor: "orangered", color: "white"}} onClick={handleReset}>Reset</button>
      {headers ? <HeadersList setResetClicked={setResetClicked} resetClicked={resetClicked} setHeaders={setHeaders} headers={headers} newKeys={newKeys} setNewKeys={setNewKeys} oldKeys={oldKeys}/> : <div>Upload file to get data...</div>}
    </div>
  );
}

export default DataKeys;