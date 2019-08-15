<style lang="less">
@import url("./home/Font-Awesome-3.2.1/css/font-awesome.min.css");
@import "./main.less";
.ivu-dropdown-rel {
  position: relative;
}
.newText{
  font-family: PingFang-SC-Regular;
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: 0;
}
.ivu-dropdown-transfer {
  width: auto;
}

.ivu-dropdown-item-focus,
.ivu-dropdown-item:hover {
  background: #f3f3f3;
}

.ivu-dropdown-item-disabled {
  color: #bbbec4;
  cursor: not-allowed;
}

.ivu-dropdown-item-disabled:hover {
  color: #bbbec4;
  background-color: #fff;
  cursor: not-allowed;
}

.ivu-dropdown-item-selected,
.ivu-dropdown-item-selected:hover {
  color: #fff;
  background: rgba(45, 140, 240, .9);
}

.ivu-dropdown-item-selected.ivu-dropdown-item-focus {
  background: rgba(40, 123, 211, .91);
}

.ivu-dropdown-item-divided {
  margin-top: 5px;
  border-top: 1px solid #e9eaec;
}

.ivu-dropdown-item-divided:before {
  content: "";
  height: 5px;
  display: block;
  margin: 0 -16px;
  background-color: #fff;
  position: relative;
  top: -7px;
}

.ivu-dropdown-large .ivu-dropdown-item {
  padding: 7px 16px 8px;
  font-size: 14px !important;
}
.applist-margin-left  .ivu-poptip-popper {
  margin-right: 100px !important;
  left:-120px!important
}
.custom-header-menu-item-corp {
  .ivu-dropdown{
    margin-left: 0 !important;
    .ivu-dropdown-rel{
      a{
        color: #fff
      }
    }
  }
}
</style>

<style scoped>

.icons-item {
  margin: 0 0 15px;
  height: 90px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  color: #5c6b77;
}

.icons-item:hover {
  cursor: pointer;
  background-color: #f8f8f8
}

.icons-item i {
  font-size: 30px;
}

.icons-item span {
  display: block;
}

.icon {
  /* 通过设置 font-size 来改变图标大小 */
  width: 3em;
  height: 3em;
  /* 图标和文字相邻时，垂直对齐 */
  vertical-align: -0.15em;
  /* 通过设置 color 来改变 SVG 的颜色/fill */
  fill: currentColor;
  /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
         normalize.css 中也包含这行 */
  overflow: hidden;
  margin: 0 auto;
}
</style>

<style lang="less" scoped>
.custom-btn {
  display: inline-block;
  cursor: pointer;

  & .custom-icon {
    color:#fff;
    vertical-align: top;
  }

  & .custom-title {
     color:#fff;
    margin: 0 2px;
    vertical-align: top;
  }
}

.main-text{
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 27px!important;
    color:#fff
}

.custom-main-header {
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  //overflow:auto;
  // background: #fff;
  // border-bottom: 1px solid #eee;
  .custom-main-logo img {
    width: auto;
    max-width: 350px;
    padding: 5px;
  }
  z-index: 2;
  &.s-hidden {
    z-index: 1;
  }
  .custom-header-breadcrumb {
    color:#fff;
    position: relative;
    // top: 50%;
    // transform: translateY(-50%);
    margin-left: 20px;
  }

  .logo-img{
    max-width: 40px;
    max-height: 20px;
    margin-right:10px;
  }
  .custom-header-menu {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 22px;

    &-item {
      float: left;

      &-work,
      &-file,
      &-app {
        padding-right: 20px;
      }

      &-personal,
      &-corp{
        padding-right: 20px;
        border-right: 1px solid #eceae8;
      }
      &-manage {
        padding-right: 20px;
        .applist{
          height : 525px;
          overflow: auto;
        }
      }

      &-logout,
      &-setting {
        padding: 0 20px;
      }
    }
  }
}
</style>

