import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import store from '@/store/index';
import ddAuthApi from '@/api/ddAuth.js';
import { getUserRoleAndPermission } from '@/api/role.js';
import HTTP_USER from '@/api/user.js';
import {routers, otherRouter, appRouter} from './router';
import rebuildRouters from '@/rebuild/router/router.js'
import HTTP from '@/api/work-flow.js'
Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: [...rebuildRouters, ...routers]
};
export const router = new VueRouter(RouterConfig);

const DingTalkPC = window.DingTalkPC
// 判断是否在钉钉客户端环境
const isInDingTalk = DingTalkPC.ua.isDesktop && DingTalkPC.ua.isInDingTalk
store.commit('setIsInDingTalk', isInDingTalk)
sessionStorage.setItem('isInDingTalk',isInDingTalk);
 // 如果在钉钉环境中，可能会缓存整个页面
if (isInDingTalk) {
    store.state.user.isAuthed = false
}
// pc网页登录逻辑
let routerBeforeEach = async (to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title);
  //判断体验账号 
  if(to.name==="app-list"&&window.isExpAccount===true){
    
    //1.查询企业账号
    //2.登录
    if( Cookies.get("isLogin")!=="true"){
      let result = await HTTP.Login({
        loginName:"admin_trial" ,
        password:"",
        companyId:"",
      })
      if (result.code === '0') {
        Cookies.set('user', "admin_trial")
        Cookies.set('title', result.title)
        Cookies.set('userName', result.userName)
        Cookies.set('photo', result.photo)
        let seconds = 10;
        let expires = new Date(new Date() * 1 + seconds * 1000);
        Cookies.set("isLogin","true",{ expires: expires }) //10秒后失效
        store.commit('user/setCompanyId', result.companyId);
        let permissionsRes = await getUserRoleAndPermission()
        store.dispatch(
          'user/setPermissionsObj',
          permissionsRes.permissions
        )
        next();
      } else {
        this.$Message.error(result.msg)
      }
    }
  
  } 
  //EADP正式环境不让跳到我们自己的登录页
  if(!window.isExpAccount&&to.name==="login"){
    next({
      name: 'home_index'
    });
  }


  // 单点登陆后获取权限，非后台页面已登陆页面判断是否需要获取权限
  if (
    to.matched[0].path !== '/admin' &&
    Object.keys(store.state.user.permissions).length === 0 ||
    (!store.state.user.companyId)
  ) {
    let permissionsRes = await getUserRoleAndPermission()
    store.dispatch('user/setPermissionsObj', permissionsRes.permissions)
    store.commit('user/setCompanyId', permissionsRes.companyId);
  }
  if (!store.state.user.companyId) {
    let user = await HTTP_USER.detail();
    store.commit('user/setCompanyId', user.companyId);
  }
 
  

  if(from.name==='start-application'||from.name==='my-work'){
    store.state.listview.currentTabIndex=null  
  }
  if(to.name!='home_index'){
    store.commit('setIsHome', false)
  }
  else{
    store.commit('setIsHome', true)
  }
  // 判断是否已经登录且前往的页面不是登录页
  if (Cookies.get('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
    next({
      replace: true,
      name: 'locking'
    });
  } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
    next(false);
  } else {
    if (to.fullPath === '/account-manager/updatePassword'||  to.fullPath==='/account-manager/corpAccount') { // 修改密码,不验证登录及权限
      next();
    } 
    // else if (!Cookies.get('user') && to.name !== 'login'&&to.name!=='consoleLogin'&&to.name!=='consolePage'&& to.matched[0].path !== '/admin') { // 判断是否已经登录且前往的页面不是登录页
    //   next({
    //     name: 'login'
    //   });
    //   // } else if (Cookies.get('user') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
    //   //     Util.title();
    //   //     next({
    //   //         name: 'home_index'
    //   //     });
    // } 
    else if(Cookies.get('consoleLogin')!=="1" && to.matched[0].path === '/admin') {
      next({
        name: 'consoleLogin'
      })
    } else if(Cookies.get('consoleLogin')!=="1"&& to.name === 'consolePage'){
      next({
        name: 'consoleLogin'
      });
    }
    else {
      const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
      if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
        if (curRouterObj.access === parseInt(Cookies.get('access'))) {
          Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
        } else {
          next({
            replace: true,
            name: 'error-403'
          });
        }
      } else { // 没有配置权限的路由, 直接通过
        Util.toDefaultPage([...routers], to.name, router, next);
      }
    }
  }
}
// 钉钉环境路由逻辑
if (isInDingTalk) {
  routerBeforeEach = async (to, from, next) => {
    iView.LoadingBar.start();
    if(to.name!='home_index'){
      store.commit('setIsHome', false)
    }
    else{
      store.commit('setIsHome', true)
    }

    Util.title(to.meta.title);
    if (store.state.user.isAuthed || to.name === 'login') {
      next();
    } else {
    // DingTalkPC.ready(async () => {
      let corpRes = await ddAuthApi.getCorpId()
      DingTalkPC.runtime.permission.requestAuthCode({
        corpId: corpRes.corpId,
        onSuccess: result => {
          ddAuthApi.ddAuth({ code: result.code }).then(async authResult => {
            console.log(authResult)
            if (authResult && authResult.code === '0') {
              store.commit('user/setAuthStatus', true);
              Cookies.set('user', authResult.userName)
              Cookies.set('title', authResult.title)
              Cookies.set('userName', authResult.userName)
              store.commit(
                'setAvator',
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
              )
              store.commit('user/setCompanyId', authResult.companyId);
              let permissionsRes = await getUserRoleAndPermission()
              store.dispatch(
                'user/setPermissionsObj',
                permissionsRes.permissions
              )
              /*next({
                name: 'home_index'
              })*/
              next();
            } else {
              console.log(authResult)
              // iView.Message.error(authResult);
              next({
                name: 'login'
              });
            }
          })
        },
        onFail: result => {
          console.log(result)
          // iView.Message.error(result);
          next({
              name: 'login'
            });
          }
      })
    //  return false
    // })
    }
  }
}
router.beforeEach(routerBeforeEach);
router.afterEach(to => {
  Util.openNewPage(router.app, to.name, to.params, to.query);
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
