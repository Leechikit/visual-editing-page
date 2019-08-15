<template>
 <div class="wrap"> 
    <Modal
      :value="tShow"
      width="1000"
      :mask-closable="false"
      :styles="{top: '20px'}"
      :closable="false">
      <div slot="header">
        <span style="font-size:16px;">个人档案</span>
        <span class="right">
          <span class="left" style="line-height:30px;margin-right:20px;cursor:pointer;color:#4A90E2" @click="goRouter"> 档案设置 </span>
          <Icon type="ios-close-empty" @click="cancel" size="30" style="cursor:pointer"/>
        </span>
      </div>
      <div class="details">
				<div class="model" :class="{hidden: params.basicInformation.isHidden}">
					<div class="title">
						<span>
							{{ params.basicInformation.title }}
						</span>
					</div>
					<component
						v-for="(item, ind) in params.basicInformation.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="getClass(item.style)"
						:index="ind"/>
				</div>
				<div class="model" :class="{hidden: params.identityInformation.isHidden}">
					<div class="title">
						<span>
							{{ params.identityInformation.title }}
						</span>
					</div>
					<component
						v-for="(item, ind) in params.identityInformation.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="getClass(item.style)"
						:index="ind"/>
				</div>
				<div class="model" :class="{hidden: params.educationalInformation.isHidden}">
					<div class="title">
						<span>
							{{ params.educationalInformation.title }}
						</span>
					</div>
					<component
						v-for="(item, ind) in params.educationalInformation.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="getClass(item.style)"
						:index="ind"/>
				</div>
				<div class="model" :class="{hidden: params.contaInformation.isHidden}">
					<div class="title">
						<span>
							{{ params.contaInformation.title }}
						</span>
					</div>
					<component
						v-for="(item, ind) in params.contaInformation.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="getClass(item.style)"
						:index="ind"/>
				</div>
				<div class="model" :class="{hidden: params.memberFamily.isHidden}">
					<div class="title">
						<span>
							{{ params.memberFamily.title }}
						</span>
					</div>
					<component
						v-for="(item, ind) in params.memberFamily.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="getClass(item.style)"
						model="memberFamily"
						:index="ind"/>
				</div>
				<div class="model" :class="{hidden: params.contractInformation.isHidden}">
					<div class="title">
						<span>
							{{ params.contractInformation.title }}
						</span>
					</div>
					<component
						v-for="(item, ind) in params.contractInformation.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="getClass(item.style)"
						:index="ind"/>
				</div>
				<div class="model" :class="{hidden: params.entryIntoThePost.isHidden}">
					<div class="title">
						<span>
							{{ params.entryIntoThePost.title }}
						</span>
					</div>
					<component
						v-for="(item, ind) in params.entryIntoThePost.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="getClass(item.style)"
						:index="ind"/>
				</div>
				<div class="model" :class="{hidden: params.leavingInformation.isHidden}">
					<div class="title">
						<span>
							{{ params.leavingInformation.title }}
						</span>
					</div>
					<component
						v-for="(item, ind) in params.leavingInformation.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="getClass(item.style)"
						:index="ind"/>
				</div>
				<div class="model" :class="{hidden: params.additionalInformation.isHidden}">
					<div class="title">
						<span>
							{{ params.additionalInformation.title }}
						</span>
					</div>
					<component
						v-for="(item, ind) in params.additionalInformation.controls"
						:key="ind"
						:is="item.type"
						:controls="item"
						:class="getClass(item.style)"
						:index="ind"/>
				</div>
			</div>
      <div slot="footer">
        <Button
          type="primary" 
          @click="ok">
          保存
        </Button>
        <Button @click="cancel">
          取消
        </Button>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Modal>
 </div>
</template>

<script>
import {idNumberCheck} from './identityNumbercheck.js'
import organ from '@/api/organ.js'
import SelectFiles from './selectFiles'
import controlsInput from './components/input'
import controlsSelect from './components/select'
import controlsDate from './components/date'
import controlsTextarea from './components/textarea'
import controlsFile from './components/file'
import controlsRadio from './components/radio'
import controlsTable from './components/table'
import document from '@/api/document.js'
export default {
  props: ['show', 'information', 'spinShow', 'userName', 'organName', 'id'],
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
      tShow: false,
      isId: true,
      allFilesShow: false,
      allFilesLoding: true,
      parFileId: -1,
      userId: true,
      allFiles: [],
      selectedFiles: {},
      activeFiles: ''
    }
  },
  components: {
    SelectFiles,
    controlsInput,
    controlsSelect,
    controlsDate,
    controlsTextarea,
    controlsFile,
    controlsRadio,
    controlsTable
  },
  watch: {
    show() {
      this.tShow = this.show
    },
    information() {
      this.params = this.information
    }
  },
  computed:{
    required() {
      var boo = false
      var name = []
      Object.keys(this.params).forEach(item => {
        this.params[item].controls.forEach(ite => {
          if (ite.isRequired && !ite.value && !ite.isHidden) {
            name.push(ite.displayName)
            boo = true
          }
        })
      })
      if (name.length) {
        name = name.join('、')
        this.$Message.error('带*的必填(' + name + ')');
      }
      return boo
    }
  },
  methods: {
    ok () {
      if (this.isId) {
        this.setPersonalFiles()
      } else {
        this.$Message.error('身份证信息错误');
      }
    },
    cancel () {
      this.$emit('personalFilesShow', false)
      this.isId = true
    },
    // 修改个人档案
    setPersonalFiles() {
      if (this.required) {
        return
      }
      let params = {}
      params.userId = this.id
      Object.keys(this.params).forEach(item => {
        if (this.params[item].controls.length) {
          this.params[item].controls.forEach(ite => {
            var name = ite.columnName.replace(/\_(\w)/g, function(all, letter){
              return letter.toUpperCase();
            });
            if (ite.type === 'controlsDate') {
              params[name] = new Date(ite.value).Format('yyyy-MM-dd')
            } else if (ite.type === 'controlsTable') {
              params[name] = JSON.stringify(ite.value)
            } else {
              params[name] = ite.value
            }
          })
        }
      })
      organ.save(params).then(res => {
        if (res.code == 0) {
          this.$emit('personalFilesShow', false)
          this.tShow = false
          this.$Message.success('保存成功');
        } else {
          this.$Message.error(res.msg);
        }
      }).catch((e) => {
        this.$Message.error('This is err');
      }).finally(() => {
      });
    },
    // 判断身份证格式是否正确
    // checkId () {
    //   this.isId = idNumberCheck(this.params.idCardNumber)
    // },
    getClass(style) {
			var _style = ['long-input']
			return _style.indexOf(style) >= 0 ? 'model-control-row' : 'model-control-half'
    },
    goRouter() {
      this.$router.push({
        name: 'file-setup'
      });
    }
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
  .hidden{
    display: none;
  }
  .model{
    margin-bottom: 30px;
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
      width:85.5%;
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
</style>
<style lang='less'>
  .ivu-modal-body{
    .box{
      .model{
        .ivu-row{
          .ivu-input-wrapper{
            .ivu-input{
              padding-left: 10px !important
            }
          }
        }
      }
    }
  }
</style>

