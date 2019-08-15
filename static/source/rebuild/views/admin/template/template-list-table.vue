<template>
  <div class="templateListTable">
    <el-table
      v-loading="loading"
      :data="list"
      empty-text="尚未创建模板"
      style="width: 100%;"
      stripe
      border
    >
      <el-table-column
        v-for="item in clounms"
        :key="item.props"
        :prop="item.props"
        :label="item.label"
      >
        <template slot-scope="scope">
          <span :title="scope.row[item.props]">{{
            scope.row[item.props]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="buttons">
          <el-button type="text" size="small" @click="edit(buttons.row.id)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="enableTemplate(buttons.row.id, buttons.$index)"
            >启用</el-button
          >
          <el-button
            type="text"
            size="small"
            style="color:#E66346"
            @click="disableTemplate(buttons.row.id, buttons.$index)"
            >停用</el-button
          >
          <!-- <el-button
            type="text"
            size="small"
            @click="delColumn(buttons)"
            style="color:#E66346"
            >删除</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
    <div class="templateList-pagination">
      <el-pagination
        @size-change="changePageSize"
        @current-change="changePageNum"
        :small="true"
        :current-page="pageNum"
        :background="true"
        :page-sizes="[10, 20]"
        :page-size="pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total"
        :pager-count="5"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import HTTP_ADMIN from '@/rebuild/api/admin'
export default {
  name: 'TemplateListTable',
  props: {
    // 搜索参数
    searchParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: true,
      list: [], // 表格数据
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页显示个数
      total: 0, // 总个数
      clounms: [
        {
          props: 'name',
          label: '模板名称'
        },
        {
          props: 'order',
          label: '模板顺序'
        },
        {
          props: 'businessType',
          label: '业务分类'
        },
        {
          props: 'industryType',
          label: '行业分类'
        },
        {
          props: 'createTime',
          label: '创建时间'
        },
        {
          props: 'status',
          label: '状态'
        }
      ],
      status: {
        '0': '已启用',
        '1': '停用'
      }
    }
  },
  watch: {
    searchParams: {
      handler() {
        this.resetData()
        this.getData()
      },
      deep: true
    }
  },
  created() {
    this.resetData()
    this.loading = false
    this.getData()
  },
  methods: {
    // 重置数据
    resetData() {
      this.loading = true
      this.list = []
      this.pageNum = 1
      this.pageSize = 10
      this.total = 0
    },
    // 获取数据
    async getData() {
      this.loading = true
      var params = {
        ...this.searchParams,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      var listRes = await HTTP_ADMIN.getTemlateList(params)
      if (listRes.code === '0') {
        this.list = listRes.page.result.map(item => {
          var businessName = item.busCats.map(item => item.categoryName)
          var industryName = item.indCats.map(item => item.categoryName)
          return {
            id: item.id,
            name: item.name,
            order: item.sort > 0 ? item.sort : '',
            businessType: businessName.join('/'),
            industryType: industryName.join('/'),
            createTime: this.getFormat(item.createTime),
            status: this.status[item.status]
          }
        })
        this.total = listRes.page.total
      } else {
        this.$message.error(listRes.msg)
      }
      this.loading = false
    },
    // 改变当前页数
    changePageNum(num) {
      this.pageNum = num
      this.getData()
    },
    // 改变每页显示个数
    changePageSize(size) {
      this.pageSize = size
      this.getData()
    },
    // delColumn(column) {
    //   this.$confirm('是否确定删除', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       HTTP_ADMIN.delTemplate({ templateId: column.row.id }).then(res => {
    //         if (res.code === '0') {
    //           this.list.splice(column.$index, 1)
    //           this.total--
    //           this.$message.success('删除成功')
    //         } else {
    //           this.$message.error(res.msg)
    //         }
    //       })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    // },
    // 编辑模板
    edit(templateid) {
      this.$router.push({
        name: 'template-form',
        query: {
          templateid
        }
      })
    },
    // 启用模板
    enableTemplate(templateId, templateIndex) {
      this.$confirm('是否确定启用模板', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        HTTP_ADMIN.enableTemplate({ templateId }).then(res => {
          if (res.code === '0') {
            this.list[templateIndex].status = this.status[0]
            this.$message.success('启用成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    // 停用模板
    disableTemplate(templateId, templateIndex) {
      this.$confirm('是否确定停用模板', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        HTTP_ADMIN.disableTemplate({ templateId }).then(res => {
          if (res.code === '0') {
            this.list[templateIndex].status = this.status[1]
            this.$message.success('停用成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    getFormat(number) {
      var date = new Date(number)
      var Y = date.getFullYear()
      var M = date.getMonth() + 1
      var D = date.getDate()
      var h = date.getHours()
      var m = date.getMinutes()
      var s = date.getSeconds()
      return (
        Y +
        '-' +
        this.changeTwoDigits(M) +
        '-' +
        this.changeTwoDigits(D) +
        ' ' +
        this.changeTwoDigits(h) +
        ':' +
        this.changeTwoDigits(m) +
        ':' +
        this.changeTwoDigits(s)
      )
    },
    changeTwoDigits(num) {
      return num > 9 ? '' + num : '0' + num
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/rebuild/assets/style/base.scss';
.templateListTable {
  .status {
    display: inline-block;
    position: relative;
    text-indent: 18px;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      border-radius: 100%;
      overflow: hidden;
    }
    &.s-blue {
      &::before {
        background-color: $color-main;
      }
    }
    &.s-red {
      &::before {
        background-color: $color-error;
      }
    }
    &.s-orange {
      &::before {
        background-color: $color-warn;
      }
    }
    &.s-gray {
      &::before {
        background-color: $color-remind;
      }
    }
  }
}
</style>
