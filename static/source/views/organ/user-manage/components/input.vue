<template>
 	<div v-if="!controls.isHidden"> 
		<div class="left count" @click="edit">
			<span> {{ controls.displayName }} </span>
			<Icon v-if="controls.isRequired" type="ios-medical" size="12px" color="red"/>
		</div>
		<div class="right input" :class="{long: controls.style === 'long-input'}">
			<Input v-model="controls.value" v-if="!isDisabled()" :placeholder="controls.placeHolder" style="width: 100%"/>
			<Input v-model="controls.value" v-else disabled :placeholder="controls.placeHolder" style="width: 100%"/>
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
		},
		isDisabled() {
			if (this.controls.columnName === 'user_name' || this.controls.columnName === 'organ_name') {
			 	return true
			} else {
				return false
			}
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
	.long{
		width: 85.3%;
	}
	.count{
		line-height: 36px;
		cursor: pointer;
	}
</style>
