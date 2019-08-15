<template>
  <div class="formListHeader">
    <section class="controls">
      <div class="button-list">
        <el-button
          v-if="permissionList.includes('START')"
          type="primary"
          size="small"
          @click="$emit('createForm')"
          ><i class="iconfont iconzengjia el-icon--left"></i>新建</el-button
        ><el-button type="primary" size="small" @click.native="showDownLoad"
          ><i class="iconfont icondaochu el-icon--left"></i>导出</el-button
        ><el-button
          type="primary"
          size="small"
          :loading="pdfDownLoadLock"
          @click="pdfDownload"
          ><i class="iconfont iconfujian el-icon--left"></i>PDF</el-button
        ><el-button
          v-if="permissionList.includes('REMOVE') && renderType === 'list'"
          type="primary"
          size="small"
          @click="$emit('deleteForm')"
          ><i class="iconfont iconguanbi el-icon--left"></i>删除</el-button
        >
        <el-button
          v-if="permissionList.includes('START') && importBtn === 'true'"
          type="primary"
          size="small"
          @click="showImportModal"
          ><i class="iconfont icondaoru el-icon--left"></i>导入</el-button
        >
      </div>
      <div class="option-list">
        <div class="normal-search" v-if="renderType === 'list'">
          <el-input
            placeholder="请输入发起人名称"
            v-model="startUserName"
            size="mini"
            clearable
            style="width: 200px;"
          ></el-input>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-search"
            class="search-btn"
            @click="handleAdvanceSearch"
          ></el-button>
        </div>
        <div
          v-if="renderType === 'list'"
          class="advance-search__show"
          :class="{ 'advance-search__show-before': renderType }"
          @click="advanceSearchVisible = !advanceSearchVisible"
        >
          <div
            class="advance-search__btn"
            :class="{ 'advance-search__btn-act': advanceSearchVisible }"
          >
            <span>高级搜索</span>
            <i v-if="advanceSearchVisible" class="iconfont iconshang1"></i>
            <i v-else class="iconfont iconxia"></i>
          </div>
        </div>
        <DropDown
          v-if="renderType && renderOptions.length > 0"
          v-model="renderType"
          :options="renderOptions"
          class="render-type"
          @change="$emit('changeRenderType', renderType)"
        ></DropDown>
      </div>
    </section>
    <section>
      <div
        v-if="renderType === 'list' && advanceSearchVisible"
        class="advance-search"
      >
        <el-form :inline="true" label-width="80px">
          <el-form-item label="数据标题">
            <el-input
              v-model="nameSchema"
              size="small"
              placeholder="支持模糊"
            ></el-input>
          </el-form-item>
          <el-form-item label="日期范围">
            <el-date-picker
              v-model="dateRange"
              type="datetimerange"
              size="small"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd HH:mm"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div
          class="queryGroup"
          v-for="(queryColumns, $index) in queryGroup"
          :key="$index"
        >
          <div class="queryItem" v-for="item in queryColumns" :key="item.Code">
            <query-item
              ref="queryItem"
              :type="item.Type"
              :displayName="item.DisplayName"
              :optionValue="item.OptionValue"
              :unitType="item.UnitType"
              v-model="item.Value"
            ></query-item>
          </div>
        </div>
        <el-form :inline="true" label-width="80px">
          <el-form-item label=" ">
            <el-button type="primary" size="small" @click="handleAdvanceSearch">
              搜索
            </el-button>
            <el-button plain size="small" @click="resetAdvanceSearch"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </section>
    <el-dialog
      title="导出数据"
      :visible.sync="isShowDownLoad"
      width="800px"
      custom-class="el-dialog-download"
      :modal-append-to-body="false"
    >
      <div v-show="!isDownLoading">
        <p>请选择导出字段</p>
        <div
          style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;"
        >
          <el-checkbox :value="checkAll" @click.native="handleCheckAll">
            <span>全选</span>
          </el-checkbox>
        </div>
        <el-checkbox-group
          v-model="checkAllGroup"
          @on-change="checkAllGroupChange"
        >
          <el-checkbox
            v-for="item in checkboxList"
            :key="item.Code"
            :label="item.Code"
            :disabled="item.Code == 'Name'"
          >
            <span>{{ item.DisplayName }}</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="canvas" v-show="isDownLoading">
        <canvas id="circle" ref="circle" width="140px" height="140px" />
        <div class="content">
          <i
            v-if="downloadResult && downloadPercent === 100"
            class="el-icon-check"
            style="color:#2DB7F5;font-size:50px"
            :style="{ color: downloadColor }"
          ></i>
          <i
            v-else-if="!downloadResult && downloadPercent === 100"
            class="el-icon-close"
            style="color:#FF5500;font-size:50px"
            :style="{ color: downloadColor }"
          ></i>
          <span v-else style="font-size:24px">{{ downloadPercent }}%</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="download-before" v-show="!isDownLoading">
          <p class="tips">提示：系统将导出筛选后的数据</p>
          <div class="download-btn">
            <el-button
              type="primary"
              :disabled="isDownLoading"
              @click="downloadUpdate"
              size="mini"
              >导出用于修改数据</el-button
            >
            <el-button
              type="primary"
              :disabled="isDownLoading"
              @click="download"
              size="mini"
              >导出</el-button
            >
          </div>
        </div>
        <div class="download-after" v-show="isDownLoading">
          <div class="download-btn">
            <el-button type="primary" @click="isShowDownLoad = false"
              >确定</el-button
            >
          </div>
        </div>
      </span>
    </el-dialog>
    <openModal
      v-if="isShowPdfDownLoad"
      class="pdf-download-hidden"
      :code="appId"
    ></openModal>
    <el-dialog
      title="导入数据"
      :visible.sync="importModalVisible"
      width="520px"
      :modal-append-to-body="false"
    >
      <el-upload
        ref="uploadImport"
        action="\\"
        drag
        :with-credentials="true"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        class="upload-import"
        :before-upload="handleImportBeforeUpload"
      >
        <div class="upload-box">
          <i class="el-icon-upload" style="color: #3399ff;font-size:52px"></i>
          <p>
            上传Excel文件<span style="color: #e53e2c"
              >(需要使用下载的模板文件)</span
            >
          </p>
        </div>
        <div slot="tip">
          <p class="import-upload-desc">
            提示：支持导入数据的控件除图片，附件，地址，文档库和子表以外的控件导入，系统控件数据自动生成，多选控件使用;(英文状态下)分开，关联表单使用数据标题识别，数据标题中存在的空格使用&替代，其中开启流程的表单添加的数据状态为草稿状态。注意事项：导入功能不会触发计算公式和关联表单填充等页面触发的功能
          </p>
          <p>
            <span class="custom-text-btn" @click="importExcelTemplate"
              >下载Excel导入例子模板</span
            >
          </p>
        </div>
      </el-upload>
      <div slot="footer">
        <div style="text-align:center">
          <el-button
            type="primary"
            size="mini"
            :loading="importLoading"
            @click="importExcel"
          >
            <span>{{ importLoading ? '正在导入数据' : '导入' }}</span>
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import html2pdf from 'html2pdf.js'
import trigger from '@/util/trigger.js'
import HTTP_APP from '@/rebuild/api/app'
import DropDown from '@/rebuild/components/dropdown'
import openModal from '@/views/home/openModal-rebuild.vue'
import queryItem from '@/views/listview/components/queryItem-rebuild.vue'

