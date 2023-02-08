import TypeHelpers from "./TypeHelpers";

type SelectorDataTypes = "text" | "number" | "date";

export class ArrayHelpers {

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

  static setIndexNumbers(_array: object[]): number[] {
    const numArr: number[] = [];
    _array.map((obj, index) => {
      numArr.push(index);
    });

    return numArr;
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
                     _dataType: SelectorDataTypes) {
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

  getDataTypes(_objects: any[]) {
    const values = Object.values(_objects[1]);
    const types: string[] = [];

    for (const value of values) {
      types.push(TypeHelpers.getDataType(value));
    }

    return types;
  }

  getObjectDataTypes(_object: object): string[] {
    const values = Object.values(_object);
    const types: string[] = [];

    for (const value of values) {
      types.push(TypeHelpers.getDataType(value));
    }

    return types;
  }

  getDataTypes2(_objects: any[]) {
    const values = Object.values(_objects[1]);
    const types: string[] = [];

    for (let object of _objects) {
      const objValues = Object.values(object);
      const objValueTypes: object[] = [];

      for (const value of objValues) {
        objValueTypes.push({type: TypeHelpers.getDataType(value), value: value});
      }
    }

    return types;
  }

  getDataFromArray(_objects: any[]) {
    const values = Object.values(_objects[1]);
    const types: string[] = [];

    for (const value of values) {
      types.push(TypeHelpers.getDataType(value));
    }

    return types;
  }

  getHeaderValuesByIndex(_objects: any[], _keyIndex: number) {
    const arr = _objects.map((obj, i) => {
      const [key, val] = Object.entries(obj)[_keyIndex];

      return {
        index: i,
        keyIndex: _keyIndex,
        key: key,
        value: val
      };
    });

    return [...arr];
  }

  getHeaderValuesByNameIndex(_objects: any[], _keyName: string, _keyIndex: number) {
    const arr = _objects.map((obj, i) => {
      const val = obj[_keyName];

      if(val === undefined) return null

      return {
        index: i,
        keyIndex: _keyIndex,
        key: _keyName,
        value: val
      };
    });

    return arr.filter(val => val !== null)
  }

  static deleteKeyByKeyNameFromObjectArray(_array: object[], _keyName: string): object[] {
    return _array.map((obj: any, i) => {
      if (_keyName in obj) {
        delete obj[_keyName];
      }
      return obj;
    });
  }

  static getObjectHeaders(_array: object[]): string[] {
    const firstObj = _array[0];
    return Object.keys(firstObj);
  }

  getHeaderValuesByName(_objects: any[], _keyName: string, _keyIndex: number = 0) {
    const arr = _objects.map((obj, i) => {
      const val = obj[_keyName];

      if(val === undefined) return null

      return {
        index: i,
        keyIndex: _keyIndex,
        key: _keyName,
        value: val
      };
    });

    return arr.filter(val => val !== null);
  }
}