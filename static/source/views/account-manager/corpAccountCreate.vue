<style lang="less">
@import '~@/views/login.less';
</style>
<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con corp-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="ios-gear"></Icon>
                    创建企业账号
                </p>
                <div class="form-con" v-if="!succShortName">
                    <Select v-model="type" placeholder='请选择需要创建的类型' style="margin-bottom:10px" @on-change="changeType()">
                        <Option value="0">钉钉</Option>
                        <Option value="1">办公助手</Option>
                        <Option value="2">本系统</Option>
                    </Select>
                    <Form ref="loginForm" :model="form" :rules="rules" class="corp-form" >
                        <div v-if="type==0">
                          <FormItem prop="userNameDD">
                              <Input v-model="form.userNameDD" placeholder="请输入企业团队名称">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                           <FormItem prop="shortNameDD">
                              <Input v-model="form.shortNameDD" placeholder="请输入企业团队英文简称,作为登录账号">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="systemNameDD">
                              <Input v-model="form.systemNameDD" placeholder="请输入系统名称">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="cropId">
                              <Input v-model="form.cropId" placeholder="请输入钉钉企业ID">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="secretDD">
                              <Input  v-model="form.secretDD" placeholder="请输入钉钉企业secret">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="agentId">
                              <Input  v-model="form.agentId" placeholder="请输入钉钉企业agentId">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                           <FormItem prop="appKey">
                              <Input  v-model="form.appKey" placeholder="请输入钉钉企业appKey">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                           <FormItem prop="appSecret">
                              <Input  v-model="form.appSecret" placeholder="请输入钉钉企业appSecret">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="logoDownId">
                            <div style="cursor:pointer">
                                <Upload :action="uploadUrl" :on-success="getLogo" name="fileToUpload" :show-upload-list="false" :on-error="error" :with-credentials="true">
                                    <div style="margin-bottom:10px;color:#495060;font-weight: 700"> 上传logo </div>
                                    <div v-if="!form.logoDownId" style="background: #333">
                                        <img src="../logo1.png" alt=""/>
                                    </div>
                                    <div v-else style="background: #333">
                                        <img :src="logoUrl" alt=""/>
                                    </div>
                                </Upload>
                            </div>
                          </FormItem>
                          <FormItem label="采用appkey方式同步数据" >
                              <i-switch v-model="form.useAppKey" label="Switch">
                                  <span slot="open">开</span>
                                  <span slot="close">关</span>
                              </i-switch>
                          </FormItem>
                          <FormItem label='消息通知开关'>
                              <i-switch v-model="form.switchDD" label="Switch">
                                  <span slot="open">开</span>
                                  <span slot="close">关</span>
                              </i-switch>
                          </FormItem>
                          <FormItem label='自动同步组织机构'>
                            <i-switch v-model="form.autoSyncOrgan" label="Switch">
                                <span slot="open">开</span>
                                <span slot="close">关</span>
                            </i-switch>
                            <span
                                v-if="form.autoSyncOrgan"
                                style="color: #aaa; margin-left: 10px;"
                            >凌晨4点自动同步</span>
                          </FormItem>
                         </div>
                        <div  v-else-if='type==1'>
                          <FormItem prop="userNameOA">
                              <Input v-model="form.userNameOA" placeholder="请输入企业团队名称">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="shortNameOA">
                              <Input v-model="form.shortNameOA" placeholder="请输入企业团队英文简称,不可重复">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                           <FormItem prop="systemNameOA">
                              <Input v-model="form.systemNameOA" placeholder="请输入系统名称">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="oaOpenId">
                              <Input v-model="form.oaOpenId" placeholder="请输入办公助手openID">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="oaAppId">
                              <Input v-model="form.oaAppId" placeholder="请输入办公助手appID">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="secretOA">
                              <Input  v-model="form.secretOA" placeholder="请输入办公助手appSecret">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="oaAppKey">
                              <Input  v-model="form.oaAppKey" placeholder="请输入办公助手oaAppKey">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="oaAccessUrl">
                              <Input  v-model="form.oaAccessUrl" placeholder="请输入办公助手accessUrl">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="logoDownId">
                            <div style="cursor:pointer">
                                <Upload :action="uploadUrl" :on-success="getLogo" name="fileToUpload" :show-upload-list="false" :on-error="error" :with-credentials="true">
                                    <div style="margin-bottom:10px;color:#495060;font-weight: 700"> 上传logo </div>
                                    <div v-if="!form.logoDownId" style="background: #333">
                                        <img src="../logo1.png" alt=""/>
                                    </div>
                                    <div v-else>
                                        <img :src="logoUrl" alt=""/>
                                    </div>
                                </Upload>
                            </div>
                          </FormItem>
                          <FormItem label='办公助手消息通知'>
                              <i-switch v-model="form.switchOA" label="Switch">
                                  <span slot="open">开</span>
                                  <span slot="close">关</span>
                              </i-switch>
                          </FormItem>
                          <FormItem label='自动同步组织机构'>
                            <i-switch v-model="form.autoSyncOrgan" label="Switch">
                                <span slot="open">开</span>
                                <span slot="close">关</span>
                            </i-switch>
                            <span
                                v-if="form.autoSyncOrgan"
                                style="color: #aaa; margin-left: 10px;"
                            >凌晨4点自动同步</span>
                          </FormItem>
                         </div>
                         <div v-else>
                            <FormItem prop="userNamelocal">
                                <Input v-model="form.userNamelocal" placeholder="请输入企业团队名称">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                                </Input>
                            </FormItem>
                            <FormItem prop="shortNamelocal">
                                <Input v-model="form.shortNamelocal" placeholder="请输入企业团队英文简称,不可重复">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                                </Input>
                            </FormItem>
                            <FormItem prop="systemNamelocal">
                                <Input v-model="form.systemNamelocal" placeholder="请输入系统名称">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                                </Input>
                            </FormItem>
                            <FormItem prop="logoDownId">
                                <div style="cursor:pointer">
                                    <Upload :action="uploadUrl" :on-success="getLogo" name="fileToUpload" :show-upload-list="false" :on-error="error" :with-credentials="true">
                                        <div style="margin-bottom:10px;color:#495060;font-weight: 700"> 上传logo </div>
                                        <div v-if="!form.logoDownId" style="background: #333">
                                            <img src="../logo1.png" alt=""/>
                                        </div>
                                        <div v-else>
                                            <img :src="logoUrl" alt=""/>
                                        </div>
                                    </Upload>
                                </div>
                            </FormItem>
                        </div>

                    </Form>
                    <Form>
                        <FormItem>
                              <Button size="large" @click="handleSubmit" type="primary" long>创建</Button>
                          </FormItem>
                          <div style="text-align: center;">
                          <router-link :to="{name:'login'}">
                              <span class="link-class">返回登录页</span>
                          </router-link>
                        </div>
                          <!-- <FormItem>
                              <Button icon="ios-arrow-back" @click="goHome" type="text" long>返回登录页</Button>
                          </FormItem>  -->
                    </Form>
                </div>
                <div class="create-succ" v-if="succShortName">
                  <div class="succ-logo"></div>
                  <p class="succ-text">创建成功</p>
                  <div class="succ-acc">
                    <p class="succ-desc">企业账号: <span>{{'admin_' + succShortName}}</span></p>
                    <p class="succ-desc">初始密码: <span>1</span></p>
                  </div>
                  <Button size="large" @click="goHome" type="primary" long>返回登录</Button>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import userReq from '@/api/user.js'
