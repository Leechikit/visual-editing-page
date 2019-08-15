<style>
#app {
    font-size: 14px;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
}

#app container{
    width:100%!important
}

#app #contentPages {
    height: 100%;
    width:100%!important;
    min-height:800px;
   /* padding-top: 55px;*/
    box-sizing: border-box;
    overflow: hidden
}

#app #contentPages .content-right {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    height: 100%
}

#app #contentPages .content-right #item-form {
    position: relative
}

#app #contentPages .content-right .content-tips {
    position: absolute;
    top: 345px;
    width: 312px;
    height: 98px;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #2b2b2b;
    letter-spacing: .6px;
    background: url(data:image/png;
    base64,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) no-repeat;line-height: 155px;
    padding-right: 30px;
    text-align: right
}

#app #contentPages .content-right .content-tips .Xclose {
    color: #39b7ff;
    position: relative;
    width: 16px;
    height: 16px;
    display: inline-block;
    font-size: 0;
    cursor: pointer;
    right: -14px;
    bottom: -64px
}

#app #contentPages .content-right #item-rep {
    z-index: 9
}

#app #contentPages .content-right .content-box-item {
    width: 228px;
    height: 253px;
    float: left;
    cursor: pointer;
    letter-spacing: 1px;
    margin: 74px 31px 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    border-radius: 4px;
    background: #f7fafb
}

#app #contentPages .content-right .content-box-item .icon {
    display: inline-block;
    margin-bottom: 15px;
    font-size: 85px
}

#app #contentPages .content-right .content-box-item .icon-sheet {
    color: #70d9ff
}

#app #content .content-right .content-box-item .icon-report {
    color: #00f3fe
}

#app #contentPages .content-right .content-box-item .item-title {
    font-size: 16px;
    margin-bottom: 10px;
    color: #333
}

#app #contentPages .content-right .content-box-item .item-tips {
    font-size: 11px;
    color: #949494
}

#app #contentPages .content-right .content-box-item-enable:hover {
    box-shadow: 0 2px 16px 0 rgba(78,131,175,.5);
    background: #fcfcfc
}

#app #contentPages .content-left {
    float: left;
    width: 280px;
    height: 100%;
    min-height:800px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.12);
    letter-spacing: 1px;
    position: relative
}

#app #contentPages .content-left #content-nav {
    text-align: left;
    height: 100%
}

#app #contentPages .content-left #content-nav:after {
    content: "";
    display: block;
    height: 210px
}

#app #contentPages .content-left .grid-operation {
    background-color: #f2f2f6!important
}

#app #contentPages .content-left .grid-nav {
    text-align: center;
    background-color: #f8f8f8;
    border: 1px solid #e0e0e0;
    border-right: 0;
    box-right-shadow: 0 2px 2px 0 rgba(0,0,0,.12)
}

#app #contentPages .content-left .grid-nav .grid-cell {
    height: 42px
}

#app #contentPages .content-left .grid-nav .grid-cell:hover span {
    color: #2d7fff
}

#app #contentPages .content-left .grid-nav .grid-cell span {
    display: inline-block;
    width: 100%;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #4d5f6c;
    border-right: 1px solid #d8d8d8;
    letter-spacing: 0;
    height: 24px;
    line-height: 24px;
    margin-top: 8px
}

#app #contentPages .content-left .grid-nav .grid-cell span img {
    margin: 0 5px 0 0;
    position: relative;
    top: 4px
}

#app #contentPages .content-left .grid-nav .grid-cell .noborder-right {
    border-right: 0 solid #d8d8d8
}

#app #contentPages .content-left .left-inner-nav {
    margin-left: 0;
    display: none
}

#app #contentPages .content-left .left-inner-nav .nav-item-li {
    padding-left: 55px!important
}

#app #contentPages .content-left .left-inner-nav .nav-item-li .icon {
    left: 28px!important
}

#app #contentPages .content-left .left-inner-nav .nav-item-li .icon-setting {
    left: 7px!important
}

#app #contentPages .content-left .left-inner-nav a {
    width: 70%!important
}

#app #contentPages .content-left .nav-item-li.active,#app #contentPages .content-left .nav-item-li:hover {
    background-color: #f4f8ff;
    border-left: 3px solid #2d7fff!important
}

#app #contentPages .content-left .nav-item-li.active .item-tool,#app #contentPages .content-left .nav-item-li:hover .item-tool {
    display: inline-block!important
}

#app #contentPages .content-left .nav-item-li.active ul,#app #contentPages .content-left .nav-item-li:hover ul {
    background-color: #fff
}

#app #contentPages .content-left .nav-item {
    position: relative
}

#app #contentPages .content-left .nav-item:hover {
    cursor: move
}

#app #contentPages .content-left .item-sort {
    width: 100%;
    margin-left: 0!important
}

#app #contentPages .content-left .item-sort .nav-item-li {
    position: relative;
    height: 46px;
    padding-left: 42px;
    color: #525252;
    font-size: 14px;
    border-left: 3px solid #fff
}

#app #contentPages .content-left .item-sort .nav-item-li .icon {
    position: absolute;
    left: 14px;
    top: 50%;
    margin-top: -9px;
    display: inline-block;
    color: #3db1ff;
    font-size: 18px
}

#app #contentPages .content-left .item-sort .nav-item-li .icon-setting {
    left: 6px;
    margin-top: -14px
}

