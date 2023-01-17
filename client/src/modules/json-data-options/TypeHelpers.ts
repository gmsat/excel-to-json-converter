class TypeHelpers {

  static isInt(_number: number): boolean {
    return _number % 1 === 0;
  }

  static isFloat(_number: number): boolean {
    return _number % 1 !== 0;
  }

  static isDate(_string: string): boolean {
    return !isNaN(Date.parse(_string));
  }

  static getArrObjectTypes(_array: any[]) {
    const types: any[] = [];

    _array.some(obj => {
      for (let key in obj) {

        if (typeof obj[key] === "number" && this.getDataType(obj[key]) === "FLOAT") {
          // console.log("OBJ KEY FLOAT", obj[key]);
          types.push("FLOAT");
          return;
        }

        if (typeof obj[key] === "number" && this.getDataType(obj[key]) !== "FLOAT") {
          // console.log("OBJ KEY INT", obj[key]);
          types.push("INT");
          return;
        }

        if (typeof obj[key] === "string") {
          // console.log("OBJ KEY STRING / DATE", obj[key]);
          types.push(this.getDataType(obj[key]));
          return;
        }

      }
    });

    console.log("types", types);
  }

  static getDataType(_value: any) {
    const returnType = ["DATE", "STRING", "INT", "FLOAT"];

    if (typeof _value === "string") {

      if (TypeHelpers.isDate(_value)) {
        return returnType[0];
      }

      if (!TypeHelpers.isDate(_value)) {
        return returnType[1];
      }
    }

    if (typeof _value === "number") {

      if (TypeHelpers.isInt(_value)) {
        return returnType[2];
      }

      if (TypeHelpers.isFloat(_value)) {
        return returnType[3];
      }
    }

    return "";
  }

  // private getUUIDVersion(_version: number): RegExp {
  //   const version = _version;
  //   const UUID_TEMPLATE = /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  //   return /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  // }

  static isGuid(_string: string): boolean {
    const UUID_V1 = /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    const UUID_V2 = /^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    const UUID_V3 = /^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    const UUID_V4 = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    const UUID_V5 = /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    return !!(_string.match(UUID_V1) || _string.match(UUID_V2) || _string.match(UUID_V3) || _string.match(UUID_V4) || _string.match(UUID_V5));
  }

}

export default TypeHelpers;