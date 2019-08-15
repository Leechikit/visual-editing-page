import axios from 'axios';

axios.defaults.timeout = 5000;

const config = {
  responseType: 'text'
};

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  // 对响应数据做些事
  if (res.status != 200) {
    // _.toast(res.data.msg);
    return Promise.reject(res);
    var exception = new CommonException('HTTP错误', 1);
    throw exception;
  }
  return res;
}, (error) => {
  return Promise.reject(error);
});

// 返回一个Promise(发送post请求)
export function file (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, Object.assign({}, params, config))
      .then(response => {
        if (response) resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
