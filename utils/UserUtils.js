export default class UserUtils {
  static logout() {
    global.userInfo = {};
    global.storage.remove({
      key: global.loginKey
    });
  }

  static save(userInfo) {
    global.userInfo = userInfo;
    global.storage.save({
      key: global.loginKey,
      data: userInfo
    });
    // global.storage.userInfo = JSON.stringify(userInfo);
  }
}
