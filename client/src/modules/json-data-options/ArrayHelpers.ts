// write logic for JSON data manipulation

// TODO: change key names

// TODO: change key values

// TODO: change key values by object index

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
        // if (_newKeyName.length <= 1) return [key, value];
        return [_keyIndex === objIndex ? _newKeyName : key, value];
      })
      return Object.fromEntries(newObj);
    });
  }

  keyExists(_array: any[], _keyToCheck: string): boolean {
    return _array[0].hasOwnProperty(_keyToCheck);
  }

  updateObjectValuesByIndex(_objects: any[], _newValue: string | number, _keyNameIndex: number, _indexNumbers: number[]) {
    // TODO: change values of the object array by selected indices [ change(_array, _objKeyIndex, _objectIndexes) ]
    //  change(outputData, index, [1, 3, 5, 8]); -> this will will change values for key[index] for objects 1, 3, 5, 8

    // _indexNumbers.forEach(index => {
    //   if (index < _objects.length) {
    //     _objects[index][_keyNameIndex] = _newValue;
    //   }
    // });

    // return _objects;
    // return _objects.map((obj, index) => {
    //   const newObj = Object.entries(obj).map(([key, value], objIndex) => {
    //     // if (_newKeyName.length <= 1) return [key, value];
    //     return [_keyIndex === objIndex ? _newKeyName : key, value];
    //   })
    //   return Object.fromEntries(newObj);
    // });

    // const updatedObjects = _objects.map((object, index) => {
    //   if (_indexNumbers.includes(index)) {
    //
    //     return {  }
    //
    //     // return { ...object, [_keyNameIndex]: _newValue };
    //   }
    //   return object;
    // });

    // const updatedObjects = [..._objects];
    // _indexNumbers.forEach(index => {
    //   if (index < updatedObjects.length) {
    //     updatedObjects[index][_keyNameIndex] = _newValue;
    //   }
    // });

    // const newObjects = _objects.map((obj, i) => {
    //   const newObj = Object.entries(obj).map(([key, value], objIndex) => {
    //
    //     if (_indexNumbers.includes(objIndex)) {
    //
    //       // console.log("INDEX NUMBERS:", _indexNumbers);
    //       // console.log({
    //       //   objectIndex: `${objIndex}`,
    //       //   objectKey: `${obj[key][_keyNameIndex]}`,
    //       //   originalValue: `${value}`,
    //       //   newValue: `${_newValue}`
    //       // });
    //
    //       console.log("SELECTION", {
    //       });
    //
    //       return [key, _newValue];
    //     }
    //
    //     return [key, value];
    //   });
    //
    //   return Object.fromEntries(newObj);
    // });

    const newObjects = _objects.map((obj, i) => {
      if (_indexNumbers.includes(i)) {
        const newObj = Object.entries(obj).map(([key, val], objIndex) => {
          return [key, val];
        });

        console.log(newObj);
        return newObj;
      }

      return;

      // const newObj = Object.entries(obj).map(([key, val], objIndex) => {
      //   if (_indexNumbers.includes(objIndex)) {
      //     return [key, val];
      //   }
      //
      //   return;
      // });

      // return Object.fromEntries(newObj);
    });

    // console.log(newObjects);
    return newObjects;
  }
}