#app #contentPages .content-left .item-sort .nav-item-li .icon-setting:hover {
    color: #2d7fff
}

#app #contentPages .content-left .item-sort .nav-item-li .item-text {
    color: #525252;
    display: inline-block;
    line-height: 45px!important;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 15px;
    text-overflow: ellipsis;
    position: relative;
    width: 78%
}

#app #contentPages .content-left .item-sort .nav-item-li .item-tool,#app #contentPages .content-left .item-sort .nav-item-li .sortimg {
    position: relative;
    float: right;
    margin-right: 20px;
    margin-top: 15px
}

#app #contentPages .content-left .item-sort .nav-item-li .item-tool img,#app #contentPages .content-left .item-sort .nav-item-li .sortimg img {
    width: 16px
}

#app #contentPages .content-left .item-sort .nav-item-li .item-tool {
    display: none;
    width: 30px;
    height: 27px;
    text-align: center;
    padding-top: 6px;
    height: 36px;
    margin-top: 10px
}

#app #contentPages .content-left .item-sort .nav-item-li .item-tool:hover {
    cursor: pointer
}

#app #contentPages .content-left .item-sort .nav-item-li .item-tool ul {
    display: inline-block;
    position: fixed;
    z-index: 10;
    margin-left: -20px;
    width: 140px;
    box-shadow: 1px 1px 5px 0 rgba(6,3,3,.19);
    background: #fff;
    border-radius: 2px;
    text-align: left
}

#app #contentPages .content-left .item-sort .nav-item-li .item-tool ul:before {
    content: "";
    border: 7px solid #561616;
    border-color: transparent transparent #fff;
    width: 0;
    height: 0;
    display: inline-block;
    position: absolute;
    top: -14px;
    left: 12px
}

#app #contentPages .content-left .item-sort .nav-item-li .item-tool ul li {
    display: block;
    height: 36px;
    line-height: 36px;
    padding: 0 10px
}

#app #contentPages .content-left .item-sort .nav-item-li .item-tool ul li a:hover {
    color: #7e8c8d
}

#app #contentPages .content-left .item-sort .nav-item-li .item-tool ul li:hover {
    background-color: #dff0fe
}

#app #contentPages .content-left .item-sort .nav-item-li .item-tool ul li .itemDel,#app #contentPages .content-left .item-sort .nav-item-li .item-tool ul li .itemDel:hover {
    color: #ff1a1a
}

#app .grid {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex
}

#app .grid .grid-cell {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1
}

#app .cursor {
    cursor: pointer
}

#app .marginLeft280 {
    margin-left: 280px
}

#app .cursorMove {
    cursor: move
}

#content-nav .grActive>.nav-item-li {
    background-color: #e2f1ff;
    border-left-color: #4b9bed
}

</style>


