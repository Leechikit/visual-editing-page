<template>
    <!-- 头部导航栏 -->
    <div class="top-nav">
        <div class="top-nav-box">
            <img src="../../images/logo.svg" @click="returnToFront()" style="margin-left: 12px;"/>
            <div class="module-link">
                <ul>
                    <li class="apps" :class="[moduleName=='apps'?'active':'']"><a href="./back-index.html">应用管理</a></li>
                    <li  class="vertical-divider"></li>
                    <li class="organization" :class="[moduleName=='organization'?'active':'']"><a href="./organization.html">组织机构</a></li>
                    <li  class="vertical-divider"></li>
                    <li class="authorization" :class="[moduleName=='authorization'?'active':'']"><a href="./role.html">权限管理</a></li>
                    <li v-if="ShowSystemIntegration" class="vertical-divider"></li>
                    <li v-if="ShowSystemIntegration" class="system-integration" :class="[moduleName=='integration'?'active':'']"><a href="./systemIntegration.html" class="system">系统集成</a></li>
                    <li  class="vertical-divider"></li>
                    <li class="system-version" ><a href="/Console/VersionInformation"   class="system">版本信息</a></li>
                </ul>
            </div>
            <div class="right-tabs">
                <ul class="right-tab">
                    <li class="back-font-button" >
                        <a @click="returnToFront()">
                            返回首页
                        </a>
                    </li>
                    <li class="help" @click="goHelp">
                        <a href="https://home.h3yun.com/help/word.php" target="_blank">
                            <Icon type="ios-help-outline"></Icon>
                            <span>帮助</span>
                        </a>
                    </li>
                    <li class="user" v-clickoutside="{handler:handleClose}">
                        <div class="mask" v-show="ShowEngineOptions"
                        @click="ShowEngineOptions=!ShowEngineOptions"></div>
                        <a href="javascript:void(0);" @click="ShowEngineOptions=!ShowEngineOptions">
                            <div class="user-avatar" v-if="CurUser.ProfilePhotoUrl">
                                <img :src="CurUser.ProfilePhotoUrl" class="media-object img-circle" style="width:22px;height:22px;border-radius: 50%;">
                            </div>
                            <div class="user-info" v-else >
                                
                                <img src="static/images/touxiang.svg" class="media-object img-circle" style="width:22px;">
                            </div>
                            <div class="optionengines" v-show="ShowEngineOptions">
                                <ul>
                                    <li v-for="(engineName,engineCode,index) of OptionalEngines" :key="engineCode" 
                                        :class="{ onlyOneEngine: OptionalEngines.length == 1, 
                                        isCurEngine: engineCode==CurEngineCode}"
                                        @click="toggleEngine(engineCode)">
                                        {{engineName}}
                                    </li>
                                    <li v-if="optionalEnginesCount>1" class="divider" style="height: 17px;border-top: 1px solid #EDEDED;"></li>
                                    <li onclick="window.location.href='/Login/Logout'" class="logout">注销</li>
                                </ul>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script >
// import { Icon } from "iview";
// import { GetUserInfo } from "service/getData";
// import clickoutside from 'src/components/workflowdesigner/clickoutside.js';
export default {
    props:[
       "moduleName",
    ],
  data() {
    return {
      CurUser: {
        Name: "",
        ProfilePhotoUrl: ""
      },
      CurEngineCode: "",
      OptionalEngines: {},
      ShowEngineOptions: false,
      ShowSystemIntegration:false
    };
  },
  components: {
    //   Icon
  },
  directives:{
    clickoutside
  },
  created() {
    this.getUserEnginInfo();
  },
  computed: {
    optionalEnginesCount() {
      let arr = Object.keys(this.OptionalEngines);
      return arr.length;
    },
    showProfilePhoto() {
      let url = this.CurUser.ProfilePhotoUrl + "";
      if (url && url.length > 10) {
        return true;
      }
      return false;
    },
    HandleName() {
      let name = this.CurUser.Name;
      if (name.length > 2) {
        name = name.substring(name.length - 2, name.length);
      }
      return name;
    }
  },
  methods: {
    async getUserEnginInfo() {
      //获取用户和引擎信息
      let data = await GetUserInfo();
      if (data.Successful) {
        this.CurUser = data.ReturnData.CurUser;
        this.CurEngineCode = data.ReturnData.EngineCode;
        this.OptionalEngines = data.ReturnData.OptionalEngines;
        this.ShowSystemIntegration = data.ReturnData.ShowSystemIntegration;
      }
    },
    goHelp() {},
    toggleEngine(engineCode) {
      document.cookie = "EngineCode=" + engineCode + ";path=/";
      window.location.href = "/Login/Index?enginecode=" + engineCode;
    },
    handleClose(){
        this.ShowEngineOptions=false;
    },
    returnToFront(){
        window.location.href='/';
    },
  }
};
</script>

