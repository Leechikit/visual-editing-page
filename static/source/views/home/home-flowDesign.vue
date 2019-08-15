<style scoped>
#appDesign {
    font-size:14px;
    width:100%;
    background:#fff;
}
#appDesign .nav-container {
    height:55px;
    line-height:55px;
    padding:0 20px
}
#appDesign .nav-container .fl {
    float:left
}
#appDesign .nav-container .fr {
    float:right;
    margin-right:10px
}
#appDesign .nav-container .logo {
    float:left
}
#appDesign .nav-container .logo img {
    height:35px;
    vertical-align:middle;
    margin-right:10px
}
#appDesign .nav-container .tab-nav {
    font-weight:700;
    float:left;
    width:60%;
    text-align:center;
    margin-left:100px
}
#appDesign .nav-container .back-to-front>a {
    padding:3px 15px;
    border:1px solid gray
}
#appDesign:after {
    clear:both
}
#appDesign #contentCurrent {
    box-sizing:border-box;
    width:841px;
    margin:0 auto;
    padding-bottom:160px;
    padding-top:55px;
    padding-left:1px;
    overflow:hidden
}
#appDesign #contentCurrent .content_box_color1 {
    border-top:6px solid #7dd2ff
}
#appDesign #contentCurrent .content_box_color2 {
    border-top:6px solid #52e2d2
}
#appDesign #contentCurrent .content_box_color3 {
    border-top:6px solid #6fd5f7
}
#appDesign #contentCurrent .content_box_color4 {
    border-top:6px solid #fd9099
}
#appDesign #contentCurrent .content_box_color5 {
    border-top:6px solid #ffad7e
}
#appDesign #contentCurrent .content_box_color0 {
    border-top:6px solid #ffc161
}
#appDesign #contentCurrent .circle_bg_color1 {
    background:#7dd2ff;
    border:10px solid #cfedfd
}
#appDesign #contentCurrent .circle_bg_color2 {
    background:#52e2d2;
    border:10px solid #c9fbf6
}
#appDesign #contentCurrent .circle_bg_color3 {
    background:#6fd5f7;
    border:10px solid #c8eefb
}
#appDesign #contentCurrent .circle_bg_color4 {
    background:#fd9099;
    border:10px solid #ffe4e6
}
#appDesign #contentCurrent .circle_bg_color5 {
    background:#ffad7e;
    border:10px solid #ffe0cf
}
#appDesign #contentCurrent .circle_bg_color0 {
    background:#ffc161;
    border:10px solid #fee2b6
}
#appDesign #contentCurrent .content_box_current {
    float:left;
    width:190px;
    height:156px;
    line-height:156px;
    text-align:center;
    cursor:pointer;
    position:relative;
    margin-right:20px;
    margin-bottom:40px;
    border-radius:2px;
    color:#000;
    box-shadow:0 0 2px 0 hsla(0,0%,69%,.5);
    background-color:#fff
}
#appDesign #contentCurrent .content_box_current .boc-name {
    position:absolute;
    width:100%;
    height:30px;
    line-height:31px;
    text-align:center;
    left:0;
    bottom:22px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    font-size:18px;
    color:#000;
    padding:0 15px
}
#appDesign #contentCurrent .content_box_current .icon-circle {
    width:50px;
    height:50px;
    position:absolute;
    left:52%;
    top:28%;
    margin-left:-39px;
    margin-top:-24px;
    border-radius:50%;
    box-sizing:content-box!important;
}
#appDesign #contentCurrent .content_box_current .icon-wrap {
    position:absolute;
    left:43%;
    top:-9%;
    text-align:center;
    margin:0 auto;
}
#appDesign #contentCurrent .content_box_current .icon-wrap .box-icon {
    font-size:28px;
    position:relative;
    top:-50%;
    left:-50%;
    margin-top:0;
    color:#fff;
    border-radius:50%
}
#appDesign #contentCurrent .content_box_current .box_bottom_wrap {
    position:absolute;
    left:5px;
    bottom:5px;
    height:25px;
    line-height:25px;
    text-align:right;
    width:100%;
    padding:0 6px;
    font-size:9px;
    color:#fff
}
#appDesign #contentCurrent .content_box_current .box_bottom_wrap a {
    color:#fff
}
#appDesign #contentCurrent .content_box_current .box_bottom_wrap .boxEdit {
    margin-left:-1px
}
#appDesign #contentCurrent .content_box_current .box_bottom_wrap .config-mobile-reportings {
    float:left
}
#appDesign #contentCurrent .content_box_current:hover {
    box-shadow:0 1px 12px 0 hsla(0,0%,73%,.78)
}
#appDesign #contentCurrent .box_add {
    background-color:#fff;
    border-radius:4px;
    box-sizing:border-box;
    z-index:1
}
#appDesign #contentCurrent .box_add .boc-name {
    font-size:18px;
    color:#6f6f6f
}
#appDesign #contentCurrent .drag_box {
    position:fixed;
    z-index:100;
    margin:0
}
#appDesign #contentCurrent .empty_box {
    background-color:#f7fafb;
    outline:1.2px dashed #79aeff;
    border:none;
    width:190px;
    height:156px;
    border-radius:4px
}
#appDesign #contentCurrent .empty_box,.box_add:hover {
    box-shadow:none
}
.bottom-icon-box .icon-setting:before {
    position:absolute;
    right:-67px;
    bottom:-72px;
    font-size:16px;
    border:10px solid transparent
}
.bottom-icon-box .icon-drag:before {
    position:absolute;
    right:0;
    bottom:0;
    font-size:16px;
    border:10px solid transparent
}
.drag-icon-now {
    cursor:move;
    position:absolute;
    right:10px;
    top:58px;
    height:0
}
.drag-icon-now .icon-drag:before {
    font-size:16px
}
.ivu-icon-drag:before {
    content:"\F130"
}
.configBtnPanel .icon-setting,.icon-drag {
    color:#666
}
.configBtnPanel,.configBtnPanel .ivu-poptip-rel {
    height:0!important
}
.configBtnPanel .ivu-poptip-popper {
    left:0px!important;
    top:148px!important;
    z-index:9999!important
}
.configBtnPanel .ivu-poptip-content {
    border:none;
    box-shadow:0 1px 11px 0 rgba(0,0,0,.22);
    border-radius:2px
}
.configBtnPanel .ivu-poptip-body {
    padding:0
}
.setting-icon-box {
    height:36px;
    position:relative;
    top:58px;
    left:60px;
    padding:8px 0
}
.setting-icon-box .icon-setting:before {
    font-size:16px;
    border:10px solid transparent
}
.icon-drag:before {
    content:"\E068"
}
.icon-drag:hover,.icon-setting:hover {
    color:#5bc0e2
}
.configBtnPanel .icon-setting,.icon-drag {
    color:#666
}

