<template>
  <div class="demo1">
    <Nav opacity="1" display="none"></Nav>
    <div class="g-container">
      <div class="g-aside u-bd-right">
        <div class="g-container-column">
          <div class="g-header u-bd-bottom">
            <PageTitle text="PAGE TITLE"></PageTitle>
          </div>
          <div class="g-main u-pd-20-30"></div>
        </div>
      </div>
      <div class="g-main">
        <div class="g-container-column">
          <div class="g-header">
            <div class="c-tabnav">
              <Tabnav
                ref="tabNav"
                @selectTab="selectTab"
                @deleteTab="deleteTab"
              ></Tabnav>
            </div>
          </div>
          <div class="g-main u-pd-20-20"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageTitle from '@/rebuild/components/pageTitle'
import Nav from '@/rebuild/components/nav'
import Tabnav from '@/rebuild/components/tabNav'

export default {
  name: 'demo1',
  components: {
    Nav,
    Tabnav,
    PageTitle
  },
  data() {
    return {}
  },
  mounted() {
    // 切换或添加导航标签
    this.$refs.tabNav.changeTab({
      tabId: '1',
      tabName: '第一个标签',
      params: { tabType: 'test' }
    })
    this.$refs.tabNav.changeTab({
      tabId: '2',
      tabName: '第二个标签',
      params: { tabType: 'test' }
    })
  },
  methods: {
    // 切换导航标签回调
    selectTab({ tabId, tabName, params }) {
      console.group('切换标签')
      console.dir({ tabId, tabName, params })
      console.groupEnd()
    },
    // 删除导航标签回调
    deleteTab({ tabId: delTaId, tabName: delTabName, params: delParams }) {
      console.group('删除标签')
      console.dir({
        tabId: delTaId,
        tabName: delTabName,
        params: delParams
      })
      console.groupEnd()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/rebuild/assets/style/base.scss';
@import '~@/rebuild/assets/style/layout.scss';
.demo1 {
  height: 100%;
  padding-top: 50px;
  background-color: #fff;
  .u-bd-bottom {
    border-bottom: 1px solid $color-layout-border;
  }
  .u-bd-right {
    border-right: 1px solid $color-layout-border;
  }
  .u-pd-20-20 {
    padding: 20px 20px;
  }
  .u-pd-20-30 {
    padding: 20px 30px;
  }
  .c-tabnav {
    padding: 9px 10px 0;
    border-bottom: 1px solid $color-layout-border;
    background-color: #f5f5f5;
  }
}
</style>
