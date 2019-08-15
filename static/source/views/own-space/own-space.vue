<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card class='card'>
            <p slot="title">
                <Icon type="person"></Icon>
                企业信息
            </p>
            <div>
               
                <Form ref="loginForm" :model="form" :rules="rules" class='formStyle' >
                     <Select v-model="type"  style=" margin:0 auto" @on-change="changeType()">
                            <Option value="0">钉钉</Option>
                            <Option value="1">办公助手</Option>
                            <Option value="2">本系统</Option>
                        </Select>
                        <div v-if="type==0">
                          <FormItem v-if="isMulti" prop="userNameDD" label="团队名称">
                              <Input v-model="form.userNameDD" placeholder="请输入企业团队名称">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                           <FormItem v-if="isMulti" prop="shortNameDD" label="英文简称">
                              <Input v-model="form.shortNameDD" disabled  placeholder="请输入企业团队英文简称,不可重复">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem  prop="systemNameDD" label="系统名称">
                              <Input v-model="form.systemNameDD" placeholder="请输入系统名称">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="cropId" label="企业ID"> 
                              <Input v-model="form.cropId" type="password" placeholder="请输入钉钉企业ID">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="secretDD" label="企业secret">
                              <Input type="password" v-model="form.secretDD" placeholder="请输入钉钉企业secret">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="agentId" label="企业agentId">
                              <Input  v-model="form.agentId" placeholder="请输入钉钉企业agentId">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="appKey" label="企业appKey">
                              <Input  v-model="form.appKey" placeholder="请输入钉钉企业appKey">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="appSecret" label="企业appSecret">
                              <Input type="password"  v-model="form.appSecret" placeholder="请输入钉钉企业appSecret">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="logoDownId" label="企业logo">
                            <div style="cursor:pointer;float:left;width:100%;">
                                <div style="position:relative;height:100px;width:100px" v-if="lockLoading">
                                    <Spin fix></Spin>
                                </div>
                                <Upload v-else :action="uploadUrl" :on-success="updateLogo" name="fileToUpload" :show-upload-list="false" :on-error="error" :before-upload="beforeUpload" :with-credentials="true">
                                    <div v-if="!form.logoDownId" style="background: #333">
                                        <img src="../logo1.png" alt=""  title="点击图片可更换企业logo"/>
                                    </div>
                                    <div v-else style="min-width:50px;max-height:100px">
                                        <img :src="logoUrl" alt="" title="点击图片可更换企业logo" height="100px"/>
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
                            <span
                                v-if="form.autoSyncOrgan"
                                @click="openAutoSyncOrganStatusModal"
                                class="auto-sync-organ-status"
                            >查看状态</span>
                          </FormItem>
                         </div>
                        <div  v-else-if='type==1'>
                          <FormItem v-if="isMulti" prop="userNameOA" label="团队名称">
                              <Input v-model="form.userNameOA" placeholder="请输入企业团队名称">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem v-if="isMulti" prop="shortNameOA" label="英文简称">
                              <Input v-model="form.shortNameOA" disabled   placeholder="请输入企业团队英文简称,不可重复">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                           <FormItem  prop="systemNameOA" label="系统名称">
                              <Input v-model="form.systemNameOA" placeholder="请输入系统名称">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="oaOpenId" label="助手openID">
                              <Input v-model="form.oaOpenId" placeholder="请输入办公助手openID">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="oaAppId" label="助手appID">
                              <Input v-model="form.oaAppId" placeholder="请输入办公助手appID">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="secretOA" label="助手appSecret">
                              <Input  type="password"  v-model="form.secretOA" placeholder="请输入办公助手appSecret">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="oaAppKey" label="助手oaAppKey">
                              <Input  v-model="form.oaAppKey" placeholder="请输入办公助手oaAppKey">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="oaAccessUrl" label="助手accessUrl">
                              <Input  v-model="form.oaAccessUrl" placeholder="请输入办公助手accessUrl">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="oaMsgUrl"  label="通知地址">
                              <Input  v-model="form.oaMsgUrl" placeholder="请输入办公助手消息通知地址">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                              </Input>
                          </FormItem>
                          <FormItem prop="logoDownId" label="企业logo">
                            <div style="cursor:pointer;float:left;width:100%">
                                <div style="position:relative;height:100px;width:100px" v-if="lockLoading">
                                    <Spin fix></Spin>
                                </div>
                                <Upload :action="uploadUrl" :on-success="updateLogo" name="fileToUpload" :show-upload-list="false" :on-error="error" :before-upload="beforeUpload" :with-credentials="true">
                                    <div v-if="!form.logoDownId" style="background: #333">
                                        <img src="../logo1.png" alt=""  title="点击图片可更换企业logo"/>
                                    </div>
                                    <div v-else style="min-width:50px;max-height:100px">
                                        <img :src="logoUrl" alt=""  title="点击图片可更换企业logo" height="100px"/>
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
                            <span
                                v-if="form.autoSyncOrgan"
                                @click="openAutoSyncOrganStatusModal"
                                class="auto-sync-organ-status"
                            >查看状态</span>
                          </FormItem>
                         </div>
                         <div v-else>
                            <FormItem  v-if="isMulti"  prop="userNamelocal" label="团队名称">
                                <Input v-model="form.userNamelocal" placeholder="请输入企业团队名称">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                                </Input>
                            </FormItem>
                            <FormItem v-if="isMulti" prop="shortNamelocal" label="英文简称">
                                <Input v-model="form.shortNamelocal" disabled  placeholder="请输入企业团队英文简称,不可重复">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                                </Input>
                            </FormItem>
                            <FormItem prop="systemNamelocal" label="系统名称">
                                <Input v-model="form.systemNamelocal" placeholder="请输入系统名称">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                                </Input>
                            </FormItem>
                            <FormItem prop="logoDownId" label="企业logo">
                                <div style="cursor:pointer;float:left;width:100%">
                                    <div style="position:relative;height:100px;width:100px" v-if="lockLoading">
                                        <Spin fix></Spin>
                                    </div>
                                    <Upload :action="uploadUrl" :on-success="updateLogo" name="fileToUpload" :show-upload-list="false" :on-error="error" :before-upload="beforeUpload" :with-credentials="true">
                                        <div v-if="!form.logoDownId" style="background: #333">
                                            <img src="../logo1.png" alt=""  title="点击图片可更换企业logo"/>
                                        </div>
                                        <div v-else style="min-width:50px;max-height:100px">
                                            <img :src="logoUrl" alt=""  title="点击图片可更换企业logo"  height="100px"/>
                                        </div>
                                    </Upload>
                                </div>
                            </FormItem>
                        </div>
                    </Form>
                    <Form 
                        ref="userForm"
                        :label-width="100" 
                        label-position="right"
                        class="formStyle"
                    >
                    <div>
                        <Button type="ghost" style="width: 100px;" @click="cancelEditUserInfor">重置</Button>
                        <Button type="primary" style="width: 100px;" :loading="loading" @click="handleSubmit" :disabled="disabled">保存</Button>
                    </div>
                </Form>
            </div>
        </Card>
        <Modal
          v-model="autoSyncOrganStatusVisible"
          title="自动同步组织机构"
          width="80"
          class="auto-sync-organ-status-modal"
        >
            <AutoSyncOrganStatus
              :loading="!autoSyncOrganStatus"
              :status="autoSyncOrganStatus || []"
            ></AutoSyncOrganStatus>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import HTTP from '@/api/work-flow.js'
