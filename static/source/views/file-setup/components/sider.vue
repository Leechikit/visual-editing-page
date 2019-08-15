<template>
 	<div class="sider-box">
		<header>
			<i class="iconfont iconbianji"></i>
			控件属性
		</header>
		<div class="attribute-list">
    	<div v-if="controls.type === 'controlsInput'">
				<div class="attribute">
					<div class="title">
						<span> 控件名称 </span>
						<span class="explain"> 单行文本 </span>
					</div>
					<Input v-model="controls.displayName" />
				</div>
				<div class="attribute">
					<div class="title">
						格式
					</div>
					<Select v-model="controls.style">
						<Option v-for="item in inputStyles" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
				<div class="attribute">
					<div class="title">
						默认提示语
					</div>
					<Input v-model="controls.placeHolder" />
				</div>
			</div>
			<div v-if="controls.type === 'title'">
				<div class="attribute">
					<div class="title">
						<span> 标题名称 </span>
						<span class="explain"> 栏目 </span>
					</div>
					<Input v-model="controls.title" @on-change="changeTitle"/>
				</div>
				<div class="is-hidden">
					<span class="title"> 是否隐藏栏目 </span>
					<i-switch v-model="controls.isHidden" @on-change="removeModel"></i-switch>
				</div>
			</div>
			<div v-if="controls.type === 'controlsSelect'">
				<div class="attribute">
					<div class="title">
						<span> 控件名称 </span>
						<span class="explain"> 下拉框 </span>
					</div>
					<Input v-model="controls.displayName"/>
				</div>
				<div class="attribute">
					<div class="title">
						<span> 选项 </span>
					</div>
					<div v-for="(item, index) in controls.optionalValue" :key="index">
						<Input v-model="item.label" style="width:260px;margin-bottom:10px"/>
						<Icon type="trash-a" size="18px" style="margin-left: 10px;color: red;font-size:18px;cursor: pointer;" @click="removeOption(index)"></Icon>
					</div>
					<div class="add-option" @click="addOption">
						添加选项
					</div>
				</div>
			</div>
			<div v-if="controls.type === 'controlsDate'">
				<div class="attribute">
					<div class="title">
						<span> 控件名称 </span>
						<span class="explain"> 日期 </span>
					</div>
					<Input v-model="controls.displayName" />
				</div>
				<div class="attribute">
					<div class="title">
						格式
					</div>
					<Select v-model="controls.format">
						<Option v-for="item in dateStyles" :value="item.value" :key="item.value" :format="item.value">{{ item.label }}</Option>
					</Select>
				</div>
			</div>
			<div v-if="controls.type === 'controlsTextarea'">
				<div class="attribute">
					<div class="title">
						<span> 控件名称 </span>
						<span class="explain"> 多行文本 </span>
					</div>
					<Input v-model="controls.displayName" />
				</div>
				<div class="attribute">
					<div class="title">
						默认提示语
					</div>
					<Input v-model="controls.placeHolder" />
				</div>
			</div>
			<div v-if="controls.type === 'controlsFile'">
				<div class="attribute">
					<div class="title">
						<span> 控件名称 </span>
						<span class="explain"> 文件上传 </span>
					</div>
					<Input v-model="controls.displayName" />
				</div>
			</div>
			<div v-if="controls.type === 'controlsRadio'">
				<div class="attribute">
					<div class="title">
						<span> 控件名称 </span>
						<span class="explain"> 多行文本 </span>
					</div>
					<Input v-model="controls.displayName" />
				</div>
			</div>
			<div v-if="controls.type && controls.type !== 'title'" class="is-hidden">
				<span class="title"> 是否隐藏组件 </span>
				<i-switch v-model="controls.isHidden"></i-switch>
			</div>
			<div v-if="isNew()" class="remove" @click="remove">
				<i class="iconfont iconjian"></i>
				<span> 删除组件 </span>
			</div>
			<div v-if="!controls.type" style="text-align: center;font-size: 20px;margin-top: 190px;margin-left: 77px;">
				请选择左侧控件
			</div>
		</div>
 	</div>
</template>

<script>
export default {
	props:['controls', 'removeControls', 'updateTitle', 'hiddenModel'],
  data () {
    return {
			inputStyles: [
				{value: 'long-input', label: '长文本'},
				{value: 'short-input', label: '短文本'}
			],
			dateStyles: [
				{value: 'yyyy-MM-dd', label: '年-月-日'},
				{value: 'yyyy-MM', label: '年-月'},
				{value: 'yyyy', label: '年'},
			]
    }
	},
	methods: {
		remove() {
			this.removeControls()
		},
		changeTitle() {
			this.updateTitle(this.controls.title)
		},
		addOption() {
			if (this.controls.optionalValue.length) {
				var index = parseInt(this.controls.optionalValue[this.controls.optionalValue.length - 1].value) + 1
			} else {
				this.controls.optionalValue = []
				index = 0
			}
			this.controls.optionalValue.push({
				label: '选项' + (this.controls.optionalValue.length + 1),
				value: index + 'option'
			})
		},
		removeOption(index) {
			this.controls.optionalValue.splice(index, 1)
		},
		removeModel(boo) {
			this.hiddenModel(boo)
		},
		isNew() {
			if (this.controls.columnName) {
				return this.controls.columnName.indexOf('ext_col_') >= 0
			} else {
				return false
			}
		}
	}
}
</script>
<style lang='less' scoped>
	.sider-box{
		height:100%;
		background: #F8FBFB;
		header{
			line-height: 50px;
			font-size: 18px;
			padding-left: 30px;
			margin-bottom:20px;
			text-align: center;
			border-bottom: 1px solid #ddd;
			i{
				margin-right:10px;
			}
		}
		.attribute-list{
			padding:0 70px 0 30px;
			.attribute{
				.title{
					.explain{
						float:right;
						background: #e9e9e9;
						padding: 0 5px;
						border-radius: 3px;
					}
				}
				.add-option{
					color:#54a8ff;
					cursor: pointer;
				}
			}
			.is-hidden{
				margin-top:10px;
			}
		}
		.remove{
			margin-top:10px;
			color: #EF9840;
			cursor: pointer;
			i{
				margin-right:10px;
			}
		}
	}
</style>