const DefaultRenderOptions = [
  { id: 'list', label: '表格', icon: 'iconbiaoge' },
  { id: 'calendar', label: '日历', icon: 'iconriqi' }
]

export default {
  name: 'FormListHeader',
  components: {
    DropDown,
    openModal,
    queryItem
  },
  props: {
    // 应用id
    appId: {
      type: String
    },
    // 展示类型
    type: {
      type: String
    },
    // 导出字段
    columns: {
      type: Array,
      default: () => []
    },
    tableArrs: {
      type: Array,
      default: () => []
    },
    appName: {
      type: String,
      default: ''
    },
    // 应用权限
    permissionList: {
      type: Array,
      default: () => []
    },
    importBtn: {
      type: String,
      defalt: ''
    },
    // 展示可切换模式
    showRenderOptions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      renderType: this.type, // 应用展示方式
      startUserName: '', // 发起人名称
      advanceSearchVisible: false, // 高级搜索显示
      nameSchema: '', // 搜索数据标题
      dateRange: null, // 搜索日期
      queryItem: {}, // 高级查询
      isShowDownLoad: false,
      checkAll: false,
      checkAllGroup: [],
      checkboxList: [],
      isDownLoading: false,
      downloadPercent: 0,
      downloadTimer: null, // 导出倒计时
      downloadDuration: 50, // 导出倒计时间隔
      downloadResult: true,
      circleCanvas: null,
      isShowPdfDownLoad: false,
      pdfDownLoadLock: false,
      importModalVisible: false,
      importLoading: false,
      uploadImportFile: null
    }
  },
  computed: {
    downloadColor() {
      return this.downloadResult ? '#2DB7F5' : '#FF5500'
    },
    // 初始化选择块状还是列表展示
    renderOptions() {
      return DefaultRenderOptions.filter(item =>
        this.showRenderOptions.includes(item.id)
      )
    },
    // 自定义查询列表
    queryColumns() {
      let queryColumns = []
      this.columns.forEach(item => {
        if (item.CanBeQueryItem === true && item.IsQueryItem === true) {
          queryColumns.push({
            ...item,
            Value: ''
          })
        }
      })
      return queryColumns
    },
    // 分组后的自定义查询列表
    queryGroup() {
      let result = []
      for (let i = 0, len = this.queryColumns.length; i < len; i = i + 3) {
        result.push(this.queryColumns.slice(i, i + 3))
      }
      return result
    }
  },
  watch: {
    appId() {
      this.resetData()
    },
    columns(val) {
      this.checkboxList = val.slice()
      this.checkboxList = this.checkboxList.filter(item => {
        return item.Visible
      })
      if (this.type !== 'report') {
        this.checkboxList.unshift({
          Code: 'Name',
          DisplayName: '数据标题'
        })
      }
      this.checkAllGroup = this.checkboxList.map(item => {
        return item.Code
      })
      this.checkAll = true
    },
    type() {
      this.renderType = this.type
    }
  },
  methods: {
    // 重置数据
    resetData() {
      this.renderType = this.type
      this.startUserName = ''
      this.advanceSearchVisible = false
      this.resetAdvanceSearch()
    },
    // 重置高级搜索
    resetAdvanceSearch() {
      this.nameSchema = ''
      this.dateRange = null
      this.queryItem = {}
      if (this.$refs.queryItem) {
        this.$refs.queryItem.forEach(item => {
          item.reset()
        })
      }
    },
    // 高级搜索搜索按钮
    handleAdvanceSearch() {
      let startTime = ''
      let endTime = ''
      if (this.dateRange && this.dateRange.length === 2) {
        startTime = this.formatDate(this.dateRange[0])
        endTime = this.formatDate(this.dateRange[1])
      }
      this.queryColumns.forEach(item => {
        this.queryItem[item.Code] =
          item.Type === 5 ? this.formatDate(item.Value) : item.Value
      })
      this.queryItem.startUserName = this.startUserName
      this.$emit('search', {
        nameSchema: this.nameSchema,
        startTime,
        endTime,
        queryItem: this.queryItem
      })
    },
    // 格式化日期
    formatDate(date) {
      return date ? new Date(date).getTime() : ''
    },
    showDownLoad() {
      if (this.tableArrs && this.tableArrs.length > 0) {
        this.downloadResult = true
        this.isDownLoading = false
        this.isShowDownLoad = true
      } else {
        this.$message.warning('暂无数据可导出')
      }
    },
    handleCheckAll() {
      if (this.checkAll === true) {
        if (this.type === 'report') this.checkAllGroup = []
        else this.checkAllGroup = ['Name']
      } else {
        this.checkAllGroup = this.checkboxList.map(item => {
          return item.Code
        })
      }
      this.checkAll = !this.checkAll
    },
    checkAllGroupChange() {
      if (this.checkAllGroup.length === this.checkboxList.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    },
    // 导出
    download() {
      this.downloadPercent = 0
      var canvas = document.getElementById('circle')
      this.circleCanvas = canvas.getContext('2d')
      this.circleCanvas.clearRect(0, 0, canvas.width, canvas.height)
      this.circleCanvas.beginPath()
      this.circleCanvas.strokeStyle = '#EAEEF2'
      this.circleCanvas.lineWidth = 8
      this.circleCanvas.arc(70, 70, 65, 0, 2 * Math.PI)
      this.circleCanvas.stroke()

      this.downloadCountdown()
      var startTime = ''
      var endTime = ''
      if (this.dateRange && this.dateRange.length === 2) {
        startTime = this.formatDate(this.dateRange[0])
        endTime = this.formatDate(this.dateRange[1])
      }
      const params = {
        appId: this.appId,
        nameSchema: this.nameSchema,
        startTime,
        endTime,
        queryItem: JSON.stringify(this.queryItem),
        Columns: this.checkAllGroup,
        title: this.appName,
        that: this
      }

      HTTP_APP.downloadValidate(params)
        .then(() => {
          HTTP_APP.download(params)
        })
        .catch(() => {
          this.downloadResult = false
          this.downloadPercent = 100
          this.drawCircle(true)
        })
      this.isDownLoading = true
    },
    // 导出用于修改数据
    downloadUpdate() {
      this.downloadPercent = 0
      var canvas = document.getElementById('circle')
      this.circleCanvas = canvas.getContext('2d')
      this.circleCanvas.clearRect(0, 0, canvas.width, canvas.height)
      this.circleCanvas.beginPath()
      this.circleCanvas.strokeStyle = '#EAEEF2'
      this.circleCanvas.lineWidth = 8
      this.circleCanvas.arc(70, 70, 65, 0, 2 * Math.PI)
      this.circleCanvas.stroke()

      this.downloadCountdown()
      var startTime = ''
      var endTime = ''
      if (this.dateRange && this.dateRange.length === 2) {
        startTime = this.formatDate(this.dateRange[0])
        endTime = this.formatDate(this.dateRange[1])
      }
      const params = {
        appId: this.appId,
        nameSchema: this.nameSchema,
        startTime,
        endTime,
        queryItem: JSON.stringify(this.queryItem),
        Columns: this.checkAllGroup,
        title: this.appName,
        that: this
      }

      HTTP_APP.downloadValidateUpdate(params)
        .then(() => {
          HTTP_APP.downloadUpdate(params)
        })
        .catch(() => {
          this.downloadResult = false
          this.downloadPercent = 100
          this.drawCircle(true)
        })
      this.isDownLoading = true
    },
    // 导出进度倒计时
    downloadCountdown(boo) {
      clearTimeout(this.downloadTimer)
      this.downloadTimer = setTimeout(() => {
        if (boo) {
          this.downloadPercent = 100
          this.drawCircle()
          return
        }
        if (this.downloadPercent >= 99) {
          clearTimeout(this.downloadTimer)
        } else {
          if (this.downloadPercent < 90) {
            this.downloadPercent += 2
          } else {
            this.downloadPercent += 9
          }

          this.downloadCountdown()
        }
        this.drawCircle()
      }, this.downloadDuration)
    },
    drawCircle() {
      this.circleCanvas.beginPath()
      this.circleCanvas.strokeStyle = this.downloadColor
      this.circleCanvas.lineWidth = 8
      this.circleCanvas.arc(
        70,
        70,
        65,
        -0.5 * Math.PI,
        (this.downloadPercent * Math.PI) / 50 - 0.5 * Math.PI
      )
      this.circleCanvas.stroke()
    },
    // pdf导出
    pdfDownload() {
      this.pdfDownLoadLock = true
      this.isShowPdfDownLoad = true
      let opt = {
        margin: 2,
        filename: this.appName + '.pdf',
        image: {
          type: 'jpeg',
          quality: 1
        }
      }
      trigger.off('open-modal-load').on('open-modal-load', () => {
        // 用于避免非下载按钮点击，触发的事件
        if (!this.pdfDownLoadLock) return
        let element = document.getElementById(this.appId)
        // 子表导出pdf格式时问题
        let table = $(element).find('.table.table-bordered.table-condensed')
        table.find('thead').remove()
        table.parent().css('margin-top', '20px')
        html2pdf()
          .from(element)
          .set(opt)
          .save()
          .then(() => {
            this.isShowPdfDownLoad = false
            this.pdfDownLoadLock = false
          })
      })
    },
    showImportModal() {
      this.importModalVisible = true
      this.$refs.uploadImport.fileList = []
    },
    handleImportBeforeUpload(file) {
      this.$refs.uploadImport.fileList.splice(0, 1, file)
      return false
    },
    importExcelTemplate() {
      HTTP_APP.importExcelTemplate(this.$route.query.appId)
    },
    importExcel() {
      if (!this.$refs.uploadImport.fileList[0]) {
        this.$message.warning('请上传Excel文件')
        return
      }
      this.importLoading = true
      HTTP_APP.uploadImportExcel(
        this.$route.query.appId,
        this.$refs.uploadImport.fileList[0]
      )
        .then(res => {
          if (res.code === '0') {
            this.importModalVisible = false
            let errors = Object.keys(res.errors)
            let errMsg = res.msg
            if (errors.length > 0) {
              errors = errors.map(item => +item + 1)
              errMsg += `, 第 ${errors.join(',')} 行导入失败`
            }
            this.$notify({
              title: '导入结果',
              message: errMsg,
              duration: 0
            })
            // 导入成功后重新获取表格数据
            this.$parent.$children
              .filter(item => item.$el.className === 'formlListTable')[0]
              .getData()
          } else {
            this.$message.error(res.msg)
          }
        })
        .finally(() => {
          this.importLoading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/rebuild/assets/style/base.scss';
.formListHeader {
  section {
    margin-bottom: 12px;
    &.controls {
      overflow: hidden;
    }
    .button-list {
      float: left;
    }
    .option-list {
      float: right;
    }
  }
}
.option-list {
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & .render-type {
    margin-left: 20px;
  }

  & .advance-search__show {
    color: $color-main;
    padding: 0 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      width: 1px;
      background-color: #f0f0f0;
      height: 15px;
    }
  }

  & .advance-search__show-before {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      background-color: #f0f0f0;
      height: 15px;
    }
  }

  & .advance-search__btn {
    padding: 4px 8px;
    border-radius: 4px;
    position: relative;
    & span {
      font-size: $font-size-main;
    }
  }

  & .advance-search__btn-act {
    background-color: rgba(50, 125, 255, 0.1);
  }

  & .normal-search {
    margin-left: 20px;
    margin-right: 20px;

    & .search-btn {
      padding: 7px 7px;
      height: 28px;
    }
  }
}
.advance-search {
  border: 1px solid #e7e7e7;
  margin: 10px 0;
  padding: 15px 15px 0;
  .queryGroup {
    min-height: 45px;
    margin-bottom: 22px;
    .queryItem {
      float: left;
      width: 33.33%;
      margin-bottom: 5px;
    }
  }
}
.download-before {
  height: 44px;
  line-height: 44px;
  .tips {
    float: left;
    font-size: 12px;
    color: #999;
  }
  .download-btn {
    float: right;
  }
}

.pdf-download-hidden {
  position: fixed;
  z-index: -1;
  opacity: 0;
  left: -2000px;
  top: -2000px;
}
</style>
<style lang="scss">
.el-dialog-download {
  .el-checkbox {
    width: calc(100% / 3);
    margin-right: 0;
  }
  .el-dialog__body {
    min-height: 300px;
    padding: 30px 50px;
    .canvas {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }
}
.upload-import {
  width: 100%;
  .el-upload--text {
    width: 100%;
    > input {
      display: none;
    }
    .el-upload-dragger {
      width: 100%;
      height: auto;
      .upload-box {
        i {
          color: rgb(51, 153, 255);
          font-size: 52px;
          line-height: 0px;
        }
        p {
          line-height: 30px;
          padding-bottom: 20px;
        }
      }
    }
  }
  .custom-text-btn {
    color: #1890ff;
    cursor: pointer;
    line-height: 50px;
  }
}
</style>
