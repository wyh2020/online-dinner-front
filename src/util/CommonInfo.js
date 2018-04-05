/**
 * Created with hzh.
 * Date: 2018/3/31
 * Time: 下午3:21
 */

const CommonInfo = function () {};


/**
 * 包装 localStorage
 * */
const localStorageWrap = {
  setItem(key, value) {
    localStorage.setItem(key, value);
  },
  getItem(key) {
    return localStorage.getItem(key);
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
};

CommonInfo.localStorage = localStorageWrap;

/**
 * 包装sessionStorage
 * */
const sessionStorageWrap = {
  setItem(key, value) {
    sessionStorage.setItem(key, value);
  },
  getItem(key) {
    return sessionStorage.getItem(key);
  },
  removeItem(key) {
    sessionStorage.removeItem(key);
  },
};


/**
 * 存储token
 */
CommonInfo.saveToken = function (flag) {
  sessionStorageWrap.setItem('ODToken', flag);
};

CommonInfo.getToken = function () {
  return sessionStorageWrap.getItem('ODToken');
};

CommonInfo.removeToken = function () {
  sessionStorageWrap.removeItem('ODToken');
};


/**
 * 存储ODUserInfo
 */
CommonInfo.saveODUserInfo = function (flag) {
  sessionStorageWrap.setItem('ODUserInfo', flag);
};

CommonInfo.getODUserInfo = function () {
  return sessionStorageWrap.getItem('ODUserInfo');
};

CommonInfo.removeODUserInfo = function () {
  sessionStorageWrap.removeItem('ODUserInfo');
};

/**
 * 存储购物车数量
 */
CommonInfo.saveODCartSum = function (flag) {
  sessionStorageWrap.setItem('ODCartSum', flag);
};

CommonInfo.getODCartSum = function () {
  return sessionStorageWrap.getItem('ODCartSum');
};

CommonInfo.removeODCartSum = function () {
  sessionStorageWrap.removeItem('ODCartSum');
};


CommonInfo.sessionStorage = sessionStorageWrap;

module.exports = CommonInfo;
