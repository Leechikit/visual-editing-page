<template>
  <div class="companySelect" v-if="visible">
    <el-dialog
      title="请选择企业"
      width="400px"
      :visible.sync="visible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="company">
          <Select v-model="form.company">
            <Option
              v-for="item in companyList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          :loading="loading"
          @click="submit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import HTTP_WORKFLOW from '@/api/work-flow'

export default {
  name: 'companySelect',
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: {
        company: ''
      },
      rules: {
        company: [{ required: true, message: '请选择企业' }]
      },
      companyList: [],
      loading: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      let result = await HTTP_WORKFLOW.getCompanyList()
      if (+result.code === 0) {
        this.companyList = result.result
        if (this.companyList && this.companyList.length > 0) {
          this.form.company = this.companyList[0].id
        }
        console.log(this.companyList)
      }
    },
    close() {
      this.$emit('close')
    },
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true
          HTTP_WORKFLOW.eadpSetCompany({
            companyId: this.form.company
          }).then(() => {
            this.close()
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.companySelect {
  position: relative;
  z-index: 3000;
}
</style>
