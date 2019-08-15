<template>
  <div class="templateFormFile">
    <el-upload
      class="templateFormFile-upload"
      action="/ctg-workflow/Form/SheetAttachmentAction"
      name="fileToUpload"
      :with-credentials="true"
      accept=".txt"
      :on-change="changeHandle"
      :on-success="successHandle"
      :on-error="errorHandle"
      :before-remove="beforeRemoveHandle"
      :on-remove="removeHandle"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传txt文件
      </div>
    </el-upload>
  </div>
</template>
<script>
import { isExceedSizeLimit } from '@/rebuild/helper/upload-helper'

export default {
  name: 'TemplateFormFile',
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      fileList: this.value && this.value.url ? [this.value] : []
    }
  },
  methods: {
    // 文件添加
    changeHandle(file) {
      this.fileList = [file]
    },
    // 文件上传成功
    successHandle(response, file, fileList) {
      this.fileList = fileList
      this.$emit('input', {
        name: file.name,
        url: file.response.ThumbnailUrl,
        size: file.size
      })
    },
    // 确认删除
    beforeRemoveHandle(file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 删除文件
    removeHandle(file, fileList) {
      this.fileList = fileList
      this.$emit('input', null)
    },
    // 文件上传失败
    errorHandle(err, file, fileList) {
      this.fileList = fileList
      this.$message({
        message: '上传失败，请重试',
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
<style lang="scss">
.templateFormFile {
  .el-upload__input {
    display: none;
  }
}
</style>