<template>
<div class="main" :class="{'main-hide-text': shrink}">
  <div class="myImg" :style="{backgroundImage: homeBG}">
  <Nav />
   <!-- <div class="home-main  main-panel" style="height:230px" v-if="isHome">
         <Row  style="margin-top:40px">
                <Col span="11">
                    <Row class-name="home-page-row1" :gutter="10">
                        <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                            <Row type="flex" class="user-infor">
                                <Col span="4">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div style="width:60px; height:60px; border-radius:50%; overflow:hidden;margin-top:30px">
                                            <img style=" width:100%;height:100%" :onerror="defaultImg"  :src="photo" />
                                        </div>
                                    </Row>
                                </Col>
                                <Col span="12" style="margin-top:30px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div style="width:420px;margin:0 auto">
                                            <p class="main-text">{{currentTime}}{{userName}}</p>
                                            <p style="color:#fff">做任何一件事都要有始有终,坚持把它做完</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </Col>
                <Col span="13">
                    <Row :gutter="10">
                        <Col
                          span="8"
                          :style="{marginBottom: '10px',cursor:'pointer'}"
                          v-for="(item, index) in showWorkApp"
                          :key="index">
                            <div @click="toTaskMyWork(item.task)">
                                <Card style="background-color: rgba(255,255,255,0);">
                                  <Row type="flex" class="user-infor">
                                    <Col span="10">
                                          <Row class-name="made-child-con-middle" type="flex" align="middle">
                                              	<div style="margin-left:20px">
													<!-- <img :src="item.img" /> -->
													<!-- <i class="iconfont" :class="item.class" style="font-size:30px;color:#fff"/>
												</div>
                                          </Row>
                                      </Col>
                                      <Col span="14" style="padding-left:6px;">
                                          <Row class-name="made-child-con-middle" type="flex" align="middle">
                                              <div>
                                                <p class="newText"> {{ item.name }} </p>
                                                  <div class="count-to-con">
                                                      <CountTo :endVal="item.num" style="color:#fff">
                                                          <span slot="leftText">总共:&nbsp;</span>
                                                          <span slot="rightText">&nbsp;条</span>
                                                      </CountTo>
                                                  </div>
                                              </div>
                                          </Row>
                                      </Col>
                                    
                                  </Row>
                                </Card>
                            </div>
                        </Col> -->
                        <!-- <Col span="12" :style="{marginBottom: '10px',cursor:'pointer'}">
                            <div @click="toTaskMyWork('2')">
                                <Card style="background-color: rgba(255,255,255,0);">
                                    <Row type="flex" class="user-infor">
                                      <Col span="10">
                                            <Row class-name="made-child-con-middle" type="flex" align="middle">
                                                <div style="margin-left:20px">
                                                    <img  src="./index_icon_matters.png" />
                                                </div>
                                            </Row>
                                        </Col>
                                        <Col span="14" style="padding-left:6px;">
                                            <Row class-name="made-child-con-middle" type="flex" align="middle">
                                            <div>
                                                    <p class="newText">审批事项</p>
                                                    <div class="count-to-con">
                                                        <CountTo :endVal="myCount.toVerifyTaskCount"  :param='2' style="color:#fff">
                                                            <span slot="leftText">总共:&nbsp;</span>
                                                            <span slot="rightText">&nbsp;条</span>
                                                        </CountTo>
                                                    </div>
                                                </div>
                                            </Row>
                                        </Col>
                                        
                                    </Row>
                                </Card>
                            </div>
                        </Col> -->
                    <!-- </Row> -->
                <!-- </Col>
            </Row>
  </div> -->
 </div>
  <div class="single-page-con" :style="{left: shrink?'0px':'0px'}">
    <div class="single-page">
      <keep-alive :include="cachePage">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
  

</div>
</template>
<script>
import Nav from '@/rebuild/components/nav/index'
import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
import tagsPageOpened from './main-components/tags-page-opened.vue';
import breadcrumbNav from './main-components/breadcrumb-nav.vue';
import fullScreen from './main-components/fullscreen.vue';
import appMana from './main-components/appMana.vue';
import lockScreen from './main-components/lockscreen/lockscreen.vue';
import messageTip from './main-components/message-tip.vue';
import navHeader from './main-components/navHeader.vue';
import finishWork from './main-components/finishWork.vue';
import selfSubmit from './main-components/selfSubmit.vue';
import documentLib from './main-components/documentLib.vue';
import authority from './main-components/authority.vue';
import themeSwitch from './main-components/theme-switch/theme-switch.vue';
import CountTo from './newhome/components/CountTo.vue'; 
import Cookies from 'js-cookie';
import util from '@/libs/util.js';
import HTTP from '../api/app-apply.js';
import API from '../api/work-flow.js';
import User from '@/api/user.js'
import axios from 'axios'
import Home from '@/api/home.js'
import './newhome/home.less'
import { mapState } from 'vuex';
import { appRouter } from '@/router/router.js'


