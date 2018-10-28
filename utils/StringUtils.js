export default class StringUtils {
  static getEmptyStr(str, emptyStr) {
    if (str !== undefined && str != null && str !== '') {
      return str;
    }
    if (emptyStr === undefined || emptyStr == null) {
      return '无';
    }
    return emptyStr;
  }

  static isEmptyStr(str) {
    if (str !== undefined && str != null && str !== '') {
      return false;
    }
    return true;
  }

  static isRentureDefault(str) {
    return str === null ? '-' : str;
  }
}
