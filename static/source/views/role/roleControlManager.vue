<template>
	<div class="role-control-manager">
	    <!-- 保存权限设置 -->
		<div class="role-save">
		    <a class="btn btn-primary  Role_Head_Button" id="Role_SaveRole" data-toggle="dropdown" @click="saveRoleControl(true)">
		        <span class="operattion">保存</span>
		    </a>
		</div>
		<div class="roleacls" style="overflow: auto; visibility: visible;">
		   <div class="roleacls-content">
		      <div class="roleacls-header">
		        <div class="roleacls-app">应用列表</div>
						<!-- <div class="roleacls-app"> 应用分组 </div> -->
		        <ul class="roleacls-category">
		            <li class="checked-all"  style="width:218px;">表单列表</li>
		            <li class="roleacls-form" style="width:70%;border-right:1xp solid #d7d5d5">表单控件列表</li>
		        </ul>
		      </div>
		        <div class="app-content">
		          <!-- 应用列表 -->
		          <ul class="roleacls-acls" :style="'height:'+(containerH - 120)+'px'">
		            <li
		            	v-for="(acl, index) in aclsList"
		            	:key="acl.id"
		            	:class="{'active_div': appCurrentIndex === index}"
		            	@click="selectApp(acl, index)"
		                class="apppackage-node-li roletoggle">
		              <a class="apppackage-node-a" :data-code="acl.id">
		                <b v-if="acl.hasAcl" class="icon-get"></b>
		                <b v-if="!acl.hasAcl" class="icon-none"></b>
		                <label :title="acl.Name">{{acl.moduleName}}</label>
		              </a>
		            </li>
		          </ul>
							<!-- <ul class="roleacls-acls" :style="'height:'+(containerH - 120)+'px'">
		            应用分组
		          </ul> -->
		          <!-- 应用表单列表 -->
		          <div class="app-formlist" :style="'height:'+(containerH - 120)+'px'">
		              <div class="not-data" v-show="noDataFlag">
		                  <img src="../../images/meiyoushuju.png" width="152" height="180">
		                  <p>选择应用 开始配置权限</p>
		              </div>
		              <ul class="formlist" v-show="!noDataFlag">
		                <!-- 需要配置权限的表单、报表 -->
		                <li
		                  v-for="(sheet, index) in formlistData"
		                  :key="sheet.appId"
		                  class="sheet-node-li">
		                  <a class="sheet-node-a">
		                    <div class='roletogglesheet'>
		                      <i class='icon-arrow-down-role roletogglesheet hideli'></i>
		                     <!--  <input
		                     	v-if="roleId===adminRoleId"
		                     	class='roletogglesheet'
		                     	type='checkbox'
		                       :disabled="true"
		                       :checked="true"
		                       :id="sheet.appId + '_input_control'"/> -->
		                      <input
		                      	v-model="sheet.checked"
		                      	class='roletogglesheet'
		                      	type="checkbox"
		                      	ref="formCheck"
		                        :disabled="false"
		                        :id="sheet.appId + '_input_control'"/>
		                      <label :for="sheet.appId + '_input_control'">
		                      	{{sheet.name}}
		                      </label>
		                    </div>
		                  </a>
		                  <ul class='appcontent-ul'>
		                    <!-- 表单权限 -->
		                    <li class='sheet-node-childnode' style="width:100%">
		                      	<div class='sheet-acl-action'>
			                      	<div
			                       	  	v-if="!sheet.controls.length"
			                       	  	class="roleactioncontainer">
			                       	  	 该表单暂时没有控件
			                       	</div>
			                        <div v-else class='sheet-checkall'>
				                         <!-- <input
				                           v-if="roleId===adminRoleId"
				                           :id="sheet.appId + '_sheetcheckall'"
				                           type='checkbox'
				                           class='checkall'
				                           :disabled="true"
				                           :checked="true"/> -->
				                         <input
				                           :checked="sheet.checkAll"
				                           :id="sheet.appId + '_sheetcheckall'"
				                           type='checkbox'
				                           class='checkall'
				                           :disabled="!sheet.checked"
				                           @click="checkAllFormControl(sheet)"
				                           :ref="sheet.appId + '_all'"/>
				                         <label :for="sheet.appId + '_sheetcheckall'">全选</label>
			                        </div>
			                        <div
			                            v-for="control in sheet.controls"
			                            :key="control.controlId"
			                            class="roleactioncontainer">
			                            <input
			                              v-if="roleId===adminRoleId"
			                              :id="sheet.appId + '_' + control.controlId + '_form_control'"
			                              type="checkbox"
			                              :checked="true"
			                              :disabled="true"/>
			                            <input
			                              v-else
			                              v-model="control.checked"
			                              :id="sheet.appId + '_' + control.controlId + '_form_control'"
			                              type="checkbox"
			                              @change="checkFormControl(sheet, control)"
			                              :disabled="!sheet.checked"/>
			                            <label :for="sheet.appId + '_' + control.controlId + '_form_control'">{{control.controlName}}</label>
			                        </div>
		                        </div>
		                    </li>
		                  </ul>
		                </li>
		              </ul>
		          </div>
		      </div>
		   </div>
	  	</div>
		<!-- 是否保存 -->
	    <save-acl
	       :showSaveAclFlag="showSaveAclFlag"
	       @closeSaveAclModall="dealModal"
	       @confirmSaveAcl="dealModal">
	    </save-acl>
  	</div>
