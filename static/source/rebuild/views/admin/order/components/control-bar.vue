<template>
  <div>
    {{ id }}
    <div class="control-bar">
      <div
        class="advance-search__show"
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
          placeholder="请输入eadp订单编号,支持模糊"
          v-model="eadpOrderId"
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
      <el-form :inline="true" label-width="100px">
        <el-form-item label="租户ID">
          <el-input
            v-model="companyId"
            size="small"
            placeholder="请输入租户ID,支持模糊"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建用户ID">
          <el-input
            v-model="createUserId"
            size="small"
            placeholder="请输入创建用户ID,支持模糊"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="日期范围">
          <el-date-picker
            v-model="dateRange"
            type="datetimerange"
            size="small"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd HH:mm"
          >
          </el-date-picker>
        </el-form-item> -->
      </el-form>
      <el-form :inline="true" label-width="100px">
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
export default {
  name: 'ControlBar',
  mounted() {},
  data() {
    return {
      companyId: null,
      createUserId: null,
      eadpOrderId: null,
      advanceSearchVisible: false,
      appRunName: '',
      startApproval: null,
      visible: false
    }
  },
  methods: {
    handleReset() {
      this.companyId = null
      this.createUserId = null
      this.eadpOrderId = null
    },
    emitSearch() {
      this.$emit('search', {
        companyId: this.companyId,
        createUserId: this.createUserId,
        eadpOrderId: this.eadpOrderId
      })
    },
    resetAll() {
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
    padding: 0px 8px;
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
</style>
