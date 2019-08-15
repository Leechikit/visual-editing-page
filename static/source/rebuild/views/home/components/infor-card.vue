<template>
  <div class="wrapp">
    <div class="wrapp-title">
      <span class="iconfont iconLbiaojixiangqing"></span>
      <span class="infor-intro-mainText">{{ data.text }}</span>
    </div>
    <div class="wrapp-main">
      <div
        v-for="(item, index) in checkValue"
        :key="index"
        class="wrapp-main-show"
        :style="{ width: 100 / checkValue.length - 8 + '%' }"
      >
        <count-up
          class="infor-card-count user-created-count"
          :id-name="item.header + data.text"
          :end-val="item.body"
          :color="'#327DFF'"
          :countSize="countSize"
          :countWeight="countWeight"
        />
        <p class="infor-intro-text" slot="intro">{{ item.header }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import countUp from './countUp.vue'

export default {
  name: 'inforCard',
  data() {
    return {
      checkValue: []
    }
  },
  components: {
    countUp
  },
  props: {
    idName: String,
    endVal: Number,
    color: String,
    iconType: String,
    introText: String,
    data: Object,
    countSize: {
      type: String,
      default: '24px'
    },
    countWeight: {
      type: Number,
      default: 700
    }
  },
  mounted() {
    for (var i = 0; i < this.data.thead[0].tr.length; i++) {
      this.checkValue.push({
        header: this.data.thead[0].tr[i].text,
        body: parseInt(this.data.tbody[0].tr[i].text)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapp {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 4px;
  .wrapp-title {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    i,
    span {
      font-size: 16px;
      color: #464646;
    }
    .iconfont {
      color: #327dff;
      float: left;
      font-size: 24px;
      line-height: 60px;
      margin-right: 4px;
    }
    .infor-intro-mainText {
      font-weight: 550;
    }
  }
  .wrapp-main {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: calc(100% - 72px);
    text-align: center;
    .wrapp-main-show {
      height: 100px;
      padding-top: 20px;
      &:hover {
        background: #f5f5f5;
        border-radius: 4px;
      }
    }
    p {
      font-size: 14px;
      color: #787878;
    }
  }
}
.wrapp:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}
</style>
