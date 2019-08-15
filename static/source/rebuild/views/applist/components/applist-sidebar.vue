<template>
  <div class="applist-sidebar">
    <div class="search-input">
      <el-input
        placeholder="请输入搜索内容"
        v-model="searchValue"
        prefix-icon="el-icon-search"
        clearable
        @change="filterList"
        @clear="filterList;"
      >
      </el-input>
    </div>
    <div class="sidebar-list">
      <dl v-for="(item, $index) in list" :key="$index">
        <dt
          v-if="item.type === 'group' && item.children.length"
          class="sidebar-list-item sidebar-list-group"
          @click="toggleGroup($index)"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconLwenjian"></use>
          </svg>
          <span
            class="text"
            :title="item.moduleName"
            v-text="item.moduleName"
          ></span>
        </dt>
        <dt
          v-if="item.type === 'app'"
          class="sidebar-list-item sidebar-list-app"
          :class="item.appId == currentId ? 's-active' : ''"
          @click="openApp(item.type, item.appId, item.appName)"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconwendang"></use>
          </svg>
          <span class="text" :title="item.appName" v-text="item.appName"></span>
        </dt>
        <dt
          v-if="item.type === 'report'"
          class="sidebar-list-item sidebar-list-app"
          :class="item.reportId == currentId ? 's-active' : ''"
          @click="openApp(item.type, item.reportId, item.reportName)"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconjilu"></use>
          </svg>
          <span
            class="text"
            :title="item.reportName"
            v-text="item.reportName"
          ></span>
        </dt>
        <template v-for="app in item.children">
          <dd
            v-if="app.type === 'app'"
            :key="app.appId"
            v-show="item.expand"
            class="sidebar-list-item sidebar-list-group-app"
            :class="app.appId == currentId ? 's-active' : ''"
            @click="openApp(app.type, app.appId, app.appName)"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconwendang"></use>
            </svg>
            <span class="text" :title="app.appName" v-text="app.appName"></span>
          </dd>
          <dd
            v-if="app.type === 'report'"
            :key="app.reportId"
            v-show="item.expand"
            class="sidebar-list-item sidebar-list-group-app"
            :class="app.reportId == currentId ? 's-active' : ''"
            @click="openApp(app.type, app.reportId, app.reportName)"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconjilu"></use>
            </svg>
            <span
              class="text"
              :title="app.reportName"
              v-text="app.reportName"
            ></span>
          </dd>
        </template>
      </dl>
    </div>
  </div>
</template>
<script>
import { find } from 'lodash'
export default {
  name: 'ApplistSidebar',
  props: {
    moduleName: {
      type: String,
      default: '测试'
    },
    appList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      list: this.appList,
      currentId: '',
      searchValue: ''
    }
  },
  watch: {
    appList() {
      this.list = this.appList
    }
  },
  methods: {
    // 展开文件夹
    toggleGroup(index) {
      this.appList[index].expand = !this.appList[index].expand
    },
    // 展开文件夹
    expandGroup(appId) {
      for (let i = 0, len = this.appList.length; i < len; i++) {
        const children = this.appList[i].children
        if (
          children &&
          children.length > 0 &&
          (find(children, { appId }) || find(children, { reportId: appId }))
        ) {
          this.appList[i].expand = true
          break
        }
      }
    },
    // 打开应用
    openApp(appType, appId, appName) {
      this.$emit('open', { appType, appId, appName })
    },
    // 改变当前id
    changeCurrId(id) {
      this.expandGroup(id)
      this.currentId = id
    },
    // 输入搜索后过滤列表
    filterList() {
      if (this.searchValue === '') {
        this.list = this.appList
      } else {
        let result = []
        this.appList.forEach(item => {
          // 分组
          if (
            item.type === 'group' &&
            item.children &&
            item.children.length > 0
          ) {
            item.children.forEach(child => {
              if (
                child.type === 'app' &&
                child.appName.indexOf(this.searchValue) !== -1
              ) {
                result.push(child)
              } else if (
                child.type === 'report' &&
                child.reportName.indexOf(this.searchValue) !== -1
              ) {
                result.push(child)
              }
            })
          } else if (
            item.type === 'app' &&
            item.appName.indexOf(this.searchValue) !== -1
          ) {
            result.push(item)
          } else if (
            item.type === 'report' &&
            item.reportName.indexOf(this.searchValue) !== -1
          ) {
            result.push(item)
          }
        })
        this.list = result
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/rebuild/assets/style/base.scss';
.sidebar-list {
  &-item {
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 25px;
    color: $color-normal;
    cursor: pointer;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    // overflow: hidden;
    // outline: none;
    // text-decoration: none;
    &:hover {
      background-color: #eaf2ff;
    }
    .text {
      font-size: $font-size-main;
    }
    .icon {
      font-size: 16px;
      margin-right: 10px;
    }
  }
  &-group {
    &-app {
      padding-left: 38px;
    }
  }
  .s-active {
    color: $color-main;
    background-color: #eaf2ff;
  }
}
</style>
<style lang="scss">
@import '@/rebuild/assets/style/base.scss';
.applist-sidebar {
  .search-input {
    margin-bottom: 20px;
    input {
      border: none;
      background-color: #f5f5f5;
      &::-webkit-input-placeholder {
        color: $color-remind;
      }
    }
    .el-input__prefix {
      color: $color-remind;
    }
  }
}
</style>
