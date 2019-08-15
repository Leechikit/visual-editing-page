<template>
 	<div class="box">
		<div class="box-show">
			<header>
				档案设置
				<Button type="primary" class="save" @click="save" :loading="saving"> 保存表单 </Button>
			</header>
			<div class="details left">
				<div class="model" :class="{hiddens: params.basicInformation.isHidden}">
					<div class="title">
						<span @click="editTitle('basicInformation')">
							<i class="iconfont iconbianji-tianchong" v-if="model === 'basicInformation' && index === ''" style="color:#4A90E2 "></i>
							<i class="iconfont iconbianji1" v-else></i>
							{{ params.basicInformation.title }}
						</span>
						<div class="add right" @click="chioceControles('basicInformation')">
							<i class="iconfont iconjia-tianchong"></i>
							添加
						</div>
					</div>
					<component
						v-for="(item, ind) in params.basicInformation.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="[getClass(item.style), {hiddens: item.isHidden}]"
						:editControls="editControls"
						model="basicInformation"
						:index="ind"
						:isEdit="model === 'basicInformation' && index === ind"/>
				</div>
				<div class="model" :class="{hiddens: params.identityInformation.isHidden}">
					<div class="title">
						<span @click="editTitle('identityInformation')">
							<i class="iconfont iconbianji-tianchong" v-if="model === 'identityInformation' && index === ''" style="color:#4A90E2 "></i>
							<i class="iconfont iconbianji1" v-else></i>
							{{ params.identityInformation.title }}
						</span>
						<div class="add right" @click="chioceControles('identityInformation')">
							<i class="iconfont iconjia-tianchong"></i>
							添加
						</div>
					</div>
					<component
						v-for="(item, ind) in params.identityInformation.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="[getClass(item.style), {hiddens: item.isHidden}]"
						:editControls="editControls"
						model="identityInformation"
						:index="ind"
						:isEdit="model === 'identityInformation' && index === ind"/>
				</div>
				<div class="model" :class="{hiddens: params.educationalInformation.isHidden}">
					<div class="title">
						<span @click="editTitle('educationalInformation')">
							<i class="iconfont iconbianji-tianchong" v-if="model === 'educationalInformation' && index === ''" style="color:#4A90E2 "></i>
							<i class="iconfont iconbianji1" v-else></i>
							{{ params.educationalInformation.title }}
						</span>
						<div class="add right" @click="chioceControles('educationalInformation')">
							<i class="iconfont iconjia-tianchong"></i>
							添加
						</div>
					</div>
					<component
						v-for="(item, ind) in params.educationalInformation.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="[getClass(item.style), {hiddens: item.isHidden}]"
						:editControls="editControls"
						model="educationalInformation"
						:index="ind"
						:isEdit="model === 'educationalInformation' && index === ind"/>
				</div>
				<div class="model" :class="{hiddens: params.contaInformation.isHidden}">
					<div class="title">
						<span @click="editTitle('contaInformation')">
							<i class="iconfont iconbianji-tianchong" v-if="model === 'contaInformation' && index === ''" style="color:#4A90E2 "></i>
							<i class="iconfont iconbianji1" v-else></i>
							{{ params.contaInformation.title }}
						</span>
						<div class="add right" @click="chioceControles('contaInformation')">
							<i class="iconfont iconjia-tianchong"></i>
							添加
						</div>
					</div>
					<component
						v-for="(item, ind) in params.contaInformation.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="[getClass(item.style), {hiddens: item.isHidden}]"
						:editControls="editControls"
						model="contaInformation"
						:index="ind"
						:isEdit="model === 'contaInformation' && index === ind"/>
				</div>
				<div class="model" :class="{hiddens: params.memberFamily.isHidden}">
					<div class="title">
						<span @click="editTitle('memberFamily')">
							<i class="iconfont iconbianji-tianchong" v-if="model === 'memberFamily' && index === ''" style="color:#4A90E2 "></i>
							<i class="iconfont iconbianji1" v-else></i>
							{{ params.memberFamily.title }}
						</span>
						<div class="add right" @click="chioceControles('memberFamily')">
							<i class="iconfont iconjia-tianchong"></i>
							添加
						</div>
					</div>
					<component
						v-for="(item, ind) in params.memberFamily.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="[getClass(item.style), {hiddens: item.isHidden}]"
						:editControls="editControls"
						model="memberFamily"
						:index="ind"
						:isEdit="model === 'memberFamily' && index === ind"/>
				</div>
				<div class="model" :class="{hiddens: params.contractInformation.isHidden}">
					<div class="title">
						<span @click="editTitle('contractInformation')">
							<i class="iconfont iconbianji-tianchong" v-if="model === 'contractInformation' && index === ''" style="color:#4A90E2 "></i>
							<i class="iconfont iconbianji1" v-else></i>
							{{ params.contractInformation.title }}
						</span>
						<div class="add right" @click="chioceControles('contractInformation')">
							<i class="iconfont iconjia-tianchong"></i>
							添加
						</div>
					</div>
					<component
						v-for="(item, ind) in params.contractInformation.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="[getClass(item.style), {hiddens: item.isHidden}]"
						:editControls="editControls"
						model="contractInformation"
						:index="ind"
						:removeControls="removeControls"
						:isEdit="model === 'contractInformation' && index === ind"/>
				</div>
				<div class="model" :class="{hiddens: params.entryIntoThePost.isHidden}">
					<div class="title">
						<span @click="editTitle('entryIntoThePost')">
							<i class="iconfont iconbianji-tianchong" v-if="model === 'entryIntoThePost' && index === ''" style="color:#4A90E2 "></i>
							<i class="iconfont iconbianji1" v-else></i>
							{{ params.entryIntoThePost.title }}
						</span>
						<div class="add right" @click="chioceControles('entryIntoThePost')">
							<i class="iconfont iconjia-tianchong"></i>
							添加
						</div>
					</div>
					<component
						v-for="(item, ind) in params.entryIntoThePost.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="[getClass(item.style), {hiddens: item.isHidden}]"
						:editControls="editControls"
						model="entryIntoThePost"
						:index="ind"
						:isEdit="model === 'entryIntoThePost' && index === ind"/>
				</div>
				<div class="model" :class="{hiddens: params.leavingInformation.isHidden}">
					<div class="title">
						<span @click="editTitle('leavingInformation')">
							<i class="iconfont iconbianji-tianchong" v-if="model === 'leavingInformation' && index === ''" style="color:#4A90E2 "></i>
							<i class="iconfont iconbianji1" v-else></i>
							{{ params.leavingInformation.title }}
						</span>
						<div class="add right" @click="chioceControles('leavingInformation')">
							<i class="iconfont iconjia-tianchong"></i>
							添加
						</div>
					</div>
					<component
						v-for="(item, ind) in params.leavingInformation.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="[getClass(item.style), {hiddens: item.isHidden}]"
						:editControls="editControls"
						model="leavingInformation"
						:index="ind"
						:isEdit="model === 'leavingInformation' && index === ind"/>
				</div>
				<div class="model" :class="{hiddens: params.additionalInformation.isHidden}">
					<div class="title">
						<span @click="editTitle('additionalInformation')">
							<i class="iconfont iconbianji-tianchong" v-if="model === 'additionalInformation' && index === ''" style="color:#4A90E2 "></i>
							<i class="iconfont iconbianji1" v-else></i>
							{{ params.additionalInformation.title }}
						</span>
						<div class="add right" @click="chioceControles('additionalInformation')">
							<i class="iconfont iconjia-tianchong"></i>
							添加
						</div>
					</div>
					<component
						v-for="(item, ind) in params.additionalInformation.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="[getClass(item.style), {hiddens: item.isHidden}]"
						:editControls="editControls"
						model="additionalInformation"
						:index="ind"
						:removeControls="removeControls"
						:isEdit="model === 'additionalInformation' && index === ind"/>
				</div>
			</div>
			<div class="sider">
				<Sider :controls="controls" :removeControls="removeControls" :updateTitle="updateTitle" :hiddenModel="hiddenModel"/>
			</div>
		</div>
		<Modal v-model="choiceType" width="360">
			<div slot="header" style="font-weight:600;font-size:16px;">
				添加组件(剩余{{ 11 - controlsIndex }} 个)
			</div>
			<div style="padding:0 50px">
				<Select v-model="addStyle">
					<Option v-for="item in addStyles" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</div>
			<div slot="footer">
				<Button type="primary" @click="addControles"> 确定 </Button>
				<Button type="ghost" @click="hiddenControles"> 取消 </Button>
			</div>
    </Modal>
 	</div>
