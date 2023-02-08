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
          types.push("FLOAT");
          return;
        }

        if (typeof obj[key] === "number" && this.getDataType(obj[key]) !== "FLOAT") {
          types.push("INT");
          return;
        }

        if (typeof obj[key] === "string") {
          types.push(this.getDataType(obj[key]));
          return;
        }

      }
    });
  }

  static getDataType(_value: any) {
    const returnType = ["DATE", "STR", "INT", "FLOAT"];

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
}

export default TypeHelpers;