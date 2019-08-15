<style scoped>
@import url("./style.css");
</style>

<template>
    <div id="app">
        <designer-top-nav :isSingleMode="engineInfo.SingletonModule" :title.sync="engineInfo.SheetName" type="sheet" :schema-code="code" :app-code="engineInfo.AppCode"
            :toLink="toLink"></designer-top-nav>
        <div v-if='type!="flow"'>
            <div id="DesignerZone" class="row" v-show="showIndex==0">
                <div class="sheet-design-col" id="ControlsWrapper">
                    <div id="Controls" class="sheet-design-left" tabindex="0">
                        <div class="control-header" id="btn_Save" style="padding-top:5px;">     基础控件
                            <Button
                                :loading="sheetDesigner.IsPosting"
                                :disabled="sheetDesigner.IsPosting"
                                type="primary"
                                size="small"
                                class="sheet-design--submit-btn"
                            >
                                <span v-if="!sheetDesigner.IsPosting">保存表单</span>
                                <span v-else>保存中...</span>
                            </Button>
                        </div>
                        <ul class="nav">
                            <li>
                                <a href="javascript:void(0);"  canDropType="STG" class="drag ui-draggable" data-controlkey="FormTextBox" title="单行文本">
                                    <Icon type="compose" color="#57a3f3"></Icon>&nbsp&nbsp单行文本
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormTextArea" title="多行文本">
                                    <Icon type="clipboard" color="#57a3f3"></Icon>&nbsp&nbsp多行文本
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormDateTime" title="日期">
                                    <Icon type="calendar" color="#57a3f3"></Icon>&nbsp&nbsp日期

                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormNumber" title="数字">
                                    <Icon type="ios-calculator" color="#57a3f3"></Icon>&nbsp&nbsp数字
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormRadioButtonList" title="单选框">
                                    <Icon type="android-radio-button-on" color="#57a3f3"></Icon>&nbsp&nbsp单选框
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormCheckboxList" title="复选框">
                                    <Icon type="android-checkbox-outline" color="#57a3f3"></Icon>&nbsp&nbsp复选框
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormDropDownList" title="下拉框">
                                    <Icon type="android-arrow-dropdown-circle" color="#57a3f3"></Icon>&nbsp&nbsp下拉框
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormAttachment" title="附件">
                                    <Icon type="paperclip" color="#57a3f3"></Icon>&nbsp&nbsp 附件
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormAreaSelect" title="地址">
                                    <Icon type="ios-home" color="#57a3f3"></Icon>&nbsp&nbsp 地址
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormCitySelect" title="城市">
                                    <Icon type="ios-home" color="#57a3f3"></Icon>&nbsp&nbsp 城市
                                </a>
                                
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable " data-controlkey="FormUser" title="人员单选">
                                     <Icon type="ios-person" color="#57a3f3"></Icon>&nbsp&nbsp 人员单选
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable " data-controlkey="FormMultiUser" title="人员多选">
                                     <Icon type="ios-people" color="#57a3f3"></Icon>&nbsp&nbsp 人员多选
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable " data-controlkey="FormDepartment" title="部门单选">
                                     <Icon type="ios-list-outline" color="#57a3f3"></Icon>&nbsp&nbsp 部门单选
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable " data-controlkey="FormMultiDepartment" title="部门单选">
                                     <Icon type="ios-paper-outline" color="#57a3f3"></Icon>&nbsp&nbsp 部门多选
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormPhoto" title="图片">
                                     <Icon type="image" color="#57a3f3"></Icon>&nbsp&nbsp 图片
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormCheckbox" title="是/否">
                                     <Icon type="android-checkbox-outline" color="#57a3f3"></Icon>&nbsp&nbsp 是/否
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormFolder" title="附件">
                                    <Icon type="ios-folder" color="#57a3f3"></Icon>&nbsp&nbsp 文件库
                                </a>
                            </li>
                        </ul>
                        <div class="control-header">布局控件</div>
                        <ul class="nav">
                            <li>
                                <a href="javascript:void(0);" canDropType="S" class="drag issystem ui-draggable" title="分组标题" data-controlkey="page-header">
                                    <Icon type="social-hackernews-outline" color="#57a3f3"></Icon>&nbsp&nbsp分组标题
                                </a>
                                <a href="javascript:void(0);" canDropType="S" class="drag issystem ui-draggable" title="一行两列" data-controlkey="layout_towcols">
                                    <Icon type="pause" color="#57a3f3"></Icon>&nbsp&nbsp一行两列
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="S" class="drag issystem ui-draggable" title="描述说明" data-controlkey="DesControl">
                                    <Icon type="document" color="#57a3f3"></Icon>&nbsp&nbsp描述说明
                                </a>
                                <a href="javascript:void(0);" canDropType="S" class="drag ui-draggable" title="子表" data-controlkey="FormGridView">
                                    <Icon type="ios-barcode-outline" color="#57a3f3"></Icon>&nbsp&nbsp子表
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="S" class="drag issystem ui-draggable" title="展开收起" data-controlkey="layout_expand">
                                    <Icon type="android-menu" color="#57a3f3"></Icon>&nbsp&nbsp展开收起
                                </a>
                            </li>
                        </ul>
                        <div class="control-header">系统控件</div>
                        <ul class="nav">
                            <li>
                                <a href="javascript:void(0);" canDropType="ST" class="drag issystem ui-draggable" title="流水号" data-controlkey="FormSeqNo"
                                    data-datafield="SeqNo">
                                    <Icon type="ios-barcode" color="#57a3f3"></Icon>&nbsp&nbsp 流水号
                                </a>
                                <a href="javascript:void(0);" canDropType="ST" class="drag issystem ui-draggable" title="创建人" data-controlkey="FormLabel"
                                    data-datafield="CreatedBy.FullName">
                                    <Icon type="person" color="#57a3f3"></Icon>&nbsp&nbsp 创建人
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="ST" class="drag issystem ui-draggable" title="所属部门" data-controlkey="FormDepartment"
                                    data-datafield="OwnerDeptId">

                                    <Icon type="grid" color="#57a3f3"></Icon>&nbsp&nbsp 所属部门
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="ST" class="drag issystem ui-draggable" title="创建时间" data-controlkey="FormLabel"
                                    data-datafield="CreatedTime">
                                    <Icon type="ios-clock-outline" color="#57a3f3"></Icon>&nbsp&nbsp 创建时间
                                </a>
                                <a href="javascript:void(0);" canDropType="ST" class="drag issystem ui-draggable" title="修改时间" data-controlkey="FormLabel"
                                    data-datafield="ModifiedTime">
                                    <Icon type="ios-clock" color="#57a3f3"></Icon>&nbsp&nbsp 修改时间
                                </a>
                            </li>
                        </ul>
                        <div class="control-header">高级控件</div>
                        <ul class="nav">
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormQuery" title="关联表单">
                                    <Icon type="ios-list-outline" color="#57a3f3"></Icon>&nbsp&nbsp 关联表单
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormAssociateProperty" title="关联属性">
                                    <Icon type="ios-photos" color="#57a3f3"></Icon>&nbsp&nbsp关联属性 </a> 
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormMultiQuery" title="关联表单多选">
                                   <Icon type="social-buffer" color="#57a3f3"></Icon>&nbsp&nbsp 关联表单多选
                                </a>
                                 <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormList" title="列表查询">
                                  <Icon type="ios-list-outline" color="#57a3f3"></Icon>&nbsp&nbsp 列表查询
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormFormula" title="公式型控件">
                                    <Icon type="ios-calculator" color="#57a3f3"></Icon>&nbsp&nbsp 富文本编辑
                                </a>
                                <!-- 代码内嵌控件入口 -->
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormEmbedCode" title="代码内嵌">
                                    <Icon type="code" color="#57a3f3"></Icon>&nbsp&nbsp 代码内嵌
                                </a>
                                <!-- 审批记录控件入口 -->
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormApprovalRecord" title="代码内嵌">
                                    <Icon type="ios-paper" color="#57a3f3"></Icon>&nbsp&nbsp 审批记录
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="sheet-design-col" id="Designer-right-wrapper">
                    <div class="Designer-right">
                        <div class="property-tabs">
                            <a href="javascript:void(0);" id="btn_SheetControlProperty" data-target="#SheetControlPropertysPanel" class="">控件属性</a>
                            <a href="javascript:void(0);" id="btn_SheetProperty" class="active" data-target="#SheetPropertysPanel">表单属性</a>
                        </div>
                        <div id="tabs-content">
                            <div id="SheetControlPropertysPanel" tabindex="1" placeholder="请先选择或者拖入控件"></div>
                            <div id="SheetPropertysPanel" tabindex="2">
                                <div class="property-group">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">
                                            数据标题
                                             <i data-tip='数据标题用于快速辨别一条数据，适用于移动端列表显示、web列表首列标题、关联表单数据显示等场景中<br/>' class='ivu-icon ivu-icon-help-circled' style="color:#2d7fff"></i>
                                        </div>
                                    </div>
                                    <div id="ProAddNameItems" class="property-item">
                                        <div class="property-input" id="NameItems" placeholder="添加标题">
                                        </div>
                                        <i id="AddNameItems" class="icon-add"></i>
                                    </div>
                                </div>
                                <div class="property-group" v-show="!isWorkflow">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">操作权限</div>
                                    </div>
                                    <div class="property-item property-buttons">
                                        <div>
                                            <a class="btn btn-default" id="btnShowFieldAclModal" @click="showFieldAclModal">
                                                <i class="fa fa-building-o mr5"></i> 设置操作权限</a>
                                        </div>
                                    </div>
                                </div>


                                <div class="property-group">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">
                                            表单提交校验
                                            <i data-tip='当表单满足设定条件时无法提交' class='ivu-icon ivu-icon-help-circled' style="color:#2d7fff"></i>
                                        </div>
                                    </div>
                                    <div class="property-item property-buttons">
                                        <div>
                                            <a class="btn btn-default FormulaEditable" formula-button="true" id="btn_SchemaSubmitFormula">
                                                <i class="fa fa-check-square-o mr5"></i> 设置校验条件
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="property-group ">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">
                                            业务规则
                                            <i data-tip='可对其他表单的数据进行插入、更新、删除等操作' class='ivu-icon ivu-icon-help-circled' style="color:#2d7fff"></i>
                                        </div>
                                    </div>
                                    <div class="property-item property-buttons">
                                        <div>
                                            <a class="btn btn-default" id="btn_PropertyEventHandler">
                                                <i class="fa fa-building-o mr5"></i>设置业务规则</a>
                                        </div>
                                    </div>
                                </div>


                                <div class="property-group">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">富文本规则</div>
                                    </div>
                                    <div class="property-item property-buttons">
                                        <div>
                                            <a class="btn btn-default" id="btnShowFieldAclModal" @click="showEditorModal">
                                                <i class="fa fa-building-o mr5"></i> 设置富文本规则</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="property-group">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">Word 模板</div>
                                    </div>
                                    <div class="property-item property-buttons">
                                        <div>
                                            <a class="btn btn-default" id="btnShowFieldAclModal" @click="showWordModal">
                                                <i class="fa fa-file-word-o mr5"></i>设置 Word 模板</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="property-group">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">表单编码</div>
                                    </div>
                                    <div class="property-item property-buttons">
                                        <div>
                                            <Input placeholder="设置表单编码" v-model="sheetDesigner.formCode" @on-change="changeFormCode"></Input>
                                        </div>
                                    </div>
                                </div>
                                 <div class="property-group">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">
                                             <Checkbox  v-model="bigForm" @on-change="changeBigForm" :disabled="checkDisabled">
                                                 开启大表单
                                             </Checkbox>
                                            <i data-tip='开启后无法取消,而且会使单行文本非重复输入校验失效' class='ivu-icon ivu-icon-help-circled' style="color:#2d7fff"></i>
                                        </div>
                                    </div>
                                    <div class="property-item property-buttons">
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="sheet-design--app-name">{{(moduleName + '--' + appName) || ''}}<p>
                <div class="sheet-design-col" id="sheetContentWrapper">
                    <div class="Designer-view" tabindex="3">
                        <div id="sheetContent" class="sheetContent ui-sortable" placeholder="">
                        </div>
                    </div>
                </div>
            </div>
            <cs-code-zone v-if="isDevMode" :csCode="csCode" :appCode="appCode" :schemaCode="code" :showIndex="showIndex" @mounted="csOnMounted"></cs-code-zone>
            <javascript-code-zone v-if="isDevMode" :jsCode="jsCode" :showIndex="showIndex" @mounted="jsOnMounted"></javascript-code-zone>
        </div>
        <div v-else>
            <div id="DesignerZone" class="row" v-show="showIndex==0">
                <div class="sheet-design-col" id="ControlsWrapper">
                    <div id="Controls" class="sheet-design-left" tabindex="0">
                        <div class="control-header" id="btn_Save" style="padding-top:5px;">     基础控件
                            <Button
                                :loading="sheetDesigner.IsPosting"
                                :disabled="sheetDesigner.IsPosting"
                                type="primary"
                                size="small"
                                class="sheet-design--submit-btn"
                            >
                                <span v-if="!sheetDesigner.IsPosting">保存表单</span>
                                <span v-else>保存中...</span>
                            </Button>
                        </div>
                        <ul class="nav">
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="ApiTextArea" title="多行文本">
                                    <Icon type="clipboard" color="#57a3f3"></Icon>&nbsp&nbsp字符串
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="ApiDateTime" title="日期">
                                    <Icon type="calendar" color="#57a3f3"></Icon>&nbsp&nbsp日期

                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="ApiNumber" title="数字">
                                    <Icon type="ios-calculator" color="#57a3f3"></Icon>&nbsp&nbsp数字
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="sheet-design-col" id="Designer-right-wrapper">
                    <div class="Designer-right">
                        <div class="property-tabs">
                            <a href="javascript:void(0);" id="btn_SheetControlProperty" data-target="#SheetControlPropertysPanel" class="">控件属性</a>
                            <a href="javascript:void(0);" id="btn_SheetProperty" class="active" data-target="#SheetPropertysPanel">表单属性</a>
                        </div>
                        <div id="tabs-content">
                            <div id="SheetControlPropertysPanel" tabindex="1" placeholder="请先选择或者拖入控件"></div>
                            <div id="SheetPropertysPanel" tabindex="2">
                               
                                <div class="property-group">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">
                                            数据标题
                                             <i data-tip='数据标题用于快速辨别一条数据，适用于移动端列表显示、web列表首列标题、关联表单数据显示等场景中<br/>' class='ivu-icon ivu-icon-help-circled' style="color:#2d7fff"></i>
                                        </div>
                                    </div>
                                    <div id="ProAddNameItems" class="property-item">
                                        <div class="property-input" id="NameItems" placeholder="添加标题">
                                        </div>
                                        <i id="AddNameItems" class="icon-add"></i>
                                    </div>
                                </div>
                                <div class="property-group">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">表单编码</div>
                                    </div>
                                    <div class="property-item property-buttons">
                                        <div>
                                            <Input placeholder="设置表单编码" v-model="sheetDesigner.formCode" @on-change="changeFormCode"></Input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="sheet-design--app-name">{{(moduleName + '--' + appName) || ''}}<p>
                <div class="sheet-design-col" id="sheetContentWrapper">
                    <div class="Designer-view" tabindex="3">
                        <div id="sheetContent" class="sheetContent ui-sortable" placeholder="">
                        </div>
                    </div>
                </div>
            </div>
            <cs-code-zone v-if="isDevMode" :csCode="csCode" :appCode="appCode" :schemaCode="code" :showIndex="showIndex" @mounted="csOnMounted"></cs-code-zone>
            <javascript-code-zone v-if="isDevMode" :jsCode="jsCode" :showIndex="showIndex" @mounted="jsOnMounted"></javascript-code-zone>
        </div>
    </div>
