  export default async (url = '', data = {}, type = 'GET', method = 'fetch', isAsync = true) => {
      type = type.toUpperCase();
    //   url = '/ctg-workflow' + url;
      return new Promise((resolve, reject) => {
          $.ajax({
              url: url,
              method: type,
              data: data,
              dataType: 'json',
              async: isAsync,
              success: function (response) {
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