<template>
    <div id="app">
        <designer-top-nav :isSingleMode="engineInfo.SingletonModule" :title.sync="engineInfo.SheetName" type="sheet" :schema-code="code" :app-code="engineInfo.AppCode"
            :toLink="toLink"></designer-top-nav>
        <div id="contentPages">
            <div class="content-left" v-if="hasMenu">
                <div class="grid grid-nav" v-if="!isSorting">
                    <div class="grid-cell cursor" @click="toShowGroup({})" id="add-group">
                        <span>
                            <!-- <img src="../../common/images/xinjianfenzu.svg" width="18"> -->新建分组</span>
                    </div>
                    <div class="grid-cell cursor" @click="sortIndex(true)">
                        <span class="noborder-right">
                           <!--  <img src="../../common/images/paixu.svg" width="18"> -->调整顺序</span>
                    </div>
                </div>
                <div class="grid grid-nav grid-operation" v-if="isSorting">
                    <div class="grid-cell cursor" @click="finishSort">
                        <span>完成</span>
                    </div>
                    <div class="grid-cell cursor" @click="cancelSort">
                        <span class="noborder-right">取消</span>
                    </div>
                </div>
                <ul id="content-nav">
                    <li class="item-sort" v-for="(element,index) in appMenus" :key="element.Code" :class="{'group':element.NodeType == '230','nav-item':isSorting}"
                        :data-code="element.Code" :data-parent="element.ParentCode" :data-type="element.NodeType" @mouseout.stop.prevent="hideTipspop($event)">
                        <div class="nav-item-li">
                        <!-- <div class="nav-item-li" :class="activeIndex==index ? 'active' :''"> -->
                            <i class="icon" v-if="(element.NodeType == '200'||element.NodeType == '210' || element.NodeType == '240')" :class="element.IconCss"></i>
                            <i class="icon" v-if="element.NodeType == '220'" :class="element.IconCss"></i>
                            <i class="icon-folder-o icon" v-if="element.NodeType == '230'"></i>
                            <span v-if="!isSorting">
                                <a class="item-text" :target="'Form_'+ element.Code" :href="'./sheetdesigner.html?id=' + element.Code" v-if="(element.NodeType == '200'||element.NodeType == '210'||element.NodeType == '240')">{{element.DisplayName}}</a>
                                <a href="javascript:;" class="item-text" v-if="element.NodeType == '230'">{{element.DisplayName}}</a>
                                <a :target="'Report_'+ element.Code" class="item-text" v-if="element.NodeType == '220'" :href="'./reporting.html?code=' + element.Code">{{element.DisplayName}}</a>
                            </span>
                            <span v-else>
                                <a class="item-text" v-if="(element.NodeType == '200'||element.NodeType == '210'||element.NodeType == '240')">{{element.DisplayName}}</a>
                                <a href="javascript:;" class="item-text" v-if="element.NodeType == '230'">{{element.DisplayName}}</a>
                                <a class="item-text" v-if="element.NodeType == '220'">{{element.DisplayName}}</a>
                            </span>
                            <div class="item-tool" v-if="!isSorting" @click.stop="showTipspop(index, $event)" @mouseout.stop="emptyMethod">
                                <!-- <img v-if="!(!isDeveloper&&isSaasApp)" src="../../common/images/shezhi.svg" width="18"> -->
                                <a v-if="!(!isDeveloper&&isSaasApp)" class="setting-icon-box"><Icon type="gear-a"></Icon></a>
                                <ul v-if="!(!isDeveloper&&isSaasApp)" v-show="hoverIndex==index">
                                   
                                    <li v-if="element.NodeType == '200' || element.NodeType == '240'" data-tip="修改表单" @click.stop="addOrModifyOper(element,false,true,false,false,isSysWorkflow,false)">
                                        <a href="javascript:;" class="itemEdit">修改</a>
                                    </li>
                                    <li v-if="element.NodeType == '210'" data-tip="修改流程表单" @click.stop="addOrModifyOper(element,false,true,false,false,isSysWorkflow,true)">
                                        <a href="javascript:;" class="itemEdit">修改</a>
                                    </li>
                                    <li v-if="element.NodeType == '220'" data-tip="修改报表" @click.stop="addOrModifyOper(element,false,false,false,true,isSysWorkflow,false)">
                                        <a href="javascript:;" class="itemEdit">修改</a>
                                    </li>
                                    <li v-if="element.NodeType == '230'" @click.stop="toShowGroup(element,true)">
                                        <a href="javascript:;" class="itemEdit">修改</a>
                                    </li>
                                    <li v-if="element.NodeType != '230'"  @click.stop="visibleModelSetting(element)">
                                        <a href="javascript:;" class="itemEdit">显示模式设置</a>
                                    </li>
                                  <li v-if="element.NodeType != '240' && element.NodeType != '230'" @click.stop="publishToDing(element)">
                                    <a href="javascript:;" class="itemEdit">发布到钉钉工作台</a>
                                  </li>
                               
                                    <li @click.stop="confirmDe(element.Code,element.NodeType)">
                                        <a href="javascript:;" class="itemDel">删除</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="sortimg" v-if="isSorting">
                               <!--  <img src="../../common/images/jiantou.svg" style="width:16px;height:16px;"> -->
                            </div>
                        </div>
                        <ul v-if="element.NodeType == '230'" class="left-inner-nav" :id="element.Code">
                            <li class="item-sort" v-for="(child, index) in element.Children" :data-code="child.Code" :data-type="child.NodeType" :class="{'nav-item':isSorting}" :data-parent="child.ParentCode" @mouseout.stop.prevent="hideTipspop($event)">
                                <div class="nav-item-li">
                                    <!-- <div class="nav-item-li" :class="activeIndex==index ? 'active' :''"> -->
                                    <i class="icon" :class="child.IconCss"></i>
                                    <span v-if="!isSorting">
                                        <a class="item-text" @click.stop :href="'./sheetdesigner.html?id=' + child.Code" :target="'Form_'+ child.Code" v-if="(child.NodeType == '200'||child.NodeType == '210'||child.NodeType=='240')">{{child.DisplayName}}</a>
                                        <a class="item-text" @click.stop :href="'./reporting.html?code=' + child.Code" :target="'Report_'+ child.Code" v-if="child.NodeType == '220'">{{child.DisplayName}}</a>
                                    </span>
                                    <span v-else>
                                        <a class="item-text" @click.stop :target="'Form_'+ child.Code" v-if="(child.NodeType == '200'||child.NodeType == '210'||child.NodeType=='240')">{{child.DisplayName}}</a>
                                        <a class="item-text" @click.stop :target="'Report_'+ child.Code" v-if="child.NodeType == '220'">{{child.DisplayName}}</a>
                                    </span>
                                    <div class="item-tool" v-if="!isSorting" width="18" @click.stop="showTipspop(index, $event)" @mouseout.stop="emptyMethod">
                                        <!-- <img v-if="!(!isDeveloper&&isSaasApp)" src="../../common/images/shezhi.svg"> -->
                                        <a v-if="!(!isDeveloper&&isSaasApp)" class="setting-icon-box"><i class="icon icon-setting"></i></a>
                                        
                                        <ul v-if="!(!isDeveloper&&isSaasApp)" v-show="hoverIndex==index">
                                            
                                            <li v-if="child.NodeType == '200' || child.NodeType == '240'" data-tip="分组里修改表单" @click.stop="addOrModifyOper(child,false,true,false,false,isSysWorkflow,false)">
                                                <a href="javascript:;" class="itemEdit">修改</a>
                                            </li>
                                            <li v-if="child.NodeType == '210'" data-tip="分组里修改流程表单" @click.stop="addOrModifyOper(child,false,true,false,false,isSysWorkflow,true)">
                                                <a href="javascript:;" class="itemEdit">修改</a>
                                            </li>
                                            <li v-if="child.NodeType == '220'" data-tip="分组里修改报表" @click.stop="addOrModifyOper(child,false,false,false,true,isSysWorkflow,false)">
                                                <a href="javascript:;" class="itemEdit">修改</a>
                                            </li>
                                            <li @click.stop="visibleModelSetting(child)">
                                                <a href="javascript:;" class="itemEdit">显示模式设置</a>
                                            </li>
                                            <li v-if="child.NodeType != '240' && child.NodeType != '230'" @click.stop="publishToDing(child)">
                                                <a href="javascript:;" class="itemEdit">发布到钉钉工作台</a>
                                            </li>
                                            <li @click.stop="confirmDe(child.Code)">
                                                <a href="javascript:;" class="itemDel">删除</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="sortimg" v-if="isSorting">
                                        <!-- <img src="../../common/images/jiantou.svg"> -->
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="content-right" :class="{'marginLeft280':hasMenu}">
                <div id="item-form" class="content-box-item" :class="{'content-box-item-enable':!(!isDeveloper&&isSaasApp)}">
                    <div class="item-content" @click="addOrModifyOper({},true,false,false,false,isSysWorkflow,false)">
                        <span class="icon icon-sheet">
                               <svg style="margin-top:30px;width: 6em; height: 6em; vertical-align: -0.15em; fill: currentColor;overflow: hidden; margin:0 auto;" aria-hidden="true">
                                    <use xlink:href="#icon-renshishenqing"></use>
                                </svg>
                        </span>
                        <p class="item-title">新建表单</p>
                        <p class="item-tips">表单可用于数据采集和数据上报</p>
                    </div>
                </div>
                <div class="content-tips" @click="prevenParent()" v-if="showGuid && !hasMenu">
                    可以尝试新建表单
                    <span class="Xclose cursor" @click="displayNone()">X</span>
                </div>
                <div id="item-rep" class="content-box-item" :class="{'content-box-item-enable':!(!isDeveloper&&isSaasApp)}" v-if="!isSysWorkflow">
                    <div class="item-content" @click="addOrModifyOper({},false,false,true,false,isSysWorkflow,false)">
                        <span class="icon icon-report">
                            <!-- <img src="../../common/images/xinjianbaobiao.png" style="margin-left: 11px;"> -->
                        </span>
                        <p class="item-title">新建报表</p>
                        <p class="item-tips">报表可用于数据汇总,展示等</p>
                    </div>
                </div>
            </div>
        </div>
        <create-sheet :if-show-popups.sync="showSheetModal" :modal-title.sync="modalTitle" :code.sync="code" v-on:getSheetList="getSheetLists"
            v-on:closeSheetPopups="closeSheetPopups" :groupnames.sync="groupNames" :is-modify-sheet.sync="isModifySheet" :modify-object.sync="modifyObj"
            :dev-code.sync="devCode" :is-developer.sync="isDeveloper" :if-modify-workflow.sync="isModifyWorkflow" :if-sys-workflow.sync="isSysWorkflow"
            :if-create-report.sync='isCreateReport' :if-create-sheet.sync="isCreateSheet" :if-modify-report="isModifyReport"></create-sheet>
        <create-group :if-show-create-group.sync="showGroupModal" :modal-title.sync="modalTitle" v-on:getSheetList="getSheetLists"
            v-on:closeGroupPopups="closeGroupPopups" :is-modify-group.sync="isModifyGroup" :code.sync="code" :modify-group.sync="modifyGro"></create-group>
        <confirm-delete :if-show-confirm-delete.sync="showDeleteConfirm" :if-sys-workflow.sync="isSysWorkflow" :code="deleteCode"
            v-on:closeConfirm="closeConfirm" :deltype.sync="delType" v-on:getSheetList="getSheetLists"></confirm-delete>
        <visible-model :if-show-visible-model-setting="showVisibleModelSetting" 
            :menu-item="editingMenuItem"
            v-on:closeModelSet="closeModelSet"></visible-model>
		<publish-config :showPublishFlag="showPublishFlag" :modalTitle="modalTitle" :sheetOrApp="sheetOrApp"
			:appCode="code" :sheetCode="sheetCode" @changePublishShowFlag="updatePublishConfigFlag" >
        </publish-config>
    </div>
