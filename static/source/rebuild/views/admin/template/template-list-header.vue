<template>
  <div class="templateListHeader">
    <section>
      <div class="button-list">
        <el-button type="primary" size="small" @click="$emit('createTemplate')"
          >创建模板</el-button
        >
      </div>
      <div class="option-list">
        <div>
          <el-cascader
            placeholder="请选择分类"
            size="small"
            clearable
            v-model="categoryId"
            :options="serachOptions"
            @change="serachChange"
          ></el-cascader>
        </div>
        <div class="normal-search">
          <el-input
            placeholder="请输入模板名称搜索"
            v-model="templateName"
            clearable
            size="small"
            style="width: 200px;"
          ></el-input>
          <el-button
            type="primary"
            icon="iconfont iconsousuo"
            class="search-btn"
            @click="handleAdvanceSearch"
          ></el-button>
        </div>
        <div>
          <el-button @click="refresh"
            ><span class="iconfont iconshuaxin"></span
          ></el-button>
        </div>
        <!-- <div
          class="advance-search__show advance-search__show-before"
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
        </div> -->
      </div>
    </section>
    <!-- <section>
      <div v-if="advanceSearchVisible" class="advance-search">
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
    </section> -->
  </div>
</template>
<script>
import HTTP_ADMIN from '@/rebuild/api/admin'
export default {
  name: 'TemplateListHeader',
  props: {
    // 应用id
    appId: {
      type: String
    }
  },
  data() {
    return {
      templateName: '', // 模板名称
      categoryId: [],
      serachOptions: [
        {
          label: '业务分类',
          value: 'hangye',
          children: []
        },
        {
          label: '行业分类',
          value: 'yewu',
          children: []
        }
      ]
      // advanceSearchVisible: false, // 高级搜索显示
      // nameSchema: '', // 搜索数据标题
      // dateRange: null, // 搜索日期
      // queryItem: {} // 高级查询
    }
  },
  watch: {
    appId() {
      this.resetData()
    }
  },
  methods: {
    serachChange() {
      this.$emit('changeSearchParams')
    },
    // 重置数据
    resetData() {
      this.startUserName = ''
      this.advanceSearchVisible = false
      // this.resetAdvanceSearch()
    },
    // // 重置高级搜索
    // resetAdvanceSearch() {
    //   this.nameSchema = ''
    //   this.dateRange = null
    //   this.queryItem = {}
    // },

    // 高级搜索搜索按钮
    handleAdvanceSearch() {
      // let startTime = ''
      // let endTime = ''
      // if (this.dateRange && this.dateRange.length === 2) {
      //   startTime = this.formatDate(this.dateRange[0])
      //   endTime = this.formatDate(this.dateRange[1])
      // }
      // if (this.startUserName && this.startUserName.trim() !== '') {
      //   this.queryItem.startUserName = this.startUserName
      // }
      // this.$emit('search', {
      // nameSchema: this.nameSchema,
      // startTime,
      // endTime,
      //   queryItem: this.queryItem
      // })
      this.$emit('changeSearchParams')
    },
    // // 格式化日期
    // formatDate(date) {
    //   return date ? new Date(date).getTime() : ''
    // }
    refresh() {
      this.$emit('changeSearchParams')
    }
  },
  created() {
    HTTP_ADMIN.getCategory({ categoryId: '00001' }).then(res => {
      if (res.code === '0') {
        this.serachOptions[0].children = res.category.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
        this.serachOptions[0].children = [
          { label: '全部', value: '00001' },
          ...this.serachOptions[0].children
        ]
      } else {
        this.$message.error(res.msg)
      }
    })
    HTTP_ADMIN.getCategory({ categoryId: '00002' }).then(res => {
      if (res.code === '0') {
        this.serachOptions[1].children = res.category.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
        this.serachOptions[1].children = [
          { label: '全部', value: '00002' },
          ...this.serachOptions[1].children
        ]
      } else {
        this.$message.error(res.msg)
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import '~@/rebuild/assets/style/base.scss';
.templateListHeader {
  section {
    margin-bottom: 12px;
    overflow: hidden;
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
      height: 32px;
      width: 32px;
    }
  }
  .el-button--default {
    padding: 7px 7px;
    height: 32px;
    width: 32px;
    span {
      color: #327dff;
    }
  }
}
.advance-search {
  border: 1px solid #e7e7e7;
  margin: 10px 0;
  padding: 15px 15px 0;
}
</style>
