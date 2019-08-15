<template>
	<div> 
		<div class="search">
			<input type="text" style="width: 100%;padding-left:20px !important;height: 34px;" v-model="keyword" @input="searchUser" placeholder='搜索人员'  />
			<span style="position: absolute;right: 18px;top: 10px;" v-show="!keyword"><Icon type="ios-search-strong"></Icon></span>
			<span style="position: absolute;right: 18px;top: 10px;"  v-show="keyword" @click="resetUserSearch"><Icon type="ios-search-strong"></Icon></span>
		</div>
		<div class="user-organ" v-show="!keyword">
			<div class="left">
				<Tree :data="department" :load-data="getDepartment" @on-select-change="selectNode"></Tree>
			</div>
			<div class="right" v-show="!keyword">
				<div v-if="childUsers.length === 0" style="line-height:37px;">
					该部门下无成员
				</div>
				<ul else>
					<li v-for="(user, index) in childUsers" :key="user.id" @click="toggleCheck(user, index, 'childUsers')">
						<span class="node-name"> {{ user.userName }} </span>
						<div class="chk-contanier" >
							<Checkbox :value="user.active"></Checkbox>
						</div>
					</li>
				</ul>
				<Spin size="large" fix v-if="userShow"></Spin>
			</div>
		</div>
		<div class="search-container" v-show="keyword">
			<div v-if="searchedResults.length === 0" style="line-height:37px">
				暂无数据
			</div>
			<ul v-else>
				<li v-for="(user,index) in searchedResults" :key="index + user.id" @click="toggleCheck(user, index, 'searchedResults')">
					<span class="node-name">{{user.userName + ' - ' + user.organName}}</span>
					<div class="chk-contanier" >
						<Checkbox :value="user.active"></Checkbox>
					</div>
				</li>
			</ul>
			<Spin size="large" fix v-if="searchUserShow"></Spin>
		</div>
	</div>
</template>

<script>
	import organReq from '@/api/organ.js';
	import userReq from '@/api/user.js';
	export default {
		props: ['list', 'addUser', 'removeUser'],
		data () {
			return {
				keyword: '',
				department: [
					{
						title: '总部门',
						loading: false,
						id: this.$store.state.user.companyId,
						children: []
					}
				],
				organId: this.$store.state.user.companyId,
				childUsers: [],
				searchedResults: [],
				userShow: false,
				searchUserShow: false
			}
		},
		watch: {
			organId() {
				this.getUserList()
			},
			keyword() {
				if (this.keyword !== '') {
					this.filterUsers()
				}
			},
			list() {
				this.childUsers.forEach(item => {
					if (this.list.some(ite => ite.id === item.id)) {
						item.active = true
					} else {
						item.active = false
					}
				})
				this.searchedResults.forEach(item => {
					if (this.list.some(ite => ite.id === item.id)) {
						item.active = true
					} else {
						item.active = false
					}
				})
			}
		},
		methods: {
			searchUser() {
				if(!this.keyword){
					return;
				}
				// this.filterUsers(0, 500, this.keyword);
			},
			resetUserSearch () {
				this.keyword = null;
			},
			async getDepartment (item, callback) {
				let param = {
					pid: item.id
				};
				try {
					let res = await organReq.getChildList(param);
					let organList = res.page.result;
					if (res.page.total === '0') delete(item.children);
					let childList = [];
					organList.forEach(function (item) {
						let child = {
							title: item.name,
							id: item.id
						}
						if(item.HasChild === true){
							child.loading= false;
							child.children = [];
						}
						childList.push(child);
					});
					callback(childList);
				} catch (e) {
					console.log(err);
				}
			},
			selectNode (node) {
				this.organId = node[0].id
			},
			getUserList () {
				this.userShow = true
				var params = {
					organId: this.organId
				}
				userReq.getUserList(params).then(res => {
					res.page.result.forEach(item => {
						if (this.list.some(ite => ite.id === item.id)) {
							item.active = true
						}
					})
					this.childUsers = res.page.result;
				}).catch(err => {
					console.error(err);
					this.$Message.error('This is an error');
				}).finally(() => {
					this.userShow = false
				});
			},
			async filterUsers(){
				this.searchUserShow = true
				let data = await userReq.searchUserByName({userName: this.keyword});
				data.userList.forEach(item => {
					if (this.list.some(ite => ite.id === item.id)) {
						item.active = true
					}
				})
				this.searchedResults = data.userList;
				this.searchUserShow = false
			},
			toggleCheck (user, index, name) {
				if (user.active) {
					this.$set(this[name], index, {...this[name][index], active: false})
					this.removeUser(user.id)
				} else {
					this.$set(this[name], index, {...this[name][index], active: true})
					var params = Object.assign({}, user)
					delete params.active
					this.addUser(params)
				}
			}
		},
		created () {
			this.getUserList()
		}
	}
</script>
<style lang='less' scoped>
	.search{
		position: relative
	}
	.user-organ{
		overflow:hidden;
		.left, .right{
			float: left;
			max-height: 400px;
			overflow-y: auto;
			width: 50%;
			padding:0 20px
		}
		.right{
			position: relative;
			li{
				overflow:hidden;
				height:37px;
				.node-name{
					position: absolute;
					width: calc(~'100% - 40px');
					z-index: 1;
					line-height:37px;
				}
				.chk-contanier{
					float:right
				}
			}
		}
	}
	.search-container{
		max-height: 400px;
		overflow-y: auto;
		position: relative;
		li{
			overflow:hidden;
			height:37px;
			padding:0 20px;
			.node-name{
				position: absolute;
				width: calc(~'100% - 40px');
				z-index: 1;
				line-height:37px;
			}
			.chk-contanier{
				float:right
			}
		}
		li:hover{
			background: #e8f4fe
		}
	}
</style>