export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    lockScreen,
    messageTip,
    finishWork,
    selfSubmit,
    documentLib,
    themeSwitch,
    appMana,
    navHeader,
    authority,
    CountTo,
    Nav
  },
  data () {
    return {
      shrink: true,
      homeFlag:false,
      appData: [],
      currentTime:'',
      userName:Cookies.get('userName'),
      // photo:Cookies.get('photo'),
      photo: '',
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      errorImg01: 'this.src="' + require('./logo1.png') + '"',
      defaultImg:'this.src="' + require('./default.jpg') + '"',
      homeBG: '',
      allWorkApp: [],
      showWorkApp: []
    };
  },
  computed: {
    isHome(){
      return this.$store.state.app.isHome;
    },

    isInDingTalk () {
      return this.$store.state.app.isInDingTalk;
    },
    menuList () {
      return this.$store.state.app.menuList;
    },
    pageTagsList () {
      return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    },
    currentPath () {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatorPath () {
      return localStorage.avatorImgPath;
    },
    cachePage () {
      return this.$store.state.app.cachePage;
    },
    lang () {
      return this.$store.state.app.lang;
    },
    menuTheme () {
      return this.$store.state.app.menuTheme;
    },
    mesCount () {
      return this.$store.state.app.messageCount;
    }
  },
  methods: {
    changePhoto(url) {
      this.photo = url
    },
    changeShowWorkApp(code) {
      this.showWorkApp = this.allWorkApp.filter(item => code.indexOf(item.code) >= 0);
    },
    toTaskMyWork(type) {
      this.$router.push({
          name: 'my-work',
          query: {type: type}
      });
    },
    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name);
      this.$store.commit('updateMenulist');
      if (pathArr.length >= 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name);
      }
      this.userName = Cookies.get('userName');
      let messageCount = 3;
      this.messageCount = messageCount.toString();
      this.checkTag(this.$route.name);
      this.getUnfinishJob();
      this.$store.commit('setMessageCount', 3);
    },

    imgError(){
      item.img = require('./index_logo.png');
    },
    getCurrentTime(){
            var now = new Date(),hour = now.getHours()
            if(hour < 6){this.currentTime="凌晨好！"}
            else if (hour < 9){this.currentTime="早上好！"}
            else if (hour < 12){this.currentTime="上午好！"}
            else if (hour < 14){this.currentTime="中午好！"}
            else if (hour < 18){this.currentTime="下午好！"}
            else {this.currentTime="晚上好！"}

        },
    toApp(itemId, itemName) {
      if (this.$refs.appBtn) {
        this.$refs.appBtn.handleClose()
      }
      for(var index in appRouter[0].children){
        if (appRouter[0].children[index].name=='start-application') {
            appRouter[0].children[index].title=itemName
        }
      }
      this.$router.push({
        name: 'start-application',
        params: {
          moduleId: itemId,
          moduleName: itemName
        }
      });
    },
    toTask(param = '1'){
          this.$router.push({
            name: 'my-work',
            query: {type: param}
        });
    },
    // gotoUpdateMessage(){
    //    //util.openNewPage(this, 'ownspace_index');
    //   this.$router.push({
    //       name: 'ownspace_index'
    //   });
    // },
    gotoPersonalInformation() {
      this.$router.push({
        name: 'personal_information'
      });
    },
     getCount(){
            HTTP.myUpcomingCount().then((data)=>{
                if(data.code==0){
                    this.allWorkApp = [
                        {'task': '4', name: '待办事项', num: data.fillTaskCount, class: 'icondaiban', code: '1'},
                        {'task': '2', name: '审批事项', num: data.toVerifyTaskCount, class: 'iconshenpi', code: '2'},
                        {'task': '3', name: '抄送审批', num: data.ccTaskCount, class: 'iconsend', code: '3'},
                        {'task': '5', name: '其他', num: data.otherTaskCount, class: 'iconqita', code: '4'},
                        {'task': '6', name: '已发起', num: data.submitTaskCount, class: 'iconfasong', code: '5'},
                        {'task': '7', name: '已办理', num: data.doneTaskCount, class: 'iconiconfontzhizuobiaozhun0261', code: '6'}
                    ]
                    Home.getUpcomingConfiguration({companyId: this.$store.state.user.companyId}).then(data => {
                      if (data.UpcomingConfiguration) {
                        var code = data.UpcomingConfiguration.split(';')
                      } else {
                        var code = ['1','2']
                      }
                      this.showWorkApp = this.allWorkApp.filter(item => code.indexOf(item.code) >= 0)
                    })
                }
                else{
                    this.$Message.error('error')
                }
            }).catch((err)=>{
                 this.$Message.error(err.msg)
            })
        },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });
      if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
      }
    },
    handleSubmenuChange(val) {
      // console.log(val)
    },
    beforePush(name) {
      // if (name === 'accesstest_index') {
      //     return false;
      // } else {
      //     return true;
      // }
      return true;
    },
    fullscreenChange(isFullScreen) {
      // console.log(isFullScreen);
    },
    getModuleList() {
      this.getLoading = true;
      HTTP.getAllModule({requestSource:1})
        .then(res => {
          this.appData = res.page.result;
          for (var index in this.appData) {
            this.appData[index].icon = "<use xlink:href=" + this.appData[index].icon + "></use>"
          }
        })
        .catch(err => {
          this.$Message.error('This is an error')
        }).finally(() => {
          this.getLoading = false;
        })
    },
    getUnfinishJob() {
      API.unfinishJobList()
        .then(res => {
          //this.total = res.page.total;
          this.$store.commit('setMessageCount', res.total);
        })
        .catch(err => {

          this.$Message.error(err);
        }).finally(() => {
          this.getLoading = false;
        })
    },
    goAppManager() {
      this.$router.push({
        name: 'workflow-design'
      });
    },
    gotoInterfaceManger(){
      this.$router.push({
        name: 'interface-manage'
      });
    },
    gotoPage() {
      this.$router.push({
        name: 'people-manage'
      });
    },
    gotoMyWork() {
      this.$router.push({
        name: 'my-work'
      });
    },
    gotoDocumentLib() {
      this.$router.push({
        name: 'document-lib'
      });
    },
    // gotoLogManager() {
    //   this.$router.push({
    //     name: 'log-manage'
    //   });
    // },
    goSystem(name) {
      this.$router.push({
        name: name
      });
    },
    logout() {
      // 退出登录
      this.$store.commit('user/logout', this);
      this.$store.commit('clearOpenedSubmenu');
      this.$router.push({
        name: 'login'
      });
    },
    changeHomeBG(url) {
      this.homeBG = url
    }
  },
  watch: {
    '$route' (to) {
      this.$store.commit('setCurrentPageName', to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      if (pathArr.length > 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name);
      }
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    }
  },
  // mounted() {
  //   this.init();
  //    this.getCount();
  //   this.getCurrentTime();
  //   this.getModuleList();
  // },
  created() {
    // 显示打开的页面的列表
    // this.$store.commit('setOpenedList');
    // API.companyDetail({companyId:this.$store.state.user.companyId}).then(res => {
    //   if (res.company && res.company.logoDownId) {
    //     var img = `${axios.defaults.baseURL}/Form/downloadFile/` + res.company.logoDownId
    //     this.$store.commit('user/setLogoImg', img)
    //   } else {
    //     this.$store.commit('user/setLogoImg', '')
    //   }
    // })
    // User.detail().then(res => {
    //   this.photo = res.user.photo
    // })
    Home.getHomePicture({companyId: this.$store.state.user.companyId}).then(res => {
			if (!res.homePicture) {
        this.homeBG = 'url(' + require('./index_bg.png') + ')'
			} else {
        this.homeBG = `url(${axios.defaults.baseURL}/Form/downloadFile/${res.homePicture})`
			}
		}).catch(e => {
			this.$Message.error('获取图片失败')
		}).finally(() => {
		})
  }
};
</script>
