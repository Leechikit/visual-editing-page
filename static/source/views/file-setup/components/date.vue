<template>
  <div> 
    <div class="left count" @click="edit">
      <i class="iconfont iconbianji1" v-if="!isEdit && !controls.isRequired"></i>
			<i class="iconfont iconbianji-tianchong" v-if="isEdit && !controls.isRequired" style="color:#4A90E2 "></i>
      <span> {{ controls.displayName }} </span>
      <Icon v-if="controls.isRequired" type="ios-medical" size="12px" color="red"/>
    </div>
    <div class="right input">
      <DatePicker type="date" :editable="false" :placeholder="controls.placeHolder" :format="controls.format" style="width: 100%"></DatePicker>
    </div>
  </div>
</template>

<script>
export default {
  props: ['controls', 'model', 'index', 'editControls', 'isEdit'],
  data () {
    return {
    }
  },
  watch: {
    'controls.format'() {
      if (this.controls.format === 'yyyy-MM-dd') {
        this.controls.placeHolder = '年-月-日'
      } else if (this.controls.format === 'yyyy-MM') {
        this.controls.placeHolder = '年-月'
      } else if (this.controls.format === 'yyyy') {
        this.controls.placeHolder = '年'
      }
    }
  },
  methods: {
		edit() {
			this.editControls(this.model, this.index)
		}
	}
}
</script>
<style lang='less' scoped>
  .left{
		float:left;
	}
	.right{
		float:right
	}
	.input{
		width: 70%;
	}
	.count{
		line-height: 36px;
		cursor: pointer;
	}
</style>
