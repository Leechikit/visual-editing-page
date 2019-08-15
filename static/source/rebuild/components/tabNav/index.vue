<template>
  <div class="tabNav">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      :closable="editableTabs.length > 1"
      @tab-click="clickHandle"
      @tab-remove="removeHandle"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :name="item.name"
      >
        <el-tooltip
          slot="label"
          effect="dark"
          :content="item.title"
          :disabled="getStrLength(item.title) < 34"
          placement="bottom"
        >
          <span class="el-tabs__text">{{ item.title }}</span>
        </el-tooltip>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { findIndex, find } from 'lodash'
import { getStrLength } from '@/rebuild/helper/util-helper'
export default {
  name: 'tabNav',
  data() {
    return {
      editableTabsValue: '',
      editableTabs: [],
      tabIndex: 0,
      getStrLength: getStrLength
    }
  },
  methods: {
    /**
     * changeTab 改变标签（父组件调用）
     *
     * @param: {String} tabId 标签id
     * @param: {String} tabName 标签显示名称
     * @param: {String} params 标签自定义信息
     */
    changeTab({ tabId: name, tabName: title, params }) {
      // 导航中已经该标签
      const tabIndex = findIndex(this.editableTabs, { name })
      if (tabIndex > -1) {
        let tab = this.editableTabs[tabIndex]
        this.editableTabsValue = name
        tab.title = title || tab.title
        for (let key in tab.params) {
          if (params[key] !== void 0) {
            tab.params[key] = params[key]
          }
        }
        // 导航中没有该标签
      } else {
        this.editableTabs.push({ name, title, params })
        this.editableTabsValue = name
      }
    },
    /**
     * deleteTab 删除标签（父组件调用）
     *
     * @param: {String} delTabId 删除tabId
     * @param: {String} goTabId 跳转tabId
     */
    deleteTab({ delTabId, goTabId }) {
      let tabs = this.editableTabs
      const delTabIndex = findIndex(tabs, { name: delTabId })
      if (delTabIndex < 0) return
      const { title: delTabName, params: delParams } = find(tabs, {
        name: delTabId
      })
      this.editableTabs = tabs.filter(tab => tab.name !== delTabId)
      if (goTabId !== void 0 && findIndex(tabs, { name: goTabId }) > -1) {
        this.editableTabsValue = goTabId
      } else {
        let activeName = this.editableTabsValue
        if (activeName === delTabId) {
          tabs.forEach((tab, index) => {
            if (tab.name === delTabId) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.editableTabsValue = activeName
      }
      const { title: goTabName, params: goParams } = find(tabs, {
        name: this.editableTabsValue
      })
      /**
       * $emit deleteTab
       *
       * @param: {Object} { tabId, tabName, params } 删除tab信息
       * @param: {Object} { tabId, tabName, params } 跳转tab信息
       */
      this.$emit(
        'deleteTab',
        { tabId: delTabId, tabName: delTabName, params: delParams },
        { tabId: goTabId, tabName: goTabName, params: goParams }
      )
    },
    /**
     * emptyTab 清空标签（父组件调用）
     *
     */
    emptyTab() {
      this.editableTabsValue = ''
      this.editableTabs = []
    },
    // 点击标签回调
    clickHandle({ name }) {
      const { name: tabId, title: tabName, params } = find(this.editableTabs, {
        name
      })
      this.$emit('selectTab', { tabId, tabName, params })
    },
    // 删除标签回调
    removeHandle(targetName) {
      this.deleteTab({ delTabId: targetName })
    }
  }
}
</script>
<style lang="scss" scoped>
.tabNav {
  margin-bottom: -16px;
}
</style>
<style lang="scss">
@import '~@/rebuild/assets/style/base.scss';
// 修改组件样式
.tabNav {
  .el-tabs__nav {
    overflow: hidden;
  }
  .el-tabs__header {
    .el-tabs__item {
      background: #fff;
      &.is-active {
        color: $color-main;
      }
      .el-tabs__text {
        display: inline-block;
        max-width: 200px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        vertical-align: middle;
      }
    }
  }
}
</style>
