import React, { useEffect, useRef, useState, memo, useCallback, useMemo } from 'react';

interface Props {
  data: string[] | null,
  oldKeys: string[],
  setOldKeys: (newOldKeys: string[]) => void,
  newKeys: string[],
  setNewKeys: (newKeys: string[]) => void
}

interface HeaderInputProps {
  itemData: string,
  index: number,
  // newKeys: string[] | null,
  // setNewKeys: (newKeys: string[]) => void
}

// TODO: add checkboxes to enable / disable keys
// TODO: add input fields to set default values for each key

const DataKeys: React.FC<Props> = ({data, newKeys, oldKeys, setOldKeys, setNewKeys}) => {
  const [headers, setHeaders] = useState<string[] | null>(null);
  // const [thisNewKeys, setThisNewKeys] = useState(newKeys);

  useEffect(() => {
    setHeaders(data);
    // setThisNewKeys(newKeys);
  }, [data]);

  // useEffect(() => {
  //   setNewKeys(thisNewKeys);
  // }, [thisNewKeys]);

  // useEffect(() => {
  //   setNewKeys(thisNewKeys);
  // }, [thisNewKeys]);

  function getNewKeys(_array: string[], _index: number, _targetVal: any) {
    return _array!.map((item, i) => {
      if (i === _index) return _targetVal;
      else return item;
    });
  }

  const HeaderInput: React.FC<HeaderInputProps> = ({itemData, index}) => {
    const [value, setValue] = useState(itemData);
    const [checked, setChecked] = useState(true);
    const [updatedKeys, setUpdatedKeys] = useState([""]);

    const handleInputChange = (e: any) => {
      const targetVal = e.target.value;
      const updated = getNewKeys(oldKeys, index, targetVal);
      setUpdatedKeys(updated)
      setValue(targetVal);
    }

    // const handleInputChange = useCallback((e: any) => {
    //   const targetVal = e.target.value;
    //   const newK = getNewKeys(oldKeys, index, targetVal);
    //   setNewKeys(newK);
    //   setValue(targetVal);
    // }, [index]);

    const handleChecked = () => {
      setChecked(!checked);
    }

    return (
      <div style={{display: "flex", gap: 10}}>
        <input type="checkbox" checked={checked} onChange={handleChecked}/>
        <input type="text" value={value} onChange={handleInputChange}/>
        <input type="text" placeholder={"new value"}/>
      </div>
    );
  }

  const headersList = headers?.map((item, index) => {
    return (
      <div key={index} style={{display: "flex", flexFlow: "column", alignItems: "flex-start"}}>

        <div style={{display: "flex", gap: 10}}>
          {index === 0 ? <text style={{fontSize: "0.8rem"}}>Edit headers</text> : null}
        </div>

        <HeaderInput itemData={item} index={index}/>

      </div>
    )
  })

  return (
    <div style={{display: "flex", flexFlow: "column", gap: 5}}>
      {headers ? headersList : <div>Upload file to get data...</div>}
    </div>
  );
}

export default DataKeys;