import Cookies from 'js-cookie' 
import axios from 'axios'
import AutoSyncOrganStatus from './components/auto-sync-organ-status.vue';

export default {
    name: 'ownspace_index',
    components: {
        AutoSyncOrganStatus
    },
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPass) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
             type:0,
             oldValue:{},
             isMulti:this.$store.state.app.isMulti,
             local:{
                 name:"",
                 shortName:"",
                 systemName :""
             },
             form: {
                userNameDD:'',
                cropId: '',
                secretDD: '',
                agentId:'',
                appKey:'',
                appSecret:'',
                shortNameDD:'',
                systemNameDD:'',
                useAppKey:false,
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
                ddMsgUrl:'',
                oaMsgUrl:'',
                companyIdlocal:'',
                logoDownId: '',
                autoSyncOrgan: false // 自动同步组织机构
            },
            oldLogoUrl: '',
            logoUrl: '',
            uploadUrl: '',
            disabled: false,
            rules: {
                    shortNameDD:[ { required: true, message: '企业简称名称不能为空', trigger: 'blur' }],
                    shortNameOA:[ { required: true, message: '企业英文简称账号不能为空', trigger: 'blur' }],
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
                    shortNamelocal:[ { required: true, message: '企业英文简称账号不能为空', trigger: 'blur' }],
                    systemNamelocal:[ { required: true, message: '系统名称不能为空', trigger: 'blur' }],
                    userNamelocal:[ { required: true, message: '企业名称不能为空', trigger: 'blur' }]
            },
            
            save_loading: false,
            loading:false,
            lockLoading: true,
           
            checkIdentifyCodeLoading: false,
        
            
            passwordValidate: {
                oldPass: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                    { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                ],
                rePass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ]
            },
            inputCodeVisible: false, // 显示填写验证码box
            initPhone: '',
            gettingIdentifyCodeBtnContent: '获取验证码', // “获取验证码”按钮的文字
            autoSyncOrganStatus: '', // 自动同步组织机构详情
            autoSyncOrganStatusVisible: false
        };
    },
    methods: {
        getIdentifyCode () {
            this.hasGetIdentifyCode = true;
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.canGetIdentifyCode = true;
                    let timeLast = 60;
                    let timer = setInterval(() => {
                        if (timeLast >= 0) {
                            this.gettingIdentifyCodeBtnContent = timeLast + '秒后重试';
                            timeLast -= 1;
                        } else {
                            clearInterval(timer);
                            this.gettingIdentifyCodeBtnContent = '获取验证码';
                            this.canGetIdentifyCode = false;
                        }
                    }, 1000);
                    this.inputCodeVisible = true;
                    // you can write ajax request here
                }
            });
        },
        changeType(){
            if(this.type==0){
                this.form.userNameDD = this.local.name 
                this.form.shortNameDD =  this.local.shortName  
                this.form.systemNameDD=  this.local.systemName
            }else if (this.type==1){
                this.form.userNameOA =  this.local.name 
                this.form.shortNameOA = this.local.shortName
                this.form.systemNameOA = this.local.systemName
            }else if(this.type==2){
                this.form.companyIdlocal  = this.$store.state.user.companyId
                this.form.userNamelocal =   this.local.name
                this.form.shortNamelocal =  this.local.shortName
                this.form.systemNamelocal = this.local.systemName
            }

        },
        async handleSubmit() {
            this.loading = true
            try {
                const valid = await this.$refs.loginForm.validate()
                if (!valid) return
                var param ={}
                var dataJson={}
                param.id =this.$store.state.user.companyId;
                if(this.type==="0"){

                    param.companyName = this.form.userNameDD
                    param.shortName  = this.form.shortNameDD
                    param.systemName= this.form.systemNameDD
                    param.type = this.type
                    dataJson.corpId= this.form.cropId
                    dataJson.secretDDId = this.form.secretDD
                    dataJson.agentId = this.form.agentId
                    dataJson.switchNotify = this.form.switchDD
                    dataJson.ddMsgUrl = this.form.ddMsgUrl
                    dataJson.appKey =this.form.appKey
                    dataJson.appSecret =this.form.appSecret
                    dataJson.type = this.type
                    dataJson.useAppKey = this.form.useAppKey
                    param.data = JSON.stringify(dataJson);
                    param.logoDownId = this.form.logoDownId
                    param.syncOrgan = this.form.autoSyncOrgan;

                }
                else if(this.type==="1"){
                    param.type = this.type
                   
                    // param.companyId = this.form.companyIdOA
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

                let result = await HTTP.companyUpdate(param)
                
                if (result.code === '-1') {
                    this.$Message.error('错误：'+result.msg)
                }
                else if (result.code === '0') {
                    this.$store.commit('user/setLogoImg', this.logoUrl)
                    this.$Message.success({
                        content: '用户:admin_' +param.shortName + '信息修改成功',
                        duration: 2
                    });
                    window.document.title = param.systemName;
                    Cookies.set('title', param.systemName)
                
                }
                else {
                    this.$Message.error(result.msg)
                }
            } catch (err) {
                console.log(err)
                this.$Message.error('This is an error')
            } finally {
                this.loading = false
            }
        },
        showEditPassword () {
            this.editPasswordModal = true;
        },
        cancelEditUserInfor () {
            this.logoUrl = this.oldLogoUrl
            this.filterData(this.oldValue)
        },
        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    if (this.phoneHasChanged && this.userForm.cellphone !== this.initPhone) { // 手机号码修改过了而且修改之后的手机号和原来的不一样
                        if (this.hasGetIdentifyCode) { // 判断是否点了获取验证码
                            if (this.identifyCodeRight) { // 判断验证码是否正确
                                this.saveInfoAjax();
                            } else {
                                this.$Message.error('验证码错误，请重新输入');
                            }
                        } else {
                            this.$Message.warning('请先点击获取验证码');
                        }
                    } else {
                        this.saveInfoAjax();
                    }
                }
            });
        },
        cancelEditPass () {
            this.editPasswordModal = false;
        },
        saveEditPass () {
            this.$refs['editPasswordForm'].validate((valid) => {
                if (valid) {
                    this.savePassLoading = true;
                    // you can write ajax request here
                }
            });
        },
        init () {
            
            this.cropDetail();
            this.cropUpdate();
        },
        cropDetail(){
            var _this =this
            if(_this.$store.state.user.companyId){
                HTTP.companyDetail({companyId:_this.$store.state.user.companyId}).then((data)=>{
                    if(data.code==0){
                        if (data.company && data.company.logoDownId) {
                            _this.oldLogoUrl = `${axios.defaults.baseURL}/Form/downloadFile/` + data.company.logoDownId
                            _this.logoUrl = `${axios.defaults.baseURL}/Form/downloadFile/` + data.company.logoDownId
                        }
                        _this.oldValue = data.company
                        _this.filterData(_this.oldValue);
                    }
                    else{
                        _this.$Message.error('查询企业信息出错');
                    }
                    
                })
            }
            else{
                _this.$Message.error('无法查到companyId');
            }
            
        },
        cropUpdate(){

        },
        filterData(data){
            var _this =this
            try{
                var jsonData = JSON.parse(data.data);
                _this.type = jsonData.type;
                if(_this.type==0){
                    _this.form.userNameDD = data.companyName 
                    _this.form.shortNameDD = data.companyCode  
                    _this.form.systemNameDD= data.systemName
                    _this.form.cropId = jsonData.corpId
                    _this.form.secretDD =jsonData.secretDDId
                    _this.form.appKey =jsonData.appKey
                    _this.form.appSecret =jsonData.appSecret
                    _this.form.agentId = jsonData.agentId
                    _this.form.switchDD = jsonData.switchNotify
                    _this.form.ddMsgUrl =  jsonData.ddMsgUrl
                    _this.form.logoDownId = data.logoDownId
                    _this.form.useAppKey = jsonData.useAppKey
                    _this.form.autoSyncOrgan = data.syncOrgan === 'true' ? true : false;
                }
                else if(_this.type==1){
                    _this.form.companyIdOA =  data.companyId
                    _this.form.userNameOA =  data.companyName 
                    _this.form.shortNameOA = data.companyCode
                    _this.form.systemNameOA = data.systemName
                    _this.form.oaOpenId = jsonData.oaOpenId
                    _this.form.oaAppId = jsonData.oaAppId 
                    _this.form.secretOA = jsonData.secretOAId
                    _this.form.oaAppKey = jsonData.oaAppKey 
                    _this.form.oaAccessUrl = jsonData.oaAccessUrl
                    _this.form.switchOA = jsonData.switchNotify
                    _this.form.oaMsgUrl = jsonData.oaMsgUrl
                    _this.form.logoDownId = data.logoDownId
                    _this.form.autoSyncOrgan = data.syncOrgan === 'true' ? true : false;
                }
                else{
                    _this.form.companyIdlocal  = _this.$store.state.user.companyId
                    _this.form.userNamelocal =  data.companyName
                    _this.form.shortNamelocal =  data.companyCode
                    _this.form.systemNamelocal = data.systemName
                    _this.form.logoDownId = data.logoDownId
                }
            }
            catch(e){
                console.log(e);
                _this.$Message.error('后台企业信息出错');
            }
            _this.local.name =data.companyName
            _this.local.systemName =data.systemName
            _this.local.shortName =data.companyCode 
            this.lockLoading = false

        },
        saveInfoAjax () {
            this.save_loading = true;
            setTimeout(() => {
                this.$Message.success('保存成功');
                this.save_loading = false;
            }, 1000);
        },
        updateLogo(data) {
            if (data.code === '-1') {
                this.$Message.error(data.msg)
                return
            }
            if (this.form.logoDownId && this.form.logoDownId !== this.oldValue.logoDownId) {
                let params = {
                    attachmentId: this.form.logoDownId
                }
                HTTP.delFile(params).then().catch(e => {
                    console.log(e)
                })
            }
            this.form.logoDownId = data.AttachmentId
            this.logoUrl = `${axios.defaults.baseURL}/Form/downloadFile/` + data.AttachmentId
            this.disabled = false
        },
        error(data) {
            this.$Message.error(data.msg)
        },
        beforeUpload(file) {
            this.disabled = true
            if (file.name.includes(',')) {
                this.disabled = false
				this.$Message.error('图片名不能出现逗号","')
				return false
			} else {
				return true
			}
        },
        async openAutoSyncOrganStatusModal() {
            this.autoSyncOrganStatus = '';
            this.autoSyncOrganStatusVisible = true;
            try {
                const res = await HTTP.getAutoSyncOrganStatus();
                if (+res.code === 0) {
                    this.autoSyncOrganStatus = res.companys;
                } else {
                    throw new Error(res.msg);
                }
            } catch (error) {
                this.$Message.error(error.message);
                this.autoSyncOrganStatusVisible = false;
            }
        }
    },
    mounted() {
        this.init();
    },
    created() {
        this.uploadUrl = `${axios.defaults.baseURL}/Form/SheetAttachmentAction?fileUsage=company_logo`
    }
}
</script>
<style>
</style>