</template>

<script>
	import saveAcl from './saveAcl'; //引入权限未保存，是否保存弹窗
	import formApi from '@/api/form.js'; // 引入数据拉取接口
	import {
	  GetAppPackageChildrenAcl,
	  saveRoleControlApi,
	  getByAppIdAndGroupIdApi
	} from '@/api/role.js'; // 引入数据拉取接口
	export default {
	    name: 'roleControlManager',
	    components: {
	    	saveAcl
	    },
	    props: {
	        roleId: String,
	        adminRoleId: String,
	        containerH: Number,
	        aclsList: Array
	    },
	    data () {
	        return {
	        	showSaveAclFlag: false, // 是否保存flag
	            appCurrentIndex: 0, // 选中当前模块的index
	            noDataFlag: false, // 是否有数据
	            selectModuleId: null, // 选中当前模块id
	            formlistData: [], // 保存模块下数据
	            selectAddControls: [], // 保存数据
	            hasSelectedControls: [] // 已经保存的数据
	        };
	    },
	    computed: {
	    	// 过滤已经取消的原有角色表单权限
	    	hasSelectedFilterControls: {
	    		cache: false,
	    		get () {
	    			return this.hasSelectedControls.filter(item => item.flag);
	    		}
	    	},
	    	// 标记是否修改原来的表单角色权限
	    	hasChangeControl: {
	    		cache: false,
	    		get () {
	    			return !!this.selectAddControls.length || (this.hasSelectedFilterControls.length !== this.hasSelectedControls.length)
	    		}
	    	}
	    },
	    watch: {
	    	aclsList: function(value) {
	    		this.appCurrentIndex = 0;
	    		this.selectApp(value[this.appCurrentIndex], this.appCurrentIndex);
				},
				roleId() {
					this.getByAppIdAndGroupId(this.selectModuleId);
				}
	    },
	    methods: {
	    	// 处理用户是否保存选择框
	    	async dealModal (isSave) {
	    		if (isSave) {
	    			await this.saveRoleControl();
	    		}
	    		this.selectModuleId = this.currentSelectModuleId;
	    		this.getByAppIdAndGroupId(this.selectModuleId);
	    		this.showSaveAclFlag = false;
	    	},
	        selectApp (app, index) {
	        	this.appCurrentIndex = index;
	        	this.currentSelectModuleId = app.id;
	        	if (this.hasChangeControl) {
	        		this.showSaveAclFlag = true;
	        	} else {
	        		this.selectModuleId = app.id;
	        		this.getByAppIdAndGroupId(app.id);
	        	}
	        },
	        // 选择所有控件
	        checkAllFormControl (sheet) {
	        	sheet.checkAll = !sheet.checkAll;
        		sheet.controls.forEach(control => {
        			control.checked = sheet.checkAll;
        			this.checkFormControl(sheet, control);
        		})
	        },
	        // 选择单个控件
	        checkFormControl (sheet, control) {
	        	// 取消全选
	        	if (!control.checked) {
	        		sheet.checkAll = false;
	        	}
	        	// 首先判断是否在已有数据中
	        	let findControl = this.hasSelectedControls.find(item => (item.appId === sheet.appId && item.controlId === control.controlId))
	        	if (findControl) {
	        		findControl.flag = control.checked;
	        		return
	        	}
	        	// 判断是否选中
	        	if (control.checked) {
	        		this.selectAddControls.push({
	        			flag: true,
	        			moduleId: this.selectModuleId,
	        			roleId: this.roleId, // 当前角色id
	        			appId: sheet.appId, // 表单id
        				controlId: control.controlId // 控件id
	        		})
	        	} else {
	        		this.selectAddControls.some((item, index) => {
	        			if (item.appId === sheet.appId &&
	        				item.controlId === control.controlId) {
	        				this.selectAddControls.splice(index, 1);
	        				return true;
	        			}
	        			return false;
	        		})
	        	}
	        	console.log(this.selectAddControls);
	        },
	        // 根据模块id获取该模块下所有表单角色控件权限
	        async getByAppIdAndGroupId (appId) {
	        	let param = {
	        		roleId: this.roleId,
	        		groupId: appId
	        	};
	        	let res = await getByAppIdAndGroupIdApi(param);
	        	if (res.code === '0') {
		           // 获取数据成功
		           	this.formlistData = res.datas;
		           	// 判断是否有数据
		           	this.noDataFlag = false;
			     	if (!this.formlistData || this.formlistData.length === 0) {
			     		this.noDataFlag = true;
			     		return
			     	}
		            this.hasSelectedControls.length = 0;
		            this.selectAddControls.length = 0;
		           // 保存已有角色模块表单数据
		            this.formlistData.forEach(sheet => {
		           	   // 如果表单有保存的数据
		           	   if (sheet.checked) {
		           	  	    sheet.controls.forEach(control => {
		           	  	    	if (control.checked) {
		           	  	    		this.hasSelectedControls.push({
			           	  		    	flag: true,
			           	  		    	moduleId: this.selectModuleId,
					        			roleId: this.roleId, // 当前角色id
					        			appId: sheet.appId, // 表单id
				        				controlId: control.controlId // 控件id
		           	  		    	})
		           	  	    	}
		           	  	    })
		           	    }
		            })
		     	}
	        },
	        // 保存角色控件权限
	        async saveRoleControl () {
	        	// 为了处理是否保存弹窗
	        	if (!this.hasChangeControl) {
	        		return
	        	}
	        	// 合并修改
	        	let datas = [...this.hasSelectedFilterControls, ...this.selectAddControls];
	        	let params = {
	        		moduleId: this.selectModuleId,
	        		roleId: this.roleId,
	        		datas: JSON.stringify(datas)
	        	}
	        	let res = await saveRoleControlApi(params);
	        	if (res.code === '0') {
		          	//获取数据成功
		          	this.$Message.info('提示: 保存成功');
		     	} else {
		     		// 获取数据失败
          			this.$Message.error('提示: 保存失败');
		     	}
		     	this.showSaveAclFlag = false;
		     	// 更新
	        	this.hasSelectedControls = datas;
	        	this.selectAddControls.length = 0;
	        }
	    }
	};
</script>


<style scoped>
	@import './role.css';
</style>
