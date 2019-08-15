<template>
  <div class="workflow-design">
    <Nav opacity="1" display="none"></Nav>
    <div class="g-container-column">
      <div class="g-header u-bd-bottom">
        <PageTitle text="应用管理"></PageTitle>
      </div>
      <div class="g-main">
        <div class="g-container">
          <div class="g-main u-pd-25-20">
            <div class="appmgr-list">
              <div class="appmgr-list-header">
                <p>模块列表</p>
                <div class="appmgr-search">
                  <el-input
                    placeholder="搜索应用名称"
                    v-model="searchKeyword"
                    size="small"
                    clearable
                    style="width: 200px;"
                  ></el-input>
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-search"
                    class="search-btn"
                    @click="searchModule"
                  ></el-button>
                </div>
                <el-button
                  type="default"
                  size="small"
                  @click="exportConfigBtn()"
                  :loading="exportLoading"
                >
                  <i class="iconfont icondaochu el-icon--left"></i
                  >导出配置</el-button
                >
              </div>
              <div class="appmgr-list-main" v-loading="listLoading">
                <div
                  class="appmgr-card"
                  v-for="item in appData"
                  :key="item.Code"
                  @click.stop="toApp(item.id, item.moduleName)"
                  :class="{ 'del-fail-bg': item.status }"
                >
                  <div class="appmgr-card-info">
                    <svg class="appicon" aria-hidden="true">
                      <use :xlink:href="item.icon"></use>
                    </svg>
                    <div>
                      <p class="apptitle">{{ item.moduleName }}</p>
                      <!-- <p class="appsubtitle">9个子应用</p> -->
                    </div>
                  </div>
                  <div class="appmgr-card-btns">
                    <div
                      class="appedit"
                      @click.stop.prevent="
                        modApp(item.id, item.moduleName, item.icon)
                      "
                    >
                      修改
                    </div>
                    <div
                      class="appdel"
                      @click.stop.prevent="delApp(item.id, item.moduleName)"
                    >
                      删除
                    </div>
                  </div>
                </div>
                <div class="appmgr-card addcard">
                  <div class="appmgr-add" @click="addApp()">
                    <span class="iconfont iconzengjia"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增 修改模态框 -->
    <el-dialog
      :visible.sync="showEditModal"
      :modal-append-to-body="false"
      width="500px"
      :title="isEdit ? '修改应用' : '新建应用'"
    >
      <el-form
        :model="app"
        label-width="80px"
        label-position="right"
        :rules="rules"
        ref="editForm"
      >
        <el-form-item prop="moduleName">
          <span class="form-item-title" slot="label">应用名称</span>
          <div class="form-item-value">
            <el-input
              size="small"
              v-model="app.moduleName"
              placeholder="请输入应用名称"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="form-item-title" slot="label">应用图标</div>
          <div class="form-item-value">
            <appIcon :appIcon="app.icon" @select="selectIcon"></appIcon>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="showEditModal = false">取消</el-button>
        <el-button
          type="primary"
          size="small"
          :loading="editLoading"
          @click="submitEdit()"
        >
          确定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import HTTP from '@/api/app-apply.js'
import PageTitle from '@/rebuild/components/pageTitle'
import Nav from '@/rebuild/components/nav'
import appIcon from '@/rebuild/components/appIcon'

