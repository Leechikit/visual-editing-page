<template>
 <div v-if="!controls.isHidden"> 
	<div class="left count"  @click="edit">
		<span> {{ controls.displayName }} </span>
		<Icon v-if="controls.isRequired" type="ios-medical" size="12px" color="red"/>
	</div>
	<div class="right input">
		<Select v-model="controls.value" style="width:100%" placeholder="--请选择--">
			<Option v-for="item in controls.optionalValue" :value="item.label" :key="item.value">{{ item.label }}</Option>
		</Select>
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
