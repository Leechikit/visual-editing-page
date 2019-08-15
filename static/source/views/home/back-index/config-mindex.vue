<template>
    <div>
        <Modal v-model="showFlag" :title="modalTitle" @on-ok="ok" @on-cancel="cancel" width="420px"
         class="config-mindex" :appCode="appCode" :mobileIndexData="mobileIndexData" :mask-closable="false">
            <form id="Mob_form">
            <!-- <form id="Mob_form" @click.self="showTree = false"> -->
                <div class="msgBox_row">
                    <div class="col-left">
                        <label class="row_name" for="txtRepName" style="height:32px; line-height:32px;">首页报表</label>
                    </div>
                    <div style="margin-left:100px; line-height:20px; max-height:300px;">
                        <div class="rep-input" @click.stop.prevent="showReportDataTree"> 
                            <div id="rep-input" v-if="selectedData == ''" style="color: #999;">
                                请选择报表
                            </div>
                            <div id="rep-input" v-else>{{selectedData}}</div>
                            
                            <a class="xiala-button"><Icon type="arrow-right-b"></Icon></a>
                            <!-- <a class="xiala-button"><i class="icon icon-up"></i></a> -->
                        </div>
                        <!-- 下拉框架的树形结构 -->
                        <div v-show="showTree" class="tree-container">
                            <Tree :data='baseData' show-checkbox @on-check-change="selectReport()" ref="tree"></Tree>
                        </div>
                    </div>
                </div>
            </form>
            <div slot="footer" class="bottom_btns">
                <a class="confirm" @click="ok">确定</a>
                <a class="cancel" @click="cancel">取消</a>
            </div>
        </Modal>
    </div>
</template>

