<template>
 <div class="information-car"> 
		<div class="car-top">
			<Row>
				<div style="margin:0 auto">
					<Upload :action="uploadUrl" :before-upload="checkName" :on-success="updateLogo" name="fileToUpload" :show-upload-list="false" :on-error="error" :with-credentials="true">
						<div style="width:80px;height:80px;border-radius:50%;text-align:center;overflow:hidden" title="点击图片可更换图片">
							<Icon v-if="!logoUrl" type="person" size="70"></Icon>
							<img v-else :src="logoUrl" alt="" height="100%" width="100%"/>
						</div>
					</Upload>
				</div>
      </Row>
			<Row>
				<Col span="6">
					<div class="name"> 姓名 </div>
				</Col>
				<Col span="6"> 
					<div class="value"> {{ userName | changeValue }} </div>
				</Col>
				<Col span="6">
					<div class="name"> 登录名 </div>
				</Col>
				<Col span="6"> 
					<div class="value"> {{ loginName | changeValue }} </div>
				</Col>
			</Row>
			<Row>
				<Col span="6">
					<div class="name"> 手机号 </div>
				</Col>
				<Col span="6"> 
					<div class="value"> {{ phone | changeValue }} </div>
				</Col>
				<Col span="6">
					<div class="name"> 邮箱 </div>
				</Col>
				<Col span="6"> 
					<div class="value"> {{ email | changeValue }} </div>
				</Col>
			</Row>
			<Row>
				<Col span="6">
					<div class="button" @click="handleSubmitShow"> 修改密码 </div>
				</Col>
			</Row>
		</div>
		<div class="car-main">
			<div class="title">
				档案信息
			</div>
			<div class="main-show">
				<div class="model" :class="{hidden: params.basicInformation.isHidden}">
					<div class="title">
						<span>
							{{ params.basicInformation.title }}
						</span>
					</div>
					<div
						v-for="(item, ind) in params.basicInformation.controls"
						:key="ind"
						:class="[getClass(item.style), {hidden: item.isHidden}]">
            <div class="left count">
              <span> {{ item.displayName }} </span>
            </div>
            <div class="right">
              <span> {{ item.value | changeValue }} </span>
            </div>
          </div>
				</div>
				<div class="model" :class="{hidden: params.identityInformation.isHidden}">
					<div class="title">
						<span>
							{{ params.identityInformation.title }}
						</span>
					</div>
					<div
						v-for="(item, ind) in params.identityInformation.controls"
						:key="ind"
						:class="[getClass(item.style), {hidden: item.isHidden}]">
            <div class="left count">
              <span> {{ item.displayName }} </span>
            </div>
            <div class="right">
              <span> {{ item.value | changeValue }} </span>
            </div>
          </div>
				</div>
				<div class="model" :class="{hidden: params.educationalInformation.isHidden}">
					<div class="title">
						<span>
							{{ params.educationalInformation.title }}
						</span>
					</div>
					<div
						v-for="(item, ind) in params.educationalInformation.controls"
						:key="ind"
						:class="[getClass(item.style), {hidden: item.isHidden}]">
            <div class="left count">
              <span> {{ item.displayName }} </span>
            </div>
            <div class="right">
              <span> {{ item.value | changeValue }} </span>
            </div>
          </div>
				</div>
				<div class="model" :class="{hidden: params.contaInformation.isHidden}">
					<div class="title">
						<span>
							{{ params.contaInformation.title }}
						</span>
					</div>
					<div
						v-for="(item, ind) in params.contaInformation.controls"
						:key="ind"
						:class="[getClass(item.style), {hidden: item.isHidden}]">
            <div class="left count">
              <span> {{ item.displayName }} </span>
            </div>
            <div class="right">
              <span> {{ item.value | changeValue }} </span>
            </div>
          </div>
				</div>
				<div class="model" :class="{hidden: params.memberFamily.isHidden}">
					<div class="title">
						<span>
							{{ params.memberFamily.title }}
						</span>
					</div>
					<div
						v-for="(item, ind) in params.memberFamily.controls"
						:key="ind"
						:class="[getClass(item.style), {hidden: item.isHidden}]">
            <div class="left count">
              <span> {{ item.displayName }} </span>
            </div>
            <div class="right">
              <span> {{ item.value | changeValue }} </span>
            </div>
          </div>
				</div>
				<div class="model" :class="{hidden: params.contractInformation.isHidden}">
					<div class="title">
						<span>
							{{ params.contractInformation.title }}
						</span>
					</div>
					<div
						v-for="(item, ind) in params.contractInformation.controls"
						:key="ind"
						:class="[getClass(item.style), {hidden: item.isHidden}]">
            <div class="left count">
              <span> {{ item.displayName }} </span>
            </div>
            <div class="right">
              <span> {{ item.value | changeValue }} </span>
            </div>
          </div>
				</div>
				<div class="model" :class="{hidden: params.entryIntoThePost.isHidden}">
					<div class="title">
						<span>
							{{ params.entryIntoThePost.title }}
						</span>
					</div>
					<div
						v-for="(item, ind) in params.entryIntoThePost.controls"
						:key="ind"
						:class="[getClass(item.style), {hidden: item.isHidden}]">
            <div class="left count">
              <span> {{ item.displayName }} </span>
            </div>
            <div class="right">
              <span> {{ item.value | changeValue }} </span>
            </div>
          </div>
				</div>
				<div class="model" :class="{hidden: params.leavingInformation.isHidden}">
					<div class="title">
						<span>
							{{ params.leavingInformation.title }}
						</span>
					</div>
					<div
						v-for="(item, ind) in params.leavingInformation.controls"
						:key="ind"
						:class="[getClass(item.style), {hidden: item.isHidden}]">
            <div class="left count">
              <span> {{ item.displayName }} </span>
            </div>
            <div class="right">
              <span> {{ item.value | changeValue }} </span>
            </div>
          </div>
				</div>
				<div class="model" :class="{hidden: params.additionalInformation.isHidden}">
					<div class="title">
						<span>
							{{ params.additionalInformation.title }}
						</span>
					</div>
					<div
						v-for="(item, ind) in params.additionalInformation.controls"
						:key="ind"
						:class="[getClass(item.style), {hidden: item.isHidden}]">
            <div class="left count">
              <span> {{ item.displayName }} </span>
            </div>
            <div class="right">
              <span> {{ item.value | changeValue }} </span>
            </div>
          </div>
				</div>
			</div>
		</div>
    <Modal v-model="modal" width="350" :mask-closable="false">
      <p slot="header" style="font-weight: normal;font-size: 16px;">
        <Icon type="ios-gear" size="16"></Icon>
        修改密码
      </p>
      <div class="form-con">
        <Form ref="loginForm" :model="form" :rules="rules" >
          <FormItem prop="oldPassWord">
            <Input type="password" v-model="form.oldPassWord" placeholder="请输入旧密码">
              <span slot="prepend">
                <Icon :size="14" type="locked" color="#0096EC"></Icon>
              </span>
            </Input>
          </FormItem>
          <FormItem prop="newPassWord">
            <Input type="password" v-model="form.newPassWord" placeholder="请输入新密码">
              <span slot="prepend">
                <Icon :size="14" type="locked" color="#0096EC"></Icon>
              </span>
            </Input>
          </FormItem>
          <FormItem prop="reNewPassword">
            <Input type="password" v-model="form.reNewPassword" placeholder="请确认新密码">
              <span slot="prepend">
                <Icon :size="14" type="locked" color="#0096EC"></Icon>
              </span>
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <!-- <Button size="large" @click="handleSubmit" type="primary" long>修改</Button> -->
        <Button type="primary" :loading="loading" @click="handleSubmit" size="large" long :disabled="loading">
          <span v-if="!loading"> 修改 </span>
          <span v-else> 修改中 </span>
        </Button>
      </div>
    </Modal >
		<Spin size="large" fix v-if="spinShow"></Spin>
 </div>
