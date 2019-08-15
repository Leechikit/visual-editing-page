<template>
 	<div v-if="!controls.isHidden"> 
		<div class="left count">
			<span> {{ controls.displayName }} </span>
		</div>
		<div class="right input">
			<div class="upload-file" @click="openFiles()">
				<Icon type="plus-round" color="#6fd5f7"></Icon>
				<span>点击上传文件</span>
			</div>
			<div class="file-show" v-if="filesNames.length">
				<div v-for="(item, index) in filesNames" :key="index">
					<span style="padding-left: 20px"> {{ item.fileName }} </span>
					<div class="right">
						<span style="cursor: pointer" @click="downFile(item.fileName, item.fileId)">下载</span>
						<span style="margin:0 20px;cursor: pointer" @click="removeFileId(index)">删除</span>
					</div>
				</div>
			</div>
		</div>
		<Modal
      :value="allFilesShow"
      width="1000"
      :mask-closable="false"
      :styles="{top: '20px'}"
      :closable="false">
      <div slot="header">
        <span style="font-size:16px;">个人档案</span>
        <span class="right">
          <Icon type="ios-close-empty" size="26" @click="closeFilesShow" style="cursor:pointer"/>
        </span>
      </div>
      <SelectFiles :allFiles="allFiles" ref="selectFiles" :selectedFiles="selectedFiles" :show="allFilesLoding"/>
      <div slot="footer">
        <Button type="primary" @click="getSelectFiles">
          确定
        </Button>
        <Button @click="closeFilesShow">
          取消
        </Button>
      </div>
    </Modal>
 	</div>
</template>

<script>
import document from '@/api/document.js'
import SelectFiles from '../selectFiles'
export default {
	props: ['controls', 'model', 'index', 'editControls', 'isEdit', 'removeControls'],
	components: {
		SelectFiles
	},
  data () {
    return {
			filesNames: [],
			parFileId: -1,
			userId: true,
			allFilesShow: false,
			allFiles: [],
			allFilesShow: false,
			selectedFiles: [],
			allFilesLoding: false
    }
	},
	watch: {
    controls() {
      if (!Array.isArray(this.controls.value)) {
        this.filesNames = []
      } else {
        this.filesNames = [...this.controls.value]
      }
    },
    filesNames() {
      this.controls.value = this.filesNames.map(item => item.fileId).join(';')
    }
  },
	methods: {
		openFiles() {
      this.allFiles = []
      this.allFilesShow = true
      this.selectedFiles = [...this.filesNames]
      this.allFilesLoding = true
      var params = {
        needUser: this.userId,
        parFileId: this.parFileId
      }
      document.getSubFiles(params).then(res => {
        if (res.code == 0) {
          res.info.forEach(item => {
            var data = {
              fileId: item.fileId,
              fileName: item.fileName,
              type: item.type ,
            }
            if (item.type === '1') {
              data.loading = false,
              data.children = []
            }
            this.allFiles.unshift(data)
          })
        } else {
          this.$Message.error('获取文件列表失败');
        }
      }).catch(() => {
        this.$Message.error('获取文件列表失败');
      }).finally(() => {
        this.allFilesLoding = false
      })
		},
		downFile(name, id) {
			let params = {
        fileId: id,
        fileName: name,
        path: '/ctg-workflow/'
      }
      document.download(params)
		},
		removeFileId(index) {
			this.filesNames.splice(index, 1)
		},
		closeFilesShow() {
      this.allFilesShow = false
		},
		getSelectFiles() {
			this.filesNames = this.selectedFiles
			this.allFilesShow = false
		}
	},
	created() {
    if (!Array.isArray(this.controls.value)) {
      this.filesNames = []
    } else {
      this.filesNames = [...this.controls.value]
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
		margin-bottom:5px
	}
	.file-show {
    width: 100%;
    border:2px solid #e5e5e5;
		border-radius: 5px;
		margin-bottom:5px;
    >div{
      border-bottom:1px solid #e5e5e5;
      height:30px;
      line-height: 30px;
      .right{
        height:30px;
        line-height: 30px;
      }
    }
    &:nth-last-child(1){
      border-bottom:0
    }
  }
</style>