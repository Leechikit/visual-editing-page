<template>
  <div>
    <Modal
      v-model="visible"
      title="设置 Word 模板"
      :mask-closable="false"
      :loading="loading"
      @on-ok="handleOK"
    >
      <p class="word-template-tip">
        <span class="custom-btn" @click="viewHelp">查看帮助</span>
      </p>
      <Upload
        ref="uploadImport"
        action="\\"
        type="drag"
        :with-credentials="true"
        :accept="wordAccept"
        :show-upload-list="false"
        :before-upload="handleBeforeUpload"
      >
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>选择Word文件</p>
        </div>
      </Upload>
      <p v-if="file" class="word-template-file">
        <Icon type="document-text" class="word-template-file__icon"></Icon>
        <span>{{file.name}}</span>
        <span
          class="word-template-file__btn word-template-file__btn__del"
          @click="removeFile"
        >删除</span>
        <span
          v-if="file.attachId"
          class="custom-btn word-template-file__btn"
          @click="downloadWord(file.attachId)"
        >下载</span>
      </p>
    </Modal>
    <Modal
      v-model="helpVisible"
      title="如何设置 Word 模板"
      width="832"
      class="word-template-help"
      :styles="{top: '20px'}"
    >
      <Alert type="error">
        <p>不支持以下控件</p>
        <p>附件、图片、文件库、关联属性、列表查询、富文本编辑、代码内嵌、审批记录</p>
      </Alert>
      <img src="@/assets/images/word-template-help.png">
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import HTTP from '@/api/form.js';

export default {
  name: 'WordTemplate',
  props: ['rule', 'schemaCode'],
  data () {
    return {
      visible: false,
      code: '',
      file: null,
      loading: true,
      helpVisible: false,
      wordAccept: [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
        'application/msword', // doc
        'application/vnd.oasis.opendocument.text', // odt
        'application/vnd.ms-works' // wps
      ]
    };
  },
  methods: {
    show () {
      this.file = this.rule.id && {
        attachId: this.rule.id,
        name: this.rule.name
      };
      this.visible = true;
    },
    handleBeforeUpload (file) {
      this.file = file;
      this.$refs.uploadImport.fileList.splice(0, 1, file);
      return false;
    },
    downloadWord (attachId) {
      HTTP.downloadFile(attachId);
    },
    removeFile () {
      this.file = null;
      this.$refs.uploadImport.fileList = [];
    },
    viewHelp () {
      this.helpVisible = true;
    },
    async handleOK () {
      try {
        let res;
        if (!this.file && this.rule.id) {
          res = await HTTP.deleteWord(this.rule.id);
        } else if (this.file && !this.file.attachId) {
          if (this.rule.id) {
            const res2 = await HTTP.deleteWord(this.rule.id);
            if (+res2.code !== 0) {
              throw new Error(res2.msg);
            }
          }
          res = await HTTP.SheetAttachmentAction(this.file);
        } else {
          this.visible = false;
          return;
        }
        if (res.code === '0') {
          this.rule.id = res.AttachmentId;
          this.rule.name = this.file && this.file.name;
          this.visible = false;
          this.$Message.success('设置成功，不要忘记保存表单');
        } else {
          throw new Error(res.msg);
        }
      } catch (error) {
        this.$Message.error(error.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.word-template-tip {
  margin-bottom: 10px;
}

.word-template-file {
  margin-top: 10px;
  padding: 4px;
  color: #495060;
  background-color: #f3f3f3;
  border-radius: 4px;
  transition: all .2s ease-in-out;

  &__icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    color: #495060;
    text-align: center;
  }

  &__btn {
    float: right;
    margin-right: 10px;
  }

  &__btn__del {
    color: #ed3f14;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #f16543;
    }
  }
}

.custom-btn {
  color: #1890ff;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #40a9ff;
  }
}
</style>


<style lang="less">
.word-template-help {
  & .ivu-modal-body {
    overflow: auto;
  }
}
</style>