<script>
//import { postMobileData } from '../../service/getData'   //引入获取配置移动端数据的接口
export default {
    props: [
        "showConfigModal",
        "modalTitle",
        "appCode",
        "mobileIndexData"
    ],
    data() {
        return {
            loading: true,
            baseData: [],
            checkedReport: '',
            selectedData: '',
            showTree: false,
            ReportPageAndReportWidgetIds: [],         //选中表单的id
            SelectedReports: [],  //之前配置好的表单数组
            showFlag: false,
            selectFormValueAndKey: {}
            // showModal: true
        }
    },
    watch: {
        //监听页面移动端首页报表数据
        mobileIndexData: function() {
            var _self = this
            if(_self.mobileIndexData.ReportsTree !== null) {
                // 处理配置报表返回过来的数据为所需的树状结构
                _self.baseData = _self._handleReportData(_self.mobileIndexData.ReportsTree)
            }
            if(_self.mobileIndexData.SelectedReports !== null) {
                // 初次进来时，渲染之前配置好的移动端首页表单
                _self._renderBeforeMobileConfig(_self.mobileIndexData.SelectedReports)
            }    

        },
        // 监听弹窗显示隐藏标识
        showConfigModal: function() {
            this.showFlag = this.showConfigModal
        },
        showTree: function() {
            var _self = this
            // 点击下拉框之外空白页时，关闭下拉框
            if(_self.showTree) {
                document.onclick = function(event) {
                    var e = event || window.event || arguments.callee.caller.arguments[0];
                    e.stopPropagation();
                    e.preventDefault();
                    let clickClassName = e.target.className
                    if(clickClassName == 'ivu-modal-body') {
                        _self.showTree = false
                    }
                    
                }
            }   
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init: function () {
            $('#rep-input').niceScroll({
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
        // 初次进来时，渲染之前配置好的移动端首页表单
        _renderBeforeMobileConfig(formList) {
            let _self = this
            let reportDatas = _self.baseData
            let checkedFormTitle = ''
            // 遍历表单数据，给之前选中的表单添加checked选中属性
            reportDatas.forEach(function(value,index) {
                let childForm = value.children
                if(childForm.length == 0){
                    return
                }else{
                    childForm.forEach(function(form,j) {
                        let formid = form.id
                        formList.forEach(function(key) {
                            if(formid == key) {
                                _self.baseData[index].children[j] = Object.assign({},form, { checked: true });
                                checkedFormTitle = checkedFormTitle + form.title + ','
                            }
                        })
                    })
                }
            })
            checkedFormTitle = checkedFormTitle.substr(0, checkedFormTitle.length-1)
            _self.selectedData = checkedFormTitle
            
        },
        // 处理配置报表返回过来的数据为所需的树状结构
        _handleReportData(resultList) {
            var _self = this
            let dataTree = []
            resultList.forEach(function(reportInfo) {
                let map = {}
                map.expand = false
                map.title = reportInfo.Name
                map.disableCheckbox = true
                // 处理树状结构子分子数据
                let formlist = []
                let childFormmap = reportInfo.ReportWidgets
                for (let key in childFormmap) {
                    let formmap = {}
                    formmap.id = key
                    formmap.title = childFormmap[key]
                    formmap.expand = false
                    formlist.push(formmap)
                }
                map.children = formlist
                dataTree.push(map)
            })
            return dataTree
        },
        // // 提交选中的表单进行移动端首页配置
        // async _postMobileData(reportIds) {
        //     var _self = this
        //     let NodeId = _self.appCode
        //     let res = await postMobileData('SaveAppHome', NodeId, '', reportIds, 1)
        //     if (res.Successful) {
        //         //获取移动端配置首页的数据
        //         $.IShowSuccess('设置成功！')
        //     } else {
        //         // 获取移动端首页配置数据失败
        //         // $.IShowError(res.ErrorMessage);
        //     }
        // },
        // 点击下拉框,显示隐藏报表树
        showReportDataTree() {
            this.showTree = !this.showTree
        },
        // 点击确定按钮，提交配置好的移动端首页表单
        ok() {
            let _self = this
            if(_self.ReportPageAndReportWidgetIds.length == 0) {
                let reportIds = '[]'
                //this._postMobileData(reportIds)
            }else{
                _self.ReportPageAndReportWidgetIds = []
                // 提交选中的表单进行移动端首页配置
                let checkValueList = this.$refs.tree.getCheckedNodes()
                let reportIds = '['
                checkValueList.forEach(function(currentObj) {
                    if (currentObj.children) {
                        return
                    } else {
                        _self.selectFormValueAndKey[currentObj.id] = currentObj.title
                        reportIds = reportIds + '\"' + currentObj.id + '\",'
                        // reportIds.push(currentObj.id)
                    }
                })
                reportIds = reportIds.substr(0, reportIds.length-1)
                reportIds = reportIds + ']'
                _self.ReportPageAndReportWidgetIds = reportIds
                //this._postMobileData(reportIds)
            }
            
            
            // 将点击确定之后的showModal 派发给父组件
            _self.showFlag = false
            _self.$emit('changeConShowFlag', _self.showFlag)
            _self.showTree = false
            _self.selectedData = '';
            _self.baseData = [];
        },
        // 点击取消按钮，取消配置移动端首页报表
        cancel() {
            this.showFlag = false
            this.$emit('changeConShowFlag', this.showFlag)
            this.showTree = false
            this.selectedData = '';
            this.baseData = [];
        },
        // 选中节点报表时，上面input框中出现所选报表的名称
        selectReport() {
            let _self = this
            _self.ReportPageAndReportWidgetIds = []
            // 获取被选中的节点数组
            let checkValueList = this.$refs.tree.getCheckedNodes()
            let str = ''
            checkValueList.forEach(function(currentObj) {
                
                if (currentObj.children) {
                    return
                } else {
                    str = str + currentObj.title + ','
                    // 保存选择报表的ID值
                    _self.ReportPageAndReportWidgetIds.push(currentObj.id)
                }
            })
            this.selectedData = str.substr(0, str.length - 1)
        },
        stopCloseTree(e) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            e.stopPropagation();
            e.preventDefault();
        },
    }
}
</script>

<style  rel="stylesheet/stylus">

.ivu-tree-arrow+label.ivu-checkbox-wrapper-disabled{
    display: none !important;
} 


</style>




// WEBPACK FOOTER //
// src/components/back-index/config-mindex.vue