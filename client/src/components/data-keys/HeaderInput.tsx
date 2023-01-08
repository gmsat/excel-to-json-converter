import React, { useEffect, useState } from "react";

export interface HeaderInputProps {
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

export const HeaderInput: React.FC<HeaderInputProps> = ({
                                                          itemData,
                                                          index,
                                                          setUpdatedKeys,
                                                          updatedKeys,
                                                          resetClicked
                                                        }) => {
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