<template>
 	<div v-if="!controls.isHidden"> 
		<div class="left count" @click="edit">
			<span> {{ controls.displayName }} </span>
			<Icon v-if="controls.isRequired" type="ios-medical" size="12px" color="red"/>
		</div>
		<div class="right input">
			<Input v-model="controls.value" type="textarea" autosize style="width: 100%" :placeholder="controls.placeHolder"/>
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
		width: 85.3%;
	}
	.count{
		line-height: 36px;
		cursor: pointer;
	}
</style>
