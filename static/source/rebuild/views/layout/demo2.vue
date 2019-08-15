<template>
  <div class="demo2">
    <Nav opacity="1" display="none"></Nav>
    <div class="g-container-column">
      <div class="g-header u-bd-bottom">
        <PageTitle text="PAGE TITLE"></PageTitle>
      </div>
      <div class="g-main">
        <div class="g-container">
          <div class="g-aside u-bd-right u-pd-20-30"></div>
          <div class="g-main u-pd-20-20"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageTitle from '@/rebuild/components/pageTitle'
import Nav from '@/rebuild/components/nav'

export default {
  name: 'demo1',
  components: {
    Nav,
    PageTitle
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@import '~@/rebuild/assets/style/base.scss';
@import '~@/rebuild/assets/style/layout.scss';
.demo2 {
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
}
</style>
