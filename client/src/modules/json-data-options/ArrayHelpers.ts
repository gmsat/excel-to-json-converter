import TypeHelpers from "./TypeHelpers";

export class ArrayHelpers {
  private data: any[] = [];

  private renameKey(_array: any[], _originalKey: string, _newKey: string) {
    return _array.map((item, index) => {
      const newObj: any = Object.entries(item).map(([key, value]) => {
        return [key === _originalKey ? _newKey : key, value];
      });

      return Object.fromEntries(newObj);
    });
  }

  private multiRenameKeys(_array: any[], _oldKeys: string[], _newKeys: string[]) {
    let changedKeys = _array;

    for (let i = 0; i <= _newKeys.length - 1; i++) {
      changedKeys = this.renameKey(changedKeys, _oldKeys[i], _newKeys[i]);
    }

    return changedKeys;
  }

  getNewKeys(_array: string[], _index: number, _targetVal: any) {
    return _array!.map((item, i) => {
      if (i === _index) return _targetVal;
      else return item;
    });
  }

  renameKeysByIndex(_array: any[], _keyIndex: number, _newKeyName: string) {
    return _array.map((obj, index) => {
      const newObj = Object.entries(obj).map(([key, value], objIndex) => {
        return [_keyIndex === objIndex ? _newKeyName : key, value];
      })
      return Object.fromEntries(newObj);
    });
  }

  renameKeysByKeyName(_array: any[], _keyName: string, _newKeyName: string) {
    return _array.map((obj, index) => {
      const newObj = Object.entries(obj).map(([key, value], objIndex) => {
        return [key === _keyName ? _newKeyName : key, value];
      })
      return Object.fromEntries(newObj);
    });
  }

  keyExists(_array: any[], _keyToCheck: string): boolean {
    return _array[0].hasOwnProperty(_keyToCheck);
  }

  updateObjectValuesByIndex(_objects: any[], _newValue: string | number, _keyNameIndex: number, _indexNumbers: number[]) {
    let keyToUpdate = Object.keys(_objects[0])[_keyNameIndex];
    let updatedArray = [..._objects];

    for (let i of _indexNumbers) {
      updatedArray[i] = {
        ...updatedArray[i],
        [keyToUpdate]: _newValue
      };
    }

    return updatedArray;
  }

  updateObjectValues(_objects: any[],
                     _newValue: string | number,
                     _keyNameIndex: number,
                     _indexNumbers: number[],
                     _dataType: "string" | "number") {
    let keyToUpdate = Object.keys(_objects[0])[_keyNameIndex];
    let updatedArray = [..._objects];
    let newValue: string | number;

    if (typeof _newValue === "string" && _dataType === "number") {
      newValue = parseFloat(_newValue);
      if (newValue % 1 === 0) {
        newValue = parseFloat(newValue.toFixed(2));
      }
    } else {
      newValue = _newValue.toString();
    }

    for (let i of _indexNumbers) {
      updatedArray[i] = {
        ...updatedArray[i],
        [keyToUpdate]: newValue
      };
    }

    return updatedArray;
  }

  // TODO: loop through all objects and if one value is float, set type to float
  // getDataTypes(_objects: any[]) {
  //   const values = Object.values(_objects[1]);
  //   const types: string[] = [];
  //
  //   values.map((val, i) => {
  //     const result = _objects.some(obj => obj[i])
  //   })
  //
  //   // const valuesArr = [];
  //   // const valuesTypes: any[] = [];
  //
  //   for (const value of values) {
  //
  //     if (typeof value === "string") {
  //
  //       if (TypeHelpers.isDate(value)) {
  //         types.push("DATE");
  //
  //         // valuesArr.push(value);
  //         // const obj = {value, type: "DATE"};
  //         // valuesTypes.push(obj);
  //       }
  //
  //       if (!TypeHelpers.isDate(value)) {
  //         types.push("STRING");
  //
  //         // valuesArr.push(value);
  //         // const obj = {value, type: "STRING"};
  //         // valuesTypes.push(obj);
  //       }
  //     }
  //
  //     if (typeof value === "number") {
  //
  //       if (TypeHelpers.isInt(value)) {
  //         types.push("INT");
  //
  //         // valuesArr.push(value);
  //         // const obj = {value, type: "INT"};
  //         // valuesTypes.push(obj);
  //
  //       }
  //
  //       if (TypeHelpers.isFloat(value)) {
  //         types.push("FLOAT");
  //
  //         // valuesArr.push(value);
  //         // const obj = {value, type: "FLOAT"};
  //         // valuesTypes.push(obj);
  //
  //       }
  //     }
  //   }
  //
  //   // console.log(valuesArr);
  //   // console.log(types);
  //   // console.log(valuesTypes);
  //   return types;
  // }

  getDataTypes(_objects: any[]) {
    const values = Object.values(_objects[1]);
    const types: string[] = [];

    // values.map((val, i) => {
    //   const result = _objects.some(obj => obj[i])
    // });

    // _objects.some(obj => {
    //   for (let key in obj) {
    //
    //     if (typeof obj[key] === "string") {
    //       if (TypeHelpers.getDataType(obj[key]) === "DATE") {
    //         types.push("DATE");
    //       }
    //       if (TypeHelpers.getDataType(obj[key]) === "STRING") {
    //         types.push("STRING");
    //       }
    //     }
    //
    //     if (typeof obj[key] === "number") {
    //       if (TypeHelpers.getDataType(obj[key]) === "INT") {
    //         types.push("INT");
    //       }
    //       if (TypeHelpers.getDataType(obj[key]) === "FLOAT") {
    //         types.push("FLOAT");
    //       }
    //     }
    //
    //   }
    // });

    for (const value of values) {
      types.push(TypeHelpers.getDataType(value));
    }

    // console.log(types);
    // TypeHelpers.getArrObjectTypes(_objects);
    // console.log(TypeHelpers.getArrObjectTypes(_objects));
    console.log(types);
    return types;
  }

  /**
   * @returns \{index, key and value\} from provided array of objects and key index
   * @param _objects
   * @param _keyIndex
   */
  getHeaderValuesByIndex(_objects: any[], _keyIndex: number) {
    const arr = _objects.map((obj, i) => {
      const [key, val] = Object.entries(obj)[_keyIndex];
      const returnObject = {
        index: i,
        keyIndex: _keyIndex,
        key: key,
        value: val
      }
      return returnObject;
    });
    return [...arr];
  }

  getHeaderValuesByNameIndex(_objects: any[], _keyName: string, _keyIndex: number) {
    const arr = _objects.map((obj, i) => {
      const val = obj[_keyName];
      if(val === undefined) return null
      const returnObject = {
        index: i,
        keyIndex: _keyIndex,
        key: _keyName,
        value: val
      }
      return returnObject;
    });
    return arr.filter(val => val !== null)
  }

  getHeaderValuesByName(_objects: any[], _keyName: string, _keyIndex: number = 0) {
    const arr = _objects.map((obj, i) => {
      const val = obj[_keyName];
      if(val === undefined) return null
      const returnObject = {
        index: i,
        keyIndex: _keyIndex,
        key: _keyName,
        value: val
      }
      return returnObject;
    });
    return arr.filter(val => val !== null)
  }
}