/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = '/ctg-workflow'; 
let routerMode = 'history';

// if (process.env.NODE_ENV == 'development') {
//     baseUrl='/ctg-workflow';

// }else if(process.env.NODE_ENV == 'production'){
//     // baseUrl = 'http://cangdu.org:8001';
//     //baseUrl="/apis";
// }

if(!window.isExpAccount){
    baseUrl = window.zuulAddress;   //配置接口地址
}
else{
    baseUrl = baseUrl;   //配置接口地址
}

export {
    baseUrl,
    routerMode,
};


// WEBPACK FOOTER //
// ./src/config/env.js