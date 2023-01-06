import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useGlobal, setGlobal } from "reactn";
import { GlobalState } from "../../App";

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
  setNewKeys: (newKeys: string[]) => void
}

// add checkboxes to enable / disable keys
// add input fields to set default values for each key

const DataKeys: React.FC<Props> = ({data, newKeys, oldKeys, setOldKeys, setNewKeys}) => {
  const [headers, setHeaders] = useState<string[] | null>(null);
  // const [updatedKeys, setUpdatedKeys] = useState(oldKeys);

  useEffect(() => {
    setHeaders(data);
    // setUpdatedKeys(oldKeys)
  }, [data]);

  function getNewKeys(_array: string[], _index: number, _targetVal: any) {
    return _array!.map((item, i) => {
      if (i === _index) return _targetVal;
      else return item;
    });
  }

  const HeaderInput: React.FC<HeaderInputProps> = ({itemData, index}) => {
    const initialValue = useRef(itemData);

    const [value, setValue] = useState(initialValue.current);
    const [checked, setChecked] = useState(true);
    const [updatedKeys, setUpdatedKeys] = useState(oldKeys);

    const handleInputChange = (e: any) => {
      const targetVal = e.target.value;
      const updated = getNewKeys(updatedKeys, index, targetVal);

      setUpdatedKeys(updated);
      setValue(targetVal);

      console.log(updatedKeys);
    }

    const handleChecked = () => {
      setChecked(!checked);
    }

    const handleApply = () => {
      setNewKeys(updatedKeys);
      // setGlobal<GlobalState>({newKeys: updatedKeys});
    }

    return (
      <div>
        {index === 0 ? <button style={{margin: 12, backgroundColor: "aquamarine"}} onClick={handleApply}>Apply Changes</button> : null}
        <div style={{display: "flex", gap: 10}}>
          <input type="checkbox" checked={checked} onChange={handleChecked}/>
          <input type="text" value={value} onChange={handleInputChange}/>
          <input type="text" placeholder={"new value"}/>
        </div>
      </div>
    );
  }

  const headersList = headers?.map((item, index) => {
    return (
      <div key={index} style={{display: "flex", flexFlow: "column", alignItems: "flex-start"}}>

        <div style={{display: "flex", gap: 10}}>
          {index === 0 ? <text style={{fontSize: "0.8rem"}}>Edit headers</text> : null}
        </div>

        <HeaderInput setNewKeys={setNewKeys} key={index} itemData={item} index={index}/>
        {/*<HeaderInput setNewKeys={setNewKeys} key={index} itemData={item} index={index}/>*/}

      </div>
    )
  })

  return (
    <div style={{display: "flex", flexFlow: "column", gap: 5}}>
      {headers ? headersList : <div>Upload file to get data...</div>}
      {/*<button type={"submit"} onClick={handleClick}>Submit Changes</button>*/}
    </div>
  );
}

export default React.memo(DataKeys);