<style lang="less">
.top-nav{
    .top-nav-box{
        position:fixed;
        top:0;
        width:100%;
        background-color:#090723;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.25);
        z-index: 999;
        height: 55px;
        line-height: 55px;
        
        div.module-link {
            margin-left: 100px;
            display:inline-block;
            ul li{
                font-size: 14px;
                color: #b9bfbf;
                font-weight: bold;
                &.active {
                    color: #fff;

                }
            }
        }
        ul {
            display: inline;
            list-style: none;
            margin: 0px;
            padding: 0px;

            li {
                display: inline-block;
                margin: 0px;
                font-size: 14px;

                a {
                    display: block;
                    width: 100px;
                    height: 53px;
                    line-height: 53px;
                    text-decoration: none;
                    font-size: 14px;
                    color: #B9B9BF;
                    text-align: center;
                }

                &.active a {
                    color: #FFFFFF;
                    border-bottom: 3px solid #EFEFF4;
                }
            }

            li.active {
                // border-bottom: 2px solid #EFEFF4;
            }
        }
        img {
            height : 35px;
            vertical-align: middle;
            // margin-left : 20px;
            cursor : pointer;
            margin-top: -2px;
        }
        .right-tabs {
            position: absolute;
            right: 0;
            top: 0;
            height: 56px;
            line-height: 56px;
            margin: 0px;
            padding: 0px;
            text-align: center;

            li {
                float: left;
                margin-top: 17px;
                margin-right: 20px;

                a {
                    width: 22px;
                    height: 22px;
                    line-height: 22px;
                    font-size: 12px;
                }

                &.back-font-button a{
                    border: 1px solid #979797;
                    font-size: 12px;
                    font-weight: normal;
                    // vertical-align: middle;
                    width: 90px;
                    height: 24px;
                    line-height: 24px;
                    border-radius: 2px;
                    height: auto;
                    margin-top: -2px;
                }

                &.help a {
                    width: 46px;
                    font-size: 14px;
                    i{
                        font-size: 16px;
                        vertical-align: baseline;
                    }
                    span{
                        // margin-left: 10px;
                    }
                }
            }

            li + li {
                padding-left: 20px;
                border-left: 1px solid #979797;
            }
        }
    }
    li.vertical-divider {
        margin: 0 0 -6px 0 !important;
        height: 22px;
        line-height: 22px;
        border-left: 1px solid #979797;
        font-size: 0;
    }
    .optionengines {
        position: fixed;
        top: 58px;
        right: 2px;
        width: 180px;
        max-height: 400px;
        padding-top: 10px;
        padding-bottom: 10px;
        border: 0;
        border-radius: 3px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.22);
        overflow-y: auto;
        background-color: #fff;
        z-index: 9999;

        &:before {
            content: '';
            position: fixed;
            display: inline-block;
            top: 45px;
            right: 20px;
            width: 0;
            height: 0;
            border: 7px solid #561616;
            border-color: transparent transparent #fff;
        }

        ul {
            margin-left: -40px;

            li {
                width: 180px;
                height: 30px;
                line-height: 30px;
                margin: 0;
                padding: 0;
                border: 0;
                text-align: center;
                font-size: 14px;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                list-style: none;
                border-left: none !important;
                margin-top: 0 !important;
                height: 30px !important;
                line-height: 30px !important;

                &:hover {
                    color: #2d7fff;
                    background-color: #e5f5fe;
                    cursor: pointer;
                }

                &.divider{
                    height: 17px !important;
                }
                &.divider:hover {
                    background-color: #ffffff;
                }

                &.isCurEngine {
                    color: #2d7fff;
                    margin-right: 0;
                    border-bottom: 1px solid #e1e1e1;
                }
            }
        }
    }
}
</style>





// WEBPACK FOOTER //
// src/components/back-index/m-header.vue