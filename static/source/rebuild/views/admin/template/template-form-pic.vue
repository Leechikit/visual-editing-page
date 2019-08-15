<template>
  <div class="templateFormPic">
    <div class="title">{{ title }}</div>
    <ul class="pic-list">
      <li v-for="(item, $index) in picList" :key="$index">
        <el-image
          v-if="item.ThumbnailUrl !== void 0"
          style="width:100%;height:100%;"
          :src="item.ThumbnailUrl"
          :preview-src-list="[item.ThumbnailUrl]"
          fit="contain"
        >
          <span class="image-placeholder" slot="placeholder">加载中...</span>
        </el-image>
        <el-progress
          v-else
          type="circle"
          color="#327DFF"
          :stroke-width="2"
          :width="50"
          :percentage="item.progress"
        ></el-progress>
        <div class="delete-btn" @click="deleteFile($index)">
          <i class="el-icon-close"></i>
        </div>
      </li>
      <li class="add-btn" v-if="picList.length < 5">
        <i class="iconfont iconzengjia"></i
        ><input type="file" @change="uploadFiles($event)" accept="image/*" />
      </li>
    </ul>
    <div class="desc">{{ desc }}</div>
  </div>
</template>
<script>
import {
  uploadHelper,
  IGuid,
  isExceedSizeLimit
} from '@/rebuild/helper/upload-helper'

export default {
  name: 'TemplateFormPic',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    // 上传文件大小限制，默认为2MB
    limit: {
      type: Number,
      default: 2
    },
    // 文件大小单位，默认为MB
    unit: {
      type: String,
      default: 'MB'
    }
  },
  data() {
    return {
      picList: this.value
        ? this.value.map(item => {
            return {
              ThumbnailUrl: item
            }
          })
        : []
    }
  },
  methods: {
    // 上传文件
    uploadFiles($event) {
      let files = Array.from($event.target.files)
      files.forEach(file => {
        // 验证文件格式以及大小等
        if (!this.validateFile(file)) {
          return
        }
        let fileId = IGuid()
        this.doFileUpload(file, fileId)
        let attachment = {
          fileId,
          ThumbnailUrl: void 0,
          progress: 0
        }
        this.picList.push(attachment)
      })
    },
    // 删除文件
    deleteFile(index) {
      this.picList.splice(index, 1)
      this.$emit('input', this.picList.map(item => item.ThumbnailUrl))
    },
    // 上传文件到后端
    doFileUpload(file, fileId) {
      let options = {
        filename: file.name,
        file,
        action: '/ctg-workflow/Form/SheetAttachmentAction',
        onSuccess: data => {
          this.onUploadSucess(data, fileId)
        },
        onProgress: data => {
          this.onUploadProgress(data, fileId)
        },
        error: data => {
          console.error(data)
          this.onUploadError(data, fileId)
        }
      }
      // 开始上传文件
      return uploadHelper(options)
    },
    onUploadProgress(data, fileId) {
      let file = this.picList.find(value => value.fileId === fileId)
      file.progress = data.percentage
      // 如果已经设置作用域插槽
      // if (this.progressBar) {
      //   this.$refs[fileId][0].style.width = data.percentage + '%'
      // }
      // this.onProgress && this.onProgress(data)
    },
    onUploadSucess(data, fileId) {
      let file = this.picList.find(value => value.fileId === fileId)
      file.attachmentId = data.AttachmentId // 上传真正文件名
      file.ThumbnailUrl = '/ctg-workflow' + data.ThumbnailUrl // 上传图片缩略图，目前图片暂未压缩
      this.$emit('input', this.picList.map(item => item.ThumbnailUrl))
    },
    onUploadError(data, fileId) {
      let index = this.picList.findIndex(value => value.fileId === fileId)
      this.picList.splice(index, 1)
      // this.removeFileFromFileList(fileId)
      // this.onError && this.onError(data)
      let message = data.status
      if (+data.status === 401 || +data.status === 403) {
        message = '未登陆'
        this.$router.push({ name: 'consoleLogin' })
      }
      this.$message({
        message: `上传文件失败，请重新上传: ${message}`,
        type: 'error'
      })
    },
    // 校验上传文件
    validateFile(file) {
      // 检查文件大小，目前默认限制为10MB
      if (file.size === 0) {
        this.$message({
          message: '文件大小不能为0！',
          type: 'warning'
        })
        return false
      }
      if (isExceedSizeLimit(file.size, this.limit, this.unit)) {
        this.$message({
          message: `文件大小超过限制, 限制大小为${this.limit}${this.unit}`,
          type: 'warning'
        })
        return false
      }
      return true
    }
  }
}
</script>
<style lang="scss" scoped>
.templateFormPic {
  margin-bottom: 20px;
  .title {
    font-size: 14px;
    line-height: 20px;
    color: #3c3c3c;
    margin-bottom: 10px;
  }
  .desc {
    font-size: 14px;
    line-height: 20px;
    color: #b4b4b4;
  }
  .pic-list {
    &::after {
      content: '.';
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
    li {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
      width: 120px;
      height: 60px;
      margin-right: 10px;
      margin-bottom: 10px;
      background-color: #f0f0f0;
      &.add-btn {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #b4b4b4;
        .iconfont {
          font-size: 32px;
        }
        input[type='file'] {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
      }
      .image-placeholder {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: $color-remind;
      }
      .delete-btn {
        position: absolute;
        right: -8px;
        top: -8px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 16px;
        height: 16px;
        background-color: $color-main;
        color: #fff;
        font-size: 14px;
        border-radius: 100%;
        cursor: pointer;
      }
    }
  }
}
</style>