</template>

<script>
    import '@/views/form/lib/plugins/jquery-ui'
    import '@/views/form/lib/plugins/niceScroll/jquery.nicescroll.min.js'

    import '@/views/form/lib/H3/Console/SheetDesigner/SheetDesigner.js'
    import '@/views/form/lib/H3/Console/SheetDesigner/ControlManager.js'
    import '@/views/form/lib/H3/Console/SheetDesigner/SheetReponse.js'

    import '@/views/form/lib/H3/Form/FormControls.js'
    import '@/views/form/lib/H3/Console/Formula/NewFormulaEditable.js'
    import '@/views/form/lib/plugins/DropDownList/DropDownList.js'
    // import '../../lib/plugins/DropDownList/DropDownList.css'

    import DesignerTopNav from '@/views/form/components/console/designer-top-nav'
    import CsCodeZone from '@/views/form/components/listviewdesigner/cs-code-zone'
    import JavascriptCodeZone from '@/views/form/components/listviewdesigner/javascript-code-zone'
    // import FieldAclModal from 'components/sheetdesigner/fieldAclModal/field-acl-modal'
    import FieldAclModalVue from '@/views/form/components/sheetdesigner/fieldAclModal/index'
    import EditorModalVue from '@/views/form/components/sheetdesigner/editorRule/index'
    import WordTemplateModal from '@/views/form/components/sheetdesigner/wordTemplate/index'
    import HTTP from '@/api/form.js'

    import {
        GetEngineCode,
        LoadCustomCode,
        CheckSchemaInstalled
    } from '@/views/form/service/SheetDesigner/getData'
    import '@/views/form/lib/H3/H3Plugins/H3.plugins.system'
    import { baseUrl } from '@/views/form/config/env'

    export default {
        components: {
            DesignerTopNav,
            // FieldAclModal,
            CsCodeZone,
            JavascriptCodeZone
        },
        data() {
            return {
                appCode: '',
                jsCode: '',
                bigForm:false,
                csCode: '',
                formCode:'',
                showIndex: 0,
                type:'',
                isDevMode: true,
                checkDisabled:false,
                isCodeEditorMounted: false, //自定义代码编辑器加载完毕
                // isCustomCodeLoaded: false, //自定义代码加载完毕
                code: '',
                moduleName: '',
                appName: '', // 应用名称
                engineInfo: {},
                fieldAclModel: {
                    showFieldAclModalFlag: false
                },
                openExternalForm: false, //是否启用表单外链
                hostAddress: '',
                showExternalFormModalFlag: false, //显示隐藏表单外链弹出框
                sheetDesigner: {},
                isWorkflow: false,
                isInstalledSchema: false,
                toLink: false,
                isSingleMode: false,
                canSave: false
            }
        },
        beforeRouteEnter(to, from, next) {
            sessionStorage.setItem("currentApp", JSON.stringify(to.query));
            next();
        },
        methods: {
            init: function () {
               
                var niceScroll = $('#Controls').niceScroll({
                    cursorcolor: '#ccc',
                    cursoropacitymin: 0.1,
                    cursoropacitymax: 0.5,
                    touchbehavior: false,
                    cursorwidth: '5px',
                    cursorborder: '0',
                    cursorborderradius: '5px',
                    autohidemode: 'leave',
                    cursorminheight: 40,
                    mousescrollstep: 60
                })
                var niceScrollR = $(
                    '#SheetPropertysPanel,#SheetControlPropertysPanel'
                ).niceScroll({
                    cursorcolor: '#ccc',
                    cursoropacitymin: 0.1,
                    cursoropacitymax: 0.5,
                    touchbehavior: false,
                    cursorwidth: '5px',
                    cursorborder: '0',
                    cursorborderradius: '5px',
                    autohidemode: 'leave',
                    cursorminheight: 40,
                    mousescrollstep: 60,
                    enablescrollonselection: true
                })

                this.sheetDesigner = new SheetDesigner(
                    this.code,
                    baseUrl + '/Console/SheetDesigner/OnAction',
                    this.engineInfo.EngineCode,
                    this.dataLoaded,
                    this.type,
                )
                this.$set(this.sheetDesigner, 'IsPosting', false);
                var that = this;
                window.SaveSheetDesigner = function () {
                    return that.sheetDesigner.Save(null, false);
                }

                var s = document.body.clientHeight - 100
                $('#DesignerZone').css({ height: s + 'px' })
                $(window).resize(function () {
                    s = document.body.clientHeight - 100 //当浏览器大小变化时
                    $('#DesignerZone').css({ height: s + 'px' });
                    //一行两列中切换按钮的位置调整
                    var widthLeft = $('.layoutrow-item[data-layoutitem="Left"]').width();
                    $('.layoutrow  span[data-type="changeplace"]').css({ 'left': widthLeft })
                })
                var $ToolTip = $(
                    '<div class="table-tip" style="display: none;"></div>'
                ).appendTo($('#Designer-right-wrapper'))
                $('.ivu-icon-help-circled')
                    .mouseenter(function () {
                        var $that = $(this)
                        var offset = $that.offset()
                        $ToolTip
                            .html($that.attr('data-tip'))
                            .css({
                                left:
                                    offset.left +
                                    ($that.outerWidth() - $ToolTip.outerWidth()) / 2 -
                                    $(window).scrollLeft(),
                                bottom:
                                    $(window).height() - offset.top + 6 + $(window).scrollTop()
                            })
                            .toggle()
                        return false
                    })

                $('.ivu-icon-help-circled')
                    .mouseleave(function () {
                        $ToolTip.hide()
                    })
            },
            showFieldAclModal() {
                // this.fieldAclModel.showFieldAclModalFlag = true
                let options = {
                    fieldAclModel: this.fieldAclModel,
                    schemaCode: this.code
                }
                FieldAclModalVue.show(options);
            },
            changeFormCode(val){
                $.Schema.formCode=val.currentTarget.value
            },
            changeBigForm(val){
                 $.Schema.isOpenBigForm=val
            },

            showEditorModal() {
                // this.fieldAclModel.showFieldAclModalFlag = true
                
                let options = {
                    fieldAclModel: this.fieldAclModel,
                    rule:this.sheetDesigner.RTFData,
                    schemaCode:  this.code
                }
                EditorModalVue.show(options);
            },
            showWordModal() {
                let options = {
                    fieldAclModel: this.fieldAclModel,
                    rule: this.sheetDesigner.wordTemplate,
                    schemaCode: this.code
                }
                WordTemplateModal.show(options);
            },
            dataLoaded: function () {
                this.isWorkflow = this.sheetDesigner.IsWorkflow
            },
            csOnMounted(editor) {
                //window.viewSetting.CSEditor = editor;
                // this.isCustomCodeLoaded = true;
                this.isCodeEditorMounted = true;
                this.canSave = true;
                this.sheetDesigner.CSEditor = editor
            },
            jsOnMounted(editor) {
                this.isCodeEditorMounted = true;
                this.canSave = true;
                this.sheetDesigner.JSEditor = editor
            },
            async getEngineCode() {
                var that = this
                //let res = await GetEngineCode(this.code)
                let res ={"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"CurUser":{"Name":"梦达","ProfilePhotoUrl":""},"ShowSystemIntegration":false,"EngineCode":"n3wk40r211ew2fafgh9jg71x6","OptionalEngines":{"n3wk40r211ew2fafgh9jg71x6":"mq项目组"}}}
                setTimeout(()=>{
                    if (res.Successful) {
                    that.engineInfo = res.ReturnData
                    // document.title = '氚云 - ' + that.engineInfo.Title
                    that.init()
                    that.loadCustomCode()   
                    // that.checkSchemaInstalled();
                    } else {
                        // that.$Message.info(res.ErrorMessage);
                    }
                })


            },
            async loadCustomCode() {
                var that = this

                // let ret = await LoadCustomCode(this.code)
                let ret ={"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"JsCode":"","CsCode":"","DefaultJsCode":"","DefaultCsCode":"","IsDevMode":true,"AppCode":"","IsSingleMode":false}};
                if (ret.Successful) {
                    that.jsCode = ret.ReturnData['JsCode']
                    that.csCode = ret.ReturnData['CsCode']
                    that.appCode = ret.ReturnData['AppCode']
                    that.isDevMode = ret.ReturnData['IsDevMode']
                    that.sheetDesigner.defaultJsCode = ret.ReturnData['DefaultJsCode']
                    that.sheetDesigner.defaultCsCode = ret.ReturnData['DefaultCsCode']
                    if (that.isDevMode == false) {
                        that.canSave = true;
                    }
                    that.isSingleMode = ret.ReturnData["IsSingleMode"];
                }
            },
            async checkSchemaInstalled() {
                var that = this
                let ret = await CheckSchemaInstalled(this.code)
                setTimeout(()=>{
                    if (ret.Successful) {
                    that.isInstalledSchema = ret.ReturnData['IsInstalled']
                }
                },2000)
            }
        },
        watch:{
            'sheetDesigner.isOpenBigForm'(newVal, oldVal) {
               this.bigForm = newVal;
               if(newVal){
                   this.checkDisabled =true;
               }
            }, 
        },
        created() {
            if(this.$route!=null&&this.$route.query!=null){
               this.code = this.$route.query.appId;
               this.type = this.$route.query.type;
               this.moduleName = this.$route.query.moduleName;
               this.appName = this.$route.query.appName;
               this.$store.commit('updateCurrentApp', this.$route.query);
            }
            this.getEngineCode()

           
        },

    }
</script>



// WEBPACK FOOTER //
// src/pages/SheetDesigner/App.vue
