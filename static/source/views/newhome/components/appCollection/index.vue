/**
* @name: appCollection
* @description: 应用收藏
* @author: lizijie
* @update:
*/
<template>
  <div class="appCollection">
    <p class="title text-title">我的收藏</p>
    <div class="margin-top-10">
      <Row :gutter="10">
        <Col
          span="6"
          v-for="(app, $index) in list"
          :key="$index"
        >
        <div
          class="app-item"
          @click.stop="gotoApp(app)"
        >
          <div class="background-box">
            <svg
              class="background"
              aria-hidden="true"
            >
              <use :xlink:href="app.appIcon"></use>
            </svg>
            <svg
              class="icon"
              aria-hidden="true"
            >
              <use :xlink:href="app.appIcon"></use>
            </svg>
          </div>
          <div class="content">
            <p
              class="name"
              v-text="app.displayName"
            ></p>
          </div>
          <div class="button-list">
            <div
              class="button"
              @click.stop="modifyApp(app)"
            >
              <Icon type="android-settings"></Icon>
            </div>
            <div
              class="button"
              @click.stop="deleteApp(app)"
            >
              <Icon type="trash-a"></Icon>
            </div>
          </div>
        </div>
        </Col>
        <Col span="6">
        <div
          v-show="list.length < numberLimit"
          class="app-item app-add"
          @click="addApp()"
        >
          <Icon
            type="ios-plus-empty"
            size="80"
          ></Icon>
        </div>
        </Col>
      </Row>
    </div>
    <confirmDelete ref="confirmDelete"></confirmDelete>
    <Modal
      v-model="popupVisible"
      :title="popupData.title"
      @on-cancel="closePopup"
    >
      <Form
        :model="popupData"
        :label-width="80"
      >
        <FormItem label="收藏应用">
          <appCollect
            :appId="popupData.appId"
            :appName="popupData.appName"
            @select="selectApp"
          ></appCollect>
        </FormItem>
        <FormItem label="显示名称">
          <Input
            v-model="popupData.displayName"
            placeholder="请输入名称"
          ></Input>
        </FormItem>
        <FormItem label="收藏图标">
          <appIcon
            :appIcon="popupData.appIcon"
            @select="selectIcon"
          ></appIcon>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          size="large"
          @click="closePopup"
        >取消</Button>
        <Button
          type="primary"
          size="large"
          :loading="modal_loading"
          @click="popupConfirm"
        >{{popupData.title === '添加收藏' ? '添加' : '保存'}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import HTTP_COLLECT from '@/api/collect.js'
import confirmDelete from '@/component/modal/confirm-delete.vue'
import appCollect from './app-collect.vue'
import appIcon from './app-icon.vue'
export default {
  name: 'appCollection',
  components: {
    confirmDelete,
    appCollect,
    appIcon
  },
  data () {
    return {
      list: [],
      popupVisible: false, // 是否显示弹窗
      popupData: { // 弹窗数据内容
        title: '',
        id: '', // 收藏id
        appId: '',
        appName: '',
        displayName: '',
        appIcon: '',
        appIndex: 0,
        isAddMode: false // 当前是否为添加收藏弹窗
      },
      defaultAppData: { // 初始app
        id: '',
        appId: '',
        appName: '',
        appIcon: ''
      },
      modal_loading: false,
      numberLimit: 12 // 数量限制
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        let res = await HTTP_COLLECT.getList()
        if (res.code === '0') {
          this.list = res.collectList
        } else {
          this.$Message.error({
            content: res.msg
          });
        }
      } catch (error) {
        this.$Message.error({
          content: '获取数据失败'
        });
      }
      // this.list = [{"appId":"3100e9eb117341639e9f065d61494176129678395","appName":"测试-数字控件","appIcon":"#icon-yunshuzhongwuliu"},{"appId":"6df7a1e54c894013ac841f9fa7fe49912139996052","appName":"测试修改应用","appIcon":"#icon-daibanshixiang"},{"appId":"f7e37112576a412d8bc947e9c057ecfa218577270","appName":"测试城市控件","appIcon":"#icon-lizhijiaojie"},{"appId":"3e4fb4adf85a4b28b50a4edab65575d32103859849","appName":"表单批量删除测试","appIcon":"#icon-qianshoushenpitongguo-xianxing"},{"appId":"366f1bbf32334f999758730fc06b9d90551461259","appName":"下拉框外接数据源测试","appIcon":"#icon-ITquanxian"},{"appId":"3ec5568e0b9247af8c468f48bfb667f21860723147","appName":"附件测试","appIcon":"#icon-jiaban"}]
    },
    // 调整应用
    gotoApp ({ moduleId, appName, appId, appKey }) {
      if (moduleId) {
        this.$router.push({
          name: 'start-application',
          params: {
            moduleId,
            appName,
            appId,
            appKey
          }
        });
      }
    },
    // 添加收藏应用
    addApp () {
      this.setPopupData()
      this.popupVisible = true
    },
    // 修改应用
    modifyApp (app) {
      this.setPopupData(app)
      this.popupVisible = true
    },
    // 删除应用
    deleteApp (app) {
      const { id: userCollectId } = app
      const that = this
      this.$refs.confirmDelete.showModal({
        callback () {
          return new Promise(async (resolve, reject) => {
            try {
              let res = await HTTP_COLLECT.delete({
                userCollectId
              })
              if (res.code === '0') {
                that.getList()
                return resolve()
              } else {
                return reject(res.msg)
              }
            } catch (error) {
              return reject()
            }
          })
        }
      })
    },
    // 设置弹窗内容
    setPopupData ({ id, appId, appName, displayName, appIcon, appIndex } = {}) {
      if (appId === void 0) {
        const { id, appId, appName, displayName, appIcon } = this.defaultAppData
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
    // 重置弹窗内容
    resetPopupData () {
      this.popupData = {
        title: '',
        appId: '',
        appName: '',
        displayName: '',
        appIcon: this.iconList[0],
        appIndex: ''
      }
    },
    // 关闭弹窗
    closePopup () {
      this.popupVisible = false
    },
    // 弹窗确认按钮
    async popupConfirm () {
      const { id, appId, appName, displayName, appIcon } = this.popupData
      const result = this.validate({ appId })
      if (!result.code) {
        this.$Message.error(result.msg)
      } else {
        try {
          this.modal_loading = true
          let res = await HTTP_COLLECT.save({
            id,
            appId,
            appName,
            displayName,
            appIcon
          })
          if (res.code === '0') {
            this.getList()
            this.closePopup()
          } else {
            this.$Message.error(res.msg)
          }
          this.modal_loading = false
        } catch (error) {
          this.$Message.error(res.msg)
          this.modal_loading = false
        }
      }
    },
    // 校验
    validate ({ appId }) {
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
    // 选择应用
    selectApp (app) {
      this.popupData.appId = app.appId
      this.popupData.appName = app.title
      this.popupData.displayName = app.title
    },
    // 选择图标
    selectIcon (app) {
      this.popupData.appIcon = app.appIcon
    }
  },
}
</script>
<style lang="less" scoped>
.app-item {
  position: relative;
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    box-shadow: 0 1px 5px 0 #666;
    .button-list {
      opacity: 1;
      pointer-events: auto;
      transition: opacity 0.5s ease-in-out;
    }
  }
  .background-box {
    position: relative;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    .background {
      display: block;
      position: absolute;
      top: 0;
      left: 50%;
      width: 800px;
      height: 800px;
      margin-left: -400px;
    }
    .icon {
      display: block;
      position: absolute;
      left: 50%;
      top: 15px;
      margin-left: -40px;
      width: 80px;
      height: 80px;
    }
  }
  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding-top: 90px;
    .name {
      text-align: center;
      color: #fff;
      font-size: 16px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .button-list {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 20px;
    padding-top: 5px;
    color: #fff;
    .button {
      font-size: 14px;
      line-height: 20px;
      &:hover {
        color: #999;
      }
    }
  }
  &.app-add {
    text-align: center;
    vertical-align: top;
    line-height: 200px;
    box-shadow: 0 0 0 1px #666;
    color: #999;
    background-color: #fcfcfc;
  }
}
</style>
