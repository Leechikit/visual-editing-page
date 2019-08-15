<template>
    <div class="creatRole">
        <Modal v-model="showFlag" title="设置服务部门" @on-cancel="cancel" @on-ok="ok"
         width="560px" :loading="loading">
            <div class="modal-body">
                <Row>
                    <Col span="6">服务部门</Col>
                    <Col span="18">
                        <div id="PostUnit" data-ismultiple="true" class="myuserpicker" 
                         data-uservisible="false" data-width="100%" data-orgunitvisible="true"
                         data-usedatacache="false"></div>
                    </Col>
                </Row>
            </div>
            <div slot="footer" class="bottom_btns">
                <a class="confirm" @click="ok">确定</a>
                <a class="cancel" @click="cancel">取消</a>
            </div>
        </Modal>
    </div>
</template>

<script>
import { GetPostUnits, SetPostUnits } from '../../api/role.js'   //引入获取角色部门接口
import $ from 'jquery';
import './FormUser.js';

export default {
    props: [
        "showServiceRoleFlag",
        "UserId",
        "RoleId",
        "UnitTypeOrganizationUnit"
    ],
    data() {
        return {
            loading: true,
            showFlag: false,
            PostUnit: '',     //设置服务部门
            CurrentPostID: '',
            DisplayNames: []
        }
    },
    watch: {
        showServiceRoleFlag: function() {
            this.showFlag = this.showServiceRoleFlag
            if(this.showServiceRoleFlag) {
                this._GetPostUnits()
            } 
        }
    },
    mounted() {
        // 创建页面时，获取部门信息数据
        let _self = this
        this.$nextTick(() => {
            _self._initFormUser()
            // _self._GetPostUnits()
        })   
    },
    methods: {
        // 远程请求时，确定按钮出现loading圆圈
         _setLoading() {
            var _self = this
            setTimeout(() => {
                _self.loading = false;
                _self.$nextTick(() => {
                    _self.loading = true;
                })
            }, 1000)
        },
        // 初始化FormUser控件
        _initFormUser() {
            if (!this.PostUnit) {
                this.PostUnit = $("#PostUnit").FormUser();
            }
        },
        // 获取服务部门信息
        async _GetPostUnits() {
            let res = await GetPostUnits("GetPostUnits", this.UserId, this.RoleId);
            if (res.Successful) {
                if (!$.isEmptyObject(res.ReturnData["DicUnits"])) {
                    var ArrayUnit = [];

                    for (var key in res.ReturnData["DicUnits"]) {
                        var displayname = res.ReturnData["DicUnits"][key];
                        var type = this.UnitTypeOrganizationUnit;
                        var Unit = { 
                            "UnitID": key,
                            "Code": null, 
                            "DisplayName": displayname, 
                            "ParentId": null, "Type": type, 
                            "Icon": null, 
                            "DepartmentName": null, 
                            "Birthday": null, 
                            "_Gender": null, 
                            "Gender": null, 
                            "email": null, 
                            "Mobile": null 
                        };
                        ArrayUnit.push(Unit);
                    }
                    this.PostUnit.SetValue(ArrayUnit);
                }
                this.CurrentPostID = res.ReturnData["postid"];
            } else {
                // 获取数据失败
                $.IShowError(res.ErrorMessage);
            }
        },
        // 设置服务部门信息
        async _SetPostUnits(UnitsId) {
            let res = await SetPostUnits("SetPostUnits", this.CurrentPostID, UnitsId);
            if (res.Successful) {
                this.DisplayNames = res.ReturnData.DisplayNames
                this.$emit('updateServiceDepart', true)
                $.IShowSuccess('设置成功');
                this._setLoading()
            } else {
                // 获取数据失败
                $.IShowError(res.ErrorMessage);
            }
        },
        ok() {
            // 确认设置服务部门
            let DragUseridTemp = this.PostUnit.GetUnitIDs()
            let UnitsId = DragUseridTemp.join(";")

            this._SetPostUnits(UnitsId)

            // 将点击确定之后的showModal 派发给父组件
            this.showFlag = false
            this.$emit('serviceRoleShowFlag')
            
        },
        cancel() {
            this.PostUnit.ClearChoices()
            // 将点击取消之后的showModal 派发给父组件
            this.$emit('serviceRoleShowFlag')
        }
    }
}
</script>
