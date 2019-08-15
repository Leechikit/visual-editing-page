<template>
 	<div> 
		<div class="left count" @click="edit">
			<i v-if="!controls.isHidden" class="iconfont iconjian" style="color:#EF9840" @click="hiddenFile"></i>
			<i v-else class="iconfont iconjia-tianchong" style="color:#EF9840" @click="showFile"></i>
			<span> {{ controls.displayName }} </span>
		</div>
		<div class="right input">
			<div class="upload-file">
				<Icon type="plus-round" color="#6fd5f7"></Icon>
				<span>点击上传文件</span>
			</div>
		</div>
 	</div>
</template>

<script>
export default {
	props: ['controls', 'model', 'index', 'editControls', 'isEdit', 'removeControls'],
  data () {
    return {
    }
	},
	methods: {
		hiddenFile() {
			this.controls.isHidden = true
		},
		showFile() {
			this.controls.isHidden = false
		},
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
	.upload-file{
		cursor: pointer;
		padding:10px 0;
		width:100%;
		background:#F9FAFB;
		text-align:center;
		border-radius:5px;
		border:1px dashed #eee;
		margin-bottom:5px;
	}
</style>