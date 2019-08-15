<template>
  <div class="preview" v-if="type" @click.self="closePreview">
    <div class="preview-con" @click.self="closePreview">
      <!-- <div class="preview-con-bg" v-if="type === 'office'">
        <iframe 
          :src="`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`"
          width='100%'
          height='100%'
        ></iframe>
      </div> -->
      <div class="preview-con-bg" v-if="type === 'office'">
        <pdf v-for="i in numPages" :key="i" :src="pdfTask" :page="i"></pdf>
      </div>
      <div class="preview-con-bg" v-if="type === 'pdf'">
        <pdf v-for="i in numPages" :key="i" :src="pdfTask" :page="i"></pdf>
      </div>
      <div class="preview-con-bg" v-if="type === 'txt'">
        <pre class="txt" v-text="content"></pre>
      </div>
      <Spin size="large" fix v-if="loading"></Spin>
    </div>
    <img class="preview-img" v-if="type === 'image'" :src="url" alt="" />
    <!-- <div class="preview-delbtn" @click="closePreview"><Icon class="close-icon" type="close-round"></Icon></div> -->
  </div>
</template>
<script>
import pdf from 'vue-pdf'
import { file } from '@/api/file'
export default {
  name: 'preview',
  components: {
    pdf
  },
  data() {
    return {
      url: '',
      ext: '',
      numPages: 0,
      pdfTask: null,
      content: '',
      loading: false
    }
  },
  computed: {
    type() {
      let result = null
      if (this.isOfficeType(this.ext)) {
        result = 'office'
      } else if (this.isPdfType(this.ext)) {
        result = 'pdf'
      } else if (this.isTxtType(this.ext)) {
        result = 'txt'
      } else if (this.isImageType(this.ext)) {
        result = 'image'
      }
      return result
    }
  },
  methods: {
    show({ url, ext }) {
      $('.custom-main-header').addClass('s-hidden')
      this.$message.close()
      this.url = url
      this.ext = ext
      switch (this.type) {
        case 'office':
          this.previewPdf()
          break
        case 'pdf':
          this.previewPdf()
          break
        case 'txt':
          this.previewTxt()
          break
        case 'image':
          this.previewImage()
          break
      }
    },
    // 是否 office
    isOfficeType(ext) {
      return (
        ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].indexOf(
          ext.toLowerCase()
        ) !== -1
      )
    },
    // 是否 pdf
    isPdfType(ext) {
      return ['pdf'].indexOf(ext.toLowerCase()) !== -1
    },
    // 是否 txt
    isTxtType(ext) {
      return ['txt'].indexOf(ext.toLowerCase()) !== -1
    },
    // 是否图片类型
    isImageType(ext) {
      return (
        ['gif', 'jpg', 'jpeg', 'png', 'bmp'].indexOf(ext.toLowerCase()) !== -1
      )
    },
    // 预览 doc、xls、ppt
    previewOffice() {},
    // 预览 pdf
    previewPdf() {
      this.loading = true
      this.pdfTask = pdf.createLoadingTask(this.url)
      this.pdfTask
        .then(pdf => {
          this.numPages = pdf.numPages
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.errorPreview()
        })
    },
    // 预览 txt
    previewTxt() {
      this.loading = true
      file(this.url)
        .then(data => {
          this.content = data
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.errorPreview()
        })
    },
    // 预览图片
    previewImage() {
      this.loading = true
      const image = new Image()
      image.src = this.url
      image.onload = () => {
        this.loading = false
      }
      image.onerror = () => {
        this.errorPreview()
      }
    },
    // 关闭预览
    closePreview() {
      this.url = ''
      this.ext = ''
      this.content = ''
      this.loading = false
      $('.custom-main-header').removeClass('s-hidden')
    },
    // 预览失败
    errorPreview() {
      this.closePreview()
      this.$message.error('预览失败，请稍后重试')
    }
  }
}
</script>
<style lang="less" scoped>
.preview {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 10;
  background-color: rgba(55, 55, 55, 0.4);
  overflow: hidden;
  &-delbtn {
    width: 25px;
    height: 25px;
    position: absolute;
    left: 50%;
    top: 18px;
    margin-left: 400px;
    background-color: #c0c0c0;
    color: #000;
    border-radius: 25px;
    line-height: 25px;
    text-align: center;
    cursor: pointer;
  }
  &-con {
    position: absolute;
    top: 20px;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: auto;
    width: 800px;
    &-bg {
      width: 100%;
      height: 100%;
      border: 2px solid #cccccc;
      border-radius: 5px;
      background-color: #fff;
      overflow-y: auto;
      overflow-x: hidden;
    }
    iframe {
      border: none;
    }
    pre {
      width: 100%;
      height: 100%;
      margin: 0;
      box-sizing: border-box;
      background-color: transparent;
      border: none;
    }
  }
  &-img {
    max-width: 800px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
