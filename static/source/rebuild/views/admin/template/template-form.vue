<template>
  <div class="templateForm" v-loading="!formShowVisible">
    <div class="templateForm-header u-bd-bottom">
      <PageTitle :text="title">
        <div class="pagTitle-content">
          <span class="tips">带<i class="s-red">*</i>为默认必填选项</span>
        </div>
      </PageTitle>
    </div>
    <div class="templateForm-main u-pd-20-30" v-if="formShowVisible">
      <el-form ref="form" :model="template" :rules="rules" label-width="auto">
        <el-form-item label="模板名称" prop="name" required>
          <el-input v-model="template.name"></el-input>
        </el-form-item>
        <el-form-item label="模板序号">
          <el-input-number
            v-model="template.sort"
            :min="0"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="应用图标">
          <AppIcon :appIcon="template.icon" @select="selectIcon"></AppIcon>
        </el-form-item>
        <el-form-item label="业务分类" prop="busCategoryIds">
          <el-select
            v-model="template.busCategoryIds"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in businessTypeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业分类" prop="indCategoryIds">
          <el-select
            v-model="template.indCategoryIds"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in industryTypeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用版本">
          <el-input v-model="template.version"></el-input>
        </el-form-item>
        <el-form-item label="模板介绍" prop="introduction" required>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="template.introduction"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="模板价格">
          <el-input v-model="template.price" :min="0" @blur="formatPrice">
            <span slot="prepend">￥</span>
          </el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input v-model="template.supplier"></el-input>
        </el-form-item>
        <el-form-item label="模板标签">
          <el-input v-model="template.tag"></el-input>
        </el-form-item>
        <el-form-item label="表单报表数量">
          <el-input-number
            v-model="template.count"
            :min="0"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="模板图片">
          <TemplateFormPic
            v-model="template.pcPic"
            title="电脑端"
            desc="（最多支持添加5张图片，尺寸800*400px，不超过2M，支持jpg\png\gif等格式）"
          ></TemplateFormPic>
          <TemplateFormPic
            v-model="template.mobilePic"
            title="移动端"
            desc="（最多支持添加5张图片，尺寸800*400px，不超过2M，支持jpg\png\gif等格式）"
          ></TemplateFormPic>
        </el-form-item>
        <el-form-item label="配置数据">
          <TemplateFormFile v-model="template.configData"></TemplateFormFile>
        </el-form-item>
        <el-form-item label="体验url">
          <el-input
            v-model="template.experienceUrl"
            ref="experienceUrl"
            placeholder="系统自动生成"
            :readonly="true"
          >
            <el-button slot="append" @click="copy('experienceUrl')"
              >复制url</el-button
            >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="templateForm-footer u-bd-top">
      <el-button
        size="small"
        type="primary"
        :loading="submitLoading"
        @click="submit"
        >保存</el-button
      >
      <el-button size="small" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import PageTitle from '@/rebuild/components/pageTitle'
import AppIcon from '@/rebuild/components/appIcon'
import TemplateFormPic from './template-form-pic'
import TemplateFormFile from './template-form-file'
import HTTP_ADMIN from '@/rebuild/api/admin'
import iconList from '@/rebuild/api/static/appIconList.js'
import { find } from 'lodash'