</template>

<script>
    import TopNav from '../../components/reporting/top-nav'
    import CreateSheet from '../../components/sheetdesigner/popups/create-sheet'
    import CreateGroup from '../../components/sheetdesigner/popups/create-group'
    import ConfirmDelete from '../../components/sheetdesigner/popups/confirm-delete'
    import VisibleModel from '../../components/sheetdesigner/popups/visible-model'
    import PublishConfig from '../../components/back-index/publish-config' //引入发布钉钉弹框
    import { getSheetLists, createGroup, createSheet, UpdateAppMenuSort } from '../../service/getData'
    import niceScroll from '../../lib/plugins/niceScroll/jquery.nicescroll.min.js'
    import "./sheetDesign.css"
    // import '../../lib/H3/Console/AppManage/AppManage.js'
    export default {
        data() {
            return {
                appMenus: [], //菜单
                showSheetModal: false, //是否显示表单模态框
                showGroupModal: false, //是否显示分组模态框 
                modalTitle: "",  //模态框标题
                isSorting: false, //正在排序
                showGuid: true, //是否显示操作指引“可以尝试新建表单”
                hasMenu: true, //有表单
                showDeleteConfirm: false, //是否显示删除确认框
                deleteCode: "",
                appNames: {},
                groupNames: [],
                appCodes: {},
                code: "",
                sheetCode: '', //表单编码
                delType: "", //确认删除的是表单还是组
                modifyObj: {},//要编辑的对象的属性
                devCode: "",
                isModifyGroup: false, //是否修改分组
                modifyGro: {},   //修改的分组名字
                isModifySheet: false,//确认是新建表单还是编辑表单
                isModifyReport: false,//是否修改报表
                isCreateSheet: false,//是否创建表单
                isCreateReport: false, //是否创建报表
                isModifyWorkflow: false, //是否修改流程报表
                showPublishFlag: false, //是否显示发布到钉钉工作台弹窗
                sheetOrApp: '',
                Module: {
                    GroupModule: 230,//分组
                    FormModule: 200,//表单
                    WorkflowModule: 210,   //流程表单
                    ReportModule: 220,  //报表
                    CustomListModule: 300,
                    SingletonModule: 240 //单表模式
                },
                isSysWorkflow: false,
                isDeveloper: false,
                isSaasApp: false,
                hoverIndex: -1,
                topTitle: '',
                // activeIndex: -1,
                sortIndexCount: 0,
                showVisibleModelSetting:false,
                setVisibleModelCode:'',
                editingMenuItem: null
            }
        },
        created() {
            //this.code = window.location.search.split("?")[1].split("=")[1];
            this.code=""
            this.getSheetLists();
            this.isSysWorkflow = true;
            if (this.code == 'Sys_Workflow') { // 判断ID是否属于流程表单
                this.isSysWorkflow = true;
            }
        },
        mounted() {
            var that = this;
            this.$nextTick(function() {
                that.drap();
            })
            
            that.init(); 
            window.addEventListener('scroll', function(){
                that.hoverIndex = -1;
            })
        },
        methods: {
            init: function () {
                $('#content-nav').niceScroll({
                    cursorcolor: "#ccc",
                    cursoropacitymin: 0.1,
                    cursoropacitymax: 0.5,
                    touchbehavior: false,
                    cursorwidth: "5px",
                    cursorborder: "0",
                    cursorborderradius: "5px",
                    autohidemode: "leave",
                    cursorminheight: 40,
                    mousescrollstep: 60
                });
            },
            openGroupEvent(){
                setTimeout(function(){
                    $("#content-nav").off('click').on("click", '.group', function () {
                        var $this = $(this);
                        if ($this.find('.icon').hasClass('icon-folder-o')) {
                            $this.find('.icon.icon-folder-o').removeClass('icon-folder-o').addClass('icon-folder-open-o');
                        } else {
                            $this.find('.icon.icon-folder-open-o').removeClass('icon-folder-open-o').addClass('icon-folder-o');
                        }
                        if ($this.hasClass('nav-item')) {
                            return false;
                        } else {
                            $this.find("ul.left-inner-nav").slideToggle(function () {
                                $('#content-nav').getNiceScroll().resize();
                            });
                        }
                    });
                },300);
            },
            showTipspop: function(index, e) {
                // this.activeIndex = index
                var that = this;
                let topPosition = $(e.currentTarget).parent().offset().top + 45
                $(e.currentTarget).find('ul')[0].style.top = topPosition+'px'
                if(that.hoverIndex == -1) {
                    that.hoverIndex = index;
                }else{
                    that.hoverIndex = -1;
                }  
            },
            hideTipspop: function(e) {
                this.hoverIndex = -1;
            },
            emptyMethod() {
                return true
            },
            closeSheetPopups: function (str) {//关闭新建表单
                var that = this;
                that.showSheetModal = str;
            },
            closeModelSet: function(str){
                this.showVisibleModelSetting = str;
                this.editingMenuItem = null;
            },
            closeGroupPopups: function (str) {//关闭新建表单
                var that = this;
                that.showGroupModal = str;
            },
            closeConfirm: function (str) {
                var that = this;
                that.showDeleteConfirm = str;
            },
            addOrModifyOper: function (obj, isCreateSheet, isModifySheet, isCreateReport, isModifyReport, isSysWorkflow, isModifyWorkflow) { //打开新建表单
                var that = this;
                if(that.isSorting){
                    $.IShowError("","请先完成排序!");
                    return;
                }
                if (!that.isDeveloper && that.isSaasApp) {
                    $.IShowError("", "安装的应用不允许创建!");
                    return;
                }
                that.showSheetModal = true;
                if (isCreateSheet) {
                    that.modalTitle = '新建表单';
                } else if (isModifySheet) {
                    that.modalTitle = "修改表单";
                } else if (isCreateReport) {
                    that.modalTitle = "新建报表";
                } else {
                    that.modalTitle = "修改报表";
                }
                that.isSysWorkflow = isSysWorkflow;
                that.isModifyWorkflow = isModifyWorkflow;
                that.isModifySheet = isModifySheet;
                that.isCreateSheet = isCreateSheet;
                that.isModifyReport = isModifyReport;
                that.isCreateReport = isCreateReport;
                that.modifyObj = obj;
            },
            toShowGroup: function (obj, isModifyGroup) {  //打开新建分组

                // this.openGroupEvent();

                var that = this;
                that.showGroupModal = true;
                that.modalTitle = isModifyGroup ? "修改分组名称" : "新建分组";
                that.isModifyGroup = isModifyGroup;
                that.modifyGro = obj;
            },
            async UpdateAppMenuSort(code, appcode) {
                var that = this;
                let res = await UpdateAppMenuSort(code, appcode);
                if (res.Successful) {
                    $.IShowSuccess('排序保存成功');
                } else {
                    $.IShowWarn(res.ErrorMessage);
                }
            },
            async getSheetLists(str) {  //获取列表数据
                var that = this;
                var Module = {
                    GroupModule: 230,//分组
                    FormModule: 210,//表单
                }
                let res = {"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"IsWorkflow":true,"IsCustomApp":false,"RootNodeSummary":{"ObjectId":"62a4f88d-0877-4869-b25a-671f28731e69","DisplayName":"流程中心","ParentCode":null,"Code":"Sys_Workflow","AppCode":null,"IconCss":" icon-Financial_028 ","SortKey":0,"NodeType":190,"OpenType":0,"visible":true,"MobileVisible":false,"IsAppSetting":false,"Children":[{"ObjectId":"5cef4694-4092-415e-bb0f-1d1f6512ce6a","DisplayName":"oa","ParentCode":"Sys_Workflow","Code":"ab0eef5341424dff91efe9af1a349392","AppCode":"Sys_Workflow","IconCss":null,"SortKey":0,"NodeType":230,"OpenType":1,"visible":true,"MobileVisible":true,"IsAppSetting":false,"Children":[{"ObjectId":"553eaf3d-4fc0-47ab-a87b-852681594c07","DisplayName":"请假","ParentCode":"ab0eef5341424dff91efe9af1a349392","Code":"611d0069de7e4ab09c5e2d292caa030b","AppCode":"Sys_Workflow","IconCss":"icon-cgrk","SortKey":1,"NodeType":210,"OpenType":1,"visible":true,"MobileVisible":true,"IsAppSetting":false,"Children":[]},{"ObjectId":"ce7d7d98-583c-4851-824b-9a9afc1d205c","DisplayName":"123","ParentCode":"ab0eef5341424dff91efe9af1a349392","Code":"b33181d3f171429eb19e5f188465759a","AppCode":"Sys_Workflow","IconCss":"icon-cgfk","SortKey":2,"NodeType":210,"OpenType":1,"visible":true,"MobileVisible":true,"IsAppSetting":false,"Children":[]},{"ObjectId":"fad0b907-51b1-4ffb-8203-c7cb1d511b50","DisplayName":"报销","ParentCode":"ab0eef5341424dff91efe9af1a349392","Code":"acf6be7cf93c4b42b071366c5ab130dc","AppCode":"Sys_Workflow","IconCss":"icon-Financial_028","SortKey":3,"NodeType":210,"OpenType":1,"visible":true,"MobileVisible":true,"IsAppSetting":false,"Children":[]},{"ObjectId":"83b0b16f-54b8-4b54-8465-75fc74f6b82c","DisplayName":"侧耳","ParentCode":"ab0eef5341424dff91efe9af1a349392","Code":"9a9dea381b414b1bb3e20a9e235f4183","AppCode":"Sys_Workflow","IconCss":"icon-cgfk","SortKey":236,"NodeType":210,"OpenType":1,"visible":true,"MobileVisible":true,"IsAppSetting":false,"Children":[]},{"ObjectId":"15548715-3384-420a-853c-5b1266011528","DisplayName":"5","ParentCode":"ab0eef5341424dff91efe9af1a349392","Code":"b65d87f8195d4429ac6df17d4cf83990","AppCode":"Sys_Workflow","IconCss":"icon-cgfk","SortKey":237,"NodeType":210,"OpenType":1,"visible":true,"MobileVisible":true,"IsAppSetting":false,"Children":[]},{"ObjectId":"694633ab-a49e-474d-957a-9ad1c6fc1277","DisplayName":"rr","ParentCode":"ab0eef5341424dff91efe9af1a349392","Code":"500f073f1f674c20842a164ec12a7847","AppCode":"Sys_Workflow","IconCss":"icon-cgfk","SortKey":238,"NodeType":210,"OpenType":1,"visible":true,"MobileVisible":true,"IsAppSetting":false,"Children":[]}]},{"ObjectId":"0e9bf67b-5084-4923-876e-51554b180d02","DisplayName":"555","ParentCode":"Sys_Workflow","Code":"0b69cbdfcaf24f9b92a9f2d9fb68b201","AppCode":"Sys_Workflow","IconCss":"icon-cgfk","SortKey":5,"NodeType":210,"OpenType":1,"visible":true,"MobileVisible":true,"IsAppSetting":false,"Children":[]},{"ObjectId":"556b785d-13f5-4b66-b656-e5fdb1ed7dcd","DisplayName":"444","ParentCode":"Sys_Workflow","Code":"ebec220906ab41408d812d827a940f9e","AppCode":"Sys_Workflow","IconCss":null,"SortKey":230,"NodeType":230,"OpenType":1,"visible":true,"MobileVisible":true,"IsAppSetting":false,"Children":[]},{"ObjectId":"0ff18f1a-3489-4913-ad6b-f37b916ad730","DisplayName":"33","ParentCode":"Sys_Workflow","Code":"9e84616ef3fd4cbe8d1f616ea4c0abd5","AppCode":"Sys_Workflow","IconCss":"icon-cgfk","SortKey":234,"NodeType":210,"OpenType":1,"visible":true,"MobileVisible":true,"IsAppSetting":false,"Children":[]}]},"AppMenus":null,"IsDeveloper":false,"DevCode":null,"IsSaasApp":false,"PrivateDevelopment":""}};
                if (res.Successful) {
                    that.appMenus = res.ReturnData.RootNodeSummary.Children;
                    that.topTitle = res.ReturnData.RootNodeSummary.DisplayName;
                    that.showGroupModal = str;
                    that.showSheetModal = str;
                    that.showDeleteConfirm = str;
                    //登录成功，测试请求          
                    //判断是否显示左边列表
                    that.hasMenu = that.appMenus && that.appMenus.length > 0;
                    that.devCode = res.ReturnData.DevCode;
                    that.isDeveloper = res.ReturnData.IsDeveloper;
                    that.isSaasApp = res.ReturnData.IsSaasApp;
                    // console.log(that.isDeveloper);
                    this.openGroupEvent();
                } else {
                    that.hasMenu = false
                    $.IShowWarn(res.ErrorMessage);
                }
                that.groupNames = [{ "Code": that.code, "DisplayName": '无分组' }];
                if (res.ReturnData.RootNodeSummary) {
                    if (res.ReturnData.RootNodeSummary.Children) {
                        $.each(res.ReturnData.RootNodeSummary.Children, function (index, item) {
                            if (item.NodeType == Module.GroupModule) {
                                that.groupNames.push({
                                    Code: item.Code,
                                    DisplayName: item.DisplayName
                                });
                            } else {
                                that.appNames[item.Code] = item.DisplayName;
                            }
                        });
                    }
                }
            },
            sortIndex: function (bl) {  //是否排序
                this.sortIndexCount++;
                this.isSorting = bl;
                if(this.sortIndexCount != 0) {
                    this.drap();
                }
            },
            cancelSort: function () { //取消排序
                var that = this;
                that.isSorting = false;
                that.getSheetLists();
            },
            prevenParent: function (event) {
                return false;
            },
            displayNone: function () {
                var that = this;
                that.showGuid = false;
            },
            drap: function () {  // 表单拖拽排序
                var that = this;
                $.fn.drag = function (opt) {
                    var container = this;
                    opt = $.extend({}, { dragDown: function () { } }, opt);
                    var isDrag = false;
                    var startPoint;
                    var curGr;
                    $(container).on('mousedown.menudrag', '.nav-item', function (e) {
                        if (e.which != 1 || $(e.target).is("input, textarea") || window.kp_only) return; // 排除非左击和表单元素
                        startPoint = e;
                        e.preventDefault(); // 阻止选中文本
                        var isDrag = false, isStartMove = false;
                        var x = e.pageX;
                        var y = e.pageY;
                        var _this = $(this); // 点击选中块
                        var w = _this.outerWidth();
                        var h = _this.height();
                        var w2 = w / 2;
                        var h2 = h / 2; h2 = h2 > 17 ? 17 : h2;
                        var p = _this.offset();
                        var left = p.left;
                        var top = p.top;
                        window.kp_only = true;
                        var wid;

                        var isTarGroup = _this.hasClass("group");

                        // 绑定mousemove事件
                        $(document).bind("mousemove.menudrag", function (e) {
                            e.preventDefault();

                            if (isDrag == false && Math.abs(startPoint.pageX - e.pageX) < 5 && Math.abs(startPoint.pageY - e.pageY) < 5) {
                                return;
                            }

                            if (isStartMove === false) {
                                isStartMove = true;
                                // 添加虚线框
                                _this.before('<div id="emptyBox"></div>');
                                wid = $("#emptyBox");
                                wid.css({
                                    "outline": "1px dashed #ddd",
                                    "height": _this.outerHeight(true)
                                });

                                // 保持原来的宽高
                                _this.css({
                                    "width": w,
                                    "height": h,
                                    "position": "fixed",
                                    "opacity": 0.8,
                                    "z-index": 999,
                                    "left": left,
                                    "top": top
                                }).addClass("drag");
                            }

                            isDrag = true;
                            // 移动选中块
                            var l = left + e.pageX - x;
                            var t = top + e.pageY - y;
                            _this.css({
                                "left": 0,
                                "top": t
                            });

                            // 选中块的中心坐标
                            var ml = l + w2;
                            var mt = t + h2;

                            var $items = $(container).find(".nav-item:visible").not(_this).not(wid);
                            if (_this.hasClass("group")) {
                                $items = $(container).children().not(wid).not(_this);
                            }

                            if (!$items || $items.length == 0) return;
                            // 遍历所有块的坐标
                            for (var i = 0, len = $items.length; i < len; i++) {
                                var obj = $($items[i]);
                                var p = obj.offset();
                                var a1 = p.left;
                                var a2 = p.left + obj.width();
                                var a3 = p.top;
                                var a4 = p.top + obj.height();
                                var isGroup = obj.hasClass("group");
                                // var isGrActive = obj.hasClass("grActive");
                                var navItem = obj.hasClass("nav-item");

                                wid.show();
                                // 移动虚线框
                                curGr = null;
                                if (a1 < ml && ml < a2 && a3 < mt && mt < a4) {

                                    if (isTarGroup == false) {//拖拽的为表单
                                        //if (isGroup && !isGrActive) {//当表单拖入没打开分组表头时显示虚线框表示可拖人，若拖入的是已打开分组表头不做任何操作
                                        if (isGroup) {//当表单拖入没打开分组表头时显示虚线框表示可拖人，若拖入的是已打开分组表头不做任何操作
                                            if ((a3 + h2 - 13) < mt && mt < (a3 + h2 + 13)) {
                                                curGr = obj;
                                                wid.hide();
                                                obj.addClass("dashed");
                                                break;
                                            }
                                        }
                                    }
                                    obj.removeClass("dashed");

                                    if (mt > (a3 + h2)) {
                                        wid.insertAfter(obj);
                                        if (navItem && !isTarGroup) {//拖拽为表单拖入分组时只能交换位置
                                            continue;
                                        }
                                        break;
                                    }
                                    else {
                                        wid.insertBefore(obj);
                                        if (navItem && !isTarGroup) {//拖拽为表单拖入分组时只能交换位置
                                            continue;
                                        }
                                        break;
                                    }
                                }
                            };
                        });

                        // 绑定mouseup事件
                        $(document).unbind("mouseup.menudrag").bind("mouseup.menudrag", function () {
                            //console.time("停止拖拽")
                            window.kp_only = false;
                            isStartMove = false;

                            $(document).unbind('mouseup.menudrag').off('mousemove.menudrag');
                            if (!isDrag) {
                                if (_this.hasClass("group")) {
                                    _this.toggleClass("grActive");
                                    _this.children(".nav-item-li").find(".itemIcon").toggleClass("fa-folder").toggleClass("fa-folder-open").end().siblings("ul.left-inner-nav").slideToggle(function () {
                                        $('#content-nav').getNiceScroll().resize();
                                    });
                                }
                                else if(_this.data('item')){
                                    if (_this.data('item').NodeType === Module.ReportModule) {
                                        window.open(sheetReportUrl + '/?id=' + _this.attr('data-code'), _this.attr('data-code') + "_console");
                                    }
                                    else if (_this.data('item').NodeType === Module.CustomListModule) {
                                        window.open(customListViewSettingUrl + '/?id=' + _this.attr('data-code'), _this.attr('data-code') + "_console");
                                    }
                                    else {
                                        window.open(sheetDesignerUrl + '/?id=' + _this.attr('data-code'), _this.attr('data-code') + "_console");
                                    }
                                }
                                return;
                            }

                            // 拖拽回位，并删除虚线框
                            var p = wid.offset();

                            _this.removeClass("drag")
                            _this.removeAttr("style");

                            if (curGr) {
                                curGr.children("ul").append(_this);
                            } else {
                                wid.replaceWith(_this);
                            }
                            curGr = null;
                            setTimeout(function () {
                                $("#content-nav").children(".group").removeClass("dashed");
                                isDrag && (opt.dragDown && opt.dragDown(_this));
                            }, 0);
                        });
                    });

                    $(container).on('mousedown', '.itemEdit,.itemDel', function (e) {
                        return false;
                    });
                    return $(container);
                };
                $("#content-nav").drag();
            },
            finishSort: function ($that) {  //
                var that = this;
                var nav = nav || $('#content-nav');
                var t = {};
                nav.find(".nav-item").each(function (i) {
                    var code = $(this).data('code');
                    var Parentcode;
                    var type = $(this).parents("ul").attr('id') == 'content-nav' ? '210' : '230';
                    if (type == '230') {
                        Parentcode = $(this).parents('ul').attr('id');
                    } else {
                        Parentcode = that.code;
                    }
                    var tmp = {};
                    tmp[code] = Parentcode;
                    $.extend(t, tmp);
                });
                that.UpdateAppMenuSort(JSON.stringify(t), that.code);
                that.isSorting = false;
            },
            confirmDe: function (code, type) {
                var that = this;
                that.showDeleteConfirm = true;
                that.deleteCode = code;
                that.delType = (type && type == "230") ? "group" : (type && type == "220") ? "report" : 'sheet';
                //type=="230"调用RemoveGroup，否则调用RemoveAppMenu
                // that.delType = (type&&type=="230")?"group":"sheet";
            },
            publishToDing(child) {
                this.modalTitle = '发布到钉钉工作台';
                this.showPublishFlag = true;
                this.sheetCode = child.Code;
                if(child.NodeType == '200' || child.NodeType == '210') {
                    this.sheetOrApp = 'sheet';
                }else if(child.NodeType == '220') {
                    this.sheetOrApp = 'report';
                }
                
            },
            updatePublishConfigFlag(flag) {
                this.showPublishFlag = flag;
            },
			visibleModelSetting: function (menuItem){
                var that = this;
                that.showVisibleModelSetting = true;
                //that.setVisibleModelCode = menuItem.code;
                this.editingMenuItem = menuItem;
            }
        },
        components: {
            TopNav,
            CreateSheet,
            CreateGroup,
            ConfirmDelete,
            VisibleModel,
            PublishConfig
        }
    }
</script>



// WEBPACK FOOTER //
// src/pages/sheetDesignerIndex/App.vue