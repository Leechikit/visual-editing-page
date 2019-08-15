<template>
  <div
    style="overflow:scroll;width:100%;height:100%;background-color: #F5F5F5;"
  >
    <Nav :opacity="'0.5'" :display="'none'" />
    <div
      class="my-img"
      :style="{ backgroundImage: homeBG }"
      style="height:300px"
    >
      <el-row class="user-infor" type="flex" align="middle">
        <el-col :span="10">
          <el-row>
            <el-col :span="5" :offset="5">
              <img
                style="width:80px;height:80px;border-radius:50%;padding: 4px;background: #fff;"
                :onerror="defaultImg"
                :src="photo"
              />
            </el-col>
            <el-col :span="14">
              <div style="line-height:50px">
                <p style="color:#fff;font-size:20px;line-height:44px">
                  {{ currentTime }}{{ userName }}
                </p>
                <p style="color:#fff;font-size:14px">
                  做任何一件事都要有始有终,坚持把它做完
                </p>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="14" align="middle">
          <div class="app-list-box">
            <div
              v-for="(item, index) in showWorkApp"
              :key="index"
              class="app-list"
              @click="toTaskMyWork(item.task)"
            >
              <CountTo :endVal="item.num"> </CountTo>
              <p class="name">{{ item.name }}</p>
              <div class="icon-box">
                <span class="iconfont" :class="item.class"></span>
              </div>
              <div v-if="index === showWorkApp.length - 1" class="app-btn">
                <el-button
                  type="primary"
                  size="mini"
                  @click.stop="showQuickModel"
                  >编辑</el-button
                >
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="main-panel">
      <div v-if="reTable1" class="person-count">
        <infor-card
          id-name="user_created_count"
          iconType="android-person-add"
          color="#FFF"
          :data="reTable1.data[0]"
          :countSize="fontSize"
        ></infor-card>
      </div>
      <div class="person-count" v-if="reTable2 || reTable3">
        <div v-if="reTable2" class="reTable2">
          <infor-card
            id-name="user_created_count"
            iconType="android-person-add"
            color="#FFF"
            :data="reTable2.data[0]"
            :countSize="fontSize"
          ></infor-card>
        </div>
        <div v-if="reTable3" class="reTable3">
          <infor-card
            id-name="user_created_count"
            iconType="android-person-add"
            color="#FFF"
            :data="reTable3.data[0]"
            :countSize="fontSize"
          ></infor-card>
        </div>
      </div>
      <div class="echart-count" v-if="linePic || barPic">
        <div class="echart-count-count" v-if="linePic">
          <div class="echart-title">
            <span class="iconfont iconLbiaojixiangqing"></span>
            <span class="infor-intro-mainText">{{ linePic.data[0].text }}</span>
          </div>
          <div class="echart-main">
            <EchartsBar :data="linePic.data[0]" />
          </div>
        </div>
        <div class="echart-count-count" v-if="barPic">
          <div class="echart-title">
            <span class="iconfont iconLbiaojixiangqing"></span>
            <span class="infor-intro-mainText">{{ barPic.data[0].text }}</span>
          </div>
          <div class="echart-main">
            <EchartsBarTs :data="barPic.data[0]" />
          </div>
        </div>
      </div>
      <div class="app-notice">
        <div class="fast-entry-app">
          <div class="text-title">
            <span class="iconfont iconLbiaojixiangqing"></span> {{ shortcut }}
            <!-- <div class="btn-box">
              <div
                class="btn1"
                :class="{ active: shortcut === '常用应用' }"
                @click="changeShortcut('常用应用')"
              >
                常用
              </div>
              <div
                class="btn1"
                :class="{ active: shortcut === '我的收藏' }"
                @click="changeShortcut('我的收藏')"
              >
                收藏
              </div>
            </div> -->
          </div>
          <div class="custom-app" v-loading="customAppLoading">
            <div
              v-for="(item, index) in appData"
              :key="index"
              class="custom-app-show"
              @click="showApp(item.moduleId, item.id)"
            >
              <p class="custom-app-info-icon">
                <svg
                  class="icon-recent"
                  aria-hidden="true"
                  v-html="item.icon"
                  v-if="shortcut === '常用应用'"
                >
                  {{ item.icon }}
                </svg>
                <svg class="icon icon-recent" aria-hidden="true" v-else>
                  <use :xlink:href="item.appIcon"></use>
                </svg>
              </p>
              <p class="app-name">
                {{ shortcut === '我的收藏' ? item.displayName : item.appName }}
              </p>
              <div v-if="shortcut === '我的收藏'" class="button-list">
                <div class="button" @click.stop="modifyApp(item)">
                  <span class="iconfont iconLshezhi"></span>
                </div>
                <div class="button" @click.stop="deleteApp(item)">
                  <span class="iconfont iconLshanchu"></span>
                </div>
              </div>
            </div>
            <div
              v-if="shortcut === '我的收藏' && appData.length != 12"
              class="custom-app-show add-custom-app"
              shadow="hover"
              @click="addApp"
            >
              <span class="iconfont iconzengjia"></span>
            </div>
          </div>
        </div>
        <div class="news-bulletin">
          <div class="text-title">
            <span class="iconfont iconLbiaojixiangqing"></span> 公告
          </div>
          <div class="noeNews" v-if="!noticeLoading && !noticeList.length">
            暂无公告
          </div>
          <div
            class="news-main"
            v-loading="noticeLoading"
            v-if="noticeList.length"
            v-infinite-scroll="getListNotices"
            :infinite-scroll-disabled="
              noticeTotal === noticeList.length || getNoticeLoading
            "
          >
            <div
              class="notice-list"
              v-for="(item, index) in noticeList"
              :key="index"
              @click="showNoticeList(index)"
            >
              <div class="head">
                <span class="iconfont iconriqi"></span>
                <div class="title" :title="item.title">{{ item.title }}</div>
                <div class="time">{{ item.updateTime }}</div>
              </div>
              <div class="content">
                {{ item.content }}
              </div>
            </div>
            <p v-if="getNoticeLoading" style="text-align:center">加载中...</p>
            <p
              v-if="noticeTotal === noticeList.length"
              style="text-align:center"
            >
              没有更多了
            </p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title="popupData.title"
      :visible.sync="popupVisible"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      width="470px"
    >
      <el-form :model="popupData" label-width="80px" label-position="right">
        <el-form-item>
          <div class="form-item-title" slot="label">收藏应用</div>
          <div class="form-item-value">
            <appCollect
              :appId="popupData.appId"
              :appName="popupData.appName"
              @select="selectApp"
            ></appCollect>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="form-item-title" slot="label">显示名称</div>
          <div class="form-item-value">
            <el-input
              size="small"
              v-model="popupData.displayName"
              placeholder="请输入名称"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="form-item-title" slot="label">收藏图标</div>
          <div class="form-item-value">
            <appIcon
              :appIcon="popupData.appIcon"
              @select="selectIcon"
            ></appIcon>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="popupVisible = false" class="popup-confirm"
          >取 消</el-button
        >
        <el-button
          type="primary"
          class="popup-confirm"
          :loading="popupConfirm_loading"
          @click="popupConfirm"
          >{{
            this.popupData.title === '添加收藏' ? '添加' : '保存'
          }}</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="快捷应用"
      :visible.sync="quickModel"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      width="620px"
    >
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="entranceCheckAll"
        @change="entranceCheckAllChange"
        >全选</el-checkbox
      >
      <el-checkbox-group v-model="checkedEntrance">
        <el-checkbox
          v-for="entrance in entrances"
          :label="entrance"
          :key="entrance"
          >{{ entrance }}</el-checkbox
        >
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quickModel = false">取 消</el-button>
        <el-button
          type="primary"
          @click="changeEntrance"
          :loading="quickModel_loading"
          >保 存</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="公告内容"
      :visible.sync="showNoticeMain"
      width="500px"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <div class="notice-main" v-if="showNoticeMain">
        <div class="head" :title="noticeList[showNoticeListIndex].title">
          <div class="title">{{ noticeList[showNoticeListIndex].title }}</div>
          <div class="time">
            发布于 {{ noticeList[showNoticeListIndex].updateTime }}
          </div>
        </div>
        <div class="content">
          {{ noticeList[showNoticeListIndex].content }}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showNoticeMain = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>
    <CompanySelect
      :visible="companySelectVisible"
      @close="companySelectCloseHandle"
    ></CompanySelect>
  </div>