</template>

<script>
import User from '@/api/user.js'
import Organ from '@/api/organ.js'
import WorkFlow from '@/api/work-flow.js'
import userReq from '@/api/user.js'
import axios from 'axios'
export default {
  data () {
    return {
			params: {
				basicInformation: {
					title: '基本信息',
					isHidden: true,
					controls: []
				},
				identityInformation: {
					title: '身份信息',
					isHidden: true,
					controls: []
				},
				educationalInformation: {
					title: '教育信息',
					isHidden: true,
					controls: []
				},
				contaInformation: {
					title: '联系信息',
					isHidden: true,
					controls: []
				},
				memberFamily: {
					title: '家庭成员',
					isHidden: true,
					controls: []
				},
				contractInformation: {
					title: '合同信息',
					isHidden: true,
					controls: []
				},
				entryIntoThePost: {
					title: '入职转正',
					isHidden: true,
					controls: []
				},
				leavingInformation: {
					title: '离职原因',
					isHidden: true,
					controls: []
				},
				additionalInformation: {
					title: '附加信息',
					isHidden: true,
					controls: []
				},
			},
			userName: '',
			loginName: '',
			phone: '',
			email: '',
			organName: '',
			uploadUrl: '',
			iconId: '',
			userId: '',
			logoUrl: '',
      form: {
        oldPassWord:'',
        newPassWord: '',
        reNewPassword: ''
      },
      rules: {
        oldPassWord: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        newPassWord: [
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        reNewPassword: [
          { required: true, message: '再次输入新密码不能为空', trigger: 'blur' }
        ]
      },
      modal: false,
      spinShow: true,
      loading: false
    }
	},
	filters: {
		changeValue (item) {
			return item ? item : '--'
		}
	},
	methods: {
		handleSubmitShow () {
			this.modal = true
    },
    async handleSubmit() {
      this.loading = true
      try {
        const valid = await this.$refs.loginForm.validate()
        if (!valid) return
        if (this.form.newPassWord != this.form.reNewPassword) {
          this.$Message.error('该用户两次输入新密码不一致，请重新输入！')
          return
        }

        let result = await userReq.modifyUserPassWord({
          oldPassWd:this.form.oldPassWord,
          newPassWd: this.form.newPassWord
        })
        if (result.code === '-1') {
          this.$Message.error('错误：' + result.msg)
        } else if (result.code === '0') {
          this.$Message.success(
            '密码修改成功'
          )
          this.modal = false
        } else {
          this.$Message.error(result.msg)
        }
      } catch (err) {
        console.log(err)
        this.$Message.error('This is an error')
      } finally {
        this.loading = false
      }
    },
		async init() {
			try {
        let userDetail = await User.detail()
				this.userName = userDetail.user.userName
				this.loginName = userDetail.user.loginName
				this.phone = userDetail.user.phone
				this.email = userDetail.user.email
				this.organName = userDetail.user.organName
				this.logoUrl = userDetail.user.photo
				this.userId = userDetail.user.id

				let userInfor = await Organ.dynamicDetail()
				if (!userInfor.data) {
					let detail = await Organ.detail()
					let sta = detail.staffRecord
					var personalFilesData = {}
					if (sta) {
						personalFilesData = sta
					}
					userInfor.data = {
						basicInformation: {
							title: '基本信息',
							isHidden: false,
							controls: [
								{type: 'controlsInput', displayName: '员工姓名', style: 'short-input', placeHolder: '', columnName:"user_name", isHidden: false, isRequired: true},
								{type: 'controlsInput', displayName: '工号', style: 'short-input', placeHolder: '', columnName:"job_number", isHidden: false},
								{type: 'controlsInput', displayName: '所属部门', style: 'short-input', placeHolder: '', isHidden: false, isRequired: true, columnName:"organ_name"},
								{type: 'controlsInput', displayName: '岗位', style: 'short-input', placeHolder: '', isHidden: false, isRequired: true, columnName:"job"},
								{type: 'controlsDate', displayName: '调整日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isHidden: false, columnName:"ajust_time"},
								{type: 'controlsInput', displayName: '当前月薪', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"month_salary"},
								{type: 'controlsSelect', displayName: '在职状态', optionalValue: [{value: '1option', label: '在职'},{value: '2option', label: '离职'}], isRequired: true, isHidden: false, columnName:"status"},
							]
						},
						identityInformation: {
							title: '身份信息',
							isHidden: false,
							controls: [
								{type: 'controlsInput', displayName: '身份证号', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"id_card_number"},
								{type: 'controlsSelect', displayName: '性别', optionalValue: [{ value: '1option', label: '男' },{ value: '2option', label: '女' },], isRequired: true, isHidden: false, columnName:"gender"},
								{type: 'controlsInput', displayName: '籍贯', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"native_place"},
								{type: 'controlsInput', displayName: '民族', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"nation"},
								{type: 'controlsSelect', displayName: '婚姻', optionalValue: [{ value: '1option', label: '未婚' },{ value: '2option', label: '已婚' }], isRequired: true, isHidden: false, columnName:"marriage_status"},
								{type: 'controlsDate', displayName: '出生日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isHidden: false, columnName:"birth_time"},
								{type: 'controlsInput', displayName: '身份证地址', style: 'long-input', placeHolder: '', isHidden: false, columnName:"id_card_address"},
								{type: 'controlsInput', displayName: '现地址', style: 'long-input', placeHolder: '', isHidden: false, columnName:"current_address"},
							]
						},
						educationalInformation: {
							title: '教育信息',
							isHidden: false,
							controls: [
								{type: 'controlsInput', displayName: '毕业院校', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"academy"},
								{type: 'controlsSelect', displayName: '学历', optionalValue: [{ value: '1option', label: '高中' },{ value: '2option', label: '大专' },{ value: '3option', label: '本科' },{ value: '4option', label: '硕士' },{ value: '5option', label: '博士' },], isRequired: true, isHidden: false, columnName:"education"},
								{type: 'controlsInput', displayName: '专业', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"major"},
								{type: 'controlsSelect', displayName: '学历来源', optionalValue: [{ value: '1option', label: '学信网' }], isHidden: false, columnName:"education_source"},
							]
						},
						contaInformation: {
							title: '联系信息',
							isHidden: false,
							controls: [
								{type: 'controlsInput', displayName: '紧急联系人', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"emergency_contact"},
								{type: 'controlsInput', displayName: '紧急联系人关系', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"emergency_contact_relation"}
							]
						},
						memberFamily: {
							title: '家庭成员',
							isHidden: false,
							controls: [
								{type: 'controlsTable', displayName: '家庭成员信息', style: 'long-input', isRequired: true, isHidden: false, columnName:"family_data"}
							]
						},
						contractInformation: {
							title: '合同信息',
							isHidden: false,
							controls: [
								{type: 'controlsRadio', displayName: '合同类型', style: 'long-input', isRequired: true, isHidden: false, columnName:"contract_type"},
								{type: 'controlsDate', displayName: '签订日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isRequired: true, isHidden: false, columnName:"contract_time"},
								{type: 'controlsInput', displayName: '试用期', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"probation_period"},
								{type: 'controlsDate', displayName: '最新签订日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isRequired: true, isHidden: false, columnName:"contract_current_time"},
								{type: 'controlsInput', displayName: '试用月薪', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"probation_salary"},
								{type: 'controlsInput', displayName: '转正月薪', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"regular_salary"},
								{type: 'controlsTextarea', displayName: '当前奖金方案', style: 'long-input', placeHolder: '', isHidden: false, columnName:"bonus_scheme"},
								{type: 'controlsFile', displayName: '合同信息', style: 'long-input', placeHolder: '', isHidden: false, columnName:"contract_file"},
							]
						},
						entryIntoThePost: {
							title: '入职转正',
							isHidden: false,
							controls: [
								{type: 'controlsDate', displayName: '入职日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isRequired: true, isHidden: false, columnName:"entry_time"},
								{type: 'controlsDate', displayName: '转正日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isRequired: true, isHidden: false, columnName:"turn_time"},
							]
						},
						leavingInformation: {
							title: '离职原因',
							isHidden: false,
							controls: [
								{type: 'controlsDate', displayName: '离职日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isHidden: false, columnName:"leave_time"},
								{type: 'controlsTextarea', displayName: '离职原因', style: 'long-input', placeHolder: '', isHidden: false, columnName:"leave_reason"},
							]
						},
						additionalInformation: {
							title: '附加信息',
							isHidden: false,
							showFile: true,
							controls: [
								{type: 'controlsFile', displayName: '详细简历附件', style: 'long-input', placeHolder: '', isHidden: false, columnName:"resume_file"},
								{type: 'controlsTextarea', displayName: '附加说明', style: 'long-input', placeHolder: '', isHidden: false, columnName:"additional_information"},
							]
						}
					}
					Object.keys(userInfor.data).forEach(item => {
						userInfor.data[item].controls = userInfor.data[item].controls.filter(ite => {
							var name = ite.columnName.replace(/\_(\w)/g, function(all, letter){
								return letter.toUpperCase();
							});
							if (personalFilesData[name]) {
								ite.value = personalFilesData[name]
								return ite
							} else {
								return ite
							}
						})
					})
				}
				Object.keys(userInfor.data).forEach(item => {
					userInfor.data[item].controls = userInfor.data[item].controls.filter(ite => {
						if (ite.type === 'controlsFile' || ite.type === 'controlsTable') {
							return  false
						} else {
							return true
						}
					})
				})
				Object.keys(userInfor.data).forEach(item => {
					if (userInfor.data[item].controls.length === 0) {
						userInfor.data[item].isHidden = true
					} else {
						userInfor.data[item].controls = userInfor.data[item].controls.map(ite => {
							if (ite.columnName === 'user_name') {
								ite.value = this.userName
								return ite
							} else if (ite.columnName === 'organ_name') {
								ite.value = this.organName
								return ite
							} else if (ite.type === 'controlsDate') {
								if (ite.value) {
									ite.value = ite.format ? ite.value.substring(0, ite.format.length) : 'N'
									ite.value = ite.value.includes('N') ? null : ite.value
								}
								return ite
							} else {
								return ite
							}
						})
					}
				})
				this.params = {
					...this.params,
					...userInfor.data
				}
				this.spinShow = false
			} catch (e) {
				console.log(e)
				this.$Message.error('This is err');
				this.spinShow = false
			}
    },
    getClass(style) {
			var _style = ['long-input']
			return _style.indexOf(style) >= 0 ? 'model-control-row' : 'model-control-half'
		},
		updateLogo(data) {
			this.logoUrl = `${axios.defaults.baseURL}/Form/downloadFile/` + data.AttachmentId
			var params = {
				iconId: data.AttachmentId,
				userId: this.userId
			}
			this.$parent.changePhoto(this.logoUrl)
			Organ.updateIcon(params).then(res => {
				if (res.code === '0') {
					this.$Message.success('更换头像成功')
				} else {
					this.$Message.error(res.msg)
				}
			}).catch(e => {
				this.$Message.error(e)
			})
		},
		checkName(file) {
			if (file.name.includes(',')) {
				this.$Message.error('图片名不能出现逗号","')
				return false
			} else {
				return true
			}
		},
		error(data) {
			this.$Message.error(data.msg)
		}
	},
	created() {
		this.init()
		this.uploadUrl = `${axios.defaults.baseURL}/Form/SheetAttachmentAction?fileUsage=company_logo`
	}
}
</script>
<style lang='less' scoped>
	.left{
		float: left;
		width: 50%;
		text-align: right;
		padding-right: 50px;
	}
	.right{
		float: left;
		width: 50%;
		text-align: left;
		font-size:12px;
		line-height: 36px;
	}
	.information-car{
		&:hover{
			box-shadow: 0 1px 6px rgba(0,0,0,.2);
		}
		width: 800px;
		border-radius: 5px;
		text-align: center;
		margin: 20px auto;
		border:1px solid #e9eaec;
		padding: 20px;
		.car-top{
			border-bottom:1px solid #e9eaec;
			padding-bottom:50px;
			.name{
				width:60%;
				height: 34px;
				line-height: 30px;
				margin:5px auto;
			}
			.value{
				width:80%;
				height: 34px;
				line-height: 30px;
				margin:5px auto;
				text-align: left;
      }
      .button{
        cursor:pointer;
        border:1px solid #dddee1;
        background-color: #f7f7f7;
        border-radius:3px;
        width:80px;
        height:32px;
        margin:0 auto;
        text-align: center;
        line-height:30px;
      }
		}
		.car-main{
			>.title{
				font-size: 18px;
				text-align: center;
			}
			.main-show{
				background: #fff;
        padding:20px 20px;
        .hidden{
          display: none;
        }
				.model{
          margin-bottom: 30px;
          overflow:hidden;
          .model-control-half{
            width:50%;
            float:left;
          }
          .model-control-row{
            width:100%;
            float:left;
            .left{
              width: 25%;
            }
            .right{
              width: 75%;
            }
          }
					.title{
						border-bottom:1px solid #eee;
						height: 26px;
						font-weight: 900;
						margin-bottom: 30px
					}
					.count{
						line-height: 36px;
					}
					.count-left{
						width:100%;
						padding-right:50px
					}
					.count-right{
						width:100%;
						padding-right:50px;
						line-height:24px;
						padding-top:6px;
					}
				}
			}
    }
	}
</style>