</template>

<script>
import Sider from './components/sider'
import controlsInput from './components/input'
import controlsSelect from './components/select'
import controlsDate from './components/date'
import controlsTextarea from './components/textarea'
import controlsFile from './components/file'
import controlsRadio from './components/radio'
import controlsTable from './components/table'
import api from '@/api/organ'
export default {
	components: {
		Sider,
		controlsInput,
		controlsSelect,
		controlsDate,
		controlsTextarea,
		controlsFile,
		controlsRadio,
		controlsTable
	},
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
			controls: {},
			choiceType: false,
			addStyle: 'controlsInput',
			addStyles: [
				{value: 'controlsInput', label: '单行文本'},
				{value: 'controlsTextarea', label: '多行文本'},
				{value: 'controlsSelect', label: '下拉框设置'},
				{value: 'controlsDate', label: '日期设置'}
			],
			model: '',
			index: '',
			controlsIndex: 1,
			saving: false
    }
	},
	methods: {
		chioceControles(model) {
			if (this.controlsIndex == 11) {
				this.$Message.warning('自定字段不能超过十个')
				return
			}
			this.model = model
			this.choiceType = true
		},
		addControles() {
			var init = {}
			if (this.addStyle === 'controlsInput') {
				init = {type: 'controlsInput', columnName:'ext_col_' + this.controlsIndex, displayName: '单行文本', style: 'short-input', placeHolder: '', isHidden: false}
			} else if (this.addStyle === 'controlsTextarea') {
				init = {type: 'controlsTextarea', columnName:'ext_col_' + this.controlsIndex, displayName: '多行文本', style: 'long-input', placeHolder: '', isHidden: false}
			} else if (this.addStyle === 'controlsSelect') {
				init = {type: 'controlsSelect', columnName:'ext_col_' + this.controlsIndex, displayName: '下拉框', optionalValue: [{ value: '1option', label: '选项1' }], isHidden: false}
			} else if (this.addStyle === 'controlsDate') {
				init = {type: 'controlsDate', columnName:'ext_col_' + this.controlsIndex, displayName: '日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isHidden: false}
			}
			this.controlsIndex++
			this.params[this.model].controls.push(init)
			this.choiceType = false
		},
		editControls(model, index) {
			this.controls = this.params[model].controls[index]
			this.model = model
			this.index = index
		},
		removeControls() {
			this.params[this.model].controls.splice(this.index, 1)
			this.controls = {}
			this.model = ''
			this.index = ''
			this.controlsIndex--
		},
		getClass(style) {
			var _style = ['long-input']
			return _style.indexOf(style) >= 0 ? 'model-control-row' : 'model-control-half'
		},
		editTitle(model) {
			this.controls = {
				type: 'title',
				title: this.params[model].title,
				isHidden: this.params[model].isHidden
			}
			this.model = model
			this.index = ''
		},
		updateTitle(title) {
			this.params[this.model].title = title
		},
		hiddenControles() {
			this.choiceType = false
		},
		hiddenModel(boo) {
			this.params[this.model].isHidden = boo
		},
		hiddenFile(model) {
			this.params[model].showFile = false
		},
		save () {
			var params = {
				data: this.params
			}
			this.saving = true
			params.index = this.controlsIndex
			params.data = JSON.stringify(params.data)
			api.saveColumns(params).then(res => {
				if (res.code === '0') {
					this.$Message.success('保存成功')
				} else {
					this.$Message.error(res.msg)
				}
			}).catch(e => {
				this.$Message.error(e)
			}).finally(() => {
				this.saving = false
			})
		}
	},
	created() {
		api.getAllColumns().then(res => {
			if (!res.data) {
				this.params = {
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
			} else {
				Object.keys(res.data).forEach(item => {
					if (res.data[item].controls) {
						res.data[item].controls = res.data[item].controls.map(ite => {
							if (ite.type === 'controlsSelect') {
								return  {
									...ite,
									optionalValue: JSON.parse(ite.optionalValue)
								}
							} else {
								return ite
							}
						})
					}
				})
				this.params = {
					...this.params,
					...res.data
				}
				this.controlsIndex = res.index
			}
		})
	}
}
</script>
<style lang='less' scoped>
	.left{
    float: left;
  }
  .right{
    float: right;
  }
	.box{
		width:100%;
		max-height: calc(~'100vh - 70px');
		.box-show {
			min-width: 1200px;
			position: relative;
			overflow: hidden;
			header{
				height: 50px;
				width:calc(~'100% - 400px');
				line-height:40px;
				text-align: center;
				border-bottom:1px solid #e6e6e6;
				font-size: 18px;
				color: #1B2437;
				position: relative;
				.save{
					position: absolute;
					top: 5px;
					right: -100px;
				}
			}
			.details{
				width:calc(~'100% - 400px');
				height: calc(~'100vh - 110px');
				overflow-y:scroll;
				padding:0 5%;
				padding-bottom:50px;
				.hiddens{
					opacity: 0.5;
				}
				.model{
					margin-top: 30px;
					overflow: hidden;
					.model-control-half{
						width: 48%;
						float:left;
						margin:0 1%;
						i{
							margin-right:5px;
						}
					}
					.model-control-row{
						width:100%;
						padding:0 1%;
						overflow: hidden;
						i{
							margin-right:5px;
						}
					}
					.dotted-line{
						border: 1px solid #eee;
						height: 30px;
						line-height: 30px;
						text-align: center;
						color: #333;
						border-radius: 5px;
						width: 70%;
					}
					.input{
						width:70%
					}
					.input-long{
						width:85%;
					}
					.title{
						border-bottom:1px solid #eee;
						height: 26px;
						font-weight: 900;
						margin-bottom: 30px;
						span{
							cursor: pointer;
							i{
								margin-right:5px;
							}
						}
						.add{
							margin-right:20px;
							color:#485C83;
							cursor: pointer;
							i{
								color:#4A90E2
							}
						}
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
				}
			}
			.sider{
				width:400px;
				height: 100%;
				position: absolute;
				right:0
			}
		}
	}
</style>
