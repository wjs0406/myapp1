import axios from 'axios';
import { Alert } from 'react-native';
// import { NavigationActions } from 'react-navigation';
// import { Toast } from 'teaset';
// import UserUtils from '../utils/UserUtils';
import CommoUtils from '../utils/CommonUtils';

const api = axios.create({
  baseURL: CommoUtils.apiUrl
});

api.interceptors.response.use(
  res => {
    // 请求出错
    if (res.status < 200 || res.status > 299) {
      const err = { code: res.status, message: '网络请求出错，请重试！' };
      return Promise.reject(err);
    }
    // 请求成功
    try {
      // 例如：{ code: 1000, message: "成功", data: null}
      const response = JSON.parse(res.request.response);
      if (response.code === 200) {
        // 逻辑成功
        return response.data; //后台返回的json串
      }
      const err = { code: response.code, message: response.msg };
      // alert(JSON.stringify(err)); // 查看后台返回错误信息
      return Promise.reject(err);
    } catch (e) {
      return res;
    }
  },
  err => {
    // console.log(err.response);
    const error = {
      code: 500,
      message: '网络请求出错，请重试！'
    };
    return Promise.reject(error);
  }
);

export default api;

export function getBaseUrl() {
  return CommoUtils.apiUrl;
}

export function getCancelToken() {
  return axios.CancelToken;
}

export function isCancel(err) {
  return axios.isCancel(err);
}
