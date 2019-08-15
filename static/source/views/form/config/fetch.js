import {
  baseUrl
} from './env'
export default async(url = '', data = {}, type = 'GET', method = 'fetch',isAsync = true) => {
  type = type.toUpperCase();
  url = baseUrl + url;
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      method: type,
      data: data,
      dataType: 'json',
      async: isAsync,
      xhrFields:{
        withCredentials: true
      },
      crossDomain:true,
      success: function (response) {
        // if(!response.Logined){
        //   window.location.href='/Login/';
        // }
        let obj = response;
        if (typeof obj !== 'object') {
          obj = JSON.parse(obj);
        }
        resolve(obj);
      },
      error: function (err) {
        reject(err);
      }
    });
  })
}



// WEBPACK FOOTER //
// ./src/config/fetch.js