.icon-drag:hover,.icon-setting:hover {
    color:#5bc0e2
}
.bottom-icon-box .icon-setting:before {
    position:absolute;
    right:-67px;
    bottom:-72px;
    font-size:16px;
    border:10px solid transparent
}
.icon-setting-new:before {
    font-size:15px
}
.ivu-icon-settings:before {
    content:"\F2AD"
}
.icon-setting:before {
    content:"\E067"
}
.operateBtns a {
    display:block;
    width:100%;
    color:#040404;
    font-size:12px;
    letter-spacing:0;
    padding:10px 0;
    left:-20px;
    padding-left:0px;
    text-align:left
}
.operateBtns a:first-child {
    border-radius:3px 3px 0 0
}
.operateBtns a:last-child {
    border-radius:0 0 3px 3px
}
.operateBtns a:hover {
    background:#dff0fe
}
.operateBtns .boxEdit {
    border-top:1px solid #e1e1e1;
    padding-top:10px
}
.operateBtns .boxDel {
    margin-bottom:0
}
.icon {
          /* 通过设置 font-size 来改变图标大小 */
          width: 1em; height: 1em;
          /* 图标和文字相邻时，垂直对齐 */
          vertical-align: -0.15em;
          /* 通过设置 color 来改变 SVG 的颜色/fill */
          fill: currentColor;
          /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
             normalize.css 中也包含这行 */
          overflow: hidden;
        }
