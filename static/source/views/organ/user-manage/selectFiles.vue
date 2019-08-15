<template>
 <div>
		<Row>
			<Col span="18" style="border-right:1px solid #eee">
				<Input v-model="text" placeholder="搜索文件" style="width: 250px" @on-change="changeList"/>
				<div class="all-files-show">
					<div v-if="loading">
						<Spin size="large" fix></Spin>
					</div>
					<div v-else-if="text === ''">
						<Tree :data="allFiles" :load-data="subordinate" :render="fileRenderContent"></Tree>
					</div>
					<div v-else>
						<Tree :data="searchResult" :load-data="subordinate" :render="fileRenderContent"></Tree>
					</div>
				</div>
			</Col>
			<Col span="6">
				<div>
					<div class="select-files-show">
						已选择的文件 <div class="jstree-custom-checked"></div>
					</div>
					<div class="none-info-show" v-if="!selected.length">
						<div class="multiPickerDlg_right_no_result">
							<i></i>
						</div>
						<div class="none-info">未选择文件</div>
					</div>
					<div class="selected-list">
						<div v-for="(item, index) in selected" :key="index" style="overflow:hidden">
							<Icon type="ios-paper-outline"></Icon>
							<span :title="item.fileName"> {{ item.fileName }}</span>
							<Icon type="ios-close-empty" @click="removeFile(index)" size="18" style="float:right;cursor:pointer"/>
						</div>
					</div>
				</div>
			</Col>
		</Row>
 </div>
</template>

<script>
import document from '@/api/document.js'
export default {
	props: ['allFiles', 'selectedFiles', 'show'],
  data () {
    return {
			text: '',
			userId: true,
			searchResult: [],
			selected: [],
			loading: true,
    }
	},
	watch: {
		selectedFiles() {
			this.selected = this.selectedFiles 
		},
		show() {
			this.loading = this.show
		}
	},
	methods: {
		subordinate(item, callback) {
			var params = {
				needUser: this.userId,
				parFileId: item.fileId
			}
			document.getSubFiles(params).then(res => {
				res.info.sort((a, b) => {
					return a.type - b.type
				})
				var filesList = []
				res.info.forEach(item => {
					var data = {
						fileId: item.fileId,
						fileName: item.fileName,
						type: item.type,
						path: item.path
					}
					if (item.type === '1') {
						data.loading = false
						data.children = []
					}
					filesList.unshift(data)
        })
				callback(filesList)
			}).catch((e) => {
				console.log(e)
				this.$message.error('获取文件列表失败')
			})
		},
		changeList() {
			if (this.text === '') {

			} else {
				var params = {
					needUser: 'admin',
					fileName: this.text
				}
				document.getFuzzyFileTrees(params).then(res => {
					res.info.sort((a, b) => {
						return a.type - b.type
					})
					this.searchResult = []
					res.info.forEach(item => {
						var data = {
							fileId: item.fileId,
							fileName: item.fileName,
							type: item.type
						}
						if (item.type === '1') {
							data.loading = false,
							data.children = []
						}
						this.searchResult.unshift(data)
					})
				})
			}
		},
		fileRenderContent(h, { root, node, data }) {
			let display = this.selected.some(item => item.fileId === data.fileId) ? 'inline-block' : 'none'
			let	type = 'ios-paper-outline'
			if (data.type === '1') type = 'ios-folder-outline'
			return h(
				'span',
				{
					style: {
						display: 'inline-block',
						width: '80%'
					}
				},
				[
					h('div', [
						h('Icon', {
							props: {
								type: type
							},
							style: {
								marginRight: '8px'
							}
						}),
						h(
							'span',
							{
								props: {},
								style: {
									cursor: 'pointer'
								},
								on: {
									click: () => {
										this.selectFileNode(root, node, data)
									}
								}
							},
							data.fileName
						),
						h('div', {
							class: 'jstree-custom-checked',
							style: {
								display: display
							}
						}),
					])
				]
			)
		},
		selectFileNode(root, node, data){
			let lock = this.selected.some(item => item.fileId === data.fileId)
			if (data.type == 0 && !lock) {
				this.selected.push({
					fileId: data.fileId,
					fileName: data.fileName
				})
			}
		},
		removeFile(index){
			this.selected.splice(index, 1)
		}
	}
}
</script>
<style lang='less' scoped>
	.right{
		float: right
	}
	.all-files-show{
		padding-left: 20px;
		overflow:auto;
		width:300px;
		height:300px;
		font-size:16px;
	}
	.select-files-show{
		padding-left: 20px;
	}
	.none-info-show{
		font-size: 16px;
		.none-info{
			margin-left: 90px;
		}
	}
	.selected-list{
		padding:0 20px;
		margin-top: 20px;
	}
</style>
