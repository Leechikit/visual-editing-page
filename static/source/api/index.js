import axios from "axios";
import qs from "qs";
import { Message } from "element-ui";
import router from "../router/index";
import Vue from 'vue';

export const BASE_URL = '/ctg-workflow';

axios.defaults.timeout = 20000;
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;
if(!window.isExpAccount){
    axios.defaults.baseURL = window.zuulAddress   //配置接口地址
}
else{
    axios.defaults.baseURL = BASE_URL;   //配置接口地址
}

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    
    //在发送请求之前做某件事
      if(config.method === 'post' && !config.FormData){
          config.data = qs.stringify(config.data,{
              arrayFormat: 'repeat'
          });
      };
      return config;
  },(error) =>{
       Message.error("错误的传参", 'fail');
      return Promise.reject(error);
  });
  //返回状态判断(添加响应拦截器)
  axios.interceptors.response.use((res) =>{
    //对响应数据做些事
      if(res.status!=200){
          // _.toast(res.data.msg);
          return Promise.reject(res);
          var exception = new CommonException('HTTP错误', 1);  
          throw exception;
      }
      return res;
  }, (error) => {
      console.log(error.response)
      if (error && error.response) {
          switch (error.response.status) {
              case 400: error.message = '参数错误'; break;
              case 401: 
                  error.message = '未授权，请重新登录';
                  if (!window.isExpAccount) {
                      window.location.href = error.response.data.loginUrl
                  } else {
                      window.location.href = '/#/login'
                  };
                  break;
              case 403: 
                  if (!window.isExpAccount) {
                      error.message = '当前登录用户不具备访问该接口服务的权限';
                  } else {
                      error.message = '未授权，请重新登录';
                      window.location.href = '/#/login'
                  };
                  break;
              case 404: error.message = '找不到资源'; break;
              case 408: error.message = '网络不佳，请稍后刷新重试'; break;
              case 413: error.message = '请求实体过大'; break;
              case 500: error.message = '服务器错误'; break;
              case 503: error.message = '服务器超载，请稍后再试'; break;
              case 504: error.message = '服务器响应超时'; break;
              default: error.message = `连接出错(${err.response.status})!`;
          }
      } else {
          error.message = '网络异常，请稍后刷新重试'
      }
      Message.error(error.message)
      // console.log(error.status);
      // if (error.response) {
      //   // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   if(error.response.status == 401||error.response.status == 403){
      //     Message.error("未授权")
      //     window.location.href = '/#/login';
      //     return;
      //   }
      // } else {
      //   // Something happened in setting up the request that triggered an Error
      //   console.log('Error', error.message);
      // }
      return Promise.reject(error);
  });
  //返回一个Promise(发送post请求)
  export function fetch(url, params, config, {beforeFetch, afterFetch} = {}) {
      return new Promise((resolve, reject) => {
          if (typeof beforeFetch === 'function') beforeFetch(axios);
          axios.post(url, params, config)
              .then(response => {
                  if (typeof afterFetch === 'function') afterFetch(axios);
                  if(response) resolve(response.data);
              }, err => {
                  if (typeof afterFetch === 'function') afterFetch(axios);
                  console.log(err);
                  reject(err);
              })
              .catch((error) => {
                  if (typeof afterFetch === 'function') afterFetch(axios);
                  console.log(error);
                  reject(error);
              })
      })
  }
  export function fetchGet(url, params) {
      return new Promise((resolve, reject) => {
          axios.get(url, params)
              .then(response => {
                  if(response) resolve(response.data);
              }, err => {
                  console.log(err);
                  reject(err);
              })
              .catch((error) => {
                  console.log(error);
                  reject(error);
              })
      })
  }