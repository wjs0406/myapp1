export default class DateUtils {
  static getFormatDate(timeStamp) {
    // 时间戳转换成2018-06-03 12:00:00格式
    if (timeStamp !== undefined && timeStamp != null && timeStamp !== '') {
      const date = new Date(timeStamp);
      return (
        date.getFullYear() +
        '-' +
        this.add0(date.getMonth() + 1) +
        '-' +
        this.add0(date.getDate()) +
        ' ' +
        this.add0(date.getHours()) +
        ':' +
        this.add0(date.getMinutes()) +
        ':' +
        this.add0(date.getSeconds())
      );
    }
    return '-';
  }

  static add0(m) {
    return m < 10 ? '0' + m : m;
  }
}
