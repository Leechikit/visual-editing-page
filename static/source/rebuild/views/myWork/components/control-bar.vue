<template>
  <div style="padding: 10px 20px 0;">
    <div class="control-bar">
      <Dropdown
        v-if="renderType"
        v-model="renderType"
        :options="renderOptions"
        class="render-type"
      ></Dropdown>
      <div
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
      <div class="normal-search">
        <el-input
          placeholder="请输入表单名称"
          v-model="appRunName"
          size="mini"
          clearable
          style="width: 200px;"
        ></el-input>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-search"
          class="search-btn"
          @click="emitSearch"
        ></el-button>
      </div>
    </div>
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
        <el-form-item label="应用名称">
          <el-popover
            v-model="visible"
            placement="right"
            width="400"
            trigger="click"
          >
            <AppTree v-model="selectedApp" class="app-tree"></AppTree>
            <el-input
              slot="reference"
              size="small"
              :value="selectedAppName"
              placeholder="请选择"
            ></el-input>
          </el-popover>
        </el-form-item>
        <el-form-item label="发起人">
          <div
            class="addroleusers-userselect"
            id="startApprovalId"
            data-ismultiple="true"
            data-uservisible="true"
            data-orgunitvisible="false"
            data-width="100%"
          ></div>
        </el-form-item>
      </el-form>
      <el-form :inline="true" label-width="80px">
        <el-form-item label=" ">
          <el-button type="primary" size="small" @click="emitSearch">
            搜索
          </el-button>
          <el-button plain size="small" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import AppTree from '@/views/flow-manager/components/apptree'
import Dropdown from '@/rebuild/components/dropdown'

export default {
  name: 'ControlBar',
  components: {
    AppTree,
    Dropdown
  },
  model: {
    prop: 'value',
    event: 'switch'
  },
  props: {
    value: [String, Number],
    options: Array
  },
  mounted() {
    this.startApproval = $('#startApprovalId').RoleFormMultiUser({
      appendBody: false
    })
  },
  // 暂时为了解决发起人选择框，选择问题
  updated() {
    let content = $('#startApprovalId').find(
      '.form-control.form-user-add.icon-arrow-down-full'
    )
    if (!content.length) {
      this.startApproval = $('#startApprovalId').RoleFormMultiUser({
        appendBody: false
      })
    }
  },
  data() {
    return {
      advanceSearchVisible: false,
      renderOptions: [
        { id: 'block', label: '块状', icon: 'iconquanbu' },
        { id: 'list', label: '列表', icon: 'iconcaidanleimu' }
      ],
      renderType: this.value,
      appRunName: '',
      startApproval: null,
      visible: false,
      nameSchema: '',
      dateRange: null,
      selectedApp: []
    }
  },
  computed: {
    selectedAppName() {
      let appName = []
      this.selectedApp.forEach(app => {
        appName.push(app.title)
      })
      return appName.join(', ')
    }
  },
  watch: {
    selectedApp() {
      this.visible = false
    },
    renderType(val) {
      this.$emit('switch', val)
    }
  },
  methods: {
    handleReset() {
      this.nameSchema = ''
      this.dateRange = null
      this.selectedApp = []
      if (this.startApproval) this.startApproval.ClearChoices()
    },
    emitSearch() {
      this.$emit('search', {
        appRunName: this.appRunName,
        nameSchema: this.nameSchema,
        dateRange: this.dateRange,
        selectedApp: this.selectedApp,
        approvalIds: this.startApproval && this.startApproval.GetUnitIDs()
      })
    },
    resetAll() {
      this.appRunName = ''
      this.handleReset()
    }
  }
}
</script>

<style lang="scss" scoped>
.control-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & .render-type {
    padding: 5px 20px;
  }

  & .advance-search__show {
    color: $color-main;
    padding: 5px 20px;
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
      user-select: none;
    }
  }

  & .advance-search__btn-act {
    background-color: rgba(50, 125, 255, 0.1);
  }

  & .normal-search {
    margin-left: 20px;

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
}

.app-tree {
  height: 80vh;
  overflow: auto;
}
</style>

<style lang="scss">
#startApprovalId {
  width: 300px;

  .icon-arrow-down-full {
    border-style: dashed !important;
    border-color: #ccc;
    line-height: 24px;
    display: block;
  }
}
</style>
