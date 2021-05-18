/* eslint-disable */
import axios from "axios";

const prefix = 'https://tnv.eyeteam.vn/api.';

const client = axios.create({
  baseURL: prefix,
  timeout: 20000,
  withCredentials: false,
});

client.interceptors.request.use((config) => {
  Object.assign(config.headers, getDefaultHeaders());
  return config;
});

function getDefaultHeaders() {
  return {
    // 'Authorization': 'Bearer ' + cookieUtil.getCookie('token')
    };
}

const api = {
  get: '',
  post: '',
  put: '',
  delete: ''
}

Object.keys(api).forEach((item) => {
  api[item] = (url, data, header) => {
    return new Promise((resolve, reject) => {
      client[item](prefix + url, data, header)
        .then((resp) => {
          resolve(resp.data)
        })
        .catch((error) => reject(error))
    })
  }
})

export default api;