</template>

<script>
import HTTP_HOME from '@/rebuild/api/home.js'
import HTTP_USER from '@/rebuild/api/user.js'
import HTTP_APPLY from '@/rebuild/api/app-apply.js'
import axios from 'axios'
import Nav from '@/rebuild/components/nav/index'
import inforCard from './components/infor-card'
import CountTo from './components/CountTo'
import EchartsBar from './components/EchartsBar'
import EchartsBarTs from './components/EchartsBarTs'
import appCollect from './components/app-collect'
import appIcon from '@/rebuild/components/appIcon'
import CompanySelect from './components/company-select'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      homeBG: '',
      defaultImg: 'this.src="' + require('./default.jpg') + '"',
      photo: '',
      currentTime: '',
      userName: Cookies.get('userName'),
      allWorkApp: [],
      showWorkApp: [],
      reTable1: null,
      reTable2: null,
      reTable3: null,
      linePic: null,
      barPic: null,
      fontSize: '24px',
      shortcut: '常用应用',
      appData: [],
      iconList: [
        '#icon-renshishenqing',
        '#icon-diannaoguzhang',
        '#icon-buqian',
        '#icon-fukuanshenqing',
        '#icon-jiaotongbaoxiao',
        '#icon-jiekuanshenqing',
        '#icon-xiujia',
        '#icon-ITshenqing',
        '#icon-jiaban',
        '#icon-nan',
        '#icon-youxiangmimagenggai',
        '#icon-nv'
      ],
      customAppLoading: true,
      popupVisible: false,
      popupData: {
        // 弹窗数据内容
        title: '',
        id: '', // 收藏id
        appId: '',
        appName: '',
        displayName: '',
        appIcon: '',
        appIndex: 0,
        isAddMode: false // 当前是否为添加收藏弹窗
      },
      defaultAppData: {
        // 初始app
        id: '',
        appId: '',
        appName: '',
        appIcon: ''
      },
      labelPosition: 'right',
      popupConfirm_loading: false,
      quickModel: false,
      entrances: [
        '待办事项',
        '审批事项',
        '抄送审批',
        '其他',
        '已发起',
        '已办理'
      ],
      checkedEntrance: [],
      entranceCheckAll: false,
      isIndeterminate: false,
      quickModel_loading: false,
      noticeLoading: true,
      noticeList: [],
      noticePageNum: 0,
      noticeTotal: null,
      showNoticeMain: false,
      showNoticeListIndex: 0,
      getNoticeLoading: false,
      companySelectVisible: false
    }
  },
  components: {
    Nav,
    inforCard,
    CountTo,
    EchartsBar,
    EchartsBarTs,
    appCollect,
    appIcon,
    CompanySelect
  },
  watch: {
    checkedEntrance() {
      if (this.checkedEntrance.length === 0) {
        this.entranceCheckAll = false
        this.isIndeterminate = false
      } else if (this.checkedEntrance.length === this.entrances.length) {
        this.entranceCheckAll = true
        this.isIndeterminate = false
      } else {
        this.entranceCheckAll = false
        this.isIndeterminate = true
      }
    }
  },
  beforeRouteEnter: (to, from, next) => {
    if (to.query.from === 'eadp' && Cookies.get('companyVisible') === void 0) {
      Cookies.set('companyVisible', true)
    }
    if (Cookies.get('companyVisible') === 'true') {
      next(vm => {
        vm.companySelectVisible = true
      })
    } else {
      next()
    }
  },
  methods: {
    goTwoPlace(num) {
      return num > 9 ? '' + num : '0' + num
    },
    toTaskMyWork(type) {
      this.$router.push({
        name: 'my-work',
        query: { type: type }
      })
    },
    changeShortcut(name) {
      // 数据没请回来之前不能重复点击
      if (this.customAppLoading) {
        this.$message({
          message: '请不要频繁点击',
          type: 'warning'
        })
        return
      }
      this.customAppLoading = true
      this.shortcut = name
      if (name === '常用应用') {
        this.getAllApp()
      } else {
        this.getCollectionApp()
      }
    },
    showApp(moduleId, appId) {
      if (moduleId) {
        this.$router.push({
          name: 'app-list',
          query: { moduleId, appId }
        })
      }
    },
    getAllApp() {
      HTTP_APPLY.getAllApp()
        .then(res => {
          if (res.code !== '0') {
            this.$message.error(res.msg)
            return
          }
          this.appData = res.page.result
          this.appData.forEach((item, index) => {
            item.icon = `<use xlink:href="${this.iconList[index]}"></use>`
          })
        })
        .finally(() => {
          this.customAppLoading = false
        })
    },
    getCollectionApp() {
      HTTP_APPLY.getList()
        .then(res => {
          if (res.code !== '0') {
            this.$message.error(res.msg)
            return
          }
          this.appData = res.collectList
          this.appData.forEach((item, index) => {
            item.icon = `<use xlink:href="${this.iconList[index]}"></use>`
          })
        })
        .finally(() => {
          this.customAppLoading = false
        })
    },
    modifyApp(app) {
      this.setPopupData(app)
      this.popupVisible = true
    },
    setPopupData({ id, appId, appName, displayName, appIcon, appIndex } = {}) {
      if (appId === void 0) {
        const { id, appId, appName, displayName } = this.defaultAppData
        this.popupData.title = '添加收藏'
        this.popupData.id = id
        this.popupData.appId = appId
        this.popupData.appName = appName
        this.popupData.displayName = displayName
        this.popupData.appIcon = '#icon-add'
        this.popupData.isAddMode = true
      } else {
        this.popupData.title = '修改收藏'
        this.popupData.id = id
        this.popupData.appId = appId
        this.popupData.appName = appName
        this.popupData.displayName = displayName
        this.popupData.appIcon = appIcon
        this.popupData.appIndex = appIndex
        this.popupData.isAddMode = false
      }
    },
    selectApp(app) {
      this.popupData.appId = app.appId
      this.popupData.appName = app.appName
      this.popupData.displayName = app.appName
    },
    selectIcon(app) {
      this.popupData.appIcon = app.appIcon
    },
    // 弹窗确认按钮
    async popupConfirm() {
      const { id, appId, appName, displayName, appIcon } = this.popupData
      const result = this.validate({ appId })
      if (!result.code) {
        this.$message.error(result.msg)
      } else {
        try {
          this.popupConfirm_loading = true
          let res = await HTTP_HOME.save({
            id,
            appId,
            appName,
            displayName,
            appIcon
          })
          if (res.code === '0') {
            this.getCollectionApp()
            this.popupVisible = false
          } else {
            this.$message.error(res.msg)
          }
          this.popupConfirm_loading = false
        } catch (error) {
          this.popupConfirm_loading = false
        }
      }
    },
    // 校验
    validate({ appId }) {
      let result = {
        msg: '校验通过',
        code: true
      }
      if (appId === '') {
        result.msg = '请选择应用'
        result.code = false
      }
      return result
    },
    addApp() {
      this.setPopupData()
      this.popupVisible = true
    },
    deleteApp(app) {
      const { id: userCollectId } = app
      this.$confirm('是否确定删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          HTTP_HOME.delete({ userCollectId }).then(res => {
            if (res.code === '0') {
              this.getCollectionApp()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async getHomeConfiguration() {
      try {
        const companyId = this.$store.state.user.companyId
        const result = await HTTP_HOME.getHomeConfiguration({ companyId })
        if (result.code === '0') {
          if (result.homeConfiguration === '2') {
            this.shortcut = '我的收藏'
            this.getCollectionApp()
          } else {
            this.shortcut = '常用应用'
            this.getAllApp()
          }
        } else {
          this.$message.error(result.msg)
        }
      } catch (eror) {
        this.$message.error(eror.msg)
      }
    },
    showQuickModel() {
      this.quickModel = true
      this.checkedEntrance = this.showWorkApp.map(item => item.name)
    },
    entranceCheckAllChange(val) {
      this.checkedEntrance = val ? this.entrances : []
    },
    changeEntrance() {
      this.quickModel_loading = true
      var code = this.allWorkApp
        .filter(item => this.checkedEntrance.indexOf(item.name) >= 0)
        .map(item => item.code)
        .join(';')
      if (!code) {
        this.$message.error('至少选择一项')
        this.quickModel_loading = false
        return
      }
      var params = {
        upcomingConfiguration: code,
        companyId: this.$store.state.user.companyId
      }
      HTTP_HOME.updateUpcomingConfiguration(params)
        .then(res => {
          if (res.code === '0') {
            this.showWorkApp = this.allWorkApp.filter(
              item => code.indexOf(item.code) >= 0
            )
            this.$message.success('保存成功')
            this.quickModel = false
          } else {
            this.$message.error(res.msg)
          }
        })
        .finally(() => {
          this.quickModel_loading = false
        })
    },
    getListNotices() {
      this.noticePageNum++
      this.getNoticeLoading = true
      HTTP_HOME.getListNotices({
        companyId: this.$store.state.user.companyId,
        pageSize: 4,
        pageNum: this.noticePageNum
      })
        .then(res => {
          if (res.code === '0') {
            res.page.result.forEach(item => {
              var M = new Date(item.updateTime).getMonth() + 1
              var d = new Date(item.updateTime).getDate()
              var h = new Date(item.updateTime).getHours()
              var m = new Date(item.updateTime).getMinutes()
              item.updateTime =
                this.goTwoPlace(M) +
                '-' +
                this.goTwoPlace(d) +
                ' ' +
                this.goTwoPlace(h) +
                ':' +
                this.goTwoPlace(m)
            })
            this.noticeList = [...this.noticeList, ...res.page.result]
            this.noticeTotal = res.page.total
          } else {
            this.$message(res.msg)
          }
        })
        .finally(() => {
          this.noticeLoading = false
          this.getNoticeLoading = false
        })
    },
    showNoticeList(index) {
      this.showNoticeMain = true
      this.showNoticeListIndex = index
    },
    // 企业选择关闭回调
    companySelectCloseHandle() {
      this.companySelectVisible = false
      Cookies.set('companyVisible', false)
    }
  },
  created() {
    this.getHomeConfiguration()

    HTTP_HOME.getHomePicture({
      companyId: this.$store.state.user.companyId
    }).then(res => {
      if (!res.homePicture) {
        this.homeBG = 'url(' + require('./index_bg.png') + ')'
      } else {
        this.homeBG = `url(${axios.defaults.baseURL}/Form/downloadFile/${res.homePicture})`
      }
    })

    HTTP_USER.detail().then(res => {
      if (res.code === '0') {
        if (res.user.photo) {
          this.photo = res.user.photo
        }
      } else {
        this.$message.error(res.msg)
      }
    })

    var now = new Date(),
      hour = now.getHours()
    if (hour < 6) {
      this.currentTime = '凌晨好！'
    } else if (hour < 9) {
      this.currentTime = '早上好！'
    } else if (hour < 12) {
      this.currentTime = '上午好！'
    } else if (hour < 14) {
      this.currentTime = '中午好！'
    } else if (hour < 18) {
      this.currentTime = '下午好！'
    } else {
      this.currentTime = '晚上好！'
    }

    HTTP_APPLY.myUpcomingCount().then(data => {
      if (data.code === '0') {
        this.allWorkApp = [
          {
            task: '4',
            name: '待办事项',
            num: data.fillTaskCount,
            class: 'iconLbiaojixiangqing',
            code: '1'
          },
          {
            task: '2',
            name: '审批事项',
            num: data.toVerifyTaskCount,
            class: 'iconriqi',
            code: '2'
          },
          {
            task: '3',
            name: '抄送审批',
            num: data.ccTaskCount,
            class: 'iconLbiaojixiangqing',
            code: '3'
          },
          {
            task: '5',
            name: '其他',
            num: data.otherTaskCount,
            class: 'iconriqi',
            code: '4'
          },
          {
            task: '6',
            name: '已发起',
            num: data.submitTaskCount,
            class: 'iconLbiaojixiangqing',
            code: '5'
          },
          {
            task: '7',
            name: '已办理',
            num: data.doneTaskCount,
            class: 'iconriqi',
            code: '6'
          }
        ]
        HTTP_HOME.getUpcomingConfigurationUser({
          companyId: this.$store.state.user.companyId
        }).then(data => {
          var code = []
          if (data.UpcomingConfiguration) {
            code = data.UpcomingConfiguration.split(';')
          } else {
            code = ['1', '2']
          }
          this.showWorkApp = this.allWorkApp.filter(
            item => code.indexOf(item.code) >= 0
          )
          this.checkedEntrance = this.allWorkApp
            .filter(item => code.indexOf(item.code) >= 0)
            .map(item => item.name)
        })
      } else {
        this.$message.error(data.msg)
      }
    })

    HTTP_APPLY.getDataByIconId().then(data => {
      if (data.code === '0') {
        this.reTable1 = data['1']
        this.reTable2 = data['2']
        this.reTable3 = data['3']
        this.linePic = data['4']
        this.barPic = data['5']
      }
    })

    this.getAllApp()

    this.getListNotices()
  }
}
</script>

<style lang="scss" scoped>
$min-width: 1200px;

.iconfont {
  font-size: 16px;
}
.popup-confirm {
  width: 80px;
  height: 36px;
  line-height: 36px;
  padding: 0;
  font-size: 14px;
  span {
    font-size: 14px;
  }
}
.form-item-title {
  line-height: 32px;
  color: #787878;
  font-size: 14px;
}
.form-item-value {
  width: 230px;
  padding-left: 10px;
}
.my-img {
  min-width: $min-width;
  background-color: #111;
  background-size: 100% 100%;
  position: relative;
}
.user-infor {
  padding-top: 50px;
  height: 100%;
}
.app-list-box {
  display: flex;
  justify-content: flex-end;
  width: 600px;
  margin: 0 auto;
  text-align: center;
  .app-list {
    float: left;
    width: 90px;
    height: 110px;
    border-radius: 4px;
    background: rgba(30, 30, 40, 0.8);
    position: relative;
    margin-left: 10px;
    cursor: pointer;
    .name {
      color: #b4b4b4;
    }
    .icon-box {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateY(50%) translateX(-50%);
      width: 40px;
      height: 30px;
      line-height: 32px;
      border-radius: 15px;
      background: #327dff;
      span {
        color: #fff;
      }
    }
  }
  .app-btn {
    position: absolute;
    top: -45px;
    right: 18px;
  }
}
.main-panel {
  margin: 0 auto;
  min-width: $min-width;
  padding: 0 5%;
  margin-top: 40px;
  margin-bottom: 100px;
  .person-count {
    width: 100%;
    height: 176px;
    margin-bottom: 20px;
    .reTable2 {
      float: left;
      width: calc((100% - 20px) / 10 * 3);
      margin-right: 20px;
      height: 100%;
    }
    .reTable3 {
      float: left;
      width: calc((100% - 20px) / 10 * 7);
      height: 100%;
    }
  }
  .echart-count {
    width: 100%;
    height: 368px;
    .echart-count-count {
      width: calc((100% - 20px) / 2);
      float: left;
      background: #fff;
      &:hover {
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      }
      &:nth-child(1) {
        margin-right: 20px;
      }
      .echart-title {
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        i,
        span {
          font-size: 16px;
          color: #464646;
        }
        .iconfont {
          color: #327dff;
          float: left;
          font-size: 24px;
          line-height: 60px;
          margin-right: 4px;
        }
        .infor-intro-mainText {
          font-weight: 550;
        }
      }
      .echart-main {
        height: 308px;
      }
    }
  }
  .app-notice {
    height: 272px;
    margin-top: 20px;
    .fast-entry-app {
      float: left;
      background: #fff;
      width: calc(100% - 292px);
      margin-right: 20px;
      &:hover {
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      }
      .text-title {
        position: relative;
        line-height: 60px;
        color: #464646;
        font-size: 16px;
        text-align: left;
        padding-left: 20px;
        .iconfont {
          color: #327dff;
          float: left;
          font-size: 24px;
          line-height: 60px;
          margin-right: 4px;
        }
        .btn-box {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          width: 150px;
          height: 40px;
          border-radius: 20px;
          background: #f0f0f0;
          .btn1 {
            float: left;
            width: 68px;
            text-align: center;
            color: #787878;
            line-height: 30px;
            margin-top: 5px;
            margin-left: 5px;
            cursor: pointer;
          }
          .active {
            background: #327dff;
            border-radius: 15px;
            color: #fff;
          }
        }
      }
      .custom-app {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 30px 12px;
        min-width: 780px;
        .custom-app-show {
          position: relative;
          width: 120px;
          height: 100px;
          text-align: center;
          cursor: pointer;
          margin-right: calc((100% - 720px) / 5);
          &:nth-child(6n) {
            margin-right: 0;
          }
          &:hover {
            background: #f5f5f5;
          }
          .custom-app-info-icon {
            height: 65px;
            padding-top: 15px;
            .icon-recent {
              height: 40px;
              width: 40px;
            }
          }
          .app-name {
            font-size: 14px;
            color: #787878;
          }
          &:hover .app-name {
            color: #464646;
            font-weight: 550;
          }
          .button-list {
            display: none;
            position: absolute;
            width: 30px;
            text-align: center;
            right: 0;
            top: 0;
            color: #787878;
            padding: 5px;
            .button {
              i {
                font-size: 14px;
              }
              &:hover {
                color: #327dfe;
              }
            }
          }
          &:hover .button-list {
            display: block;
          }
        }
        .add-custom-app {
          width: 90px;
          height: 70px;
          text-align: center;
          background: #f5f5f5;
          line-height: 70px;
          margin-left: 15px;
          .iconfont {
            font-size: 32px;
            vertical-align: middle;
          }
        }
      }
    }
    .news-bulletin {
      float: left;
      width: 272px;
      height: 272px;
      background: #fff;
      &:hover {
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      }
      .text-title {
        line-height: 60px;
        color: #464646;
        font-size: 16px;
        text-align: left;
        padding-left: 14px;
        .iconfont {
          color: #327dff;
          float: left;
          font-size: 24px;
          line-height: 60px;
          margin-right: 4px;
        }
      }
      .news-main {
        height: 185px;
        overflow-y: auto;
        .notice-list {
          padding: 10px 0;
          padding-left: 10px;
          cursor: pointer;
          &:hover {
            background: #fafafa;
          }
          .head {
            overflow: hidden;
            .iconfont {
              color: #f7b500;
              float: left;
            }
            .title {
              float: left;
              width: 120px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 24px;
              margin: 0;
              margin-left: 5px;
              font-size: 14px;
              font-weight: 550;
            }
            .time {
              float: right;
              margin-right: 10px;
              font-size: 12px;
              color: #b4b4b4;
            }
          }
          .content {
            font-size: 14px;
            color: #464646;
            text-indent: 22px;
            width: 230px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        // .head {
        //   font-size: 14px;
        //   color: #464646;
        //   font-weight: 550;
        //   line-height: 30px;
        //   padding: 0 14px;
        // }
        // .time {
        //   font-size: 12px;
        //   color: #b4b4b4;
        //   padding: 0 14px;
        //   margin-bottom: 10px;
        // }
        // .content {
        //   font-size: 14px;
        //   color: #464646;
        //   padding: 0 14px;
        // }
      }
      .noeNews {
        font-size: 20px;
        text-align: center;
        line-height: 150px;
      }
      .scroll-icon {
        text-align: center;
        color: #327dff;
      }
    }
  }
}
.notice-main {
  text-align: center;
  .title {
    font-size: 14px;
    font-weight: 550;
    margin: 0;
  }
  .content {
    margin-top: 20px;
    text-align: left;
  }
}
</style>
