<template>
 	<div v-if="!controls.isHidden"> 
		<div class="left count" v-if="!controls.isHidden">
			<span>合同类型</span>
			<Icon type="ios-medical" size="12px" color="red"/>
		</div>
		<div class="rigth input" style="margin-left:140px;height:36px">
			<RadioGroup v-model="controls.value" size="small"> 
				<Radio label="固定期限">
					<span> 固定期限 </span>
				</Radio>
				<Radio label="无固定期限">
					<span> 无固定期限 </span>
				</Radio>
			</RadioGroup>
		</div>
 	</div>
</template>

<script>
export default {
  props: ['controls', 'model', 'index', 'editControls', 'isEdit'],
  data () {
    return {
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
		width: 85%;
	}
	.count{
		line-height: 36px;
		cursor: pointer;
	}
</style>