export default {
  name: 'TemplateForm',
  components: {
    PageTitle,
    AppIcon,
    TemplateFormPic,
    TemplateFormFile
  },
  data() {
    return {
      template: {
        id: '',
        name: '',
        sort: '',
        icon: '#icon-add',
        busCategoryIds: [],
        indCategoryIds: [],
        version: '',
        introduction: '',
        pcPic: [],
        mobilePic: [],
        price: '0.00',
        supplier: '',
        tag: '',
        configData: {},
        count: '',
        experienceUrl: ''
      },
      businessTypeOptions: [],
      industryTypeOptions: [],
      dataLoading: false,
      submitLoading: false,
      rules: {
        name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
        introduction: [
          { required: true, message: '请输入模板介绍', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    templateId() {
      return this.$route.query.templateid
    },
    title() {
      return this.templateId !== void 0 ? '修改模板' : '创建模板'
    },
    formShowVisible() {
      return this.templateId !== void 0 ? !this.dataLoading : true
    }
  },
  created() {
    this.getCategory({ categoryId: '00001' }).then(result => {
      this.businessTypeOptions = result
    })
    this.getCategory({ categoryId: '00002' }).then(result => {
      this.industryTypeOptions = result
    })
    if (this.templateId !== void 0) {
      this.getTemplateDetail({ templateId: this.templateId })
    }
  },
  methods: {
    // 获取类别选项
    getCategory({ categoryId }) {
      return new Promise(async resolve => {
        let result = await HTTP_ADMIN.getCategory({ categoryId })
        if (+result.code === 0) {
          resolve(result.category)
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
        }
      })
    },
    // 获取模板详情
    async getTemplateDetail({ templateId }) {
      this.dataLoading = true
      let result = await HTTP_ADMIN.getTemplateDetail({ templateId })
      if (+result.code === 0) {
        const data = result.template
        for (let key in this.template) {
          switch (key) {
            case 'icon':
              {
                let obj = {}
                if (typeof data[key] === 'string') {
                  try {
                    obj = JSON.parse(data[key])
                    this.template[key] = obj.value
                  } catch (error) {
                    console.log(error)
                  }
                }
              }
              break
            case 'price':
              this.template[key] = data[key]
              this.formatPrice()
              break
            case 'pcPic':
            case 'mobilePic':
              if (data[key] instanceof Array) {
                this.template[key] = data[key]
              } else if (typeof data[key] === 'string' && data[key] !== '') {
                this.template[key] = data[key].split(',')
              } else {
                this.template[key] = []
              }
              break
            case 'configData':
              {
                let obj = {}
                if (typeof data[key] === 'string') {
                  try {
                    obj = JSON.parse(data[key])
                    this.template[key] = obj
                  } catch (error) {
                    this.template[key] = {}
                  }
                }
              }
              break
            default:
              if (data[key] !== null) {
                this.template[key] = data[key]
              }
          }
        }
      } else {
        this.$message({
          message: result.msg,
          type: 'error'
        })
      }
      this.dataLoading = false
    },
    // 选择应用图标
    selectIcon(app) {
      this.template.icon = app.appIcon
    },
    // 格式化提交数据
    formatTemplateData() {
      let matchIcon = find(iconList, { value: this.template.icon })
      let icon = JSON.stringify({
        value: matchIcon.value,
        code: matchIcon.code
      })
      let configData =
        this.template.configData === null
          ? ''
          : JSON.stringify(this.template.configData)
      return Object.assign({}, this.template, { icon, configData })
    },
    // 格式化价格
    formatPrice() {
      let num = +this.template.price
      if (isNaN(num) || num < 0) {
        num = 0
      }
      this.template.price = num.toFixed(2)
    },
    // 提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let formatData = this.formatTemplateData()
          console.log(formatData)
          this.submitLoading = true
          let result = await HTTP_ADMIN.saveOrUpdateTemplate(formatData)
          this.submitLoading = false
          if (+result.code === 0) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$router.push({ name: 'template' })
          } else {
            this.$message({
              message: result.msg,
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '表单数据校验失败',
            type: 'error'
          })
          return false
        }
      })
    },
    // 取消
    cancel() {
      this.$router.push({ name: 'template' })
    },
    // 复制
    copy(refName) {
      this.$refs[refName].select()
      try {
        //进行复制到剪切板
        if (document.execCommand('Copy', 'false', null)) {
          //如果复制成功
          this.$message({
            message: '复制成功',
            type: 'success'
          })
        } else {
          //如果复制失败
          this.$message({
            message: '复制失败',
            type: 'error'
          })
        }
      } catch (err) {
        //如果报错
        this.$message({
          message: '复制错误',
          type: 'error'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.templateForm {
  flex: 1;
  display: flex;
  flex-direction: column;
  &-header {
    flex-shrink: 0;
    .pagTitle-content {
      overflow: hidden;
      padding-right: 30px;
      .tips {
        float: right;
        .s-red {
          font-style: normal;
          color: #e02020;
          margin: 5px;
        }
      }
    }
  }
  &-main {
    flex: 1;
    overflow: auto;
  }
  &-footer {
    flex-shrink: 0;
    padding: 10px 20px;
  }
}
</style>
<style lang="scss">
.templateForm {
  .el-input,
  .el-textarea,
  .el-select {
    width: 100%;
  }
  .el-input-number {
    span {
      line-height: 38px;
    }
    input {
      text-align: left;
    }
    &.is-controls-right {
      width: 100%;
    }
  }
  label {
    font-weight: normal;
    margin: 0;
  }
}
</style>
