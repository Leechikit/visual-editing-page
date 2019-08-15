<template>
 	<div>
    <Modal
			v-model="modalShow"
			:mask-closable="false"
			title="设置分管人员"
			@on-ok="ok"
			@on-cancel="cancel">
			<div class="title"> 
				<span> 审批顺序从上到下排序 </span>
				<Button size="small" style="float:right;" @click="addPersonnel"> 添加 </Button>
			</div>
			<div v-if="this.list.length === 0">
				暂无分管人员
			</div>
			<Draggable
				:list="list"
				:options="options">
				<div v-for="(item, index) in list" :key="index" class="list">
					<span> {{ item.userName }} </span>
					<div class="icon">
						<Icon type="trash-b" color="red" @click="removePersonnel(index)"></Icon>
						<Icon type="arrow-move"></Icon>
					</div>
				</div>
			</Draggable>
			<Spin size="large" fix v-if="userShow"></Spin>
    </Modal>
		<Modal
			v-model="pickModel"
			title="添加分管人员"
			@on-ok="addOk"
			@on-cancel="addCancel">
			<Pick :list="list" :addUser="addUser" :removeUser="removeUser"/>
    </Modal>
 	</div>
</template>

<script>
import Draggable from "vuedraggable";
import Pick from './pick'
import Organ from '@/api/organ'
export default {
	props: ['show', 'close', 'organId'],
	components: {
		Draggable,
		Pick
	},
  data () {
    return {
			userShow: false,
			modalShow: false,
			list: [],
			oldList: [],
			pickModel: false
    }
	},
	computed: {
		options () {
			return {
				forceFallback: true,
				fallbackClass: 'move-item'
			}
		}
	},
	methods: {
		ok () {
			var params = {
				id: this.organId,
				masterIdList: this.list.map(item => item.id)
			}
			Organ.updateOrganMaster(params).then(data => {
				if (data.code === '0') {
					this.$Message.success('修改成功')
				} else {
					this.$Message.error(data.msg)
				}
			}).catch(e => {
				this.$Message.error(e)
			}).finally(() => {
				this.close()
			})
		},
		cancel () {
			this.close()
		},
		removePersonnel (index) {
			this.list.splice(index, 1)
		},
		addPersonnel () {
			this.pickModel = true
			this.oldList = [...this.list]
		},
		addOk () {
			// this.list = [...this.newList]
		},
		addCancel () {
			this.list = [...this.oldList]
		},
		addUser (user) {
			this.list.push(user)
		},
		removeUser (id) {
			this.list = this.list.filter(item => item.id !== id)
		}
	},
	created () {
		this.modalShow = this.show
		var params = {
			organId: this.organId
		}
		this.userShow = true
		Organ.queryMasters(params).then(data => {
			if (data.code === '0') {
				this.list = data.masters
			} else {
				this.$Message.error(data.msg)
			}
		}).catch(e => {
			this.$Message.error(e)
		}).finally(() => {
			this.userShow = false
		})
	}
}
</script>
<style lang='less' scoped>
	.title{
		border-bottom: 1px solid #ccc;
		padding-bottom: 10px;
	}
	.list{
		line-height:30px;
		border:1px solid #eee;
		margin-bottom:5px;
		padding:0 20px
	}
	.icon{
		float:right;
		line-height:30px;
		i{
			margin:0 5px;
			cursor: pointer;
		}
	}
	.move-item{
		background: #fff;
		opacity: 0;
	}
</style>
