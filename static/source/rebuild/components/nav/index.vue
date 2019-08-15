<template>
  <div>
    <div class="place" :style="{ display }"></div>
    <div
      class="custom-main-header"
      :style="{ background: 'rgba(30,30,40,' + opacity + ')' }"
    >
      <div class="custom-main-logo" style="float:left">
        <router-link to="/home">
          <img
            :onerror="errorImg01"
            :src="$store.state.nav.logoImg"
            height="50"
          />
        </router-link>
      </div>
      <div class="custom-header-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="(item, index) in currentPath"
            :key="index"
            :to="item.path"
          >
            {{ itemTitle(item) }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="custom-header-menu">
        <div class="custom-header-menu-item" @click="gotoMyWork">
          <span class="iconfont iconjilu blue"></span>
          <span class="custom-title">我的工作</span>
        </div>
        <div class="custom-header-menu-item" @click="gotoDocumentLib">
          <span class="iconfont iconwendang blue"></span>
          <span class="custom-title">文件库</span>
        </div>
        <div class="custom-header-menu-item">
          <span
            @click="
              toApp(
                $store.state.nav.appData[0].id,
                $store.state.nav.appData[0].moduleName
              )
            "
            class="custom-btn"
            v-if="$store.state.nav.appData.length === 1"
          >
            <span class="iconfont iconquanbu blue"></span>
            <span class="custom-title">应用</span>
          </span>
          <el-popover
            v-else
            placement="bottom"
            v-model="popoverShow"
            width="300"
            :offset="30"
            popper-class="home-popover"
          >
            <span slot="reference" @click="getModuleList()" class="custom-btn">
              <span class="iconfont iconquanbu blue"></span>
              <span class="custom-title">应用</span>
            </span>
            <div
              class="applist"
              style="max-height:310px;overflow:scroll;padding:30px 10px"
            >
              <el-row justify="start">
                <el-col
                  :span="8"
                  v-for="item in $store.state.nav.appData"
                  :key="item.id"
                >
                  <div
                    class="icons-item"
                    @click="toApp(item.id, item.moduleName)"
                  >
                    <svg
                      class="icon"
                      style="width: 3em; height: 3em;"
                      aria-hidden="true"
                      v-html="item.icon"
                    >
                      {{ item.icon }}
                    </svg>
                    <p
                      style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;line-height:30px;"
                    >
                      {{ item.moduleName }}
                    </p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-popover>
        </div>
        <div
          class="custom-header-menu-item custom-header-menu-item-right"
          @click="gotoPersonalInformation"
        >
          <span class="iconfont iconL-gerenyonghu2 blue"></span>
          <span class="custom-title">个人信息</span>
        </div>
        <div
          v-hasPer="['index:setting']"
          class="custom-header-menu-item"
          @click="goAppManager"
        >
          <span class="iconfont iconLgongzuo blue"></span>
          <span class="custom-title">应用管理</span>
        </div>
        <div
          v-hasPer="['index:setting']"
          class="custom-header-menu-item"
          @click="gotoPage"
        >
          <span class="iconfont iconLtongxunlu blue"></span>
          <span class="custom-title">组织管理</span>
        </div>
        <div
          v-hasPer="['index:setting']"
          class="custom-header-menu-item custom-header-menu-item-right"
        >
          <el-dropdown trigger="click" @command="goSystem" placement="bottom">
            <span class="el-dropdown-link" style="color:#fff">
              <span class="iconfont iconLshezhi blue"></span>
              <span class="custom-title">系统管理</span>
              <span
                class="iconfont iconxia"
                style="font-size:8px;line-height: 28px;"
              ></span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="ownspace_index">
                企业信息
              </el-dropdown-item>
              <el-dropdown-item command="file-setup">
                档案设置
              </el-dropdown-item>
              <el-dropdown-item command="monitor">
                监控中心
              </el-dropdown-item>
              <el-dropdown-item command="log-manage">
                日志管理
              </el-dropdown-item>
              <el-dropdown-item command="home-setting">
                首页配置
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-if="!isInDingTalk" class="custom-header-menu-item">
          <el-dropdown trigger="click" @command="goSystem" placement="bottom">
            <span class="el-dropdown-link" style="color:#fff">
              <img
                :onerror="defaultImg"
                :src="$store.state.nav.user.photo"
                class="custom-title"
                style="width:20px;height:20px;border-radius:50%;margin-right:5px;margin-top:3px"
              />
              <span class="custom-title">
                {{ $store.state.nav.user.userName }}
              </span>
              <span
                class="iconfont iconxia"
                style="font-size:8px;line-height: 28px;"
              ></span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="login">
                <span class="iconfont icontuichu blue"></span> 退出系统
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HTTP_APPLY from '@/rebuild/api/app-apply.js'
import HTTP_FLOW from '@/rebuild/api/work-flow.js'
import HTTP_USER from '@/rebuild/api/user.js'
import axios from 'axios'
export default {
  props: {
    opacity: {
      type: String,
      default: '1'
    },
    display: {
      type: String,
      default: 'block'
    }
  },
  data() {
    return {
      errorImg01: 'this.src="' + require('./logo1.png') + '"',
      defaultImg: 'this.src="' + require('../../views/home/default.jpg') + '"',
      appListShow: false,
      popoverShow: false
    }
  },
  computed: {
    currentPath() {
      var titleList = []
      this.$store.state.app.currentPath.forEach(data => {
        if (data.title && data.title !== '') {
          titleList.push(data)
        }
      })
      return titleList // 当前面包屑数组
    },
    isInDingTalk() {
      return this.$store.state.app.isInDingTalk
    }
  },
  methods: {
    itemTitle(item) {
      if (typeof item.title === 'object') {
        return this.$t(item.title.i18n)
      } else {
        return item.title
      }
    },
    gotoMyWork() {
      this.$router.push({
        name: 'my-work'
      })
    },
    gotoDocumentLib() {
      this.$router.push({
        name: 'document-lib'
      })
    },
    gotoPersonalInformation() {
      this.$router.push({
        name: 'personal_information'
      })
    },
    goAppManager() {
      this.$router.push({
        name: 'workflow-design'
      })
    },
    gotoPage() {
      this.$router.push({
        name: 'people-manage'
      })
    },
    toApp(itemId, itemName) {
      var currentPath = [
        {
          title: '首页',
          path: 'home',
          name: 'home_index'
        },
        {
          title: itemName,
          path: '',
          name: 'app-list'
        }
      ]
      this.$store.commit('setCurrentPath', currentPath)
      this.$router.push({
        name: 'app-list',
        query: {
          moduleId: itemId,
          title: itemName //用来给面包屑获取页面名称
        }
      })
      this.popoverShow = false
    },
    getModuleList(showAppList = true) {
      if (showAppList) {
        this.appListShow = true
      }
      HTTP_APPLY.getAllModule({ requestSource: 1 })
        .then(res => {
          if (res.code === '0') {
            var appData = res.page.result
            for (var index in appData) {
              appData[index].icon =
                '<use xlink:href=' + appData[index].icon + '></use>'
            }
            this.$store.commit('nav/setAppData', appData)
          } else {
            this.$message.error(res.msg)
          }
        })
        .finally(() => {})
    },
    goSystem(name) {
      if (name === 'login') {
        if (window.isExpAccount) {
          this.$message.error('体验账号无法退出')
          return
        } else {
          fetch('http://10.142.232.120:9101/logout', {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          }).then(() => {
            this.$store.dispatch('user/setPermissionsObj', {})
            fetch('http://10.142.232.120:9101/ctg-workflow/company/isMulti')
              .then(res => {
                return res.json()
              })
              .then(data => {
                window.location.href = data.loginUrl
              })
          })
          return
        }
      }
      this.$router.push({
        name: name
      })
    }
  },
  created() {
    if (!this.$store.state.nav.isGetAppData) {
      this.getModuleList(false)
    }
    var currentPath = []
    if (this.$route.name === 'home_index') {
      currentPath = [
        {
          title: '首页',
          path: 'home',
          name: 'home_index'
        }
      ]
    } else if (this.$route.name === 'app-list') {
      currentPath = [
        {
          title: '首页',
          path: 'home',
          name: 'home_index'
        },
        {
          title: this.$route.query.title,
          path: '',
          name: 'app-list'
        }
      ]
    } else {
      this.$router.options.routes.forEach(item => {
        if (item.children && item.children.length) {
          item.children.forEach(ite => {
            if (ite.name === this.$route.name) {
              currentPath = [
                {
                  title: '首页',
                  path: 'home',
                  name: 'home_index'
                },
                {
                  title: ite.title,
                  path: ite.path,
                  name: ite.name
                }
              ]
            }
          })
        } else {
          if (item.name === this.$route.name) {
            currentPath = [
              {
                title: '首页',
                path: 'home',
                name: 'home_index'
              },
              {
                title: item.title,
                path: item.path,
                name: item.name
              }
            ]
          }
        }
      })
    }
    this.$store.commit('setCurrentPath', currentPath)

    if (!this.$store.state.nav.isGetLogoImg) {
      HTTP_FLOW.companyDetail({
        companyId: this.$store.state.user.companyId
      }).then(res => {
        if (res.code === '0') {
          if (res.company && res.company.logoDownId) {
            var img =
              `${axios.defaults.baseURL}/Form/downloadFile/` +
              res.company.logoDownId
            this.$store.commit('nav/setLogoImg', img)
          } else {
            this.$store.commit('nav/setLogoImg', '')
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    }

    if (!this.$store.state.nav.isGetUser) {
      HTTP_USER.detail().then(res => {
        if (res.code === '0') {
          var params = {
            photo: res.user.photo,
            userName: res.user.userName
          }
          this.$store.commit('nav/setUser', params)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$height: 50px;

.iconfont {
  font-size: 16px;
}
.place {
  height: $height;
}
.blue {
  color: #327dff;
}
.custom-main-header {
  position: fixed;
  height: $height;
  top: 0;
  width: 100%;
  z-index: 1;
  .custom-main-logo {
    float: left;
    img {
      width: auto;
      max-width: 350px;
      padding: 5px;
    }
  }
  .custom-header-breadcrumb {
    float: left;
    margin-left: 20px;
    margin-top: 14px;
  }
  .custom-header-menu {
    position: absolute;
    right: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    height: 22px;
    .custom-header-menu-item {
      float: left;
      padding-right: 20px;
      color: #fff;
      cursor: pointer;
      .custom-title,
      .iconfont {
        margin-left: 4px;
        float: left;
        line-height: 24px;
      }
    }
    .custom-header-menu-item-right {
      border-right: 1px solid #3c3c46;
      margin-right: 20px;
    }
  }
}
.icons-item {
  margin: 0 0 15px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  color: #5c6b77;
}
.icons-item:hover {
  cursor: pointer;
  background-color: #f8f8f8;
}
.icons-item i {
  font-size: 30px;
}

.icons-item span {
  display: block;
}
.icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin: 0 auto;
}
</style>
<style lang="scss">
.home-popover {
  margin-top: 35px !important;
  padding: 0;
  .popper__arrow {
    left: 50% !important;
  }
}
.custom-header-breadcrumb {
  .el-breadcrumb__inner {
    color: #787878;
  }
  .el-breadcrumb__item:last-child {
    .el-breadcrumb__inner {
      color: #fff;
    }
  }
}
</style>
