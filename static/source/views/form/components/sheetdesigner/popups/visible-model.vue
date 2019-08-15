<template>
    <div>
        <!-- @* 新建分组 *@ -->
        <Modal v-model="showVisibleModelSetting" title="显示模式设置"  :mask-closable="false"     
            @on-ok="ok" @on-cancel="cancel" width="420px" :loading="loading">
            <div class="popupsContent">
                <div class="main create">
                    <div class="bd">
                        <div class="msgBox_row">
                            <div class="col-left">
                                <label class="row_name" for="txtGroupName">显示模式</label>
                            </div>
                            <div class="col-right">
                                <div class="btn-group" @click="openMenu()" id="menu">
                                    <button type="button" class="btn btn-default" id="btnFormGroup">{{selectedVisibleSetting.text}}</button>
                                    <button type="button" class="btn btn-primary dropdown-toggle">
                                        <span class="icon icon-arrow-down2"  @click.stop="openMenu()"></span>
                                        <span class="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <ul class="dropdown-menu" data-tar="#btnRepGroup" id="RepGroupUl" v-if="isOpenMenu">
                                        <li v-for="(model, index) in modelArray" :key="index"  
                                            @click.stop="choseModel(model)"><a>{{model.text}}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { setAppMenuVisible } from '../../../service/getData'
import '../../../lib/H3/H3Plugins/H3.plugins.system.js'

const FunctionNodeVisible = {
    AllVisible: 1,
    PcVisible: 2,
    MobileVisible: 3,
    InVisible: 4
};

export default {
    data(){
        let settingOptions = [
            { value: FunctionNodeVisible.AllVisible, text: 'Web端、移动端全部显示' },
            { value: FunctionNodeVisible.PcVisible, text: '仅Web端显示' },
            { value: FunctionNodeVisible.MobileVisible, text: '仅移动端显示' },
            { value: FunctionNodeVisible.InVisible, text: 'Web端、移动端都不显示' }
        ];

        return {
            loading: true,
            showVisibleModelSetting: false,
            isOpenMenu: false,
            modelArray: settingOptions,
            selectedVisibleSetting: settingOptions[0]
        }
    },
    props:{
        ifShowVisibleModelSetting:{
            default:false,
            type:Boolean,
            twoWay:true
        },
        menuItem: {
            type: Object
        }
    },
    watch:{
        ifShowVisibleModelSetting: function(cur){
            if(cur == true){
                this.showVisibleModelSetting = true;
            }else{
                this.showVisibleModelSetting = false;
            }
        },
        menuItem: function(newVal){
            if(!newVal) return;

            let index = 0;
            if(newVal.visible && !newVal.MobileVisible){
                index = 1;
            } else if(!newVal.visible && newVal.MobileVisible){
                index = 2;
            } else if(!newVal.visible && !newVal.MobileVisible){
                index = 3;
            }

            this.selectedVisibleSetting = this.modelArray[index];
        }
    },
    created:function(){
        var that = this;

        $(document).on("click",function(e){
            if($(e.target).parent("#menu").length == 0){
                that.isOpenMenu = false;
            }
        });
    },
    methods:{
        async ok() {
            var that = this;

            let res = await setAppMenuVisible(that.menuItem.Code, that.selectedVisibleSetting.value);
            if (res.Successful) {
                switch(that.selectedVisibleSetting.value){
                    case FunctionNodeVisible.AllVisible:
                        that.menuItem.visible = true;
                        that.menuItem.MobileVisible = true;
                        break;
                    case FunctionNodeVisible.PcVisible:
                        that.menuItem.visible = true;
                        that.menuItem.MobileVisible = false;
                        break;
                    case FunctionNodeVisible.MobileVisible:
                        that.menuItem.visible = false;
                        that.menuItem.MobileVisible = true;
                        break;
                    case FunctionNodeVisible.InVisible:
                        that.menuItem.visible = false;
                        that.menuItem.MobileVisible = false;
                        break;
                }
                that.showVisibleModelSetting = false;
                $.IShowSuccess('显示模式设置成功');
                that.$emit('closeModelSet',false);
            }else{
                $.IShowWarn(res.ErrorMessage);
                that.isClose();
            }
        },
        cancel() {
            var that = this;
            that.$emit('closeModelSet',false); 
        },
        isClose(){
            setTimeout(() => {
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                });
            }, 2000);
        },
        openMenu(){
            this.isOpenMenu = !this.isOpenMenu;
        },
        choseModel(item){
            this.isOpenMenu = false;
            this.selectedVisibleSetting = item;
        }
    }
}
</script>





<style>
.msgBox_row
    margin:20px 0
</style>


// WEBPACK FOOTER //
// src/components/sheetdesigner/popups/visible-model.vue