export default {
  name: 'workflow-design',
  components: {
    Nav,
    PageTitle,
    appIcon
  },
  data() {
    return {
      exportLoading: false,
      listLoading: false,
      appData: [],
      isEdit: false,
      showEditModal: false,
      app: {
        moduleName: null,
        id: null,
        icon: null
      },
      editLoading: false,
      rules: {
        moduleName: [
          { required: true, message: '请输入应用名称', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '应用名称长度需要在2到20个字符',
            trigger: 'blur'
          }
        ]
      },
      searchKeyword: null
    }
  },
  mounted() {
    this.getModuleList()
  },
  methods: {
    getModuleList(query) {
      this.listLoading = true
      HTTP.getAllModule()
        .then(res => {
          let list = res.page.result
          // 前端简单搜索
          if (query) {
            this.appData = []
            list.forEach(item => {
              if (item.moduleName.indexOf(query) > -1) {
                this.appData.push(item)
              }
            })
          } else {
            this.appData = res.page.result
          }
        })
        .catch(() => {
          this.$message.error('应用列表请求不成功,请稍后再试')
        })
        .finally(() => {
          this.listLoading = false
        })
    },
    searchModule() {
      if (this.searchKeyword) {
        this.getModuleList(this.searchKeyword)
      } else {
        this.getModuleList()
      }
    },
    toApp(itemId, itemName) {
      if (!this.isDrag) {
        this.$router.push({
          name: 'appManager_index',
          params: { moduleId: itemId, moduleName: itemName }
        })
      }
    },
    selectIcon(app) {
      this.app.icon = app.appIcon
    },
    exportConfigBtn() {
      this.exportLoading = true
      window.location.href = '/ctg-workflow/act/app/exportAllAppDatas'
      // 虚假的loading
      setTimeout(() => {
        this.exportLoading = false
      }, 1500)
    },
    addApp() {
      this.isEdit = false
      this.app = {
        moduleName: null,
        icon: '#icon-add',
        id: null
      }
      this.showEditModal = true
    },
    modApp(id, name, icon) {
      this.isEdit = true
      this.app = {
        moduleName: name,
        icon: icon,
        id: id
      }
      this.showEditModal = true
    },
    submitEdit() {
      this.$refs['editForm'].validate(valid => {
        if (valid) {
          this.editLoading = true
          if (this.app.id) {
            HTTP.modModule(this.app)
              .then(res => {
                if (res.code === '0') {
                  this.$message.success('应用信息修改成功')
                  this.showEditModal = false
                  this.searchKeyword = null
                  this.getModuleList()
                }
              })
              .catch(() => {
                this.$message.error('应用信息修改不成功,请稍后再试')
              })
              .finally(() => {
                this.editLoading = false
              })
          } else {
            HTTP.createModule(this.app.moduleName, this.app.icon)
              .then(res => {
                if (res.code === '0') {
                  this.$message.success('应用创建成功')
                  this.showEditModal = false
                  this.$router.push({
                    name: 'appManager_index',
                    params: {
                      moduleId: res.moduleId,
                      moduleName: res.moduleName
                    }
                  })
                }
              })
              .catch(() => {
                this.$message.error('应用创建不成功,请稍后再试')
              })
              .finally(() => {
                this.editLoading = false
              })
          }
        }
      })
    },
    delApp(id, name) {
      this.$confirm(
        `此操作将永久清除【${name}】下所有的表单，流程，用户数据`,
        '请注意',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        HTTP.delModule(id)
          .then(res => {
            if (res.code === '0') {
              this.$message('异步删除中，请稍候查看删除结果...')
              this.listLoading = true
              this.searchKeyword = null
              setTimeout(() => {
                this.getModuleList()
              }, 2000)
            } else {
              this.$message.error('删除不成功,请稍候再试')
            }
          })
          .catch(() => {
            this.$message.error('删除不成功,请稍候再试')
          })
          .finally(() => {})
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/rebuild/assets/style/base.scss';
@import '~@/rebuild/assets/style/layout.scss';
.workflow-design {
  padding-top: 50px;
  height: 100%;
  background-color: #fff;
  .u-bd-bottom {
    border-bottom: 1px solid $color-layout-border;
  }
  .u-pd-25-20 {
    padding: 25px 20px;
  }
  .appmgr-list {
    width: 1020px;
    margin: auto;
    &-header {
      display: flex;
      justify-content: center;
      padding-right: 20px;
      p {
        font-size: 20px;
        color: #3c3c3c;
        line-height: 20px;
        flex-grow: 1;
      }
      .appmgr-search {
        margin-right: 15px;
      }
    }
    &-main {
      display: flex;
      flex-flow: wrap;
      margin-top: 25px;
      .appmgr-card {
        width: 240px;
        padding: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
        cursor: pointer;
        border-radius: 4px;
        &:hover {
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px 0 hsla(0, 0, 0, 0.1);
          .appmgr-card-btns {
            opacity: 1;
          }
        }
        &-info {
          display: flex;
          .appicon {
            width: 60px;
            height: 60px;
            margin-right: 15px;
          }
          .apptitle {
            font-size: 16px;
            color: $color-normal;
            margin-bottom: 8px;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 120px;
          }
          .appsubtitle {
            font-size: 14px;
            color: #b4b4b4;
            line-height: 20px;
          }
        }
        &-btns {
          opacity: 0;
          transition: all 0.3s ease;
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          > div {
            background: #fafafa;
            border-radius: 15px;
            padding: 8px 33px;
            &:hover {
              background: #f4f4f4;
            }
          }
          .appedit {
            color: $color-main;
          }
          .appdel {
            color: $color-error;
          }
        }
        .appmgr-add {
          text-align: center;
          background: #f5f5f5;
          height: 100px;
          border-radius: 4px;
          .iconfont {
            line-height: 100px;
            font-size: 32px;
            vertical-align: middle;
          }
        }
      }
      .appmgr-card:nth-child(4n) {
        // 第4个元素右边距为0
        margin-right: 0;
      }
      .addcard {
        padding-top: 0;
        &:hover {
          box-shadow: none;
        }
        .appmgr-add:hover {
          transition: all 0.3s ease;
          background: #efefef;
        }
      }
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
  .del-fail-bg {
    background: #ffcaca;
  }
}
</style>