.export-config-btn {
    margin-bottom: 10px;
}
.export-config-btn .ivu-btn {
    background-color: #fff;
}
</style>
<template>
    <div id="appDesign">
        <!-- 头部导航栏 -->
        <!-- 应用内容展示区 -->
        <div id="contentCurrent" class="clearfix" ref="content">
             <Spin size="large" fix v-if="spinShow"></Spin>
            <div class="export-config-btn" @click="exportConfigBtn()"><Button>导出配置</Button></div>
            <!-- 之前保存的应用模块 -->
            <div v-for="(item, index) in appData" :key="item.Code" class="content_box_current content_normal" :data-item="item.Code" :class="'content_box_color'+(index+1)%6" :style="{zIndex: (900-index), background: item.status ? 'red' : '#fff'}"
            @mouseover="showBottomBox(index)" @mouseout.stop.prevent="hideBottomBox(index)" @click.stop="toApp(item.id, item.moduleName)">
                <span class="boc-name" :ref="index">{{item.moduleName}}</span>
                <div class="icon-circle" :class="'circle_bg_color'+(index+1)%6"></div>
                <!-- <a class="drag-icon-now" @mousedown.stop.prevent="dragAppMouseDown($event)">
                    <Icon type="arrow-move"></Icon>
                </a>     -->
                <Poptip width="101" placement="bottom-start" class="configBtnPanel" :style="{zIndex: 100000}">
                    <a v-if="item.Code !== 'Sys_Workflow'" class="setting-icon-box" @click="showHideIcon(index, item.id)">
                        <Icon type="gear-a"></Icon>
                    </a>
                    <div class="operateBtns" slot="content">
                        <a class="boxEdit"  @click.stop.prevent="modModule(item.id,item.moduleName)">修改</a>
                        <a class="boxDel"  @click.stop.prevent="delApp(item.id)" style="color:red;">
                            删除
                        </a>
                    </div>
                </Poptip>
            </div>
            <!-- 新建应用 -->
            <div  class="content_box_current content_normal box_add" id="add" data-item="Add" ref="add" @click="newModule()">
                <span class="boc-name" @click="newModule()" >新建应用</span>
               <!--  <div class="icon-wrap"> -->
                    <Icon type="plus-round" style="font-size:50px" color="#6fd5f7"></Icon>
                </div>
            </div>
            <!-- 新建应用弹出框/编辑应用弹出框 -->
        <!--     <Modal :showModal="showModal" :code="code" :devCode="returnData.DevCode" :modalTitle="modalTitle" @changeDisplayName="updateEditApp"
             :IsDeveloper="returnData.IsDeveloper" :iconClass="iconClass" @changeShowFlag="updateShowFlag" :DisplayName="DisplayName" @updateAppList="updateApp"></Modal> -->

             <Modal v-model="modAppFlag">
                  <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
                        <span>修改应用</span>
                  </p>
                 <Form ref="formValidate" :model="app"  :label-width="80">
                    <FormItem label="名称" >
                        <Input v-model="app.moduleName"></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                        <Button type="primary" @click="handleSubmit()">确定</Button>
                        <Button type="ghost"  @click="closeAddApp()" style="margin-left: 8px">取消</Button>
                </div>
            </Modal>
            <Modal v-model="showDelModal" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>删除</span>
                </p>
                <div style="text-align:center">
                    <p>删除会清除所有的表单，流程，用户数据。</p>
                    <p>确定删除?</p>
                </div>
                <div slot="footer">
                    <Button type="error"   :loading="modal_loading" @click="del">删除</Button>
                    <Button type="text"  @click="cancel">取消</Button>
                </div>
            </Modal>


            <!-- 删除应用弹出框弹出框 -->
            <!-- <del-appmodal :showDelModal="showDelModal" :appName="appName" :appCode="appCode"
             @changeDelShowFlag="updateDelShowFlag" @updateAppList="updateApp"></del-appmodal>
 -->

    </div>
    </div>
</template>

<script >
// import TopNav from 'components/reporting/top-nav'
//import { backIndexAppData, sortAppData, configMobileIndexData } from './../../service/getData'    //引入数据拉取接口
//import Modal from './back-index/modal'  //引入新建应用弹框
import DelAppmodal from './back-index/del-appmodal'  //引入删除应用弹框
import addModule from './newModule.vue';
import HTTP from '../../api/app-apply.js';
import { dragMouseDown } from './back-index/backIndex'  //引入拖拽排序js代码