import HTTP from '@/api/work-flow.js'
import axios from 'axios'
export default {
  data() {
    const validate = (rule, value, callback) => {
        var reg = /^[a-zA-Z0-9]+$/;
        if(reg.test(value)) {
          callback();
        } else {
          callback(new Error("企业英文简称账号不能为空且只能是字母数字"));
        }
    };
    return {
      loading: false,
      type:"0",
      form: {
        userNameDD:'',
        cropId: '',
        secretDD: '',
        agentId:'',
        shortNameDD:'',
        systemNameDD:'',
        useAppKey:false,
        appKey:'',
        appSecret:'',
        switchDD: true,
        companyIdOA:'',
        userNameOA:'',
        oaOpenId: '',
        oaAppId:'',
        secretOA: '',
        oaAppKey:'',
        oaAccessUrl:'',
        shortNameOA:'',
        systemNameOA:'',
        switchOA: true,
        userNamelocal:'',
        shortNamelocal:'',
        systemNamelocal:'',
        // ddMsgUrl:'',
        oaMsgUrl:'',
        logoDownId:'',
        autoSyncOrgan: false // 自动同步组织机构
      },
      uploadUrl: '',
      logoUrl: '',
      succShortName: '',
      rules: {
        shortNameDD:[ { required: true, message: '企业简称名称不能为空', trigger: 'blur' },
                      { validator: validate, trigger: 'blur' }],
        shortNameOA:[ { required: true, message: '企业英文简称账号不能为空', trigger: 'blur' },
                      { validator: validate, trigger: 'blur' }],
        systemNameDD:[ { required: true, message: '系统名称不能为空', trigger: 'blur' }],
        systemNameOA:[ { required: true, message: '系统名称不能为空', trigger: 'blur' }],
        userNameOA:[ { required: true, message: '企业名称不能为空', trigger: 'blur' }],
        userNameDD: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' }
        ],
        cropId: [
          { required: true, message: '企业ID不能为空', trigger: 'blur' }
        ],
        companyIdOA: [
          { required: true, message: '企业ID不能为空', trigger: 'blur' }
        ],
        secretOA: [
          { required: true, message: '企业secret不能为空', trigger: 'blur' }
        ],

        oaOpenId: [ { required: true, message: '企业oaOpenId不能为空', trigger: 'blur' }],

        shortNamelocal:[ { required: true, message: '企业英文简称账号不能为空', trigger: 'blur' },
                      { validator: validate, trigger: 'blur' }],
        systemNamelocal:[ { required: true, message: '系统名称不能为空', trigger: 'blur' }],
        userNamelocal:[ { required: true, message: '企业名称不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      try {
        const valid = await this.$refs.loginForm.validate()
        if (!valid) return
        var param ={}
        var dataJson={}
        if(this.type==="0"){

            param.companyName = this.form.userNameDD
            param.shortName  = this.form.shortNameDD
            param.systemName= this.form.systemNameDD
            param.type = this.type
            dataJson.corpId= this.form.cropId
            dataJson.secretDDId = this.form.secretDD
            dataJson.agentId = this.form.agentId
            dataJson.appKey =this.form.appKey
            dataJson.appSecret =this.form.appSecret
            dataJson.switchNotify = this.form.switchDD
            dataJson.useAppKey = this.form.useAppKey
            dataJson.type = this.type
            param.data = JSON.stringify(dataJson);
            param.logoDownId = this.form.logoDownId
            param.syncOrgan = this.form.autoSyncOrgan;
        }
        else if(this.type==="1"){
            param.type = this.type
            param.companyId = this.form.companyIdOA
            param.companyName = this.form.userNameOA
            param.shortName  = this.form.shortNameOA
            param.systemName= this.form.systemNameOA
            dataJson.oaOpenId= this.form.oaOpenId
            dataJson.oaAppId = this.form.oaAppId
            dataJson.secretOAId = this.form.secretOA
            dataJson.oaAppKey = this.form.oaAppKey
            dataJson.oaAccessUrl = this.form.oaAccessUrl
            dataJson.switchNotify = this.form.switchOA
            dataJson.oaMsgUrl = this.form.oaMsgUrl
            dataJson.type = this.type
            param.data = JSON.stringify(dataJson);
            param.logoDownId = this.form.logoDownId
            param.syncOrgan = this.form.autoSyncOrgan;
        }
        else {
            param.type = this.type
            param.companyName = this.form.userNamelocal
            param.shortName = this.form.shortNamelocal
            param.systemName= this.form.systemNamelocal
            dataJson.type = this.type
            param.data = JSON.stringify(dataJson);
            param.logoDownId = this.form.logoDownId
        }



        let result = await userReq.createCompanyAccount(param)
        if (result.code === '-1') {
          this.$Message.error('错误：'+result.msg)
        }
       else if (result.code === '0') {
          this.succShortName = param.shortName
          // this.$Message.success({
          //       content: '用户:admin_' +param.shortName + '创建成功，密码是1',
          //       duration: 10
          //   });
          // var t
          // clearTimeout(t)
          // var tempThis = this
          // t = setTimeout(function() {
          //   tempThis.$router.push({
          //     name: 'login'
          //   })
          // }, 5000)
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
    changeType(){
      this.$refs['loginForm'].resetFields();
    },
    goHome() {
      this.$router.push({
              name: 'login'
            })
    },
    getLogo(data) {
        if (data.code === '-1') {
            this.$Message.error(data.msg)
            return
        }
        if (this.form.logoDownId) {
            let params = {
                attachmentId: this.form.logoDownId
            }
            HTTP.delFile(params).then().catch(e => {
                console.log(e)
            })
        }
        this.logoUrl = axios.defaults.baseURL + data.ThumbnailUrl
        this.form.logoDownId = data.AttachmentId
        this.$Message.success('更改logo成功')
    },
    error(data) {
        this.$Message.error(data.msg)
    }
  },
  created() {
    this.uploadUrl = `${axios.defaults.baseURL}/Form/SheetAttachmentAction?fileUsage=company_logo`
  }
}
</script>