export default {
    data() {
        return {
            moduleName:"apps",
            modAppFlag:false,
            spinShow:false,
            showModal: false,   //显示、隐藏新建应用弹出面板变量
            showDelModal: false, //显示、隐藏删除应用弹出面板变量
            showConfigModal: false,  //显示、隐藏首页移动端配置弹出面板变量
            showPublishFlag:false, //显示、隐藏发布到钉钉
            showPublishEngineFlag:false, //显示，隐藏定向发布配置变量
            showPublishAppmarketFlag:false, //显示，控制
            sheetOrApp: 'app',
            code: '',   //应用编码
            appName: '',  //应用编码名称
            appCode: '', //被删除应用的appCode码
            currentIndex: -1, //当前修改的app
            DisplayName: '',  //应用显示名称
            mobileIndexData: {},  //配置移动端首页数据
            modalTitle: '',
            IsDeveloper: false, //是否为开发者企业用户
            fontPicker: null,
            newApp:false,
            i: -1,   //鼠标滑过app模块时，才会出现底部设置，拖拽icon
            //模拟页面加载时返回的数据，等登录页面做好之后，替换为真实数据
            returnData: {},
            iconClass: '',   //选中的图标
            app:{moduleName:null,id:null},
            isDrag: false,
            // showPublishInDing: false,
            clickIndex: -1,
            engineType:"Product",
            devCode:"",
            customApp:{},
            ClusterType:"DingTalk",
            containerH: 0,
            appData:[],
            delId:null,
            modal_loading:false,
        }
    },
    watch: {
    },
    computed: {
    },
    created: function() {
        // 页面加载时，请求之前保存的apps应用数据
        let _self = this;
        this.code = this.returnData.DevCode
        this._setInfoContainerH();
        this._load()
        window.onresize = function temp() {
            _self._setInfoContainerH();
        };
        this.getModuleList()
    },
    methods: {
        exportConfigBtn () {
            window.location.href = '/ctg-workflow/act/app/exportAllAppDatas';
        },
        //初次渲染页面时，获取文档可视区域高度
        _setInfoContainerH() {
        let docmentH =
            document.documentElement.clientHeight || document.body.clientHeight;
        let Org_InfoH = docmentH - 10;
        this.containerH = Org_InfoH;

        },
        cancel(){
            this.showDelModal= false;
        },
        // 渲染页面时，读取后台app数据信息
        async _load() {

            if (true) {
                //请求app数据成功,将请求成功的数据绑定到vue页面
                // 判断应用是否为自己开发的
                this.devCode = this.returnData.DevCode;
                this.engineType = this.returnData.EngineType;
                this.customApp = this.returnData.CustomAppDic;
                this.ClusterType=this.returnData.ClusterType;
                console.log(this.returnData);
            }
        },
        //新建应用时处理子组件传递过来的modal显示隐藏标识
        updateShowFlag: function(flag) {
            //this.showModal = flag
        },
        // 点击新建按钮，弹出新建应用弹框
        showAddAppModal: function() {
            this.showModal = true
            this.modalTitle = '新建应用'
            this.hidePoptips();
        },
        getModuleList(del) {
            if (del) {
                var msg = this.$Message.loading({
                    content: '正在删除中，请稍后查看...',
                    duration: 0
                });
            }

            this.spinShow=true;
            HTTP.getAllModule()
            .then(res => {
                this.appData=res.page.result;
                 for(var index in this.appData){
                    this.appData[index].icon ="<use xlink:href="+this.appData[index].icon+"></use>"
                }
                if (del) {
                    setTimeout(msg, 1000);
                }
            })
            .catch(err => {
                    this.$Message.error('This is an error')
            }).finally(()=>{
                    this.spinShow=false;
            })
        },
        modModule(id,a){
            this.modAppFlag=true;
            this.app.moduleName=a;
            this.app.id=id;
            this.hidePoptips();

        },
        toApp (itemId, itemName) {
            // itemId='0f60c6ecf77a431490ac69fd0d24adf4';
             if(!this.isDrag){
                    this.$router.push({
                    name: 'appManager_index',
                    params: {moduleId: itemId, moduleName: itemName}
                });
            }
            this.isDrag = false

        },
        closeAddApp(){
            this.modAppFlag=false;
        },
        validateModule(moduleName){
            return new Promise((resolve,reject)=>{
                if(moduleName && moduleName.trim() !== ''){
                    return resolve();
                }else{
                    return reject('模块名不能为空');
                }
            });
        },
        newModule() {
            this.$Modal.confirm({
                render: (h) => {
                return h(addModule, {
                    props: {

                    },
                    on: {
                        value: (value1) => {
                            this.addParam = value1
                        },
                    icon: (value2) => {
                                    this.addIcon = value2
                                },
                            }
                        })
                },
                onOk: () => {
                    const msg = this.$Message.loading({
                        content: '正在保存..',
                        duration: 0
                    })
                    this.validateModule(this.addParam)
                        .then(()=>{
                            return HTTP.createModule(this.addParam,this.addIcon)
                        })
                        .then(res => {
                            this.$Message.destroy(msg);
                            let id=res.moduleId;
                            let name = res.moduleName;
                            if(res.code==0){
                                this.$Message.success("保存成功") ;
                                // this.getStartFlowList();


                                
                                this.$router.push({
                                    name: 'appManager_index',
                                    params: {moduleId: id, moduleName: name}
                                });



                                // this.$router.push({
                                //     name: 'formpage_index',
                                //     params: {moduleId: id}
                                // });
                            } else{
                                return Promise.reject(res.msg);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            this.$Message.destroy(msg);
                            this.$Message.error({
                                content: err || 'This is an error',
                                duration: 5
                            })
                        })
                    
                }
            })
        },
        // 点击编辑按钮，编辑应用app模块
        editApp: function(devcode, index, iconClass) {
            this.showModal = true
            this.modalTitle = '修改应用'
            this.code = devcode
            this.DisplayName = this.returnData.Apps[index].DisplayName
            this.currentIndex = index
            this.iconClass = iconClass
            this.hidePoptips();
        },
         handleSubmit(){
            this.validateModule(this.app.moduleName)
            .then(()=>{
                return HTTP.modModule(this.app);
            })
            .then(res => {
                if(res.code==0){
                    this.$Message.success('修改成功');
                    this.modAppFlag=false;
                    this.getModuleList();
                }else{
                    return Promise.reject(res.msg);
                }
            })
            .catch(err => {
                this.$Message.error({
                    content: err || 'This is an error',
                    duration: 5
                })
            }).finally(()=>{
                    this.spinShow=false;
            })


        },
        //将编辑弹窗更改的displayName值应用在更新的app上
        updateEditApp: function(params) {
            this.DisplayName = params[0];
            this.iconClass=params[1];
            let index = this.currentIndex;
            this.returnData.Apps[index].DisplayName = params[0];
            this.returnData.Apps[index].IconCss = params[1];
            //this._load();
        },
        updateApp() {
            this._load();
        },
        //删除应用时处理子组件传递过来的modal显示隐藏标识
        updateDelShowFlag: function(flag) {
            this.showDelModal = flag
        },
        // 点击删除按钮时，删除该app模块
        delApp: function(id) {
            this.showDelModal = true
            this.delId = id
        },
        del(){
            this.modal_loading=true;
            HTTP.delModule(this.delId)
            .then(res => {
                if(res.code==0){
                    this.showDelModal=false;
                    this.getModuleList('del');
                }

                else
                this.$Message.error('删除失败')
            })
            .catch(err => {
                    this.$Message.error('This is an error')
            }).finally(()=>{
                    this.modal_loading=false;
            })

        },
        // 拖拽排序
        dragAppMouseDown: function(e) {
            this.hidePoptips();
            this.isDrag = true;
            let Content = $('#content');
            let add = $('#add');
            dragMouseDown(e, Content, add);
        },
        // 点击不同的应用模块跳转至对应的应用详情
        jumpToSheet: function(code) {
            if(!this.isDrag){
                window.location.href = "./sheetdesignerindex.html?id=" + code;
            }
            this.isDrag = false
        },
        showHideIcon: function(index, id) {
            let flag = $($('.ivu-poptip-popper')[index]).is(":visible")
            $('.ivu-poptip-popper').hide();
            if(flag && this.i != index) {
                this.clickIndex = -1;
            }else{
                this.clickIndex = index;
            }
            this.isDrag = true;
        },
        showBottomBox: function(index) {
            this.i = index;
        },
        hideBottomBox: function(index) {
            if(!$('.ivu-poptip-popper').is(":visible")) {
                this.clickIndex = -1;
            }
            if(this.clickIndex==index){
                return
            }
            this.i = -1;
        },
        hidePoptips() {
            this.clickIndex = -1;
            $('.ivu-poptip-popper').hide();
        },
        showPublishInAppMarket(AppCode){
            //Saas开发者发布到应用市场，其他定向发布到企业
            if(AppCode){
                if( this.engineType != 'SaaSDevelopment'){
                    return false;
                }
                //是否自己开发的应用
                return AppCode.indexOf(this.devCode)>-1  && AppCode !== 'Sys_Workflow';
            }
            return false;
        },
        showShareOthers(AppCode){
            if(AppCode){
                if(this.engineType=="Product"){
                    return this.customApp && this.customApp[AppCode];
                }
                return AppCode.indexOf(this.devCode)>-1 && this.engineType!='SaaSDevelopment' && AppCode !== 'Sys_Workflow';
            }
            return false;
        },
    },
    components: {
        DelAppmodal,
    }
}
</script>

<!-- <style scope lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';
@import '~common/stylus/base';
@import '~common/stylus/reset';
@import '~common/stylus/back-index/back-index.styl'

</style>
 -->



// WEBPACK FOOTER //
// src/pages/back-index/App.vue
